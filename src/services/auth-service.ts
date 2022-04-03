import { AxiosResponse } from 'axios';
import API from './api';

const AuthService = {
  login: (payload: {
    email: string;
    password: string;
  }): Promise<AxiosResponse<string>> => {
    return API.post('auth', payload);
  },
  refreshToken: (): Promise<AxiosResponse<string>> => {
    return API.get('auth');
  },
  logout: (): Promise<AxiosResponse<void>> => {
    return API.delete('auth');
  },
};

export default AuthService;
