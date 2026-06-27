/* ============================================================
   CONCEPT CARDS  ("I'm lost" — re-teach the idea from scratch)
   ------------------------------------------------------------
   Opened from any question via the "I'm lost" button. Re-teaches
   the underlying idea, then the learner returns to a FRESH sibling
   question on the same skill. Wording follows CAPS conventions;
   example numbers are original (never from the planning PDFs).
   ============================================================ */
export const CONCEPTS = {
  quartiles: {
    title: "Quartiles & their positions",
    body: `
      <p>Quartiles cut the <b>ordered</b> data into four equal parts. Always sort the values from smallest to largest first.</p>
      <ul>
        <li><b>Q1</b> (lower quartile) — the 25% point</li>
        <li><b>Q2</b> (median) — the 50% point</li>
        <li><b>Q3</b> (upper quartile) — the 75% point</li>
      </ul>
      <p>For ungrouped data, first find the <b>position</b> in the list (n = how many values):</p>
      <div class="formula">pos Q1 = (n + 1)/4   ·   pos Q2 = (n + 1)/2   ·   pos Q3 = 3(n + 1)/4</div>
      <p>Then read the rounding off the decimal:</p>
      <ul>
        <li>ends in <b>,5</b> → take the middle value (average the two either side)</li>
        <li>ends in <b>,25</b> → round the position <b>down</b></li>
        <li>ends in <b>,75</b> → round the position <b>up</b></li>
      </ul>
      <div class="eg">e.g. n = 7, pos Q1 = 8/4 = 2 → Q1 is the 2nd value. pos Q3 = 24/4 = 6 → the 6th value.</div>`,
  },
  iqr: {
    title: "Interquartile range (IQR)",
    body: `
      <p>The IQR measures the spread of the <b>middle 50%</b> of the data — it ignores the extremes.</p>
      <div class="formula">IQR = Q3 − Q1</div>
      <p>A small IQR means the middle half is bunched together; a large IQR means it is spread out.</p>
      <div class="eg">e.g. Q1 = 24 and Q3 = 39 → IQR = 39 − 24 = 15.</div>`,
  },
  outliers: {
    title: "Outliers & the boundaries",
    body: `
      <p>An outlier is a value that lies <b>outside</b> the fences. First find the IQR, then the boundaries:</p>
      <div class="formula">lower boundary = Q1 − 1,5 × IQR<br>upper boundary = Q3 + 1,5 × IQR</div>
      <p>Any value <b>below</b> the lower boundary or <b>above</b> the upper boundary is an outlier.</p>
      <div class="eg">e.g. Q1 = 20, Q3 = 32 → IQR = 12. Lower = 20 − 18 = 2; upper = 32 + 18 = 50. So 1 is an outlier, 48 is not.</div>`,
  },
  fivenum: {
    title: "Five-number summary",
    body: `
      <p>Five values describe the whole data set and build the box-and-whisker plot:</p>
      <div class="formula">minimum · Q1 · median (Q2) · Q3 · maximum</div>
      <p>They split the data into four parts, each holding about <b>25%</b> of the values.</p>`,
  },
  boxplot: {
    title: "Reading a box-and-whisker plot",
    body: `
      <p>A box plot is drawn straight from the five-number summary on a number line:</p>
      <ul>
        <li>the two <b>whisker ends</b> = minimum and maximum</li>
        <li>the <b>box</b> goes from <b>Q1 to Q3</b> — its width is the <b>IQR</b></li>
        <li>the <b>line inside the box</b> = the median (Q2)</li>
      </ul>
      <p>Each of the four sections (whisker, box-left, box-right, whisker) holds about 25% of the data.</p>`,
  },
  percentile: {
    title: "Percentiles",
    body: `
      <p>A percentile is a generalised quartile. The p-th percentile is the value below which about p% of the data falls (so Q1 is the 25th percentile, the median the 50th).</p>
      <div class="formula">position = (n + 1) × p/100</div>
      <p>Find the position, then count to that value in the ordered list.</p>
      <div class="eg">e.g. n = 9, the 30th percentile sits at position 10 × 0,3 = 3 → the 3rd value.</div>`,
  },

  calculator: {
    title: "Using the stats calculator",
    body: `
      <p>Every stats question starts the same way on a Casio fx-calculator:</p>
      <ul>
        <li><b>Clear it:</b> SHIFT, 9, 3 (All), = (Yes)</li>
        <li><b>Frequency on/off:</b> SHIFT, MODE (SETUP), ↓, 4 (STAT), then 1 (ON) or 2 (OFF)</li>
        <li><b>Enter data:</b> MODE, 3 (STAT), 1 (1-VAR), type the values, AC</li>
      </ul>
      <p>Then read a value: SHIFT, 1 (STAT), 4 (Var) gives <b>1:n  2:x̄  3:σx  4:sx</b>, and 6 (MinMax) gives <b>minX, maxX, Q1, med, Q3</b>.</p>
      <div class="eg">Use σx (option 3) for the standard deviation — not sx.</div>`,
  },
  mean: {
    title: "Mean, mode, median & range",
    body: `
      <p><b>Mean</b> x̄ = (sum of the values) ÷ (how many values) = Σx / n.</p>
      <p><b>Mode</b> = the value that appears most often.</p>
      <p><b>Median</b> = the middle value once the data is in order (average the two middle ones if n is even).</p>
      <p><b>Range</b> = maximum − minimum. It is a measure of <b>spread</b>, not centre.</p>
      <div class="eg">3; 5; 5; 8; 9 → mean 6, mode 5, median 5, range 6.</div>`,
  },
  skewness: {
    title: "Skewness & shape",
    body: `
      <p>The skew is named for the <b>tail</b> — the long thin end — not for where the bulk of the data sits.</p>
      <ul>
        <li><b>Symmetric / normal:</b> balanced; x̄ = median.</li>
        <li><b>Skewed right (positive):</b> tail points right; a few high values pull the mean up, so x̄ &gt; median.</li>
        <li><b>Skewed left (negative):</b> tail points left; a few low values pull the mean down, so x̄ &lt; median.</li>
      </ul>
      <p>On a box plot, the longer whisker / bigger half shows the tail. On an ogive, the tail is the flat end.</p>`,
  },
  groupedMean: {
    title: "Estimated mean (grouped data)",
    body: `
      <p>For grouped data each class is represented by its <b>midpoint</b> x = (lower + upper) ÷ 2.</p>
      <div class="formula">estimated mean x̄ = Σ(f × x) / n</div>
      <p>Multiply each frequency by its midpoint, add those up, then divide by the total frequency n.</p>
      <div class="eg">It is an <i>estimate</i> because we use the midpoint to stand in for every value in the class.</div>`,
  },
  classes: {
    title: "Modal & median class",
    body: `
      <p><b>Modal class</b> = the class interval with the <b>highest frequency</b>.</p>
      <p><b>Median class</b> = the class that contains the middle value. Find position n ÷ 2, build up the cumulative frequency, and see which class that position falls in.</p>`,
  },
  ogivePlot: {
    title: "Plotting an ogive",
    body: `
      <p>An ogive is the cumulative-frequency curve.</p>
      <ul>
        <li><b>Cumulative frequency</b> = the running total of the frequencies.</li>
        <li><b>Plot</b> each point at (<b>upper</b> boundary of the class ; cumulative frequency).</li>
        <li><b>Anchor</b> the curve at the <b>lower</b> boundary of the first class, at height 0.</li>
      </ul>
      <p>The curve is always S-shaped, and the <b>modal class</b> is the steepest part.</p>`,
  },
  ogiveRead: {
    title: "Reading off an ogive",
    body: `
      <p>For grouped data the positions have <b>no “+1”</b>:</p>
      <div class="formula">Q1 at n/4 · median at n/2 · Q3 at 3n/4 · p-th percentile at n × p/100</div>
      <p>Find the position on the cumulative-frequency (vertical) axis, read across to the curve, then straight down to the value. Read “approximately”.</p>`,
  },
  stddev: {
    title: "Standard deviation",
    body: `
      <p>The standard deviation σ measures how spread out the data is <b>around the mean</b>. A bigger σ means more spread; a smaller σ means the data is more consistent.</p>
      <div class="formula">σ = √[ Σ(x − x̄)² / n ]</div>
      <p>On the calculator use σx (Var → option 3). To compare two data sets’ consistency, the one with the <b>smaller</b> σ is more consistent.</p>`,
  },
  withinSD: {
    title: "Values within one σ of the mean",
    body: `
      <p>“Within one standard deviation of the mean” means between two boundaries:</p>
      <div class="formula">lower = x̄ − σ   ·   upper = x̄ + σ</div>
      <p>Work out those two numbers, then count how many data values fall between them (inclusive).</p>`,
  },
  variance: {
    title: "Variance",
    body: `
      <p>Variance is the average of the <b>squared</b> deviations from the mean — it is just the standard deviation squared.</p>
      <div class="formula">variance = σ²   ·   σ = √variance</div>
      <div class="eg">If σ = 4 then variance = 16. If variance = 25 then σ = 5.</div>`,
  },
  effect: {
    title: "Adding a constant to every value",
    body: `
      <p>If you add the same number k to <b>every</b> value in a data set:</p>
      <ul>
        <li>the <b>mean, median, quartiles, min and max</b> all shift up by k;</li>
        <li>the <b>spread</b> stays the same — <b>range, IQR, standard deviation and variance do not change</b>.</li>
      </ul>
      <p>Shifting every value sideways moves the centre but not how spread out the data is.</p>`,
  },
  compareBox: {
    title: "Comparing two box plots",
    body: `
      <p>Line the two plots up on the same scale and compare:</p>
      <ul>
        <li><b>Median</b> — which centre is higher?</li>
        <li><b>IQR</b> (box width) and <b>range</b> (whisker to whisker) — which is more spread out?</li>
        <li><b>Skew</b> — which side has the longer tail?</li>
      </ul>
      <p>A narrower box / shorter whiskers means the data is more consistent.</p>`,
  },

  /* ---------------- FINANCE ---------------- */
  finFormulas: {
    title: "Which finance formula?",
    body: `
      <p>Match the situation to the formula. <b>i</b> is the rate as a fraction (÷100), <b>n</b> the number of periods.</p>
      <ul>
        <li><b>Hire purchase</b> → simple interest: <b>A = P(1 + i·n)</b></li>
        <li><b>Inflation, population growth, savings</b> → compound: <b>A = P(1 + i)ⁿ</b></li>
        <li><b>Straight-line depreciation</b> → <b>A = P(1 − i·n)</b></li>
        <li><b>Reducing-balance depreciation</b> → <b>A = P(1 − i)ⁿ</b></li>
      </ul>
      <p><b>P</b> is the starting amount, <b>A</b> the end amount. Turn a % into i by dividing by 100 (8% → 0,08).</p>`,
  },
  simpleCompound: {
    title: "Simple vs compound interest",
    body: `
      <p><b>Simple interest</b> is worked out on the <b>original P only</b>, so the same amount is added each period.</p>
      <div class="formula">A = P(1 + i·n)</div>
      <p><b>Compound interest</b> is worked out on the <b>growing balance</b>, so each period earns a little more than the last.</p>
      <div class="formula">A = P(1 + i)ⁿ</div>
      <div class="eg">Over time compound always pulls ahead of simple, because it earns "interest on interest".</div>`,
  },
  depreciation: {
    title: "Depreciation: the two methods",
    body: `
      <p>Depreciation is when something <b>loses</b> value over time.</p>
      <ul>
        <li><b>Linear (straight-line):</b> <b>A = P(1 − i·n)</b>. Loses the <b>same rand amount</b> each year — its graph is a <b>straight line</b> sloping down.</li>
        <li><b>Reducing-balance:</b> <b>A = P(1 − i)ⁿ</b>. Loses a fixed <b>percentage of its current</b> value each year — its graph is a <b>curve</b> that drops steeply then flattens.</li>
      </ul>`,
  },
  compounding: {
    title: "Different compounding periods",
    body: `
      <p>If interest is added more than once a year, split the year up:</p>
      <ul>
        <li><b>rate per period</b> = annual rate ÷ (times per year)</li>
        <li><b>exponent</b> = years × (times per year)</li>
      </ul>
      <div class="formula">A = P(1 + i/k)^(n·k)</div>
      <p>Times per year k: annually 1 · half-yearly 2 · quarterly 4 · monthly 12 · weekly 52 · daily 365.</p>
      <div class="eg">12% p.a. compounded quarterly for 5 years → i = 0,12/4 = 0,03 and exponent = 5×4 = 20.</div>`,
  },
  timelineMove: {
    title: "Moving money along a timeline",
    body: `
      <p>Money has a different value at different times. To re-value an amount, slide it along the timeline:</p>
      <ul>
        <li><b>Forward</b> (to a later date) → <b>multiply</b> by (1 + i) once per period → a <b>positive</b> exponent.</li>
        <li><b>Backward</b> (to an earlier date) → <b>divide</b> by (1 + i) once per period → a <b>negative</b> exponent.</li>
      </ul>
      <div class="formula">value = amount × (1 + i)^(±periods)</div>
      <p>Count the periods between the two T-points. Forward T2 → T5 is 3 periods (+3); backward T5 → T2 is 3 periods (−3).</p>`,
  },
  timelineCount: {
    title: "Counting periods on a timeline",
    body: `
      <p>The number of periods is just how many <b>gaps</b> you jump between the two T-points — count the spaces, not the dots.</p>
      <ul>
        <li>T0 → T4 is <b>4</b> periods.</li>
        <li>T5 → T2 is <b>3</b> periods (going back).</li>
      </ul>
      <p>The <b>direction</b> tells you ×　or ÷: later = ×, earlier = ÷.</p>`,
  },
  rateChange: {
    title: "When the interest rate changes",
    body: `
      <p>If the rate or compounding frequency changes part-way, split the timeline into segments. For one lump sum, use <b>one bracket per segment</b>:</p>
      <div class="formula">A = P(1 + i₁/k₁)^(n₁·k₁) (1 + i₂/k₂)^(n₂·k₂)</div>
      <p>Work out each segment's rate-per-period and number-of-periods separately, then multiply the brackets together.</p>`,
  },
  deposits: {
    title: "Deposits & hire purchase",
    body: `
      <p>A <b>deposit</b> is paid upfront and earns no interest.</p>
      <div class="formula">deposit = (% ÷ 100) × price</div>
      <p>The amount still owed (the new P that interest is charged on) is the rest of the price:</p>
      <div class="formula">amount owed = ((100 − %) ÷ 100) × price</div>
      <div class="eg">15% deposit on R8 000 → deposit = R1 200, still owed = R6 800.</div>`,
  },
  effNom: {
    title: "Effective vs nominal rates",
    body: `
      <p>Both are <b>compound</b> interest, just quoted differently.</p>
      <ul>
        <li><b>Effective</b> rate is always an <b>annual</b> rate (the true yearly growth).</li>
        <li><b>Nominal</b> rate is quoted with a <b>compounding frequency</b> (monthly, quarterly, …).</li>
      </ul>
      <div class="formula">1 + i_eff = (1 + i_nom / n)ⁿ</div>
      <p>Here n is the number of compounding periods <b>per year</b> (12 for monthly).</p>`,
  },

  /* ---------- Probability ---------- */
  probBasics: {
    title: "Theoretical probability",
    body: `
      <p>The <b>sample space</b> S is the set of <b>all</b> possible outcomes. <b>n(S)</b> is how many there are.</p>
      <p>An <b>event</b> E is the outcomes you care about. The theoretical probability is worked out <i>before</i> any experiment:</p>
      <div class="formula">P(E) = n(E) / n(S)</div>
      <p>It always sits between <b>0</b> (impossible) and <b>1</b> (certain), and can be written as a fraction, a decimal or a percentage.</p>
      <div class="eg">e.g. one die, "an odd number": E = {1; 3; 5} so n(E) = 3, n(S) = 6 → P = 3/6 = 1/2 = 0,5 = 50%.</div>`,
  },
  relFreq: {
    title: "Relative frequency",
    body: `
      <p>Relative frequency is what <b>actually happened</b> after you collect data — not a prediction.</p>
      <div class="formula">relative frequency = (times the event happened) / (total trials)</div>
      <p>With few trials it can differ from the theoretical probability; with many trials it usually gets closer to it.</p>
      <div class="eg">e.g. a coin flipped 10 times lands heads 6 times → relative frequency = 6/10 = 0,6, even though theory says 0,5.</div>`,
  },
  vennNotation: {
    title: "Venn diagram notation",
    body: `
      <p>The <b>rectangle</b> is the sample space S; each <b>circle</b> is an event.</p>
      <ul>
        <li><b>A ∩ B</b> ("A and B") — the <b>overlap</b>: outcomes in A <i>and</i> B.</li>
        <li><b>A ∪ B</b> ("A or B") — <b>everything</b> in A together with everything in B.</li>
        <li><b>A′</b> ("not A") — everything <b>outside</b> A.</li>
      </ul>
      <p>The four basic regions of two circles are: only A, only B, the overlap (A ∩ B), and outside both.</p>
      <div class="eg">∩ reads "and"; ∪ reads "or"; the little dash A′ means "not".</div>`,
  },
  vennRead: {
    title: "Reading probabilities off a Venn",
    body: `
      <p>Write the <b>count</b> of outcomes in each region. Then every probability is that region's count over n(S).</p>
      <ul>
        <li><b>P(A)</b> = (only A + overlap) / n(S)</li>
        <li><b>P(A ∩ B)</b> = overlap / n(S)</li>
        <li><b>P(A ∪ B)</b> = (only A + overlap + only B) / n(S)</li>
        <li><b>P(A′)</b> = (everything not in A) / n(S)</li>
      </ul>
      <p>All the region probabilities add up to <b>1</b>.</p>
      <div class="eg">e.g. n(S) = 12, only A = 1, overlap = 2, only B = 4 → P(A ∪ B) = (1 + 2 + 4)/12 = 7/12.</div>`,
  },
  addRule: {
    title: "The addition rule",
    body: `
      <p>For any two events:</p>
      <div class="formula">P(A ∪ B) = P(A) + P(B) − P(A ∩ B)</div>
      <p>You subtract the overlap <b>once</b> because it was counted in both P(A) and P(B) — otherwise it's counted twice.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,4, P(A ∩ B) = 0,2 → P(A ∪ B) = 0,5 + 0,4 − 0,2 = 0,7.</div>`,
  },
  mutual: {
    title: "Exclusive, inclusive & exhaustive",
    body: `
      <ul>
        <li><b>Mutually exclusive</b> — cannot happen together, no overlap: <b>P(A ∩ B) = 0</b>. The addition rule becomes P(A ∪ B) = P(A) + P(B).</li>
        <li><b>Mutually inclusive</b> — can happen together, there is an overlap: <b>P(A ∩ B) ≠ 0</b>.</li>
        <li><b>Complementary</b> — no overlap <i>and</i> they fill S: P(A) + P(A′) = 1.</li>
        <li><b>Exhaustive</b> — together they cover the whole sample space (nothing left outside).</li>
      </ul>
      <div class="eg">e.g. "even" and "odd" on a die are mutually exclusive AND exhaustive.</div>`,
  },
  independence: {
    title: "Independent events",
    body: `
      <p>Two events are <b>independent</b> when one happening does not change the chance of the other. The test:</p>
      <div class="formula">P(A ∩ B) = P(A) × P(B)</div>
      <p>Work out P(A) × P(B) and compare it with the real P(A ∩ B). <b>Equal → independent</b>; not equal → not independent.</p>
      <div class="eg">e.g. P(A) = 0,5, P(B) = 0,3, and P(A ∩ B) = 0,15 → 0,5 × 0,3 = 0,15, so they are independent.</div>`,
  },
  contingency: {
    title: "Contingency tables",
    body: `
      <p>A contingency table sorts a group by <b>two</b> features at once. Use the totals to read probabilities:</p>
      <ul>
        <li>P(feature) = a row or column total ÷ the grand total</li>
        <li>P(both) = the single overlap cell ÷ the grand total</li>
      </ul>
      <p>Then test independence: compare P(both) with P(A) × P(B).</p>
      <div class="eg">e.g. 70 males of 150, 80 older of 150, 45 older males → P(M)×P(O) = 70/150 × 80/150 ≈ 0,249 but P(M ∩ O) = 45/150 = 0,3 → not independent.</div>`,
  },
  treeRead: {
    title: "Reading a tree diagram",
    body: `
      <p>Each stage of the experiment is a new set of branches, with the probability written <b>on</b> each branch.</p>
      <ul>
        <li>The branches leaving any one point must add up to <b>1</b>.</li>
        <li><b>Multiply</b> the probabilities <b>along</b> a path to get that full outcome.</li>
        <li><b>Add</b> the path probabilities to combine paths into one event.</li>
      </ul>
      <div class="eg">e.g. two coins: P(H,T) = 0,5 × 0,5 = 0,25; P(one head) = P(HT) + P(TH) = 0,25 + 0,25 = 0,5.</div>`,
  },
  atLeastOne: {
    title: "The ‘at least one’ shortcut",
    body: `
      <p>"At least one" is usually quickest as the complement of "none":</p>
      <div class="formula">P(at least one) = 1 − P(none)</div>
      <p>Find P(none) by multiplying the "not it" branch along every stage, then subtract from 1.</p>
      <div class="eg">e.g. P(no red) = 15/20 × 15/20 = 225/400 → P(at least one red) = 1 − 225/400 = 175/400.</div>`,
  },
  replacement: {
    title: "With vs without replacement",
    body: `
      <ul>
        <li><b>With replacement</b> — the item goes back, so the total <b>stays the same</b> and every second-draw branch uses the same denominator.</li>
        <li><b>Without replacement</b> — the item is kept, so the <b>total drops by one</b> and the colour taken first has <b>one fewer</b>.</li>
      </ul>
      <div class="eg">e.g. 20 balls, take a green: with replacement the next draw is still /20; without, it's /19 and greens drop from 7 to 6.</div>`,
  },
};

export function getConcept(id) { return CONCEPTS[id] || null; }
