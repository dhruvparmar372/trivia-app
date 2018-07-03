import axios from "axios";
// import qs from "qs";
import Config from "react-native-config";

const api = axios.create({
  baseURL: Config.API_HOST
  // transformRequest: [
  //   data => {
  //     return typeof data === "object" ? qs.stringify(data) : data;
  //   }
  // ]
});

export default api;
