<template>
  <div>
    <h6>Create a new Contract</h6>

    <!-- Deploy Contract Button -->
    <div v-if="this.$store.state.ethengine.unlocked === true">
      <q-field
        :helper="this.$store.state.ethengine.account"
        class="q-pa-xs"
      >
        <q-btn
          :disable="!this.$store.state.ethengine.unlocked"
          label="Create Contract"
          color="secondary"
          class="inverted"
          @click="deployContract()" />
      </q-field>
    </div>
    <div v-if="this.$store.state.ethengine.unlocked === false">
      <q-field
        helper="please unlock Metamask"
        class="q-pa-xs"
      >
        <q-btn
          :disable="!this.$store.state.ethengine.unlocked"
          label="Create Contract"
          color="secondary"
          class="inverted" />
      </q-field>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContractDeployer',
  data() {
    return {
    };
  },
  methods: {
    deployContract() {
      this.$store.dispatch('contract/deployContract');
    },
    createContractInstance() {
      this.$store.dispatch('contract/createContractInstance');
    },
  },
};
</script>

<style>
</style>
