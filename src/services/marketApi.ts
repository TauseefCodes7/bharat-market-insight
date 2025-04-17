
// Mock service for now, to be replaced with real API integrations
import { toast } from "@/components/ui/sonner";

export interface StockData {
  symbol: string;
  name: string;
  lastPrice: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  marketCap?: number;
  sector?: string;
}

export interface IndexData {
  name: string;
  lastValue: number;
  change: number;
  changePercent: number;
  lastUpdated: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  summary: string;
  url: string;
}

export interface ChartData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Mock data (will be replaced with real API calls)
const mockIndices: IndexData[] = [
  {
    name: "NIFTY 50",
    lastValue: 22405.75,
    change: 82.45,
    changePercent: 0.37,
    lastUpdated: new Date().toLocaleTimeString(),
  },
  {
    name: "SENSEX",
    lastValue: 73852.34,
    change: 335.15,
    changePercent: 0.46,
    lastUpdated: new Date().toLocaleTimeString(),
  },
  {
    name: "NIFTY BANK",
    lastValue: 48210.65,
    change: -102.80,
    changePercent: -0.21,
    lastUpdated: new Date().toLocaleTimeString(),
  },
  {
    name: "NIFTY IT",
    lastValue: 34620.25,
    change: 380.10,
    changePercent: 1.11,
    lastUpdated: new Date().toLocaleTimeString(),
  }
];

const mockStocks: StockData[] = [
  {
    symbol: "RELIANCE",
    name: "Reliance Industries",
    lastPrice: 2932.45,
    change: 23.75,
    changePercent: 0.82,
    open: 2910.50,
    high: 2945.30,
    low: 2905.10,
    volume: 4523678,
    marketCap: 1982345000000,
    sector: "Energy"
  },
  {
    symbol: "TCS",
    name: "Tata Consultancy Services",
    lastPrice: 3788.20,
    change: 42.30,
    changePercent: 1.13,
    open: 3750.15,
    high: 3795.50,
    low: 3745.25,
    volume: 1234567,
    marketCap: 1391233000000,
    sector: "IT"
  },
  {
    symbol: "HDFCBANK",
    name: "HDFC Bank",
    lastPrice: 1623.75,
    change: -12.50,
    changePercent: -0.76,
    open: 1638.80,
    high: 1642.25,
    low: 1620.40,
    volume: 3564781,
    marketCap: 1235678000000,
    sector: "Banking"
  },
  {
    symbol: "INFY",
    name: "Infosys",
    lastPrice: 1498.60,
    change: 24.35,
    changePercent: 1.65,
    open: 1478.50,
    high: 1505.30,
    low: 1475.20,
    volume: 2345678,
    marketCap: 628945000000,
    sector: "IT"
  },
  {
    symbol: "BHARTIARTL",
    name: "Bharti Airtel",
    lastPrice: 1245.30,
    change: -4.75,
    changePercent: -0.38,
    open: 1250.10,
    high: 1252.40,
    low: 1238.75,
    volume: 1876543,
    marketCap: 697834000000,
    sector: "Telecom"
  },
  {
    symbol: "ITC",
    name: "ITC Limited",
    lastPrice: 434.65,
    change: 3.20,
    changePercent: 0.74,
    open: 432.10,
    high: 436.50,
    low: 431.25,
    volume: 5432167,
    marketCap: 543219000000,
    sector: "FMCG"
  }
];

const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "RBI Holds Interest Rates Steady Amid Inflation Concerns",
    source: "Economic Times",
    timestamp: "2 hours ago",
    summary: "The Reserve Bank of India maintained its repo rate at 6.50% for the seventh consecutive meeting, citing persistent inflation pressures and global economic uncertainties.",
    url: "#"
  },
  {
    id: "2",
    title: "TCS Reports Strong Q4 Results, Exceeds Analyst Expectations",
    source: "LiveMint",
    timestamp: "5 hours ago",
    summary: "Tata Consultancy Services reported a 12.3% YoY increase in net profit for Q4, beating analyst estimates. The company also announced a special dividend for shareholders.",
    url: "#"
  },
  {
    id: "3",
    title: "Government Announces New PLI Scheme for Electronics Manufacturing",
    source: "Business Standard",
    timestamp: "8 hours ago",
    summary: "The Indian government has unveiled a new ₹50,000 crore Production Linked Incentive scheme aimed at boosting domestic electronics manufacturing and reducing import dependence.",
    url: "#"
  },
  {
    id: "4",
    title: "Adani Group Plans $1.5 Billion Investment in Renewable Energy",
    source: "CNBC-TV18",
    timestamp: "1 day ago",
    summary: "Adani Green Energy has announced plans to invest $1.5 billion in expanding its solar and wind power capacity over the next three years to meet growing energy demands.",
    url: "#"
  }
];

const mockChartData: ChartData[] = Array.from({ length: 100 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - 100 + i);
  
  // Base price and random variations
  const basePrice = 1000;
  const randomFactor = Math.sin(i / 10) * 100 + (Math.random() - 0.5) * 50;
  
  const open = basePrice + randomFactor;
  const close = open + (Math.random() - 0.5) * 20;
  const high = Math.max(open, close) + Math.random() * 10;
  const low = Math.min(open, close) - Math.random() * 10;
  
  return {
    timestamp: date.getTime(),
    open,
    high,
    low,
    close,
    volume: Math.floor(Math.random() * 10000000) + 1000000
  };
});

// Mock API service for now
export const marketApi = {
  getIndices: async (): Promise<IndexData[]> => {
    // In the future this will be replaced with a real API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockIndices.map(index => ({
        ...index,
        lastUpdated: new Date().toLocaleTimeString()
      }));
    } catch (error) {
      toast.error("Failed to fetch market indices");
      console.error("Error fetching indices:", error);
      return [];
    }
  },
  
  getStocks: async (): Promise<StockData[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Add small random changes to prices to simulate market movements
      return mockStocks.map(stock => {
        const changeDirection = Math.random() > 0.5 ? 1 : -1;
        const priceChange = changeDirection * (Math.random() * 10).toFixed(2);
        const newPrice = +(stock.lastPrice + parseFloat(priceChange)).toFixed(2);
        const newChange = +(newPrice - stock.open).toFixed(2);
        const newChangePercent = +((newChange / stock.open) * 100).toFixed(2);
        
        return {
          ...stock,
          lastPrice: newPrice,
          change: newChange,
          changePercent: newChangePercent
        };
      });
    } catch (error) {
      toast.error("Failed to fetch stock data");
      console.error("Error fetching stocks:", error);
      return [];
    }
  },
  
  getNews: async (): Promise<NewsItem[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockNews;
    } catch (error) {
      toast.error("Failed to fetch market news");
      console.error("Error fetching news:", error);
      return [];
    }
  },
  
  getChartData: async (symbol: string, timeframe: string): Promise<ChartData[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      return mockChartData;
    } catch (error) {
      toast.error(`Failed to fetch chart data for ${symbol}`);
      console.error("Error fetching chart data:", error);
      return [];
    }
  },
  
  searchStocks: async (query: string): Promise<StockData[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const results = mockStocks.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
      return results;
    } catch (error) {
      toast.error("Search failed");
      console.error("Error searching stocks:", error);
      return [];
    }
  }
};
