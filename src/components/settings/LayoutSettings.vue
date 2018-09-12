<template>
  <q-list
    no-border
    link
    inset-delimiter>

    <p class="caption">Layout Settings</p>
    <q-field
      color="primary"
      icon="dashboard"
      icon-color="primary"
      label="Header">

      <div>
        <q-toggle
          v-model="header"
          class="q-pa-sm"
          label="Header" />
      </div>

      <div>
        <q-toggle
          v-model="headerReveal"
          class="q-pa-sm"
          label="Header Reveal" />
      </div>
    </q-field>
    <q-item-separator />

    <q-field
      color="primary"
      icon="dashboard"
      icon-color="primary"
      label="Footer">
      <div>
        <q-toggle
          v-model="footer"
          class="q-pa-sm"
          label="Footer" />
      </div>

      <div>
        <q-toggle
          v-model="footerReveal"
          class="q-pa-sm"
          label="Footer Reveal" />
      </div>
    </q-field>
    <q-item-separator />

    <q-field
      color="primary"
      icon="dashboard"
      icon-color="primary"
      label="Drawer">
      <div>
        <q-toggle
          v-model="drawerOverlay"
          class="q-pa-sm"
          label="Drawer Overlay" />
      </div>

      <div>
        <q-toggle
          v-model="drawerPosition"
          true-value="right"
          false-value="left"
          class="q-pa-sm"
          label="Drawer Position" />
      </div>

    </q-field>
    <q-field
      color="primary"
      icon="icon"
      icon-color="primary"
      helper="Toggle icons above route tabs"
      label="Tab Icons">

      <div>
        <q-toggle
          v-model="tabIcons"
          class="q-pa-sm"
          label="Tab Icons" />
      </div>
    </q-field>
  </q-list>
</template>

<script>
export default {
  name: 'LayoutSettings',
  data() {
    return {};
  },
  computed: {
    header: {
      get() {
        return this.$store.state.settings.header;
      },
      set(val) {
        this.$store.commit('settings/setHeader', val);
      },
    },
    headerReveal: {
      get() {
        return this.$store.state.settings.headerReveal;
      },
      set(val) {
        this.$store.commit('settings/setHeaderReveal', val);
      },
    },
    footer: {
      get() {
        return this.$store.state.settings.footer;
      },
      set(val) {
        this.$store.commit('settings/setFooter', val);
      },
    },
    footerReveal: {
      get() {
        return this.$store.state.settings.footerReveal;
      },
      set(val) {
        this.$store.commit('settings/setFooterReveal', val);
      },
    },
    drawerOverlay: {
      get() {
        return this.$store.state.settings.drawerOverlay;
      },
      set(val) {
        this.$store.commit('settings/setDrawerOverlay', val);
      },
    },
    drawerPosition: {
      get() {
        return this.$store.state.settings.drawerPosition;
      },
      set(val) {
        this.$store.commit('settings/setDrawerPosition', val);
      },
    },
    tabIcons: {
      get() {
        return this.$store.state.settings.tabIcons;
      },
      set(val) {
        this.$store.commit('settings/TOGGLE_TAB_ICONS', val);
      },
    },
  },
};
</script>

<style>

</style>
