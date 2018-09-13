<template>
  <div>
    <q-card
      v-for="method in functions"
      v-if="method.type === 'function'"
      :key="method.name"
      class="q-pa-md; q-ma-md">

      <q-card-title>
        <div v-if="method.outputs">
          <div
            v-for="(output, index) in method.outputs"
            :key="output[index]"
          >
            <div v-if="output.value">
              {{ output.value }}
            </div>
          </div>


        </div>

      </q-card-title>

      <q-field
        v-if="method.stateMutability === 'nonpayable' && method.constant === false"
        :label="method.name"
        class="q-pa-md"
        icon="wifi">
        <div
          v-if="method.inputs">
          <q-input
            v-for="(input, index) in method.inputs"
            :key="input[index]"
            v-model="method.inputs[index].value"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
        </div>
        <q-btn
          :v-model="method.name"
          color="primary"
          @click="callNonPayableMethod(method.name, method.inputs)"
        >Call
        </q-btn>
      </q-field>

      <q-field
        v-if="method.stateMutability === 'view' && method.constant === true"
        :label="method.name"
        class="q-pa-md"
        icon="wifi">
        <div
          v-if="method.inputs">
          <q-input
            v-for="(input, index) in method.inputs"
            v-if="input"
            :key="input[index]"
            v-model="method.inputs[index].value"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
        </div>
        <q-btn
          :v-model="method.name"
          color="primary"
          @click="callContract(method.name, method.inputs)"
        >Call
        </q-btn>
      </q-field>

    </q-card>

  </div>
</template>

<script>
import { Notify } from 'quasar';

export default {
  name: 'ContractInterface',
  components: {
  },
  data() {
    return {
      data: [],
      functions: this.$store.state.contract.functions,
      error: '',
      callableMethod: {
        name: '',
        methodArgs: [],
      },
      methodName: '',
      methodArgs: [],
    };
  },
  methods: {
    // eslint-disable-next-line
    callContract(method, inputs) {
      try {
        const args = [];
        inputs.forEach((input) => {
          args.push(input.value);
        });
        const payload = {
          name: method,
          args,
        };
        console.log(method);
        this.$store.dispatch('contract/callContractWithArgs', payload);
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
    callNonPayableMethod(method, inputs) {
      try {
        const callArgs = [];
        inputs.forEach((input) => {
          callArgs.push(input.value);
        });
        const payload = {
          name: method,
          args: callArgs,
        };
        console.log(payload);
        this.$store.dispatch('contract/callNonPayableMethod', payload);
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
  },
};
</script>

<style>
</style>
