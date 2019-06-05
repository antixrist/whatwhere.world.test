export const state = () => ({
  list: [],
});

export const getters = {
  isExistsCity: state => city => state.list.some(({ name }) => city.name === name),
};

export const mutations = {
  reset(state, cities = []) {
    state.list = cities;
  },
  add(state, city) {
    state.list.push(city);
  },
  remove(state, city) {
    const idx = state.list.indexOf(city);
    if (idx >= 0) state.list.splice(idx, 1);
  },
};

export const actions = {};
