import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Glauber Barbershop — barbering in Cape Cod, Massachusetts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const photoPath = join(process.cwd(), "public", "media", "og.jpg");
  const photo = existsSync(photoPath)
    ? `data:image/jpeg;base64,${readFileSync(photoPath).toString("base64")}`
    : null;

  if (photo) {
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex" }}>
          <img src={photo} alt="" width={1200} height={630} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#10120F",
          color: "#F2F0E8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", color: "#D3AF68", letterSpacing: 4, fontSize: 22 }}>BARBERING IN CAPE COD, MA</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1 }}>
          <div style={{ display: "flex" }}>Glauber</div>
          <div style={{ display: "flex", color: "#D3AF68" }}>Barbershop</div>
        </div>
        <div style={{ display: "flex", color: "#B8B9AC", fontSize: 28 }}>Classic cuts, fades, and beard care.</div>
      </div>
    ),
    { ...size },
  );
}
