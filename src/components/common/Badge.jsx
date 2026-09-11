import React from 'react';

const colorStyles = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  red: 'bg-red-500/10 text-red-400 border-red-500/30',
  slate: 'bg-slate-800/80 text-slate-300 border-slate-700',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

const dotColors = {
  emerald: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]',
  cyan: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
  amber: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
  red: 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]',
  slate: 'bg-slate-400',
  purple: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]',
};

export default function Badge({ 
  children, 
  color = 'slate', 
  dot = false, 
  pulse = false,
  size = 'md',
  className = '' 
}) {
  const sizeClasses = size === 'sm' 
    ? 'text-xs px-2 py-0.5' 
    : 'text-xs px-2.5 py-1';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium border rounded-md font-mono ${colorStyles[color] || colorStyles.slate} ${sizeClasses} ${className}`}>
      {dot && (
        <span className={`inline-block w-1.5 h-1.5 rounded-full ${dotColors[color] || dotColors.slate} ${pulse ? 'animate-pulse' : ''}`} />
      )}
      {children}
    </span>
  );
}
