<template>
  <v-text-field
    prepend-icon="mdi-magnify"
    hide-details
    single-line
    density="compact"
    @click="store.openSearchDialog()"
    max-width="500"
    readonly
  >
    <template v-slot:label>
      <span>Search SEB Server</span>
      <span class="border-solid border-gray p-.5 text-12px rounded ml-2"
        >Ctrl+K
      </span>
      <span class="ml-1">or</span>
      <span class="border-solid border-gray p-.5 text-12px rounded ml-2"
        >Cmd+K
      </span>
    </template>
  </v-text-field>
</template>

<script setup>
const store = useGstore();
</script>
