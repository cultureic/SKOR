import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useSession } from '../hooks/Nebulahook.jsx';  // adjust path as needed

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hi, I'm your AI Skor assistant, powered by Nebula (Thirdweb). I'm here to help you understand your on-chain activity. Feel free to ask me anything!",
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    session,
    createSession,
    loading: sessionLoading,
    error: sessionError,
    sendMessage,
    chatLoading,
    chatError,
  } = useSession();

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize Nebula session once
  useEffect(() => {
    createSession({ title: 'Skor Chat Session' }).catch(console.error);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // show typing indicator
    setIsTyping(true);

    try {
      const data = await sendMessage({
        message: userMsg.content,
        stream: false,
      });

      // nebula returns `message` field for assistant text
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      // on error, show it as an assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          content: `Error: ${err.message}`,
          sender: 'assistant',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (sessionLoading) {
    return <div className="p-4">Starting chat session…</div>;
  }
  if (sessionError) {
    return <div className="p-4 text-red-500">Session error: {sessionError.message}</div>;
  }

  return (
    <div
      className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden h-96 flex flex-col"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-medium">Chat Yourself</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 max-w-[80%] rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }} />
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Ask about your Web3 activity..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 rounded-l-lg border-y border-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || chatLoading}
            className="p-2 rounded-r-lg border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        {chatError && <div className="mt-2 text-red-500">Chat error: {chatError.message}</div>}
      </div>
    </div>
  );
}
