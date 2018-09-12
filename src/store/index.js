import Vue from 'vue';
import Vuex from 'vuex';

import settings from './settings';
import ethengine from './ethengine';
import contract from './contract';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      ethengine,
      settings,
      contract,
    },
  });

  return Store;
}
