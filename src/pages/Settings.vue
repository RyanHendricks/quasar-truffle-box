<template>
  <q-page
    padding
    class="row justify-center">
    <!-- <div style="width: 600px; max-width: 90vw;"> -->
    <div>
      <LayoutSettings />
    </div>
  </q-page>
</template>

<script>
import LayoutSettings from '.././components/settings/LayoutSettings';

export default {
  name: 'Settings',
  components: {
    LayoutSettings,
  },
};
</script>

<style>
</style>
