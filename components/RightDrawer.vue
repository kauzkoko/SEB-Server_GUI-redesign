<template>
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
            @click.stop="store.toggleRightDrawer()"
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
</template>

<script setup>
const store = useGstore();
const { rightDrawer, language, darkmode } = storeToRefs(store);
</script>
