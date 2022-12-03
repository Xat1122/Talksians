const initialState = {};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER":
      state = action.payload
      return state;
    case "GET_USER":
      return state;
    case "DELETE_USER":
        state={}
        return state;
    default:
      return state;
  }
};
export default UserReducer;