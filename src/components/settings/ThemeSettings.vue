<template>
  <q-list
    no-border
    link
    inset-delimiter>
    <p class="caption">Theme Settings</p>
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

    <q-field
      color="primary"
      icon="icon"
      icon-color="primary"
      helper="Change dApp color scheme"
      label="Colors">
      <div>
        <q-toggle
          v-model="invertColors"
          class="q-pa-sm"
          label="Invert Colors" />
      </div>

      <div>
        <template>
          <q-color-picker v-model="modelHexPrimary" />
        </template>

      </div>
      <div>
        <template>
          <q-color-picker v-model="modelHexSecondary" />
        </template>

      </div>
    </q-field>
  </q-list>
</template>

<script>
export default {
  name: 'ThemeSettings',
  data() {
    return {};
  },
  computed: {
    modelHexPrimary: {
      get() {
        return this.$store.state.settings.primaryColor;
      },
      set(val) {
        this.$store.dispatch('settings/setPrimaryColor', val);
      },
    },
    modelHexSecondary: {
      get() {
        return this.$store.state.settings.secondaryColor;
      },
      set(val) {
        this.$store.dispatch('settings/setPrimaryColor', val);
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
    invertColors: {
      get() {
        return this.$store.state.settings.invertColors;
      },
      set(val) {
        this.$store.commit('settings/INVERT_COLORS', val);
      },
    },
  },
};
</script>

<style>

</style>

