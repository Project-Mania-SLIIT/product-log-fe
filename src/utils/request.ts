import axios from "axios";

const Request = axios.create({
  baseURL: "http://13.233.114.241:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Request;
