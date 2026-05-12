import { Header } from './components/layout/Header';
import { AppShell } from './components/layout/AppShell';

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Header />
      <AppShell />
    </div>
  );
}
