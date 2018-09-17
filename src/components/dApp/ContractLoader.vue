<template>
  <div>
    <div
      color="white"
      class="shadow-8">
      <q-card>
        <q-card-title >
          <q-btn
            icon="track_changes"
            class="no-shadow"/>
          {{ title }}
        </q-card-title>
        <q-card-separator/>

        <q-card-main class="q-pa-lg">
          <q-field
            :label="labelText"
            :helper="helperText">

            <q-input

              v-model="address"
              :float-label="floatLabel" />
          </q-field>
        </q-card-main>
        <q-card-separator/>

        <q-card-actions vertical>
          <q-btn
            :label="buttonLabel"
            class="q-ma-md"
            color="primary"
            inverted
            @click="loadContract()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ContractLoader',
  data() {
    return {
      title: 'Load a deployed contract',
      helperText: 'Enter the address of the deployed contract',
      buttonLabel: 'Load Contract',
      floatLabel: 'Contract Address',

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
        await this.$store.commit('contract/SET_CONTRACT_ADDRESS', this.address);

        // dispatch contract object to vuex
        await this.$store.dispatch('contract/createContractInstance');
      } catch (e) {
        throw new Error(e);
      }
    },
  },
};
</script>

<style>
</style>
