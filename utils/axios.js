import axios from "axios";
const axiosApiIntances = axios.create({
  baseURL: "http://Localhost:3004/backend4/api/v1/",
});
// console.log(process.env.REACT_APP_BASE_URL);

export default axiosApiIntances;
