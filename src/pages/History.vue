<template>
  <q-page padding>
    <ContractCallLog />
  </q-page>
</template>

<script>
import ContractCallLog from '.././components/dApp/ContractCallLog';

export default {
  name: 'History',
  components: {
    ContractCallLog,
  },
  data: () => ({
  }),
};
</script>

<style>

</style>
