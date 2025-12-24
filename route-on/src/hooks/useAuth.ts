import { useAuth0 } from '@auth0/auth0-react';

interface User {
  id?: string;
  name?: string;
  nickname?: string;
  email?: string;
  picture?: string;
}

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const { user: auth0User, isLoading, isAuthenticated } = useAuth0();

  const user: User | null = auth0User
    ? {
        id: auth0User.sub,
        name: auth0User.name,
        nickname: auth0User.nickname,
        email: auth0User.email,
        picture: auth0User.picture
      }
    : null;

  return {
    user,
    isLoading,
    isAuthenticated
  };
};

