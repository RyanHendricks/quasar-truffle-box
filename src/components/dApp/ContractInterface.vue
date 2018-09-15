<template>
  <div>
    <q-card
      v-for="(method, index) in functions"
      :key="method[index]"

      class="q-pa-md"
      icon="wifi">

      <q-card-title>{{ method.name }}
        <!-- <div v-if="method.outputs"> -->
        <div
          v-for="(output, index) in method.outputs"
          :key="output[index]"
        >
          <div v-if="output.value">
            {{ output.value }}
          </div>
          <!-- </div> -->


        </div>

      </q-card-title>
      <q-card-main>
        <q-field
          v-if="method.inputs"
          class="q-pa-md"
          icon="wifi">

          <q-input
            v-for="(input, key) in method.inputs"
            :key="input[key]"
            v-model="method.inputs[key].value"
            :float-label="input.type + ' ' + input.name"
            class="q-ma-md"/>
          <q-btn
            :v-model="method.name"
            color="primary"
            @click="callNonPayableMethod(method)">
            Call
          </q-btn>
        </q-field>
      </q-card-main>
    </q-card>
    <!-- <q-field
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

    </q-card> -->

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
      data: [],
      // functions: this.$store.getters.functions,
      error: '',
      callableMethod: {
        name: '',
        methodArgs: [],
      },
      methodName: '',
      methodArgs: [],
    };
  },
  computed: {
    ...mapGetters('contract', ['functions']),
    // methods: () => this.$store.getters.methods,
    // contractState: () => this.$store.state.function,
  },
  methods: {
    methodInputs(user) { // this could also be done for the whole user collection in the getter we created above.
      return user.topics.map(topicId => this.topics[topicId]);
    },
    // eslint-disable-next-line
    // callContract(method, inputs) {
    //   try {
    //     const args = [];
    //     inputs.forEach((input) => {
    //       args.push(input.value);
    //     });
    //     const payload = {
    //       name: method,
    //       args,
    //     };
    //     console.log(method);
    //     this.$store.dispatch('contract/callContractWithArgs', payload);
    //   } catch (e) {
    //     Notify.create({ type: 'negative', message: e.toString() });
    //   }
    // },
    // callConstantMethod(method) {
    //   try {
    //     const callArgs = [];
    //     method.inputs.forEach((input) => {
    //       callArgs.push(input.value);
    //     });
    //     const callbacks = [];
    //     method.outputs.forEach((output) => {
    //       output.value = '';
    //       callbacks.push(output);
    //     });
    //     const obj = {
    //       name: method.name,
    //       args: callArgs,
    //       callback: callbacks,
    //     };
    //     console.log(obj);

    //     // const payload = {
    //     //   name: method,
    //     //   args: callArgs,
    //     // };
    //     // console.log(payload);
    //     this.$store.dispatch('contract/callContractWithArgs', obj);
    //   } catch (e) {
    //     Notify.create({ type: 'negative', message: e.toString() });
    //   }
    // },

    callNonPayableMethod(method) {
      try {
        const callArgs = [];
        const callbacks = [];

        if (method.inputs.length) {
          method.inputs.forEach((input) => {
            callArgs.push(input.value);
          });
        }
        if (method.outputs.length) {
          method.outputs.forEach((output) => {
            output.value = '';
            callbacks.push(output);
          });
        }

        const obj = {
          name: method.name,
          args: callArgs,
          callback: callbacks,
          format: method.constant,
        };
        console.log(obj);

        // const payload = {
        //   name: method,
        //   args: callArgs,
        // };
        // console.log(payload);
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
