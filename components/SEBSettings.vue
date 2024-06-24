<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="1400" max-height="80vh">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-account"
          text="Edit Profile"
          variant="tonal"
          v-bind="activatorProps"
        ></v-btn>
      </template>
      <v-card color="basil" title="Exam Settings">
        <v-tabs v-model="tab" bg-color="transparent" color="basil" grow>
          <v-tab
            v-for="item in items"
            :key="item"
            :text="item"
            :value="item"
          ></v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" class="overflow-auto">
          <v-tabs-window-item v-for="item in items" :key="item" :value="item">
            <v-card color="basil" flat>
              <v-card-text>
                <v-sheet>
                  <v-list density="compact">
                    <v-list-subheader>General</v-list-subheader>
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
                    <!-- <v-divider class="mb-7"></v-divider> -->
                    <v-list-item density="compact">
                      <template v-slot:title>
                        <v-row>
                          <v-col cols="2" class="mt-2"
                            ><span>Quitting Password</span></v-col
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
                  </v-list>
                </v-sheet>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
const store = useGstore();
const { checkboxes } = storeToRefs(store);
const dialog = shallowRef(true);

const tab = ref("General");

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
