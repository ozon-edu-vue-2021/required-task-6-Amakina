import Vue from 'vue';
import App from './App.vue';
import { CustomDetectViewportDirective } from '@/directives/CustomDetectViewportDirective';
import VueVirtualScroller from 'vue-virtual-scroller'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.use(VueVirtualScroller)

Vue.directive('CustomDetectViewportDirective', CustomDetectViewportDirective);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount('#app');
