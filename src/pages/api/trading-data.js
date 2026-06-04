const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://trading-api.myclawdomain.ccwu.cc';

export default async function handler(req, res) {
  // CORS headers - allow Vercel frontend to access this API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  try {
    // Fetch data from the Cloudflare Tunnel backend
    const response = await fetch(`${API_BASE}/api/trading-data`);
    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Failed to fetch from backend:', err.message);
    // Return fallback data so the UI doesn't break
    res.status(200).json({
      positions: [],
      balance: { nav: 300 },
      dailyPnl: { daily_pnl: 0 },
      decisions: [],
      riskEvents: [],
      executions: [],
      updatedAt: new Date().toISOString(),
      error: err.message
    });
  }
}