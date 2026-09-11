import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Cpu,
  Zap,
  HardDrive,
  Database,
  Server,
  Clock,
  Radio,
  ShieldCheck,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import MetricCard from '../components/common/MetricCard';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { systemMetrics, timeSeriesMetrics, agentExecutionRate } from '../data/mockMonitoring';

export default function MonitoringPage() {
  const [timeRange, setTimeRange] = useState("24h");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-100">System Monitoring & Hardware Telemetry</h1>
            <Badge color="emerald" dot pulse>Live SCADA Stream</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Real-time compute loads, GPU thermals, VRAM allocations, and agent execution velocity across the sovereign enclave.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {["1h", "6h", "24h", "7d"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium border transition-colors ${
                timeRange === range
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Primary Hardware Telemetry Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          label="CPU Usage (EPYC 9654)"
          value={`${systemMetrics.cpu.usagePct}%`}
          detail={`${systemMetrics.cpu.coresActive} Cores`}
          percent={systemMetrics.cpu.usagePct}
          color="cyan"
        />
        <MetricCard
          label="GPU 0 (RTX 6000 Ada)"
          value="86.4%"
          detail={`${systemMetrics.gpu0.temperature}°C • ${systemMetrics.gpu0.powerWatts}W`}
          percent={86.4}
          color="amber"
        />
        <MetricCard
          label="GPU 0 VRAM"
          value={`${systemMetrics.gpu0.vramUsedGB} GB`}
          unit="/ 48 GB"
          detail="vLLM + Embeddings"
          percent={Math.round((systemMetrics.gpu0.vramUsedGB / systemMetrics.gpu0.vramTotalGB) * 100)}
          color="amber"
        />
        <MetricCard
          label="GPU 1 (RTX 6000 Ada)"
          value="44.1%"
          detail={`${systemMetrics.gpu1.temperature}°C • ${systemMetrics.gpu1.powerWatts}W`}
          percent={44.1}
          color="cyan"
        />
        <MetricCard
          label="System RAM (ECC DDR5)"
          value={`${systemMetrics.memory.usedGB} GB`}
          unit="/ 256 GB"
          detail="62 GB Cache"
          percent={Math.round((systemMetrics.memory.usedGB / systemMetrics.memory.totalGB) * 100)}
          color="emerald"
        />
        <MetricCard
          label="Avg Inference Latency"
          value={`${systemMetrics.inference.avgLatencyMs} ms`}
          detail={`p95: ${systemMetrics.inference.p95LatencyMs}ms`}
          percent={42}
          color="cyan"
        />
        <MetricCard
          label="Token Generation"
          value={`${systemMetrics.inference.tokensPerSec} t/s`}
          detail="1.48M tokens today"
          percent={68}
          color="emerald"
        />
        <MetricCard
          label="Vector DB Query"
          value={`${systemMetrics.vectorDb.avgLatencyMs} ms`}
          detail="18,420 vectors"
          percent={15}
          color="emerald"
        />
      </div>

      {/* Chart Grid: 2 Large Telemetry Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Compute Utilization vs Latency */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                CPU & GPU Compute Utilization (%)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Time-Series Telemetry</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gpuUtil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="cpuUtil" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Area
                  type="monotone"
                  dataKey="gpu"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#gpuUtil)"
                  name="GPU 0 Util %"
                />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="#10b981"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#cpuUtil)"
                  name="CPU Load %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Autonomous Agent Executions by Fleet */}
        <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
                Agent Executions Rate (Tasks / Hour)
              </h2>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Maintenance vs Safety vs Ops</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentExecutionRate} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="time" stroke="#475569" fontSize={11} fontFamily="monospace" />
                <YAxis stroke="#475569" fontSize={11} fontFamily="monospace" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: 'monospace'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar dataKey="maintenance" fill="#06b6d4" radius={[4, 4, 0, 0]} name="Maintenance Agent" />
                <Bar dataKey="operations" fill="#10b981" radius={[4, 4, 0, 0]} name="Operations Agent" />
                <Bar dataKey="safety" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Safety Agent" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Cluster Node Status Table */}
      <div className="p-5 rounded-2xl bg-[#0d131f] border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <h2 className="text-xs font-bold text-slate-100 uppercase tracking-wider font-mono">
              Enclave Physical Node Topology
            </h2>
          </div>
          <span className="text-xs font-mono text-emerald-400">Air-Gap Firewall: ENFORCED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">Compute Node-01</span>
              <Badge color="emerald" size="sm">ONLINE</Badge>
            </div>
            <p className="text-slate-400 text-[11px]">Dual RTX 6000 Ada + EPYC 9654</p>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
              <span>IP: 10.14.1.10</span>
              <span>Uptime: 42d 18h</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">Vector Node-02</span>
              <Badge color="emerald" size="sm">ONLINE</Badge>
            </div>
            <p className="text-slate-400 text-[11px]">PostgreSQL 16 pgvector HNSW</p>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
              <span>IP: 10.14.1.11</span>
              <span>Uptime: 42d 18h</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-200">Storage RAID-10</span>
              <Badge color="emerald" size="sm">SYNCHRONIZED</Badge>
            </div>
            <p className="text-slate-400 text-[11px]">8 TB Enterprise NVMe Gen5 (2.4 TB used)</p>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-slate-800 flex justify-between">
              <span>Read: 4,200 MB/s</span>
              <span>Write: 3,800 MB/s</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
