<template>
  <div class="shadow-8">
    <q-card>
      <q-card-title >
        <q-icon
          class="q-px-md"
          name="track_changes" />
        Load a deployed contract
      </q-card-title>

      <q-card-separator/>

      <q-card-main class="q-pa-md">
        <q-field
          helper="Enter the address of the deployed contract">
          <q-input
            v-model="address"
            float-label="Contract Address" />
        </q-field>
      </q-card-main>

      <q-card-separator/>

      <q-card-actions vertical>
        <q-btn
          label="Load Contract"
          class="q-ma-sm"
          color="primary"
          inverted
          @click="loadContract()" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Notify } from 'quasar';

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
          Notify.create({ type: 'negative', message: 'Invalid Address' });
        }
        await this.$store.commit('contract/SET_CONTRACT_ADDRESS', this.address);
        await this.$store.dispatch('contract/createContractInstance');
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
  },
};
</script>

<style>
</style>
