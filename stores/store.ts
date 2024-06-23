export const useGstore = defineStore("Gstore", {
  state: () => {
    return {
      nothing: "",
      leftDrawer: false,
      rightDrawer: false,
      selected: ["dashboard"],
      language: 0,
      darkMode: 0,
      colorblindMode: 0,
      selectedDashboard: ["dashboardall"],
      selectedExams: ["examsall"],
      selectedMonitoring: ["monitoringall"],
      search: "",
      dialog: false,
      focus: false,
      loading: false,
      searchInput: false,
      menu: false,
      subnavigationRail: false,
    };
  },
  actions: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer;
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
    },
    closeSearchDialog() {
      this.dialog = false;
      this.focus = false;
      this.search = "";
    },
    openSearchDialog() {
      this.search = "";
      this.dialog = true;
      setTimeout(() => {
        let el = document.getElementById("focusText");
        el.focus();
      }, 100);
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
