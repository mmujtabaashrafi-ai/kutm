import { initialMessages, initialSessions } from '../data/mockChat';
import { initialDocuments } from '../data/mockDocuments';
import { initialAgents, mockAgentExecutionTrace } from '../data/mockAgents';
import { initialModels } from '../data/mockModels';
import { initialAuditLogs } from '../data/mockAuditLogs';
import { systemMetrics, timeSeriesMetrics } from '../data/mockMonitoring';

// Utility delay for realistic local inference feel
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApiService = {
  // Chat Services
  async getSessions() {
    await delay(120);
    return [...initialSessions];
  },

  async getMessages(sessionId) {
    await delay(150);
    return [...initialMessages];
  },

  async sendChatMessage(sessionId, prompt) {
    await delay(450); // Simulate local model inference time

    // Generate intelligent industrial response based on prompt
    const isPumpQuestion = prompt.toLowerCase().includes('pump') || prompt.toLowerCase().includes('vibration');
    const isSafetyQuestion = prompt.toLowerCase().includes('safety') || prompt.toLowerCase().includes('h2s') || prompt.toLowerCase().includes('hazmat');

    let responseText = "";
    let sources = [];

    if (isPumpQuestion) {
      responseText = `Based on current SCADA telemetry and **Pump Maintenance Manual Section 4.2**, the root cause is high-frequency harmonic energy at **148 Hz (6X running speed)**. This corresponds to the **BPFO outer race defect frequency** on bearing SKF 7314.

### Recommendations:
1. Schedule immediate transition to Standby Pump P-102.
2. Verify hot laser coupling alignment to eliminate 2X misalignment harmonics.
3. Pull lube oil sample for spectrographic wear-metal analysis.`;

      sources = [
        {
          id: "src-1",
          title: "Pump Maintenance Manual.pdf",
          section: "Sec 4.2 - ISO 10816 Vibration Limits",
          page: 42,
          similarity: 0.974,
          chunkId: "chk-8842-b",
          excerpt: "ISO 10816-3 Zone C (4.5 to 7.1 mm/s) requires corrective maintenance within 48h. Values above 7.1 mm/s require immediate shutdown."
        },
        {
          id: "src-2",
          title: "Equipment Specification - Centrifugal Pump P-101.pdf",
          section: "Sec 2.1 - Bearing Specs",
          page: 14,
          similarity: 0.948,
          chunkId: "chk-1102-a",
          excerpt: "SKF 7314 BEP angular contact bearing defect multiplier: BPFO = 6.02X, BPFI = 8.98X."
        }
      ];
    } else if (isSafetyQuestion) {
      responseText = `According to **Safety Procedures - HazMat & H2S Protocol**, any detectable H2S concentration above **10 ppm** requires immediate evacuation of the primary perimeter and deployment of Level B SCBA gear.

### Mandatory Protocols:
1. Sound plant evacuation horn (Code Yellow).
2. Activate fixed deluge water spray curtain at Column D-104.
3. Verify wind sock orientation: Must muster upwind at Assembly Area B.`;

      sources = [
        {
          id: "src-haz-1",
          title: "Safety Procedures - HazMat & H2S Protocol.pdf",
          section: "Section 3.1: Toxic Gas Threshold Actions",
          page: 18,
          similarity: 0.985,
          chunkId: "chk-2901-a",
          excerpt: "PEL for Hydrogen Sulfide is 10 ppm 8-hour TWA; Ceiling limit is 20 ppm. Evacuation mandatory at >10 ppm continuous."
        }
      ];
    } else {
      responseText = `Diagnostic analysis completed by **Llama-3-70B** on-premise inference engine.

Referencing the plant repository of 8 indexed manuals and 18,420 vectorized chunks:
- Telemetry setpoints verify normal range across 94% of monitored nodes.
- Local vector distance scoring returned top matches with 92.6% mean confidence.
- All calculations executed in air-gapped sovereign enclave with 0ms WAN transmission.`;

      sources = [
        {
          id: "src-gen-1",
          title: "Operations Guide - Hydrocracker Unit.pdf",
          section: "General Operating Parameters",
          page: 12,
          similarity: 0.926,
          chunkId: "chk-0044-c",
          excerpt: "Standard operating pressure envelope must remain within 142 bar +/- 3.5 bar under continuous closed-loop control."
        }
      ];
    }

    return {
      id: `msg-${Date.now()}`,
      sender: "ai",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: "Llama-3-70B-Instruct-Q4_K_M",
      inferenceTime: `${Math.floor(340 + Math.random() * 80)}ms`,
      confidence: 97.8,
      tokensPerSec: 48.6,
      sovereignMode: "On-Premise (Air-Gapped)",
      content: responseText,
      sources
    };
  },

  // Agent Services
  async getAgents() {
    await delay(100);
    return [...initialAgents];
  },

  async runAgent(agentId) {
    await delay(300);
    return {
      ...mockAgentExecutionTrace,
      executionId: `EXEC-${Math.floor(10000 + Math.random() * 89999)}-SOV`,
      timestamp: new Date().toLocaleString()
    };
  },

  // Document Services
  async getDocuments() {
    await delay(120);
    return [...initialDocuments];
  },

  async uploadDocument(doc) {
    await delay(400);
    return {
      id: `doc-${Date.now()}`,
      name: doc.name || "Uploaded Document.pdf",
      type: "PDF",
      category: "Technical Manual",
      size: `${(Math.random() * 20 + 5).toFixed(1)} MB`,
      status: "Indexed",
      chunks: Math.floor(Math.random() * 300 + 100),
      embedder: "bge-large-en-v1.5",
      vectorDim: 1024,
      uploadedAt: new Date().toISOString().split('T')[0],
      author: "Local Engineering Team",
      securityTier: "Plant Confidential",
      checksum: `sha256-${Math.random().toString(36).substring(2, 10)}`
    };
  },

  // Models Services
  async getModels() {
    await delay(100);
    return [...initialModels];
  },

  // Audit Logs Services
  async getAuditLogs() {
    await delay(120);
    return [...initialAuditLogs];
  },

  // Monitoring Services
  async getMonitoringData() {
    await delay(100);
    return {
      metrics: systemMetrics,
      timeSeries: timeSeriesMetrics
    };
  }
};
