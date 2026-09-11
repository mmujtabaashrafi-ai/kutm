import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold shadow-glow-cyan border border-cyan-400/50',
  secondary: 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700 shadow-sm',
  emerald: 'bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold shadow-glow-emerald border border-emerald-400/40',
  outline: 'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-slate-700 hover:border-slate-500',
  danger: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30',
  ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 border border-transparent'
};

const sizes = {
  sm: 'text-xs px-2.5 py-1.5 rounded gap-1.5',
  md: 'text-sm px-3.5 py-2 rounded-lg gap-2',
  lg: 'text-base px-5 py-2.5 rounded-lg gap-2.5'
};

export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  icon: Icon,
  iconRight: IconRight,
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none ${variants[variant] || variants.secondary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
      {IconRight && !loading && <IconRight className="w-4 h-4 flex-shrink-0" />}
    </button>
  );
}
