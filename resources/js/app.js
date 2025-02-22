import { createApp, h } from 'vue';
import { createInertiaApp, Link, Head } from '@inertiajs/vue3'
import { route } from "ziggy-js";
import Layout from './Shared/Layout.vue'; 
createInertiaApp({
    resolve: async name => {
        const pages = import.meta.glob('./Pages/**/*.vue');
        const importPage = pages[`./Pages/${name}.vue`];
        if (!importPage) {
            throw new Error(`Page not found: ${name}`);
        }
        const module = await importPage();
        if (module.default.layout === undefined) {
            module.default.layout = Layout;
        }
        return module;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
          .mixin({ methods: { route } })
          .use(plugin)
          .component('Link', Link)
          .component('Head', Head)
          .mount(el);
      },
      title: title => "OutDoor - " + title ,
  progress: {
    delay: 250,
    color: '#00FF00',
    includeCSS: true,
    showSpinner: true,
  },
});