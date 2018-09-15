<template>
  <div>
    <h6>Create a new Contract</h6>

    <!-- Deploy Contract Button -->
    <div v-if="unlocked === true">
      <q-field
        :helper="account"
        class="q-pa-xs"
      >
        <q-btn
          :disable="!unlocked"
          label="Create Contract"
          color="secondary"
          class="inverted"
          @click="deployContract()" />
      </q-field>
    </div>
    <div v-if="unlocked === false">
      <q-field
        helper="please unlock Metamask"
        class="q-pa-xs"
      >
        <q-btn
          :disable="!unlocked"
          label="Create Contract"
          color="secondary"
          class="inverted" />
      </q-field>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContractDeployer',
  data() {
    return {
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
