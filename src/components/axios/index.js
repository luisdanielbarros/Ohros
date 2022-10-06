import axios from "axios";
const Axios = axios.create({
  baseURL: "http://localhost/dashboard/Ohros/",
  timeout: 5000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*",
  },
});
export default Axios;
