// ── Quick Scan ───────────────────────────────────────────────────────────────
export interface QuickScanResult {
  is_honeypot: boolean;
  mint_authority_revoked: boolean;
  freeze_authority_revoked: boolean;
  top_10_holder_pct: number;
  liquidity_usd: number | null;
  risk_grade: "A" | "B" | "C" | "D" | "F";
  summary: string;
  data_confidence: "HIGH" | "MEDIUM" | "LOW";
}

// ── Wallet Risk ──────────────────────────────────────────────────────────────
export interface WalletRiskResult {
  wallet_age_days: number;
  total_transactions: number;
  is_bot: boolean;
  rug_involvement_count: number;
  whale_status: boolean;
  risk_score: number;
  trading_style: "sniper" | "hodler" | "flipper" | "bot" | "unknown";
  data_confidence: "HIGH" | "MEDIUM" | "LOW";
}

// ── Market Intel ─────────────────────────────────────────────────────────────
export interface MarketIntelResult {
  current_price_usd: number;
  price_change_1h_pct: number;
  price_change_24h_pct: number;
  volume_1h_usd: number;
  volume_24h_usd: number;
  liquidity_usd: number | null;
  buy_pressure: "HIGH" | "MEDIUM" | "LOW";
  sell_pressure: "HIGH" | "MEDIUM" | "LOW";
  large_txs_last_hour: number;
  signal: "BULLISH" | "BEARISH" | "NEUTRAL";
  data_confidence: "HIGH" | "MEDIUM" | "LOW";
}

// ── Deep Dive ────────────────────────────────────────────────────────────────
export interface DeepDiveResult extends QuickScanResult {
  dev_wallet_analysis: {
    address: string;
    sol_balance: number;
    created_tokens_count: number;
    previous_rugs: boolean;
  };
  liquidity_lock_status: {
    locked: boolean;
    lock_duration_days: number;
    locked_pct: number;
  };
  trading_pattern: {
    buy_sell_ratio_1h: number;
    unique_buyers_24h: number;
    wash_trading_score: number;
  };
  pump_fun_launched: boolean;
  bundled_launch_detected: boolean;
  volume_24h: number;
  price_change_24h_pct: number;
  momentum_score: number;
  full_risk_report: string;
  recommendation: "BUY" | "AVOID" | "WATCH" | "DYOR";
}
