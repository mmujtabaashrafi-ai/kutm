import React, { useState } from 'react';
import { MessageSquare, Plus, Search, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ConversationHistory({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewSession
}) {
  const [search, setSearch] = useState("");

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.system.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#0b121e] border-r border-slate-800/80">
      {/* Header & New Session Button */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <button
          onClick={onNewSession}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Investigation</span>
        </button>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-md pl-8 pr-2.5 py-1 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/40"
          />
        </div>
      </div>

      {/* Session list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-500">
          Plant Sessions
        </div>
        {filtered.map((session) => {
          const isActive = session.id === activeSessionId;
          return (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left p-2.5 rounded-lg text-xs transition-all duration-150 flex flex-col gap-1 border ${
                isActive
                  ? 'bg-slate-800/90 text-slate-100 border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium truncate ${isActive ? 'text-cyan-300' : 'text-slate-200'}`}>
                  {session.title}
                </span>
                <span className="text-[10px] font-mono text-slate-500">
                  {session.timestamp}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate">{session.system}</span>
                <span className="font-mono text-[9px] px-1 py-0.2 rounded bg-slate-900 text-slate-400 border border-slate-800">
                  {session.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
