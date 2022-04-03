import axios, { AxiosError } from 'axios';
import { ERROR_UNKOWN } from '../utils/constants/errors';
import ErrorInterface from '../utils/types/interfaces/error';

export const BASE_URL = '/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const apiErrorHandler = (error: any): ErrorInterface[] => {
  if (axios.isAxiosError(error) && error.response && error.response.data) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      try {
        const errors = axiosError.response.data as ErrorInterface[];
        return errors;
      } catch {
        return [ERROR_UNKOWN];
      }
    } else {
      return [ERROR_UNKOWN];
    }
  } else {
    return [ERROR_UNKOWN];
  }
};

export default API;
