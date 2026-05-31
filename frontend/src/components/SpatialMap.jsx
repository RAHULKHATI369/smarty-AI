import React, { useState, useEffect } from 'react';
import { MapPin, Layers, Zap, Building2, TrendingUp, Eye } from 'lucide-react';
import MetricCard from './MetricCard';

const NOIDA_ZONES = [
  { id: 'sec62', name: 'Sector 62', type: 'tech', density: 92, valuation: 12500, infra: 'high', growth: 8.2, companies: 340, color: '#06b6d4' },
  { id: 'sec63', name: 'Sector 63', type: 'tech', density: 88, valuation: 11800, infra: 'high', growth: 7.5, companies: 280, color: '#06b6d4' },
  { id: 'sec135', name: 'Sector 135', type: 'mixed', density: 75, valuation: 9200, infra: 'medium', growth: 12.1, companies: 120, color: '#8b5cf6' },
  { id: 'sec128', name: 'Sector 128', type: 'residential', density: 65, valuation: 14200, infra: 'high', growth: 5.8, companies: 45, color: '#10b981' },
  { id: 'sec16', name: 'Sector 16', type: 'commercial', density: 80, valuation: 18500, infra: 'high', growth: 3.2, companies: 520, color: '#f59e0b' },
  { id: 'sec18', name: 'Sector 18', type: 'commercial', density: 95, valuation: 22000, infra: 'high', growth: 2.1, companies: 680, color: '#f43f5e' },
  { id: 'sec44', name: 'Sector 44', type: 'residential', density: 55, valuation: 8900, infra: 'medium', growth: 9.4, companies: 35, color: '#10b981' },
  { id: 'sec137', name: 'Sector 137', type: 'tech', density: 70, valuation: 7500, infra: 'medium', growth: 15.3, companies: 95, color: '#06b6d4' },
  { id: 'sec15', name: 'Sector 15', type: 'residential', density: 60, valuation: 16800, infra: 'high', growth: 4.1, companies: 25, color: '#10b981' },
  { id: 'sec25', name: 'Sector 25', type: 'mixed', density: 72, valuation: 10200, infra: 'medium', growth: 6.8, companies: 155, color: '#8b5cf6' },
  { id: 'gnext', name: 'Greater Noida Exp.', type: 'emerging', density: 40, valuation: 5200, infra: 'low', growth: 22.5, companies: 45, color: '#f59e0b' },
  { id: 'sec150', name: 'Sector 150', type: 'emerging', density: 35, valuation: 4800, infra: 'low', growth: 28.1, companies: 18, color: '#f59e0b' },
];

const INFRA_LABELS = { high: '🟢 Premium', medium: '🟡 Developing', low: '🔴 Planned' };

export default function SpatialMap() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [hoverZone, setHoverZone] = useState(null);
  const [viewMode, setViewMode] = useState('density');
  const [liveTimestamp, setLiveTimestamp] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setLiveTimestamp(Date.now()), 5000);
    return () => clearInterval(timer);
  }, []);

  const getDensityColor = (d) => {
    if (d > 85) return 'rgba(244, 63, 94, 0.7)';
    if (d > 65) return 'rgba(245, 158, 11, 0.65)';
    if (d > 45) return 'rgba(6, 182, 212, 0.55)';
    return 'rgba(16, 185, 129, 0.4)';
  };

  const getMetricValue = (z) => {
    if (viewMode === 'valuation') return `₹${(z.valuation / 1000).toFixed(1)}K`;
    if (viewMode === 'growth') return `${z.growth}%`;
    return `${z.density}%`;
  };

  const getMetricOpacity = (z) => {
    if (viewMode === 'valuation') return Math.max(0.25, z.valuation / 22000);
    if (viewMode === 'growth') return Math.max(0.25, z.growth / 28);
    return Math.max(0.25, z.density / 100);
  };

  const agg = {
    avgD: Math.round(NOIDA_ZONES.reduce((a, z) => a + z.density, 0) / NOIDA_ZONES.length),
    avgV: Math.round(NOIDA_ZONES.reduce((a, z) => a + z.valuation, 0) / NOIDA_ZONES.length),
    totalC: NOIDA_ZONES.reduce((a, z) => a + z.companies, 0),
    avgG: (NOIDA_ZONES.reduce((a, z) => a + z.growth, 0) / NOIDA_ZONES.length).toFixed(1),
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" /> Noida Spatial Topology
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-mono">
            LIVE MESH • {new Date(liveTimestamp).toLocaleTimeString()} • 12 NODES
          </p>
        </div>
        <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-700/50">
          {['density', 'valuation', 'growth'].map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${viewMode === m ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
            >{m}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Avg Density" value={`${agg.avgD}%`} icon={Layers} color="rose" subtitle="12 sectors" />
        <MetricCard label="Avg Value" value={`₹${(agg.avgV / 1000).toFixed(1)}K`} unit="/sqft" icon={TrendingUp} color="amber" />
        <MetricCard label="Companies" value={agg.totalC.toLocaleString()} icon={Building2} color="cyan" />
        <MetricCard label="Growth" value={`${agg.avgG}%`} icon={Zap} color="emerald" trend={parseFloat(agg.avgG)} subtitle="YoY" />
      </div>

      <div className="grid grid-cols-4 gap-2 lg:gap-3">
        {NOIDA_ZONES.map((zone, i) => {
          const sel = selectedZone?.id === zone.id;
          return (
            <button key={zone.id} onClick={() => setSelectedZone(sel ? null : zone)}
              onMouseEnter={() => setHoverZone(zone)} onMouseLeave={() => setHoverZone(null)}
              className={`relative rounded-2xl p-3 lg:p-4 text-left transition-all duration-300 border overflow-hidden ${sel ? 'border-cyan-400/60 shadow-[0_0_30px_rgba(6,182,212,0.2)] scale-[1.02] z-10' : 'border-slate-700/40 hover:border-slate-600/60'}`}
              style={{ background: `linear-gradient(135deg, ${getDensityColor(zone.density)}, rgba(15,23,42,0.9))`, animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 rounded-2xl animate-heat-pulse pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 30%, ${zone.color}30, transparent 70%)`, opacity: getMetricOpacity(zone) }} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider truncate">{zone.name}</span>
                  <MapPin className={`w-3 h-3 ${sel ? 'text-cyan-400' : 'text-slate-600'}`} />
                </div>
                <div className="text-lg lg:text-xl font-black text-white mt-1">{getMetricValue(zone)}</div>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${zone.infra === 'high' ? 'bg-emerald-400' : zone.infra === 'medium' ? 'bg-amber-400' : 'bg-rose-400'}`} />
                  <span className="text-[9px] text-slate-500 capitalize">{zone.type}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {selectedZone && (
        <div className="glass-panel-heavy p-6 animate-fade-in-scale">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-cyan-400" /> {selectedZone.name} — Deep Scan
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">{selectedZone.type.toUpperCase()} • {INFRA_LABELS[selectedZone.infra]}</p>
            </div>
            <button onClick={() => setSelectedZone(null)} className="text-slate-500 hover:text-white text-xl">×</button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard label="Density" value={`${selectedZone.density}%`} color="rose" icon={Layers} />
            <MetricCard label="Value" value={`₹${selectedZone.valuation.toLocaleString()}`} unit="/sqft" color="amber" icon={TrendingUp} />
            <MetricCard label="Growth" value={`${selectedZone.growth}%`} color="emerald" trend={selectedZone.growth} icon={Zap} />
            <MetricCard label="Companies" value={selectedZone.companies} color="cyan" icon={Building2} />
          </div>
          <div className="mt-4 bg-slate-900/60 rounded-xl border border-slate-700/50 p-4">
            <h5 className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-3">24h Density</h5>
            <div className="flex items-end gap-1 h-20">
              {Array.from({ length: 24 }, (_, i) => (
                <div key={i} className="flex-1 rounded-t-sm opacity-70 hover:opacity-100 transition-all" style={{
                  height: `${Math.max(10, Math.sin((i + selectedZone.density / 10) * 0.5) * 40 + 50 + Math.random() * 15)}%`,
                  background: `linear-gradient(to top, ${selectedZone.color}60, ${selectedZone.color}10)`,
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
