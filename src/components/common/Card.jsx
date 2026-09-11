import React from 'react';

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  glow = false,
  header,
  footer,
  ...props
}) {
  return (
    <div
      className={`relative bg-[#0d131f]/90 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200 ${
        hoverEffect ? 'hover:border-slate-700 hover:bg-[#11192a]' : ''
      } ${glow ? 'shadow-glow-cyan' : 'shadow-lg'} ${className}`}
      {...props}
    >
      {header && (
        <div className="px-5 py-4 border-b border-slate-800/80 bg-slate-900/40 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && (
        <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-900/30 text-xs text-slate-400">
          {footer}
        </div>
      )}
    </div>
  );
}
