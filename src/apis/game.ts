import { baseAddress } from "@/baseAddress";
import {
  TAddGamePayload,
  TBasicGame,
  TGame,
  TGetGameParams,
} from "@/models/game";
import { TServerError } from "@/models/ServerErrorRespond";
import { removeFalsyProps } from "@/utils/helperFncs";
import axios, { AxiosError } from "axios";

export const getGameListApi = async (filter?: TGetGameParams) => {
  try {
    const res = await axios.get<TBasicGame[]>(`${baseAddress}/api/Game`, {
      params: filter && removeFalsyProps(filter),
    });

    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<TServerError>;

    if (axiosError.response?.data) {
      throw axiosError.response.data; // ✅ Convert to `ServerError`
    }

    throw error;
  }
};

export const addGameApi = async (payload: TAddGamePayload) => {
  try {
    const res = await axios.post<TGame>(`${baseAddress}/api/Game`, payload);
    return res.data;
  } catch (error) {
    const axiosError = error as AxiosError<TServerError>;

    if (axiosError.response?.data) {
      throw axiosError.response.data; // ✅ Convert to `ServerError`
    }

    throw error;
  }
};
