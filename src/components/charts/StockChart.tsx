
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { marketApi, ChartData } from "@/services/marketApi";
import { format } from "date-fns";

interface StockChartProps {
  symbol: string;
  name: string;
}

export function StockChart({ symbol, name }: StockChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState("1d");
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    setLoading(true);
    try {
      const data = await marketApi.getChartData(symbol, timeframe);
      setChartData(data);
    } catch (error) {
      console.error(`Error fetching chart data for ${symbol}:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, [symbol, timeframe]);

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), "MMM dd");
  };

  const formatTooltipValue = (value: number) => {
    return `₹${value.toFixed(2)}`;
  };

  const customTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-md border bg-background p-2 shadow-sm">
          <p className="font-medium">{formatDate(label)}</p>
          <p className="text-sm">Open: ₹{payload[0].payload.open.toFixed(2)}</p>
          <p className="text-sm">Close: ₹{payload[0].payload.close.toFixed(2)}</p>
          <p className="text-sm">High: ₹{payload[0].payload.high.toFixed(2)}</p>
          <p className="text-sm">Low: ₹{payload[0].payload.low.toFixed(2)}</p>
          <p className="text-sm">Volume: {(payload[0].payload.volume / 1000000).toFixed(2)}M</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold">{name} ({symbol})</CardTitle>
          <Tabs defaultValue="1d" className="w-full sm:w-auto" onValueChange={setTimeframe}>
            <TabsList className="grid w-full grid-cols-5 sm:w-auto">
              <TabsTrigger value="1d">1D</TabsTrigger>
              <TabsTrigger value="1w">1W</TabsTrigger>
              <TabsTrigger value="1m">1M</TabsTrigger>
              <TabsTrigger value="3m">3M</TabsTrigger>
              <TabsTrigger value="1y">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[300px] w-full animate-pulse rounded bg-muted"></div>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatDate} 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fontSize: 12 }} 
                  tickLine={false}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `₹${value.toFixed(0)}`}
                  domain={['auto', 'auto']}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <Tooltip content={customTooltip} />
                <Area 
                  type="monotone" 
                  dataKey="close" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
