
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
    ImageIcon,
    FileUp,
    Figma,
    MonitorIcon,
    CircleUserRound,
    ArrowUpIcon,
    Paperclip,
    PlusIcon,
} from "lucide-react";

interface UseAutoResizeTextareaProps {
    minHeight: number;
    maxHeight?: number;
}

function useAutoResizeTextarea({
    minHeight,
    maxHeight,
}: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current;
            if (!textarea) return;

            if (reset) {
                textarea.style.height = `${minHeight}px`;
                return;
            }

            // Temporarily shrink to get the right scrollHeight
            textarea.style.height = `${minHeight}px`;

            // Calculate new height
            const newHeight = Math.max(
                minHeight,
                Math.min(
                    textarea.scrollHeight,
                    maxHeight ?? Number.POSITIVE_INFINITY
                )
            );

            textarea.style.height = `${newHeight}px`;
        },
        [minHeight, maxHeight]
    );

    useEffect(() => {
        // Set initial height
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = `${minHeight}px`;
        }
    }, [minHeight]);

    // Adjust height on window resize
    useEffect(() => {
        const handleResize = () => adjustHeight();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [adjustHeight]);

    return { textareaRef, adjustHeight };
}

interface ChatMessage {
    id: string;
    content: string;
    sender: 'user' | 'agent';
    timestamp: Date;
}

interface V0AIChatProps {
    messages: ChatMessage[];
    agentName: string;
    onSendMessage: (message: string) => void;
    isTyping: boolean;
}

export function V0AIChat({ messages, agentName, onSendMessage, isTyping }: V0AIChatProps) {
    const [value, setValue] = useState("");
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (value.trim()) {
            onSendMessage(value);
            setValue("");
            adjustHeight(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex",
                            message.sender === 'user' ? "justify-end" : "justify-start"
                        )}
                    >
                        <div className={cn(
                            "max-w-[80%] rounded-xl p-4 shadow",
                            message.sender === 'user' 
                                ? "bg-[#818fff] text-white rounded-tr-none" 
                                : "glass rounded-tl-none"
                        )}>
                            <div className="flex items-center mb-2">
                                {message.sender === 'agent' ? (
                                    <div className="w-6 h-6 rounded-full bg-ai-purple/20 flex items-center justify-center mr-2">
                                        <CircleUserRound className="w-3 h-3 text-ai-purple" />
                                    </div>
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center ml-2">
                                        <CircleUserRound className="w-3 h-3 text-white" />
                                    </div>
                                )}
                                <span className="font-medium text-sm">
                                    {message.sender === 'user' ? 'Tu' : agentName}
                                </span>
                            </div>
                            <p className="text-sm">{message.content}</p>
                            <div className="text-right mt-1">
                                <span className="text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex">
                        <div className="glass rounded-xl p-3 shadow rounded-tl-none">
                            <div className="flex space-x-2 items-center">
                                <div className="w-6 h-6 rounded-full bg-ai-purple/20 flex items-center justify-center">
                                    <CircleUserRound className="w-3 h-3 text-ai-purple" />
                                </div>
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-ai-gray/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                    <div className="w-2 h-2 bg-ai-gray/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                    <div className="w-2 h-2 bg-ai-gray/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-ai-dark/80 backdrop-blur-md border-t border-gray-800">
                <div className="relative bg-ai-darkblue/70 rounded-xl border border-gray-800">
                    <div className="overflow-y-auto">
                        <Textarea
                            ref={textareaRef}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                adjustHeight();
                            }}
                            onKeyDown={handleKeyDown}
                            placeholder="Scrivi un messaggio..."
                            className={cn(
                                "w-full px-4 py-3",
                                "resize-none",
                                "bg-transparent",
                                "border-none",
                                "text-white text-sm",
                                "focus:outline-none",
                                "focus-visible:ring-0 focus-visible:ring-offset-0",
                                "placeholder:text-neutral-500 placeholder:text-sm",
                                "min-h-[60px]"
                            )}
                            style={{
                                overflow: "hidden",
                            }}
                        />
                    </div>

                    <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="group p-2 hover:bg-neutral-800 rounded-lg transition-colors flex items-center gap-1"
                            >
                                <Paperclip className="w-4 h-4 text-white" />
                                <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
                                    Allega
                                </span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                className="px-2 py-1 rounded-lg text-sm text-zinc-400 transition-colors border border-dashed border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Progetto
                            </button>
                            <button
                                type="button"
                                onClick={handleSendMessage}
                                className={cn(
                                    "px-1.5 py-1.5 rounded-lg text-sm transition-colors border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-800 flex items-center justify-between gap-1",
                                    value.trim()
                                        ? "bg-[#818fff] text-white"
                                        : "text-zinc-400"
                                )}
                            >
                                <ArrowUpIcon
                                    className={cn(
                                        "w-4 h-4",
                                        value.trim()
                                            ? "text-white"
                                            : "text-zinc-400"
                                    )}
                                />
                                <span className="sr-only">Invia</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center gap-3 mt-4 overflow-x-auto pb-2">
                    <ActionButton
                        icon={<ImageIcon className="w-4 h-4" />}
                        label="Condividi screenshot"
                    />
                    <ActionButton
                        icon={<FileUp className="w-4 h-4" />}
                        label="Carica un file"
                    />
                    <ActionButton
                        icon={<CircleUserRound className="w-4 h-4" />}
                        label="Informazioni personali"
                    />
                </div>
            </div>
        </div>
    );
}

interface ActionButtonProps {
    icon: React.ReactNode;
    label: string;
}

function ActionButton({ icon, label }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-ai-darkblue/50 hover:bg-ai-darkblue/80 rounded-full border border-gray-800 text-gray-400 hover:text-white transition-colors whitespace-nowrap"
        >
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}
