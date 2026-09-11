import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bot,
  Play,
  CheckCircle2,
  Clock,
  Shield,
  Activity,
  Cpu,
  Wrench,
  AlertTriangle,
  FileCheck,
  ChevronRight,
  Terminal,
  Zap,
  Sliders,
  Check
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { initialAgents, mockAgentExecutionTrace } from '../data/mockAgents';
import { mockApiService } from '../services/mockApiService';

export default function AgentsPage() {
  const [agents, setAgents] = useState(initialAgents);
  const [executingAgent, setExecutingAgent] = useState(null);
  const [executionTrace, setExecutionTrace] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);

  const handleRunAgent = async (agent) => {
    setExecutingAgent(agent);
    setExecutionTrace(null);
    setIsExecuting(true);
    setExecutionStep(1);

    // Simulate animated step-by-step reasoning chain
    setTimeout(() => setExecutionStep(2), 600);
    setTimeout(() => setExecutionStep(3), 1200);
    setTimeout(() => setExecutionStep(4), 1800);
    setTimeout(() => setExecutionStep(5), 2400);

    setTimeout(async () => {
      const trace = await mockApiService.runAgent(agent.id);
      setExecutionTrace(trace);
      setIsExecuting(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold text-slate-100">Autonomous Agent Fleet</h1>
            <Badge color="emerald" dot>4 Daemons Online</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Dedicated on-premise industrial agents executing continuous health loops, safety audits, and setpoint optimizations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge color="cyan" size="sm">
            Hardware: Node-01 (RTX 6000 Ada)
          </Badge>
        </div>
      </div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="p-5 rounded-xl bg-[#0d131f] border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden group"
          >
            <div className="space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                      <span>{agent.name}</span>
                    </h2>
                    <p className="text-[11px] text-cyan-400 font-mono mt-0.5">
                      {agent.purpose}
                    </p>
                  </div>
                </div>

                <Badge
                  color={agent.status === 'Active' ? 'emerald' : 'cyan'}
                  dot
                  pulse={agent.status === 'Active'}
                >
                  {agent.status}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-400 leading-relaxed">
                {agent.description}
              </p>

              {/* Tools Section */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Equipped Tool Calling Suite:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {agent.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-900/90 text-slate-300 border border-slate-800 font-mono text-[10px]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Execution Specs */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <div>
                  <span className="text-slate-500 text-[10px] block">Last Run</span>
                  <span className="text-slate-300">{agent.lastExecution}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Total Execs</span>
                  <span className="text-slate-300">{agent.totalExecutions.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Success Rate</span>
                  <span className="text-emerald-400 font-medium">{agent.successRate}</span>
                </div>
              </div>
            </div>

            {/* Run Trigger */}
            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono text-slate-500">
                Backbone: {agent.modelBackbone}
              </span>
              <Button
                variant={agent.status === 'Active' ? 'primary' : 'secondary'}
                size="sm"
                icon={Play}
                onClick={() => handleRunAgent(agent)}
              >
                Execute Agent
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Agent Execution Simulator Modal */}
      <Modal
        isOpen={!!executingAgent}
        onClose={() => {
          if (!isExecuting) setExecutingAgent(null);
        }}
        title={`Execution Run: ${executingAgent?.name}`}
        subtitle={`Hardware Enclave: ${executingAgent?.hardwareTarget}`}
        icon={Bot}
      >
        <div className="space-y-4 text-xs">
          {/* Status banner */}
          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between font-mono">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-slate-200">
                {isExecuting ? "Executing Autonomous Decision Tree..." : "Execution Finished Successfully"}
              </span>
            </div>
            <Badge color={isExecuting ? 'amber' : 'emerald'} dot pulse={isExecuting}>
              {isExecuting ? 'Processing' : 'COMPLETED'}
            </Badge>
          </div>

          {/* Reasoning Steps Chain */}
          <div className="space-y-2.5">
            <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Step-by-Step Reasoning & Tool Invocations:
            </span>

            {mockAgentExecutionTrace.steps.map((st) => {
              const isPast = executionStep > st.step || !isExecuting;
              const isCurrent = executionStep === st.step && isExecuting;
              const isPending = executionStep < st.step && isExecuting;

              return (
                <div
                  key={st.step}
                  className={`p-3 rounded-xl border transition-all duration-200 ${
                    isCurrent
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-sm'
                      : isPast
                      ? 'bg-slate-900/80 border-slate-800'
                      : 'bg-slate-950/40 border-slate-800/40 opacity-40'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold ${
                          isPast
                            ? 'bg-emerald-500 text-slate-950'
                            : isCurrent
                            ? 'bg-cyan-400 text-slate-950 animate-pulse'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isPast ? <Check className="w-3 h-3" /> : st.step}
                      </div>
                      <span className="font-semibold text-slate-200">{st.title}</span>
                    </div>
                    {isPast && (
                      <span className="font-mono text-[10px] text-slate-500">
                        {st.duration}
                      </span>
                    )}
                  </div>

                  {(isPast || isCurrent) && (
                    <p className="text-[11px] text-slate-300 mt-2 font-mono leading-relaxed pl-7">
                      {st.detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Generated Recommendation Draft */}
          {executionTrace && (
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-2">
              <div className="flex items-center gap-2 font-bold font-mono text-xs">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>SAP PM Work Order Draft #WO-88412 Generated</span>
              </div>
              <p className="text-[11px] font-mono text-emerald-300 leading-relaxed">
                Target: Centrifugal Pump P-101 (DE Bearing SKF 7314 replacement). Standby transfer scheduled for Shift #2 turnaround.
              </p>
            </div>
          )}

          {/* Modal Actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <Button
              variant="secondary"
              disabled={isExecuting}
              onClick={() => setExecutingAgent(null)}
            >
              Close Panel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
