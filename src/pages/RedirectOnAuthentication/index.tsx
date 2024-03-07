import { useEffect } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

const RedirectOnAuthentication = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = searchParams.get('access-token');
    const isJoined = searchParams.get('is-joined');

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }

    navigate(isJoined === 'true' ? '/' : '/register');
  }, [navigate, searchParams]);

  return null;
};

export default RedirectOnAuthentication;