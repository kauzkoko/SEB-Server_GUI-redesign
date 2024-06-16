<template>
  <v-navigation-drawer permanent>
    <template v-if="selected[0] === 'dashboard'">
      <v-list v-model:selected="selectedDashboard">
        <v-list-item value="dashboardall">
          <template v-slot:prepend>
            <v-icon icon="mdi-shape"></v-icon>
            <span class="ml-2">All Categories</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardpinned">
          <template v-slot:prepend>
            <v-icon icon="mdi-star"></v-icon>
            <span class="ml-2">Favorites</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardwizard">
          <template v-slot:prepend>
            <v-icon icon="mdi-wizard-hat"></v-icon>
            <span class="ml-2">Step by Step Creator</span>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <template v-if="selected[0] === 'exams'">
      <v-list v-model:selected="selectedExams">
        <v-list-item value="examsall">
          <template v-slot:prepend>
            <v-icon icon="mdi-view-list"></v-icon>
            <span class="ml-2">All Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="examslatest">
          <template v-slot:prepend>
            <v-icon icon="mdi-new-box"></v-icon>
            <span class="ml-2">Latest Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="examsmoodle">
          <template v-slot:prepend>
            <v-img src="/moodle.png" class="w-24px aspect-1 mb-1"></v-img>
            <span class="ml-2">Import from Moodle</span>
          </template>
        </v-list-item>
        <v-list-item value="examstemplates">
          <template v-slot:prepend>
            <v-icon icon="mdi-grid"></v-icon>
            <span class="ml-2">Exam Templates</span>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <template v-if="selected[0] === 'monitoring'">
      <v-list v-model:selected="selectedMonitoring">
        <v-list-item value="monitoringall">
          <template v-slot:prepend>
            <v-icon icon="mdi-view-list"></v-icon>
            <span class="ml-2">All Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringscheduled">
          <template v-slot:prepend>
            <v-icon icon="mdi-timetable"></v-icon>
            <span class="ml-2">Scheduled Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringrunning">
          <template v-slot:prepend>
            <v-icon icon="mdi-shoe-sneaker"></v-icon>
            <span class="ml-2">Running Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringpast">
          <template v-slot:prepend>
            <v-icon icon="mdi-history"></v-icon>
            <span class="ml-2">Past Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringlogs">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-timeline"></v-icon>
            <span class="ml-2">Logs</span>
          </template>
        </v-list-item>
      </v-list>
    </template>
    <v-list>
      <v-list-item>
        <v-btn> <v-icon icon="mid-arrow-collapse-left"></v-icon> </v-btn
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const store = useGstore();
const { selected, selectedDashboard, selectedExams, selectedMonitoring } =
  storeToRefs(store);
</script>
