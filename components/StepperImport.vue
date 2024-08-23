<template>
  <v-stepper class="m-3" v-model="activeStep" hide-actions>
    <v-stepper-header>
      <v-stepper-item
        title="Select E-Learning Platform"
        value="1"
        v-tooltip="'Used for selecting the LMS you want to import from.'"
        :complete="activeStep > 0"
        :editable="activeStep < 4"
        icon="mdi-school"
      ></v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item
        title="Select Exam"
        value="2"
        icon="mdi-format-list-bulleted"
        v-tooltip="'Used for selecting the exam you want to import.'"
        :complete="activeStep > 1"
        :editable="freeSteps.includes(2)"
        @click="activeStep = 1"
        :class="[activeStep === 0 && selectedLMS ? 'hover:bg-blue-100' : '']"
      ></v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item
        title="Customize Import Settings"
        value="3"
        icon="mdi-application-cog"
        v-tooltip="
          'Used for customizing the settings of the exam you want to import.'
        "
        :complete="activeStep > 2"
        :editable="freeSteps.includes(3)"
        @click="activeStep = 2"
        :class="[
          activeStep === 1 && selectedTable > -1 ? 'hover:bg-blue-100' : '',
        ]"
      >
      </v-stepper-item>

      <v-divider></v-divider>
      <v-stepper-item
        title="Review Import Settings"
        value="4"
        icon="mdi-eye"
        v-tooltip="
          'Used for reviewing the settings of the exam you want to import. These settings can be changed later.'
        "
        :complete="activeStep > 3"
        :editable="activeStep === 2 && !lock3"
        @click="activeStep = 3"
        :class="[
          activeStep === 2 && freeSteps.includes(3) && !lock3
            ? 'hover:bg-blue-100'
            : '',
        ]"
      ></v-stepper-item>
      <v-divider></v-divider>
      <v-stepper-item
        icon="mdi-share"
        title="Next Steps"
        value="5"
        :editable="activeStep === 3"
        @click="saveAndImport()"
        v-tooltip="'Provides actions as next step after importing the exam.'"
        :class="[activeStep === 3 ? 'hover:bg-blue-100' : '']"
      ></v-stepper-item>
    </v-stepper-header>

    <v-stepper-window>
      <v-stepper-window-item value="1">
        <v-card
          title="Select E-Learning Platform / Learning Management System (LMS)"
          subtitle="Choose and select the e-learning platform you want to import an exam from. Most probably this is where you have created your exam beforehand."
          flat
        >
          <v-card-text>
            <v-select
              :items="items"
              item-title="name"
              label="LMS"
              v-model="selectedLMS"
              variant="outlined"
            >
              <template v-slot:selection="{ item, index }">
                <v-img
                  :src="'/' + item.raw.icon + '.png'"
                  class="w-16px aspect-1 mb-1 mr-1"
                ></v-img>
                <span>{{ item.title }}</span>
              </template>
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend="props">
                    <v-img
                      :src="'/' + item.raw.icon + '.png'"
                      class="w-16px aspect-1 mb-1 mr-2"
                    ></v-img>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-card-text>
        </v-card>
        <v-stepper-actions
          prev-text=""
          next-text="Select Exam"
          :color="selectedLMS ? 'blue' : ''"
          @click:next="activeStep++"
          :disabled="selectedLMS ? false : 'next'"
        ></v-stepper-actions>
      </v-stepper-window-item>
      <v-stepper-window-item value="2">
        <v-card
          flat
          subtitle="Search and select the exam you want to import from the selected e-learning platform."
        >
          <template v-slot:title>Import Exam </template>
          <v-card-text>
            <v-row class="mt-2">
              <v-col cols="4">
                <v-text-field
                  v-model="search"
                  label="Search Exams by Name"
                  prepend-inner-icon="mdi-magnify"
                  variant="outlined"
                  hide-details
                  single-line
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-date-input
                  v-model="date"
                  label="Date Range"
                  max-width="300"
                  multiple="range"
                  prepend-inner-icon="mdi-calendar"
                  prepend-icon=""
                  variant="outlined"
                ></v-date-input
              ></v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="time1"
                  :active="menu1"
                  :focus="menu1"
                  label="Start Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  variant="outlined"
                >
                  <v-menu
                    v-model="menu1"
                    :close-on-content-click="false"
                    activator="parent"
                    transition="scale-transition"
                  >
                    <v-time-picker
                      format="24hr"
                      scrollable
                      v-if="menu1"
                      v-model="time1"
                      :max="time2"
                      full-width
                    ></v-time-picker>
                  </v-menu> </v-text-field
              ></v-col>
              <v-col cols="2">
                <v-text-field
                  v-model="time2"
                  :active="menu2"
                  :focus="menu2"
                  label="End Time"
                  prepend-inner-icon="mdi-clock-time-four-outline"
                  readonly
                  variant="outlined"
                >
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    activator="parent"
                    transition="scale-transition"
                  >
                    <v-time-picker
                      v-if="menu2"
                      v-model="time2"
                      full-width
                      :min="time1"
                      format="24hr"
                      scrollable
                    ></v-time-picker>
                  </v-menu> </v-text-field
              ></v-col>
              <v-col cols="2">
                <v-checkbox
                  v-tooltip="
                    'Attention: Importing an exam twice can lead to unwanted behaviour.'
                  "
                  label="Show imported"
                ></v-checkbox>
              </v-col>
            </v-row>
            <v-data-table
              :headers="headers"
              :items="dataItems"
              :item-value="(item) => `${item.name}`"
              :loading="loading"
              :search="search"
              :items-per-page="10"
              ref="dataTableRef"
              class="mt--5"
            >
              <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
              </template>
              <template v-slot:item="{ item, index }">
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <tr
                      @click="setSelectedTable(item, index)"
                      v-bind="props"
                      :class="[
                        isHovering ? 'bg-grey-lighten-4 cursor-pointer' : '',
                        // selectedTable === index ? 'bg-grey-lighten-3' : '',
                        selectedTable === index
                          ? 'bg-hex-e2ecf7! text-hex-1867C0'
                          : '',
                      ]"
                    >
                      <td>
                        {{ item.name }}
                      </td>
                      <td>
                        {{ item.startDate }}, {{ item.startTime }} (Zurich,
                        Europe)
                      </td>
                      <td>{{ item.endDate }}, {{ item.endTime }} (UTC +1)</td>
                      <td>
                        <v-chip
                          color="blue"
                          :text="item.institution"
                          class="text-uppercase"
                          size="small"
                          label
                        ></v-chip>
                      </td>
                      <td>
                        <v-chip
                          color="green"
                          :text="item.platform"
                          class="text-uppercase"
                          size="small"
                          label
                        ></v-chip>
                      </td>
                      <td>{{ item.lecturer }}</td>
                      <td>
                        <v-btn-group>
                          <v-btn
                            ref="btn"
                            @click="toggleDetailsDialog"
                            icon="mdi-information"
                            size="small"
                          ></v-btn>
                        </v-btn-group>
                      </td>
                    </tr>
                  </template>
                </v-hover>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
        <v-stepper-actions
          :color="selectedTable < 0 ? '' : 'blue'"
          @click:prev="activeStep--"
          @click:next="activeStep++"
          next-text="Select Exam"
          prev-text="Change Settings"
        ></v-stepper-actions
      ></v-stepper-window-item>
      <v-stepper-window-item value="3">
        <v-card title="Configure Exam" flat>
          <v-card-subtitle>
            Adjust the exams default import settings such as an exam template,
            exam type, quit password and your exam supporter.
            <span class="italic">A quit password is required.</span>
          </v-card-subtitle>
          <v-card-text>
            <v-card class="mb-7 pb-0">
              <v-data-table
                :headers="headers"
                :items="singleDataItems"
                :items-per-page="-1"
                disable-sort
                ref="singleDataTable"
              >
                <template v-slot:item="{ item, index }">
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <tr v-bind="props" class="text-hex-1867C0 bg-hex-e2ecf7">
                        <td>
                          {{ item.name }}
                        </td>
                        <td>
                          {{ item.startDate }}, {{ item.startTime }} (Zurich,
                          Europe)
                        </td>
                        <td>{{ item.endDate }}, {{ item.endTime }} (UTC +1)</td>
                        <td>
                          <v-chip
                            color="blue"
                            :text="item.institution"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>
                          <v-chip
                            color="green"
                            :text="item.platform"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>{{ item.lecturer }}</td>
                        <td>
                          <v-btn-group>
                            <v-btn
                              @click="toggleDetailsDialog"
                              ref="btn"
                              icon="mdi-information"
                              size="small"
                              class="bg-hex-e2ecf7"
                              color="#e2ecf7"
                            ></v-btn>
                          </v-btn-group>
                        </td>
                      </tr>
                    </template>
                  </v-hover>
                </template>
                <template v-slot:bottom> </template>
              </v-data-table>
            </v-card>

            <v-select
              :items="['Exam Template 1', 'Exam Template 2']"
              item-title="Exam Template"
              label="Exam Template"
              variant="outlined"
              v-model="selectedTemplate"
            >
            </v-select>
            <v-select
              :items="[
                'Managed Devices',
                'Bring your own device',
                'Not defined',
                'VDI Virtual Desktop Infrastructure',
              ]"
              item-title="Exam Template"
              label="Exam Type"
              variant="outlined"
              v-model="selectedType"
            >
            </v-select>
            <v-select
              :items="[
                'Hannah Egger',
                'Mein-Eigener Name',
                'Max Mustermann',
                'Andere Person',
              ]"
              item-title="Exam Template"
              label="Exam Supporter"
              variant="outlined"
              v-model="selectedSupporter"
            >
            </v-select>
            <v-text-field
              variant="outlined"
              label="Quit Password*"
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules.required, rules.min]"
            >
              <template v-slot:append>
                <!-- <v-btn flat prepend-icon="mdi-cube"> Generate Password </v-btn> -->
                <v-btn
                  flat
                  prepend-icon="mdi-information"
                  @click="togglePasswordHintDialog()"
                >
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
        <v-stepper-actions
          @click:prev="activeStep--"
          @click:next="activeStep++"
          :color="!lock3 ? 'blue' : ''"
          :disabled="!lock3 ? false : 'next'"
          next-text="Review settings"
          prev-text="Reselect exam"
        ></v-stepper-actions>
      </v-stepper-window-item>
      <v-stepper-window-item value="4">
        <v-card
          title="Review Settings"
          subtitle="Review the import settings of the exam. Continue to export, reconfigure, test or view the exam."
          flat
        >
          <v-card-text>
            <v-card class="mb-7 pb-0" variant="outlined" color="grey">
              <v-expansion-panels flat v-model="panel">
                <v-expansion-panel value="details">
                  <v-expansion-panel-title
                    ><span class="text-5 ml--2"
                      >Details</span
                    ></v-expansion-panel-title
                  >
                  <v-expansion-panel-text>
                    <v-table class="mt--2" density="compact">
                      <tbody>
                        <tr align="right">
                          <th>Name:</th>
                          <td>Theoretical Philosophy II</td>
                        </tr>

                        <tr align="right">
                          <th>Short name:</th>
                          <td>TPIIHS24</td>
                        </tr>

                        <tr align="right">
                          <th>Description:</th>
                          <td>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Similique sit doloremque minima sint, culpa
                            voluptas rerum
                          </td>
                        </tr>

                        <tr align="right">
                          <th>Start Time:</th>
                          <td>12.05.2024 08:00 (UTC1)</td>
                        </tr>

                        <tr align="right">
                          <th>End Time:</th>
                          <td>12.05.2024 08:00 (UTC1)</td>
                        </tr>

                        <tr align="right">
                          <th>Time Limit:</th>
                          <td>None</td>
                        </tr>

                        <tr align="right">
                          <th>Status:</th>
                          <td>
                            <v-chip color="blue" size="small">Running</v-chip>
                          </td>
                        </tr>

                        <tr align="right">
                          <th>LMS:</th>
                          <td>
                            <v-chip color="red" size="small">Moodle</v-chip>
                          </td>
                        </tr>

                        <tr align="right">
                          <th>LMS Exam URL:</th>
                          <td class="underline">
                            https://example.com/tsfasf/asdf23/2342323
                          </td>
                        </tr>

                        <tr align="right">
                          <th>Created at:</th>
                          <td>01.05.2024 11:23 (Berlin +1)</td>
                        </tr>

                        <tr align="right">
                          <th>ID:</th>
                          <td>XASD232423</td>
                        </tr>
                        <tr align="right">
                          <th>Exam Type:</th>
                          <td>
                            <v-chip color="blue" size="small"
                              >Managed Device</v-chip
                            >
                          </td>
                        </tr>
                        <tr align="right">
                          <th>Exam Supporter</th>
                          <td>
                            <v-icon
                              icon="mdi-account"
                              class="mt--.5"
                              size="small"
                            ></v-icon>
                            Angelina Musterini
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel
                  value="examconfiguration"
                  class="borderTopExp"
                >
                  <v-expansion-panel-title
                    ><span class="text-5 ml--2"
                      >Exam Configuration</span
                    ></v-expansion-panel-title
                  >
                  <v-expansion-panel-text>
                    <v-table class="mt--2" density="compact">
                      <tbody>
                        <tr align="right">
                          <th>LMS Exam URL:</th>
                          <td class="underline">
                            https://example.com/tsfasf/asdf23/2342323
                          </td>
                        </tr>

                        <tr align="right">
                          <th>Created at:</th>
                          <td>01.05.2024 11:23 (Berlin +1)</td>
                        </tr>

                        <tr align="right">
                          <th>ID:</th>
                          <td>XASD232423</td>
                        </tr>
                        <tr align="right">
                          <th>Exam Type:</th>
                          <td>
                            <v-chip color="blue" size="small"
                              >Managed Device</v-chip
                            >
                          </td>
                        </tr>
                        <tr align="right">
                          <th>Exam Supporter</th>
                          <td>
                            <v-icon
                              icon="mdi-account"
                              class="mt--.5"
                              size="small"
                            ></v-icon>
                            Angelina Musterini
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel value="indicators" class="borderTopExp">
                  <v-expansion-panel-title
                    ><span class="text-5 ml--2"
                      >Indicators</span
                    ></v-expansion-panel-title
                  >
                  <v-expansion-panel-text>
                    <v-table class="mt--2" density="compact">
                      <tbody>
                        <tr align="right">
                          <th>LMS Exam URL:</th>
                          <td class="underline">
                            https://example.com/tsfasf/asdf23/2342323
                          </td>
                        </tr>

                        <tr align="right">
                          <th>Created at:</th>
                          <td>01.05.2024 11:23 (Berlin +1)</td>
                        </tr>

                        <tr align="right">
                          <th>ID:</th>
                          <td>XASD232423</td>
                        </tr>
                        <tr align="right">
                          <th>Exam Type:</th>
                          <td>
                            <v-chip color="blue" size="small"
                              >Managed Device</v-chip
                            >
                          </td>
                        </tr>
                        <tr align="right">
                          <th>Exam Supporter</th>
                          <td>
                            <v-icon
                              icon="mdi-account"
                              class="mt--.5"
                              size="small"
                            ></v-icon>
                            Angelina Musterini
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
                <v-expansion-panel value="clientgroups" class="borderTopExp">
                  <v-expansion-panel-title
                    ><span class="text-5 ml--2"
                      >Client Groups</span
                    ></v-expansion-panel-title
                  >
                  <v-expansion-panel-text>
                    <v-table class="mt--2" density="compact">
                      <tbody>
                        <tr align="right">
                          <th>LMS Exam URL:</th>
                          <td class="underline">
                            https://example.com/tsfasf/asdf23/2342323
                          </td>
                        </tr>

                        <tr align="right">
                          <th>Created at:</th>
                          <td>01.05.2024 11:23 (Berlin +1)</td>
                        </tr>

                        <tr align="right">
                          <th>ID:</th>
                          <td>XASD232423</td>
                        </tr>
                        <tr align="right">
                          <th>Exam Type:</th>
                          <td>
                            <v-chip color="blue" size="small"
                              >Managed Device</v-chip
                            >
                          </td>
                        </tr>
                        <tr align="right">
                          <th>Exam Supporter</th>
                          <td>
                            <v-icon
                              icon="mdi-account"
                              class="mt--.5"
                              size="small"
                            ></v-icon>
                            Angelina Musterini
                          </td>
                        </tr>
                      </tbody>
                    </v-table>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card>
          </v-card-text>
        </v-card>
        <v-stepper-actions
          color="blue"
          @click:prev="activeStep--"
          prev-text="Change settings"
        >
          <template v-slot:next>
            <v-btn :loading="saveimportLoading" @click="saveAndImport()"
              >Save and Import</v-btn
            ></template
          ></v-stepper-actions
        >
      </v-stepper-window-item>
      <v-stepper-window-item value="5">
        <v-alert
          variant="outlined"
          text="You can now safely close this window or continue with the proposed actions below."
          title="Exam successfully imported!"
          type="success"
        ></v-alert>
        <v-card
          class="mt-3"
          title="Next Steps"
          subtitle="Choose one of the following actions to proceed."
          flat
        >
          <v-list>
            <v-list-item
              v-for="(item, i) in actionItemsNextSteps"
              :key="i"
              :value="item"
              color="primary"
              v-tooltip:start="item.tooltip"
              @click="actionByIndex(i)"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
              <v-list-item-title
                >{{ item.text }}
                <v-chip
                  class="ml-3"
                  :prepend-icon="
                    i === 4 ? 'mdi-tab' : i === 6 ? 'mdi-download' : ''
                  "
                  v-if="
                    (item.chip && i === 4 && tabOpened) ||
                    (i === 6 && downloaded)
                  "
                  color="blue"
                  size="small"
                >
                  {{
                    i === 4 && tabOpened
                      ? "Switch to tab"
                      : i === 6 && downloaded
                      ? "Downloaded"
                      : ""
                  }}
                </v-chip></v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-card>
      </v-stepper-window-item>
    </v-stepper-window>

    <!-- dialogs and snackbars -->
    <template>
      <!-- details dialog -->
      <v-dialog v-model="detailsDialog" max-width="1000">
        <template v-slot:default="{ isActive }">
          <v-card prepend-icon="mdi-information" title="Details">
            <v-card-text>
              <v-table class="mt-0" density="default">
                <tbody>
                  <tr align="right">
                    <th>Name:</th>
                    <td>Theoretical Philosophy II</td>
                  </tr>

                  <tr align="right">
                    <th>Short name:</th>
                    <td>TPIIHS24</td>
                  </tr>

                  <tr align="right">
                    <th>Description:</th>
                    <td>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Similique sit doloremque minima sint, culpa voluptas rerum
                    </td>
                  </tr>

                  <tr align="right">
                    <th>Start Time:</th>
                    <td>12.05.2024 08:00 (UTC1)</td>
                  </tr>

                  <tr align="right">
                    <th>End Time:</th>
                    <td>12.05.2024 08:00 (UTC1)</td>
                  </tr>

                  <tr align="right">
                    <th>Time Limit:</th>
                    <td>None</td>
                  </tr>

                  <tr align="right">
                    <th>Status:</th>
                    <td>
                      <v-chip color="blue" size="small">Running</v-chip>
                    </td>
                  </tr>

                  <tr align="right">
                    <th>LMS:</th>
                    <td><v-chip color="red" size="small">Moodle</v-chip></td>
                  </tr>

                  <tr align="right">
                    <th>LMS Exam URL:</th>
                    <td class="underline">
                      https://example.com/tsfasf/asdf23/2342323
                    </td>
                  </tr>

                  <tr align="right">
                    <th>Created at:</th>
                    <td>01.05.2024 11:23 (Berlin +1)</td>
                  </tr>

                  <tr align="right">
                    <th>ID:</th>
                    <td>XASD232423</td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
            <template v-slot:actions>
              <v-btn
                class="ml-auto"
                text="Close"
                @click="isActive.value = false"
              ></v-btn>
            </template>
          </v-card>
        </template>
      </v-dialog>

      <!-- password hint dialog -->
      <v-dialog v-model="passwordHintDialog" max-width="1000">
        <template v-slot:default="{ isActive }">
          <v-card prepend-icon="mdi-information" title="Password Hints">
            <v-card-text
              >This password will can be used by the clients to leave the exam.
              Please use a unique password for every exam. Keep in mind, that
              the password needs to be typed in by hand. The clients may use
              different keyboard layouts and therefore some special characters
              may not be available.</v-card-text
            >
            <template v-slot:actions>
              <v-btn
                class="ml-auto"
                text="Close"
                @click="isActive.value = false"
              ></v-btn>
            </template>
          </v-card>
        </template>
      </v-dialog>

      <!-- delete imported exam snackbar -->
      <v-snackbar
        v-model="snackbar"
        :timeout="5000"
        rounded="pill"
        timer
        color="error"
        variant="outlined"
      >
        Exam 23ZX deleted successfully.
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false"> Close </v-btn>
        </template>
      </v-snackbar>

      <v-snackbar
        v-model="snackbarImportSettingsReset"
        :timeout="3000"
        rounded="pill"
        timer
        color="info"
        variant="outlined"
      >
        Exam Import Settings have been reset to default settings.
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbarImportSettingsReset = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>

      <!-- import settings dialog -->
      <v-dialog v-model="importSettings" width="auto">
        <v-card title="Configure Exam" flat prepend-icon="mdi-application-cog">
          <v-card-subtitle>
            Adjust the exams default import settings such as an exam template,
            exam type, quit password and your exam supporter.
            <span class="italic">A quit password is required.</span>
          </v-card-subtitle>
          <v-card-text>
            <v-card class="mb-7 pb-0">
              <v-data-table
                :headers="headers"
                :items="singleDataItems"
                :items-per-page="-1"
                disable-sort
                ref="singleDataTable"
              >
                <template v-slot:item="{ item, index }">
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <tr v-bind="props" class="text-hex-1867C0 bg-hex-e2ecf7">
                        <td>
                          {{ item.name }}
                        </td>
                        <td>
                          {{ item.startDate }}, {{ item.startTime }} (Zurich,
                          Europe)
                        </td>
                        <td>{{ item.endDate }}, {{ item.endTime }} (UTC +1)</td>
                        <td>
                          <v-chip
                            color="blue"
                            :text="item.institution"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>
                          <v-chip
                            color="green"
                            :text="item.platform"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>{{ item.lecturer }}</td>
                        <td>
                          <v-btn-group>
                            <v-btn
                              @click="toggleDetailsDialog"
                              ref="btn"
                              icon="mdi-information"
                              size="small"
                              class="bg-hex-e2ecf7"
                              color="#e2ecf7"
                            ></v-btn>
                          </v-btn-group>
                        </td>
                      </tr>
                    </template>
                  </v-hover>
                </template>
                <template v-slot:bottom> </template>
              </v-data-table>
            </v-card>

            <v-select
              :items="['Exam Template 1', 'Exam Template 2']"
              item-title="Exam Template"
              label="Exam Template"
              variant="outlined"
              v-model="selectedTemplate"
            >
            </v-select>
            <v-select
              :items="['Smart Devices', 'Nokia', 'VDI', 'Parallels Desktop']"
              item-title="Exam Template"
              label="Exam Type"
              variant="outlined"
              v-model="selectedType"
            >
            </v-select>
            <v-select
              :items="[
                'Hannah Egger',
                'Mein-Eigener Name',
                'Max Mustermann',
                'Andere Person',
              ]"
              item-title="Exam Template"
              label="Exam Supporter"
              variant="outlined"
              v-model="selectedSupporter"
            >
            </v-select>
            <v-text-field
              variant="outlined"
              label="Quit Password*"
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules.required, rules.min]"
            >
              <template v-slot:append>
                <!-- <v-btn flat prepend-icon="mdi-cube"> Generate Password </v-btn> -->
                <v-btn
                  flat
                  prepend-icon="mdi-information"
                  @click="togglePasswordHintDialog()"
                >
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- seb settings dialog -->
      <v-dialog v-model="sebSettings" width="auto">
        <v-card
          title="Configure Exam SEB Settings"
          flat
          prepend-icon="mdi-security"
        >
          <v-card-subtitle>
            Adjust the exams SEB settings such as whitelisted applications and
            URLs etc.
          </v-card-subtitle>
          <v-card-text>
            <v-card class="mb-7 pb-0">
              <v-data-table
                :headers="headers"
                :items="singleDataItems"
                :items-per-page="-1"
                disable-sort
                ref="singleDataTable"
              >
                <template v-slot:item="{ item, index }">
                  <v-hover>
                    <template v-slot:default="{ isHovering, props }">
                      <tr v-bind="props" class="text-hex-1867C0 bg-hex-e2ecf7">
                        <td>
                          {{ item.name }}
                        </td>
                        <td>
                          {{ item.startDate }}, {{ item.startTime }} (Zurich,
                          Europe)
                        </td>
                        <td>{{ item.endDate }}, {{ item.endTime }} (UTC +1)</td>
                        <td>
                          <v-chip
                            color="blue"
                            :text="item.institution"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>
                          <v-chip
                            color="green"
                            :text="item.platform"
                            class="text-uppercase"
                            size="small"
                            label
                          ></v-chip>
                        </td>
                        <td>{{ item.lecturer }}</td>
                        <td>
                          <v-btn-group>
                            <v-btn
                              @click="toggleDetailsDialog"
                              ref="btn"
                              icon="mdi-information"
                              size="small"
                              class="bg-hex-e2ecf7"
                              color="#e2ecf7"
                            ></v-btn>
                          </v-btn-group>
                        </td>
                      </tr>
                    </template>
                  </v-hover>
                </template>
                <template v-slot:bottom> </template>
              </v-data-table>
            </v-card>

            <v-select
              :items="[
                'KI_ExamTemplate_SebClientSettings_T1_3.6.0',
                '2024FS_T1.1',
                '2024HS_T1.0',
              ]"
              item-title="Exam Template"
              label="Exam Template"
              variant="outlined"
              v-model="selectedTemplate"
            >
            </v-select>
            <v-select
              :items="['Smart Devices', 'Nokia', 'VDI', 'Parallels Desktop']"
              item-title="Exam Template"
              label="Exam Type"
              variant="outlined"
              v-model="selectedType"
            >
            </v-select>
            <v-select
              :items="[
                'Hannah Egger',
                'Mein-Eigener Name',
                'Max Mustermann',
                'Andere Person',
              ]"
              item-title="Exam Template"
              label="Exam Supporter"
              variant="outlined"
              v-model="selectedSupporter"
            >
            </v-select>
            <v-text-field
              variant="outlined"
              label="Quit Password*"
              v-model="password"
              :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
              :rules="[rules.required, rules.min]"
            >
              <template v-slot:append>
                <!-- <v-btn flat prepend-icon="mdi-cube"> Generate Password </v-btn> -->
                <v-btn
                  flat
                  prepend-icon="mdi-information"
                  @click="togglePasswordHintDialog()"
                >
                </v-btn>
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-stepper>
</template>

<script setup>
const store = useGstore();
const {
  selected,
  selectedDashboard,
  selectedExams,
  selectedDatatables,
  selectedMonitoring,
  activeStep,
  sebSettings,
  history: activeStepHistory,
} = storeToRefs(store);
const freeSteps = ref([1]);

// const panel = ref([
//   "details",
//   "examconfiguration",
//   "indicators",
//   "clientgroups",
// ]);
const panel = ref("details");
function all() {
  panel.value = ["details", "examconfiguration", "indicators", "clientgroups"];
}

// step 1
const selectedLMS = ref(null);
const items = [
  {
    name: "Moodle Production",
    icon: "Moodle",
  },
  {
    name: "Moodle Development 1.1",
    icon: "Moodle",
  },
  {
    name: "Moodle Development 2.0",
    icon: "Moodle",
  },
  // {
  //   name: "Open EdX",
  //   icon: "openedx",
  // },
  // {
  //   name: "OpenOlat",
  //   icon: "openolat",
  // },
];
watch(selectedLMS, () => {
  if (selectedLMS.value) {
    selectedTable.value = -1;
    freeSteps.value = [1, 2];
  } else {
    freeSteps.value = [1];
  }
});

// step 2
const selectedTable = ref(-1);
const loading = ref(true);
const date = ref(null);
const time1 = ref(null);
const menu1 = ref(false);
const time2 = ref(null);
const menu2 = ref(false);
const search = ref("");
const headers = [
  {
    align: "start",
    title: "Name",
    key: "name",
  },
  { title: "Start", key: "startDate" },
  { title: "End", key: "endDate" },
  { title: "Institution", key: "institution" },
  { title: "LMS", key: "platform" },
  { title: "Lecturer", key: "lecturer" },
  { title: "Details", key: "actions" },
];
const dataItems = [
  {
    name: "Theoretical Philosophy II",
    institution: "ETH Zurich",
    lecturer: "Prof. Dr. Thomas Metzinger",
    startDate: "2024/02/01",
    endDate: "2024/03/01",
    startTime: "08:00",
    endTime: "10:00",
    duration: "02:00",
    session: "1 of 2",
    status: "scheduled",
    platform: "Moodle",
    type: "managed",
  },
  {
    name: "Introduction to Computer Science",
    institution: "Stanford University",
    lecturer: "Prof. Dr. John Smith",
    startDate: "2024/02/01",
    endDate: "2024/03/01",
    startTime: "10:00",
    endTime: "12:00",
    duration: "02:00",
    session: "1 of 3",
    status: "not imported yet",
    platform: "Moodle",
    type: "managed",
  },
  {
    name: "Data Structures and Algorithms",
    institution: "MIT",
    lecturer: "Prof. Dr. Emily Johnson",
    startDate: "2024/02/01",
    endDate: "2024/03/01",
    startTime: "14:00",
    endTime: "16:00",
    duration: "02:00",
    session: "2 of 3",
    status: "not imported yet",
    platform: "Moodle",
    type: "managed",
  },
  {
    name: "Artificial Intelligence",
    institution: "University of Cambridge",
    lecturer: "Prof. Dr. Michael Brown",
    startDate: "2024/02/01",
    endDate: "2024/03/01",
    startTime: "16:00",
    endTime: "18:00",
    duration: "02:00",
    session: "3 of 3",
    status: "not imported yet",
    platform: "Moodle",
    type: "managed",
  },
];
const detailsDialog = ref(false);
const toggleDetailsDialog = useToggle(detailsDialog);
const dataTableRef = ref(null);
const btn = ref(null);
const snackbarImportSettingsReset = ref(false);
const setSelectedTable = (item, index) => {
  if (selectedTable.value === index) {
    selectedTable.value = -1;
  } else {
    selectedTable.value = index;
  }
};
watch(activeStep, () => {
  if (activeStep.value === 1) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  } else if (activeStep.value === 4) {
    freeSteps.value = [];
  }
});
watch(selectedTable, () => {
  if (selectedTable.value >= 0) {
    freeSteps.value = [1, 2, 3];
    console.log(activeStepHistory.value);
    if (activeStepHistory.value[1].snapshot === 2) {
      snackbarImportSettingsReset.value = true;
      password.value = "";
    }
  } else {
    freeSteps.value = [1, 2];
  }
});

// step 3
const lock3 = ref(true);
const selectedType = ref("Managed Devices");
const selectedTemplate = ref("2024HS_T1.0");
const selectedSupporter = ref("Mein-Eigener Name");
const singleDataItems = [
  {
    name: "Theoretical Philosophy II",
    institution: "ETH Zurich",
    lecturer: "Prof. Dr. Thomas Metzinger",
    startDate: "2024/02/01",
    endDate: "2024/03/01",
    startTime: "08:00",
    endTime: "10:00",
    duration: "02:00",
    session: "1 of 2",
    status: "scheduled",
    platform: "Moodle",
    type: "managed",
  },
];
const rules = {
  step3: () => !lock3.value,
  required: (value) => {
    if (!value) {
      lock3.value = true;
      return "Required.";
    }
    lock3.value = false;
    return !!value;
  },
  min: (v) => {
    if (v.length >= 8) {
      lock3.value = false;
      return true;
    }
    lock3.value = true;
    return "Min 8 characters";
  },
  emailMatch: () => `The email and password you entered don't match`,
};
const show1 = ref(false);
const password = ref("");
const passwordHintDialog = ref(false);
const togglePasswordHintDialog = useToggle(passwordHintDialog);
const singleDataTable = ref(null);

// step 4
const saveimportLoading = ref(false);
const saveAndImport = () => {
  activeStep.value = 3;
  saveimportLoading.value = true;
  setTimeout(() => {
    saveimportLoading.value = false;
    activeStep.value++;
  }, 2000);
};

// step 5
const snackbar = ref(false);
const tabOpened = ref(false);
const downloaded = ref(false);
const importSettings = ref(false);
function downloadConfigFile() {
  const content = "config file";
  const filename = "config.txt";

  // Create a Blob with the text content
  const blob = new Blob([content], { type: "text/plain" });

  // Create a temporary link element
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  // Append the link to the document, trigger the download, and remove the link
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const actionItemsNextSteps = ref([
  {
    icon: "mdi-delete",
    text: "Delete Imported Exam",
    tooltip: "Deletes the imported exam you just imported.",
    action: () => {
      activeStep.value = 0;
      snackbar.value = true;
    },
  },
  {
    icon: "mdi-format-list-bulleted",
    text: "View Exam in Exams Overview",
    tooltip: "Shows the exam in a list of all imported exams.",
    action: () => {
      selected.value = ["exams"];
      selectedExams.value = ["examsall"];
      selectedDatatables.value = ["Theoretical Philosophy II"];
    },
  },
  {
    icon: "mdi-application-cog",
    text: "Change Exam Import Settings",
    tooltip: "Opens the exams settings dialog.",
    action: () => {
      importSettings.value = true;
    },
  },
  {
    icon: "mdi-security",
    text: "Change Exam SEB Settings",
    tooltip: "Opens the exams SEB settings dialog.",
    action: () => {
      sebSettings.value = true;
    },
  },
  {
    icon: "mdi-test-tube",
    text: "Start Exam Testrun",
    tooltip:
      "Opens the Moodle page of the exam where the testrun can be started.",
    action: () => {
      window.open("https://moodle.com/", "_blank");
      setTimeout(() => {
        tabOpened.value = true;
      }, 1000);
    },
    chip: "Switch to tab",
  },
  {
    icon: "mdi-monitor-eye",
    text: "View Exam in Monitoring",
    tooltip: "Opens the monitoring page of the exam.",
    action: () => {
      selected.value = ["monitoring"];
      selectedMonitoring.value = ["monitoringall"];
    },
  },
  {
    icon: "mdi-application-export",
    text: "Export Configuration File",
    tooltip: "Exports the exam configuration file.",
    action: () => {
      downloadConfigFile();
      setTimeout(() => {
        downloaded.value = true;
      }, 1000);
    },
    chip: "Downloaded",
  },
  {
    icon: "mdi-plus",
    text: "Import another Exam",
    tooltip: "Opens the import dialog again.",
    action: () => {
      activeStep.value = 0;
    },
  },
  {
    icon: "mdi-check",
    text: "Finish",
    tooltip: "Forwards you to the dashboard.",
    action: () => {
      selected.value = ["dashboard"];
      selectedDashboard.value = ["dashboardall"];
    },
  },
]);
const actionByIndex = (index) => {
  actionItemsNextSteps.value[index].action();
};

onMounted(() => {
  password.value = "";

  // step 2
  useEventListener(dataTableRef, "dblclick", (evt) => {
    toggleDetailsDialog();
  });

  //  step 3
  useEventListener(singleDataTable, "dblclick", (evt) => {
    toggleDetailsDialog();
  });
});
</script>

<style>
.borderTopExp {
  border-top: 1px solid gainsboro;
}
</style>
