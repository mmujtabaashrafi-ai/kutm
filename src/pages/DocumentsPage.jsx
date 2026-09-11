import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Files,
  UploadCloud,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  HardDrive,
  Eye,
  RefreshCw,
  Trash2,
  Plus,
  Shield,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import { initialDocuments } from '../data/mockDocuments';
import { mockApiService } from '../services/mockApiService';

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [inspectDoc, setInspectDoc] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadName, setUploadName] = useState("");

  const categories = ["All", "Equipment Manual", "HSE / Compliance", "Engineering Specs", "Standard Operating Procedures", "Instrumentation"];

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === "All" || doc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleSimulatedUpload = async (e) => {
    e.preventDefault();
    if (!uploadName.trim()) return;

    setIsUploading(true);
    try {
      const newDoc = await mockApiService.uploadDocument({ name: uploadName });
      setDocuments([newDoc, ...documents]);
      setUploadName("");
      setIsUploadOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
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
            <h1 className="text-xl font-bold text-slate-100">Document Management & P&ID Vault</h1>
            <Badge color="emerald" dot>Encrypted Ingestion</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Local vector repository indexing plant engineering manuals, hazardous chemical procedures, and ISO maintenance standards.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            icon={UploadCloud}
            onClick={() => setIsUploadOpen(true)}
          >
            Upload Document
          </Button>
        </div>
      </div>

      {/* Drag & Drop Upload Zone Preview */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          setIsUploadOpen(true);
        }}
        onClick={() => setIsUploadOpen(true)}
        className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-2 ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-slate-800 bg-[#0d131f]/60 hover:border-slate-700 hover:bg-[#0f1728]'
        }`}
      >
        <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <span className="text-sm font-semibold text-slate-200">
            Drag & Drop Plant Documents or click to upload
          </span>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            Supported formats: PDF, P&ID CAD Notes, Scanned TIFF, CSV Telemetry logs • Up to 250 MB
          </p>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            Auto-chunking: 512 tokens
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
            Embedder: bge-large-en (1024-dim)
          </span>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search documents, P&ID tags, authors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/90 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="rounded-xl border border-slate-800 bg-[#0d131f] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">Document Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Size</th>
                <th className="px-4 py-3 font-medium">Chunks</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Security</th>
                <th className="px-4 py-3 font-medium">Upload Date</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDocs.map((doc) => (
                <tr
                  key={doc.id}
                  className="hover:bg-slate-800/30 transition-colors group"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded bg-slate-900 border border-slate-800 text-cyan-400 flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-semibold text-slate-200 block truncate group-hover:text-cyan-300 transition-colors">
                          {doc.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 truncate block">
                          {doc.author} • {doc.checksum}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-medium">{doc.category}</td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono">{doc.size}</td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-cyan-400 font-medium">
                      {doc.chunks}
                    </span>
                    <span className="text-[10px] text-slate-500 ml-1">chunks</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge
                      color={doc.status === 'Indexed' ? 'emerald' : 'amber'}
                      dot
                      pulse={doc.status === 'Processing'}
                    >
                      {doc.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                      {doc.securityTier}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-mono">{doc.uploadedAt}</td>
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setInspectDoc(doc)}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 transition-colors"
                        title="Inspect Vector Chunks"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          alert(`Triggered re-indexing on ${doc.name} (Simulated)`);
                        }}
                        className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                        title="Re-index Vector Embeddings"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Document Chunks Modal */}
      <Modal
        isOpen={!!inspectDoc}
        onClose={() => setInspectDoc(null)}
        title={inspectDoc?.name || "Document Inspection"}
        subtitle={`Vectorized via ${inspectDoc?.embedder} (${inspectDoc?.vectorDim}-dim)`}
        icon={Layers}
      >
        {inspectDoc && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 font-mono text-[10px] uppercase">Chunks</span>
                <p className="text-base font-bold text-cyan-400 font-mono mt-0.5">{inspectDoc.chunks}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 font-mono text-[10px] uppercase">Security</span>
                <p className="text-xs font-bold text-slate-200 font-mono mt-0.5">{inspectDoc.securityTier}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 font-mono text-[10px] uppercase">Storage</span>
                <p className="text-xs font-bold text-slate-200 font-mono mt-0.5">{inspectDoc.size}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                <span className="text-slate-500 font-mono text-[10px] uppercase">Status</span>
                <p className="text-xs font-bold text-emerald-400 font-mono mt-0.5">{inspectDoc.status}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                Sample Vectorized Chunks from pgvector Vault
              </span>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Chunk #1 (Tokens 0-512)</span>
                  <span>ID: chk-{inspectDoc.id}-01</span>
                </div>
                <p className="text-slate-200 italic font-sans">
                  "Equipment operation boundary parameters: Maximum allowable continuous casing vibration shall not exceed 4.5 mm/s RMS under rated load. Mechanical seal barrier fluid pressure must maintain 1.5 bar delta over stuffing box."
                </p>
                <div className="text-[10px] text-cyan-400 pt-1">
                  Vector Preview: [0.0381, -0.1492, 0.0821, 0.4410 ... 1024 dimensions]
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-1">
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>Chunk #2 (Tokens 448-960 with 64-token overlap)</span>
                  <span>ID: chk-{inspectDoc.id}-02</span>
                </div>
                <p className="text-slate-200 italic font-sans">
                  "LOTO Disconnect Sequence: Verify isolation of breaker 4160V-MCC-2B. Open bypass line V-104 before venting suction strainer. Tag with Lockout #44891 and conduct zero-energy verification."
                </p>
                <div className="text-[10px] text-cyan-400 pt-1">
                  Vector Preview: [-0.0124, 0.2819, 0.0041, -0.1983 ... 1024 dimensions]
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="secondary" onClick={() => setInspectDoc(null)}>
                Close Inspector
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Upload Document Modal */}
      <Modal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title="Upload Document to Sovereign Vault"
        subtitle="Automatic OCR, semantic chunking & pgvector indexing"
        icon={UploadCloud}
      >
        <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Document File Name
            </label>
            <input
              type="text"
              required
              value={uploadName}
              onChange={(e) => setUploadName(e.target.value)}
              placeholder="e.g. Centrifugal Compressor Overhaul SOP.pdf"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">
              Document Category
            </label>
            <select className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500">
              <option>Equipment Manual</option>
              <option>HSE / Compliance</option>
              <option>Engineering Specs</option>
              <option>Standard Operating Procedures</option>
              <option>Instrumentation</option>
            </select>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 space-y-1 text-[11px] font-mono">
            <div className="text-slate-300 font-semibold">On-Premise Ingestion Pipeline:</div>
            <div>• OCR: Tesseract 5.3 Local Engine (Zero cloud)</div>
            <div>• Chunking: 512 tokens with 64 overlap</div>
            <div>• Embeddings: bge-large-en-v1.5 on GPU 0</div>
            <div>• Storage: AES-256 encrypted local NVMe RAID</div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => setIsUploadOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              loading={isUploading}
              icon={UploadCloud}
            >
              {isUploading ? "Chunking & Vectorizing..." : "Ingest Document"}
            </Button>
          </div>
        </form>
      </Modal>
    </motion.div>
  );
}
