"use client";
import React, { useState } from 'react';
import { Leaf, Zap, TrendingUp, Truck } from 'lucide-react';

export default function HarvestBrain() {
  const [tomatoPrice, setTomatoPrice] = useState(12);
  const [onionSurplus, setOnionSurplus] = useState(500);
  const [marginTarget, setMarginTarget] = useState(20);

  // Simulated Logic: This represents Ben's Data Science Model
  const calculateBundle = () => {
    const baseCost = (2 * tomatoPrice) + (20); // 2kg veg + packaging
    const cableCost = 90; // Sourced cost of charging cable
    const totalCost = baseCost + cableCost;
    
    // Dynamic Pricing based on Margin Target
    const sellingPrice = Math.round(totalCost * (1 + (marginTarget/100)));
    const profit = sellingPrice - totalCost;

    return { sellingPrice, profit, totalCost };
  };

  const data = calculateBundle();

  return (
    <div className="p-8 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-green-700 p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Leaf /> HarvestBrain <span className="text-xs bg-green-600 px-2 py-1 rounded">v1.0 Beta</span>
            </h1>
            <p className="opacity-80 text-sm mt-1">Tier-2 Supply Chain Optimizer (Nashik Node)</p>
          </div>
          <div className="text-right">
             <div className="text-xs opacity-75">LIVE FEED</div>
             <div className="font-mono font-bold">NOV 30 • 20:45 IST</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          
          {/* Left: Input (The Problem) */}
          <div className="p-8 bg-slate-50 border-r border-slate-200">
            <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Live Farmer Inputs
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Daily Tomato Sourcing Cost (₹/kg)
                </label>
                <input 
                  type="range" min="5" max="40" value={tomatoPrice} 
                  onChange={(e) => setTomatoPrice(Number(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-700"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Cheap (₹5)</span>
                  <span className="font-bold text-slate-800">Current: ₹{tomatoPrice}</span>
                  <span>Expensive (₹40)</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Onion Surplus Stock (kg)
                </label>
                <input 
                  type="range" min="0" max="1000" value={onionSurplus} 
                  onChange={(e) => setOnionSurplus(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="text-right text-xs font-bold text-slate-800 mt-1">{onionSurplus} kg Available</div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Target Net Margin (%)
                </label>
                <input 
                  type="range" min="10" max="50" value={marginTarget} 
                  onChange={(e) => setMarginTarget(Number(e.target.value))}
                  className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <div className="text-right text-xs font-bold text-slate-800 mt-1">{marginTarget}%</div>
              </div>
            </div>
          </div>

          {/* Right: Output (The Solution) */}
          <div className="p-8 bg-white">
            <h2 className="text-lg font-bold text-slate-700 mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" /> AI Generated Bundle
            </h2>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50 mb-6">
              <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">Recommended for Tonight</div>
              <h3 className="text-xl font-bold text-slate-800">"Nashik Essentials Kit"</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">✅ 2kg Fresh Tomatoes</li>
                <li className="flex items-center gap-2">✅ 1kg Onions (Surplus Clearance)</li>
                <li className="flex items-center gap-2 font-semibold text-blue-600">⚡ 1x High-Speed Data Cable (Upsell)</li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="text-xs text-green-600 font-medium">Bundle Price</div>
                <div className="text-2xl font-bold text-green-800">₹{data.sellingPrice}</div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="text-xs text-blue-600 font-medium">Net Profit</div>
                <div className="text-2xl font-bold text-blue-800">₹{data.profit}</div>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
               <TrendingUp className="w-4 h-4" /> 
               <span>Algorithm optimizes for Unit Economics </span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}