import { createContext, useContext, Context } from "react";
import useFirebaseAuth from "../lib/useFirebaseAuth";

const AuthUserContext = createContext({
  authUser: null,
  sendEmailLink: async (email) => {},
  logout: async () => {},
});

function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();

  return (
    <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthUserContext);
}

export { useAuth };
export default AuthUserProvider;
