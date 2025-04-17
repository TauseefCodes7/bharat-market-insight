
import React, { useState, useEffect } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { marketApi, StockData } from "@/services/marketApi";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function SearchStocks() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchStocks = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await marketApi.searchStocks(query);
        setResults(searchResults);
      } catch (error) {
        console.error("Error searching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      searchStocks();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (stock: StockData) => {
    navigate(`/stock/${stock.symbol}`);
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput 
        placeholder="Search for stocks by name or symbol..." 
        value={query}
        onValueChange={setQuery}
        className="h-10"
      />
      <CommandList>
        {loading && <CommandEmpty>Searching...</CommandEmpty>}
        {!loading && query.length > 0 && results.length === 0 && (
          <CommandEmpty>No stocks found</CommandEmpty>
        )}
        {results.length > 0 && (
          <CommandGroup heading="Stocks">
            {results.map((stock) => (
              <CommandItem
                key={stock.symbol}
                value={stock.symbol}
                onSelect={() => handleSelect(stock)}
                className="cursor-pointer"
              >
                <div className="flex items-center justify-between w-full">
                  <div>
                    <div className="font-semibold">{stock.symbol}</div>
                    <div className="text-sm text-muted-foreground truncate">{stock.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div>₹{stock.lastPrice.toFixed(2)}</div>
                      <div className={stock.change >= 0 ? "text-market-up" : "text-market-down"}>
                        {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground" />
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}

export default SearchStocks;
