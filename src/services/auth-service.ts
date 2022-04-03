import API from './api';

const AuthService = {
  login: (payload: { email: string; password: string }) => {
    return API.post('auth/login', payload);
  },
  refreshToken: (payload: { token: string }) => {
    return API.post('auth/refresh-token', payload);
  },
  logout: () => {
    return API.delete('auth/logout');
  },
};

export default AuthService;
