import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  User,
  Zap,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  CheckCircle2,
  FileText
} from 'lucide-react';
import Badge from '../common/Badge';

export default function ChatMessage({ message, onSelectSources }) {
  const [copied, setCopied] = React.useState(false);
  const isAi = message.sender === 'ai';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15 }}
      className={`flex gap-3 text-xs leading-relaxed ${isAi ? 'bg-slate-900/30 -mx-4 px-4 py-4 rounded-xl border border-slate-800/60' : 'py-2'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        {isAi ? (
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shadow-sm">
            <User className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Message Content & Telemetry Header */}
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">
              {isAi ? 'Sovereign Industrial Assistant' : 'Plant Engineer (You)'}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {message.timestamp}
            </span>
          </div>

          {isAi && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={copyToClipboard}
                title="Copy response"
                className="p-1 rounded text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}
        </div>

        {/* Markdown-style formatted body */}
        <div className="text-slate-300 space-y-2 text-xs font-sans whitespace-pre-line leading-relaxed selection:bg-cyan-500/30">
          {message.content}
        </div>

        {/* AI Inference Telemetry Footer */}
        {isAi && (
          <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="flex items-center gap-1 text-slate-300">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>{message.model || "Llama-3-70B"}</span>
              </span>

              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Latency: {message.inferenceTime || "384ms"}</span>
              </span>

              {message.confidence && (
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Confidence: {message.confidence}%</span>
                </span>
              )}

              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>{message.sovereignMode || "Air-Gapped Enclave"}</span>
              </span>
            </div>

            {message.sources && message.sources.length > 0 && (
              <button
                onClick={() => onSelectSources && onSelectSources(message.sources)}
                className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <FileText className="w-3 h-3" />
                <span>{message.sources.length} Grounding Sources</span>
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
