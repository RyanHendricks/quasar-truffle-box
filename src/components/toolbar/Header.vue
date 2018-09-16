<template>
  <q-layout-header
    v-model="header"
    :reveal="headerReveal"
    class="shadow-1"
  >

    <q-toolbar
      inverted

      flat>
      <q-btn
        flat
        dense
        round
        aria-label="Menu"
        @click="drawerState = !drawerState">
        <q-icon name="menu" />
      </q-btn>
      <q-toolbar-title>
        Quasar Truffle Box
        <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>

      </q-toolbar-title>
      <UserDropdown/>

    </q-toolbar>
    <NavigationTabs />
  </q-layout-header>
</template>

<script>
import UserDropdown from './UserDropdown';
import NavigationTabs from '.././toolbar/NavigationTabs';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  components: {
    UserDropdown,
    NavigationTabs,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('settings', ['headerReveal', 'header']),
    drawerState: {
      get() {
        return this.$store.state.settings.drawerState;
      },
      set(val) {
        this.$store.commit('settings/setDrawerState', val);
      },
    },
  },
  methods: {},
};
</script>

<style>


</style>
