import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== 会话 API =====

export async function getSessions() {
  const { data } = await api.get('/sessions');
  return data;
}

export async function createSession(title = '新会话') {
  const { data } = await api.post('/sessions', { title });
  return data;
}

export async function getSession(sessionId: string) {
  const { data } = await api.get(`/sessions/${sessionId}`);
  return data;
}

export async function deleteSession(sessionId: string) {
  await api.delete(`/sessions/${sessionId}`);
}

// ===== 聊天 API =====

export async function sendMessage(sessionId: string, message: string) {
  const { data } = await api.post('/chat', {
    session_id: sessionId,
    message,
  });
  return data;
}

export default api;
