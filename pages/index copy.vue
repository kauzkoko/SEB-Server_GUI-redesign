<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" temporary width="400">
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-img src="/sebs.png" class="w-24px aspect-1 mb-1"></v-img
            ><span class="text-20px text-bold ml-2">SEB Server</span>
          </template>
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="plain"
              @click.stop="drawer = !drawer"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="rightDrawer"
      temporary
      width="400"
      location="right"
    >
      <v-list v-model:selected="selected">
        <v-list-item
          class="mb-2"
          subtitle="Teaching Assistant@ETH"
          title="Angelina Musterini"
        >
          <template v-slot:prepend>
            <v-icon icon="mdi-account"></v-icon>
          </template>
          <template v-slot:append>
            <v-btn
              icon="mdi-close"
              variant="plain"
              @click.stop="rightDrawer = !rightDrawer"
              class="ml-2"
            ></v-btn>
          </template>
        </v-list-item>
        <v-divider class="m-y-2"></v-divider>
        <v-list-item value="rightDrawerAccountSettings">
          <template v-slot:prepend>
            <v-icon icon="mdi-account-settings"></v-icon>
            <span class="ml-2">Account Settings</span>
          </template>
        </v-list-item>
        <v-divider class="m-y-2"></v-divider>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-earth"></v-icon>
            <span class="ml-2">Language</span>
          </template>
          <template v-slot:append
            ><v-btn-toggle mandatory v-model="language">
              <v-btn value="EN">EN</v-btn>
              <v-btn value="DE">DE</v-btn>
            </v-btn-toggle>
          </template>
        </v-list-item>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon icon="mdi-theme-light-dark"></v-icon>
            <span class="ml-2">Dark Mode</span>
          </template>
          <template v-slot:append
            ><v-btn-toggle mandatory v-model="darkmode">
              <v-btn value="off">Off</v-btn>
              <v-btn value="on">On</v-btn>
            </v-btn-toggle>
          </template>
        </v-list-item>
        <v-list-item value="rightDrawerApplicationSettings">
          <template v-slot:prepend>
            <v-icon icon="mdi-cog"></v-icon>
            <span class="ml-2">Application Settings</span>
          </template>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :elevation="1">
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-0">
        <v-breadcrumbs :items="items">
          <template v-slot:prepend>
            <v-img src="/sebs.png" class="w-20px aspect-1 mr-1"></v-img>
          </template> </v-breadcrumbs
      ></v-toolbar-title>
      <v-text-field
        prepend-icon="mdi-magnify"
        hide-details
        single-line
        density="compact"
        @click="openDialog"
        max-width="500"
        readonly
      >
        <template v-slot:label>
          <span>Search SEB Server</span>
          <span class="border-solid border-gray p-.5 text-12px rounded ml-2"
            >Ctrl+K
          </span>
          <span class="ml-1">or</span>
          <span class="border-solid border-gray p-.5 text-12px rounded ml-2"
            >Cmd+K
          </span>
        </template>
      </v-text-field>
      <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" class="ml-2">
            <v-badge color="error" content="2">
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-list>
          <v-list-subheader class="uppercase"
            >User Notification</v-list-subheader
          >
          <v-list-item
            ><template v-slot:prepend>
              <v-icon icon="mdi-alert" color="red"></v-icon>
            </template>
            <template v-slot:append>
              <v-icon
                icon="mdi-battery-30"
                class="pb-1 mr-1"
                size="small"
              ></v-icon>
              <span>Battery level of User</span>
              <v-chip class="m-x-1">AFJ2323</v-chip>
              <span> critically low:</span
              ><span class="font-bold ml-1">30% battery left.</span></template
            ></v-list-item
          >
          <v-list-item
            ><template v-slot:prepend>
              <v-icon icon="mdi-information" color="blue"></v-icon>
            </template>
            <template v-slot:append single-line>
              <v-icon icon="mdi-email" class="pb-1 mr-2" size="small"></v-icon>
              <span>Text Message from User</span>
              <v-chip class="m-x-2">AFJ2323</v-chip>
              <span class="font-bold italic"
                >Hallo. Ich bin fertig, weiss aber nicht wo der Ausschaltknopf
                ist... Wo finde ich diesen?</span
              ></template
            ></v-list-item
          >
        </v-list>
      </v-menu>
      <v-btn
        icon="mdi-account"
        variant="text"
        @click.stop="rightDrawer = !rightDrawer"
      ></v-btn>
    </v-app-bar>
    <v-navigation-drawer model-value rail>
      <v-list v-model:selected="selected">
        <v-tooltip text="Dashboard" open-delay="800">
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
        <v-tooltip text="Exams" open-delay="800">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              prepend-icon="mdi-school"
              title="Exams"
              value="exams"
            ></v-list-item>
          </template>
        </v-tooltip>
        <v-tooltip text="Monitoring" open-delay="800">
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
    <v-navigation-drawer permanent>
      <template v-if="selected[0] === 'dashboard'">
        <v-list v-model:selected="selectedDashboard">
          <v-list-item value="dashboardall">
            <template v-slot:prepend>
              <v-icon icon="mdi-shape"></v-icon>
              <span class="ml-2">All Categories</span>
            </template>
          </v-list-item>
          <v-list-item value="dashboardpinned">
            <template v-slot:prepend>
              <v-icon icon="mdi-star"></v-icon>
              <span class="ml-2">Favorites</span>
            </template>
          </v-list-item>
          <v-list-item value="dashboardwizard">
            <template v-slot:prepend>
              <v-icon icon="mdi-wizard-hat"></v-icon>
              <span class="ml-2">SEB Creator Wizard</span>
            </template>
          </v-list-item>
        </v-list>
      </template>
      <template v-if="selected[0] === 'exams'">
        <v-list v-model:selected="selectedExams">
          <v-list-item value="examsall">
            <template v-slot:prepend>
              <v-icon icon="mdi-view-list"></v-icon>
              <span class="ml-2">All Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="examslatest">
            <template v-slot:prepend>
              <v-icon icon="mdi-new-box"></v-icon>
              <span class="ml-2">Latest Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="examsmoodle">
            <template v-slot:prepend>
              <v-img src="/moodle.png" class="w-24px aspect-1 mb-1"></v-img>
              <span class="ml-2">Import from Moodle</span>
            </template>
          </v-list-item>
          <v-list-item value="examstemplates">
            <template v-slot:prepend>
              <v-icon icon="mdi-grid"></v-icon>
              <span class="ml-2">Exam Templates</span>
            </template>
          </v-list-item>
        </v-list>
      </template>
      <template v-if="selected[0] === 'monitoring'">
        <v-list v-model:selected="selectedMonitoring">
          <v-list-item value="monitoringall">
            <template v-slot:prepend>
              <v-icon icon="mdi-view-list"></v-icon>
              <span class="ml-2">All Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="monitoringscheduled">
            <template v-slot:prepend>
              <v-icon icon="mdi-timetable"></v-icon>
              <span class="ml-2">Scheduled Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="monitoringrunning">
            <template v-slot:prepend>
              <v-icon icon="mdi-shoe-sneaker"></v-icon>
              <span class="ml-2">Running Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="monitoringpast">
            <template v-slot:prepend>
              <v-icon icon="mdi-history"></v-icon>
              <span class="ml-2">Past Exams</span>
            </template>
          </v-list-item>
          <v-list-item value="monitoringlogs">
            <template v-slot:prepend>
              <v-icon icon="mdi-chart-timeline"></v-icon>
              <span class="ml-2">Logs</span>
            </template>
          </v-list-item>
        </v-list>
      </template>
      <v-list>
        <v-list-item>
          <v-btn> <v-icon icon="mid-arrow-collapse-left"></v-icon> </v-btn
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <template v-if="selected[0] === 'dashboard'">
        <Stepper v-if="selectedDashboard[0] === 'dashboardwizard'" />
      </template>
      <template v-if="selected[0] === 'exams'">
        <DataTable v-if="selectedExams[0] === 'examsall'" />
      </template>
      <template v-if="selected[0] === 'monitoring'">
        <DataTable v-if="selectedMonitoring[0] === 'monitoringall'" />
      </template>
    </v-main>
    <DialCreator />
    <v-dialog v-model="dialog" width="auto">
      <v-card min-width="600px">
        <v-text-field
          id="focusText"
          class="p-5"
          v-model="search"
          prepend-icon="mdi-magnify"
          hide-details
          single-line
          clearable
          placeholder="E.g. How can I add a moodle exam? Enter to search."
          hint="Search anything in SEB Server"
        >
          <template v-slot:label>
            <span>Search SEB Server</span>
            <span class="border-solid border-gray p-.5 text-12px rounded ml-2"
              >Cmd+K
            </span>
          </template>
        </v-text-field>
        <v-list v-if="search.length > 6">
          <v-list-item>Application: Import from Moodle</v-list-item>
          <v-list-item>Docs: Importing an exam</v-list-item>
          <v-list-item>Docs: Importing / Exporting</v-list-item>
          <v-list-item>Docs: Moodle-Plugins</v-list-item>
          <v-list-item>Link: Moodle ETH</v-list-item>
        </v-list>
        <v-list>
          <v-list-item>
            <div>
              Filter:
              <v-chip color="blue" class="m-x-1">Application</v-chip>
              <v-chip color="blue" class="m-x-1">Documentation</v-chip>
              <v-chip color="blue" class="m-x-1">Links</v-chip>
              <v-chip color="blue" class="m-x-1">AI</v-chip>
            </div>
            <div>
              Sort by:
              <v-chip color="blue" class="m-x-1">Relevancy</v-chip>
              <v-chip color="blue" class="m-x-1">Alphabetical</v-chip>
              <v-chip class="m-x-1">Application</v-chip>
              <v-chip class="m-x-1">Documentation</v-chip>
              <v-chip class="m-x-1">Links</v-chip>
              <v-chip class="m-x-1">AI</v-chip>
            </div>
          </v-list-item>
        </v-list>

        <template v-slot:actions>
          <v-btn class="ms-auto" text="Close" @click="closeDialog()"></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
const store = useGstore();
const { tab } = storeToRefs(store);
const selectedDashboard = ref(["dashboardall"]);
const selectedExams = ref(["examsall"]);
const selectedMonitoring = ref(["monitoringall"]);
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
const menu = ref(false);
const language = ref(0);
const darkmode = ref(0);
const drawer = ref(false);
const rightDrawer = ref(false);
const search = ref("");
const dialog = ref(false);
const focus = ref(false);
const loading = ref(false);
const searchInput = ref(false);
const toggleDialog = () => {
  dialog.value = !dialog.value;
};
const selected = ref(["dashboard"]);

const openDialog = (event) => {
  search.value = "";
  dialog.value = true;
  setTimeout(() => {
    let el = document.getElementById("focusText");
    console.log(el);
    el.focus();
  }, 100);
};

const closeDialog = () => {
  dialog.value = false;
  focus.value = false;
  search.value = "";
};

// only change value of nav selection when another is selected
watch(selected, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selected.value[0] = oldVal[0];
  }
});

watch(selectedDashboard, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedDashboard.value[0] = oldVal[0];
  }
});

watch(selectedMonitoring, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedMonitoring.value[0] = oldVal[0];
  }
});

watch(selectedExams, (newVal, oldVal) => {
  if (newVal.length < 1) {
    selectedExams.value[0] = oldVal[0];
  }
});

const keys = useMagicKeys();
const CtrlK = keys["Ctrl+K"];
const CmdK = keys["Cmd+K"];

watch([CtrlK, CmdK], (v) => {
  if (v) console.log("CtrlK or CmdK have been pressed");
  openDialog();
});
</script>
