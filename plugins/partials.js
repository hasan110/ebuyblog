import Vue from 'vue';

import SsrCarousel from 'vue-ssr-carousel'

const partialComponents = {
  SsrCarousel,
}

Object.entries(partialComponents).forEach(([name, component]) => {
    Vue.component(name, component)
})
