/*
export function someMutation (state) {
}
*/
export const SET_CONTRACT_ABI = (state, val) => {
  state.abi = val;
};
export const SET_CONTRACT_BIN = (state, val) => {
  state.bin = val;
};
export const SET_CONTRACT_METHODS = (state) => {
  state.functions = Object.assign({}, state.abi.filter(e => e.type === 'function'));
};
export const SET_TXN_HASH = (state, val) => {
  state.hashes.push(val);
};
export const SET_CONTRACT_ADDRESS = (state, val) => {
  state.address = val;
};
export const SET_CONTRACT_METHOD_VALUE = (state, payload) => {
  Object.assign(state.functions, { [payload.name]: payload });
};
export const SET_CONTRACT_CALL_VALUE = (state, payload) => {
  console.log(payload);
  state.callLog.push(payload);
  const tempMethod = Object.assign({}, state.functions, { [payload.name]: payload });
  // state.functions = Object.assign({}, tempState, payload);
  // state.constants[payload.name] = payload.value;
  Object.assign({}, tempMethod, payload.value);
  console.log(tempMethod);
  // const abiCopy = Object.assign({}, tempState);
  // state.functions = Object.assign({}, abiCopy[payload.name], payload);
};


export const LOG_TXN_RECEIPT = (state, val) => {
  state.txnReceipts.push(val);
};
