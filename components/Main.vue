<template>
  <v-main>
    <template v-if="selected[0] === 'dashboard'">
      <v-container class="d-flex flex-column justify-center align-center">
        <v-card
          title="SEB Exam Import Wizard"
          subtitle="Import and configure an exam from your preferred e-learning platform such as Moodle, OpenEdx etc."
          class="w-full max-w-1400px"
        >
          <StepperImport v-if="selectedDashboard[0] === 'dashboardwizard'" />
        </v-card>
      </v-container>
      <div
        v-if="selectedDashboard[0] === 'dashboardall'"
        class="flex flex-row flex-wrap"
      >
        <CalendarTodayDashboard />

        <AnalyticsDashboard />
        <StepperHorizontalDashboard />
        <DataTableDashboard />
        <CalendarDashboard />
        <DataTableLatestDashboard />
      </div>
      <div
        v-if="selectedDashboard[0] === 'dashboardpinned'"
        class="flex flex-row"
      >
        <AnalyticsDashboard pinned />
        <StepperHorizontalDashboard pinned />
        <DataTableLatestDashboard pinned />
      </div>
      <Calendar v-if="selectedDashboard[0] === 'dashboardcalendar'" />
    </template>
    <template v-if="selected[0] === 'exams'">
      <DataTable v-if="selectedExams[0] === 'examsall'" />
      <DataTableLatest v-if="selectedExams[0] === 'examslatest'" />
      <DataTableMoodle v-if="selectedExams[0] === 'examsmoodle'" />
    </template>
    <template v-if="selected[0] === 'monitoring'">
      <DataTable v-if="selectedMonitoring[0] === 'monitoringall'" />
      <DataTableScheduled
        v-if="selectedMonitoring[0] === 'monitoringscheduled'"
      />
      <DataTableRunning v-if="selectedMonitoring[0] === 'monitoringrunning'" />
      <DataTableFinished v-if="selectedMonitoring[0] === 'monitoringpast'" />
    </template>
  </v-main>
</template>

<script setup>
const store = useGstore();
const { selected, selectedDashboard, selectedExams, selectedMonitoring, menu } =
  storeToRefs(store);

const value = ref(null);
// only change value of nav selection when another is selected
watch(selected, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selected.value[0] = oldVal[0];
  }
});

watch(selectedDashboard, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedDashboard.value[0] = oldVal[0];
  }
});

watch(selectedMonitoring, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedMonitoring.value[0] = oldVal[0];
  }
});

watch(selectedExams, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedExams.value[0] = oldVal[0];
  }
});
</script>
