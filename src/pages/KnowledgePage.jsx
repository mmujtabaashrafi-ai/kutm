import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  FileText,
  Cpu,
  Scissors,
  Layers,
  Database,
  Search,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Info,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Zap,
  ChevronRight
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { ragPipelineStages } from '../data/mockPipeline';

const iconMap = {
  FileText,
  Cpu,
  Scissors,
  Layers,
  Database,
  Search,
  Sparkles
};

export default function KnowledgePage() {
  const [selectedStage, setSelectedStage] = useState(ragPipelineStages[0]);
  const [inspectModalOpen, setInspectModalOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-100">Knowledge Architecture & RAG Pipeline</h1>
            <Badge color="cyan" dot>7-Stage Telemetry</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Interactive visualization of the on-premise Retrieval-Augmented Generation lifecycle from raw technical manuals to local LLM synthesis.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
          <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span>18,420 Active Embeddings</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Visual Pipeline Diagram */}
      <div className="p-6 rounded-2xl bg-[#0d131f] border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-400">
              End-to-End Ingestion & Synthesis Flow
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              Click any stage to inspect runtime parameters
            </span>
          </div>

          {/* Desktop Flow: 7 Horizontal Connected Nodes */}
          <div className="hidden xl:grid grid-cols-7 gap-3 relative">
            {ragPipelineStages.map((stage, idx) => {
              const Icon = iconMap[stage.icon] || FileText;
              const isSelected = selectedStage?.id === stage.id;

              return (
                <div key={stage.id} className="relative flex flex-col items-center">
                  {/* Interactive Stage Card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedStage(stage)}
                    className={`w-full p-3.5 rounded-xl border text-left cursor-pointer transition-all duration-200 relative ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-glow-cyan'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-cyan-400">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">
                        0{stage.step}
                      </span>
                    </div>

                    <h2 className="text-xs font-bold text-slate-100 truncate">
                      {stage.name}
                    </h2>
                    <p className="text-[10px] font-mono text-cyan-400 mt-0.5 truncate">
                      {stage.summary}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[9px] font-mono text-slate-400">
                      <span>{stage.category}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                  </motion.div>

                  {/* Connecting Arrow (except last) */}
                  {idx < ragPipelineStages.length - 1 && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden">
                      <ArrowRight className="w-4 h-4 text-cyan-500/60" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Vertical / Mobile & Tablet Flow */}
          <div className="xl:hidden space-y-3">
            {ragPipelineStages.map((stage, idx) => {
              const Icon = iconMap[stage.icon] || FileText;
              const isSelected = selectedStage?.id === stage.id;

              return (
                <div key={stage.id} className="space-y-2">
                  <div
                    onClick={() => setSelectedStage(stage)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-400'
                        : 'bg-slate-900/80 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-100">{stage.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">Step {stage.step}</span>
                        </div>
                        <p className="text-[11px] font-mono text-cyan-400">{stage.summary}</p>
                      </div>
                    </div>

                    <Badge color="emerald" size="sm">Active</Badge>
                  </div>

                  {idx < ragPipelineStages.length - 1 && (
                    <div className="flex justify-center">
                      <ArrowDown className="w-4 h-4 text-slate-600" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Inspector for Selected Node */}
      {selectedStage && (
        <div className="p-6 rounded-2xl bg-[#0d131f] border border-slate-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>Stage 0{selectedStage.step}: {selectedStage.name} Inspector</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">{selectedStage.description}</p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              icon={Info}
              onClick={() => setInspectModalOpen(true)}
            >
              Payload JSON
            </Button>
          </div>

          {/* Metric parameters grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(selectedStage.metrics).map(([key, val]) => (
              <div key={key} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {key}
                </span>
                <span className="text-sm font-bold font-mono text-slate-200 mt-1 block">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* Sample In-Flight Payload */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>Live Enclave Execution Buffer</span>
              </span>
              <span>AES-256 Memory Bound</span>
            </div>
            <pre className="p-3 rounded-lg bg-[#070b12] border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
              {JSON.stringify(selectedStage.samplePayload, null, 2)}
            </pre>
          </div>
        </div>
      )}

      {/* Payload Inspection Modal */}
      <Modal
        isOpen={inspectModalOpen}
        onClose={() => setInspectModalOpen(false)}
        title={`Telemetry Payload: ${selectedStage?.name}`}
        subtitle="Air-gapped node runtime telemetry snapshot"
        icon={Network}
      >
        <div className="space-y-4 text-xs font-mono">
          <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 overflow-x-auto">
            {JSON.stringify({
              stageId: selectedStage?.id,
              stageName: selectedStage?.name,
              category: selectedStage?.category,
              metrics: selectedStage?.metrics,
              samplePayload: selectedStage?.samplePayload,
              timestamp: new Date().toISOString(),
              enclaveIsolation: "Zero WAN Outbound Telemetry"
            }, null, 2)}
          </pre>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setInspectModalOpen(false)}>
              Dismiss
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
