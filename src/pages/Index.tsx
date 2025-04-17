
import React from "react";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { MarketIndices } from "@/components/dashboard/MarketIndices";
import { StockTable } from "@/components/stocks/StockTable";
import { MarketNews } from "@/components/news/MarketNews";
import { StockChart } from "@/components/charts/StockChart";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid gap-6">
        <MarketIndices />
        
        <div className="grid gap-6 md:grid-cols-7">
          <div className="md:col-span-4">
            <StockChart symbol="NIFTY" name="NIFTY 50 Index" />
          </div>
          <div className="md:col-span-3">
            <MarketNews />
          </div>
        </div>
        
        <StockTable />
      </div>
    </DashboardLayout>
  );
};

export default Index;
