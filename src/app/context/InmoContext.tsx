'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import path from 'path';

type InmoContextProps = {
  user: any;
  setUser: Function;
  isWhatsappModalOpen: boolean;
  setIsWhatsappModalOpen: Function;
};

type InmoProviderProps = {
  children: any;
};

export const InmoContext = createContext<InmoContextProps | null>(null);

export const InmoProvider: ({ children }: InmoProviderProps) => JSX.Element = ({
  children
}: InmoProviderProps) => {
  const [user, setUser] = useState(null);
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/getPersistedUser');
        if (data?.user) {
          setUser(data.user);
          if (pathname === '/login') {
            router.push('/');
          }
        } else {
          if (pathname === '/match') {
            // Midleware  send to login but just to make sure I'm adding this.
            router.push('/');
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <InmoContext.Provider
      value={{ user, setUser, isWhatsappModalOpen, setIsWhatsappModalOpen }}
    >
      {children}
    </InmoContext.Provider>
  );
};

export function useInmoCtx(): InmoContextProps {
  const context = InmoContext;
  if (!context) {
    console.error('Error with Degano context');
  }
  return useContext(context) as InmoContextProps;
}
