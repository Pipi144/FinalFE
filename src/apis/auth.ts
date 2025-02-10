import { baseAddress } from "@/baseAddress";
import { TAuthPayload } from "@/models/AuthModels";
import { TUser } from "@/models/user";
import axios from "axios";
export const loginApi = async (payload: TAuthPayload) => {
  try {
    console.log(process.env.APIURL);
    const res = await axios.post<TUser>(
      `${baseAddress}/api/User/login`,
      payload
    );
    return res;
  } catch (error) {
    console.log("Error loginApi:", error);
    throw error;
  }
};

export const registerApi = async (payload: TAuthPayload) => {
  try {
    const res = await axios.post<TUser>(`${baseAddress}/api/User`, payload);
    return res;
  } catch (error) {
    throw error;
  }
};
