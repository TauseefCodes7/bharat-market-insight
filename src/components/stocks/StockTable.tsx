
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { marketApi, StockData } from "@/services/marketApi";

export function StockTable() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const data = await marketApi.getStocks();
      setStocks(data);
      setFilteredStocks(data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredStocks(stocks);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = stocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query) ||
          stock.name.toLowerCase().includes(query)
      );
      setFilteredStocks(filtered);
    }
  }, [searchQuery, stocks]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg font-semibold">Top Stocks</CardTitle>
          <div className="relative max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search stocks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Symbol</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Change</TableHead>
                <TableHead className="hidden text-right md:table-cell">Open</TableHead>
                <TableHead className="hidden text-right md:table-cell">High / Low</TableHead>
                <TableHead className="hidden text-right md:table-cell">Volume</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(6)
                  .fill(null)
                  .map((_, index) => (
                    <TableRow key={index}>
                      {Array(7)
                        .fill(null)
                        .map((_, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <div className="h-4 w-full animate-pulse rounded bg-muted"></div>
                          </TableCell>
                        ))}
                    </TableRow>
                  ))
              ) : filteredStocks.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No stocks found
                  </TableCell>
                </TableRow>
              ) : (
                filteredStocks.map((stock) => (
                  <TableRow key={stock.symbol} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{stock.symbol}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{stock.name}</TableCell>
                    <TableCell className="text-right font-medium">
                      ₹{stock.lastPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className={cn(
                      "text-right",
                      stock.change > 0 ? "text-market-up" : stock.change < 0 ? "text-market-down" : "text-market-neutral"
                    )}>
                      <span className="flex items-center justify-end gap-1">
                        {stock.change > 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                        <span>{Math.abs(stock.change).toFixed(2)}</span>
                        <span>({Math.abs(stock.changePercent).toFixed(2)}%)</span>
                      </span>
                    </TableCell>
                    <TableCell className="hidden text-right md:table-cell">
                      ₹{stock.open.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="hidden text-right md:table-cell">
                      ₹{stock.high.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / 
                      ₹{stock.low.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell className="hidden text-right md:table-cell">
                      {(stock.volume / 1000).toFixed(1)}K
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
