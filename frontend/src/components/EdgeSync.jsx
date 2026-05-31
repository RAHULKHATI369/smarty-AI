import React, { useState, useEffect } from 'react';
import { Wifi, Activity, Server, Gauge, Radio, Zap, Globe, Clock } from 'lucide-react';
import MetricCard from './MetricCard';

const MESH_NODES = [
  { id: 'n1', name: 'Sec-62 Edge', status: 'healthy', latency: 2.1, throughput: 94, packets: 12400 },
  { id: 'n2', name: 'Sec-18 Core', status: 'healthy', latency: 1.8, throughput: 97, packets: 18200 },
  { id: 'n3', name: 'Sec-135 Relay', status: 'warning', latency: 4.7, throughput: 78, packets: 8900 },
  { id: 'n4', name: 'Moire Cafe Node', status: 'healthy', latency: 1.2, throughput: 99, packets: 5600 },
  { id: 'n5', name: 'GN Expressway', status: 'healthy', latency: 3.4, throughput: 85, packets: 7100 },
  { id: 'n6', name: 'Sec-150 Frontier', status: 'critical', latency: 8.9, throughput: 42, packets: 2300 },
];

export default function EdgeSync() {
  const [nodes, setNodes] = useState(MESH_NODES);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setTick(p => p + 1);
      setNodes(prev => prev.map(n => ({
        ...n,
        latency: Math.max(0.5, n.latency + (Math.random() - 0.5) * 0.8),
        throughput: Math.min(100, Math.max(20, n.throughput + (Math.random() - 0.5) * 5)),
        packets: n.packets + Math.floor(Math.random() * 200),
      })));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const avgLatency = (nodes.reduce((a, n) => a + n.latency, 0) / nodes.length).toFixed(1);
  const avgThroughput = Math.round(nodes.reduce((a, n) => a + n.throughput, 0) / nodes.length);
  const totalPackets = nodes.reduce((a, n) => a + n.packets, 0);
  const healthyCount = nodes.filter(n => n.latency < 5).length;

  const statusColor = (s) => s === 'healthy' ? 'emerald' : s === 'warning' ? 'amber' : 'rose';
  const latColor = (l) => l < 3 ? 'text-emerald-400' : l < 5 ? 'text-amber-400' : 'text-rose-400';
  const latDot = (l) => l < 3 ? 'healthy' : l < 5 ? 'warning' : 'critical';

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <Radio className="w-5 h-5 text-emerald-400 animate-pulse" /> Edge-Sync Mesh Telemetry
        </h3>
        <p className="text-xs text-slate-500 mt-1 font-mono">
          MESH ACTIVE • {healthyCount}/{nodes.length} NODES HEALTHY • TICK #{tick}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard label="Avg Latency" value={avgLatency} unit="ms" icon={Gauge} color={parseFloat(avgLatency) < 5 ? 'emerald' : 'rose'} subtitle="Target: <5ms" />
        <MetricCard label="Throughput" value={`${avgThroughput}%`} icon={Activity} color="cyan" />
        <MetricCard label="Total Packets" value={(totalPackets / 1000).toFixed(1)} unit="K" icon={Globe} color="violet" />
        <MetricCard label="Uptime" value="99.7" unit="%" icon={Clock} color="emerald" />
      </div>

      {/* Node Grid */}
      <div className="space-y-2">
        {nodes.map(node => (
          <div key={node.id} className={`glass-panel p-4 flex items-center gap-4 transition-all hover:border-${statusColor(node.status)}-500/30`}>
            {/* Status dot */}
            <div className={`w-3 h-3 rounded-full bg-${statusColor(node.status)}-400 latency-dot ${latDot(node.latency)} shrink-0`} />

            {/* Name */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{node.name}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">ID: {node.id}</div>
            </div>

            {/* Latency */}
            <div className="text-right">
              <div className={`text-lg font-black ${latColor(node.latency)} font-mono`}>{node.latency.toFixed(1)}<span className="text-xs text-slate-500 ml-0.5">ms</span></div>
            </div>

            {/* Throughput bar */}
            <div className="w-24 hidden lg:block">
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-${statusColor(node.status)}-400 transition-all duration-1000`} style={{ width: `${node.throughput}%` }} />
              </div>
              <div className="text-[9px] text-slate-500 text-right mt-0.5">{Math.round(node.throughput)}%</div>
            </div>

            {/* Packets */}
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400 font-mono">{node.packets.toLocaleString()}</div>
              <div className="text-[9px] text-slate-600">pkts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
