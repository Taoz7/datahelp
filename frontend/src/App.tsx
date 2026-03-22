import { ChatProvider } from './context/ChatContext';
import SessionList from './components/Sidebar/SessionList';
import ChatArea from './components/Chat/ChatArea';
import ChartPanel from './components/Visualization/ChartPanel';

function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-dark-900 overflow-hidden">
        <aside className="w-[260px] flex-shrink-0 bg-dark-800/80 backdrop-blur-md border-r border-dark-600">
          <SessionList />
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-dark-900">
          <ChatArea />
        </main>

        <aside className="w-[420px] flex-shrink-0 bg-dark-800/80 backdrop-blur-md border-l border-dark-600">
          <ChartPanel />
        </aside>
      </div>
    </ChatProvider>
  );
}

export default App;