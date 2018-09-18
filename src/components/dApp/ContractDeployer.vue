<template>
  <div
    class="shadow-8">
    <q-card>
      <q-card-title>
        <q-icon
          class="q-px-md"
          name="arrow_upward" />
        {{ title }}
      </q-card-title>

      <div v-if="unlocked === true">
        <q-card-main class="q-pa-md">
          <q-field>
            Network = <b>{{ network }}</b>
          </q-field>
        </q-card-main>
        <q-card-separator/>
        <q-card-actions vertical>
          <q-btn
            :disable="!unlocked"
            :label="buttonLabel"
            class="q-ma-sm"
            color="primary"
            inverted
            @click="deployContract()" />
        </q-card-actions>
      </div>

      <div v-if="unlocked === false">
        <q-card-main class="q-pa-md">
          <q-field
            label="please unlock Metamask"
            class="q-pa-sm" />
        </q-card-main>
        <q-card-separator/>
        <q-card-actions vertical>
          <q-btn
            :disable="!unlocked"
            class="q-ma-sm"
            label="Create Contract"
            color="primary"
            inverted />
        </q-card-actions>
      </div>


    </q-card>
  </div>
</template>


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
    ...mapState('ethengine', ['unlocked', 'account', 'network']),
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
