import { useChatContext } from '../../context/ChatContext';
import type { ChartType } from '../../types';
import DataChart from './DataChart';
import { BarChart3, TrendingUp, PieChart, Table } from 'lucide-react';

const CHART_OPTIONS: { type: ChartType; label: string; icon: typeof BarChart3 }[] = [
  { type: 'bar', label: '柱状图', icon: BarChart3 },
  { type: 'line', label: '折线图', icon: TrendingUp },
  { type: 'pie', label: '饼图', icon: PieChart },
  { type: 'table', label: '表格', icon: Table },
];

export default function ChartPanel() {
  const { state, dispatch } = useChatContext();
  const { chartData, messages } = state;

  const lastAiMessage = [...messages].reverse().find(m => m.role === 'assistant');
  const activeData = chartData || lastAiMessage?.chart_data || null;

  const currentType: ChartType = activeData?.chart_type || 'bar';

  const handleTypeChange = (type: ChartType) => {
    if (activeData) {
      dispatch({
        type: 'SET_CHART_DATA',
        payload: { ...activeData, chart_type: type },
      });
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="h-14 flex items-center justify-between px-4 border-b border-dark-600 bg-dark-800/50 backdrop-blur-sm flex-shrink-0">
        <h2 className="text-sm font-semibold text-gray-300">数据可视化</h2>
        <div className="flex gap-1">
          {CHART_OPTIONS.map(opt => (
            <button
              key={opt.type}
              onClick={() => handleTypeChange(opt.type)}
              disabled={!activeData}
              className={`px-2 py-1 text-xs rounded flex items-center gap-1 transition-all ${
                currentType === opt.type && activeData
                  ? 'bg-accent/20 text-accent-light border border-accent/30'
                  : 'text-gray-400 hover:bg-dark-600 border border-transparent disabled:opacity-40'
              }`}
            >
              <opt.icon size={12} />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        {activeData ? (
          <DataChart data={activeData} />
        ) : (
          <div className="text-center space-y-3">
            <svg className="w-12 h-12 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p className="text-sm text-gray-500">请输入查询以生成图表</p>
          </div>
        )}
      </div>
    </div>
  );
}
