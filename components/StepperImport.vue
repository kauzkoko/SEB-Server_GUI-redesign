<template>
  <v-stepper
    class="m-3"
    editable
    :items="[
      'Select E-Learning Platform',
      'Select Exam',
      'Customize Import Settings',
      'Review Import Settings',
      'Next Steps',
    ]"
  >
    <template v-slot:item.1>
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
    </template>

    <template v-slot:item.2>
      <v-card
        flat
        subtitle="Search and select the exam you want to import from the selected e-learning platform."
      >
        <template v-slot:title>Import Exam </template>
        <v-card-text>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="search"
                label="Search Exams by Name"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                hide-details
                single-line
              ></v-text-field>
            </v-col>
            <v-col cols="3">
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
          </v-row>
          <v-data-table
            :headers="headers"
            v-model="selected"
            :items="dataItems"
            :item-value="(item) => `${item.name}`"
            :loading="loading"
            :search="search"
            :items-per-page="10"
          >
            <template v-slot:loading>
              <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:item="{ item, index }">
              <v-hover>
                <template v-slot:default="{ isHovering, props }">
                  <tr
                    @click="doNothing(item, index)"
                    v-bind="props"
                    :class="[
                      isHovering ? 'bg-grey-lighten-4 cursor-pointer' : '',
                      // selectedTable === index ? 'bg-grey-lighten-3' : '',
                      selectedTable === index
                        ? 'bg-hex-e2ecf7 text-hex-1867C0'
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
    </template>

    <template v-slot:item.3>
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
            >
              <template v-slot:item="{ item, index }">
                <v-hover>
                  <template v-slot:default="{ isHovering, props }">
                    <tr
                      @click="doNothing(item, index)"
                      v-bind="props"
                      class="text-hex-1867C0 bg-hex-e2ecf7"
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
            <!-- <v-expansion-panels>
              <v-expansion-panel
                title="Theoretical Philosophy II"
                expand-icon="mdi-information"
              >
                <v-expansion-panel-text>
                  <v-table class="mt-0" density="compact">
                    <tbody>
                      <tr align="right">
                        <th>Name:</th>
                        <td>Theoretical Philosophy II</td>
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
                    </tbody>
                  </v-table>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels> -->
            <!-- <v-table class="mt-0" density="compact">
              <tbody>
                <tr>
                  <td>Theoretical Philosophy II</td>
                </tr>

                <tr>
                  <td>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Similique sit doloremque minima sint, culpa voluptas rerum
                  </td>
                </tr>

                <tr>
                  <td>12.05.2024 08:00 (UTC1) - 12.05.2024 08:00 (UTC1)</td>
                </tr>

                <tr>
                  <td><v-chip size="small">Moodle</v-chip></td>
                </tr>

                <tr>
                  <td class="underline">
                    https://example.com/tsfasf/asdf23/2342323
                  </td>
                </tr>
              </tbody>
            </v-table> -->
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
              <v-btn flat prepend-icon="mdi-information"> </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:item.4>
      <v-card
        title="Review Settings"
        subtitle="Review the import settings of the exam. Continue to export, reconfigure, test or view the exam."
        flat
      >
        <v-card-text>
          <v-card class="mb-7 pb-0">
            <v-table class="mt-0" density="compact">
              <tbody>
                <tr align="right">
                  <th>Name:</th>
                  <td>Theoretical Philosophy II</td>
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
                  <th>Battery Status Indicator:</th>
                  <td class="underline">
                    <v-chip>50%</v-chip>
                    <v-chip>30%</v-chip>
                    <v-chip>10%</v-chip>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:item.5>
      <v-card
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
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </v-stepper>

  <v-dialog :activator="btn" max-width="1000">
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
                <th>LMS:</th>
                <td><v-chip color="red" size="small">Moodle</v-chip></td>
              </tr>

              <tr align="right">
                <th>LMS Exam URL:</th>
                <td class="underline">
                  https://example.com/tsfasf/asdf23/2342323
                </td>
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
</template>

<script setup>
const truncateString = (str, maxLength) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};

const dialog = shallowRef(false);
const btn = ref(null);

const selectedType = ref("Managed Devices");
const selectedTemplate = ref("VDI Type 2 Template");
const selectedSupporter = ref("Mein-Eigener Name");

const rules = {
  required: (value) => "Required." || !!value || "Required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
};

const password = ref("");
const show1 = ref(false);

const date = ref(null);
const time1 = ref(null);
const menu1 = ref(false);
const time2 = ref(null);
const menu2 = ref(false);

const loading = ref(true);

const actionItemsNextSteps = ref([
  {
    icon: "mdi-format-list-bulleted",
    text: "View Exam in Exams Overview",
  },
  {
    icon: "mdi-application-cog",
    text: "Change Exam Settings",
  },
  {
    icon: "mdi-export",
    text: "Export Configuration File",
  },
  {
    icon: "mdi-test-tube",
    text: "Start Exam Testrun",
  },
  {
    icon: "mdi-monitor-eye",
    text: "View Exam in Monitoring",
  },
  {
    icon: "mdi-check",
    text: "Finish",
  },
]);

const selected = ref([]);
const search = ref("");
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

const selectedTable = ref(0);
const doNothing = (item, index) => {
  // console.log(item.value);
  // console.log(index);
  if (selectedTable.value === index) {
    selectedTable.value = -1;
  } else {
    selectedTable.value = index;
  }
};

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

onMounted(() => {
  password.value = "";
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
