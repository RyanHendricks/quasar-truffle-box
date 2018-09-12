<template>
  <div>
    <q-tabs
      v-if="tabIcons == true"
      align="justify"
      class="no-shadow"
      inverted>
      <q-route-tab
        slot="title"
        icon="all inclusive"
        to="/"
        replace
        default
        exact
        label="Home"
      />
      <q-route-tab
        slot="title"
        icon="spa"
        to="/Contracts"
        replace
        exact
        label="Contracts"
      />
      <q-route-tab
        slot="title"
        icon="settings"
        to="/Settings"
        replace
        exact
        label="Settings"
      />
    </q-tabs>

    <q-tabs
      v-if="tabIcons === false"
      align="justify"
      inverted>
      <q-route-tab
        slot="title"
        to="/"
        replace
        default
        exact
        label="Home"
      />
      <q-route-tab
        slot="title"
        to="/Contracts"
        replace
        exact
        label="Contracts"
      />
      <q-route-tab
        slot="title"
        to="/Settings"
        replace
        exact
        label="Settings"
      />
    </q-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'RouteTabs',
  data() {
    return {};
  },
  computed: {
    ...mapState('settings', ['tabIcons']),
  },
};
</script>

<style>
</style>
