// lib/adminPermissions.ts
export interface AdminPermissions {
  canViewAnalytics: boolean;
  canManageUsers: boolean;
  canManageApplications: boolean;
  canManageFinance: boolean;
  canManageSystem: boolean;
  canViewReports: boolean;
}

export const ROLE_PERMISSIONS: Record<string, AdminPermissions> = {
  vc: {
    canViewAnalytics: true,
    canManageUsers: true,
    canManageApplications: true,
    canManageFinance: true,
    canManageSystem: true,
    canViewReports: true,
  },
  founder: {
    canViewAnalytics: true,
    canManageUsers: true,
    canManageApplications: true,
    canManageFinance: true,
    canManageSystem: true,
    canViewReports: true,
  },
  admin: {
    canViewAnalytics: true,
    canManageUsers: true,
    canManageApplications: true,
    canManageFinance: false,
    canManageSystem: false,
    canViewReports: true,
  },
  accounts: {
    canViewAnalytics: false,
    canManageUsers: false,
    canManageApplications: false,
    canManageFinance: true,
    canManageSystem: false,
    canViewReports: true,
  },
};
