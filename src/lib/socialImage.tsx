import { ImageResponse } from "next/og";

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #102A43 0%, #153E5C 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#0B2236" />
            <path
              d="M9 5C9 11 13 13 13 16C13 19 9 21 9 27M23 5C23 11 19 13 19 16C19 19 23 21 23 27"
              fill="none"
              stroke="#47C7D3"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          </svg>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            Eso<span style={{ color: "#47C7D3" }}>Clear</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08, maxWidth: 980 }}>
            Preventing the scar before it changes a child&apos;s life.
          </div>
          <div style={{ fontSize: 30, color: "#BFE8EC", maxWidth: 940 }}>
            An investigational PAI-1 targeted approach to prevent caustic esophageal stricture.
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#9FB3C8" }}>
          Investigational program · Preclinical · Not approved by the FDA
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
