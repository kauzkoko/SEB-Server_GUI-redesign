// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    "@unocss/nuxt",
    "vuetify-nuxt-module",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],

  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      labComponents: true,
      global: {
        flat: true,
        ripple: true,
      },
      VAppBar: {
        elevation: "0",
        flat: true,
      },
    },
  },

  features: {
    devLogs: false,
  },

  devServer: {
    port: 4444,
  },

  pinia: {
    storesDirs: ["./stores/**"],
  },

  piniaPersistedstate: {
    storage: "localStorage",
  },

  compatibilityDate: "2024-07-25",
});
