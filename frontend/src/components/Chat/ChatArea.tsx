import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useChat } from '../../hooks/useChat';
import { useSessions } from '../../hooks/useSessions';

export default function ChatArea() {
  const { messages, isLoading, send } = useChat();
  const { currentSessionId } = useSessions();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const hasSession = !!currentSessionId;

  return (
    <div className="flex flex-col h-full">
      <header className="h-14 flex items-center px-6 border-b border-dark-600 bg-dark-800/50 backdrop-blur-sm flex-shrink-0">
        <span className="text-sm text-gray-400">
          {hasSession ? '输入问题进行数据分析' : '选择或创建一个会话开始对话'}
        </span>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {!hasSession ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-300">智能数据分析助手</h2>
              <p className="text-sm text-gray-500 max-w-md">使用自然语言查询数据库，系统将自动生成 SQL 并返回可视化结果</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-3">
              <p className="text-gray-500 text-sm">会话已就绪</p>
              <div className="flex flex-wrap gap-2 justify-center max-w-md">
                {['查询所有部门信息', '统计各部门员工数量', '薪资最高的10名员工'].map(q => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="px-3 py-1.5 text-xs rounded-full bg-dark-700 text-gray-400 hover:bg-accent/20 hover:text-accent-light border border-dark-500 hover:border-accent/30 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map(msg => (
              <MessageBubble key={msg.id} role={msg.role} content={msg.content} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-dark-700/80 backdrop-blur-sm rounded-2xl rounded-bl-md px-4 py-3 border border-dark-500/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0ms]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:300ms]" />
                    </div>
                    <span className="text-xs text-gray-500">正在分析...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={send} disabled={!hasSession} isLoading={isLoading} />
    </div>
  );
}
