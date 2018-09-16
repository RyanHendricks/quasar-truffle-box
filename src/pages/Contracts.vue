<template>
  <q-page
    padding
    class="row justify-center">
    <div
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      <ContractDeployer />
    </div>
    <div
      class="col; q-ma-md"
      style="width: 500px; max-width: 90vw;">
      <ContractLoader />
    </div>
    <div>
      <ContractInterface />
    </div>
  </q-page>
</template>


<script>

import ContractDeployer from '.././components/dApp/ContractDeployer';
import ContractLoader from '.././components/dApp/ContractLoader';
import ContractInterface from '.././components/dApp/ContractInterface';

export default {
  name: 'Contracts',
  components: {
    ContractDeployer,
    ContractInterface,
    ContractLoader,
  },
};
</script>

<style>
</style>
