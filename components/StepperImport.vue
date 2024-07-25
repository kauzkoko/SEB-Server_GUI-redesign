<template>
  <v-stepper
    class="m-3"
    editable
    :items="['Select LMS', 'Import Exam', 'Configure Exam', 'Next Steps']"
  >
    <template v-slot:item.1>
      <v-card
        title="Select E-Learning Platform / Learning Management System (LMS)"
        subtitle="Choose and select the e-learning platform you want to import an exam from. Most probably this is where you have created your exam beforehand."
        flat
      >
        <v-card-text>
          <v-select :items="items" item-title="name" label="LMS">
            <template v-slot:selection="{ item, index }">
              <v-img
                src="/moodle.png"
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
            <v-col cols="7">
              <v-text-field
                :loading="loading"
                append-inner-icon="mdi-magnify"
                label="Search Exams"
                hide-details
                single-line
              ></v-text-field
            ></v-col>
            <v-col cols="3">
              <v-date-input
                v-model="model"
                label="Select Timespan"
                max-width="300"
                multiple="range"
                append-inner-icon="mdi-calendar"
                prepend-icon=""
              ></v-date-input
            ></v-col>
            <v-col cols="2" class="justify-end align-end text-right"
              >Advanced search</v-col
            >
          </v-row>
        </v-card-text>
      </v-card>
    </template>

    <template v-slot:item.3>
      <v-card title="Configure Exam" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>

    <template v-slot:item.4>
      <v-card title="Monitor Exam" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>

    <template v-slot:item.5>
      <v-card title="Analyse exam results" flat>
        <v-list>
          <v-list-item>Do this and that.</v-list-item>
        </v-list>
      </v-card>
    </template>
  </v-stepper>
</template>

<script setup>
const items = [
  {
    name: "Moodle",
    icon: "moodle",
  },
  {
    name: "Open EdX",
    icon: "openedx",
  },
  {
    name: "OpenOlat",
    icon: "openolat",
  },
];
</script>
