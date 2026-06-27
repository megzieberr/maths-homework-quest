/* ============================================================
   PROBABILITY QUEST 1 · Chance & the scale
   Sample space, theoretical probability (fraction / decimal /
   percentage) and relative frequency. Every answer key is computed
   from the event set — never hand-typed.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { range1, odds, evens, multiplesOf, factorsOf, frac, dec, pctOf } from "../problib.js";

const BASICS = "probBasics";
const REL = "relFreq";

/* an event on a fair N-sided die: returns {desc, set} */
function evt(N) {
  const opts = [
    () => ({ desc: "an odd number", set: odds(N) }),
    () => ({ desc: "an even number", set: evens(N) }),
    () => { const m = pick([2, 3, 4]); return { desc: `a multiple of ${m}`, set: multiplesOf(m, N) }; },
    () => ({ desc: `a factor of ${N}`, set: factorsOf(N) }),
    () => { const k = randInt(2, N - 2); return { desc: `greater than ${k}`, set: range1(N).filter(x => x > k) }; },
    () => { const k = randInt(3, N - 1); return { desc: `at most ${k}`, set: range1(N).filter(x => x <= k) }; },
  ];
  let e; do { e = pick(opts)(); } while (e.set.length === 0 || e.set.length === N);
  return e;
}

const SKILLS = {
  sampleSpace: () => {
    const N = pick([6, 8, 10, 12]);
    return {
      type: "calc", concept: BASICS, dp: 0,
      prompt: `A fair <b>${N}-sided</b> die is rolled once. How many outcomes are in the sample space, <b>n(S)</b>?`,
      expected: N,
      hint: "The sample space is every value the die could land on.",
      answerLabel: `n(S) = ${N}`,
      solution: [{ s: `S = {1; 2; … ; ${N}}, so n(S) = ${N}.` }],
    };
  },

  countOutcomes: () => {
    const N = pick([8, 10, 12]); const e = evt(N);
    return {
      type: "calc", concept: BASICS, dp: 0,
      prompt: `A fair ${N}-sided die is rolled. How many outcomes give <b>${e.desc}</b>? (that is n(E))`,
      expected: e.set.length,
      hint: "List the values that fit, then count them.",
      answerLabel: `${e.desc} = {${e.set.join("; ")}}, so n(E) = ${e.set.length}`,
      solution: [{ s: `The outcomes are {${e.set.join("; ")}} → n(E) = ${e.set.length}.` }],
    };
  },

  probFraction: () => {
    const N = pick([6, 8, 10, 12]); const e = evt(N);
    const f = frac(e.set.length, N);
    const wrongs = [
      `${N}/${e.set.length}`,                           // inverted
      `${e.set.length}/${N}`,                            // unsimplified (if it simplified) — else drop
      frac(e.set.length, N - 1).str,                     // wrong denominator
    ].filter((w, i, a) => w !== f.str && a.indexOf(w) === i).slice(0, 3);
    return mc(BASICS,
      `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a fraction in simplest form.`,
      f.str, wrongs,
      { hint: "P(E) = n(E) / n(S). Then simplify.",
        answerLabel: `P = ${e.set.length}/${N} = ${f.str}`,
        solution: [{ s: `n(E) = ${e.set.length}, n(S) = ${N}` }, { s: `P = ${e.set.length}/${N} = ${f.str}` }] });
  },

  probDecimal: () => {
    const N = pick([8, 10, 12, 20]); const e = evt(N);
    const v = e.set.length / N;
    return {
      type: "calc", concept: BASICS, dp: 2,
      prompt: `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a decimal (2 places).`,
      expected: v,
      hint: "Work out n(E) / n(S), then divide it out.",
      answerLabel: `P = ${e.set.length}/${N} = ${dec(v, 2)}`,
      solution: [{ s: `P = ${e.set.length}/${N} = ${dec(v, 2)}` }],
    };
  },

  probPercent: () => {
    const N = pick([8, 10, 20]); const e = evt(N);
    const v = e.set.length / N;
    return {
      type: "calc", concept: BASICS, dp: 0, unit: "%",
      prompt: `A fair ${N}-sided die is rolled. Write <b>P(${e.desc})</b> as a percentage.`,
      expected: v * 100,
      hint: "Find P as a decimal, then × 100 for a percentage.",
      answerLabel: `P = ${dec(v, 2)} = ${pctOf(v, 0)}`,
      solution: [{ s: `P = ${e.set.length}/${N} = ${dec(v, 2)} = ${pctOf(v, 0)}` }],
    };
  },

  relativeFrequency: () => {
    const total = pick([20, 25, 40, 50]); const hits = randInt(Math.round(total * 0.3), Math.round(total * 0.8));
    const v = hits / total; const thing = pick(["heads", "a six", "red", "a win"]);
    return {
      type: "calc", concept: REL, dp: 2,
      prompt: `An experiment is run <b>${total}</b> times and "${thing}" happens <b>${hits}</b> times. What is the <b>relative frequency</b> of "${thing}"? (decimal, 2 places)`,
      expected: v,
      hint: "relative frequency = times it happened ÷ total trials.",
      answerLabel: `${hits}/${total} = ${dec(v, 2)}`,
      solution: [{ s: `relative frequency = ${hits} ÷ ${total} = ${dec(v, 2)}` }],
    };
  },

  theoryVsRel: () => mc(REL,
    "Which one is worked out <b>before</b> doing any experiment — just from the possible outcomes?",
    "theoretical probability",
    ["relative frequency", "the relative frequency, always", "neither — both need data first"],
    { hint: "One is a prediction; the other is what actually happened.",
      answerLabel: "Theoretical probability is the prediction; relative frequency comes from real data." }),

  scaleSense: () => {
    const bad = pick(["1,4", "−0,2", "120% (as a probability)", "3/2"]);
    return mc(BASICS,
      "A probability must lie between 0 and 1. Which of these <b>cannot</b> be a probability?",
      bad,
      ["0", "0,5", "1"].filter(x => x !== bad).slice(0, 3),
      { hint: "0 = impossible, 1 = certain. Nothing can be more likely than certain.",
        answerLabel: `${bad} is outside the 0–1 range, so it is impossible as a probability.` });
  },
};

export const questP1 = {
  id: "p1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "relativeFrequency" || id === "theoryVsRel" ? REL : BASICS, gen })),
};
