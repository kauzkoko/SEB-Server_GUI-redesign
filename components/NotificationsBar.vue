<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" class="ml-2">
        <v-badge color="error" content="2">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list>
      <v-list-subheader class="uppercase">User Notification</v-list-subheader>
      <v-list-item
        ><template v-slot:prepend>
          <v-icon icon="mdi-alert" color="red"></v-icon>
        </template>
        <template v-slot:append>
          <v-icon icon="mdi-battery-30" class="pb-1 mr-1" size="small"></v-icon>
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
</template>

<script setup>
const store = useGstore();
const { menu } = storeToRefs(store);
</script>
