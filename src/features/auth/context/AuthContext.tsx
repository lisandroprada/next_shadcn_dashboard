'use client';
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode
} from 'react';
import { login as loginApi, getProfile } from '../services/auth';

type User = {
  fullName: string;
  emailAddresses: { emailAddress: string }[];
  imageUrl?: string;
  roles?: string[];
  [key: string]: any;
};

type AuthContextType = {
  user: User | null;
  roles: string[];
  loading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  roles: [],
  loading: true,
  login: async () => {},
  logout: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      getProfile()
        .then((data) => {
          // Normalizar usuario según backend (_id, username, email, roles...)
          setUser({
            fullName:
              data.user?.name ||
              data.user?.username ||
              data.user?.fullName ||
              '',
            emailAddresses: [{ emailAddress: data.user?.email || '' }],
            imageUrl: data.user?.imageUrl,
            roles: data.user?.roles || [],
            ...data.user
          });
          setRoles(data.user?.roles || []);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const login = useCallback(
    async (email: string, password: string, rememberMe: boolean) => {
      const data = await loginApi(email, password, rememberMe);
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', data.access_token);
      }
      setUser({
        fullName: data.user?.name || data.user?.fullName || '',
        emailAddresses: [{ emailAddress: data.user?.email || '' }],
        imageUrl: data.user?.imageUrl,
        roles: data.user?.roles || [],
        ...data.user
      });
      setRoles(data.user?.roles || []);
    },
    []
  );

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    setUser(null);
    setRoles([]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, roles, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
