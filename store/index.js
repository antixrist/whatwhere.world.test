export const actions = {
  nuxtServerInit({ commit }) {
    const initialData = require('./data.json');
    return commit('cities/reset', initialData);
  },
};
