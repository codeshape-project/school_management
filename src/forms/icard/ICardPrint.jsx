import { useMemo } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import PrintPreview from "../../components/PrintPreview";
import ICardFace, { ICARD_CSS } from "./ICardFace";
import { chunk } from "./icardUtils";

/* =========================================================
   PRINT WINDOW FOR I-CARDS

   The cards are drawn with the very same ICardFace component
   used on screen, turned into plain HTML, and shown in the
   existing PrintPreview window (iframe + Print button).

   layout "a4"   -> A4 sheet, 3 x 3 = 9 cards per page, thin
                    cut lines around every card
   layout "card" -> one card per page, page size 54 x 86 mm
                    (for a PVC / card printer)
========================================================= */

const A4_CSS = `
@page{size:A4;margin:0}
html,body{margin:0;padding:0}
.sheet{width:210mm;height:296mm;box-sizing:border-box;padding:14mm 19mm;display:grid;
  grid-template-columns:repeat(3,54mm);grid-auto-rows:86mm;gap:5mm;justify-content:center;align-content:start;
  page-break-after:always;break-after:page;background:#fff}
.sheet:last-child{page-break-after:auto;break-after:auto}
.cell{width:54mm;height:86mm;border-radius:3mm;outline:.15mm solid #c3c9d2}
@media screen{
  html{overflow-x:hidden}
  body{background:#cbd5e1;padding:8px 0}
  .sheet{margin:0 auto 10px;box-shadow:0 1px 6px rgba(0,0,0,.28)}
}`;

const CARD_CSS = `
@page{size:54mm 86mm;margin:0}
html,body{margin:0;padding:0}
.page{width:54mm;height:86mm;overflow:hidden;page-break-after:always;break-after:page;background:#fff}
.page:last-child{page-break-after:auto;break-after:auto}
@media screen{
  body{background:#cbd5e1;padding:10px 0}
  .page{margin:0 auto 10px;box-shadow:0 1px 6px rgba(0,0,0,.28)}
}`;

/* items = [{ card, template, type }] */
export function buildPrintHtml(items, layout = "a4") {
  const faces = items.map((it) =>
    renderToStaticMarkup(<ICardFace card={it.card} template={it.template} type={it.type} size="1mm" />)
  );

  const body =
    layout === "card"
      ? faces.map((f) => `<div class="page">${f}</div>`).join("")
      : chunk(faces, 9)
          .map((group) => `<div class="sheet">${group.map((f) => `<div class="cell">${f}</div>`).join("")}</div>`)
          .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>I-Cards</title>
<style>${ICARD_CSS}${layout === "card" ? CARD_CSS : A4_CSS}</style></head><body>${body}</body></html>`;
}

export function CardPrintWindow({ items, layout = "a4", title = "Print I-Cards", onClose }) {
  const html = useMemo(() => buildPrintHtml(items, layout), [items, layout]);
  const a4 = layout !== "card";

  return (
    <PrintPreview
      title={`${title} (${items.length})`}
      html={html}
      pageWidth={a4 ? 794 : 330}
      pageHeight={a4 ? 1123 : 520}
      onClose={onClose}
    />
  );
}
