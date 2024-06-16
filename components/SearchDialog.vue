<template>
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
        <v-btn
          class="ms-auto"
          text="Close"
          @click="store.closeSearchDialog()"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup>
const store = useGstore();
const { dialog, search } = storeToRefs(store);

const keys = useMagicKeys();
const CtrlK = keys["Ctrl+K"];
const CmdK = keys["Cmd+K"];

watch([CtrlK, CmdK], (v) => {
  if (v) console.log("CtrlK or CmdK have been pressed");
  store.openSearchDialog();
});
</script>
