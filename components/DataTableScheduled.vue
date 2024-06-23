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
      :custom-filter="filterOnlyScheduled"
      v-model:sort-by="sortBy"
      :headers="headers"
      v-model="selected"
      :items="items"
      item-value="name"
      show-select
      :loading="loading"
      :search="search"
      :items-per-page="10"
    >
      <template v-slot:text></template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
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
const sortBy = ref([{ key: "status", order: "desc" }]);
const items = [
  {
    name: "Computer Networks",
    institution: "Princeton University",
    lecturer: "Prof. Dr. Andrew Davis",
    date: "2024-02-08",
    startTime: "15:00",
    endTime: "17:00",
    duration: "02:00",
    session: "2 of 3",
    status: "scheduled",
    type: "managed",
  },
  {
    name: "Computer Graphics",
    institution: "Columbia University",
    lecturer: "Prof. Dr. Matthew Johnson",
    date: "2024-02-10",
    startTime: "10:00",
    endTime: "12:00",
    duration: "02:00",
    session: "1 of 2",
    status: "scheduled",
    type: "managed",
  },
];
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
