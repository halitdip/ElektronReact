import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useSession = () => {
  const { session } = useContext(AuthContext);
  return session;
};
