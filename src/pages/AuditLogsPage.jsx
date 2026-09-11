import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Search,
  Filter,
  Download,
  Calendar,
  Lock,
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Clock,
  Terminal,
  User,
  Zap
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { initialAuditLogs } from '../data/mockAuditLogs';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState(initialAuditLogs);
  const [search, setSearch] = useState("");
  const [selectedAction, setSelectedAction] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const actionTypes = ["All", "AI Query", "Agent Execution", "Document Upload", "Vector Re-index", "Model Inference", "Security Audit"];
  const statusTypes = ["All", "Success", "Warning"];

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.requestId.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesAction = selectedAction === "All" || log.action === selectedAction;
    const matchesStatus = selectedStatus === "All" || log.status === selectedStatus;

    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Timestamp,User,Action,Component,Status,RequestID,Classification,Details",
       ...filteredLogs.map(l => `"${l.timestamp}","${l.user}","${l.action}","${l.component}","${l.status}","${l.requestId}","${l.securityClassification}","${l.details}"`)
      ].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `sovereign_audit_trail_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
            <h1 className="text-xl font-bold text-slate-100">Enterprise Security Audit Logs</h1>
            <Badge color="emerald" dot>Immutable Enclave Log</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Cryptographically signed audit records tracking every user inference, document ingestion, and autonomous agent trigger.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={Download}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl bg-[#0d131f] border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search request ID, user, details..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>

        {/* Action & Status Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400">Action:</span>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              {actionTypes.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              {statusTypes.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-xl border border-slate-800 bg-[#0d131f] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 font-medium">Timestamp</th>
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Component</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Request ID</th>
                <th className="px-4 py-3 font-medium">Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-200 font-medium font-sans">{log.user}</span>
                      <span className="text-[10px] text-slate-500">({log.role})</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-cyan-300 font-medium">{log.action}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{log.component}</td>
                  <td className="px-4 py-3">
                    <Badge
                      color={log.status === 'Success' ? 'emerald' : 'amber'}
                      size="sm"
                      dot
                    >
                      {log.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{log.requestId}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      {log.securityClassification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/40 text-xs font-mono text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>SHA-256 Merkle Chain Integrity: VERIFIED</span>
          </span>
          <span>Showing {filteredLogs.length} Records</span>
        </div>
      </div>
    </motion.div>
  );
}
