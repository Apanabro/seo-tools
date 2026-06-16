import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get('access_token');
      if (accessToken) {
        fetchGoogleUser(accessToken);
        window.location.hash = '#/';
        setLoading(false);
        return;
      }
    }

    const saved = localStorage.getItem('seo_tools_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch(e) { localStorage.removeItem('seo_tools_user'); }
    }
    setLoading(false);
  }, []);

  const fetchGoogleUser = async (accessToken) => {
    try {
      const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.ok) {
        const data = await res.json();
        const userData = { id: data.id, name: data.name, email: data.email, picture: data.picture };
        setPendingUser(userData);
      }
    } catch (e) {
      console.error('Failed to fetch Google user info:', e);
    }
  };

  const completeLogin = (userData) => {
    setUser(userData);
    setPendingUser(null);
    localStorage.setItem('seo_tools_user', JSON.stringify(userData));
  };

  const login = (userData) => {
    setUser(userData);
    setPendingUser(null);
    localStorage.setItem('seo_tools_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    localStorage.removeItem('seo_tools_user');
  };

  return (
    <AuthContext.Provider value={{ user, pendingUser, completeLogin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
