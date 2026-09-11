import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Zap,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  RefreshCw,
  Server,
  Layers,
  Settings,
  ShieldCheck,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { initialModels } from '../data/mockModels';

export default function ModelsPage() {
  const [models, setModels] = useState(initialModels);
  const [activeModel, setActiveModel] = useState(initialModels[0]);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [tempValue, setTempValue] = useState(0.2);
  const [topPValue, setTopPValue] = useState(0.9);

  const handleMakePrimary = (model) => {
    setModels(
      models.map((m) => ({
        ...m,
        isPrimary: m.id === model.id,
        status: m.id === model.id ? 'Running' : m.type.includes('Embed') ? 'Running' : 'Standby'
      }))
    );
    setActiveModel({ ...model, isPrimary: true });
  };

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
            <h1 className="text-xl font-bold text-slate-100">On-Premise Model Registry</h1>
            <Badge color="emerald" dot>vLLM 0.6.2 Engine Active</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Local quantized autoregressive LLMs and vector embedding transformers executing strictly on refinery hardware.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge color="cyan" size="sm">
            Hardware: Dual RTX 6000 Ada (96 GB GDDR6)
          </Badge>
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {models.map((model) => (
          <div
            key={model.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between shadow-xl relative overflow-hidden ${
              model.isPrimary
                ? 'bg-gradient-to-br from-[#0d1628] to-[#0a111f] border-cyan-500/40 shadow-glow-cyan'
                : 'bg-[#0d131f] border-slate-800 hover:border-slate-700/80'
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl border ${model.isPrimary ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-100">
                        {model.name}
                      </h2>
                      {model.isPrimary && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                          PRIMARY LLM
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {model.type} • {model.runtime}
                    </p>
                  </div>
                </div>

                <Badge
                  color={model.status === 'Running' ? 'emerald' : 'slate'}
                  dot
                  pulse={model.status === 'Running'}
                >
                  {model.status}
                </Badge>
              </div>

              {/* Hardware Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">Parameters</span>
                  <span className="text-slate-200 font-semibold">{model.parameters}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">Quantization</span>
                  <span className="text-cyan-400 font-semibold">{model.quantization}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">Context Window</span>
                  <span className="text-slate-200 font-semibold">{model.contextWindow}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">Tokens / Sec</span>
                  <span className="text-amber-400 font-semibold">{model.tokensPerSec}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">VRAM Usage</span>
                  <span className="text-slate-200 font-semibold">{model.vramUsage}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800/80">
                  <span className="text-slate-500 text-[10px] uppercase block">RAM Allocation</span>
                  <span className="text-slate-200 font-semibold">{model.ramUsage}</span>
                </div>
              </div>

              {/* Target GPU / Enclave */}
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span>Target: {model.targetGpu}</span>
                </span>
                <span className="text-emerald-400 font-medium">Air-Gapped Enclave</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveModel(model);
                  setTempValue(model.temperature);
                  setTopPValue(model.topP);
                  setConfigModalOpen(true);
                }}
                className="text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Configure Hyperparameters</span>
              </button>

              {!model.isPrimary && !model.type.includes('Embed') && !model.type.includes('Rerank') && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleMakePrimary(model)}
                >
                  Set as Primary
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Model Hyperparameters Configuration Modal */}
      <Modal
        isOpen={configModalOpen}
        onClose={() => setConfigModalOpen(false)}
        title={`Hyperparameters: ${activeModel?.name}`}
        subtitle="On-premise inference sampling parameters"
        icon={Sliders}
      >
        <div className="space-y-4 text-xs font-mono">
          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Temperature (Creativity vs Determinism):</span>
              <span className="text-cyan-400 font-bold">{tempValue}</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="1.0"
              step="0.05"
              value={tempValue}
              onChange={(e) => setTempValue(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
            <span className="text-[10px] text-slate-500">
              Lower (0.1 - 0.2) recommended for ISO standards and engineering troubleshooting.
            </span>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1">
              <span>Top-P Nucleus Sampling:</span>
              <span className="text-cyan-400 font-bold">{topPValue}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="1.0"
              step="0.05"
              value={topPValue}
              onChange={(e) => setTopPValue(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">System Instructions Enclave Prompt</label>
            <textarea
              rows={3}
              defaultValue={activeModel?.systemPrompt}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Air-Gapped Sovereign Guarantee:</span>
            </span>
            <p>Parameters apply instantly to local vLLM workers without restarting model weights in VRAM.</p>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <Button variant="secondary" onClick={() => setConfigModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setConfigModalOpen(false);
              }}
            >
              Apply to Engine
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
