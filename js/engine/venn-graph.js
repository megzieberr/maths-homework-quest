/* ============================================================
   VENN ENGINE  (sample space + events)
   ------------------------------------------------------------
   A to-scale Venn diagram: a rectangle is the sample space S,
   one or two overlapping circles are the events. Any region can be
   shaded with the accent (so "here is A∪B — what is P(A∪B)?" shows
   the exact region), and every region carries a label (elements,
   a count, or a probability). Like the stats/timeline engines it
   exposes compute / render / verify.

   Correctness guarantee (verify): the two circles genuinely overlap
   (neither contains the other), and EVERY region's label anchor is
   geometrically inside the region it names — so a tap or a shaded
   picture can never point at the wrong region.

   spec: {
     type:"venn", mode:"two"|"one",
     A?, B?,                                   // circle name labels ("A","B")
     s?,                                        // sample-space label, e.g. "n(S) = 12"
     regions?:{ onlyA, inter, onlyB, outside,  // text inside each region
                inside, out },                  // (one-circle uses inside/out)
     shade?:[ regionId... ],                    // regions filled with the accent
     w?, h?, accent?,
     tap?:{ targets:[id...], correctId }        // optional tap-a-region question
   }
   ============================================================ */

const N = v => Math.round(v * 100) / 100;
let MASK_SEQ = 0;                                  // unique mask ids across a page

function svgWrap(W, H, accent, inner, cls = "") {
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg vn ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}
function textLines(x, y, s, cls) {
  const lines = String(s).split("\n");
  const lh = 12;
  const y0 = y - (lines.length - 1) * lh / 2;
  return `<text class="${cls}" x="${N(x)}" y="${N(y0)}" text-anchor="middle" dominant-baseline="middle">` +
    lines.map((ln, i) => `<tspan x="${N(x)}" dy="${i === 0 ? 0 : lh}">${ln}</tspan>`).join("") + `</text>`;
}

export function computeVenn(spec) {
  const one = spec.mode === "one";
  const W = spec.w || 360, H = spec.h || 176;
  const rectX = 8, rectY = 22, rectW = W - 16, rectH = H - 30;
  const cy = rectY + rectH / 2;

  let circles, anchors;
  if (one) {
    const r = 50, cx = W / 2;
    circles = { A: { cx, cy, r } };
    anchors = {
      inside: { x: cx, y: cy },
      out:    { x: (rectX + (cx - r)) / 2, y: cy },   // centred in the gap left of the circle
      A:      { x: cx, y: cy - r - 0 },     // name tag drawn just inside the top
    };
  } else {
    const r = 52, sep = 50;
    const cxA = W / 2 - sep / 2, cxB = W / 2 + sep / 2;
    circles = { A: { cx: cxA, cy, r }, B: { cx: cxB, cy, r } };
    anchors = {
      onlyA:   { x: cxA - r * 0.5, y: cy },
      inter:   { x: W / 2,         y: cy },
      onlyB:   { x: cxB + r * 0.5, y: cy },
      outside: { x: rectX + 20,    y: rectY + 18 },
      Atag:    { x: cxA - r * 0.78, y: cy - r * 0.78 },
      Btag:    { x: cxB + r * 0.78, y: cy - r * 0.78 },
    };
  }
  return { type: "venn", one, W, H, rectX, rectY, rectW, rectH, cy, circles, anchors };
}

const inCircle = (px, py, c) => (px - c.cx) ** 2 + (py - c.cy) ** 2 <= c.r ** 2 + 0.5;

/* mask/clip description for a shaded region → returns the base shape (filled
   with accent) plus a list of white(show)/black(hide) mask shapes. */
function shapeFor(id, g) {
  const A = g.circles.A, B = g.circles.B;
  const rect = `<rect x="${g.rectX}" y="${g.rectY}" width="${g.rectW}" height="${g.rectH}"`;
  const cir = c => `<circle cx="${N(c.cx)}" cy="${N(c.cy)}" r="${c.r}"`;
  const W = "fill=\"#fff\"/>", K = "fill=\"#000\"/>";
  switch (id) {
    case "inside": return { base: cir(A) };                                   // one-circle
    case "out":    return { base: rect, mask: [rect + W, cir(A) + K] };
    case "A":      return { base: cir(A) };
    case "B":      return { base: cir(B) };
    case "onlyA":  return { base: cir(A), mask: [rect + W, cir(B) + K] };
    case "onlyB":  return { base: cir(B), mask: [rect + W, cir(A) + K] };
    case "inter":  return { base: cir(A), mask: [cir(B) + W] };               // show A only where B is
    case "union":  return { base: cir(A), extra: cir(B) + `fill="var(--accent)"/>` };
    case "outside":return { base: rect, mask: [rect + W, cir(A) + K, cir(B) + K] };
    case "notA":   return { base: rect, mask: [rect + W, cir(A) + K] };
    case "notB":   return { base: rect, mask: [rect + W, cir(B) + K] };
    default:       return null;
  }
}

export function renderVenn(spec) {
  const g = computeVenn(spec);
  let defs = "", fills = "";

  // shaded regions (drawn first, under the outlines)
  (spec.shade || []).forEach(id => {
    const s = shapeFor(id, g);
    if (!s) return;
    if (s.mask) {
      const mid = `vnm${MASK_SEQ++}`;
      defs += `<mask id="${mid}">${s.mask.join("")}</mask>`;
      fills += s.base + ` fill="var(--accent)" mask="url(#${mid})"/>`;
    } else {
      fills += s.base + ` fill="var(--accent)"/>`;
      if (s.extra) fills += s.extra;
    }
  });

  // outlines: rectangle then circle(s)
  let out = `<rect class="vn-rect" x="${g.rectX}" y="${g.rectY}" width="${g.rectW}" height="${g.rectH}" rx="6"/>`;
  out += `<circle class="vn-circle" cx="${N(g.circles.A.cx)}" cy="${N(g.circles.A.cy)}" r="${g.circles.A.r}"/>`;
  if (!g.one) out += `<circle class="vn-circle" cx="${N(g.circles.B.cx)}" cy="${N(g.circles.B.cy)}" r="${g.circles.B.r}"/>`;

  // sample-space label (top)
  if (spec.s) out += `<text class="vn-slab" x="${g.W / 2}" y="14" text-anchor="middle">${spec.s}</text>`;

  // circle name tags
  if (g.one) {
    if (spec.A) out += `<text class="vn-name" x="${N(g.circles.A.cx)}" y="${N(g.rectY + 14)}" text-anchor="middle">${spec.A}</text>`;
  } else {
    if (spec.A) out += `<text class="vn-name" x="${N(g.anchors.Atag.x)}" y="${N(g.anchors.Atag.y)}" text-anchor="middle">${spec.A}</text>`;
    if (spec.B) out += `<text class="vn-name" x="${N(g.anchors.Btag.x)}" y="${N(g.anchors.Btag.y)}" text-anchor="middle">${spec.B}</text>`;
  }

  // region labels (elements / counts / probabilities)
  const reg = spec.regions || {};
  Object.keys(reg).forEach(id => {
    const a = g.anchors[id];
    if (a && reg[id] != null && reg[id] !== "") out += textLines(a.x, a.y, reg[id], "vn-reg");
  });

  return svgWrap(g.W, g.H, spec.accent, `<defs>${defs}</defs>${fills}${out}`, spec.tap ? "vn-tappable" : "");
}

export function verifyVenn(spec) {
  const g = computeVenn(spec), r = [];
  if (g.one) {
    const A = g.circles.A;
    r.push({ label: "circle sits inside the rectangle", ok:
      A.cx - A.r >= g.rectX && A.cx + A.r <= g.rectX + g.rectW && A.cy - A.r >= g.rectY && A.cy + A.r <= g.rectY + g.rectH });
    r.push({ label: "‘inside’ anchor is inside the circle",  ok:  inCircle(g.anchors.inside.x, g.anchors.inside.y, A) });
    r.push({ label: "‘outside’ anchor is outside the circle", ok: !inCircle(g.anchors.out.x, g.anchors.out.y, A) });
    return r;
  }
  const A = g.circles.A, B = g.circles.B;
  const dist = Math.hypot(A.cx - B.cx, A.cy - B.cy);
  // 1) the circles genuinely overlap, and neither swallows the other
  r.push({ label: "the two circles overlap (a real intersection)", ok: dist < A.r + B.r && dist > Math.abs(A.r - B.r) });
  // 2) both circles fit in the rectangle
  const fits = c => c.cx - c.r >= g.rectX && c.cx + c.r <= g.rectX + g.rectW && c.cy - c.r >= g.rectY && c.cy + c.r <= g.rectY + g.rectH;
  r.push({ label: "both circles sit inside the rectangle", ok: fits(A) && fits(B) });
  // 3) every region anchor classifies to exactly its own region
  const cls = (p) => {
    const a = inCircle(p.x, p.y, A), b = inCircle(p.x, p.y, B);
    return a && b ? "inter" : a ? "onlyA" : b ? "onlyB" : "outside";
  };
  ["onlyA", "inter", "onlyB", "outside"].forEach(id => {
    r.push({ label: `‘${id}’ anchor lands in the ${id} region`, ok: cls(g.anchors[id]) === id });
  });
  return r;
}
