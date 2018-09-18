<template>
  <q-list
    no-border
    link
    inset-delimiter>
    <q-list-header>History</q-list-header>
    <q-item
      v-for="(log, index) in callLog"
      :key="index">
      <q-item-side>
        <q-item-tile
          color="primary"
          icon="history" />
      </q-item-side>
      <q-item-main>
        <q-item-tile label>
          <div class="uppercase">
            {{ log.name }}
          </div>
        </q-item-tile>
        <q-item-tile sublabel>{{ log.value }}</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ContractCallLog',
  data() {
    return {
    };
  },
  computed: {
    ...mapState('contract', ['callLog']),
  },
  methods: {

  },
};
</script>

<style>
</style>
