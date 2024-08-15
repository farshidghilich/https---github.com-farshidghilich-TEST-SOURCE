import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";

import UserTable from "./screen/UserTable";

const user = () => {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <UserTable />
    </Suspense>
  );
};
export default user;
