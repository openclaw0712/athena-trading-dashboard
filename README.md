# OpenClaw Trading Dashboard

基於 Next.js + Tailwind 的 OpenClaw 自動化交易系統即時看板。

## 功能

- 當前持倉顯示
- 權益曲線（Chart.js）
- 風險指標儀表板
- 風控事件日誌
- 決策日誌

## 部署

### 1. 安裝依賴
```bash
npm install
```

### 2. 設定環境變數
```bash
export NEXT_PUBLIC_OPENCLAW_PATH=/path/to/.openclaw/workspace
```

### 3. 本地開發
```bash
npm run dev
```

### 4. Vercel 部署
```bash
npm install -g vercel
vercel deploy
```

## 環境需求

- Node.js 18+
- 讀取權限：`~/.openclaw/workspace/logs/trading/`
