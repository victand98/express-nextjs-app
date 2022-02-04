import React, { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthService } from "../lib/services/AuthService";
import { toast } from "react-toastify";
import { useAuthContext } from "../context/AuthContext";

const Logout = () => {
  const router = useRouter();
  const { mutatePermissions } = useAuthContext();

  const logout = useCallback(async () => {
    try {
      await AuthService.logout();
      mutatePermissions();
      router.push("/ingresar ");
    } catch (error) {
      for (const err of error.errors) {
        toast.error(err.message);
      }
    }
  }, [router]);

  useEffect(() => {
    logout();
  }, [logout]);

  return <div>Saliendo...</div>;
};

export default Logout;
