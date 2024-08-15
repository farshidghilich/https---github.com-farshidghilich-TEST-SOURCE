import React, { Suspense } from "react";
import InqueryTable from "./screen/InqueryTable";
const user = () => {
  return (
    <Suspense fallback={<div>در حال دریافت اطلاعات...</div>}>
      <InqueryTable />
    </Suspense>
  );
};
export default user;
