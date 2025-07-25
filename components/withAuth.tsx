"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  allowedRoles?: string[];
};

export default function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  allowedRoles: string[] = []
) {
  const AuthComponent = (props: T) => {
    const router = useRouter();

    useEffect(() => {
      const role = localStorage.getItem("role")?.toLowerCase().trim();

      console.log("👮‍♀️ User role from storage:", role);

      if (!role) {
        toast.error("Please login first 💅");
        router.push("/login");
        return;
      }

      if (allowedRoles.length && !allowedRoles.includes(role)) {
        toast.error("You don't have permission to view this 😬");
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}
