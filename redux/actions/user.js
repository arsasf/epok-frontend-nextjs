import axiosApiIntances from "../../utils/axios";

export const getUserById = (id) => {
  return {
    type: "GET_USER_ID",
    payload: axiosApiIntances.get(`/user/${id}`),
  };
};

export const updateProfile = (id, formData) => {
  return {
    type: "UPDATE_PROFILE",
    payload: axiosApiIntances.patch(`/user/profile/${id}`, formData),
  };
};
