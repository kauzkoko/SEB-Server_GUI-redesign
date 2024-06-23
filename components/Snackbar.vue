<template>
  <div class="fixed left-10px bottom-10px">
    <v-snackbar
      v-model="snackbar"
      multi-line
      timeout="100000"
      class="fixed left-10px bottom-10px"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn color="red" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
const snackbar = ref(true);
const text = ref("This is a snackbar");
</script>
