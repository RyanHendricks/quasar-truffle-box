<template>
  <div>
    <q-list
      no-border
      link
      inset-delimiter
    >
      <q-list-header>Essential Links</q-list-header>
      <q-item @click.native="openURL('http://quasar-framework.org')">
        <q-item-side icon="school" />
        <q-item-main
          label="Docs"
          sublabel="quasar-framework.org" />
      </q-item>
      <q-item @click.native="openURL('https://github.com/quasarframework/')">
        <q-item-side icon="code" />
        <q-item-main
          label="GitHub"
          sublabel="github.com/quasarframework" />
      </q-item>
      <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
        <q-item-side icon="chat" />
        <q-item-main
          label="Discord Chat Channel"
          sublabel="https://discord.gg/5TDhbDg" />
      </q-item>
      <q-item @click.native="openURL('http://forum.quasar-framework.org')">
        <q-item-side icon="record_voice_over" />
        <q-item-main
          label="Forum"
          sublabel="forum.quasar-framework.org" />
      </q-item>
      <q-item @click.native="openURL('https://twitter.com/quasarframework')">
        <q-item-side icon="rss feed" />
        <q-item-main
          label="Twitter"
          sublabel="@quasarframework" />
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'DrawerLinks',
  data() {
    return {};
  },
  methods: {
    openURL,
  },
};
</script>

<style>
</style>
