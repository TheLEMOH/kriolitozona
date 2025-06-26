import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";
import PrimeVue from "primevue/config";
import Tooltip from 'primevue/tooltip';

import "primeicons/primeicons.css";

const app = createApp(App);
const pinia = createPinia();
app.directive('tooltip', Tooltip);
app.use(router);
app.use(pinia);
app.use(PrimeVue, {
  locale: {
    closeText: "Закрыть",
    prevText: "Назад",
    nextText: "Вперёд",
    currentText: "Home",
    monthNames: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    monthNamesShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
    dayNamesShort: ["Воск", "Пон", "Вт", "Ср", "Четв", "Пят", "Суб"],
    dayNamesMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    weekHeader: "Неделя",
    FirstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    timeOnlyTitle: "Только время",
    timeText: "Время",
    hourText: "Час",
    minuteText: "Минута",
    secondText: "Секунда",
    ampm: false,
    month: "Месяц",
    week: "неделя",
    day: "День",
    allDayText: "Весь день",
  },
});
app.use(ToastService);
app.use(ConfirmationService);
app.mount("#app");
