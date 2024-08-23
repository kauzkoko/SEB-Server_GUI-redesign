export const useGstore = defineStore(
  "Gstore",
  () => {
    // State
    const nothing = ref("");
    const leftDrawer = ref(false);
    const rightDrawer = ref(false);
    const selected = ref(["dashboard"]);
    const language = ref(0);
    const darkMode = ref(0);
    const colorblindMode = ref(0);
    const selectedDashboard = ref(["dashboardall"]);
    const selectedExams = ref(["examsall"]);
    const selectedMonitoring = ref(["monitoringall"]);
    const search = ref("");
    const dialog = ref(false);
    const focus = ref(false);
    const loading = ref(false);
    const searchInput = ref(false);
    const menu = ref(false);
    const subnavigationRail = ref(false);
    const checkboxes = ref([]);
    const activeStep = ref(0);
    const selectedDatatables = ref([]);
    const sebSettings = ref(false);
    const { history } = useRefHistory(activeStep);

    watch(
      [selected, selectedDashboard, selectedExams, selectedMonitoring],
      () => {
        activeStep.value = 0;
      }
    );

    // Actions
    function toggleLeftDrawer() {
      leftDrawer.value = !leftDrawer.value;
    }

    function toggleRightDrawer() {
      rightDrawer.value = !rightDrawer.value;
    }

    function closeSearchDialog() {
      dialog.value = false;
      focus.value = false;
      search.value = "";
    }

    function openSearchDialog() {
      search.value = "";
      dialog.value = true;
      setTimeout(() => {
        const el = document.getElementById("focusText");
        el.focus();
      }, 100);
    }

    return {
      nothing,
      leftDrawer,
      rightDrawer,
      selected,
      language,
      darkMode,
      colorblindMode,
      selectedDashboard,
      selectedExams,
      selectedMonitoring,
      search,
      dialog,
      focus,
      loading,
      searchInput,
      menu,
      subnavigationRail,
      checkboxes,
      toggleLeftDrawer,
      toggleRightDrawer,
      closeSearchDialog,
      openSearchDialog,
      activeStep,
      selectedDatatables,
      sebSettings,
      history,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
