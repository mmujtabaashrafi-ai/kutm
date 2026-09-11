import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Cpu,
  Database,
  Bot,
  Activity,
  Zap,
  HardDrive,
  ShieldCheck,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Server
} from 'lucide-react';
import StatusCard from '../components/common/StatusCard';
import MetricCard from '../components/common/MetricCard';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { systemMetrics, timeSeriesMetrics } from '../data/mockMonitoring';

const recentActivities = [
  {
    id: 1,
    title: "Maintenance Manual indexed",
    detail: "Pump Maintenance Manual.pdf (412 chunks added to pgvector)",
    time: "4 mins ago",
    type: "document",
    status: "Success",
    icon: FileCheck,
    color: "cyan"
  },
  {
    id: 2,
    title: "Maintenance Agent executed",
    detail: "Vibration FFT anomaly detected on Pump P-101. Work Order #WO-88412 drafted",
    time: "8 mins ago",
    type: "agent",
    status: "Active",
    icon: Bot,
    color: "emerald"
  },
  {
    id: 3,
    title: "Local LLM request completed",
    detail: "ISO 10816 Zone C vibration velocity diagnostic completed in 384ms",
    time: "12 mins ago",
    type: "inference",
    status: "Success",
    icon: Zap,
    color: "amber"
  },
  {
    id: 4,
    title: "Equipment report analyzed",
    detail: "Centrifugal Compressor C-302 thermal drift evaluated (Lube oil delta-T: +6.2°C)",
    time: "25 mins ago",
    type: "report",
    status: "Success",
    icon: CheckCircle2,
    color: "cyan"
  },
];

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Control Room Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d1527] via-[#09101d] to-[#070b12] border border-cyan-500/20 p-6 lg:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                AIR-GAPPED SYSTEM 100% OPERATIONAL
              </span>
              <span className="text-xs font-mono text-slate-400">Node-01 // Enclave-A</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              Good morning, Engineer
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              Welcome to your Sovereign AI Workbench. All inferences, document vectors, and agent loops execute purely on local refinery hardware with zero cloud exposure.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              variant="primary"
              icon={Sparkles}
              onClick={() => navigate('/chat')}
            >
              Open AI Chat
            </Button>
            <Button
              variant="secondary"
              icon={Bot}
              onClick={() => navigate('/agents')}
            >
              Deploy Agent
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatusCard
          title="Local LLM Status"
          value="48.6 t/s"
          subvalue="Llama-3-70B • vLLM Engine"
          icon={Zap}
          status="Running"
          statusColor="emerald"
          trend="+1.2%"
        />
        <StatusCard
          title="RAG Knowledge Base"
          value="18,420"
          subvalue="8 Manuals • pgvector HNSW"
          icon={Database}
          status="Synchronized"
          statusColor="cyan"
          trend="4.2ms avg"
        />
        <StatusCard
          title="Active Agents"
          value="4 Fleets"
          subvalue="Maintenance, Safety & Ops"
          icon={Bot}
          status="Active"
          statusColor="emerald"
          trend="99.4% SLA"
        />
        <StatusCard
          title="System Health"
          value="100%"
          subvalue="Dual RTX 6000 Ada • 0 Errors"
          icon={ShieldCheck}
          status="Air-Gapped"
          statusColor="emerald"
        />
      </div>

      {/* Main Grid: System Health & Realtime Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: System Health & Telemetry Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* System Hardware Gauges */}
          <div className="p-5 rounded-xl bg-[#0d131f] border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
                  System Health & Hardware Telemetry
                </h2>
              </div>
              <Badge color="emerald" dot>Real-Time SCADA Sync</Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <MetricCard
                label="CPU Load"
                value={`${systemMetrics.cpu.usagePct}%`}
                detail="96 Cores"
                percent={systemMetrics.cpu.usagePct}
                color="cyan"
              />
              <MetricCard
                label="GPU 0 (VRAM)"
                value="41.2 GB"
                unit="/ 48 GB"
                detail="RTX 6000 Ada"
                percent={Math.round((systemMetrics.gpu0.vramUsedGB / systemMetrics.gpu0.vramTotalGB) * 100)}
                color="amber"
              />
              <MetricCard
                label="System RAM"
                value="84.6 GB"
                unit="/ 256 GB"
                detail="ECC DDR5"
                percent={Math.round((systemMetrics.memory.usedGB / systemMetrics.memory.totalGB) * 100)}
                color="cyan"
              />
              <MetricCard
                label="Vector DB"
                value="4.2 ms"
                detail="pgvector Vault"
                percent={20}
                color="emerald"
              />
            </div>

            {/* Recharts: Inference Latency & Token Velocity */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-mono">Inference Throughput & Compute Load (Last 7 Hours)</span>
                <span className="font-mono text-cyan-400">Tokens/Sec vs Latency (ms)</span>
              </div>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeriesMetrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="tokenGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="gpuGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
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
                    <Area
                      type="monotone"
                      dataKey="tokens"
                      stroke="#06b6d4"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#tokenGlow)"
                      name="Tokens/sec"
                    />
                    <Area
                      type="monotone"
                      dataKey="gpu"
                      stroke="#f59e0b"
                      strokeWidth={1.5}
                      fillOpacity={1}
                      fill="url(#gpuGlow)"
                      name="GPU Utilization %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Recent Industrial Activity */}
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-[#0d131f] border border-slate-800 shadow-lg h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
                    Recent Activity
                  </h2>
                </div>
                <button
                  onClick={() => navigate('/audit-logs')}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Audit Trail</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-3.5">
                {recentActivities.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.id}
                      className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-${act.color}-500/10 border border-${act.color}-500/30 text-${act.color}-400 flex-shrink-0 mt-0.5`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-slate-200 truncate">
                              {act.title}
                            </span>
                            <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                              {act.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                            {act.detail}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick System Verification Banner */}
            <div className="mt-4 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Air-Gap Integrity Check</span>
              </span>
              <span className="text-emerald-400 font-semibold">PASSED</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
