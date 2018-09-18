<template>
  <div class="row justify-center">
    <q-card
      v-for="(method, index) in functions"
      :key="method[index]"
      style="width: 375px; max-width: 90;"
      class="q-ma-sm shadow-4"
    >

      <q-card-title class="q-mx-md">
        <div class="uppercase">{{ method.name }}</div>
        <div slot="subtitle">{{ method.stateMutability }} {{ method.type }}</div>
        <div
          slot="right"
          class="row items-center">
          <q-icon name="code" /> {{ method.signature }}
        </div>
        <div
          v-for="(output, index) in method.outputs"
          :key="output[index]"
        >
          <div v-if="output.value">
            {{ output.value }}
          </div>
        </div>
      </q-card-title>

      <q-card-separator/>

      <q-card-main class="q-pa-md">
        <q-field
          v-for="(input, key) in method.inputs"
          :key="input[key]"
          icon="input"
          class="q-px-sm">
          <q-input
            v-model="method.inputs[key].value"
            :float-label="input.type + ' ' + input.name"/>
        </q-field>
      </q-card-main>


      <q-card-actions vertical>
        <q-btn
          :v-model="method.name"
          class="q-ma-md"
          color="primary"
          @click="callNonPayableMethod(method)">
          Call
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { Notify } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  name: 'ContractInterface',
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('contract', ['functions']),
  },
  methods: {
    callNonPayableMethod(method) {
      try {
        // Init arrays for function arguments and response (blank) fields
        const callArgs = [];
        const callbacks = [];

        // Add inputs to the callArgs array
        if (method.inputs.length) {
          method.inputs.forEach((input) => {
            callArgs.push(input.value);
          });
        }

        // Add blank placeholder outputs to the callbacks array
        if (method.outputs.length) {
          method.outputs.forEach((output) => {
            output.value = '';
            callbacks.push(output);
          });
        }

        // Create an object with necessary data for contract call
        const obj = {
          name: method.name,
          args: callArgs,
          callback: callbacks,
          constant: method.constant,
        };

        // Dispatch object to the store calling action
        this.$store.dispatch('contract/callContractWithArgs', obj);
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
  },
};
</script>

<style>
</style>
