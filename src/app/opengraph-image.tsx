import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f5f3ed", color: "#263122", padding: "48px 60px", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #babdb1", paddingBottom: 28, fontSize: 20, letterSpacing: 4 }}>
          <span style={{ fontWeight: 700 }}>{profile.name.toUpperCase()}</span>
          <span>GHANA / WORLDWIDE</span>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 3, color: "#69715d", marginBottom: 22 }}>{profile.title.toUpperCase()}</div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 82, lineHeight: 1.08, fontWeight: 500, letterSpacing: -5 }}>
              <span>Building what</span>
              <span>comes next.</span>
            </div>
          </div>
          <div style={{ display: "flex", width: 238, height: 280, background: "#263122", color: "#f5f3ed", alignItems: "center", justifyContent: "center", fontSize: 104, letterSpacing: -8, borderRadius: "120px 120px 0 0" }}>IA</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid #babdb1", paddingTop: 26, fontSize: 19 }}>
          <span>Founder. Builder. Problem solver.</span>
          <span>{new URL(profile.url).hostname}</span>
        </div>
      </div>
    ),
    size,
  );
}
