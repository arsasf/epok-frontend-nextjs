const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "GET_USER_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data[0],
        msg: action.payload.data.msg,
      };
    case "GET_USER_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };

    case "UPDATE_PROFILE_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        msg: "",
      };
    case "UPDATE_PROFILE_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    case "UPDATE_PROFILE_REJECTED":
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
      };

    default:
      return state;
  }
};

export default user;
