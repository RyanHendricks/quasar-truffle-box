<template>
  <div>
    <div
      color="white"
      class="shadow-8">
      <q-card>
        <q-card-title >
          <q-btn
            flat
            icon="settings"
            class="no-shadow"/>
          {{ title }}
        </q-card-title>
        <div v-if="unlocked === true">
          <q-card-separator/>
          <q-card-actions vertical>
            <q-btn
              :disable="!unlocked"
              :label="buttonLabel"
              class="q-ma-md"
              color="primary"
              inverted
              @click="deployContract()" />
          </q-card-actions>
        </div>
        <div v-if="unlocked === false">
          <q-card-main class="q-pa-lg">
            <q-field
              label="please unlock Metamask"
              class="q-pa-xs" />
          </q-card-main>
          <q-card-separator/>
          <q-card-actions vertical>
            <q-btn
              :disable="!unlocked"
              class="q-ma-md"
              label="Create Contract"
              color="primary"
              inverted />
          </q-card-actions>
        </div>


      </q-card>
    </div>
</div></template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContractDeployer',
  data() {
    return {
      title: 'Deploy New Contract',
      labelText: 'Enter the address of the deployed contract',
      helperText: 'make sure you are on the right network',
      buttonLabel: 'Create Contract',
      floatLabel: 'Contract Address',

    };
  },
  computed: {
    ...mapState('ethengine', ['unlocked', 'account']),
  },
  methods: {
    deployContract() {
      this.$store.dispatch('contract/deployContract');
    },
  },
};
</script>

<style>
</style>
