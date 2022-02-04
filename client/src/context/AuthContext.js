import { createContext, useContext, useMemo } from "react";
import { usePermissions } from "../lib/api/auth";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
  const { currentUser, children } = props;
  const { data: permissions, mutate: mutatePermissions } = usePermissions();

  const value = useMemo(
    () => ({ currentUser, permissions, mutatePermissions }),
    [currentUser, permissions, mutatePermissions]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuthContext() {
  return useContext(AuthContext);
}
