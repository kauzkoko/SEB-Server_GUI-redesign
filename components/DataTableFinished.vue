<template>
  <v-card class="m-x-5 m-y-5">
    <v-text-field
      v-model="search"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
      single-line
    ></v-text-field>
    <v-data-table
      multi-sort
      :headers="headers"
      v-model="selected"
      :items="items"
      item-value="name"
      show-select
      :loading="loading"
      :search="search"
      :items-per-page="25"
    >
      <template v-slot:text></template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@25"></v-skeleton-loader>
      </template>
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="
            item.status === 'running'
              ? 'red'
              : item.status === 'scheduled'
              ? 'blue'
              : 'green'
          "
          :text="item.status"
          class="text-uppercase"
          size="small"
          label
        ></v-chip>
      </template>
      <template v-slot:item.type="{ item }">
        <v-chip
          :text="item.type"
          class="text-uppercase"
          size="small"
          label
        ></v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn-group>
          <v-btn icon="mdi-pencil" size="small"></v-btn>
          <v-btn icon="mdi-delete" size="small"></v-btn>
        </v-btn-group> </template
    ></v-data-table>
  </v-card>
  <v-navigation-drawer
    v-model="rightEditDrawer"
    width="400"
    location="right"
    v-if="selected.length > 0"
  >
    <v-list>
      <v-list-subheader>SELECTION ACTIONS</v-list-subheader>
      <v-list-item>
        <v-btn prepend-icon="mdi-pencil" variant="text"
          >Edit selected<v-chip class="ml-2">{{
            selected.length
          }}</v-chip></v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-delete" variant="text"
          >Delete <v-chip class="ml-2">{{ selected.length }}</v-chip></v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-grid" variant="text"
          >Change template<v-chip class="ml-2">{{
            selected.length
          }}</v-chip></v-btn
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const rightEditDrawer = ref(true);
const loading = shallowRef(true);
const selected = ref([]);
const search = ref("");
const headers = [
  {
    align: "start",
    title: "Name",
    key: "name",
  },
  { title: "Status", key: "status" },
  { title: "Date", key: "date" },
  { title: "Start", key: "startTime" },
  { title: "End", key: "endTime" },
  { title: "Duration", key: "duration" },
  { title: "Type", key: "type" },
  { title: "Institution", key: "institution" },
  { title: "Lecturer", key: "lecturer" },
  { title: "Session", key: "session" },
  { title: "Actions", key: "actions" },
];

const items = [
  {
    name: "Software Engineering",
    institution: "California Institute of Technology",
    lecturer: "Prof. Dr. Jessica Lee",
    date: "2024-02-07",
    startTime: "11:00",
    endTime: "13:00",
    duration: "02:00",
    session: "1 of 3",
    status: "finished",
    type: "managed",
  },
  {
    name: "Operating Systems",
    institution: "University of Chicago",
    lecturer: "Prof. Dr. Jennifer Wilson",
    date: "2024-02-09",
    startTime: "17:00",
    endTime: "19:00",
    duration: "02:00",
    session: "3 of 3",
    status: "finished",
    type: "managed",
  },
];
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
