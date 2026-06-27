/* ============================================================
   PROBABILITY LIBRARY — the maths, computed (so answer keys are
   never hand-typed and can't disagree with the question).
   SA conventions: comma decimal everywhere. Probabilities are
   handled as exact fractions where possible (so 3/12 shows as a
   tidy 1/4 and as 0,25), then formatted on the way out.
   ============================================================ */
import { fmtComma } from "./check.js";

/* ---------- fractions ---------- */
export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; }

/* a simplified fraction object. frac(3,12) -> {n:1,d:4,val:0.25,str:"1/4"} */
export function frac(n, d) {
  if (d === 0) return { n: 0, d: 1, val: 0, str: "0" };
  let s = (d < 0) ? -1 : 1;            // keep the sign on the numerator
  n *= s; d *= s;
  const g = gcd(n, d);
  const sn = n / g, sd = d / g;
  return { n: sn, d: sd, val: n / d, str: sd === 1 ? `${sn}` : `${sn}/${sd}` };
}

/* an UNSIMPLIFIED display string a/b (used on tree branches & before "= …") */
export const fracRaw = (n, d) => (d === 1 ? `${n}` : `${n}/${d}`);

/* probability as a comma decimal: dec(0.25) -> "0,25" ; dp default = trim */
export const dec = (v, dp = null) => fmtComma(v, dp);

/* probability as a percentage with a comma: pctOf(0.4375) -> "43,75%" */
export const pctOf = (v, dp = 2) => fmtComma(v * 100, dp).replace(/,?0+$/, m => m.includes(",") ? "" : m) + "%";

/* ---------- sample-space helpers (the die / cards examples) ---------- */
export const factorsOf = N => { const a = []; for (let k = 1; k <= N; k++) if (N % k === 0) a.push(k); return a; };
export const multiplesOf = (m, N) => { const a = []; for (let k = m; k <= N; k += m) a.push(k); return a; };
export const range1 = N => Array.from({ length: N }, (_, i) => i + 1);
export const evens = N => range1(N).filter(x => x % 2 === 0);
export const odds  = N => range1(N).filter(x => x % 2 === 1);
/* set ops on plain number arrays */
export const inter = (A, B) => A.filter(x => B.includes(x));
export const union = (A, B) => [...new Set([...A, ...B])].sort((a, b) => a - b);
export const diff  = (A, B) => A.filter(x => !B.includes(x));

/* sort the whole sample space S = {1..N} into the four Venn regions for A,B */
export function vennRegions(N, A, B) {
  const both = inter(A, B);
  const onlyA = diff(A, B);
  const onlyB = diff(B, A);
  const outside = range1(N).filter(x => !A.includes(x) && !B.includes(x));
  return {
    N, onlyA, onlyB, inter: both, outside,
    nOnlyA: onlyA.length, nOnlyB: onlyB.length, nInter: both.length, nOutside: outside.length,
    nA: A.length, nB: B.length,
  };
}

/* ---------- probability rules ---------- */
/* P(A∪B) = P(A)+P(B)−P(A∩B), all as fractions over N */
export const unionCount = (nA, nB, nInter) => nA + nB - nInter;

/* independence test from two probabilities + the actual overlap.
   returns {prod, independent} where independent is an EXACT check. */
export function independence(pA, pB, pAandB) {
  const prod = pA * pB;
  return { prod, independent: Math.abs(prod - pAandB) < 1e-9 };
}

/* ---------- coloured-ball draws (tree diagrams) ---------- */
/* counts = {G:7,Y:8,R:5}; returns total + ordered colour keys */
export function bag(counts) {
  const keys = Object.keys(counts);
  const total = keys.reduce((s, k) => s + counts[k], 0);
  return { counts, keys, total };
}

/* second-draw counts after taking one `first` colour, WITHOUT replacement */
export function afterDraw(b, first) {
  const c = { ...b.counts }; c[first] -= 1;
  return bag(c);
}

/* P(at least one of `colour`) over two draws.
   replace=true keeps denominators; false drops by one. Exact via fractions. */
export function atLeastOne(b, colour, replace) {
  const N = b.total, miss = N - b.counts[colour];
  // P(none) = (miss/N) × (miss-or-miss / N-or-(N-1))
  let pNone;
  if (replace) pNone = frac(miss * miss, N * N);
  else          pNone = frac(miss * (miss - 1), N * (N - 1));
  return { pNone, pAtLeast: frac(pNone.d - pNone.n, pNone.d), pNoneVal: pNone.val, pAtLeastVal: 1 - pNone.val };
}

/* every two-draw path with its product probability (for the with/without tables).
   returns [{path:"GR", a, b, n, d, val}] using a common denominator. */
export function twoDrawPaths(b, replace) {
  const N = b.total, out = [];
  b.keys.forEach(k1 => {
    const n1 = b.counts[k1];
    const b2 = replace ? b : afterDraw(b, k1);
    const D = replace ? N : N - 1;
    b.keys.forEach(k2 => {
      const n2 = b2.counts[k2];
      out.push({ path: k1 + k2, k1, k2, n1, d1: N, n2, d2: D, n: n1 * n2, d: N * D, val: (n1 * n2) / (N * D) });
    });
  });
  return out;
}
