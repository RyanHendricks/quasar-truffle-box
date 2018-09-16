<template>
  <div>

    <h6>Load a deployed contract</h6>

    <div>
      <q-field
        class="q-pa-md"
        icon="track_changes"
        helper="Enter the address of the deployed contract">
        <q-input
          v-model="address"
          float-label="Contract Address" />
        <q-btn
          label="Load Contract"
          color="secondary"
          inverted
          @click="loadContract()" />
      </q-field>
    </div>

  </div>
</template>

<script>

export default {
  name: 'ContractLoader',
  data() {
    return {
      address: '0x44Bf761ffC0462667df80BB635a91f433E137d61',
    };
  },
  computed: {},
  methods: {
    async loadContract() {
      try {
        // Validate the input -- this could be improved but works for basic validation
        if (this.address.length !== 42 && this.address.substr(0, 2) !== '0x') {
          throw new Error('invalid entry');
        }
        this.$store.commit('contract/SET_CONTRACT_ADDRESS', this.address);

        // dispatch contract object to vuex
        this.$store.dispatch('contract/createContractInstance');
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style>
</style>
