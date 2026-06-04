import { useState, useEffect } from 'react';
import PositionCard from './PositionCard';
import EquityChart from './EquityChart';
import RiskMetrics from './RiskMetrics';
import DailyReport from './DailyReport';

const API_BASE = 'https://human-somehow-bandwidth-michelle.trycloudflare.com';

export default function Dashboard() {
  const [positions, setPositions] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [riskEvents, setRiskEvents] = useState([]);
  const [pnl, setPnl] = useState({ daily_pnl: 0 });
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      const res = await fetch(`${API_BASE}/api/trading-data`);
      if (!res.ok) throw new Error('API 失敗');
      const data = await res.json();
      setPositions(data.positions || []);
      setDecisions(data.decisions || []);
      setRiskEvents(data.riskEvents || []);
      setPnl(data.dailyPnl || { daily_pnl: 0 });
      setLastUpdate(new Date().toLocaleTimeString('zh-TW'));
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-400">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-400 mb-4">無法連接 API: {error}</div>
        <button onClick={fetchData} className="px-4 py-2 bg-blue-600 text-white rounded">重試</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">📊 OpenClaw 交易系統</h1>
            <p className="text-slate-400 mt-1">Bybit Testnet | 多因子策略</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-400">最後更新：{lastUpdate}</div>
            <div className={`text-2xl font-bold ${pnl.daily_pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              今日 P&L: {pnl.daily_pnl?.toFixed(2) || 0} USDT
            </div>
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">當前持倉</h2>
        {positions.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-6 text-center text-slate-400">目前無持倉</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {positions.map((pos, i) => <PositionCard key={i} position={pos} />)}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RiskMetrics riskEvents={riskEvents} />
        <EquityChart decisions={decisions} />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">⚠️ 風控事件</h2>
        {riskEvents.length === 0 ? (
          <div className="bg-slate-800 rounded-lg p-6 text-center text-green-400">無風控事件</div>
        ) : (
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left">時間</th>
                  <th className="px-4 py-3 text-left">事件</th>
                  <th className="px-4 py-3 text-left">規則</th>
                  <th className="px-4 py-3 text-left">原因</th>
                </tr>
              </thead>
              <tbody>
                {riskEvents.slice(-10).map((e, i) => (
                  <tr key={i} className="border-t border-slate-700">
                    <td className="px-4 py-3">{new Date(e.timestamp).toLocaleString('zh-TW')}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        e.event === 'REJECTED' ? 'bg-red-900 text-red-400' : 'bg-green-900 text-green-400'
                      }`}>{e.event}</span>
                    </td>
                    <td className="px-4 py-3">{e.rule}</td>
                    <td className="px-4 py-3 text-slate-400">{e.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <DailyReport decisions={decisions} />
    </div>
  );
}
