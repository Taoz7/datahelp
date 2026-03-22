import { useState, type KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function ChatInput({ onSend, disabled, isLoading }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-dark-600 bg-dark-800/50 backdrop-blur-sm flex-shrink-0">
      <div className="flex gap-3 max-w-3xl mx-auto">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你的数据查询问题..."
          disabled={disabled || isLoading}
          className="flex-1 px-4 py-2.5 bg-dark-700 border border-dark-500 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled || isLoading}
          className="px-5 py-2.5 bg-accent hover:bg-accent-dark disabled:bg-dark-500 disabled:cursor-not-allowed text-white rounded-xl text-sm font-medium transition-all flex items-center gap-2 shadow-lg shadow-accent/20 disabled:shadow-none"
        >
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Send size={16} />
          )}
          发送
        </button>
      </div>
    </div>
  );
}
