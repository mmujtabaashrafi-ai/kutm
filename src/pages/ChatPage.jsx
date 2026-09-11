import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  Bot,
  Layers,
  Terminal,
  RefreshCw,
  SlidersHorizontal,
  ChevronRight,
  PanelLeftClose,
  PanelRightClose
} from 'lucide-react';
import ConversationHistory from '../components/chat/ConversationHistory';
import ChatMessage from '../components/chat/ChatMessage';
import SourcePanel from '../components/chat/SourcePanel';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { initialMessages, initialSessions, quickPromptPresets } from '../data/mockChat';
import { mockApiService } from '../services/mockApiService';

export default function ChatPage() {
  const [sessions, setSessions] = useState(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState("session-1");
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeSources, setActiveSources] = useState(initialMessages[1]?.sources || []);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || isTyping) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await mockApiService.sendChatMessage(activeSessionId, text);
      setMessages((prev) => [...prev, response]);
      if (response.sources && response.sources.length > 0) {
        setActiveSources(response.sources);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewSession = () => {
    const newSession = {
      id: `session-${Date.now()}`,
      title: `Engineering Session #${sessions.length + 1}`,
      timestamp: 'Just now',
      system: 'General Plant Enclave',
      status: 'Active',
      messageCount: 0
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newSession.id);
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        model: 'Llama-3-70B-Instruct-Q4_K_M',
        inferenceTime: '120ms',
        confidence: 100,
        sovereignMode: 'On-Premise (Air-Gapped)',
        content: `Sovereign AI diagnostic session initialized. All telemetry and manual queries are processed locally on **Dual NVIDIA RTX 6000 Ada** hardware without network egress.\n\nHow may I assist with equipment diagnostics, P&ID specifications, or plant safety protocols?`,
        sources: []
      }
    ]);
    setActiveSources([]);
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] rounded-2xl border border-slate-800 bg-[#070b12] overflow-hidden flex flex-col shadow-2xl">
      {/* Workspace Subheader */}
      <div className="h-11 px-4 border-b border-slate-800/80 bg-[#09101d] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={() => setLeftOpen(!leftOpen)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors hidden md:block"
            title="Toggle Sessions"
          >
            <PanelLeftClose className={`w-3.5 h-3.5 ${!leftOpen ? 'rotate-180 text-cyan-400' : ''}`} />
          </button>
          <span className="text-slate-400">Model:</span>
          <span className="text-cyan-400 font-semibold">Llama-3-70B-Instruct-Q4_K_M</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Engine:</span>
          <span className="text-slate-300">vLLM 0.6.2</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge color="emerald" dot>AIR-GAPPED INFERENCE</Badge>
          <button
            onClick={() => setRightOpen(!rightOpen)}
            className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors hidden lg:block"
            title="Toggle Sources"
          >
            <PanelRightClose className={`w-3.5 h-3.5 ${!rightOpen ? 'rotate-180 text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* 3-Column Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Conversation History */}
        {leftOpen && (
          <div className="w-72 flex-shrink-0 hidden md:block">
            <ConversationHistory
              sessions={sessions}
              activeSessionId={activeSessionId}
              onSelectSession={setActiveSessionId}
              onNewSession={handleNewSession}
            />
          </div>
        )}

        {/* Center Column: Chat Stream & Message Input */}
        <div className="flex-1 flex flex-col bg-[#070b12] overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4">
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                onSelectSources={(srcs) => {
                  setActiveSources(srcs);
                  setRightOpen(true);
                }}
              />
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800 text-xs font-mono text-cyan-400"
              >
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>Synthesizing answer from local pgvector vault (Llama-3-70B)...</span>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-[#090f1a] border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] scrollbar-none">
            <span className="text-slate-500 font-mono whitespace-nowrap flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Presets:</span>
            </span>
            {quickPromptPresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(preset)}
                className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors hover:border-cyan-500/40 text-[11px]"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Message Composer */}
          <div className="p-3 bg-[#0d131f] border-t border-slate-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2"
            >
              {/* Attachment Placeholder */}
              <button
                type="button"
                title="Attach plant document/telemetry log"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Text Input */}
              <div className="flex-1 relative">
                <textarea
                  rows={2}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about equipment vibration, ISO thresholds, P&ID specs, or safe operating envelopes..."
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 resize-none font-sans leading-relaxed"
                />
              </div>

              {/* Voice Placeholder */}
              <button
                type="button"
                title="Voice input (Whisper on-premise placeholder)"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Send Button */}
              <Button
                type="submit"
                variant="primary"
                disabled={!inputText.trim() || isTyping}
                loading={isTyping}
                className="h-[42px] px-4 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Right Column: Context & Sources Panel */}
        {rightOpen && (
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <SourcePanel sources={activeSources} />
          </div>
        )}
      </div>
    </div>
  );
}
