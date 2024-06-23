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
            item.status === 'scheduled'
              ? 'blue'
              : item.status === 'running'
              ? 'yellow'
              : item.status === 'not imported yet'
              ? 'orange'
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
  { title: "Platform", key: "platform" },
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
    name: "Theoretical Philosophy II",
    institution: "ETH Zurich",
    lecturer: "Prof. Dr. Thomas Metzinger",
    date: "2024-02-01",
    startTime: "08:00",
    endTime: "10:00",
    duration: "02:00",
    session: "1 of 2",
    status: "scheduled",
    platform: "moodle",

    type: "managed",
  },
  {
    name: "Introduction to Computer Science",
    institution: "Stanford University",
    lecturer: "Prof. Dr. John Smith",
    date: "2024-02-02",
    startTime: "10:00",
    endTime: "12:00",
    duration: "02:00",
    session: "1 of 3",
    status: "not imported yet",
    platform: "moodle",
    type: "managed",
  },
  {
    name: "Data Structures and Algorithms",
    institution: "Massachusetts Institute of Technology",
    lecturer: "Prof. Dr. Emily Johnson",
    date: "2024-02-03",
    startTime: "14:00",
    endTime: "16:00",
    duration: "02:00",
    session: "2 of 3",
    status: "not imported yet",
    platform: "moodle",
    type: "managed",
  },
  {
    name: "Artificial Intelligence",
    institution: "University of Cambridge",
    lecturer: "Prof. Dr. Michael Brown",
    date: "2024-02-04",
    startTime: "16:00",
    endTime: "18:00",
    duration: "02:00",
    session: "3 of 3",
    status: "not imported yet",
    platform: "moodle",
    type: "managed",
  },
  {
    name: "Web Development",
    institution: "Harvard University",
    lecturer: "Prof. Dr. Sarah Johnson",
    date: "2024-02-05",
    startTime: "09:00",
    endTime: "11:00",
    duration: "02:00",
    session: "1 of 2",
    status: "scheduled",
    platform: "moodle",
    type: "managed",
  },
  {
    name: "Database Systems",
    institution: "University of Oxford",
    lecturer: "Prof. Dr. David Wilson",
    date: "2024-02-06",
    startTime: "13:00",
    endTime: "15:00",
    duration: "02:00",
    session: "2 of 2",
    status: "running",
    platform: "moodle",
    type: "managed",
  },
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
    platform: "moodle",
    type: "managed",
  },
];
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
