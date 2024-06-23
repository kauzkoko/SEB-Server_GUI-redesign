<template>
  <v-navigation-drawer model-value rail>
    <v-list v-model:selected="selected">
      <v-tooltip text="Dashboard">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-home"
            title="Dashboard"
            value="dashboard"
          >
          </v-list-item>
        </template>
      </v-tooltip>
      <v-tooltip text="Exams">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-school"
            title="Exams"
            value="exams"
          ></v-list-item>
        </template>
      </v-tooltip>
      <v-tooltip text="Monitoring">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            prepend-icon="mdi-monitor-eye"
            title="Monitoring"
            value="monitoring"
          ></v-list-item>
        </template>
      </v-tooltip>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const store = useGstore();
const { selected } = storeToRefs(store);
</script>
