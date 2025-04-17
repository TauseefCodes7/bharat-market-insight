
import React from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { StockChart } from "@/components/charts/StockChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { marketApi } from "@/services/marketApi";

const StockDetails = () => {
  const { symbol } = useParams<{ symbol: string }>();
  
  const { data: stockData, isLoading } = useQuery({
    queryKey: ["stock", symbol],
    queryFn: async () => {
      const stocks = await marketApi.getStocks();
      return stocks.find(stock => stock.symbol === symbol);
    },
    enabled: !!symbol
  });

  if (!symbol) {
    return <div>Stock symbol not provided</div>;
  }

  return (
    <DashboardLayout>
      <div className="grid gap-6">
        {isLoading ? (
          <div className="h-[400px] animate-pulse rounded-lg bg-muted"></div>
        ) : stockData ? (
          <>
            <div>
              <h1 className="text-2xl font-bold">{stockData.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-semibold">₹{stockData.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span className={`flex items-center gap-1 text-sm ${stockData.change >= 0 ? "text-market-up" : "text-market-down"}`}>
                  {stockData.change >= 0 ? "+" : ""}{stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>

            <StockChart symbol={symbol} name={stockData.name} />

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
                <TabsTrigger value="fundamental">Fundamental</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="py-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Key Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Open</p>
                          <p className="font-medium">₹{stockData.open.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Today's High</p>
                          <p className="font-medium">₹{stockData.high.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Today's Low</p>
                          <p className="font-medium">₹{stockData.low.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-medium">{stockData.volume.toLocaleString('en-IN')}</p>
                        </div>
                        {stockData.marketCap && (
                          <div>
                            <p className="text-sm text-muted-foreground">Market Cap</p>
                            <p className="font-medium">₹{(stockData.marketCap / 10000000).toFixed(2)} Cr</p>
                          </div>
                        )}
                        {stockData.sector && (
                          <div>
                            <p className="text-sm text-muted-foreground">Sector</p>
                            <p className="font-medium">{stockData.sector}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">About {stockData.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {stockData.name} ({stockData.symbol}) is a leading company in the {stockData.sector || "Indian"} sector.
                        This section would include a brief description of the company, its operations, and recent developments.
                        In a real implementation, this would be fetched from an API along with other company information.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="technical" className="py-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Technical Indicators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This section would display technical indicators like RSI, MACD, Bollinger Bands, etc.
                      In a real implementation, these would be calculated from historical price data.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fundamental" className="py-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Fundamental Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      This section would display fundamental data like P/E ratio, EPS, dividend yield, etc.
                      In a real implementation, these would be fetched from financial data APIs.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold">Stock not found</h3>
            <p className="text-muted-foreground">Could not find stock with symbol {symbol}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StockDetails;
