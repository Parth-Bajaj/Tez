export const AuthContext = createContext(null);

export function AuthProvider({ children }) {

  useEffect(() => {
    }

    }
  };

  const signup = async (payload) => {
  };

  const logout = () => {
    setUser(null);
  };

    token,
    signup,
    logout,

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
