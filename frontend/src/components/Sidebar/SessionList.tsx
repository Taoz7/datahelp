import { useSessions } from '../../hooks/useSessions';
import { MessageSquarePlus, Trash2 } from 'lucide-react';

export default function SessionList() {
  const { sessions, currentSessionId, addSession, removeSession, selectSession } =
    useSessions();

  const handleNew = async () => {
    await addSession();
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    await removeSession(id);
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    return d.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-dark-600 flex-shrink-0">
        <h1 className="text-lg font-bold text-accent-light flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Smart Data Analyst
        </h1>
      </div>

      <div className="p-3 flex-shrink-0">
        <button
          onClick={handleNew}
          className="w-full py-2.5 px-4 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
        >
          <MessageSquarePlus size={16} />
          新建会话
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
        {sessions.length === 0 ? (
          <div className="text-xs text-gray-500 text-center py-8">
            暂无会话
            <br />
            点击上方按钮创建
          </div>
        ) : (
          sessions.map(session => (
            <div
              key={session.id}
              onClick={() => selectSession(session.id)}
              className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150 ${
                currentSessionId === session.id
                  ? 'bg-accent/15 border border-accent/30 text-white'
                  : 'hover:bg-dark-600 text-gray-300 border border-transparent'
              }`}
            >
              <svg
                className="w-4 h-4 flex-shrink-0 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{session.title}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {formatTime(session.created_at)}
                </p>
              </div>
              <button
                onClick={e => handleDelete(e, session.id)}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                title="删除会话"
              >
                <Trash2 size={14} className="text-red-400" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
