export const events = state => state.abi.filter(e => e.type === 'event');

export const functions = state => state.abi.filter(e => e.type === 'function');

export const constantMethods = state => state.abi.filter(e => e.type === 'function' && e.inputs.length === 0);

export const nonPayableMethods = state => state.abi.filter(e => e.type === 'function' && e.inputs.length > 0);

export const eventStream = state => state.receipts || [];
