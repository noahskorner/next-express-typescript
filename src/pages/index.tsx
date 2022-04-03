import type { NextPage } from 'next';
import AuthRoute from '../components/routes/auth-route';

const IndexPage: NextPage = () => {
  return <AuthRoute element={<div>Hello World</div>} />;
};

export default IndexPage;
