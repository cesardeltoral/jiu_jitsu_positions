"use client";

import { useState } from "react";
import Image from "next/image";

const POSITIONS = [
  {
    name: "Back control",
    tier: "BEST",
    borderColor: "#16a34a",
    textColor: "#16a34a",
    image: "/images/back_control.png",
    options: ["Rear naked choke", "Back triangle", "Armbar", "Gi chokes", "Control"],
    links: { "Rear naked choke": "https://www.youtube.com/watch?v=gU112L3r8TY", "Back triangle": "https://www.youtube.com/watch?v=gSZe_szYKqQ", "Armbar": "https://www.youtube.com/watch?v=Eha2wvYp5ZU", "Gi chokes": "https://www.youtube.com/watch?v=eMbkVDRreIQ", "Control": "https://www.youtube.com/watch?v=CFDVh9EVgPA" } as Record<string, string>,
  },
  {
    name: "Mount top",
    tier: "BEST",
    borderColor: "#16a34a",
    textColor: "#16a34a",
    image: "/images/mount_top.png",
    options: ["Americana", "Armbar", "Gi chokes", "Arm triangle", "Mounted triangle", "Advance to back control"],
    links: { "Americana": "https://www.youtube.com/watch?v=WLqWGE4YgT8", "Armbar": "https://www.youtube.com/watch?v=ECPcvbKt-lY", "Gi chokes": "https://www.youtube.com/watch?v=OlDSm8UTK20", "Arm triangle": "https://www.youtube.com/watch?v=_0p90C3-62A", "Mounted triangle": "https://www.youtube.com/watch?v=_0p90C3-62A", "Advance to back control": "https://www.youtube.com/watch?v=CvhI6U-IN_8" } as Record<string, string>,
  },
  {
    name: "Side control top",
    tier: "BEST",
    borderColor: "#16a34a",
    textColor: "#16a34a",
    image: "/images/side_control_top.png",
    options: ["Shoulder locks", "Armbars", "Gi chokes", "Advance to mount", "Back control", "Knee-on-belly"],
    links: { "Shoulder locks": "https://www.youtube.com/watch?v=WPngPq3I0Us", "Armbars": "https://www.youtube.com/shorts/yPHEGRnRem0", "Gi chokes": "https://www.youtube.com/watch?v=25Phe--Jhu0", "Advance to mount": "https://www.youtube.com/watch?v=3KCm38aFuV8", "Back control": "https://www.youtube.com/shorts/8MLjpiuvoLk", "Knee-on-belly": "https://www.youtube.com/shorts/lBTW6tpA6S8" } as Record<string, string>,
  },
  {
    name: "Guard bottom",
    tier: "BEST",
    borderColor: "#16a34a",
    textColor: "#16a34a",
    image: "/images/guard_bottom.png",
    options: ["Sweeps", "Armbar", "Kimura", "Triangle", "Gi chokes", "Guillotine", "Arm drag to back", "Rubber Guard pathway"],
    links: { "Sweeps": "https://www.youtube.com/watch?v=qp5AXBHxQec&t=243s", "Armbar": "https://www.youtube.com/shorts/tJ1_r4S49Oc", "Kimura": "https://www.youtube.com/shorts/fqQ4mVxJaoE", "Triangle": "https://www.youtube.com/shorts/RVUL6KNBNG0", "Gi chokes": "https://www.youtube.com/shorts/goFly35nPzk", "Guillotine": "https://www.youtube.com/watch?v=UbcqJETDUY8", "Arm drag to back": "https://www.youtube.com/watch?v=e_c7G5T_ZR8", "Rubber Guard pathway": "https://www.youtube.com/watch?v=c2BJaM0gd6g" } as Record<string, string>,
  },
  {
    name: "1/2 Guard top",
    tier: "NEUTRAL",
    borderColor: "#d97706",
    textColor: "#d97706",
    image: "/images/half_guard_top.png",
    options: ["Positional advancement", "Shoulder locks", "Chokes"],
    links: { "Positional advancement": "https://www.youtube.com/shorts/82HW0SDvVHc", "Shoulder locks": "https://www.youtube.com/watch?v=Go6TwkmWfGs", "Chokes": "https://www.youtube.com/watch?v=oG4cwSzK2fY" } as Record<string, string>,
    highlight: true,
  },
  {
    name: "1/2 Guard bottom",
    tier: "NEUTRAL",
    borderColor: "#d97706",
    textColor: "#d97706",
    image: "/images/half_guard_bottom.png",
    options: ["Positional advancement", "Shoulder locks", "Chokes", "Underhook"],
    links: { "Positional advancement": "https://www.youtube.com/shorts/RdlbVK_9bpA", "Shoulder locks": "https://www.youtube.com/shorts/QyBRHN_IaXo", "Chokes": "https://www.youtube.com/shorts/HVR43jYcWhY", "Underhook": "https://www.youtube.com/watch?v=pW2YL_n8Q_U" } as Record<string, string>,
    paired: true,
  },
  {
    name: "Guard top",
    tier: "NEUTRAL",
    borderColor: "#d97706",
    textColor: "#d97706",
    image: "/images/guard_top.png",
    options: ["Pass the guard", "Defend submissions and sweep attempts"],
    links: { "Pass the guard": "https://www.youtube.com/shorts/ERjfYPnNX_A" } as Record<string, string>,
    subOptions: { "Defend submissions and sweep attempts": [
      { name: "Kimura defense closed guard", link: "https://www.youtube.com/shorts/qS61xaNHR_A" },
      { name: "Triangle defense from closed guard", link: "https://www.youtube.com/shorts/yo4UEOnfSTM" },
      { name: "Armbar defense from guard top", link: "https://www.youtube.com/watch?v=kNdKfUdgO4I" },
    ] } as Record<string, { name: string; link: string }[]>,
  },
  {
    name: "Side control bottom",
    tier: "WORST",
    borderColor: "#dc2626",
    textColor: "#dc2626",
    image: "/images/side_control_bottom.png",
    options: ["Reverse", "Recompose guard", "Escape"],
    links: { "Reverse": "https://www.youtube.com/shorts/Apwn1TJBQRw", "Recompose guard": "https://www.youtube.com/watch?v=_JPZaIcr90c", "Escape": "http://youtube.com/shorts/q-f9aOkSPqc" } as Record<string, string>,
  },
  {
    name: "Mount bottom",
    tier: "WORST",
    borderColor: "#dc2626",
    textColor: "#dc2626",
    image: "/images/mount_bottom.png",
    options: ["Recompose guard", "Escape"],
    links: { "Recompose guard": "https://www.youtube.com/shorts/r27NPwVVzso", "Escape": "https://www.youtube.com/watch?v=SYel-mVSMAI" } as Record<string, string>,
  },
  {
    name: "Back taken",
    tier: "WORST",
    borderColor: "#dc2626",
    textColor: "#dc2626",
    image: "/images/back_taken.png",
    options: ["Escape", "Spin into guard top", "Defend attacks"],
    links: { "Escape": "https://www.youtube.com/watch?v=N6lKNqUOZoY", "Spin into guard top": "https://www.youtube.com/shorts/UXP4W5LLFro" } as Record<string, string>,
    subOptions: { "Defend attacks": [
      { name: "Rear naked choke escape", link: "https://www.youtube.com/shorts/f6Mnv7Tfr3A" },
      { name: "Back triangle escape", link: "https://www.youtube.com/shorts/kkTGutUVJss" },
    ] } as Record<string, { name: string; link: string }[]>,
  },
];

const TIERS = [
  { label: "BEST", color: "#16a34a", startIdx: 0, endIdx: 3 },
  { label: "Neutral", color: "#d97706", startIdx: 4, endIdx: 6 },
  { label: "WORST", color: "#dc2626", startIdx: 7, endIdx: 9 },
];

const th: React.CSSProperties = {
  border: "2px solid #000",
  padding: "6px 8px",
  fontSize: "15px",
  fontWeight: "bold",
  textAlign: "center",
};

const cell: React.CSSProperties = {
  border: "1px solid #999",
};

export default function BJJHierarchy() {
  const [clicked, setClicked] = useState<{ technique: string; positionName: string } | null>(null);
  const [video, setVideo] = useState<{ technique: string; embedUrl: string } | null>(null);
  const [subMenu, setSubMenu] = useState<{ title: string; items: { name: string; link: string }[] } | null>(null);

  const toEmbedUrl = (url: string) => {
    const match = url.match(/(?:v=|\/embed\/|\/shorts\/|youtu\.be\/)([^&?/]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const handleClick = (technique: string, positionName: string, link?: string) => {
    if (link) {
      const embedUrl = toEmbedUrl(link);
      if (embedUrl) {
        setVideo({ technique, embedUrl });
      }
    }
    setClicked({ technique, positionName });
    setTimeout(() => setClicked(null), 3000);
  };

  return (
    <div style={{
      fontFamily: "Georgia, 'Times New Roman', serif",
      background: "#fff",
      padding: "6px",
      maxWidth: "720px",
      margin: "0 auto",
      color: "#000",
    }}>
      {/* Title */}
      <h1 style={{
        textAlign: "center",
        fontSize: "26px",
        fontWeight: 900,
        letterSpacing: "1px",
        margin: "6px 0 8px",
        color: "#000",
      }}>
        POSITIONAL HEIRARCHY
      </h1>

      {/* Table */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        border: "2px solid #000",
        fontSize: "13px",
      }}>
        <thead>
          <tr style={{ background: "#f8f8f8" }}>
            <th style={{ ...th, width: "28px", borderRight: "2px solid #000" }}></th>
            <th style={{ ...th, width: "160px" }}>Looks like:</th>
            <th style={{ ...th, width: "22%" }}>Position:</th>
            <th style={{ ...th }}>Options:</th>
          </tr>
        </thead>
        <tbody>
          {POSITIONS.map((pos, idx) => {
            const tier = TIERS.find(t => idx >= t.startIdx && idx <= t.endIdx)!;
            const isFirstInTier = idx === tier.startIdx;
            const tierSpan = tier.endIdx - tier.startIdx + 1;
            const isHGTop = pos.name === "1/2 Guard top";
            const isHGBot = pos.name === "1/2 Guard bottom";

            return (
              <tr key={idx} style={{
                borderBottom: isHGTop
                  ? "1px dashed #ccc"
                  : "2px solid #000",
              }}>
                {/* Tier sidebar */}
                {isFirstInTier && (
                  <td rowSpan={tierSpan} style={{
                    borderRight: `4px solid ${tier.color}`,
                    borderBottom: "2px solid #000",
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "13px",
                    color: tier.color,
                    padding: "6px 3px",
                    verticalAlign: "middle",
                    background: "#fff",
                    width: "28px",
                  }}>
                    {tier.label}
                  </td>
                )}

                {/* Image placeholder */}
                <td style={{
                  ...cell,
                  textAlign: "center" as const,
                  verticalAlign: "middle" as const,
                  padding: "8px 4px",
                  background: "#f0f0f0",
                  borderBottom: isHGTop ? "1px dashed #ccc" : undefined,
                }}>
                  {"image" in pos && pos.image ? (
                    <Image
                      src={pos.image}
                      alt={pos.name}
                      width={240}
                      height={160}
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        borderRadius: "3px",
                        border: "1px solid #ccc",
                      }}
                    />
                  ) : (
                    <div style={{
                      width: "100%",
                      height: isHGBot ? "35px" : "80px",
                      background: "#ddd",
                      borderRadius: "3px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      color: "#aaa",
                      border: "1px solid #ccc",
                    }}>
                      {isHGBot ? "" : "\u{1F94B}"}
                    </div>
                  )}
                </td>

                {/* Position name */}
                <td style={{
                  ...cell,
                  textAlign: "center" as const,
                  verticalAlign: "middle" as const,
                  padding: "8px 6px",
                  borderBottom: isHGTop ? "1px dashed #ccc" : undefined,
                }}>
                  <span style={{
                    display: "inline-block",
                    border: `2px solid ${pos.borderColor}`,
                    padding: "5px 12px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    background: ("highlight" in pos && pos.highlight) ? "#fffce0" : "#fff",
                  }}>
                    {pos.name}
                  </span>
                </td>

                {/* Options */}
                <td style={{
                  ...cell,
                  verticalAlign: "middle" as const,
                  padding: "8px 8px",
                  borderBottom: isHGTop ? "1px dashed #ccc" : undefined,
                }}>
                  <div style={{
                    color: pos.textColor,
                    fontStyle: "italic",
                    fontSize: "13px",
                    lineHeight: 1.6,
                  }}>
                    {pos.options.length > 0 && pos.options.map((opt, oi) => (
                      <span key={oi}>
                        <span
                          onClick={() => {
                            if ("subOptions" in pos && (pos.subOptions as Record<string, { name: string; link: string }[]>)[opt]) {
                              setSubMenu({ title: opt, items: (pos.subOptions as Record<string, { name: string; link: string }[]>)[opt] });
                              return;
                            }
                            handleClick(opt, pos.name, "links" in pos ? (pos.links as Record<string, string>)[opt] : undefined);
                          }}
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                            textDecorationStyle: "dotted",
                            textUnderlineOffset: "3px",
                            borderRadius: "2px",
                            padding: "0 2px",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = pos.borderColor + "25";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                          }}
                        >
                          {opt}
                        </span>
                        {oi < pos.options.length - 1 ? ", " : "."}
                      </span>
                    ))}
                    {"note" in pos && (pos as { note?: string }).note && (
                      <div style={{ fontWeight: "bold", marginTop: "2px" }}>{(pos as { note?: string }).note}</div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Video player */}
      {video && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#111",
          borderRadius: "8px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.6)",
          zIndex: 200,
          overflow: "hidden",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 10px",
            background: "#222",
            fontSize: "12px",
            color: "#fff",
          }}>
            <span style={{ fontWeight: "bold" }}>{video.technique}</span>
            <button
              onClick={() => setVideo(null)}
              style={{
                background: "#444",
                border: "none",
                color: "#aaa",
                padding: "2px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {"\u2715"}
            </button>
          </div>
          <iframe
            src={video.embedUrl}
            width="480"
            height="270"
            style={{ display: "block", border: "none" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Sub-menu popup */}
      {subMenu && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "#111",
          borderRadius: "8px",
          boxShadow: "0 4px 30px rgba(0,0,0,0.6)",
          zIndex: 200,
          overflow: "hidden",
          minWidth: "280px",
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            background: "#222",
            fontSize: "12px",
            color: "#fff",
          }}>
            <span style={{ fontWeight: "bold" }}>{subMenu.title}</span>
            <button
              onClick={() => setSubMenu(null)}
              style={{
                background: "#444",
                border: "none",
                color: "#aaa",
                padding: "2px 8px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              {"\u2715"}
            </button>
          </div>
          <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {subMenu.items.map((item, i) => (
              <span
                key={i}
                onClick={() => {
                  const embedUrl = toEmbedUrl(item.link);
                  if (embedUrl) {
                    setSubMenu(null);
                    setVideo({ technique: item.name, embedUrl });
                  }
                }}
                style={{
                  color: "#d97706",
                  cursor: "pointer",
                  fontStyle: "italic",
                  fontSize: "13px",
                  textDecoration: "underline",
                  textDecorationStyle: "dotted",
                  textUnderlineOffset: "3px",
                  padding: "4px 0",
                }}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Toast when clicking a technique */}
      {clicked && (
        <div style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#111",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "13px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          whiteSpace: "nowrap",
        }}>
          <span>{"\u{1F94B}"}</span>
          <span>
            <strong>{clicked.technique}</strong>
            <span style={{ color: "#888", marginLeft: "6px", fontSize: "12px" }}>
              from {clicked.positionName}
            </span>
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); setClicked(null); }}
            style={{
              background: "#333",
              border: "none",
              color: "#aaa",
              padding: "2px 8px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              marginLeft: "4px",
            }}
          >
            {"\u2715"}
          </button>
        </div>
      )}
    </div>
  );
}
