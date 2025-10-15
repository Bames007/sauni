// app/admin_dashboard/dashboard/SearchParamWrapper.tsx
"use client";

import { useSearchParams } from "next/navigation";
import AdminDashboard from "./AdminDashboard"; // Your existing component
import { ADMIN_MENUS } from "./AdminSideBar";

export function SearchParamWrapper() {
  const searchParams = useSearchParams();
  const role =
    (searchParams.get("role") as keyof typeof ADMIN_MENUS) || "admin";

  return <AdminDashboard />;
}
