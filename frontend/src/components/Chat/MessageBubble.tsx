interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[75%] ${
          isUser
            ? 'bg-accent text-white rounded-2xl rounded-br-md'
            : 'bg-dark-700/80 backdrop-blur-sm text-gray-200 rounded-2xl rounded-bl-md border border-dark-500/50'
        } px-4 py-3 shadow-lg`}
      >
        {!isUser && (
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 rounded-full bg-accent/30 flex items-center justify-center">
              <svg className="w-3 h-3 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">Smart Analyst</span>
          </div>
        )}

        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
