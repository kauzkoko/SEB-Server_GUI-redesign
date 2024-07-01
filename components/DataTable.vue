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
      :items-per-page="20"
    >
      <template v-slot:text></template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@20"></v-skeleton-loader>
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
          <v-btn
            icon="mdi-pencil"
            size="small"
            @click="sebSettings = !sebSettings"
          ></v-btn>
          <v-btn icon="mdi-delete" size="small"></v-btn>
          <v-btn icon="mdi-file-edit" size="small"></v-btn>
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
        Selected items:
        <v-chip class="ml-2">{{ selected.length }}</v-chip>
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-select-off" variant="text"
          >Unselect selected</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-btn
          prepend-icon="mdi-pencil"
          variant="text"
          @click="sebSettings = !sebSettings"
          >Edit selected</v-btn
        >
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-delete" variant="text">Delete selected</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-file-edit" variant="text">Edit template</v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <SEBSettings v-if="sebSettings" />
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
const sebSettings = ref(false);

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
    status: "running",
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
    status: "running",
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
    status: "running",
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
    status: "running",
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
    status: "running",
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
    type: "managed",
  },
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
  {
    name: "Machine Learning",
    institution: "Yale University",
    lecturer: "Prof. Dr. Olivia Davis",
    date: "2024-02-11",
    startTime: "14:00",
    endTime: "16:00",
    duration: "02:00",
    session: "2 of 2",
    status: "running",
    type: "managed",
  },
  {
    name: "Cybersecurity",
    institution: "University of California, Berkeley",
    lecturer: "Prof. Dr. Ethan Wilson",
    date: "2024-02-12",
    startTime: "16:00",
    endTime: "18:00",
    duration: "02:00",
    session: "1 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Mobile App Development",
    institution: "University of Michigan",
    lecturer: "Prof. Dr. Sophia Johnson",
    date: "2024-02-13",
    startTime: "09:00",
    endTime: "11:00",
    duration: "02:00",
    session: "2 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Cloud Computing",
    institution: "University of Texas at Austin",
    lecturer: "Prof. Dr. Benjamin Davis",
    date: "2024-02-14",
    startTime: "13:00",
    endTime: "15:00",
    duration: "02:00",
    session: "3 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Computer Vision",
    institution: "University of Washington",
    lecturer: "Prof. Dr. Lily Johnson",
    date: "2024-02-15",
    startTime: "11:00",
    endTime: "13:00",
    duration: "02:00",
    session: "1 of 2",
    status: "running",
    type: "managed",
  },
  {
    name: "Natural Language Processing",
    institution: "University of Pennsylvania",
    lecturer: "Prof. Dr. Daniel Wilson",
    date: "2024-02-16",
    startTime: "15:00",
    endTime: "17:00",
    duration: "02:00",
    session: "2 of 2",
    status: "running",
    type: "managed",
  },
  {
    name: "Computer Architecture",
    institution: "University of California, Los Angeles",
    lecturer: "Prof. Dr. Ava Davis",
    date: "2024-02-17",
    startTime: "17:00",
    endTime: "19:00",
    duration: "02:00",
    session: "1 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Data Mining",
    institution: "University of Illinois at Urbana-Champaign",
    lecturer: "Prof. Dr. Harper Johnson",
    date: "2024-02-18",
    startTime: "10:00",
    endTime: "12:00",
    duration: "02:00",
    session: "2 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Robotics",
    institution: "University of Toronto",
    lecturer: "Prof. Dr. Noah Davis",
    date: "2024-02-19",
    startTime: "14:00",
    endTime: "16:00",
    duration: "02:00",
    session: "3 of 3",
    status: "running",
    type: "managed",
  },
  {
    name: "Software Testing",
    institution: "University of Maryland",
    lecturer: "Prof. Dr. Chloe Johnson",
    date: "2024-02-20",
    startTime: "16:00",
    endTime: "18:00",
    duration: "02:00",
    session: "1 of 2",
    status: "running",
    type: "managed",
  },
  {
    name: "Computer Ethics",
    institution: "University of California, San Diego",
    lecturer: "Prof. Dr. Leo Wilson",
    date: "2024-02-21",
    startTime: "09:00",
    endTime: "11:00",
    duration: "02:00",
    session: "2 of 2",
    status: "running",
    type: "managed",
  },
];
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>
