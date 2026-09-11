export const ragPipelineStages = [
  {
    id: "stage-docs",
    name: "Documents",
    step: 1,
    category: "Ingestion",
    status: "Active",
    color: "cyan",
    icon: "FileText",
    summary: "8 Industrial PDFs (164.9 MB)",
    description: "Raw plant technical manuals, engineering specs, P&ID diagrams, and standard operating procedures.",
    metrics: {
      "Total Documents": "8 files",
      "Total Storage": "164.9 MB",
      "Supported Types": "PDF, OCR Scans, CSV, P&ID CAD Notes",
      "Air-Gapped Vault": "Encrypted AES-256 local RAID-10"
    },
    samplePayload: {
      source: "Pump Maintenance Manual.pdf",
      totalPages: 148,
      parser: "PyPDF + Tesseract 5.3 OCR Local Engine"
    }
  },
  {
    id: "stage-proc",
    name: "Processing",
    step: 2,
    category: "Sanitization & OCR",
    status: "Active",
    color: "cyan",
    icon: "Cpu",
    summary: "Layout Parser & Text Extraction",
    description: "Extracts tabular engineering specs, cleans OCR artifacts, and extracts mathematical formulas & diagrams.",
    metrics: {
      "OCR Engine": "Tesseract 5.3 Local",
      "Table Extraction": "Camelot / Tabula Engine",
      "Latency / Page": "18 ms avg",
      "Accuracy Score": "99.2%"
    },
    samplePayload: {
      extractedSections: 34,
      tablesParsed: 18,
      cleanStatus: "Zero cloud OCR dependency"
    }
  },
  {
    id: "stage-chunk",
    name: "Chunking",
    step: 3,
    category: "Segmentation",
    status: "Active",
    color: "cyan",
    icon: "Scissors",
    summary: "Recursive Splitter (512 tokens)",
    description: "Splits technical manuals along semantic section boundaries with sliding context overlap.",
    metrics: {
      "Chunk Size": "512 Tokens (~380 words)",
      "Overlap": "64 Tokens (~48 words)",
      "Strategy": "RecursiveCharacterTextSplitter",
      "Total Active Chunks": "18,420 chunks"
    },
    samplePayload: {
      chunkId: "chk-8842-b",
      length: "488 tokens",
      metadata: {
        document: "Pump Maintenance Manual.pdf",
        section: "4.2: Vibration Velocity Thresholds",
        page: 42
      }
    }
  },
  {
    id: "stage-embed",
    name: "Embeddings",
    step: 4,
    category: "Vectorization",
    status: "Active",
    color: "emerald",
    icon: "Layers",
    summary: "bge-large-en-v1.5 (1024-dim)",
    description: "Calculates dense high-dimensional semantic vectors locally on GPU 0 Tensor Cores.",
    metrics: {
      "Model": "BAAI/bge-large-en-v1.5",
      "Vector Dimension": "1,024 Dimensions",
      "Throughput": "1,450 chunks / sec",
      "Precision": "FP16 TensorCore Optimized"
    },
    samplePayload: {
      vectorPreview: "[0.0421, -0.1982, 0.0812, 0.3129, -0.0045, ... 1024 floats]",
      normalization: "L2 Norm = 1.000"
    }
  },
  {
    id: "stage-vdb",
    name: "Vector Database",
    step: 5,
    category: "Indexing",
    status: "Active",
    color: "emerald",
    icon: "Database",
    summary: "Local pgvector (HNSW index)",
    description: "Stores vector embeddings and metadata in local PostgreSQL instance with hierarchical navigable small-world index.",
    metrics: {
      "Engine": "PostgreSQL 16 + pgvector",
      "Index Strategy": "HNSW (M=16, efConstruction=128)",
      "Distance Metric": "Cosine Distance",
      "Search Latency": "4.2 ms avg"
    },
    samplePayload: {
      totalStored: "18,420 vectors",
      indexSizeOnDisk: "84.2 MB",
      replication: "Local Standby Node-02"
    }
  },
  {
    id: "stage-retrieval",
    name: "Retrieval & Rerank",
    step: 6,
    category: "Hybrid Search",
    status: "Active",
    color: "amber",
    icon: "Search",
    summary: "Dense + BM25 + Cross-Encoder",
    description: "Performs hybrid reciprocal rank fusion and passes top 25 candidates to local Cross-Encoder reranker.",
    metrics: {
      "Top-K Initial": "25 candidate chunks",
      "Top-K Final": "3 high-confidence chunks",
      "Reranker Model": "bge-reranker-large",
      "Cutoff Threshold": "Similarity >= 0.85"
    },
    samplePayload: {
      query: "Why is Pump P-101 showing abnormal vibration?",
      topCandidateScore: 0.974,
      rerankLatency: "14 ms"
    }
  },
  {
    id: "stage-llm",
    name: "Local Sovereign LLM",
    step: 7,
    category: "Synthesis",
    status: "Active",
    color: "emerald",
    icon: "Sparkles",
    summary: "Llama-3-70B (Air-Gapped vLLM)",
    description: "Synthesizes final diagnostic answer conditioned strictly on retrieved engineering context with zero hallucination.",
    metrics: {
      "Model": "Llama-3-70B-Instruct-Q4_K_M",
      "Engine": "vLLM 0.6.2 (Local GPU 0)",
      "Context Used": "2,410 / 131,072 tokens",
      "Generation Speed": "48.6 tokens / sec"
    },
    samplePayload: {
      temperature: 0.2,
      groundedCheck: "100% facts backed by cited manuals",
      airGapped: "True (zero outbound WAN connection)"
    }
  }
];
