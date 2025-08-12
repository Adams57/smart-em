import type { App } from "vue";
import Icon from "@/components/icon-assets/Icon.vue";
import ImageUpload from "@/components/ImageUpload.vue";

const components = {
  install(app: App): void {
    app.component("Icon", Icon);
    app.component("image-upload", ImageUpload);
  }
};

export default components;
