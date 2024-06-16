<template>
  <v-app-bar-nav-icon
    variant="text"
    @click.stop="store.toggleLeftDrawer()"
  ></v-app-bar-nav-icon>
</template>

<script setup>
const store = useGstore();
</script>
