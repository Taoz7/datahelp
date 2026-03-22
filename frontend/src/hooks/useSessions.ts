import { useChatContext } from '../context/ChatContext';
import { getSessions, createSession, deleteSession } from '../services/api';
import type { Session } from '../types';
import { useCallback } from 'react';

export function useSessions() {
  const { state, dispatch } = useChatContext();

  const fetchSessions = useCallback(async () => {
    try {
      const sessions: Session[] = await getSessions();
      dispatch({ type: 'SET_SESSIONS', payload: sessions });
    } catch {
      console.error('Failed to fetch sessions');
    }
  }, [dispatch]);

  const addSession = useCallback(
    async (title?: string) => {
      try {
        const session: Session = await createSession(title);
        dispatch({ type: 'ADD_SESSION', payload: session });
        dispatch({ type: 'SET_CURRENT_SESSION', payload: session.id });
        return session;
      } catch {
        console.error('Failed to create session');
      }
    },
    [dispatch]
  );

  const removeSession = useCallback(
    async (sessionId: string) => {
      try {
        await deleteSession(sessionId);
        dispatch({ type: 'DELETE_SESSION', payload: sessionId });
      } catch {
        console.error('Failed to delete session');
      }
    },
    [dispatch]
  );

  const selectSession = useCallback(
    (sessionId: string) => {
      dispatch({ type: 'SET_CURRENT_SESSION', payload: sessionId });
    },
    [dispatch]
  );

  return {
    sessions: state.sessions,
    currentSessionId: state.currentSessionId,
    fetchSessions,
    addSession,
    removeSession,
    selectSession,
  };
}
