<template>
  <v-navigation-drawer v-model="leftDrawer" temporary width="400">
    <v-list density="compact">
      <v-list-item
        class="mb-2 ml--4"
        title="SEB Server"
        subtitle="Version 2.0.0"
      >
        <template v-slot:prepend>
          <v-btn
            href="https://safeexambrowser.org"
            variant="text"
            rounded
            target="_blank"
            rel="noopener"
          >
            <v-avatar size="40" class="aspect-1 mb-1 mr-0">
              <v-img alt="SEB Logo" src="/sebs.png" class="w-24px"></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <template v-slot:append>
          <v-btn
            class=""
            icon="mdi-github"
            href="https://github.com/SafeExamBrowser/seb-server"
            variant="text"
            rounded
            target="_blank"
            rel="noopener"
          ></v-btn>

          <v-btn
            icon="mdi-close"
            variant="plain"
            @click.stop="store.toggleLeftDrawer()"
          ></v-btn>
        </template>
      </v-list-item>
      <v-divider class="m-y-2"></v-divider>
      <template v-if="toggle === 'modern'">
        <v-list-subheader title="Dashboard"></v-list-subheader>
        <v-list-item
          title="All Categories"
          value="dashboardall"
          prepend-icon="mdi-shape"
        >
        </v-list-item>
        <v-list-item
          title="Favorites"
          value="favorites"
          prepend-icon="mdi-star"
        >
        </v-list-item>
        <v-list-item
          title="SEB Import Wizard"
          value="sebwizard"
          prepend-icon="mdi-wizard-hat"
        >
        </v-list-item>
        <v-list-item
          title="Calendar"
          value="calendar"
          prepend-icon="mdi-calendar"
        >
        </v-list-item>
        <v-list-item
          title="Notifications / Messages"
          value="notifications"
          prepend-icon="mdi-bell"
        />
        <v-list-item
          title="Search SEB Server"
          value="search"
          prepend-icon="mdi-magnify"
        />
        <v-divider class="m-y-2"></v-divider>
        <v-list-subheader title="Exams"></v-list-subheader>
        <v-list-item
          title="All Exams"
          value="allexams"
          prepend-icon="mdi-file-multiple"
        />
        <v-list-item
          title="Latest Exams"
          value="latestexams"
          prepend-icon="mdi-new-box"
        />
        <v-list-item
          title="Import from E-Learning Platforms"
          value="importfrommoodle"
          prepend-icon="mdi-import"
        />
        <v-list-item
          title="Exam Template"
          value="examtemplate"
          prepend-icon="mdi-file"
        />
        <v-list-item
          title="Exam Calendar"
          value="examtemplate"
          prepend-icon="mdi-calendar"
        />
        <v-list-item
          title="SEB Exam Creator Wizard"
          value="sebexamwizard"
          prepend-icon="mdi-wizard-hat"
        />
        <v-divider class="m-y-2"></v-divider>
        <v-list-subheader title="Monitoring"></v-list-subheader>
        <v-list-item
          title="All Exams"
          value="allexams"
          prepend-icon="mdi-view-list"
        />
        <v-list-item
          title="Scheduled Exams"
          value="scheduledexams"
          prepend-icon="mdi-calendar-clock"
        />
        <v-list-item
          title="Running Exams"
          value="runningexams"
          prepend-icon="mdi-shoe-sneaker"
        />
        <v-list-item
          title="Past Exams"
          value="pastexams"
          prepend-icon="mdi-history"
        />
        <v-list-item
          title="Client Messages"
          value="messages"
          prepend-icon="mdi-forum"
        />
        <v-list-item title="Logs" value="logs" prepend-icon="mdi-chart-bar" />
      </template>
      <template v-else>
        <v-list-subheader title="SEB Server Administration"></v-list-subheader>
        <v-list-item
          title="Institution"
          value="institution"
          prepend-icon="mdi-domain"
        >
        </v-list-item>
        <v-list-item
          title="User Account"
          value="useraccount"
          prepend-icon="mdi-account"
        >
        </v-list-item>
        <v-list-item
          title="User Logs"
          value="logs"
          prepend-icon="mdi-chart-bar"
        >
        </v-list-item>
        <v-divider class="m-y-2"></v-divider>
        <v-list-subheader title="Configurations"></v-list-subheader>
        <v-list-item
          title="Connection Configuration"
          value="connenctionconfiguration"
          prepend-icon="mdi-cog-transfer"
        >
        </v-list-item>
        <v-list-item
          title="Exam Configuration"
          value="examconfiguration"
          prepend-icon="mdi-application-cog"
        >
        </v-list-item>
        <v-list-item
          title="Configuration Template"
          value="configurationtemplate"
          prepend-icon="mdi-file-cog"
        >
        </v-list-item>
        <v-list-item
          title="Certificates"
          value="certificates"
          prepend-icon="mdi-certificate"
        >
        </v-list-item>
        <v-divider class="m-y-2"></v-divider>
        <v-list-subheader title="Exam Administration"></v-list-subheader>
        <v-list-item
          title="Assessment Tool Setup"
          value="assessmenttoolsetup"
          prepend-icon="mdi-application-cog"
        >
        </v-list-item>
        <v-list-item
          title="Assessment Tool Lookup"
          value="assessmenttoollookup"
          prepend-icon="mdi-application-import"
        >
        </v-list-item>
        <v-list-item title="Exam" value="exam" prepend-icon="mdi-application">
        </v-list-item>
        <v-list-item
          title="Exam Template"
          value="examtemplate"
          prepend-icon="mdi-file"
        >
        </v-list-item>
        <v-divider class="m-y-2"></v-divider>
        <v-list-subheader title="Monitoring"></v-list-subheader>
        <v-list-item
          title="Running Exams"
          value="runningexams"
          prepend-icon="mdi-shoe-sneaker"
        >
        </v-list-item>
        <v-list-item
          title="Finished Exams"
          value="finishedexams"
          prepend-icon="mdi-history"
        >
        </v-list-item>
        <v-list-item
          title="SEB Client Logs"
          value="sebclientlogs"
          prepend-icon="mdi-chart-timeline"
        >
        </v-list-item>
      </template>
      <v-divider class="m-y-2"></v-divider>
      <v-list-item>
        <template v-slot:prepend>
          <v-icon icon="mdi-palette-swatch"></v-icon>
          <span class="ml-2">Navigation</span>
        </template>
        <template v-slot:append
          ><v-btn-toggle mandatory v-model="toggle">
            <v-btn value="modern">modern</v-btn>
            <v-btn value="classic">classic</v-btn>
          </v-btn-toggle>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const store = useGstore();
const { leftDrawer } = storeToRefs(store);
const toggle = ref("modern");
</script>
