<template>
  <v-btn
    icon="mdi-account"
    variant="text"
    @click.stop="store.toggleRightDrawer()"
  ></v-btn>
</template>

<script setup>
const store = useGstore();
</script>
