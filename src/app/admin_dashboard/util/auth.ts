// utils/auth.ts
export const checkAuth = () => {
  if (typeof window === "undefined") return false;

  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  const adminUser = sessionStorage.getItem("adminUser");

  return isAuthenticated === "true" && adminUser ? JSON.parse(adminUser) : null;
};

export const logout = () => {
  sessionStorage.removeItem("isAuthenticated");
  sessionStorage.removeItem("adminUser");
  window.location.href = "/admin_dashboard/login";
};
