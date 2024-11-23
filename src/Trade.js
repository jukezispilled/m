import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import original from 'react95/dist/themes/original';
import { createChart } from 'lightweight-charts';

const TradingSimulator = ({ title, imageSrc, initialPrice }) => {
    const [price, setPrice] = useState(initialPrice || (Math.random() * 0.0001 + 0.00005).toFixed(8));
    const [priceHistory, setPriceHistory] = useState(() => [{
      time: Math.floor(Date.now() / 1000),
      open: price,
      high: price,
      low: price,
      close: price,
    }]);
    const chartContainerRef = useRef();
    const chartRef = useRef();
  
    useEffect(() => {
      if (chartContainerRef.current) {
        const chart = createChart(chartContainerRef.current, {
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
          layout: {
            backgroundColor: '#ffffff',
            textColor: '#000000',
          },
          grid: {
            vertLines: {
              color: '#e1e1e1',
            },
            horzLines: {
              color: '#e1e1e1',
            },
          },
          priceScale: {
            borderColor: '#cccccc',
          },
          timeScale: {
            borderColor: '#cccccc',
          },
        });
  
        const candlestickSeries = chart.addCandlestickSeries({
          upColor: '#4caf50',
          downColor: '#f44336',
          borderDownColor: '#f44336',
          borderUpColor: '#4caf50',
          wickDownColor: '#f44336',
          wickUpColor: '#4caf50',
        });
  
        chartRef.current = candlestickSeries;
  
        return () => chart.remove();
      }
    }, []);
  
    useEffect(() => {
      if (chartRef.current) {
        const sortedHistory = [...priceHistory].sort((a, b) => a.time - b.time);
        chartRef.current.setData(sortedHistory);
      }
    }, [priceHistory]);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setPrice(prevPrice => {
          const change = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(0, prevPrice + change);
          const lastEntry = priceHistory[priceHistory.length - 1];
          const newTime = lastEntry.time + 60;
          const newEntry = {
            time: newTime,
            open: lastEntry.close,
            high: Math.max(lastEntry.close, newPrice),
            low: Math.min(lastEntry.close, newPrice),
            close: newPrice,
          };
          setPriceHistory(prev => {
            const updatedHistory = [
              ...prev.filter(entry => entry.time < newTime),
              newEntry,
            ].sort((a, b) => a.time - b.time);
            return updatedHistory;
          });
          return newPrice;
        });
      }, 100);
  
      return () => clearInterval(interval);
    }, [priceHistory]);
  
    const handleBuy = () => {
        setPrice((prev) => {
            const newPrice = prev * 10;
            const lastEntry = priceHistory[priceHistory.length - 1];
            const newTime = lastEntry.time + 60 + Math.random() * 0.001;
            const updatedEntry = {
                time: newTime,
                open: lastEntry.open,
                high: Math.max(lastEntry.high, newPrice),
                low: Math.min(lastEntry.low, newPrice),
                close: newPrice,
            };
            setPriceHistory((prevHistory) => [
                ...prevHistory.slice(0, prevHistory.length - 1),
                updatedEntry,
            ]);
            return newPrice;
        });
    };    

    const handleSell = () => {
      setPrice((prev) => {
          const newPrice = prev * .1;
          const lastEntry = priceHistory[priceHistory.length - 1];
          const newTime = lastEntry.time + 60 + Math.random() * 0.001;
          const updatedEntry = {
              time: newTime,
              open: lastEntry.open,
              high: Math.max(lastEntry.high, newPrice),
              low: Math.min(lastEntry.low, newPrice),
              close: newPrice,
          };
          setPriceHistory((prevHistory) => [
              ...prevHistory.slice(0, prevHistory.length - 1),
              updatedEntry,
          ]);
          return newPrice;
      });
    }; 
  
    return (
      <ThemeProvider theme={original}>
        <Window className="w-[90%] md:w-full max-w-4xl p-4">
            <WindowContent className="p-4 flex flex-col items-center" style={{
                background: 'url(/c.gif) repeat',
                backgroundSize: '50px 50px'
            }}>
                <div className="flex items-center">
                    <div className="flex justify-center space-x-2">
                      <Button onClick={handleSell}>
                          <span>Cramer Shill</span>
                      </Button>
                      <Button onClick={handleBuy}>
                          <span>Cramer FUD</span>
                      </Button>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-2 mt-4" style={{ width: '90%' }}>
                    <div ref={chartContainerRef} className="w-full h-[225px] md:h-[400px]"></div>
                </div>
            </WindowContent>
        </Window>
      </ThemeProvider>
    );
};

export default TradingSimulator;