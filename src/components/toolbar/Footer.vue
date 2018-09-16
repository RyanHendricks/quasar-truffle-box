<template>
  <q-layout-footer
    v-model="footer"
    :reveal="footerReveal">

    <q-toolbar
      color="primary"
      inverted
      flat>
      <q-toolbar-title>
        <div slot="subtitle">Connected to: <b>{{ network }}</b></div>
        <div slot="subtitle">Contract Address: {{ address }} </div>
        <div
          v-if="unlocked == true"
          slot="subtitle">
          Balance: {{ balance }} ETH
        </div>
      </q-toolbar-title>
    </q-toolbar>

  </q-layout-footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Footer',
  computed: {
    ...mapState('settings', ['footerReveal', 'footer']),
    ...mapState('ethengine', ['unlocked', 'balance', 'account', 'network']),
    ...mapState('contract', ['address']),
  },
};
</script>

<style>
</style>
