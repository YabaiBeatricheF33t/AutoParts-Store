"use client";
import { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'guest' | 'customer' | 'admin';

const AuthContext = createContext<{ role: Role; setRole: (r: Role) => void }>({ 
  role: 'guest', 
  setRole: () => {} 
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('guest');

  useEffect(() => {
    const saved = localStorage.getItem('autoparts_role') as Role;
    if (saved) {
      setRoleState(saved);
    }
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    localStorage.setItem('autoparts_role', r);
  };

  return (
    <AuthContext.Provider value={{ role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

