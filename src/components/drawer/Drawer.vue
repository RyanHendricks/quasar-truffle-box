<template>
  <div>
    <q-layout-drawer
      :side="drawerPosition"
      v-model="drawerState"
      :overlay="drawerOverlay"
    >
      <DrawerDappStats />
      <DrawerLinks />
    </q-layout-drawer>
  </div>
</template>

<script>
import DrawerLinks from './DrawerLinks';
import DrawerDappStats from './DrawerDappStats';
import { mapState } from 'vuex';

export default {
  name: 'DappDrawer',
  components: {
    DrawerLinks,
    DrawerDappStats,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('settings', ['drawerState', 'drawerOverlay', 'drawerPosition']),
    drawerState: {
      get() {
        return this.$store.state.settings.drawerState;
      },
      set(val) {
        this.$store.commit('settings/setDrawerState', val);
      },
    },
  },
};
</script>

<style>
</style>
