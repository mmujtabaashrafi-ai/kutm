import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sliders,
  Shield,
  Lock,
  Cpu,
  Database,
  Bell,
  HardDrive,
  EyeOff,
  Server,
  AlertTriangle,
  CheckCircle2,
  Terminal,
  Save
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Security");
  const [savedToast, setSavedToast] = useState(false);

  // Settings State
  const [dataProcessingMode, setDataProcessingMode] = useState("ON-PREMISE");
  const [externalCloudAi, setExternalCloudAi] = useState(false);
  const [vllmEndpoint, setVllmEndpoint] = useState("http://127.0.0.1:8000/v1");
  const [vectorEndpoint, setVectorEndpoint] = useState("postgresql://localhost:5432/pgvector_vault");
  const [auditRetentionDays, setAuditRetentionDays] = useState(365);
  const [autoLockoutMinutes, setAutoLockoutMinutes] = useState(15);
  const [enableScadaSync, setEnableScadaSync] = useState(true);

  const tabs = [
    { id: "Security", label: "Security & Air-Gap", icon: Shield },
    { id: "General", label: "General", icon: Sliders },
    { id: "Model", label: "Model Runtime", icon: Cpu },
    { id: "Privacy", label: "Data Privacy", icon: EyeOff },
    { id: "Notifications", label: "SCADA Alerts", icon: Bell },
    { id: "System", label: "System Hardware", icon: Server },
  ];

  const handleSave = () => {
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
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
            <h1 className="text-xl font-bold text-slate-100">Enclave Governance & System Settings</h1>
            <Badge color="emerald" dot>Air-Gap Strict Mode</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Configure sovereign execution policies, local model endpoints, encryption at rest, and firewall enforcement rules.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Save}
          onClick={handleSave}
        >
          Save Configuration
        </Button>
      </div>

      {savedToast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Sovereign Enclave configuration saved and applied to local daemon.</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-mono">OK</span>
        </div>
      )}

      {/* Main Settings Panel */}
      <div className="rounded-2xl border border-slate-800 bg-[#0d131f] shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Vertical Navigation */}
        <div className="w-full md:w-60 bg-[#09101d] border-b md:border-b-0 md:border-r border-slate-800 p-3 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Content */}
        <div className="flex-1 p-6 space-y-6">
          {activeTab === "Security" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  Sovereignty & Air-Gap Enforcement
                </h2>
                <p className="text-xs text-slate-400">
                  Critical operational controls governing network boundaries and telemetry protection.
                </p>
              </div>

              {/* Requirement: Data Processing Mode ON-PREMISE */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    Data Processing Mode
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                    Forces all tensor operations, embeddings, and chat memory to remain within the physical plant perimeter.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                    ON-PREMISE (ENFORCED)
                  </span>
                </div>
              </div>

              {/* Requirement: External Cloud AI DISABLED */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-200 block">
                    External Cloud AI Access (OpenAI, Anthropic, Gemini APIs)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                    Blocks all outbound socket requests to external generative AI endpoints via hardware firewall.
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 border border-red-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" />
                    DISABLED
                  </span>
                </div>
              </div>

              {/* Additional Security Controls */}
              <div className="space-y-4 pt-2 border-t border-slate-800">
                <h3 className="text-xs font-mono font-semibold text-slate-300 uppercase">
                  Encryption & Access Protocol
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase block">Storage Encryption</span>
                    <span className="text-emerald-400 font-bold mt-1 block">AES-256-GCM (Hardware NVMe)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-slate-500 text-[10px] uppercase block">In-Transit TLS</span>
                    <span className="text-cyan-400 font-bold mt-1 block">TLS 1.3 (Internal SCADA Loop)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Model" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  Local Inference Endpoints
                </h2>
                <p className="text-xs text-slate-400">
                  Configure local loopback URLs for vLLM, Ollama, or llama.cpp backend instances.
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-slate-300 mb-1">Primary vLLM OpenAI-Compatible Endpoint</label>
                  <input
                    type="text"
                    value={vllmEndpoint}
                    onChange={(e) => setVllmEndpoint(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">pgvector Storage URI</label>
                  <input
                    type="text"
                    value={vectorEndpoint}
                    onChange={(e) => setVectorEndpoint(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "General" && (
            <div className="space-y-4 text-xs">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  Plant Workbench General Preferences
                </h2>
                <p className="text-slate-400">
                  Control room interface settings and operator session persistence.
                </p>
              </div>

              <div className="space-y-3 font-mono">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div>
                    <span className="text-slate-200 font-bold">Auto-Lockout Inactive Terminal</span>
                    <p className="text-[11px] text-slate-500">Require engineer smart-badge re-authentication</p>
                  </div>
                  <select
                    value={autoLockoutMinutes}
                    onChange={(e) => setAutoLockoutMinutes(Number(e.target.value))}
                    className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs"
                  >
                    <option value={5}>5 Minutes</option>
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Privacy" && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  Data Privacy & Telemetry Masking
                </h2>
                <p className="text-slate-400 font-sans">
                  Ensure all refinery telemetry logs and P&ID metadata are scrubbed of sensitive engineer PII.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Shield className="w-4 h-4" />
                  <span>Air-Gapped Privacy Enclave Active</span>
                </div>
                <p className="text-slate-400 leading-relaxed font-sans text-xs">
                  Zero prompt histories or technical schematics leave this physical server rack. No external analytics, tracking pixels, or diagnostic telemetry are transmitted.
                </p>
              </div>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="space-y-4 text-xs">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  SCADA Alarm Dispatch & Thresholds
                </h2>
                <p className="text-slate-400">
                  Configure autonomous agent push alerts when equipment reaches ISO 10816 Zone C/D limits.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono">
                <div>
                  <span className="text-slate-200 font-bold">Real-Time SCADA Alarm Webhook</span>
                  <p className="text-[11px] text-slate-500">Forward autonomous work orders to DCS console</p>
                </div>
                <input
                  type="checkbox"
                  checked={enableScadaSync}
                  onChange={(e) => setEnableScadaSync(e.target.checked)}
                  className="w-4 h-4 accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeTab === "System" && (
            <div className="space-y-4 text-xs font-mono">
              <div>
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-wider font-mono mb-1">
                  Host Hardware Specifications
                </h2>
                <p className="text-slate-400 font-sans">
                  Current hardware assignment in Rack Enclave A-04.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Host Server:</span>
                  <span>Supermicro AS-4125GS-TNRT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processor:</span>
                  <span>AMD EPYC 9654 (96-Cores, 192-Threads)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Accelerators:</span>
                  <span>2x NVIDIA RTX 6000 Ada Generation (96 GB Total VRAM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Storage:</span>
                  <span>8 TB NVMe RAID-10 (Direct Storage I/O)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Network Interface:</span>
                  <span>Dual 25GbE SFP28 (Isolated Plant DCS Subnet)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
