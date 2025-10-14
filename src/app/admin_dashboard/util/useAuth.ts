// hooks/useAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/app/admin_dashboard/util/auth";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const adminUser = checkAuth();
    if (!adminUser) {
      router.push("/admin_dashboard/login");
    }
  }, [router]);

  return checkAuth();
};
