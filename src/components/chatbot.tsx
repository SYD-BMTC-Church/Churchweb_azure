"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Send, X, User } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Small AI Church Assistant icon (hexagon + cross)
function ChurchAIIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M12 6V18M8 10H16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6" r="1.2" fill="currentColor" />
    </svg>
  );
}

// Soft pop sound using Web Audio API
function playPopSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(440, audioContext.currentTime + 0.1);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
  } catch {
    // Silently fail if audio isn't available
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! Welcome to Bethel Mar Thoma Church Sydney. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [newMessageIndex, setNewMessageIndex] = useState(-1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-open chat after 3 seconds (only on desktop)
  useEffect(() => {
    const isDesktop = window.innerWidth >= 640;
    if (isDesktop) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        setShowPulse(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200);
  }, []);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setNewMessageIndex(updatedMessages.length - 1);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post("/api/chat", {
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      });

      setMessages((prev) => {
        setNewMessageIndex(prev.length);
        return [...prev, { role: "assistant", content: response.data.message }];
      });
      playPopSound();
    } catch {
      setMessages((prev) => {
        setNewMessageIndex(prev.length);
        return [
          ...prev,
          {
            role: "assistant",
            content: "Sorry, I'm having trouble connecting right now. Please try again later or contact the church directly.",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {/* Tooltip */}
        <div className="text-sm text-primary font-medium px-2 py-1 animate-fade-slide-up">
          <span>✝️ Church Assistant</span>
        </div>
        {/* Chat button */}
        <div className="relative">
          {showPulse && (
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
          )}
          <Button
            onClick={() => {
              setIsOpen(true);
              setShowPulse(false);
            }}
            className="relative h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary to-primary/80 hover:scale-110 active:scale-95 transition-all duration-200"
            size="icon"
            aria-label="Open chat"
          >
            <ChurchAIIcon size={28} className="text-white" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed z-50 transition-all duration-200 
        bottom-0 right-0 w-full h-full
        sm:bottom-6 sm:right-6 sm:w-[420px] sm:h-auto
        ${isClosing ? "opacity-0 translate-y-4 scale-95" : "animate-chat-open"}`}
    >
      <div className="bg-white dark:bg-zinc-900 sm:rounded-2xl shadow-2xl border border-border flex flex-col h-full sm:h-[520px] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/85 px-5 py-4 flex items-center justify-between shrink-0 sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <ChurchAIIcon size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">Church Assistant</h3>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <p className="text-white/70 text-xs">AI Powered</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20 transition-colors"
            onClick={handleClose}
            aria-label="Close chat"
          >
            <X size={18} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-muted/30">
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"} ${
                  i >= newMessageIndex ? "animate-message-slide-in" : ""
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <ChurchAIIcon size={14} className="text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md shadow-md"
                      : "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-border/50 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <User size={14} className="text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 justify-start animate-message-slide-in">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <ChurchAIIcon size={14} className="text-primary" />
                </div>
                <div className="bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border border-border/50">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Quick suggestions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 border-t border-border/50 bg-white dark:bg-zinc-900 shrink-0">
            <div className="flex flex-wrap gap-1.5">
              {["Service times", "Contact vicar", "How to donate"].map((suggestion, i) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className={`text-xs px-3 py-1.5 rounded-full border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-200 animate-fade-slide-up-delay-${i + 1}`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="px-4 py-3 border-t border-border bg-white dark:bg-zinc-900 shrink-0 sm:rounded-b-2xl">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              disabled={isLoading}
              className="flex-1 rounded-full border-border/60 bg-muted/40 focus-visible:ring-primary/30 transition-shadow"
              aria-label="Type your message"
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 active:scale-90 transition-all duration-150 shrink-0"
              aria-label="Send message"
            >
              <Send size={16} className="text-white" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Powered by AI • Responses may not always be accurate
          </p>
        </div>
      </div>
    </div>
  );
}
