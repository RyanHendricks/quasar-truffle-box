
import Web3 from 'web3';
// import ZeroClientProvider from 'web3-provider-engine/dist/ZeroClientProvider.js';
import { Notify } from 'quasar';

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
    Notify.create({ type: 'positive', message: `Error: ${e}` });
  }
};

export const startChecking = async ({ state, dispatch }) => {
  await setInterval(() => {
    dispatch('check');
  }, state.updateInterval);
};

export const check = ({ dispatch }) => {
  dispatch('checkNetwork');
  dispatch('getBlockNumber');
  dispatch('getGasPrice');
  dispatch('checkConnection');
  dispatch('checkAccount');
};

export const checkNetwork = async ({ state, commit, dispatch }) => {
  try {
    const network = await global.web3.eth.net.getId();
    if (network !== state.netId) {
      commit('UPDATE_NETWORK', network);
      commit('SET_CONNECTED', true);
    }
  } catch (e) {
    dispatch('createEngineNotify', 'checknetwork error');
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
    dispatch('createEngineNotify', 'account error');
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
    Notify.create({ type: 'negative', message: e });
  }
};

export const getBlockNumber = async ({ state, commit, dispatch }) => {
  try {
    const block = await global.web3.eth.getBlockNumber();
    if (state.blockNumber !== block) {
      commit('UPDATE_BLOCK', block);
    }
  } catch (e) {
    dispatch('createEngineNotify', e);
  }
};

export const getGasPrice = async ({ state, commit, dispatch }) => {
  try {
    const rawPrice = await global.web3.eth.getGasPrice();
    const gasPrice = global.web3.utils.fromWei(rawPrice, 'ether').toString(10) * 1000000000;
    if (gasPrice && state.gasPrice !== gasPrice) {
      commit('UPDATE_GASPRICE', gasPrice);
    }
  } catch (e) {
    dispatch('createEngineNotify', e);
  }
};

export const checkConnection = async ({ state, commit, dispatch }) => {
  try {
    const connected = await global.web3.eth.net.isListening();
    if (connected === true && state.connected !== true) {
      commit('SET_CONNECTED', true);
    }
  } catch (e) {
    dispatch('createEngineNotify', e);
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
