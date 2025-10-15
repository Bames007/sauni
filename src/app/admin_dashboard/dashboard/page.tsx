import React, { Suspense } from "react";
import { SearchParamWrapper } from "./SearchParamsWrapper";

const AdminDashboardHomePage = () => {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <SearchParamWrapper />
    </Suspense>
  );
};

export default AdminDashboardHomePage;
