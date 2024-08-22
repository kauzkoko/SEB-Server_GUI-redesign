<template>
  <v-navigation-drawer :rail="subnavigationRail" permanent nav>
    <template v-if="selected[0] === 'dashboard'">
      <v-list v-model:selected="selectedDashboard" density="compact" nav>
        <v-list-item value="dashboardall" v-tooltip="'Tooltipdfasdf'">
          <template v-slot:prepend>
            <v-icon icon="mdi-shape"></v-icon>
            <span class="ml-5">All Categories</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardpinned">
          <template v-slot:prepend>
            <v-icon icon="mdi-star"></v-icon>
            <span class="ml-5">Favorites</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardwizard">
          <template v-slot:prepend>
            <v-icon icon="mdi-wizard-hat"></v-icon>
            <span class="ml-5">SEB Exam Import Wizard</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardcalendar">
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar"></v-icon>
            <span class="ml-5">Calendar</span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardnotifications">
          <template v-slot:prepend>
            <v-icon icon="mdi-bell"></v-icon>
            <span class="ml-5">Notifications </span>
          </template>
        </v-list-item>
        <v-list-item value="dashboardsearch">
          <template v-slot:prepend>
            <v-icon icon="mdi-magnify"></v-icon>
            <span class="ml-5">Search SEB Server</span>
          </template>
        </v-list-item>
      </v-list>
      <div class="absolute bottom-0 w-55px">
        <v-list density="compact" nav>
          <v-list-item bottom-0>
            <v-btn
              rounded="0"
              @click="subnavigationRail = !subnavigationRail"
              :icon="
                subnavigationRail ? 'mdi-chevron-right' : 'mdi-chevron-left'
              "
              variant="text"
            ></v-btn>
          </v-list-item>
        </v-list>
      </div>
    </template>
    <template v-if="selected[0] === 'exams'">
      <v-list v-model:selected="selectedExams" density="compact" nav>
        <v-list-item value="examsall">
          <template v-slot:prepend>
            <v-icon icon="mdi-view-list"></v-icon>
            <span class="ml-5">All Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="examslatest">
          <template v-slot:prepend>
            <v-icon icon="mdi-new-box"></v-icon>
            <span class="ml-5">Latest Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="examscalendar">
          <template v-slot:prepend>
            <v-icon icon="mdi-calendar"></v-icon>
            <span class="ml-5">Exam Calendar</span>
          </template>
        </v-list-item>
        <v-list-item value="examswizard">
          <template v-slot:prepend>
            <v-icon icon="mdi-wizard-hat"></v-icon>
            <span class="ml-5">SEB Exam Wizard</span>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item value="examsmoodle">
          <template v-slot:prepend>
            <v-img src="/moodle.png" class="w-24px aspect-1 mb-1"></v-img>
            <span class="ml-5">Import from Moodle</span>
          </template>
        </v-list-item>
        <v-list-item value="examsopenolat" disabled>
          <template v-slot:prepend>
            <v-img
              src="/openolat.png"
              class="w-40px aspect-1 mb-0 ml--2 mr--2.2"
            ></v-img>
            <span class="ml-5">Import from OpenOlat</span>
          </template>
        </v-list-item>
        <v-list-item value="examsopenedx" disabled>
          <template v-slot:prepend>
            <v-img src="/openedx.png" class="w-24px aspect-1 mb-1"></v-img>
            <span class="ml-5">Import from Open edX</span>
          </template>
        </v-list-item>
        <v-list-item value="examsans" disabled>
          <template v-slot:prepend>
            <v-img src="/ans.svg" class="w-24px aspect-1 mb-1"></v-img>
            <span class="ml-5">Import from Ans</span>
          </template>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item value="examstemplates">
          <template v-slot:prepend>
            <v-icon icon="mdi-file"></v-icon>
            <span class="ml-5">Exam Templates</span>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </template>
    <template v-if="selected[0] === 'monitoring'">
      <v-list v-model:selected="selectedMonitoring" density="compact" nav>
        <v-list-item value="monitoringall">
          <template v-slot:prepend>
            <v-icon icon="mdi-view-list"></v-icon>
            <span class="ml-5">All Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringscheduled">
          <template v-slot:prepend>
            <v-icon icon="mdi-timetable"></v-icon>
            <span class="ml-5">Scheduled Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringrunning">
          <template v-slot:prepend>
            <v-icon icon="mdi-shoe-sneaker"></v-icon>
            <span class="ml-5">Running Exams</span>
          </template>
        </v-list-item>
        <v-list-item value="monitoringpast">
          <template v-slot:prepend>
            <v-icon icon="mdi-history"></v-icon>
            <span class="ml-5">Past Exams</span>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item value="monitoringlogs">
          <template v-slot:prepend>
            <v-icon icon="mdi-chart-timeline"></v-icon>
            <span class="ml-5">Logs</span>
          </template>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item value="monitoringmessages">
          <template v-slot:prepend>
            <v-icon icon="mdi-forum"></v-icon>
            <span class="ml-5">Messages</span>
          </template>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
const store = useGstore();
const {
  selected,
  selectedDashboard,
  selectedExams,
  selectedMonitoring,
  subnavigationRail,
} = storeToRefs(store);
</script>
