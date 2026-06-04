import { useState, useEffect } from 'react';
import Dashboard from '../components/Dashboard';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <Dashboard />
    </main>
  );
}
