<template>
  <div class="fixed right-95px bottom-50px bg-red">
    <v-speed-dial
      location="left center"
      transition="fade-transition"
      open-on-hover
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-fab v-bind="activatorProps" size="large" icon="mdi-creation"></v-fab>
      </template>

      <v-tooltip text="Create Exam" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-script-text"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Create Template" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-script"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Create Configuration" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-file-cog"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Pin" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-pin"></v-btn>
        </template>
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>
