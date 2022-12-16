const { AsyncLocalStorage } = require('async_hooks');

const store = new AsyncLocalStorage();

function useStore() {
  return store.getStore();
}

module.exports = {
  store,
  useStore,
}