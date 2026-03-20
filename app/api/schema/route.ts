import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({
    version: "1.0.0",
    services: {
      quick_scan: {
        price_virtual: 0.01,
        input: {
          type: "object",
          required: ["token_address"],
          properties: {
            token_address: {
              type: "string",
              description: "Solana token mint address (base58, 32–44 chars)",
            },
          },
        },
        output: {
          type: "object",
          properties: {
            is_honeypot:              { type: "boolean" },
            mint_authority_revoked:   { type: "boolean" },
            freeze_authority_revoked: { type: "boolean" },
            top_10_holder_pct:        { type: "number" },
            liquidity_usd:            { type: ["number", "null"] },
            risk_grade:               { type: "string", enum: ["A", "B", "C", "D", "F"] },
            summary:                  { type: "string" },
            data_confidence:          { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          },
        },
      },
      wallet_risk: {
        price_virtual: 0.02,
        input: {
          type: "object",
          required: ["wallet_address"],
          properties: {
            wallet_address: {
              type: "string",
              description: "Solana wallet address (base58, 32–44 chars)",
            },
          },
        },
        output: {
          type: "object",
          properties: {
            wallet_age_days:      { type: "number" },
            total_transactions:   { type: "number" },
            is_bot:               { type: "boolean" },
            rug_involvement_count:{ type: "number" },
            whale_status:         { type: "boolean" },
            risk_score:           { type: "number", minimum: 0, maximum: 100 },
            trading_style:        { type: "string", enum: ["sniper", "hodler", "flipper", "bot", "unknown"] },
            data_confidence:      { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          },
        },
      },
      market_intel: {
        price_virtual: 0.05,
        input: {
          type: "object",
          required: ["token_address"],
          properties: {
            token_address: {
              type: "string",
              description: "Solana token mint address (base58, 32–44 chars)",
            },
          },
        },
        output: {
          type: "object",
          properties: {
            current_price_usd:    { type: "number" },
            price_change_1h_pct:  { type: "number" },
            price_change_24h_pct: { type: "number" },
            volume_1h_usd:        { type: "number" },
            volume_24h_usd:       { type: "number" },
            liquidity_usd:        { type: ["number", "null"] },
            buy_pressure:         { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
            sell_pressure:        { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
            large_txs_last_hour:  { type: "number" },
            signal:               { type: "string", enum: ["BULLISH", "BEARISH", "NEUTRAL"] },
            data_confidence:      { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          },
        },
      },
      deep_dive: {
        price_virtual: 0.50,
        input: {
          type: "object",
          required: ["token_address"],
          properties: {
            token_address: {
              type: "string",
              description: "Solana token mint address (base58, 32–44 chars)",
            },
          },
        },
        output: {
          type: "object",
          properties: {
            risk_grade:               { type: "string", enum: ["A", "B", "C", "D", "F"] },
            is_honeypot:              { type: "boolean" },
            mint_authority_revoked:   { type: "boolean" },
            freeze_authority_revoked: { type: "boolean" },
            top_10_holder_pct:        { type: "number" },
            liquidity_usd:            { type: ["number", "null"] },
            pump_fun_launched:        { type: "boolean" },
            bundled_launch_detected:  { type: "boolean" },
            wash_trading_score:       { type: "number", minimum: 0, maximum: 100 },
            momentum_score:           { type: "number", minimum: 0, maximum: 100 },
            full_risk_report:         { type: "string" },
            recommendation:           { type: "string", enum: ["BUY", "AVOID", "WATCH", "DYOR"] },
            data_confidence:          { type: "string", enum: ["HIGH", "MEDIUM", "LOW"] },
          },
        },
      },
    },
  });
}
