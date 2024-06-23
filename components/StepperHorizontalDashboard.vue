<template>
  <v-card
    class="mt-5 ml-5 mb-0 mr-0 h-400px aspect-1 max-w-400px max-h-400px overflow-auto"
    prepend-icon="mdi-wizard-hat"
    title="SEB Creator Wizard"
    :append-icon="pinned ? 'mdi-star-minus' : 'mdi-star-check'"
  >
    <v-card-subtitle
      >Step by step guide to create and edit exams</v-card-subtitle
    >

    <v-card-text>
      <v-stepper
        mobile
        editable
        :items="[
          'Create or import an exam',
          'Configure the exam',
          'Run and monitor the exam',
          'Analyse exam results',
        ]"
      >
        <template v-slot:item.1>
          <v-card title="Create, find or import an exam.">
            <v-list>
              <v-list-item>
                <div>
                  <v-btn-group>
                    <v-btn size="x-small">
                      <template v-slot:prepend>
                        <v-img
                          src="/moodle.png"
                          class="w-24px aspect-1 mb-1"
                        ></v-img>
                      </template>
                      Import</v-btn
                    >
                    <v-btn size="x-small" prepend-icon="mdi-file-search"
                      >Search/Find</v-btn
                    >
                    <v-btn size="x-small" prepend-icon="mdi-application"
                      >Create</v-btn
                    >
                  </v-btn-group>
                </div></v-list-item
              >
            </v-list>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Configure the selected exam." flat>
            <v-list>
              <v-list-item>
                <!-- Click the button to edit and configure the selected exam. -->
                <div>
                  <v-btn-group>
                    <v-btn size="small" prepend-icon="mdi-file-edit"
                      >Edit exam</v-btn
                    ></v-btn-group
                  >
                </div></v-list-item
              >
            </v-list>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Monitor the selected exam." flat>
            <v-list>
              <v-list-item>
                <div>
                  <v-btn-group>
                    <v-btn size="small" prepend-icon="mdi-monitor-eye"
                      >Monitor Exam</v-btn
                    ></v-btn-group
                  >
                </div></v-list-item
              >
            </v-list>
          </v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Analyze the selected exam." flat>
            <v-list>
              <v-list-item>
                <div>
                  <v-btn-group>
                    <v-btn size="small" prepend-icon="mdi-chart-bar"
                      >Analyze Logs</v-btn
                    ></v-btn-group
                  >
                </div></v-list-item
              >
            </v-list>
          </v-card>
        </template>
      </v-stepper>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  pinned: {
    type: Boolean,
    default: false,
  },
});
</script>
