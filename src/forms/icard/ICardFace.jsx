import { memo } from "react";
import {
  THEMES, absUrl, cardRows, classLabel, currentSession, fitFont, photoSrc, sessionShort,
} from "./icardUtils";

/* =========================================================
   I-CARD DESIGN  (54 x 86 mm portrait - standard CR80 size)

   Every size below is written in "u" (card units).
   --u is set by whoever shows the card:
       on screen   --u: 5px   (or smaller for thumbnails)
       printing    --u: 1mm   -> the card is exactly 54 x 86 mm

   So the same component is used for the preview, the
   thumbnails and the print sheet - they always look alike.
========================================================= */

const u = (n) => `calc(var(--u, 5px) * ${n})`;

export const ICARD_CSS = `
.icard{
  position:relative;flex:none;overflow:hidden;box-sizing:border-box;
  width:${u(54)};height:${u(86)};border-radius:${u(3)};
  background:#fffdfa;color:#1c2430;
  font-family:"Segoe UI","Helvetica Neue",Arial,sans-serif;
  -webkit-print-color-adjust:exact;print-color-adjust:exact;
}
.icard *{box-sizing:border-box;margin:0;padding:0}
.icard .ic-bg{position:absolute;left:0;top:0;width:100%;height:100%;display:block}
.icard .f-p{fill:var(--p)} .icard .f-pd{fill:var(--pd)} .icard .f-soft{fill:var(--soft)}
.icard .f-acc{fill:var(--accent)} .icard .s-p{stroke:var(--p)}

.icard .ic-year{position:absolute;top:${u(2.4)};right:${u(2.6)};width:${u(17)};text-align:center;
  color:#fff;font-weight:800;font-size:${u(3.1)};letter-spacing:.02em;line-height:1}

.icard .ic-logo{position:absolute;left:${u(21.3)};top:${u(2.6)};width:${u(11.4)};height:${u(11.4)};
  border-radius:50%;background:#fff;border:${u(.35)} solid var(--accent);overflow:hidden;
  display:flex;align-items:center;justify-content:center}
.icard .ic-logo img{width:100%;height:100%;object-fit:contain;padding:${u(.5)};display:block}

.icard .ic-title{position:absolute;left:${u(2)};right:${u(2)};top:${u(14.7)};text-align:center;
  font-weight:900;color:var(--title);line-height:1.05;white-space:nowrap;text-transform:uppercase;letter-spacing:-.01em}
.icard .ic-sub{position:absolute;left:${u(2)};right:${u(2)};top:${u(20.2)};text-align:center;
  font-weight:800;color:var(--navy);line-height:1.1;white-space:nowrap;text-transform:uppercase;letter-spacing:.02em}

.icard .ic-halo{position:absolute;left:50%;top:${u(22.9)};width:${u(26)};height:${u(26)};
  margin-left:${u(-13)};border-radius:50%;background:var(--soft);opacity:.9}
.icard .ic-ring{position:absolute;left:50%;top:${u(24.4)};width:${u(23)};height:${u(23)};
  margin-left:${u(-11.5)};border-radius:50%;background:var(--p);padding:${u(.8)}}
.icard .ic-ring-in{width:100%;height:100%;border-radius:50%;background:#fff;padding:${u(.45)}}
.icard .ic-photo{width:100%;height:100%;border-radius:50%;overflow:hidden;background:var(--soft);
  display:flex;align-items:flex-end;justify-content:center}
.icard .ic-photo img{width:100%;height:100%;object-fit:cover;object-position:center top;display:block}
.icard .ic-photo svg{width:78%;height:78%;display:block}

.icard .ic-name{position:absolute;left:${u(3)};right:${u(3)};top:${u(48.4)};text-align:center;
  font-weight:800;color:var(--name);line-height:1.1;white-space:nowrap;text-transform:uppercase;
  overflow:hidden;text-overflow:ellipsis}
.icard .ic-class{position:absolute;left:${u(2)};right:${u(2)};top:${u(53)};text-align:center;
  font-weight:800;color:var(--title);line-height:1.1;white-space:nowrap;letter-spacing:.02em}

.icard .ic-rows{position:absolute;left:${u(4.4)};right:${u(2.8)};top:${u(58)}}
.icard .ic-row{display:flex;align-items:flex-start;line-height:1.2;color:#1f2733}
.icard .ic-row .l{flex:none;width:${u(15.2)};font-weight:700;color:#17202c;white-space:nowrap}
.icard .ic-row .d{flex:none;width:${u(2)};text-align:center;font-weight:700}
.icard .ic-row .v{flex:1;min-width:0;font-weight:600;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.icard .ic-row .v.wrap{white-space:normal;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}

.icard .ic-sign{position:absolute;left:${u(3.2)};top:${u(73.6)};width:${u(14)};height:${u(10.4)};
  display:flex;flex-direction:column;align-items:center;justify-content:flex-end}
.icard .ic-sign img{width:100%;height:${u(6.6)};object-fit:contain;display:block}
.icard .ic-sign .lbl{width:100%;margin-top:${u(.4)};padding-top:${u(.3)};border-top:${u(.15)} solid #6b7480;
  text-align:center;font-size:${u(1.7)};font-weight:700;color:#2b3440;line-height:1.1;white-space:nowrap;
  overflow:hidden;text-overflow:ellipsis}

.icard .ic-pill{position:absolute;left:${u(18.4)};right:${u(2.8)};top:${u(77.4)};height:${u(6.6)};
  border-radius:${u(3.3)};background:var(--p);display:flex;align-items:center;padding:0 ${u(.6)}}
.icard .ic-pill .ph{flex:none;width:${u(5.4)};height:${u(5.4)};border-radius:50%;background:var(--accent);
  display:flex;align-items:center;justify-content:center}
.icard .ic-pill .ph svg{width:${u(3)};height:${u(3)};display:block}
.icard .ic-pill .no{flex:1;min-width:0;text-align:center;color:#fff;font-weight:800;letter-spacing:.04em;
  white-space:nowrap;line-height:1;padding-right:${u(1)}}
`;

/* style tag - render once on any screen that shows cards */
export function ICardStyles() {
  return <style>{ICARD_CSS}</style>;
}

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      className="f-p"
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"
    />
  </svg>
);

const Silhouette = () => (
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="34" r="17" fill="#fff" opacity=".9" />
    <path d="M14 100c0-22 16-36 36-36s36 14 36 36z" fill="#fff" opacity=".9" />
  </svg>
);

/* =========================================================
   THE CARD
   card      = what is printed (name, father name, photoUrl ...)
   template  = school name, theme, logo, rows to show ...
   type      = "student" | "staff"
   size      = optional --u value, e.g. "4px" or "1mm"
========================================================= */

function ICardFace({ card = {}, template, type = "student", size }) {
  const theme = THEMES[template.theme] || THEMES.maroon;
  const rows = cardRows(card, template, type);

  const vars = {
    "--p": theme.p, "--pd": theme.pd, "--accent": theme.accent,
    "--title": theme.title, "--name": theme.name, "--soft": theme.soft, "--navy": theme.navy,
  };
  if (size) vars["--u"] = size;

  const school = String(template.schoolName || "").trim();
  const subtitle = String(template.subtitle || "").trim();
  const name = String(card.name || "").trim();
  const phone = String(template.phone || "").trim();

  const year =
    String(template.sessionLabel || "").trim() ||
    (type === "student" ? sessionShort(card.session) : currentSession());

  const classText =
    type === "student"
      ? classLabel(card.className, card.section, template.showSection)
      : String(card.designation || "").toUpperCase();

  // many rows -> slightly smaller text so everything still fits above the footer
  const longAddress = rows.some((r) => r.long && r.value.length > 26);
  const lines = rows.length + (longAddress ? 1 : 0);
  const rowFont = lines <= 6 ? 2.1 : Math.max(1.6, (2.1 * 6) / lines);
  const rowGap = lines <= 6 ? 0.45 : 0.25;

  const photo = photoSrc(card.photoUrl);

  return (
    <div className="icard" style={vars}>
      {/* ---------- background art ---------- */}
      <svg className="ic-bg" viewBox="0 0 540 860" preserveAspectRatio="none" aria-hidden="true">
        <circle className="f-soft" cx="70" cy="30" r="190" opacity=".6" />
        <circle className="f-soft" cx="-20" cy="250" r="110" opacity=".4" />

        <path className="f-p" d="M300 0H540V122C450 114 350 82 300 0Z" />
        <path className="f-pd" d="M345 0H540V86C460 76 392 46 345 0Z" opacity=".5" />

        {/* paper plane (kept above the school name) */}
        <path className="f-acc" d="M402 112L528 58L502 130L464 108Z" />
        <path d="M464 108L528 58L452 138Z" fill="#21b8b0" />
        <path d="M452 138L464 108L480 120Z" fill="#0e8f8a" />

        {/* wave behind the photo */}
        <path className="f-soft" d="M0 262C130 205 410 205 540 262L540 470C410 420 130 420 0 470Z" opacity=".85" />
        <path className="s-p" d="M0 266C130 209 410 209 540 266" fill="none" strokeWidth="2.4" opacity=".5" />

        <path className="f-soft" d="M0 760C140 735 400 735 540 760V846H0Z" opacity=".55" />

        <rect className="f-p" x="0" y="0" width="9" height="860" />
        <rect className="f-p" x="0" y="846" width="540" height="14" />
        <rect className="f-acc" x="0" y="842" width="540" height="4" />
      </svg>

      {/* ---------- header ---------- */}
      <div className="ic-year">{year}</div>

      <div className="ic-logo">
        {template.logoUrl ? <img src={absUrl(template.logoUrl)} alt="" /> : null}
      </div>

      {school && (
        <div className="ic-title" style={{ fontSize: u(fitFont(school, 49, 4.7, 2.4, 0.66)) }}>
          {school}
        </div>
      )}
      {subtitle && (
        <div className="ic-sub" style={{ fontSize: u(fitFont(subtitle, 49, 2.5, 1.5, 0.62)) }}>
          {subtitle}
        </div>
      )}

      {/* ---------- photo ---------- */}
      <div className="ic-halo" />
      <div className="ic-ring">
        <div className="ic-ring-in">
          <div className="ic-photo">
            {photo ? <img src={photo} alt="" /> : <Silhouette />}
          </div>
        </div>
      </div>

      {/* ---------- name + class ---------- */}
      <div className="ic-name" style={{ fontSize: u(fitFont(name, 48, 3.7, 1.7, 0.64)) }}>
        {name}
      </div>
      {classText && (
        <div className="ic-class" style={{ fontSize: u(fitFont(classText, 50, 3.1, 1.9, 0.62)) }}>
          {classText}
        </div>
      )}

      {/* ---------- details ---------- */}
      <div className="ic-rows" style={{ fontSize: u(rowFont) }}>
        {rows.map((r) => (
          <div className="ic-row" key={r.key} style={{ marginBottom: u(rowGap) }}>
            <span className="l">{r.label}</span>
            <span className="d">-</span>
            <span className={`v${r.long ? " wrap" : ""}`}>{r.value}</span>
          </div>
        ))}
      </div>

      {/* ---------- footer ---------- */}
      <div className="ic-sign">
        {template.signatureUrl ? <img src={absUrl(template.signatureUrl)} alt="" /> : null}
        {template.signatureLabel ? <div className="lbl">{template.signatureLabel}</div> : null}
      </div>

      {phone && (
        <div className="ic-pill">
          <span className="ph"><PhoneIcon /></span>
          <span className="no" style={{ fontSize: u(fitFont(phone, 24, 3.4, 2, 0.62)) }}>{phone}</span>
        </div>
      )}
    </div>
  );
}

export default memo(ICardFace);
