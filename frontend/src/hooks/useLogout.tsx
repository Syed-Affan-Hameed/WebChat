import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/auth/logout", {
        method: "POST"
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);
      setAuthUser(null); // Clear the auth user on logout
      toast.success("Logged out successfully!");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;