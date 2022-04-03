import { useRouter } from 'next/router';
import { ReactFragment, useContext, useEffect } from 'react';
import { AuthContext } from '../../../utils/contexts/auth-context';

interface AuthRouteProps {
  element: JSX.Element;
}

const AuthRoute = ({ element }: AuthRouteProps) => {
  const { loading, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  //   useEffect(() => {
  //     refreshAccessToken();
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []);

  if (loading) {
    return <></>;
  } else {
    if (isAuthenticated) return element;
    else {
      router.push('/login');
      return <></>;
    }
  }
};

export default AuthRoute;
