import axiosApiIntances from "../../utils/axios";

export const verify = (id) => {
  return {
    type: "VERIFY",
    payload: axiosApiIntances.get(`auth/verify/${id}`),
  };
};
