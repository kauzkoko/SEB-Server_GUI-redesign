<template>
  <v-navigation-drawer v-model="leftDrawer" temporary width="400">
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
            @click.stop="store.toggleLeftDrawer()"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const store = useGstore();
const { leftDrawer } = storeToRefs(store);
</script>
