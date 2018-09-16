<template>
  <q-layout view="hHh LpR fff">

    <Header />

    <Drawer />

    <q-page-container>
      <transition
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <router-view />
      </transition>
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script>
import Header from '.././components/toolbar/Header';
import Footer from '.././components/toolbar/Footer';
import Drawer from '.././components/drawer/Drawer';

export default {
  name: 'MyLayout',
  components: {
    Header,
    Footer,
    Drawer,
  },
  data() {
    return {
    };
  },
  async beforeMount() {
    await this.$store.dispatch('ethengine/initWeb3');
  },
  mounted() {
    // this.$store.dispatch('contract/deployContract');
  },
};
</script>

<style>
</style>
