export const events = state => state.abi.filter(e => e.type === 'event');

export const functions = state => state.abi.filter(e => e.type === 'function');

export const constantFunctions = state => state.abi.filter(e => e.constant === true);
