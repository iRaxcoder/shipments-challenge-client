const BASE_URL =
  "https://shipments-challenge-server.vercel.app/shipments-administration-api/packages/";
import axios from "axios";

const packageService = {
  insert: async function (data) {
    try {
      const response = await axios.post(BASE_URL + "create", { data });
      return response.data;
    } catch (error) {
      console.log(error);
      return -1;
    }
  },
  delete: async function (data) {
    try {
      const response = await axios.post(BASE_URL + "delete", { data });
      return response.data;
    } catch (error) {
      console.log(error);
      return -1;
    }
  },
};

export default packageService;
