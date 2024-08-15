import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";

import UserGroupTable from "./screen/UserGroupTable";

const user = () => {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <UserGroupTable />
    </Suspense>
  );
};
export default user;
