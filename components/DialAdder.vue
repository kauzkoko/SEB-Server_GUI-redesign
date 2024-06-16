<template>
  <v-speed-dial
    location="left center"
    transition="fade-transition"
    open-on-hover
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-fab v-bind="activatorProps" size="large" icon="mdi-plus"></v-fab>
    </template>

    <v-tooltip text="New Exam" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" key="2" icon="mdi-script-text"></v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="New Template" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" key="2" icon="mdi-script"></v-btn>
      </template>
    </v-tooltip>
    <v-tooltip text="New Configuration" location="top">
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props" key="2" icon="mdi-file-cog"></v-btn>
      </template>
    </v-tooltip>
  </v-speed-dial>
</template>
