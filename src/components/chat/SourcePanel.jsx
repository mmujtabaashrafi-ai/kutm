import React from 'react';
import { BookOpen, FileText, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function SourcePanel({ sources = [], activeMessageModel }) {
  return (
    <div className="h-full flex flex-col bg-[#0b121e] border-l border-slate-800/80">
      <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
            Grounding Sources & Citations
          </h3>
        </div>
        <Badge color="emerald" size="sm">
          {sources.length} Verified
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {sources.length === 0 ? (
          <div className="h-48 flex flex-col items-center justify-center text-center p-4 text-slate-500 text-xs">
            <FileText className="w-8 h-8 text-slate-700 mb-2" />
            <span>Select or generate an AI response to inspect retrieved technical manuals.</span>
          </div>
        ) : (
          sources.map((src, idx) => (
            <div
              key={src.id || idx}
              className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs space-y-2 group"
            >
              <div className="flex items-start justify-between gap-1">
                <div className="flex items-center gap-1.5 font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                  <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span className="truncate">{src.title}</span>
                </div>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 whitespace-nowrap">
                  {(src.similarity * 100).toFixed(1)}% match
                </span>
              </div>

              <div className="text-[11px] text-slate-400 flex items-center gap-2 font-mono">
                <span>Page {src.page}</span>
                <span>•</span>
                <span className="truncate">{src.section}</span>
              </div>

              <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-300 font-serif leading-relaxed italic border-l-2 border-l-cyan-500">
                "{src.excerpt}"
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span>Vector: {src.chunkId}</span>
                <span className="text-cyan-400 group-hover:underline flex items-center gap-0.5 cursor-pointer">
                  <span>Inspect Chunk</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sovereign Verification Guarantee Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/60 text-[10px] font-mono text-slate-400 space-y-1">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ZERO-HALLUCINATION ENFORCEMENT</span>
        </div>
        <p className="text-slate-500 leading-tight">
          All responses conditioned on verified local pgvector chunks with cosine similarity cutoff &gt;= 0.85.
        </p>
      </div>
    </div>
  );
}
