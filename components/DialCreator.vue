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
      <v-tooltip text="Add view to favorites" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-star-plus"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Create/Import an exam" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-wizard-hat"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Import exam" location="top" class="rounded-full">
        <template v-slot:activator="{ props }">
          <v-btn
            v-bind="props"
            key="2"
            rounded
            icon="mdi-cog"
            class="rounded-full"
          >
            <v-img src="/moodle.png" class="w-32px aspect-1"></v-img>
          </v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Create new template" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-file"></v-btn>
        </template>
      </v-tooltip>
      <v-tooltip text="Create new configuration" location="top">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" key="2" icon="mdi-file-cog"></v-btn>
        </template>
      </v-tooltip>
    </v-speed-dial>
  </div>
</template>
