import axios from 'axios';
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import RequestUser from '../types/dtos/request-user';
import ErrorInterface from '../types/interfaces/error';

interface AuthContextInterface {
  accessToken: string | null;
  setAccessToken: Dispatch<SetStateAction<string | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  user: RequestUser | null;
  setUser: Dispatch<SetStateAction<RequestUser | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  errors: ErrorInterface[];
  setErrors: Dispatch<SetStateAction<ErrorInterface[]>>;
}

const defaultValues = {
  accessToken: null,
  setAccessToken: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  setLoading: () => {},
  errors: [],
  setErrors: () => {},
};

export const AuthContext = createContext<AuthContextInterface>(defaultValues);

interface AuthProviderInterface {
  children: JSX.Element;
}

export const AuthProvider = ({ children }: AuthProviderInterface) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    defaultValues.accessToken,
  );
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValues.isAuthenticated,
  );
  const [user, setUser] = useState<RequestUser | null>(defaultValues.user);
  const [loading, setLoading] = useState<boolean>(defaultValues.loading);
  const [errors, setErrors] = useState<ErrorInterface[]>(defaultValues.errors);

  useEffect(() => {
    if (accessToken == null) {
      delete axios.defaults.headers.common['Authorization'];
    } else {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        loading,
        setLoading,
        errors,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
