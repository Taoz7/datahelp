function App() {
  return (
    <div className="flex h-screen bg-dark-900">
      {/* 左侧栏 - 会话管理 */}
      <aside className="w-[260px] flex-shrink-0 bg-dark-800 border-r border-dark-600 flex flex-col">
        <div className="p-4 border-b border-dark-600">
          <h1 className="text-lg font-bold text-accent-light flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Smart Data Analyst
          </h1>
        </div>
        <div className="p-3">
          <button className="w-full py-2 px-4 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-medium transition-colors">
            + 新建会话
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-xs text-gray-500 text-center py-8">
            暂无会话<br />点击上方按钮创建
          </div>
        </div>
      </aside>

      {/* 中间栏 - 问答区域 */}
      <main className="flex-1 flex flex-col min-w-0 bg-dark-900">
        <header className="h-14 flex items-center px-6 border-b border-dark-600 bg-dark-800/50">
          <span className="text-sm text-gray-400">选择或创建一个会话开始对话</span>
        </header>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-300">智能数据分析助手</h2>
            <p className="text-sm text-gray-500 max-w-md">
              使用自然语言查询数据库，系统将自动生成 SQL 并返回可视化结果
            </p>
          </div>
        </div>
        <div className="p-4 border-t border-dark-600 bg-dark-800/50">
          <div className="flex gap-3 max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="输入你的数据查询问题..."
              className="flex-1 px-4 py-2.5 bg-dark-700 border border-dark-500 rounded-lg text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
              disabled
            />
            <button className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-medium transition-colors" disabled>
              发送
            </button>
          </div>
        </div>
      </main>

      {/* 右侧栏 - 可视化图表 */}
      <aside className="w-[420px] flex-shrink-0 bg-dark-800 border-l border-dark-600 flex flex-col">
        <div className="h-14 flex items-center justify-between px-4 border-b border-dark-600">
          <h2 className="text-sm font-semibold text-gray-300">数据可视化</h2>
          <div className="flex gap-1">
            <button className="px-2 py-1 text-xs rounded bg-accent/20 text-accent-light border border-accent/30">柱状图</button>
            <button className="px-2 py-1 text-xs rounded text-gray-400 hover:bg-dark-600 transition-colors">折线图</button>
            <button className="px-2 py-1 text-xs rounded text-gray-400 hover:bg-dark-600 transition-colors">饼图</button>
            <button className="px-2 py-1 text-xs rounded text-gray-400 hover:bg-dark-600 transition-colors">表格</button>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-3">
            <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-sm text-gray-500">请输入查询以生成图表</p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default App
