import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReportsCard from "./reports";
import WelcomeBlock from "./welcome-block";
import StackRadiusChart from "../Charts/StackRadiusChart";
import StackAreaChart from "../Charts/StackAreaChart";
import PieAmChart from "../Charts/PieAmChart";
import CollapsibleTree from "../Charts/CollapsibleTree";
import Report1 from "./Report1";
const DashboardPageView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4  md:mt-0">
          <WelcomeBlock />
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4">
            <Report1 />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="grid col-span-12 lg:col-span-4 sm:grid-cols-2 gap-4">
          <ReportsCard />
        </div>
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader className="border-none p-6 pt-5 mb-0">
              <CardTitle className="text-lg font-semibold text-default-900 p-0">
                تعداد سفر تفکیک استان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StackRadiusChart chartID="stack" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="col-span-2">
        <Card>
          <CardHeader className="border-none pb-0">
          <CardTitle className="text-lg font-semibold text-default-900 p-0">
            صورت وضعیت به تفکیک سال 
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5 pb-0">
            <StackAreaChart chartID="area" />
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader className="border-none p-6 pt-5 mb-0">
              <CardTitle className="text-lg font-semibold text-default-900 p-0">
                تعداد ناوگان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PieAmChart chartID="piechart" />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-12 lg:col-span-6">
          <Card>
            <CardHeader className="border-none p-6 pt-5 mb-0">
              <CardTitle className="text-lg font-semibold text-default-900 p-0">
                دسته بندی ترمینال ها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CollapsibleTree chartID="stack2" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageView;
