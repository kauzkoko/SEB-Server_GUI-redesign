<template>
  <v-card
    class="mt-5 ml-5 mb-0 mr-0 h-400px aspect-1 max-w-400px max-h-400px overflow-auto"
    prepend-icon="mdi-chart-timeline"
    title="Logs"
    :append-icon="pinned ? 'mdi-star-minus' : 'mdi-star-check'"
  >
    <v-card-subtitle>Finished Exams Today</v-card-subtitle>
    <v-card-text>
      <v-sheet>
        <v-sparkline
          :model-value="value"
          :labels="labels"
          color="black"
          height="230"
          padding="10"
          stroke-linecap="round"
          smooth
        >
          <template v-slot:label="item">
            {{ item.value }}
          </template>
        </v-sparkline>
      </v-sheet>
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
const value = ref([20, 23, 11, 2, 60, 230, 120, 220]);
const labels = ref(["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"]);
</script>
