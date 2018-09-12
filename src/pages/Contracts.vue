<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 600px; max-width: 90vw;">
      <div
        class="col; q-ma-md"
        style="width: 500px; max-width: 90vw;">
        <ContractDeployer />
      </div>
      <div
        class="col; q-ma-md"
        style="width: 500px; max-width: 90vw;">
        <ContractInterface />
      </div>
    </div>
  </q-page>
</template>


<script>

import ContractDeployer from '.././components/dApp/ContractDeployer';
import ContractInterface from '.././components/dApp/ContractInterface';

export default {
  name: 'Contracts',
  components: {
    ContractDeployer,
    ContractInterface,
  },
};
</script>

<style>
</style>
