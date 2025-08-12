import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import PrimevuePlugin from "./config/primevue";
import { PiniaColada } from "@pinia/colada";
import * as Ionicons from "oh-vue-icons/icons/io";
import * as FontAwesome from "oh-vue-icons/icons/fa";
import * as GameIcons from "oh-vue-icons/icons/gi";
import * as HeroIcons from "oh-vue-icons/icons/hi";
import * as MaterialDesignIcons from "oh-vue-icons/icons/md";
import * as BootstrapIcons from "oh-vue-icons/icons/bi";
import router from "./router/index";
import CustomComponents from "@/config/component";

const Icons = Object.values({
  ...Ionicons,
  ...FontAwesome,
  ...GameIcons,
  ...HeroIcons,
  ...MaterialDesignIcons,
  ...BootstrapIcons
});
addIcons(...Icons);

createApp(App)
  .component("v-icon", OhVueIcon)
  .use(CustomComponents)
  .use(PrimevuePlugin)
  .use(createPinia())
  .use(PiniaColada)
  .use(router)
  .mount("#app");
