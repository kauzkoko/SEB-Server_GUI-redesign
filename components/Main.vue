<template>
  <v-main>
    <template v-if="selected[0] === 'dashboard'">
      <Stepper v-if="selectedDashboard[0] === 'dashboardwizard'" />
    </template>
    <template v-if="selected[0] === 'exams'">
      <DataTable v-if="selectedExams[0] === 'examsall'" />
    </template>
    <template v-if="selected[0] === 'monitoring'">
      <DataTable v-if="selectedMonitoring[0] === 'monitoringall'" />
    </template>
  </v-main>
</template>

<script setup>
const store = useGstore();
const { selected, selectedDashboard, selectedExams, selectedMonitoring, menu } =
  storeToRefs(store);
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
