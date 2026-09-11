export const initialSessions = [
  {
    id: "session-1",
    title: "Pump P-101 Vibration Diagnostics",
    timestamp: "10 mins ago",
    system: "Cracking Unit - Hydrocarbon Feed",
    status: "Active",
    messageCount: 4
  },
  {
    id: "session-2",
    title: "Cracking Unit #2 Overpressure Protocol",
    timestamp: "1 hour ago",
    system: "FCC Reactor Loop",
    status: "Resolved",
    messageCount: 6
  },
  {
    id: "session-3",
    title: "HazMat Protocol: H2S Gas Leak in Desulfurizer",
    timestamp: "3 hours ago",
    system: "Desulfurization Unit D-104",
    status: "Flagged",
    messageCount: 8
  },
  {
    id: "session-4",
    title: "Compressor C-302 Lube Oil Thermal Drift",
    timestamp: "Yesterday",
    system: "Syngas Loop Compression",
    status: "Resolved",
    messageCount: 5
  }
];

export const initialMessages = [
  {
    id: "msg-1",
    sender: "user",
    timestamp: "10:24 AM",
    content: "Why is Pump P-101 showing abnormal vibration? Telemetry shows overall RMS peak at 8.4 mm/s at 1,480 RPM."
  },
  {
    id: "msg-2",
    sender: "ai",
    timestamp: "10:24 AM",
    model: "Llama-3-70B-Instruct-Q4_K_M",
    inferenceTime: "384ms",
    confidence: 98.4,
    tokensPerSec: 49.2,
    sovereignMode: "On-Premise (Air-Gapped)",
    content: `Based on the plant maintenance documentation and real-time SCADA telemetry for **Centrifugal Feed Pump P-101**, the reported overall RMS vibration of **8.4 mm/s** breaches the standard operational threshold and falls squarely into **ISO 10816-3 Zone C (Unrestricted Long-Term Operation Not Permitted)**.

### Primary Diagnostic Findings:

1. **Spectral Peak Correlation (148 Hz - 6X Running Speed)**:
   - The primary energy concentration occurs at **148 Hz**, matching the calculated **Ball Pass Frequency Outer Race (BPFO)** for the installed **SKF 7314 BEP** angular contact bearing.
   - Harmonic sidebands spaced at running speed (24.6 Hz / 1,480 RPM) indicate localized spalling or raceway fatigue on the drive-end bearing.

2. **Coupling Alignment & Thermal Expansion**:
   - Secondary peak observed at **2X shaft frequency (49.2 Hz)** with elevated axial component (3.1 mm/s), indicating possible angular misalignment induced by thermal pipe strain from the suction line pre-heater bypass.

3. **Cavitation & Net Positive Suction Head (NPSH)**:
   - Baseline suction pressure is currently 2.8 bar (NPSHa = 4.2m vs NPSHr = 3.6m). High-frequency acoustic carpet between 2 kHz - 8 kHz indicates minor incipient vapor cavitation during peak throughput.

### Recommended Corrective Actions:

- [ ] **Immediate**: Switch operational duty to Standby Pump **P-102** via DCS Sequence #04.
- [ ] **LOTO Procedure**: Issue Work Order **WO-88412** to Mechanical Maintenance for Drive-End (DE) bearing inspection.
- [ ] **Torque & Alignment**: Measure hot alignment offsets across the Falk disc coupling using laser tool before cold drawdown.
- [ ] **Lube Oil Analysis**: Draw 250ml sample from bearing reservoir to inspect for metallic particulate (Fe/Cu contamination) and ISO cleanliness code.`,
    sources: [
      {
        id: "src-1",
        title: "Pump Maintenance Manual.pdf",
        section: "Section 4.2: Vibration Velocity Thresholds (ISO 10816-3)",
        page: 42,
        similarity: 0.974,
        chunkId: "chk-8842-b",
        excerpt: "For Category II Rigid Support Centrifugal Pumps (>15kW), overall RMS velocity exceeding 4.5 mm/s represents Zone B warning; values exceeding 7.1 mm/s fall into Zone C requiring corrective turnaround within 48 hours."
      },
      {
        id: "src-2",
        title: "Equipment Specification - Centrifugal Pump P-101.pdf",
        section: "Section 2.1: Bearing Configuration & Defect Frequencies",
        page: 14,
        similarity: 0.948,
        chunkId: "chk-1102-a",
        excerpt: "Pump P-101 is fitted with drive-end deep groove bearing SKF 6314 and non-drive end duplex angular contact pair SKF 7314 BEP. Calculated defect multipliers at 1X: BPFO = 6.02X, BPFI = 8.98X, BSF = 2.44X, FTF = 0.41X."
      },
      {
        id: "src-3",
        title: "Operations Guide - Hydrocracker Unit.pdf",
        section: "SOP-PMP-019: Standby Transfer Protocol",
        page: 89,
        similarity: 0.912,
        chunkId: "chk-5419-f",
        excerpt: "When primary feed pump P-101 exhibits severe vibration or seal differential alarm, prime and bring P-102 to operating temperature with recirculation valve cracked 15% before cross-isolation."
      }
    ]
  }
];

export const quickPromptPresets = [
  "Why is Pump P-101 showing abnormal vibration?",
  "Check ISO 10816 Zone C limits for centrifugal pumps",
  "Generate LOTO work order checklist for bearing replacement",
  "Compare suction pressure NPSHa against cavitation limits",
  "Review HazMat safety precautions for H2S desulfurizer loop"
];
