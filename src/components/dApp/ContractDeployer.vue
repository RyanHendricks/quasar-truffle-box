<template>
  <div>


    <div
      color="white"
      class="shadow-8">
      <q-card>
        <q-card-title >
          <q-btn
            icon="settings"
            class="no-shadow"/>
          {{ title }}
        </q-card-title>
        <q-card-main>
          <div
            v-if="unlocked === true">

            <q-field

              :helper="
              account"
              class="q-pa-xs">
              <q-btn
                :disable="!unlocked"
                label="Create Contract"
                color="secondary"
                class="inverted"
                @click="deployContract()" />
            </q-field>
    </div></q-card-main></q-card></q-btn></q-card-title></div>

    <div v-if="unlocked === false">
      <q-field
        helper="please unlock Metamask"
        class="q-pa-xs">
        <q-btn
          :disable="!unlocked"
          label="Create Contract"
          color="secondary"
          class="inverted" />
      </q-field>
    </div>
      </q-card-main></q-card>
  </div>
</div></template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContractDeployer',
  data() {
    return {
      title: 'Deploy New Contract',
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
