import { ref } from "vue";
import { usePrimeVue } from "primevue/config";

export default function useTheme() {
  const PrimeVue = usePrimeVue();

  const dark = "md-dark-indigo";
  const light = "md-light-indigo";

  const themeFromLocal = localStorage.getItem("KRIO_THEME") || dark;

  const currentTheme = ref(dark);

  const changeTheme = async () => {
    let nextTheme = light;
    if (currentTheme.value === light) nextTheme = dark;
    else if (currentTheme.value === dark) nextTheme = light;

    PrimeVue.changeTheme(currentTheme.value, nextTheme, "theme-link", () => {});
    currentTheme.value = nextTheme;

    localStorage.setItem("KRIO_THEME", currentTheme.value);
  };

  const setTheme = () => {
    PrimeVue.changeTheme(currentTheme.value, themeFromLocal, "theme-link", () => {});
    currentTheme.value = themeFromLocal;
  };

  return { changeTheme, setTheme };
}
