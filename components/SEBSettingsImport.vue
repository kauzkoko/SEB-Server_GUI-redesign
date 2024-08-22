<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="2200" max-height="80vh">
      <v-card color="basil" title="Exam Settings">
        <div class="flex flex-row justify-between">
          <div>
            <v-tabs
              v-model="tab"
              bg-color="transparent"
              color="basil"
              grow
              class="min-h-50px h-200px z-1"
            >
              <v-tab
                v-for="item in items"
                :key="item"
                :text="item"
                :value="item"
              ></v-tab>
            </v-tabs>
            <v-tabs-window v-model="tab" class="overflow-auto w-1600px">
              <v-tabs-window-item
                v-for="(item, index) in items"
                :key="item"
                :value="item"
              >
                <v-card flat>
                  <v-card-text>
                    <v-sheet>
                      <v-list density="compact" v-if="index === 0">
                        <v-list-subheader class="mt-0"
                          >General</v-list-subheader
                        >
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Administrator Password</span></v-col
                              >
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Administrator Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Confirm Administrator Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                ></v-text-field>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Quitting/Unlocking Password</span></v-col
                              >
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Quit Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Confirm Quit Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="2">
                                <v-checkbox
                                  density="compact"
                                  label="Quitting SEB allowed"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-divider class="my-4"></v-divider>
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact" class="mt-4">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-4">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-microsoft-windows"
                                ></v-icon
                                ><span>Windows Options</span></v-col
                              >
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-switch
                                    inset
                                    color="primary"
                                    label="Enable Toolbar"
                                    v-model="enableToolbar"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="5">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-form-textbox"
                                  ></v-icon>
                                  <div class="mr-3">Allow Address Bar</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleAddressBar"
                                    variant="outlined"
                                    :disabled="!enableToolbar"
                                    multiple
                                  >
                                    <v-btn value="left">Main window</v-btn>
                                    <v-btn value="center"
                                      >Additional windows</v-btn
                                    >
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  :disabled="!enableToolbar"
                                  inset
                                  color="primary"
                                  label="Developer Tools"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-apple"
                                ></v-icon
                                ><span>Mac Options</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableToolbarMac"
                                  label="Enable Toolbar"
                                ></v-switch>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Hide Toolbar per default"
                                  :disabled="!enableToolbar"
                                ></v-switch>
                              </v-col> </v-row
                            ><v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Show Menu Bar"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-music"
                                ></v-icon
                                ><span>Audio Control</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableControls"
                                  label="Enable Controls"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4 mb-6"
                                    icon="mdi-volume-mute"
                                  ></v-icon>
                                  <v-switch
                                    inset
                                    color="primary"
                                    v-model="muteOnStartup"
                                    label="Mute on Startup"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="6">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mt-2 ml-6"
                                    icon="mdi-volume-high"
                                  ></v-icon>
                                  <v-slider
                                    v-model="initialVolume"
                                    :max="100"
                                    :step="1"
                                    class="ml--3 mt-2"
                                    label="Inital Volume"
                                    hide-details
                                  >
                                    <template v-slot:append>
                                      <v-text-field
                                        v-model="initialVolume"
                                        density="compact"
                                        style="width: 80px"
                                        type="number"
                                        variant="outlined"
                                        hide-details
                                        :disabled="muteOnStartup"
                                      ></v-text-field>
                                      <span class="ml-3">%</span>
                                    </template>
                                  </v-slider>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-lock"
                                ></v-icon
                                ><span>Lockscreen</span></v-col
                              >
                              <v-col cols="4" class="mt--3 ml--5">
                                <v-expansion-panels flat bg-color="white">
                                  <v-expansion-panel>
                                    <template v-slot:title>
                                      <div
                                        class="bg-yellow w-30px aspect-1 mr-4 rounded-full"
                                      ></div>
                                      <span>Background Color</span>
                                    </template>
                                    <template v-slot:text>
                                      <v-color-picker
                                        hide-inputs
                                      ></v-color-picker>
                                    </template>
                                  </v-expansion-panel>
                                </v-expansion-panels>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-divider class="my-4"></v-divider>
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact" class="mt-4">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-4">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-microsoft-windows"
                                ></v-icon
                                ><span>Windows Options</span></v-col
                              >
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-switch
                                    inset
                                    color="primary"
                                    label="Enable Toolbar"
                                    v-model="enableToolbar"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="5">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-form-textbox"
                                  ></v-icon>
                                  <div class="mr-3">Allow Address Bar</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleAddressBar"
                                    variant="outlined"
                                    :disabled="!enableToolbar"
                                    multiple
                                  >
                                    <v-btn value="left">Main window</v-btn>
                                    <v-btn value="center"
                                      >Additional windows</v-btn
                                    >
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  :disabled="!enableToolbar"
                                  inset
                                  color="primary"
                                  label="Developer Tools"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-apple"
                                ></v-icon
                                ><span>Mac Options</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableToolbarMac"
                                  label="Enable Toolbar"
                                ></v-switch>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Hide Toolbar per default"
                                  :disabled="!enableToolbar"
                                ></v-switch>
                              </v-col> </v-row
                            ><v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Show Menu Bar"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-music"
                                ></v-icon
                                ><span>Audio Control</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableControls"
                                  label="Enable Controls"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4 mb-6"
                                    icon="mdi-volume-mute"
                                  ></v-icon>
                                  <v-switch
                                    inset
                                    color="primary"
                                    v-model="muteOnStartup"
                                    label="Mute on Startup"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="6">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mt-2 ml-6"
                                    icon="mdi-volume-high"
                                  ></v-icon>
                                  <v-slider
                                    v-model="initialVolume"
                                    :max="100"
                                    :step="1"
                                    class="ml--3 mt-2"
                                    label="Inital Volume"
                                    hide-details
                                  >
                                    <template v-slot:append>
                                      <v-text-field
                                        v-model="initialVolume"
                                        density="compact"
                                        style="width: 80px"
                                        type="number"
                                        variant="outlined"
                                        hide-details
                                        :disabled="muteOnStartup"
                                      ></v-text-field>
                                      <span class="ml-3">%</span>
                                    </template>
                                  </v-slider>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-lock"
                                ></v-icon
                                ><span>Lockscreen</span></v-col
                              >
                              <v-col cols="4" class="mt--3 ml--5">
                                <v-expansion-panels flat bg-color="white">
                                  <v-expansion-panel>
                                    <template v-slot:title>
                                      <div
                                        class="bg-yellow w-30px aspect-1 mr-4 rounded-full"
                                      ></div>
                                      <span>Background Color</span>
                                    </template>
                                    <template v-slot:text>
                                      <v-color-picker
                                        hide-inputs
                                      ></v-color-picker>
                                    </template>
                                  </v-expansion-panel>
                                </v-expansion-panels>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-divider class="my-4"></v-divider>
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact" class="mt-4">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-4">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-microsoft-windows"
                                ></v-icon
                                ><span>Windows Options</span></v-col
                              >
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-switch
                                    inset
                                    color="primary"
                                    label="Enable Toolbar"
                                    v-model="enableToolbar"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="5">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-form-textbox"
                                  ></v-icon>
                                  <div class="mr-3">Allow Address Bar</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleAddressBar"
                                    variant="outlined"
                                    :disabled="!enableToolbar"
                                    multiple
                                  >
                                    <v-btn value="left">Main window</v-btn>
                                    <v-btn value="center"
                                      >Additional windows</v-btn
                                    >
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  :disabled="!enableToolbar"
                                  inset
                                  color="primary"
                                  label="Developer Tools"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-apple"
                                ></v-icon
                                ><span>Mac Options</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableToolbarMac"
                                  label="Enable Toolbar"
                                ></v-switch>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Hide Toolbar per default"
                                  :disabled="!enableToolbar"
                                ></v-switch>
                              </v-col> </v-row
                            ><v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Show Menu Bar"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-music"
                                ></v-icon
                                ><span>Audio Control</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableControls"
                                  label="Enable Controls"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4 mb-6"
                                    icon="mdi-volume-mute"
                                  ></v-icon>
                                  <v-switch
                                    inset
                                    color="primary"
                                    v-model="muteOnStartup"
                                    label="Mute on Startup"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="6">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mt-2 ml-6"
                                    icon="mdi-volume-high"
                                  ></v-icon>
                                  <v-slider
                                    v-model="initialVolume"
                                    :max="100"
                                    :step="1"
                                    class="ml--3 mt-2"
                                    label="Inital Volume"
                                    hide-details
                                  >
                                    <template v-slot:append>
                                      <v-text-field
                                        v-model="initialVolume"
                                        density="compact"
                                        style="width: 80px"
                                        type="number"
                                        variant="outlined"
                                        hide-details
                                        :disabled="muteOnStartup"
                                      ></v-text-field>
                                      <span class="ml-3">%</span>
                                    </template>
                                  </v-slider>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-lock"
                                ></v-icon
                                ><span>Lockscreen</span></v-col
                              >
                              <v-col cols="4" class="mt--3 ml--5">
                                <v-expansion-panels flat bg-color="white">
                                  <v-expansion-panel>
                                    <template v-slot:title>
                                      <div
                                        class="bg-yellow w-30px aspect-1 mr-4 rounded-full"
                                      ></div>
                                      <span>Background Color</span>
                                    </template>
                                    <template v-slot:text>
                                      <v-color-picker
                                        hide-inputs
                                      ></v-color-picker>
                                    </template>
                                  </v-expansion-panel>
                                </v-expansion-panels>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-divider class="my-4"></v-divider>
                      </v-list>
                      <v-list density="compact" v-if="index === 1">
                        <v-list-subheader class="mt-3"
                          >General</v-list-subheader
                        >
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Administrator Password</span></v-col
                              >
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Administrator Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Confirm Administrator Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                ></v-text-field>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Quitting/Unlocking Password</span></v-col
                              >
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Quit Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-text-field
                                  density="compact"
                                  label="Confirm Quit Password*"
                                  v-model="password"
                                  :append-inner-icon="
                                    show1 ? 'mdi-eye' : 'mdi-eye-off'
                                  "
                                  :type="show1 ? 'text' : 'password'"
                                  @click:append="show1 = !show1"
                                  :rules="[rules.required, rules.min]"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="2">
                                <v-checkbox
                                  density="compact"
                                  label="Quitting SEB allowed"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-divider class="my-4"></v-divider>
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                      </v-list>
                      <v-list density="compact" v-if="index === 2">
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact" class="mt-4">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-4">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-microsoft-windows"
                                ></v-icon
                                ><span>Windows Options</span></v-col
                              >
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-switch
                                    inset
                                    color="primary"
                                    label="Enable Toolbar"
                                    v-model="enableToolbar"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="5">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-form-textbox"
                                  ></v-icon>
                                  <div class="mr-3">Allow Address Bar</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleAddressBar"
                                    variant="outlined"
                                    :disabled="!enableToolbar"
                                    multiple
                                  >
                                    <v-btn value="left">Main window</v-btn>
                                    <v-btn value="center"
                                      >Additional windows</v-btn
                                    >
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  :disabled="!enableToolbar"
                                  inset
                                  color="primary"
                                  label="Developer Tools"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-apple"
                                ></v-icon
                                ><span>Mac Options</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableToolbarMac"
                                  label="Enable Toolbar"
                                ></v-switch>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Hide Toolbar per default"
                                  :disabled="!enableToolbar"
                                ></v-switch>
                              </v-col> </v-row
                            ><v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Show Menu Bar"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-music"
                                ></v-icon
                                ><span>Audio Control</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableControls"
                                  label="Enable Controls"
                                ></v-switch>
                              </v-col>
                            </v-row>
                            <v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4 mb-6"
                                    icon="mdi-volume-mute"
                                  ></v-icon>
                                  <v-switch
                                    inset
                                    color="primary"
                                    v-model="muteOnStartup"
                                    label="Mute on Startup"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="6">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mt-2 ml-6"
                                    icon="mdi-volume-high"
                                  ></v-icon>
                                  <v-slider
                                    v-model="initialVolume"
                                    :max="100"
                                    :step="1"
                                    class="ml--3 mt-2"
                                    label="Inital Volume"
                                    hide-details
                                  >
                                    <template v-slot:append>
                                      <v-text-field
                                        v-model="initialVolume"
                                        density="compact"
                                        style="width: 80px"
                                        type="number"
                                        variant="outlined"
                                        hide-details
                                        :disabled="muteOnStartup"
                                      ></v-text-field>
                                      <span class="ml-3">%</span>
                                    </template>
                                  </v-slider>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-lock"
                                ></v-icon
                                ><span>Lockscreen</span></v-col
                              >
                              <v-col cols="4" class="mt--3 ml--5">
                                <v-expansion-panels flat bg-color="white">
                                  <v-expansion-panel>
                                    <template v-slot:title>
                                      <div
                                        class="bg-yellow w-30px aspect-1 mr-4 rounded-full"
                                      ></div>
                                      <span>Background Color</span>
                                    </template>
                                    <template v-slot:text>
                                      <v-color-picker
                                        hide-inputs
                                      ></v-color-picker>
                                    </template>
                                  </v-expansion-panel>
                                </v-expansion-panels>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                      </v-list>
                      <v-list density="compact" v-else>
                        <v-list-subheader>UI</v-list-subheader>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>View</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-3"
                                    icon="mdi-fullscreen"
                                  ></v-icon>
                                  <div class="mr-3">Mode</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    variant="outlined"
                                    v-model="toggleBrowserMode"
                                  >
                                    <v-btn value="left">Browser</v-btn>
                                    <v-btn value="center">Fullscreen</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="4">
                                <v-checkbox
                                  density="compact"
                                  label="Optimized for touchscreens"
                                ></v-checkbox>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-2"
                                ><span>Window</span></v-col
                              >
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-left-right"
                                  ></v-icon>
                                  <div class="mr-3">Width</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserWidth"
                                    variant="outlined"
                                  >
                                    <template v-slot:prepend> Test </template>
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">1000</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-arrow-up-down"
                                  ></v-icon>
                                  <div class="mr-3">Height</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserHeight"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">100%</v-btn>
                                    <v-btn value="center">50%</v-btn>
                                    <v-btn value="center">800</v-btn>
                                    <v-btn value="center">600</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-2"
                                    icon="mdi-arrow-decision"
                                  ></v-icon>
                                  <div class="mr-2">Position</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleBrowserPosition"
                                    variant="outlined"
                                  >
                                    <v-btn value="left">Left</v-btn>
                                    <v-btn value="center">Center</v-btn>
                                    <v-btn value="center">Right</v-btn>
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                            </v-row></template
                          >
                        </v-list-item>
                        <v-list-item density="compact" class="mt-4">
                          <template v-slot:title>
                            <v-row>
                              <v-col cols="2" class="mt-4">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-microsoft-windows"
                                ></v-icon
                                ><span>Windows Options</span></v-col
                              >
                              <v-col cols="2">
                                <div class="flex flex-row items-center">
                                  <v-switch
                                    inset
                                    color="primary"
                                    label="Enable Toolbar"
                                    v-model="enableToolbar"
                                  ></v-switch>
                                </div>
                              </v-col>
                              <v-col cols="5">
                                <div class="flex flex-row items-center">
                                  <v-icon
                                    size="small"
                                    class="mr-4"
                                    icon="mdi-form-textbox"
                                  ></v-icon>
                                  <div class="mr-3">Allow Address Bar</div>
                                  <v-btn-toggle
                                    group
                                    mandatory
                                    v-model="toggleAddressBar"
                                    variant="outlined"
                                    :disabled="!enableToolbar"
                                    multiple
                                  >
                                    <v-btn value="left">Main window</v-btn>
                                    <v-btn value="center"
                                      >Additional windows</v-btn
                                    >
                                  </v-btn-toggle>
                                </div>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  :disabled="!enableToolbar"
                                  inset
                                  color="primary"
                                  label="Developer Tools"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                        <v-list-item density="compact">
                          <template v-slot:title>
                            <v-row dense>
                              <v-col cols="2" class="mt-2">
                                <v-icon
                                  size="small"
                                  class="mr-4"
                                  icon="mdi-apple"
                                ></v-icon
                                ><span>Mac Options</span></v-col
                              >
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  v-model="enableToolbarMac"
                                  label="Enable Toolbar"
                                ></v-switch>
                              </v-col>
                              <v-col cols="3">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Hide Toolbar per default"
                                  :disabled="!enableToolbar"
                                ></v-switch>
                              </v-col> </v-row
                            ><v-row no-gutters>
                              <v-col cols="2"> </v-col>
                              <v-col cols="2">
                                <v-switch
                                  inset
                                  color="primary"
                                  label="Show Menu Bar"
                                ></v-switch>
                              </v-col> </v-row
                          ></template>
                        </v-list-item>
                      </v-list>
                    </v-sheet>
                  </v-card-text>
                </v-card>
              </v-tabs-window-item>
            </v-tabs-window>
          </div>
          <div>
            <div class="ml-8 mt-3">
              <v-timeline
                align="start"
                side="end"
                class="h-500px w-500px"
                truncate-line="start"
                density="compact"
              >
                <v-timeline-item size="small" dot-color="red">
                  <template v-slot:icon>
                    <v-icon icon="mdi-undo" size="x-small"></v-icon>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">just now</strong>
                    <div>
                      <strong>Changed Mode "Browser" to "Fullscreen"</strong>
                      <div class="text-caption">Browser Tab</div>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item size="small" dot-color="green">
                  <template v-slot:icon>
                    <v-hover>
                      <template v-slot:default="{ isHovering, props }">
                        <v-icon
                          :icon="isHovering ? 'mdi-undo' : 'mdi-check'"
                          size="x-small"
                          v-bind="props"
                        ></v-icon>
                      </template>
                    </v-hover>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">30sec ago</strong>
                    <div>
                      <strong>Changed Mode "Browser" to "Fullscreen"</strong>
                      <div class="text-caption">Browser Tab</div>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item size="small" dot-color="green">
                  <template v-slot:icon>
                    <v-icon icon="mdi-check" size="x-small"></v-icon>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">2min ago</strong>
                    <div>
                      <strong>Enabled Toolbar</strong>
                      <div class="text-caption">UI Tab / Mac Options</div>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item size="small" dot-color="blue">
                  <template v-slot:icon>
                    <v-icon icon="mdi-content-save" size="x-small"></v-icon>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">4min ago</strong>
                    <div>
                      <strong>Saved state</strong>
                      <div class="text-caption">Browser</div>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item size="small" dot-color="green">
                  <template v-slot:icon>
                    <v-icon icon="mdi-check" size="x-small"></v-icon>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">6min ago</strong>
                    <div>
                      <strong>Enabled Toolbar</strong>
                      <div class="text-caption">UI Tab / Mac Options</div>
                    </div>
                  </div>
                </v-timeline-item>
                <v-timeline-item size="small" dot-color="yellow">
                  <template v-slot:icon>
                    <v-icon icon="mdi-open-in-app" size="x-small"></v-icon>
                  </template>
                  <div class="d-flex">
                    <strong class="me-4">8min ago</strong>
                    <div>
                      <strong>Opened SEB Settings</strong>
                      <div class="text-caption">Exam: Philosophy II</div>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const store = useGstore();
const { checkboxes } = storeToRefs(store);
const dialog = shallowRef(true);
const toggleBrowserMode = ref([0]);
const toggleBrowserWidth = ref([0]);
const toggleBrowserHeight = ref([0]);
const toggleBrowserPosition = ref([0]);
const toggleAddressBar = ref([0]);
const enableToolbar = ref(false);
const enableToolbarMac = ref(false);
const initialVolume = ref(50);
const muteOnStartup = ref(true);
const tab = ref("General");
const enableControls = ref(true);

const rules = {
  required: (value) => !!value || "Required.",
  min: (v) => v.length >= 8 || "Min 8 characters",
  emailMatch: () => `The email and password you entered don't match`,
};

const show1 = ref(false);
const show2 = ref(true);
const password = ref("Password");

const items = [
  "General",
  "UI",
  "Browser",
  "Down-/Uploads",
  "Exam",
  "Applications",
  "Network",
  "Security",
  "Registry",
  "Hooked Keys",
  "Proctoring",
];
const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
</script>
