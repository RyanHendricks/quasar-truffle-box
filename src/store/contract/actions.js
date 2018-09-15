import TestToken from '../../.././build/contracts/OathMusic.json';
import { Notify } from 'quasar';

export const createContractInstance = async ({ commit }) => {
  try {
    commit('SET_CONTRACT_BIN', TestToken.bytecode);
    commit('SET_CONTRACT_ABI', TestToken.abi);
    commit('SET_CONTRACT_METHODS');
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

// export const enrich = async ({ state }, parseResults) => {
//   const contractInstance = await new global.web3.eth.Contract(state.abi, state.address);
//   const abi = contractInstance.jsonInterface;

//   function addMethod({ name, maxGas }) {
//     contractInstance[name] = function () {
//       const methodCallInstance = contractInstance.methods[name](...arguments);
//       return {
//         async send(sendArgs) {
//           const result = await methodCallInstance.send({ ...sendArgs });
//           // enrichTransactionReceipt(contractInstance, result);
//           return result;
//         },
//         async call(sendArgs) {
//           const rawResult = await methodCallInstance.call({ ...sendArgs, gas: maxGas });
//           return parseResults({ name, rawResult });
//         },
//         encodeABI() {
//           return methodCallInstance.encodeABI();
//         },
//       };
//     };
//   }

//   for (let i = 0; i < abi.length; i += 1) {
//     const item = abi[i];
//     if (item.type !== 'function') continue;
//     addMethod({ name: item.name, maxGas: defaultMaxGas });
//   }

//   return contractInstance;
// };


// export const callContract = async ({ state, rootState }, payload) => {
//   try {
//     const MyContract = await new global.web3.eth.Contract(state.abi, state.address);
//     const call = MyContract.methods[payload.name].apply(MyContract.methods);
//     const result = await call.call({ from: rootState.ethengine.account });
//     Notify.create({ type: 'positive', message: result.toString() });
//   } catch (e) {
//     Notify.create({ type: 'negative', message: e.toString() });
//   }
// };

export const callContractWithArgs = async ({ state, rootState, commit }, payload) => {
  try {
    const MyContract = await new global.web3.eth.Contract(state.abi, state.address);

    console.log(payload.stateMutability);
    if (payload.format === true) {
      await MyContract.methods[payload.name]
        .apply(MyContract.methods[payload.name], payload.args)
        .call({ from: rootState.ethengine.account })
        .then((res) => {
          Notify.create({ type: 'positive', message: res.toString() });
          const methodUpdate = {
            name: payload.name,
            value: res,
            key: payload.key,
          };
          commit('SET_CONTRACT_CALL_VALUE', methodUpdate);
        });
    } else if (payload.format === false) {
      await MyContract.methods[payload.name]
        .apply(MyContract.methods[payload.name], payload.args)
        .send({ from: rootState.ethengine.account })
        .then((res) => {
          Notify.create({ type: 'positive', message: res.toString() });
          const methodUpdate = {
            name: payload.name,
            value: res,
            key: payload.key,
          };
          commit('SET_CONTRACT_CALL_VALUE', methodUpdate);
        });
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const callNonPayableMethod = async ({ state, rootState, commit }, payload) => {
  try {
    const MyContract = await new global.web3.eth.Contract(state.abi, state.address);
    await MyContract.methods[payload.name]
      .apply(MyContract.methods[payload.name], payload.args)
      .send({ from: rootState.ethengine.account })
      .on('receipt', (receipt) => {
        Notify.create({ type: 'positive', message: `Cumulative Gas Used: ${receipt.cumulativeGasUsed}` });
        commit('LOG_TXN_RECEIPT', receipt);
        Notify.create({ type: 'positive', message: receipt });
      });
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};


export const deployContract = async ({
  rootState, state, commit, dispatch,
}) => {
  // await dispatch('createContractInstance');
  await commit('SET_CONTRACT_BIN', TestToken.bytecode);
  await commit('SET_CONTRACT_ABI', TestToken.abi);

  // const fromAddress = rootState.ethengine.account;
  const ContractInstance = await new global.web3.eth.Contract(state.abi);
  ContractInstance.options.data = state.bin;
  try {
    await ContractInstance.deploy({})
      .send({ from: rootState.ethengine.account })
      .on('error', (error) => {
        Notify.create({ type: 'negative', message: `Contract Deployment Failed - ${error}` });
      })
      .on('transactionHash', (hash) => {
        Notify.create({ type: 'positive', message: `Transaction Hash: ${hash}` });
        commit('SET_TXN_HASH', hash);
        commit('SET_CONTRACT_METHODS');
      })
      .on('receipt', (receipt) => {
        Notify.create({ type: 'positive', message: `Contract Deployed at ${receipt.contractAddress}` });
        Notify.create({ type: 'positive', message: `Cumulative Gas Used: ${receipt.cumulativeGasUsed}` });
        commit('SET_CONTRACT_ADDRESS', receipt.contractAddress);
        commit('LOG_TXN_RECEIPT', receipt);
      })
      .then(() => {
        // dispatch('readContractConstants');
      });
  } catch (e) {
    Notify.create({ type: 'negative', message: e });
  }
  // commit('SET_CONTRACT_ADDRESS', constractAddress);
  // dispatch('callConstants');
};

export const initContractPolling = ({ dispatch }) => {
  setInterval(() => {
    dispatch('readContract');
  // }, rootState.updateInterval);
  }, 7500);
};

export const readContractConstants = async ({
  state, rootState, commit,
}) => {
  try {
    // eslint-disable-next-line
    const ContractInstance = await new global.web3.eth.Contract(state.abi, state.address);
    await state.abi.forEach((method) => {
      if (method.inputs.length === 0 && method.stateMutability === 'view') {
        ContractInstance.methods[method.name]
          .apply(ContractInstance.methods[method.name])
          .call({ from: rootState.ethengine.account })
          .then((res) => {
            const tempMethod = Object.assign({}, method);

            if (method.outputs.length === 1) {
              // Object.assign(tempMethod.outputs[0], { value: res });
              tempMethod.outputs[0].value = res;
              console.log(tempMethod.value);
            } else if (method.outputs.length > 1) {
              for (let i = 0; i < method.outputs.length; i += 1) {
                tempMethod[i].value = res;
                console.log(tempMethod[i].value);
              }
            }

            const payload = Object.assign(method, tempMethod);
            commit('SET_CONTRACT_METHOD_VALUE', payload);
          });


        // const payload = {
        //   name: method.name,
        //   value: res,
        // };
        // commit('SET_CONTRACT_METHOD_VALUE', payload);
        // });
      }
    });
  } catch (e) {
    Notify.create({ type: 'negative', message: e });
  } finally {
    // dispatch('readContract');
  }
};

export const createNotification = (text) => {
  Notify.create({
    message: text.toString(),
    color: 'primary',
    textColor: 'white', // if default 'white' doesn't fits
    icon: 'memory',
  });
};
