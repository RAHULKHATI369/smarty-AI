import React, { useState } from 'react';
import { Navigation, Clock, Train, Car, Bike, Footprints, Building, Coffee, GraduationCap, Heart, ShoppingBag, MapPin, Route, ArrowRight, Zap } from 'lucide-react';
import MetricCard from './MetricCard';

const LOCATIONS = [
  { id: 'sec62', name: 'Sector 62, Noida', tag: 'Tech Hub' },
  { id: 'sec18', name: 'Sector 18, Noida', tag: 'Commercial' },
  { id: 'sec128', name: 'Sector 128, Noida', tag: 'Premium Residential' },
  { id: 'sec135', name: 'Sector 135, Noida', tag: 'Mixed Use' },
  { id: 'sec150', name: 'Sector 150, Noida', tag: 'Emerging' },
  { id: 'moire', name: 'Moire Cafe, Noida', tag: '📍 Venue Node' },
  { id: 'gnexp', name: 'Greater Noida Expressway', tag: 'Corridor' },
];

const TRANSIT_MODES = [
  { id: 'metro', label: 'Metro', icon: Train, color: 'cyan' },
  { id: 'car', label: 'Car', icon: Car, color: 'violet' },
  { id: 'bike', label: 'Bike', icon: Bike, color: 'emerald' },
  { id: 'walk', label: 'Walk', icon: Footprints, color: 'amber' },
];

const AMENITIES = [
  { icon: Coffee, label: 'Cafes', count: 24, dist: '0.3 km', color: 'amber' },
  { icon: GraduationCap, label: 'Schools', count: 8, dist: '1.2 km', color: 'violet' },
  { icon: Heart, label: 'Hospitals', count: 5, dist: '0.8 km', color: 'rose' },
  { icon: ShoppingBag, label: 'Malls', count: 3, dist: '1.5 km', color: 'cyan' },
  { icon: Building, label: 'Offices', count: 45, dist: '0.1 km', color: 'indigo' },
];

// Simulated commute data generator
const simulateCommute = (from, to, mode) => {
  const base = Math.floor(Math.random() * 25 + 10);
  const delay = Math.floor(Math.random() * 12);
  const dist = (Math.random() * 15 + 2).toFixed(1);
  const cost = mode === 'metro' ? Math.floor(dist * 3.5) : mode === 'car' ? Math.floor(dist * 12) : 0;
  return { duration: base, delay, distance: dist, cost, congestion: Math.floor(Math.random() * 100) };
};

export default function LifestyleRouter() {
  const [workLoc, setWorkLoc] = useState('sec62');
  const [homeLoc, setHomeLoc] = useState('sec128');
  const [selectedMode, setSelectedMode] = useState('metro');
  const [routeData, setRouteData] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateRoute = () => {
    setIsCalculating(true);
    setRouteData(null);
    setTimeout(() => {
      setRouteData(simulateCommute(workLoc, homeLoc, selectedMode));
      setIsCalculating(false);
    }, 1200);
  };

  const workName = LOCATIONS.find(l => l.id === workLoc)?.name || '';
  const homeName = LOCATIONS.find(l => l.id === homeLoc)?.name || '';

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Route className="w-5 h-5 text-violet-400" /> Lifestyle Commute Router
        </h3>
        <p className="text-xs text-slate-500 mt-1">Synchronous transit vector analysis • Real-time delay modeling</p>
      </div>

      {/* Work ↔ Home Selector */}
      <div className="glass-panel-heavy p-5">
        <div className="flex flex-col lg:flex-row items-stretch gap-4">
          {/* Work Location */}
          <div className="flex-1">
            <label className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-2 block">🏢 Work Location</label>
            <select value={workLoc} onChange={e => setWorkLoc(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-semibold focus:border-cyan-500/50 focus:outline-none transition-colors appearance-none cursor-pointer">
              {LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.tag})</option>)}
            </select>
          </div>

          {/* Arrow indicator */}
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-violet-400" />
            </div>
          </div>

          {/* Home Location */}
          <div className="flex-1">
            <label className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-2 block">🏠 Home Location</label>
            <select value={homeLoc} onChange={e => setHomeLoc(e.target.value)}
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-semibold focus:border-emerald-500/50 focus:outline-none transition-colors appearance-none cursor-pointer">
              {LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name} ({l.tag})</option>)}
            </select>
          </div>
        </div>

        {/* Transit Mode Selector */}
        <div className="flex gap-2 mt-4">
          {TRANSIT_MODES.map(m => (
            <button key={m.id} onClick={() => setSelectedMode(m.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase transition-all duration-300 border ${
                selectedMode === m.id
                  ? `bg-${m.color}-500/20 text-${m.color}-400 border-${m.color}-500/40 shadow-lg`
                  : 'text-slate-500 border-slate-700/40 hover:text-slate-300 hover:border-slate-600'
              }`}>
              <m.icon className="w-4 h-4" /> {m.label}
            </button>
          ))}
        </div>

        {/* Calculate Button */}
        <button onClick={calculateRoute} disabled={isCalculating}
          className="w-full mt-4 py-3.5 rounded-xl font-black text-sm uppercase tracking-wider bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20">
          {isCalculating ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Computing Vector...</>
          ) : (
            <><Navigation className="w-4 h-4" /> Calculate Commute Vector</>
          )}
        </button>
      </div>

      {/* Route Results */}
      {routeData && (
        <div className="space-y-4 animate-fade-in-scale">
          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Route Analysis</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
              <MapPin className="w-3 h-3 text-cyan-400" />
              <span className="font-semibold text-cyan-400">{workName}</span>
              <ArrowRight className="w-3 h-3 text-slate-600" />
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span className="font-semibold text-emerald-400">{homeName}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <MetricCard label="Duration" value={routeData.duration} unit="min" icon={Clock} color="cyan" />
            <MetricCard label="Distance" value={routeData.distance} unit="km" icon={Route} color="violet" />
            <MetricCard label="Live Delay" value={`+${routeData.delay}`} unit="min" icon={Clock} color={routeData.delay > 8 ? 'rose' : 'amber'} subtitle={routeData.delay > 8 ? 'Heavy traffic' : 'Moderate'} />
            {routeData.cost > 0 && <MetricCard label="Est. Cost" value={`₹${routeData.cost}`} icon={Zap} color="emerald" />}
          </div>

          {/* Congestion Bar */}
          <div className="glass-panel p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Route Congestion</span>
              <span className={`text-xs font-bold ${routeData.congestion > 70 ? 'text-rose-400' : routeData.congestion > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>{routeData.congestion}%</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${routeData.congestion > 70 ? 'bg-gradient-to-r from-rose-500 to-red-500' : routeData.congestion > 40 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'}`}
                style={{ width: `${routeData.congestion}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Amenity Proximity Matrix */}
      <div>
        <h4 className="text-sm font-black text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-indigo-400" /> Proximity Matrix
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
          {AMENITIES.map((a, i) => (
            <div key={i} className={`bg-${a.color}-500/10 border border-${a.color}-500/20 rounded-xl p-3 text-center hover:scale-105 transition-transform cursor-default`}>
              <a.icon className={`w-5 h-5 text-${a.color}-400 mx-auto mb-1.5`} />
              <div className="text-xs font-bold text-white">{a.count}</div>
              <div className="text-[9px] text-slate-400">{a.label}</div>
              <div className={`text-[10px] text-${a.color}-400 font-bold mt-1`}>{a.dist}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
