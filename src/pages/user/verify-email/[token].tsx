import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserService from '../../../services/user-service';

const VerifyEmailPage: NextPage = () => {
  const router = useRouter();
  const { token } = router.query as { token?: string };

  const verifyEmail = async () => {
    if (token == null) return;

    try {
      await UserService.verifyEmail(token);
      return router.push('/login');
    } catch {
      return router.push('/login');
    }
  };

  useEffect(() => {
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return <></>;
};

export default VerifyEmailPage;
