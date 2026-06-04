export default function PositionCard({ position }) {
  const pnl = parseFloat(position.unrealizedPnl || 0);
  const size = parseFloat(position.size || 0);
  
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-lg font-semibold">{position.symbol}</span>
        <span className={`text-lg font-bold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {pnl >= 0 ? '+' : ''}{pnl.toFixed(2)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm text-slate-400">
        <div>
          <span className="text-slate-500">數量</span>
          <div className="font-mono">{size}</div>
        </div>
        <div>
          <span className="text-slate-500">杠桿</span>
          <div className="font-mono">{position.leverage || 1}x</div>
        </div>
        <div>
          <span className="text-slate-500">進場價</span>
          <div className="font-mono">{position.entryPrice || '-'}</div>
        </div>
        <div>
          <span className="text-slate-500">現在價</span>
          <div className="font-mono">{position.markPrice || '-'}</div>
        </div>
      </div>
      {position.tp && (
        <div className="mt-2 text-xs text-slate-500">
          止盈: {position.tp} | 止損: {position.sl}
        </div>
      )}
    </div>
  );
}
