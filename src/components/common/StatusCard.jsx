import React from 'react';
import Badge from './Badge';

export default function StatusCard({
  title,
  value,
  subvalue,
  icon: Icon,
  status = 'Active',
  statusColor = 'emerald',
  trend,
  className = ''
}) {
  return (
    <div className={`relative p-5 rounded-xl bg-[#0d131f] border border-slate-800 hover:border-slate-700/80 transition-all duration-200 shadow-lg ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-cyan-400">
              <Icon className="w-4 h-4" />
            </div>
          )}
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{title}</span>
        </div>
        <Badge color={statusColor} dot pulse={statusColor === 'emerald'}>
          {status}
        </Badge>
      </div>

      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="text-2xl font-bold tracking-tight text-slate-100 font-telemetry">{value}</span>
        {trend && (
          <span className="text-xs font-mono text-emerald-400 font-medium">
            {trend}
          </span>
        )}
      </div>

      {subvalue && (
        <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
          {subvalue}
        </p>
      )}
    </div>
  );
}
