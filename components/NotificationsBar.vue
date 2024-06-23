<template>
  <v-menu v-model="menu" :close-on-content-click="false" location="bottom">
    <template v-slot:activator="{ props }">
      <v-btn variant="text" v-bind="props" class="ml-2">
        <v-badge color="error" content="2">
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>
    <v-list class="max-w-500px">
      <v-list-subheader class="uppercase">User Notifications</v-list-subheader>
      <v-list-item>
        <v-tabs v-model="tab">
          <v-tab :value="1">All</v-tab>
          <v-tab :value="2">Important</v-tab>
          <v-tab :value="3">Messages</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item :value="1">
            <v-list>
              <v-list-subheader>Today</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-alert" color="red"></v-icon>
                </template>
                <template v-slot:title>
                  30%
                  <v-icon
                    icon="mdi-battery-30"
                    size="x-small"
                    class="mb-1 ml--1"
                  ></v-icon>
                  left on <v-chip size="small">ASD232</v-chip></template
                >
                <template v-slot:subtitle
                  >Battery level is low. Please recharge and consider contacting
                  the user.</template
                >
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message" color="blue"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">ASD232</v-chip>
                </template>
                <template v-slot:subtitle
                  >Just a quick question: how is nr 23 related to</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle
                  >How much time do we have left?</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle>Heeelp!!!..</template>
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-subheader>Yesterday</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle
                  >Ok thank you. Will try this out..</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-alert"></v-icon>
                </template>
                <template v-slot:title>
                  30%
                  <v-icon
                    icon="mdi-battery-30"
                    size="x-small"
                    class="mb-1 ml--1"
                  ></v-icon>
                  left on <v-chip size="small">ASD232</v-chip></template
                >
                <template v-slot:subtitle
                  >Battery level is low. Please recharge and consider contacting
                  the user.</template
                >
              </v-list-item>
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            <v-list>
              <v-list-subheader>Today</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-alert"></v-icon>
                </template>
                <template v-slot:title>
                  30%
                  <v-icon
                    icon="mdi-battery-30"
                    size="x-small"
                    class="mb-1 ml--1"
                  ></v-icon>
                  left on <v-chip size="small">ASD232</v-chip></template
                >
                <template v-slot:subtitle
                  >Battery level is low. Please recharge and consider contacting
                  the user.</template
                >
              </v-list-item>
              <v-list-subheader>Yesterday</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-alert"></v-icon>
                </template>
                <template v-slot:title>
                  30%
                  <v-icon
                    icon="mdi-battery-30"
                    size="x-small"
                    class="mb-1 ml--1"
                  ></v-icon>
                  left on <v-chip size="small">ASD232</v-chip></template
                >
                <template v-slot:subtitle
                  >Battery level is low. Please recharge and consider contacting
                  the user.</template
                >
              </v-list-item>
            </v-list>
          </v-tabs-window-item>
          <v-tabs-window-item :value="3">
            <v-list>
              <v-list-subheader>Today</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">ASD232</v-chip>
                </template>
                <template v-slot:subtitle
                  >Just a quick question: how is nr 23 related to</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle
                  >Ok thank you. Will try this out..</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle
                  >Ok thank you. Will try this out..</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
              <v-list-subheader>Yesterday</v-list-subheader>
              <v-list-item class="mb-3">
                <template v-slot:prepend>
                  <v-icon icon="mdi-message"></v-icon>
                </template>
                <template v-slot:title>
                  Message from
                  <v-chip size="small">60934a</v-chip>
                </template>
                <template v-slot:subtitle
                  >Ok thank you. Will try this out..</template
                >
                <template v-slot:append>
                  <v-btn prepend-icon="mdi-reply" variant="text">REPLY</v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
const store = useGstore();
const { menu } = storeToRefs(store);
const tab = ref(null);
const items = [
  {
    notificationType: "battery",
    prependIcon: "mdi-alert",
    title: "Low battery",
  },
  { type: "divider", inset: true },
  {
    notificationType: "message",
    prependIcon: "mdi-message",
    title: "Message from",
    subtitle: `<span class="text-primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: "divider", inset: true },
];
</script>
