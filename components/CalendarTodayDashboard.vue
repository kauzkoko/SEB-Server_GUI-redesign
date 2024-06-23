<template>
  <v-card
    prepend-icon="mdi-calendar"
    title="Daily Calendar"
    append-icon="mdi-star-plus"
    class="mt-5 ml-5 mb-0 mr-0 h-400px aspect-1 max-w-400px max-h-400px overflow-auto"
  >
    <v-card-text class="mt--3">
      <v-calendar view-mode="day"></v-calendar>
    </v-card-text>
  </v-card>
</template>
