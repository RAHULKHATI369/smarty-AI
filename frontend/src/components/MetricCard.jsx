import React from 'react';

/**
 * Reusable metric display card with animated gauge ring
 */
export default function MetricCard({ label, value, unit, icon: Icon, color = 'cyan', trend, subtitle, size = 'md' }) {
  const colorMap = {
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-cyan-500/10' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/20', text: 'text-violet-400', glow: 'shadow-violet-500/10' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400', glow: 'shadow-amber-500/10' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/10' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', glow: 'shadow-rose-500/10' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400', glow: 'shadow-indigo-500/10' },
  };

  const c = colorMap[color] || colorMap.cyan;

  return (
    <div className={`${c.bg} ${c.border} border rounded-2xl p-4 ${size === 'lg' ? 'p-6' : 'p-4'} transition-all duration-300 hover:shadow-lg ${c.glow} group animate-fade-in-up`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{label}</span>
        {Icon && <Icon className={`w-4 h-4 ${c.text} opacity-60 group-hover:opacity-100 transition-opacity`} />}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`${size === 'lg' ? 'text-3xl' : 'text-2xl'} font-black ${c.text} tracking-tight`}>{value}</span>
        {unit && <span className="text-xs text-slate-500 font-semibold">{unit}</span>}
      </div>
      {trend !== undefined && (
        <div className={`mt-2 text-xs font-bold flex items-center gap-1 ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          <span>{trend >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(trend)}%</span>
          {subtitle && <span className="text-slate-500 font-normal ml-1">{subtitle}</span>}
        </div>
      )}
      {!trend && subtitle && (
        <p className="mt-1.5 text-[11px] text-slate-500">{subtitle}</p>
      )}
    </div>
  );
}
