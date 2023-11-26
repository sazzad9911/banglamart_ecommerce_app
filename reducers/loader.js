const loader = (state = null, action) => {
  if (action.type === "SET_LOADER") {
    return action.value;
  }
  return state;
};
export default loader;
export const showLoader = (value) => {
  return {
    type: "SET_LOADER",
    value: true,
  };
};
export const hideLoader = (value) => {
  return {
    type: "SET_LOADER",
    value: false,
  };
};
