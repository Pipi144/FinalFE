import { TAuthPayload } from "@/models/AuthModels";
import axios from "axios";
export const loginApi = async (payload: TAuthPayload) => {
  try {
    const res = await axios.post(
      `${process.env.APIURL}/api/User/login`,
      payload
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const registerApi = async (payload: TAuthPayload) => {
  try {
    const res = await axios.post(`${process.env.APIURL}/api/User`, payload);
    return res;
  } catch (error) {
    throw error;
  }
};
