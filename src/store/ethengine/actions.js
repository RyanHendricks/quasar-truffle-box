
import Web3 from 'web3';
import { Notify } from 'quasar';

// Uses injected provider if detected for web3 connection otherwise uses infura
export const initWeb3 = async ({ state, commit, dispatch }) => {
  try {
    let web3Provider;
    if (global.web3) {
      web3Provider = global.web3.currentProvider;
      commit('IS_INJECTED', true);
      commit('SET_PROVIDER', 'Injected');
    } else {
      web3Provider = new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws');
      // web3Provider = new Web3.providers.HttpProvider(state.fallbackHost);
      commit('SET_HOST', state.fallbackHost);
      commit('IS_INJECTED', false);
      commit('SET_PROVIDER', 'infura');
    }
    if (web3Provider) {
      global.web3 = new Web3(web3Provider);
      await dispatch('startChecking');
    } else {
      commit('SET_CONNECTED', false);
    }
  } catch (e) {
    Notify.create({ type: 'warning', message: `Error: ${e}` });
  }
};

// Loops through web3 status action dispatches
export const startChecking = async ({ state, dispatch }) => {
  await setInterval(() => {
    dispatch('check');
  }, state.updateInterval);
};

// Synchronous dispatch called by startChecking every state.updateInterval
export const check = ({ dispatch }) => {
  dispatch('checkNetwork');
  dispatch('getBlockNumber');
  dispatch('getGasPrice');
  dispatch('checkConnection');
  dispatch('checkAccount');
};

// Note: the following functions do not alter state if retrieved data = state data

export const checkNetwork = async ({ state, commit }) => {
  try {
    const network = await global.web3.eth.net.getId();
    if (network !== state.netId) {
      commit('UPDATE_NETWORK', network);
      commit('SET_CONNECTED', true);
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const checkAccount = async ({ state, commit, dispatch }) => {
  try {
    const accounts = await global.web3.eth.getAccounts();
    if (accounts.length && state.account !== accounts[0]) {
      commit('UPDATE_UNLOCKED', true);
      commit('UPDATE_ACCOUNT', accounts[0]);
      commit('IS_INJECTED', true);
      dispatch('getBalance');
    } else if (!accounts.length && state.unlocked !== false) {
      commit('UPDATE_UNLOCKED', false);
      commit('UPDATE_ACCOUNT', 'Please Unlock Metamask');
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const getBalance = async ({ state, commit }) => {
  try {
    if (!state.account || state.unlocked === false) {
      commit('SET_BALANCE', 0);
    } else {
      await global.web3.eth.getBalance(state.account)
        .then((rawBalance) => {
          const balance = global.web3.utils.fromWei(rawBalance.toString(10), 'ether');
          commit('SET_BALANCE', balance);
        });
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const getBlockNumber = async ({ state, commit }) => {
  try {
    const block = await global.web3.eth.getBlockNumber();
    if (state.blockNumber !== block) {
      commit('UPDATE_BLOCK', block);
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const getGasPrice = async ({ state, commit }) => {
  try {
    const rawPrice = await global.web3.eth.getGasPrice();
    const gasPrice = global.web3.utils.fromWei(rawPrice, 'ether').toString(10) * 1000000000;
    if (gasPrice && state.gasPrice !== gasPrice) {
      commit('UPDATE_GASPRICE', gasPrice);
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const checkConnection = async ({ state, commit }) => {
  try {
    const connected = await global.web3.eth.net.isListening();
    if (connected === true && state.connected !== true) {
      commit('SET_CONNECTED', true);
    }
  } catch (e) {
    Notify.create({ type: 'negative', message: e.toString() });
  }
};

export const createEngineNotify = (message) => {
  const msg = message.toString();
  Notify.create({
    msg,
    color: 'primary',
    textColor: 'white', // if default 'white' doesn't fits
    icon: 'memory',
  });
};
