import { API_BASE_URL } from "@/lib/services";

export default function ApiCodeExample() {
  return (
    <section className="api-section">
      <div className="api-wrap">
        <div className="api-section-label">Example — sol_quick_scan</div>
        <div className="api-terminal">
          <div className="api-terminal-header">
            <span className="api-dot api-dot-r" />
            <span className="api-dot api-dot-y" />
            <span className="api-dot api-dot-g" />
            <span className="api-terminal-label">bash</span>
          </div>
          <div className="api-terminal-body">
            <pre>
              <span className="c-comment"># Step 1 — discover payment terms</span>
              {"\n"}
              <span className="c-cmd">curl</span> -X POST{" "}
              <span className="c-url">{API_BASE_URL}/scan/quick</span> \{"\n"}
              {"  "}-H{" "}
              <span className="c-str">&quot;Content-Type: application/json&quot;</span>{" "}
              \{"\n"}
              {"  "}-d{" "}
              <span className="c-str">
                {`'{"token_address":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'`}
              </span>
              {"\n\n"}
              <span className="c-comment">{`# ← 402 Payment Required
# {
#   "x402Version": 1,
#   "accepts": [{
#     "scheme":  "exact",
#     "network": "eip155:8453",
#     "asset":   "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",   # USDC on Base
#     "maxAmountRequired": "20000",                              # 0.02 USDC (6dp)
#     "payTo":   "0x8D2460E139a8BE2fdB72a44a52bc494F7326adfC"
#   }]
# }`}</span>
              {"\n\n"}
              <span className="c-comment">{`# Step 2 — sign EIP-3009 TransferWithAuthorization, base64 the payload,
#          re-POST with X-Payment header`}</span>
              {"\n"}
              <span className="c-cmd">curl</span> -X POST{" "}
              <span className="c-url">{API_BASE_URL}/scan/quick</span> \{"\n"}
              {"  "}-H{" "}
              <span className="c-str">&quot;Content-Type: application/json&quot;</span>{" "}
              \{"\n"}
              {"  "}-H{" "}
              <span className="c-header">
                {`'X-Payment: eyJ4NDAyVmVyc2lvbiI6MSwic2NoZW1lIjoiZXhhY3QiLCJuZXR3b3JrIjoiZWlwMTU1Ojg0NTMiLCJwYXlsb2FkIjp7Li4ufX0='`}
              </span>{" "}
              \{"\n"}
              {"  "}-d{" "}
              <span className="c-str">
                {`'{"token_address":"DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263"}'`}
              </span>
              {"\n\n"}
              <span className="c-comment">{`# ← 200 OK · X-Payment-Response: <base64 settlement receipt>`}</span>
              {"\n"}
              {`{
  `}
              <span className="c-key">&quot;schema_version&quot;</span>
              {`:           `}
              <span className="c-str">&quot;2.0&quot;</span>
              {`,
  `}
              <span className="c-key">&quot;structural_risk_grade&quot;</span>
              {`:    `}
              <span className="c-str">&quot;A&quot;</span>
              {`,
  `}
              <span className="c-key">&quot;mint_authority_revoked&quot;</span>
              {`:   `}
              <span className="c-val">true</span>
              {`,
  `}
              <span className="c-key">&quot;freeze_authority_revoked&quot;</span>
              {`: `}
              <span className="c-val">true</span>
              {`,
  `}
              <span className="c-key">&quot;top_10_holder_pct&quot;</span>
              {`:        `}
              <span className="c-num">18.4</span>
              {`,
  `}
              <span className="c-key">&quot;liquidity_usd&quot;</span>
              {`:            `}
              <span className="c-num">2841000</span>
              {`,
  `}
              <span className="c-key">&quot;data_quality&quot;</span>
              {`:             `}
              <span className="c-str">&quot;FULL&quot;</span>
              {`,
  `}
              <span className="c-key">&quot;data_confidence&quot;</span>
              {`:          `}
              <span className="c-str">&quot;HIGH&quot;</span>
              {`
}`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
