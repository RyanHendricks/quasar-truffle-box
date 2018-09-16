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
h1 {
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
  margin-bottom: 25px;
}
h2 {
  font-size: 16px;
  color: #fff;
  font-weight: 300;
  text-align: center;
  margin-bottom: 25px;
}
p {
  font-size: 14px;
  color: #fff;
  text-align: center;
  margin-bottom: 25px;
}

@import url(https://fonts.googleapis.com/css?family=Lato:400,500,300,700);
body {
  width: 100%;
  min-height: 100vh;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: block;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 20px 20px;
  font-family: 'Lato';
}
section {
  margin: 50px;
}
/* for custom scrollbar for webkit browser*/
 ::-webkit-scrollbar {
  width: 5px;
}
 ::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 ::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
