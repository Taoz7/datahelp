import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { ChatState, Session, Message, ChartData } from '../types';

// ===== Actions =====
type Action =
  | { type: 'SET_SESSIONS'; payload: Session[] }
  | { type: 'ADD_SESSION'; payload: Session }
  | { type: 'DELETE_SESSION'; payload: string }
  | { type: 'SET_CURRENT_SESSION'; payload: string | null }
  | { type: 'SET_MESSAGES'; payload: Message[] }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_CHART_DATA'; payload: ChartData | null }
  | { type: 'SET_LOADING'; payload: boolean };

// ===== Initial State =====
const initialState: ChatState = {
  sessions: [],
  currentSessionId: null,
  messages: [],
  chartData: null,
  isLoading: false,
};

// ===== Reducer =====
function chatReducer(state: ChatState, action: Action): ChatState {
  switch (action.type) {
    case 'SET_SESSIONS':
      return { ...state, sessions: action.payload };
    case 'ADD_SESSION':
      return { ...state, sessions: [action.payload, ...state.sessions] };
    case 'DELETE_SESSION':
      return {
        ...state,
        sessions: state.sessions.filter(s => s.id !== action.payload),
        currentSessionId:
          state.currentSessionId === action.payload ? null : state.currentSessionId,
        messages: state.currentSessionId === action.payload ? [] : state.messages,
        chartData: state.currentSessionId === action.payload ? null : state.chartData,
      };
    case 'SET_CURRENT_SESSION':
      return { ...state, currentSessionId: action.payload, messages: [], chartData: null };
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        chartData: action.payload.chart_data ?? state.chartData,
      };
    case 'SET_CHART_DATA':
      return { ...state, chartData: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// ===== Context =====
interface ChatContextValue {
  state: ChatState;
  dispatch: React.Dispatch<Action>;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used within ChatProvider');
  return ctx;
}
