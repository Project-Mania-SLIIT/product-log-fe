import axios from "axios";

const Request = axios.create({
  baseURL: "http://3.6.150.196:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default Request;
