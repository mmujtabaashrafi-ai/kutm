import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Files,
  Bot,
  Network,
  Cpu,
  Activity,
  ShieldCheck,
  Sliders,
  ShieldAlert,
  Server,
  Lock,
  Radio
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Overview', icon: LayoutDashboard },
  { path: '/chat', label: 'AI Chat', icon: MessageSquare, badge: 'Live' },
  { path: '/documents', label: 'Documents', icon: Files },
  { path: '/agents', label: 'Agents', icon: Bot, badge: '4 Active' },
  { path: '/knowledge', label: 'Knowledge', icon: Network },
  { path: '/models', label: 'Models', icon: Cpu },
  { path: '/monitoring', label: 'Monitoring', icon: Activity },
  { path: '/audit-logs', label: 'Audit Logs', icon: ShieldCheck },
  { path: '/settings', label: 'Settings', icon: Sliders },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-[#080d17] border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div>
          <div className="h-16 px-5 flex items-center gap-3 border-b border-slate-800/80 bg-slate-950/40">
            <div className="relative p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 border border-cyan-500/40 text-cyan-400">
              <Lock className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-widest text-slate-100 uppercase">SOVEREIGN</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">v2.4</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-tight">Industrial AI Workbench</p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
              Command Core
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[inset_0_0_12px_rgba(6,182,212,0.15)]'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sovereign Mode Footer Indicator */}
        <div className="p-3 m-3 rounded-xl bg-[#0b121e] border border-emerald-500/20 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider font-mono">
                Sovereign Mode
              </span>
            </div>
            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              AIR-GAPPED
            </span>
          </div>

          <div className="space-y-1 text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3 text-slate-400" />
                <span>Host Enclave</span>
              </span>
              <span className="text-slate-300">Node-01 (Dual RTX)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-slate-400" />
                <span>Ext. Telemetry</span>
              </span>
              <span className="text-emerald-400 font-semibold">0% (Blocked)</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
