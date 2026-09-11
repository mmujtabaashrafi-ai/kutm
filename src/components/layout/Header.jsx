import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Menu,
  Shield,
  Cpu,
  Database,
  Terminal,
  UserCheck,
  Zap
} from 'lucide-react';
import Badge from '../common/Badge';

const routeTitles = {
  '/': { title: 'Plant Operations Overview', subtitle: 'Real-time telemetry & sovereign AI status' },
  '/chat': { title: 'AI Engineering Chat', subtitle: 'Air-gapped Llama-3-70B industrial diagnostic assistant' },
  '/documents': { title: 'Plant Documentation & P&ID Vault', subtitle: 'Local encrypted technical repository' },
  '/agents': { title: 'Autonomous Agent Fleet', subtitle: 'Maintenance, HSE Safety & DCS operations daemons' },
  '/knowledge': { title: 'Knowledge Architecture & RAG Flow', subtitle: 'End-to-end vector pipeline telemetry' },
  '/models': { title: 'On-Premise Model Registry', subtitle: 'Local vLLM / AWQ quantized inference engine' },
  '/monitoring': { title: 'Hardware & Enclave Telemetry', subtitle: 'AMD EPYC + Dual NVIDIA RTX 6000 Ada health' },
  '/audit-logs': { title: 'Enterprise Security Audit Trail', subtitle: 'Tamper-evident sovereign access logs' },
  '/settings': { title: 'Enclave Security & System Settings', subtitle: 'Air-gap firewall & local storage parameters' },
};

export default function Header({ onMenuClick }) {
  const location = useLocation();
  const current = routeTitles[location.pathname] || {
    title: 'Sovereign AI Workbench',
    subtitle: 'Industrial Plant Operations Enclave'
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#080d17]/90 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-6 flex items-center justify-between">
      {/* Left side: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-sm lg:text-base font-semibold text-slate-100 tracking-tight flex items-center gap-2">
            <span>{current.title}</span>
          </h1>
          <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
            {current.subtitle}
          </p>
        </div>
      </div>

      {/* Right side: Hardware & Sovereignty Indicators */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Air-gap Shield Badge */}
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono text-emerald-300 font-medium">AIR-GAPPED</span>
        </div>

        {/* Local Inference Speed */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-mono text-slate-300">
            <span className="text-amber-400 font-semibold font-telemetry">48.6</span> t/s
          </span>
        </div>

        {/* Vector DB Latency */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-slate-300">
            pgvector <span className="text-cyan-400 font-semibold font-telemetry">4.2ms</span>
          </span>
        </div>

        {/* User Identity Chip */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center justify-center text-cyan-400 font-mono text-xs font-bold shadow-inner">
            EK
          </div>
          <div className="hidden xl:block text-left">
            <div className="text-xs font-medium text-slate-200 leading-none">Eng. Kulkarni</div>
            <div className="text-[10px] font-mono text-slate-400 mt-0.5">Reliability Lead</div>
          </div>
        </div>
      </div>
    </header>
  );
}
