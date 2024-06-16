<template>
  <v-toolbar-title class="ml-0">
    <v-breadcrumbs :items="items">
      <template v-slot:prepend>
        <v-img src="/sebs.png" class="w-20px aspect-1 mr-1"></v-img>
      </template> </v-breadcrumbs
  ></v-toolbar-title>
</template>

<script setup>
const items = [
  {
    title: "SEB Server",
    disabled: false,
    href: "breadcrumbs_dashboard",
  },
  {
    title: "Exams",
    disabled: false,
    href: "breadcrumbs_link_1",
  },
  {
    title: "Molecular Biology II FS24",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
  {
    title: "Client 23ASD",
    disabled: true,
    href: "breadcrumbs_link_2",
  },
];
</script>
