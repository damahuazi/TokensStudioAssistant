import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { AppShell } from './components/layout/AppShell';
import { useTokenStore } from './stores/tokenStore';

export default function App() {
  const { mode } = useTokenStore();
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);
  
  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        mode === 'light' 
          ? 'bg-white text-zinc-900' 
          : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      <Header />
      <AppShell />
    </div>
  );
}
