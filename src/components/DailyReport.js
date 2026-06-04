export default function DailyReport({ decisions }) {
  const today = new Date().toISOString().split('T')[0];
  const todayDecisions = decisions.filter(d => 
    d.timestamp && d.timestamp.startsWith(today)
  );

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">今日決策日誌</h2>
      {todayDecisions.length === 0 ? (
        <div className="bg-slate-800 rounded-lg p-6 text-center text-slate-400">
          今日無決策記錄
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">時間</th>
                <th className="px-4 py-3 text-left">交易對</th>
                <th className="px-4 py-3 text-left">動作</th>
                <th className="px-4 py-3 text-left">原因/策略</th>
              </tr>
            </thead>
            <tbody>
              {todayDecisions.slice().reverse().map((d, i) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="px-4 py-3 text-sm">
                    {new Date(d.timestamp).toLocaleTimeString('zh-TW')}
                  </td>
                  <td className="px-4 py-3 font-mono">{d.symbol || '-'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-sm ${
                      d.action === 'ENTRY' ? 'bg-green-900 text-green-400' :
                      d.action === 'EXIT' ? 'bg-red-900 text-red-400' :
                      'bg-slate-700'
                    }`}>
                      {d.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400">
                    {d.signal || d.reason || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
