<template>
  <q-page
    padding
    class="row justify-center">
    <div style="width: 600px; max-width: 90vw;">
      <h4>Contract Function Interface</h4>


      <q-field
        class="q-pa-md"
        icon="wifi"
        helper="Enter the contract method name to call">
        <q-input
          v-model="methodName"
          float-label="Input the name of the method" />
      </q-field>
      <q-btn
        label="Call Contract Method"
        primary
        color="secondary"
        inverted
        @click="callContract(methodName)" />
    </div>
    <div>
      <q-card
        v-for="method in this.$store.state.contract.abi"
        v-if="method.type === 'function'"
        :key="method.name"
        class="q-pa-md; q-ma-md">
        <!-- <q-card-title class="q-pa-lg">{{ method.name }}</q-card-title>
        <q-card-subtitle>{{ method.type }}</q-card-subtitle> -->
        <!-- <q-field
          v-if="method.type === 'function' && !method.inputs"
          :label="method.name"
          class="q-pa-md"
          icon="wifi">
          <q-btn
            :v-model="method.name"
            color="primary"
            @click="callContract(method.name)"
          >Call</q-btn>
        </q-field> -->
        <q-field
          v-if="method.stateMutability === 'nonpayable'"
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
          >Call</q-btn>

        </q-field>
        <q-field
          v-if="method.stateMutability === 'view'"
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
          >Call</q-btn>

        </q-field>
        <!-- <q-field
          v-if="method.constant === false"
          :label="method.name"
          class="q-pa-md"
          icon="wifi">
          <! :helper="'Constant: ' + method.constant
          + ' Payable: ' + method.payable + ' State Mutability: ' + method.stateMutability"

          <q-input
            v-for="(input, index) in method.inputs"
            v-if="input"
            :key="input.index"
            v-model="methodArgs[index]"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
          <q-btn
            :v-model="method.name"
            color="primary"
            @click="callContractWithArgs(method.name)"
          >Call</q-btn>
        </q-field> -->
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar';

export default {
  name: 'PageIndex',
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
