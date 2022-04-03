import type { NextPage } from 'next';
import { useContext } from 'react';
import AuthRoute from '../components/routes/auth-route';
import { AuthContext } from '../utils/contexts/auth-context';

const IndexPage: NextPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <AuthRoute
      element={
        <div>
          {JSON.stringify(user)}
          {JSON.stringify(isAuthenticated)}
        </div>
      }
    />
  );
};

export default IndexPage;
