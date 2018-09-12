/*
export function someMutation (state) {
}
*/
export const SET_CONTRACT_ABI = (state, val) => {
  state.abi = val;
  state.functions = Object.assign({}, state.abi);
};
export const SET_CONTRACT_BIN = (state, val) => {
  state.bin = val;
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
export const SET_CONTRACT_METHOD_VALUE_DUP = (state, payload) => {
  const tempState = state.functions;
  // state.functions = Object.assign({}, tempState, payload);
  // state.constants[payload.name] = payload.value;
  Object.assign({}, { tempState }, { [payload.name]: payload });
  // const abiCopy = Object.assign({}, tempState);
  // state.functions = Object.assign({}, abiCopy[payload.name], payload);
};

export const LOG_TXN_RECEIPT = (state, val) => {
  state.txnReceipts.push(val);
};
