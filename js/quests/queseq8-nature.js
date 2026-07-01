/* ============================================================
   EQUATIONS & INEQUALITIES · Q8 — Nature of roots & KNOW THE DIFFERENCE
   ------------------------------------------------------------
   Δ = b² − 4ac, matching the three parabola pictures to the
   sign of Δ, the rational/irrational split, the three question
   types, the (p − 2)² + 4 proof trick, the rejected k = 0, and
   the vocabulary panel: no solution / undefined / non-real / N.A.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, deltaGraph } from "./_eq.js";

const DIS = "eqDiscriminant";
const DIF = "eqKnowDiff";

const SKILLS = {
  /* what Δ is and where it lives */
  whatDelta: () => {
    const items = [
      { q: "What is the <b>discriminant</b> Δ?", correct: "Δ = b² − 4ac", wrongs: ["Δ = b² + 4ac", "Δ = √(b² − 4ac)", "Δ = −b / 2a"], ans: "Δ = b² − 4ac — the part UNDER the root in the quadratic formula (without the root itself)." },
      { q: "Where does Δ live inside the quadratic formula?", correct: "Under the square root", wrongs: ["In the denominator", "In front of the ±", "It isn't in the formula"], ans: "x = (−b ± √Δ)/2a with Δ = b² − 4ac. Its sign decides whether the root (and so the answers) exist." },
      { q: "What do the ROOTS of a quadratic look like on its graph?", correct: "The x-intercepts — where the parabola cuts the x-axis", wrongs: ["The turning point", "The y-intercept", "The axis of symmetry"], ans: "Roots = x-intercepts. That's why Δ (which counts the real roots) tells you how the parabola meets the x-axis." },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: "Δ is the b² − 4ac sitting under the root.", answerLabel: it.ans });
  },

  /* ★ match the picture to Δ */
  matchGraph: () => {
    const kind = pick(["two", "touch", "none"]);
    const correct =
      kind === "two" ? "Δ > 0 — two real, unequal roots" :
      kind === "touch" ? "Δ = 0 — real, equal roots (it touches at the TP)" :
      "Δ < 0 — non-real roots";
    const all = [
      "Δ > 0 — two real, unequal roots",
      "Δ = 0 — real, equal roots (it touches at the TP)",
      "Δ < 0 — non-real roots",
      "Δ ≥ 0 — nothing can be said",
    ];
    const wrongs = all.filter((s) => s !== correct);
    return mc(DIS, "The sketch shows how this parabola meets the x-axis. What does it tell you about Δ and the roots?",
      correct, wrongs,
      { hint: "Cuts twice → Δ > 0. Touches once → Δ = 0. Floats clear → Δ < 0.",
        answerLabel: kind === "two"
          ? "It CUTS the x-axis at two points → two real, unequal roots → Δ > 0."
          : kind === "touch"
            ? "It TOUCHES the x-axis at exactly one point (the turning point) → real, equal roots → Δ = 0."
            : "It never reaches the x-axis → no x-intercepts → non-real roots → Δ < 0.",
        graph: deltaGraph(kind) });
  },

  /* classify a computed Δ value */
  classify: () => {
    const items = [
      { d: "Δ = 16", correct: "Real, rational, unequal", wrongs: ["Real, irrational, unequal", "Real, rational, equal", "Non-real"], why: "16 > 0 AND 16 = 4² is a perfect square → rational, and unequal because Δ ≠ 0." },
      { d: "Δ = 8", correct: "Real, irrational, unequal", wrongs: ["Real, rational, unequal", "Non-real", "Real, rational, equal"], why: "8 > 0 but 8 is NOT a perfect square → the roots keep a surd: real, irrational, unequal." },
      { d: "Δ = 0", correct: "Real, rational, equal", wrongs: ["Non-real", "Real, irrational, equal", "Real, rational, unequal"], why: "Δ = 0 → the ± adds nothing: one repeated rational root (the parabola touches the axis)." },
      { d: "Δ = −47", correct: "Non-real", wrongs: ["Real, irrational, unequal", "Real, rational, equal", "Real, rational, unequal"], why: "Δ < 0 → a negative under the root → non-real roots." },
      { d: "Δ = 169", correct: "Real, rational, unequal", wrongs: ["Real, irrational, unequal", "Non-real", "Real, rational, equal"], why: "169 = 13² — a positive perfect square → real, rational, unequal." },
    ];
    const it = pick(items);
    return mc(DIS, `You work out <b>${it.d}</b>. What is the nature of the roots?`, it.correct, it.wrongs,
      { hint: "Sign first (≥ 0 real, < 0 non-real), then perfect square → rational, then 0 → equal.",
        answerLabel: it.why });
  },

  /* nature given → which condition to write */
  conditions: () => {
    const items = [
      { want: "EQUAL roots", correct: "Δ = 0", wrongs: ["Δ < 0", "Δ ≥ 0", "Δ > 0"] },
      { want: "NON-REAL roots", correct: "Δ < 0", wrongs: ["Δ = 0", "Δ > 0", "Δ ≤ 0"] },
      { want: "REAL roots", correct: "Δ ≥ 0", wrongs: ["Δ > 0", "Δ = 0", "Δ < 0"] },
      { want: "real, RATIONAL and UNEQUAL roots", correct: "Δ > 0 and Δ a perfect square", wrongs: ["Δ > 0 only", "Δ ≥ 0", "Δ = 0"] },
      { want: "two real, UNEQUAL roots", correct: "Δ > 0", wrongs: ["Δ ≥ 0", "Δ = 0", "Δ ≠ 0"] },
    ];
    const it = pick(items);
    return mc(DIS, `The question says the roots must be <b>${it.want}</b>. Which condition do you write down?`,
      it.correct, it.wrongs,
      { hint: "Translate the words into a Δ statement FIRST, then solve it for the unknown.",
        answerLabel: `${it.want} → ${it.correct}. Then substitute a, b and c (with the parameter) and solve.` });
  },

  /* the three question types (their notes' framing) */
  threeTypes: () => {
    const items = [
      { stem: "“Determine the nature of the roots of 3x² − x + 4 = 0 WITHOUT solving.”", correct: "Type 1: work out Δ and classify it with the table", wrongs: ["Type 2: set up a condition and solve for the unknown", "Type 3: prove Δ always has a certain sign", "None — it must be solved fully"] },
      { stem: "“For which values of h will 3x² − 2hx + 3 = 0 have non-real roots?”", correct: "Type 2: write the condition (Δ < 0) and solve it for h", wrongs: ["Type 1: work out Δ as a number and classify", "Type 3: prove Δ is always negative", "Solve the quadratic with the formula"] },
      { stem: "“Show that x² − px + p = 2 has two real, unequal roots for ALL p.”", correct: "Type 3: work out Δ in terms of p and show it is ALWAYS positive", wrongs: ["Type 2: solve Δ > 0 for a few values of p", "Type 1: pick p = 1 and classify", "Impossible — p is unknown"] },
    ];
    const it = pick(items);
    return mc(DIS, `Which type of nature-of-roots question is this?<br>${it.stem}`, it.correct, it.wrongs,
      { hint: "1: classify a number. 2: nature given, find the variable. 3: prove it for every value.",
        answerLabel: it.correct });
  },

  /* the proof trick: complete the square on Δ */
  proveTrick: () => {
    const items = [
      { q: "In a Type-3 proof you reach <b>Δ = (p − 2)² + 4</b>. Why is Δ ALWAYS positive?", correct: "A square is never negative, and adding 4 lifts it to at least 4 — above 0 for every p", wrongs: ["Because p must be positive", "Because Δ has a bracket in it", "It isn't — at p = 2 it fails"], ans: "(p − 2)² ≥ 0 for every p, so Δ ≥ 4 > 0 always. (At p = 2, Δ = 4 — still positive.) That proves real, unequal roots for ALL p." },
      { q: "You reach <b>Δ = 169m²</b> and m ≠ 0. What is the nature of the roots?", correct: "Real, rational and unequal — 169m² = (13m)² is a positive perfect square", wrongs: ["Real and irrational — there's an m in it", "Non-real — m could be negative", "Equal — squares mean equal roots"], ans: "169m² = (13m)², a perfect square → rational. And for m ≠ 0 it is strictly positive → unequal. (m negative doesn't matter: m² is positive.)" },
      { q: "To PROVE Δ is always positive when Δ = p² − 4p + 8, what is the standard move?", correct: "Complete the square on Δ: p² − 4p + 8 = (p − 2)² + 4", wrongs: ["Substitute p = 0, 1, 2 and check each", "Factorise Δ into two brackets", "Divide Δ by p"], ans: "Testing a few p-values proves nothing about ALL p. Complete the square: (p − 2)² + 4 ≥ 4 > 0 for every p." },
    ];
    const it = pick(items);
    return mc(DIS, it.q, it.correct, it.wrongs,
      { hint: "A square is ≥ 0; a square plus a positive number is > 0. That works for EVERY value.", answerLabel: it.ans });
  },

  /* the rejected parameter value (workbook's k = 0 error) */
  rejectParam: () => {
    const items = [
      { q: "Equal roots demand Δ = 0, which gives <b>k(k + 8) = 0</b>, so k = 0 or k = −8. But the ORIGINAL equation had kx in a denominator. Final answer?", correct: "k = −8 only — reject k = 0", wrongs: ["k = 0 or k = −8, both count", "k = 0 only", "No valid k exists"], ans: "kx in a denominator means k ≠ 0 from the start (and at k = 0 the equation isn't even a quadratic). Reject k = 0: the answer is k = −8 only." },
      ynQ(DIS,
        "A parameter value that makes the original equation's denominator 0 must still be kept if the algebra produced it. True?",
        false,
        { hint: "Restrictions outrank algebra.",
          answerLabel: "False — restrictions from the ORIGINAL equation stand. A value that breaks them is rejected (N.A.), exactly like a rejected x." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(DIS, it.q, it.correct, it.wrongs,
      { hint: "Check every parameter answer against the original equation's restrictions.", answerLabel: it.ans });
  },

  /* KNOW THE DIFFERENCE — the four words */
  knowDiff: () => {
    const items = [
      { case: `<b>3ˣ = −1</b>`, correct: "No solution", wrongs: ["Undefined", "Non-real", "Not applicable (N.A.)"], why: "A power with a positive base can never be negative — the statement can NEVER be true: no solution." },
      { case: `<b>x ÷ 0</b> (a denominator equal to 0)`, correct: "Undefined", wrongs: ["No solution", "Non-real", "Not applicable (N.A.)"], why: "Division by 0 is undefined — the ghost under the bed. Find it by setting the denominator = 0." },
      { case: `<b>√(−4)</b>`, correct: "Non-real", wrongs: ["Undefined", "No solution", "Not applicable (N.A.)"], why: "A negative under an even root has no real value → non-real. Find it by setting the inside of the root < 0." },
      { case: "An answer from a surd equation that FAILS the test in the original equation", correct: "Not applicable (N.A.)", wrongs: ["Undefined", "Non-real", "No solution"], why: "Squaring can invent extra answers. A candidate that fails the original equation is rejected: N.A." },
      { case: "An answer that equals one of the fraction equation's restrictions", correct: "Not applicable (N.A.)", wrongs: ["Undefined", "Non-real", "No solution"], why: "The value itself is rejected — mark it N.A. and keep only the valid answer(s)." },
    ];
    const it = pick(items);
    return mc(DIF, `KNOW THE DIFFERENCE: which word describes this?<br>${it.case}`, it.correct, it.wrongs,
      { hint: "No solution = never true. Undefined = denominator 0. Non-real = negative under √. N.A. = a rejected candidate answer.",
        answerLabel: it.why });
  },

  /* undefined vs non-real on one expression — fresh numbers */
  whereUndefined: () => {
    const m = randInt(1, 6);
    let n = randInt(1, 6); if (n === m) n = m + 1;   // distinct numbers keep every option unambiguous
    const ask = pick(["undef", "nonreal"]);
    const expr = `√(x + ${C(n)}) / (x + ${C(m)})`;
    if (ask === "undef") {
      return mc(DIF, `For which x is <b>${expr}</b> UNDEFINED?`,
        `x = −${C(m)} (the denominator becomes 0)`,
        [`x &lt; −${C(n)} (inside of the root negative)`, `x = −${C(n)}`, `x = ${C(m)}`],
        { hint: "Undefined is about the BOTTOM: set the denominator equal to 0.",
          answerLabel: `Undefined = denominator 0: x + ${C(m)} = 0 → x = −${C(m)}. (x < −${C(n)} is where it's NON-real — a different question!)` });
    }
    return mc(DIF, `For which x is <b>${expr}</b> NON-REAL?`,
      `x &lt; −${C(n)} (the inside of the root is negative)`,
      [`x = −${C(m)} (denominator 0)`, `x > −${C(n)}`, `x = −${C(n)}`],
      { hint: "Non-real is about the ROOT: set what's under it less than 0.",
        answerLabel: `Non-real = negative inside the root: x + ${C(n)} < 0 → x < −${C(n)}. (x = −${C(m)} is where it's UNDEFINED — a different question!)` });
  },
};

export const questEq8 = {
  id: "eq8",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["knowDiff", "whereUndefined"].includes(id) ? DIF : DIS,
    gen,
  })),
};
