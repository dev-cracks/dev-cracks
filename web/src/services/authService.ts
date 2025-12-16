import { User as Auth0User } from '@auth0/auth0-react';

export interface User {
  id: string;
  email: string;
  name: string | null;
  picture?: string;
  sub: string; // Auth0 user ID
}

// Helper to convert Auth0 user to our User interface
export const mapAuth0User = (auth0User: Auth0User | undefined): User | null => {
  if (!auth0User) return null;
  
  return {
    id: auth0User.sub,
    sub: auth0User.sub,
    email: auth0User.email || '',
    name: auth0User.name || auth0User.nickname || null,
    picture: auth0User.picture
  };
};

