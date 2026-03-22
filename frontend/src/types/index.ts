// ===== 会话相关 =====
export interface Session {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface SessionCreate {
  title?: string;
}

// ===== 消息相关 =====
export interface ChartData {
  columns: string[];
  data: Record<string, unknown>[];
  chart_type: 'bar' | 'line' | 'pie' | 'table';
}

export interface Message {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  chart_data?: ChartData | null;
  created_at: string;
}

export interface ChatRequest {
  session_id: string;
  message: string;
}

// ===== 图表相关 =====
export type ChartType = 'bar' | 'line' | 'pie' | 'table';

export interface ChartConfig {
  type: ChartType;
  title?: string;
}

// ===== 全局状态 =====
export interface ChatState {
  sessions: Session[];
  currentSessionId: string | null;
  messages: Message[];
  chartData: ChartData | null;
  isLoading: boolean;
}
