<template>
  <div>
    <q-card
      v-for="method in this.$store.state.contract.abi"
      v-if="method.type === 'function'"
      :key="method.name"
      class="q-pa-md; q-ma-md">

      <q-field
        v-if="method.stateMutability === 'nonpayable' && method.constant === false"
        :label="method.name"
        class="q-pa-md"
        icon="wifi">
        <div
          v-if="method.inputs">
          <q-input
            v-for="(input, index) in method.inputs"
            v-if="input"
            :key="input[index]"
            v-model="callableMethod.methodArgs[index]"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
        </div>
        <q-btn
          :v-model="method.name"
          color="primary"
          @click="callNonPayableMethod(method.name)"
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
            v-model="callableMethod.methodArgs[index]"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
        </div>
        <q-btn
          :v-model="method.name"
          color="primary"
          @click="callContract(method.name)"
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
      functions: [],
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
    callContract(method) {
      try {
        if (!this.callableMethod.methodArgs.length) {
          const payload = {
            name: method,
          };
          this.$store.dispatch('contract/callContract', payload);
        } else if (this.callableMethod.methodArgs.length) {
          const payload = {
            name: method,
            args: [this.callableMethod.methodArgs],
          };
          this.$store.dispatch('contract/callContractWithArgs', payload);
        }
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
    callNonPayableMethod(method) {
      try {
        if (!this.callableMethod.methodArgs.length) {
          const payload = {
            name: method,
          };
          this.$store.dispatch('contract/callNonPayableMethod', payload);
        } else if (this.callableMethod.methodArgs.length) {
          const payload = {
            name: method,
            args: [this.callableMethod.methodArgs],
          };
          this.$store.dispatch('contract/callNonPayableMethod', payload);
        }
      } catch (e) {
        Notify.create({ type: 'negative', message: e.toString() });
      }
    },
  },
};
</script>

<style>
</style>
