"use client";

import React, { useState, useEffect } from "react";
import { Send, Leaf, TrendingUp, Loader2, Smartphone, DollarSign, Truck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Types & Mock Data ---
type Bundle = {
  name: string;
  items: string[];
  price: number;
  margin: number;
  hindiVoice: string;
};

// --- Helper Component: Slider ---
function InputSlider({ label, value, setValue, max, color }: any) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="text-sm font-bold text-slate-900">{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        value={value} 
        onChange={(e) => setValue(Number(e.target.value))}
        className={`w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer ${color}`}
      />
    </div>
  );
}

// --- The Core AI Logic Component (Internal Use) ---
function HarvestBrainLogic() {
  // Input State (Judges control this)
  const [tomatoQty, setTomatoQty] = useState(850);
  const [onionQty, setOnionQty] = useState(620);
  const [cucumberQty, setCucumberQty] = useState(310);

  // AI Processing State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [generatedBundle, setGeneratedBundle] = useState<Bundle | null>(null);

  // The "AI" Logic (Simulated for Demo Reliability)
  const runHarvestBrain = () => {
    setIsAnalyzing(true);
    setLogs([]);
    setGeneratedBundle(null);

    // Sequence of "AI Thinking" visualization
    const steps = [
      "📡 Scanning Nashik APMC realtime feed...",
      `🍅 Detected Surplus: ${tomatoQty}kg Tomatoes`,
      "📉 Analyzing 3-year historical demand curves...",
      "💰 Identifying high-margin cross-sell candidates...",
      "🤖 GPT-4o optimizing bundle pricing...",
    ];

    let stepCount = 0;
    const interval = setInterval(() => {
      if (stepCount < steps.length) {
        setLogs((prev) => [...prev, steps[stepCount]]);
        stepCount++;
      } else {
        clearInterval(interval);
        generateFinalBundle();
        setIsAnalyzing(false);
      }
    }, 600); // Speed of simulation
  };

  const generateFinalBundle = () => {
    // Dynamic Logic based on sliders
    let bundleName = "Daily Essentials Kit";
    let mainVeg = "Tomatoes";
    let upsell = "Boat Charger";
    let price = 299;

    if (tomatoQty > 900) {
      bundleName = "Red Curry Special (High Surplus)";
      mainVeg = "5kg Tomatoes";
      upsell = "Lakmé Sun Expert";
      price = 349;
    } else if (onionQty > 800) {
      bundleName = "Onion Bulk Saver (High Surplus)";
      mainVeg = "5kg Onions";
      upsell = "Realme Buds";
      price = 399;
    } else {
      bundleName = "Sunday Family Mix";
      mainVeg = "3kg Mix Veg";
      upsell = "Boat 20W Charger";
      price = 299;
    }

    setGeneratedBundle({
      name: bundleName,
      items: [mainVeg, `${Math.floor(onionQty/200)}kg Onions`, upsell],
      price: price,
      margin: Math.floor(Math.random() * (45 - 38) + 38), // Random between 38-45%
      hindiVoice: `Namaste! Aaj ka special offer: ${mainVeg} aur ${upsell} sirf ₹${price} mein! Order now on FlashKart.`
    });
  };
  
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-green-600 p-2 rounded-lg">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">HarvestBrain AI</h1>
            <p className="text-sm text-slate-500">Live Surplus-to-Bundle Engine</p>
          </div>
        </div>
        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
          ● LIVE: Nashik Node
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: Controls & Logic */}
        <div className="space-y-8">
          
          {/* 1. The Input (Judge Controls) */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-600" />
              Incoming Farmer Surplus (Live Feed)
            </h2>
            
            <div className="space-y-6">
              <InputSlider label="Tomato Supply (kg)" value={tomatoQty} setValue={setTomatoQty} max={1200} color="accent-red-500" />
              <InputSlider label="Onion Supply (kg)" value={onionQty} setValue={setOnionQty} max={1200} color="accent-purple-500" />
              <InputSlider label="Cucumber Supply (kg)" value={cucumberQty} setValue={setCucumberQty} max={800} color="accent-green-500" />
            </div>

            <button 
              onClick={runHarvestBrain}
              disabled={isAnalyzing}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isAnalyzing ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5" />}
              {isAnalyzing ? "AI Optimizing Bundles..." : "Generate Profitable Bundles"}
            </button>
          </section>

          {/* 2. The AI Console Logs */}
          <section className="bg-slate-900 text-green-400 p-6 rounded-2xl shadow-lg font-mono text-sm min-h-[200px]">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-slate-400 text-xs">system_logs.txt</span>
            </div>
            <div className="space-y-2">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-2"
                  >
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                  </motion.div>
                ))}
              </AnimatePresence>
              {!isAnalyzing && logs.length === 0 && (
                <div className="text-slate-600 italic">Waiting for input stream...</div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: The Output (Mock Phone) */}
        <div className="flex flex-col items-center justify-center">
             <h3 className="text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">Customer Experience Preview</h3>
             
             {/* PHONE FRAME */}
             <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden ring-1 ring-slate-900/50">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-[#E5DDD5] pt-12 pb-4 overflow-y-auto flex flex-col">
                  
                  {/* WhatsApp Header */}
                  <div className="bg-[#008069] text-white p-3 flex items-center gap-3 shadow-md absolute top-0 w-full z-10 pt-8">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#008069] font-bold">F</div>
                    <div>
                      <h4 className="font-semibold text-sm">FlashKart AI</h4>
                      <p className="text-[10px] opacity-80">Business Account</p>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 p-3 space-y-4 mt-8">
                     <div className="flex justify-center">
                        <span className="bg-[#DCF8C6] text-xs px-2 py-1 rounded shadow text-slate-600">Today</span>
                     </div>

                     {generatedBundle ? (
                       <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg p-1 shadow-sm max-w-[85%] self-start rounded-tl-none"
                       >
                         {/* Image placeholder */}
                         <div className="h-32 bg-slate-100 rounded mb-2 flex items-center justify-center text-slate-300">
                            <Smartphone className="w-12 h-12" />
                         </div>
                         <div className="p-2">
                           <h3 className="font-bold text-slate-900">{generatedBundle.name}</h3>
                           <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                             {generatedBundle.items.join(" + ")}
                           </p>
                           <div className="flex items-center justify-between mt-3">
                              <span className="font-bold text-green-700">₹{generatedBundle.price}</span>
                              <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded border border-green-200">
                                {generatedBundle.margin}% Margin
                              </span>
                           </div>
                           <hr className="my-2 border-slate-100"/>
                           
                           {/* Voice Note Simulation */}
                           <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                                <Send className="w-3 h-3" />
                              </div>
                              <div className="flex-1">
                                <div className="h-1 bg-slate-300 rounded-full w-full overflow-hidden">
                                  <div className="h-full bg-green-500 w-2/3"></div>
                                </div>
                                <p className="text-[9px] text-slate-400 mt-1">0:14 • Hindi AI Voice</p>
                              </div>
                           </div>
                           <p className="text-[10px] text-slate-400 mt-2 italic">"{generatedBundle.hindiVoice}"</p>
                         </div>
                         <div className="mt-1 flex justify-end">
                            <span className="text-[10px] text-slate-400">10:42 AM</span>
                         </div>
                       </motion.div>
                     ) : (
                       <div className="flex justify-center mt-20 opacity-30">
                         <div className="text-center">
                           <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                           <p className="text-xs">Waiting for AI...</p>
                         </div>
                       </div>
                     )}
                  </div>

                  {/* Footer Input */}
                  <div className="bg-white p-2 flex items-center gap-2 px-3">
                     <div className="flex-1 bg-slate-100 h-8 rounded-full px-3 text-xs flex items-center text-slate-400">Type a message...</div>
                     <div className="w-8 h-8 bg-[#008069] rounded-full flex items-center justify-center text-white">
                       <Send className="w-4 h-4" />
                     </div>
                  </div>

                </div>
             </div>

        </div>
      </main>
    </div>
  );
}

// --- The Hydration Wrapper (The main export) ---
// This prevents blank screens on Vercel by ensuring client-side code runs only after mounting.
export default function HarvestBrainDemo() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a simple loading placeholder until the client is fully mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center font-sans">
        <Loader2 className="animate-spin w-6 h-6 mr-3" />
        Loading HarvestBrain AI...
      </div>
    );
  }

  // Render the core logic once mounted
  return <HarvestBrainLogic />;
}