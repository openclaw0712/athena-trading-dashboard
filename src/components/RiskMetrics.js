export default function RiskMetrics({ riskEvents }) {
  const approved = riskEvents.filter(e => e.event === 'APPROVED').length;
  const rejected = riskEvents.filter(e => e.event === 'REJECTED').length;
  const total = riskEvents.length;
  const rejectRate = total > 0 ? ((rejected / total) * 100).toFixed(1) : 0;

  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">風險指標</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-green-400">{approved}</div>
          <div className="text-slate-400 text-sm">批准交易</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-red-400">{rejected}</div>
          <div className="text-slate-400 text-sm">拒絕交易</div>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-slate-400">拒絕率</span>
          <span className={rejectRate > 20 ? 'text-red-400' : 'text-slate-300'}>
            {rejectRate}%
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${rejectRate > 20 ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${Math.min(rejectRate, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
