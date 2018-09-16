<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
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
