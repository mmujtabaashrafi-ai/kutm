import React from 'react';

export default function MetricCard({
  label,
  value,
  unit = '',
  detail,
  percent,
  color = 'cyan',
  className = ''
}) {
  const barColors = {
    cyan: 'bg-cyan-400',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400',
    red: 'bg-red-400'
  };

  return (
    <div className={`p-4 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700/60 transition-colors ${className}`}>
      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
        <span>{label}</span>
        {detail && <span className="font-mono text-slate-500">{detail}</span>}
      </div>
      <div className="flex items-baseline gap-1 my-1">
        <span className="text-xl font-bold font-telemetry text-slate-100">{value}</span>
        {unit && <span className="text-xs font-mono text-slate-400">{unit}</span>}
      </div>
      {typeof percent === 'number' && (
        <div className="mt-2.5">
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barColors[color] || barColors.cyan}`}
              style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
            <span>Utilization</span>
            <span>{percent}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
