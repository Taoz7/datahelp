import { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import type { ChartData } from '../../types';

interface DataChartProps {
  data: ChartData;
}

export default function DataChart({ data }: DataChartProps) {
  const chartType = data.chart_type;

  const option = useMemo(() => {
    if (!data.data || data.data.length === 0) return {};

    const cols = data.columns || [];
    const nameCol = cols[0] || 'name';
    const valueCol = cols[1] || 'value';

    if (chartType === 'table') return {};

    if (chartType === 'pie') {
      return {
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(15, 21, 32, 0.9)',
          borderColor: 'rgba(99, 102, 241, 0.3)',
          textStyle: { color: '#e2e8f0', fontSize: 12 },
        },
        legend: {
          orient: 'horizontal',
          bottom: 10,
          textStyle: { color: '#94a3b8', fontSize: 11 },
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '45%'],
            avoidLabelOverlap: true,
            itemStyle: { borderRadius: 6, borderColor: '#0f1520', borderWidth: 2 },
            label: { color: '#94a3b8', fontSize: 11 },
            data: data.data.map(row => ({
              value: Number(row[valueCol]) || 0,
              name: String(row[nameCol]),
            })),
          },
        ],
        color: ['#6366f1', '#818cf8', '#a78bfa', '#c4b5fd', '#7c3aed', '#5b21b6'],
      };
    }

    const categories = data.data.map(row => String(row[nameCol]));
    const values = data.data.map(row => Number(row[valueCol]) || 0);

    return {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 21, 32, 0.9)',
        borderColor: 'rgba(99, 102, 241, 0.3)',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
      },
      grid: { left: 60, right: 20, top: 20, bottom: 40 },
      xAxis: {
        type: 'category',
        data: categories,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11, rotate: categories.length > 5 ? 30 : 0 },
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#1e293b' } },
        axisLine: { show: false },
        axisLabel: { color: '#64748b', fontSize: 11 },
      },
      series: [
        {
          type: chartType === 'line' ? 'line' : 'bar',
          data: values,
          smooth: true,
          symbolSize: 8,
          itemStyle: { color: '#6366f1', borderRadius: chartType === 'bar' ? [4, 4, 0, 0] : 0 },
          areaStyle:
            chartType === 'line'
              ? {
                  color: {
                    type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(99, 102, 241, 0.3)' },
                      { offset: 1, color: 'rgba(99, 102, 241, 0)' },
                    ],
                  },
                }
              : undefined,
        },
      ],
    };
  }, [data, chartType]);

  if (chartType === 'table') {
    const cols = data.columns || [];
    return (
      <div className="w-full overflow-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-dark-500">
              {cols.map(col => (
                <th key={col} className="text-left py-2 px-3 text-gray-400 font-medium uppercase tracking-wider">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((row, i) => (
              <tr key={i} className="border-b border-dark-600/50 hover:bg-dark-600/30 transition-colors">
                {cols.map(col => (
                  <td key={col} className="py-2 px-3 text-gray-300">{String(row[col] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} theme="dark" opts={{ renderer: 'canvas' }} />
    </div>
  );
}
