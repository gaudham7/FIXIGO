"use client";

import React from "react";

function Worker({ kind, className }: { kind: "electrician" | "plumber" | "mechanic" | "technician" | "cleaner"; className: string }) {
  const clothes = { electrician: "#234C5B", plumber: "#B97843", mechanic: "#16745F", technician: "#526D85", cleaner: "#D7E7DF" }[kind];
  const skin = ["#B97855", "#9A6248", "#D49A70", "#A86D4F", "#C78E69"][["electrician", "plumber", "mechanic", "technician", "cleaner"].indexOf(kind)];
  return (
    <svg className={`fx-worker ${className}`} viewBox="0 0 100 160" aria-hidden="true">
      {kind === "electrician" && <><path d="M27 28 Q22 5 50 5 Q78 5 73 28Z" fill="#E4B13B"/><path d="M22 27H78" stroke="#C58B19" strokeWidth="5" strokeLinecap="round"/></>}
      {kind === "plumber" && <path d="M29 20 Q30 5 50 6 Q70 6 71 20Z" fill="#263B45"/>}
      {kind === "mechanic" && <path d="M28 20 Q30 5 50 6 Q70 5 72 20Z" fill="#1F3034"/>}
      {kind === "technician" && <path d="M27 20 Q30 5 50 6 Q70 5 73 20Z" fill="#344A58"/>}
      {kind === "cleaner" && <path d="M26 20 Q28 5 50 5 Q72 5 74 20Z" fill="#E6E9E1"/>}
      <ellipse cx="50" cy="30" rx="19" ry="22" fill={skin}/>
      <path d="M32 25 Q32 7 51 8 Q68 8 69 24 Q58 15 48 18 Q40 21 32 25Z" fill="#282B2A"/>
      <path d="M43 36 Q50 41 57 36" fill="none" stroke="#633F32" strokeWidth="2" strokeLinecap="round"/>
      <path d="M43 29h2M56 29h2" stroke="#302824" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M25 63 Q50 49 75 63 L82 117 Q50 129 18 117Z" fill={clothes}/>
      <path d="M39 58 L50 72 L61 58" fill="none" stroke="#E7E8DF" strokeWidth="3"/>
      <path d="M30 70 L17 100" stroke={skin} strokeWidth="10" strokeLinecap="round"/>
      <g className="fx-arm"><path d="M70 70 L83 91 L83 58" fill="none" stroke={skin} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/><path d="M83 58 L83 43 M83 52 L74 47 M83 52 L91 47" stroke={skin} strokeWidth="7" strokeLinecap="round"/></g>
      <path d="M32 119 L28 153 M66 119 L72 153" stroke="#263B3C" strokeWidth="13" strokeLinecap="round"/>
      {kind === "electrician" && <><path d="M22 72L15 92" stroke="#E1B447" strokeWidth="3"/><rect x="8" y="88" width="16" height="22" rx="3" fill="#D7A43D"/><path d="M14 94l4 4-4 5" stroke="#fff" strokeWidth="2" fill="none"/></>}
      {kind === "plumber" && <path d="M14 86l-6 16 7 4 8-17" stroke="#C7D5D0" strokeWidth="4" fill="none"/>}
      {kind === "mechanic" && <><path d="M17 88l-8 14" stroke="#D8DAD1" strokeWidth="4"/><circle cx="9" cy="103" r="4" fill="#D8DAD1"/></>}
      {kind === "technician" && <rect x="72" y="88" width="18" height="22" rx="3" fill="#D4A64C"/>}
      {kind === "cleaner" && <path d="M18 86l-5 28M13 114l-8 5M13 114l8 5" stroke="#D7E7DF" strokeWidth="4" strokeLinecap="round"/>}
    </svg>
  );
}

export default function FixigoAnimatedBanner() {
  return (
    <section className="fx-banner" aria-label="FIXIGO connects customers with skilled service professionals">
      <div className="fx-brand-row">
        <svg className="fx-logo-mark" viewBox="0 0 100 64" aria-label="FIXIGO logo" role="img">
          <circle cx="27" cy="9" r="8" fill="#F0B323"/><circle cx="73" cy="9" r="8" fill="#EAF8F3"/>
          <path d="M14 37 C25 17 39 21 50 32 C61 43 75 47 86 28" fill="none" stroke="#4FD0B2" strokeWidth="12" strokeLinecap="round"/>
          <path d="M14 28 C26 48 39 43 50 32 C62 20 75 17 86 37" fill="none" stroke="#DDA51E" strokeWidth="12" strokeLinecap="round"/>
          <path d="M14 37 C25 17 39 21 50 32 C61 43 75 47 86 28" fill="none" stroke="#11A98E" strokeWidth="7" strokeLinecap="round"/>
        </svg>
        <div className="fx-brand-divider" />
        <div className="fx-brand-copy">
          <div className="fx-wordmark" aria-label="FIXIGO">{"FIXIGO".split("").map((letter, i) => <span key={i} style={{ "--letter-index": i } as React.CSSProperties}>{letter}</span>)}</div>
          <div className="fx-tagline">Right Place. Right Skill. Right Time.</div>
        </div>
      </div>
      <div className="fx-copy">
        <h1>One platform. Three <em>experiences.</em></h1>
        <p>Explore how every side of the FIXIGO ecosystem works.</p>
      </div>
      <div className="fx-scene" aria-hidden="true">
        <div className="fx-preview-pill">Interactive preview</div>
        <div className="fx-house"><span/><i/><b/></div>
        <div className="fx-orbit fx-orbit-one"/><div className="fx-orbit fx-orbit-two"/>
        <div className="fx-service fx-bolt">ϟ</div><div className="fx-service fx-tap">⌁</div><div className="fx-service fx-gear">⚙</div><div className="fx-service fx-clean">✧</div>
        <div className="fx-phone"><div className="fx-phone-notch"/><div className="fx-phone-mark">∞</div><strong>FIXIGO</strong><small>Skilled people.<br/>Real solutions.</small></div>
        <div className="fx-team">
          <Worker kind="electrician" className="fx-w1"/><Worker kind="plumber" className="fx-w2"/><Worker kind="mechanic" className="fx-w3"/><Worker kind="technician" className="fx-w4"/><Worker kind="cleaner" className="fx-w5"/>
        </div>
        <div className="fx-ground-glow"/>
      </div>
    </section>
  );
}
