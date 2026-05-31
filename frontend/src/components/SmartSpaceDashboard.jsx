import React, { useState, useEffect } from 'react';
import { Layers, Route, Sparkles, Radio, Activity, MapPin, Globe, Zap, ChevronRight } from 'lucide-react';
import SpatialMap from './SpatialMap';
import LifestyleRouter from './LifestyleRouter';
import ListingAssistant from './ListingAssistant';
import EdgeSync from './EdgeSync';

const TABS = [
  { id: 'spatial', label: 'Spatial Map', icon: Layers, color: 'cyan', desc: 'Interactive topology' },
  { id: 'lifestyle', label: 'Lifestyle', icon: Route, color: 'violet', desc: 'Commute router' },
  { id: 'listing', label: 'Listings', icon: Sparkles, color: 'amber', desc: 'AI generator' },
  { id: 'edge', label: 'Edge Sync', icon: Radio, color: 'emerald', desc: 'Mesh telemetry' },
];

export default function SmartSpaceDashboard() {
  const [activeTab, setActiveTab] = useState('spatial');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const currentTab = TABS.find(t => t.id === activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case 'spatial': return <SpatialMap />;
      case 'lifestyle': return <LifestyleRouter />;
      case 'listing': return <ListingAssistant />;
      case 'edge': return <EdgeSync />;
      default: return <SpatialMap />;
    }
  };

  return (
    <div className="flex h-screen bg-[#030712] text-slate-100 font-sans overflow-hidden">
      {/* ========= LEFT SIDEBAR ========= */}
      <aside className="w-20 lg:w-72 bg-[#0a0f1a] border-r border-slate-800/60 flex flex-col py-6 shrink-0 relative overflow-hidden">
        {/* Animated background orb */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/5 rounded-full blur-[60px] animate-float-orb pointer-events-none" />

        {/* Logo */}
        <div className="flex flex-col lg:flex-row items-center gap-3 px-3 lg:px-6 mb-8 w-full">
          <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-black gradient-text-cyan leading-tight">SmartSpace</h1>
            <p className="text-[9px] text-slate-500 tracking-[0.2em] uppercase font-bold">× Mr.360 AI Engine</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 w-full px-2 lg:px-3 flex flex-col gap-1.5">
          <p className="hidden lg:block text-[9px] text-slate-600 uppercase tracking-[0.2em] font-bold px-3 mb-2">Modules</p>
          {TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 lg:px-4 lg:py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                  isActive
                    ? `bg-${tab.color}-500/10 text-${tab.color}-400 border border-${tab.color}-500/25`
                    : 'text-slate-500 hover:bg-slate-800/50 hover:text-slate-300 border border-transparent'
                }`}>
                {isActive && <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-${tab.color}-400 rounded-r-full`} />}
                <tab.icon className={`w-5 h-5 shrink-0 ${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
                <div className="hidden lg:block text-left flex-1 min-w-0">
                  <span className="font-bold text-sm block">{tab.label}</span>
                  <span className="text-[10px] text-slate-600 block">{tab.desc}</span>
                </div>
                {isActive && <ChevronRight className="w-3 h-3 hidden lg:block opacity-50" />}
              </button>
            );
          })}
        </nav>

        {/* System Status Footer */}
        <div className="mt-auto px-2 lg:px-4 pt-4 border-t border-slate-800/50">
          <div className="hidden lg:flex items-center gap-2 mb-3 px-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">System Online</span>
          </div>
          <div className="hidden lg:block px-2">
            <p className="text-[10px] text-slate-600 font-mono">{time.toLocaleTimeString()}</p>
            <p className="text-[9px] text-slate-700 font-mono mt-0.5">Noida Edge Mesh • v2.4</p>
          </div>
          {/* Mobile: just show status dot */}
          <div className="lg:hidden flex justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </aside>

      {/* ========= MAIN CONTENT ========= */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mesh background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Floating accent orbs */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none animate-float-orb" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none animate-float-orb" style={{ animationDelay: '3s' }} />

        {/* Header Bar */}
        <header className="relative z-10 px-4 lg:px-8 py-4 flex items-center justify-between border-b border-slate-800/40 bg-[#030712]/80 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              {currentTab && <currentTab.icon className={`w-6 h-6 text-${currentTab.color}-400`} />}
              {currentTab?.label}
              <span className={`bg-${currentTab?.color}-500/20 text-${currentTab?.color}-400 text-[9px] px-2 py-0.5 rounded-md font-bold tracking-wider uppercase border border-${currentTab?.color}-500/30`}>Live</span>
            </h2>
            <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Noida Spatial Grid • Moire Cafe Node
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Latency: 2.4ms</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800">
              <Zap className="w-3 h-3 text-amber-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Edge Active</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
