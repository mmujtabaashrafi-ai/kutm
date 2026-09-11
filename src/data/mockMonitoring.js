export const systemMetrics = {
  cpu: {
    model: "AMD EPYC 9654 (96 Cores, 192 Threads)",
    usagePct: 34.2,
    temperature: 48.5,
    frequency: "2.80 GHz",
    coresActive: 96
  },
  gpu0: {
    name: "NVIDIA RTX 6000 Ada (48GB GDDR6)",
    utilizationPct: 86.4,
    vramUsedGB: 41.2,
    vramTotalGB: 48.0,
    temperature: 61.2,
    powerWatts: 285,
    role: "Primary vLLM LLM Engine + Embeddings"
  },
  gpu1: {
    name: "NVIDIA RTX 6000 Ada (48GB GDDR6)",
    utilizationPct: 44.1,
    vramUsedGB: 22.8,
    vramTotalGB: 48.0,
    temperature: 54.0,
    powerWatts: 190,
    role: "Secondary Code LLM + Reranker"
  },
  memory: {
    usedGB: 84.6,
    totalGB: 256.0,
    type: "ECC DDR5 4800 MHz",
    cachedGB: 62.1
  },
  storage: {
    usedTB: 2.4,
    totalTB: 8.0,
    type: "RAID-10 Enterprise NVMe Gen5",
    readSpeed: "4,200 MB/s",
    writeSpeed: "3,800 MB/s"
  },
  vectorDb: {
    name: "pgvector On-Premise Cluster",
    vectorsCount: 18420,
    indexType: "HNSW (M=16, efConstruction=128)",
    avgLatencyMs: 4.2,
    status: "Healthy / Synchronized"
  },
  inference: {
    avgLatencyMs: 385,
    p95LatencyMs: 580,
    p99LatencyMs: 890,
    tokensPerSec: 48.6,
    totalTokensToday: 1482900,
    queueDepth: 0
  }
};

export const timeSeriesMetrics = [
  { time: "14:00", cpu: 28, gpu: 72, vram: 38.4, tokens: 42, latency: 410, requests: 18 },
  { time: "15:00", cpu: 32, gpu: 78, vram: 39.1, tokens: 45, latency: 395, requests: 24 },
  { time: "16:00", cpu: 45, gpu: 91, vram: 42.0, tokens: 52, latency: 440, requests: 38 },
  { time: "17:00", cpu: 38, gpu: 84, vram: 40.8, tokens: 49, latency: 380, requests: 31 },
  { time: "18:00", cpu: 29, gpu: 65, vram: 38.0, tokens: 38, latency: 360, requests: 19 },
  { time: "19:00", cpu: 35, gpu: 82, vram: 41.0, tokens: 47, latency: 390, requests: 28 },
  { time: "20:00", cpu: 34, gpu: 86, vram: 41.2, tokens: 48, latency: 385, requests: 34 }
];

export const agentExecutionRate = [
  { time: "08:00", maintenance: 45, safety: 22, operations: 58 },
  { time: "10:00", maintenance: 88, safety: 35, operations: 92 },
  { time: "12:00", maintenance: 62, safety: 40, operations: 75 },
  { time: "14:00", maintenance: 94, safety: 48, operations: 110 },
  { time: "16:00", maintenance: 120, safety: 65, operations: 135 },
  { time: "18:00", maintenance: 85, safety: 39, operations: 90 },
  { time: "20:00", maintenance: 68, safety: 28, operations: 74 }
];
