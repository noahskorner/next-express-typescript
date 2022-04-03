import { AxiosResponse } from 'axios';
import UserDTO from '../utils/types/dtos/user';
import CreateUserRequest from '../utils/types/requests/user/create-user';
import API from './api';

const UserService = {
  create: (payload: CreateUserRequest): Promise<AxiosResponse<UserDTO>> => {
    return API.post('/user', payload);
  },
  get: (userId: number): Promise<AxiosResponse<UserDTO>> => {
    return API.get(`/user/${userId}`);
  },
};

export default UserService;
