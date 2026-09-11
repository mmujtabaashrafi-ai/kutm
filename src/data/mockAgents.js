export const initialAgents = [
  {
    id: "agent-maint",
    name: "Maintenance Agent",
    status: "Active",
    statusColor: "emerald",
    badge: "Autonomous Loop",
    purpose: "Analyzes equipment issues, vibration spectral telemetry, and maintenance procedures.",
    description: "Monitors 342 rotating machines, flags ISO 10816 velocity anomalies, and automatically generates structured SAP-PM work order recommendations.",
    tools: [
      "Vibration Spectral Analyzer (FFT)",
      "ISO 10816 Correlator",
      "SKF Bearing Catalog DB",
      "SAP PM Work-Order Generator"
    ],
    lastExecution: "3 mins ago",
    totalExecutions: 1482,
    successRate: "99.4%",
    avgLatency: "410ms",
    modelBackbone: "Llama-3-70B-Instruct-Q4",
    hardwareTarget: "Node-01 (RTX 6000 Ada)"
  },
  {
    id: "agent-safety",
    name: "Safety Agent",
    status: "Ready",
    statusColor: "cyan",
    badge: "Air-Gapped",
    purpose: "Monitors OSHA/HSE compliance, chemical hazards, and permit-to-work protocols.",
    description: "Evaluates Hot Work and Confined Space permits, models toxic vapor dispersion, and correlates lower-explosive-limit (LEL) gas sensor alarms.",
    tools: [
      "OSHA 1910 Compliance Auditor",
      "HazMat Dispersion Estimator",
      "Toxic Gas Sensor SCADA Hook",
      "LOTO Lockout Validator"
    ],
    lastExecution: "14 mins ago",
    totalExecutions: 874,
    successRate: "100%",
    avgLatency: "340ms",
    modelBackbone: "Llama-3-70B-Instruct-Q4",
    hardwareTarget: "Node-01 (RTX 6000 Ada)"
  },
  {
    id: "agent-ops",
    name: "Operations Agent",
    status: "Ready",
    statusColor: "cyan",
    badge: "Air-Gapped",
    purpose: "Optimizes throughput, pressure differentials, and automated DCS setpoints.",
    description: "Detects column delta-P bottlenecks in real time, suggests optimal reflux ratios, and prevents compressor surge under variable ambient temperatures.",
    tools: [
      "DCS Setpoint Optimizer",
      "Aspen HYSYS Model Reader",
      "Mass-Balance Calculator",
      "Compressor Surge Limit Estimator"
    ],
    lastExecution: "1 hour ago",
    totalExecutions: 2190,
    successRate: "98.9%",
    avgLatency: "460ms",
    modelBackbone: "Qwen-2.5-Coder-32B",
    hardwareTarget: "Node-02 (RTX 6000 Ada)"
  },
  {
    id: "agent-diag",
    name: "Predictive Diagnostics Agent",
    status: "Active",
    statusColor: "emerald",
    badge: "Real-Time Telemetry",
    purpose: "Correlates thermal imaging, acoustic emission, and MTBF forecasts.",
    description: "Performs continuous Weibull reliability curve degradation tracking across critical refinery pumps, steam turbines, and reciprocating compressors.",
    tools: [
      "FLIR Thermal Image Parser",
      "Acoustic Emission FFT Hook",
      "Weibull Reliability Model",
      "SCADA Time-Series Stream"
    ],
    lastExecution: "Just now",
    totalExecutions: 612,
    successRate: "99.8%",
    avgLatency: "295ms",
    modelBackbone: "Llama-3-70B-Instruct-Q4",
    hardwareTarget: "Node-01 (RTX 6000 Ada)"
  }
];

export const mockAgentExecutionTrace = {
  agentId: "agent-maint",
  agentName: "Maintenance Agent",
  targetAsset: "Centrifugal Pump P-101 (Cracking Feed)",
  timestamp: "2026-09-09 20:30:14 IST",
  executionId: "EXEC-88942-SOV",
  steps: [
    {
      step: 1,
      title: "Telemetry Ingestion & Pre-Processing",
      status: "completed",
      duration: "45ms",
      detail: "Retrieved 1,024 samples from SCADA accelerometer channel ACC-101-DE. Calculated RMS velocity = 8.4 mm/s at 1,480 RPM."
    },
    {
      step: 2,
      title: "Fast Fourier Transform (FFT) Spectral Analysis",
      status: "completed",
      duration: "62ms",
      detail: "Detected dominant spectral spike at 148 Hz (6.02X). Correlated with SKF 7314 BEP bearing outer ring defect harmonic (BPFO)."
    },
    {
      step: 3,
      title: "Local Vector Database RAG Retrieval",
      status: "completed",
      duration: "88ms",
      detail: "Queried pgvector vault for 'ISO 10816-3 Category II velocity limits' and 'Pump P-101 Bearing Overhaul SOP'. 3 relevant chunks retrieved."
    },
    {
      step: 4,
      title: "Sovereign LLM Chain-of-Thought Synthesis",
      status: "completed",
      duration: "185ms",
      detail: "Local Llama-3-70B generated failure probability score: 91.2% bearing fatigue spalling, 14.8% angular misalignment."
    },
    {
      step: 5,
      title: "Action Item & Work Order Draft Generation",
      status: "completed",
      duration: "30ms",
      detail: "Generated SAP PM draft #WO-88412. Flagged immediate duty switchover to Standby Pump P-102. Notified Shift Lead."
    }
  ]
};
