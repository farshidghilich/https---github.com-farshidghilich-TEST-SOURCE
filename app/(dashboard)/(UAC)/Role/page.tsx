import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";

import RoleTable from "./screen/RoleTable";

const user = () => {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <RoleTable />
    </Suspense>
  );
};
export default user;
