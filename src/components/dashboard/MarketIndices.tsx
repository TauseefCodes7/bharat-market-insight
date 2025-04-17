
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { marketApi, IndexData } from "@/services/marketApi";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function MarketIndices() {
  const [indices, setIndices] = useState<IndexData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIndices = async () => {
    setLoading(true);
    try {
      const data = await marketApi.getIndices();
      setIndices(data);
    } catch (error) {
      console.error("Error fetching indices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndices();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchIndices, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Market Indices</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-md bg-muted"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {indices.map((index) => (
              <Card key={index.name} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium truncate">{index.name}</span>
                    <span className="text-xs text-muted-foreground">{index.lastUpdated}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">{index.lastValue.toLocaleString('en-IN')}</span>
                    <div className={cn(
                      "flex items-center text-sm",
                      index.change > 0 ? "text-market-up" : index.change < 0 ? "text-market-down" : "text-market-neutral"
                    )}>
                      {index.change > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      <span>{Math.abs(index.change).toFixed(2)}</span>
                      <span className="ml-1">({Math.abs(index.changePercent).toFixed(2)}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
