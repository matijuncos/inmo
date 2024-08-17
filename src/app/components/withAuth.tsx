import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useInmoCtx } from '../context/InmoContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (
    props: React.ComponentProps<typeof WrappedComponent>
  ) => {
    const router = useRouter();
    const { user } = useInmoCtx();
    useEffect(() => {
      const token = user?.token;
      if (!token) {
        router.push('/login');
      }
    }, [router, user.token]);

    return <WrappedComponent {...props} />;
  };

  // Assign a display name to the returned component
  WithAuthComponent.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithAuthComponent;
};

export default withAuth;
