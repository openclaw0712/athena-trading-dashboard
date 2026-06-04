const HOME = '/Users/openclaw0712';
const WORKSPACE = `${HOME}/.openclaw/workspace`;

import fs from 'fs';
import path from 'path';

function readJson(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (e) {
    console.error(`讀取失敗 ${filePath}:`, e.message);
  }
  return null;
}

function readJsonl(filePath, limit = 50) {
  try {
    if (fs.existsSync(filePath)) {
      const lines = fs.readFileSync(filePath, 'utf-8')
        .split('\n')
        .filter(Boolean)
        .slice(-limit);
      return lines.map(l => {
        try { return JSON.parse(l); } catch { return null; }
      }).filter(Boolean);
    }
  } catch (e) {
    console.error(`讀取失敗 ${filePath}:`, e.message);
  }
  return [];
}

export default function handler(req, res) {
  const logDir = path.join(WORKSPACE, 'logs', 'trading');

  const data = {
    positions: readJson(path.join(logDir, 'positions.json')) || [],
    balance: readJson(path.join(logDir, 'balance.json')) || { nav: 300 },
    dailyPnl: readJson(path.join(logDir, 'daily-pnl.json')) || { daily_pnl: 0 },
    decisions: readJsonl(path.join(logDir, 'decisions.jsonl'), 50),
    riskEvents: readJsonl(path.join(logDir, 'risk-events.jsonl'), 20),
    executions: readJsonl(path.join(logDir, 'executions.jsonl'), 30),
    updatedAt: new Date().toISOString()
  };

  res.status(200).json(data);
}
