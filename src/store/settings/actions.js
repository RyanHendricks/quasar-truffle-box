export const setPrimaryColor = ({ commit }, payload) => {
  commit('SET_PRIMARY_COLOR', payload.toString());
};
export const setSecondaryColor = ({ commit }, payload) => {
  commit('SET_SECONDARY_COLOR', payload.toString());
};
// export const setTertiaryColor = ({ commit }, payload) => {
//   commit('SET_TERTIARY_COLOR', payload.toString());
// };
