import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mode, setMode] = useState('light');
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setMode(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggle = () => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full bg-neutral-800 dark:bg-neutral-200 text-white dark:text-neutral-800"
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
