import React, { Suspense } from "react";
import { Home, Layers, Box } from "lucide-react";

import AssessiTable fro./screen/AssessiTableiTable";

const user = () => {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <AssessiTable />
    </Suspense>
  );
};
export default user;
