import { useChatContext } from '../context/ChatContext';
import { sendMessage } from '../services/api';
import type { Message } from '../types';
import { useCallback } from 'react';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MOCK_CHART_DATA = {
  columns: ['category', 'value'],
  data: [
    { category: '技术部', value: 25 },
    { category: '产品部', value: 18 },
    { category: '市场部', value: 12 },
    { category: '运营部', value: 20 },
    { category: '财务部', value: 8 },
  ],
  chart_type: 'bar' as const,
};

export function useChat() {
  const { state, dispatch } = useChatContext();

  const send = useCallback(
    async (content: string) => {
      if (!state.currentSessionId || !content.trim()) return;

      const sessionId = state.currentSessionId;

      const userMsg: Message = {
        id: `msg_${Date.now()}_user`,
        session_id: sessionId,
        role: 'user',
        content: content.trim(),
        created_at: new Date().toISOString(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
      dispatch({ type: 'SET_LOADING', payload: true });

      try {
        const response = await sendMessage(sessionId, content.trim());

        const assistantMsg: Message = {
          id: response.id || `msg_${Date.now()}_ai`,
          session_id: sessionId,
          role: 'assistant',
          content: response.content || '查询完成。',
          chart_data: response.chart_data || null,
          created_at: response.created_at || new Date().toISOString(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMsg });
      } catch {
        await delay(800);
        const mockMsg: Message = {
          id: `msg_${Date.now()}_ai_mock`,
          session_id: sessionId,
          role: 'assistant',
          content:
            '你好！我是智能数据分析助手。\n\n当前为 Mock 模式，你可以尝试以下查询：\n- 查询所有部门的信息\n- 统计每个部门的员工数量\n- 查看薪资最高的前10名员工',
          chart_data: MOCK_CHART_DATA,
          created_at: new Date().toISOString(),
        };
        dispatch({ type: 'ADD_MESSAGE', payload: mockMsg });
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    },
    [state.currentSessionId, dispatch]
  );

  return {
    messages: state.messages,
    chartData: state.chartData,
    isLoading: state.isLoading,
    send,
  };
}
