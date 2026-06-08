import { useState } from "react";

// ─── WORKOUT DATA (unchanged) ───────────────────────────────────────────────

const days = [
  {
    day: "DAY 1", label: "UPPER PUSH", athletes: "Swimmer · Gymnast",
    color: "#00b4d8", focus: "Shoulders · Chest · Triceps · Serratus",
    why: "Swimmers build the widest V-taper through massive shoulder volume; gymnasts build dense pressing power through bodyweight isometric loading.",
    exercises: [
      { name: "Handstand Push-Up (or Pike Push-Up)", sets: "4 × 6–10", source: "🤸 Gymnast", rest: "2–3 min", note: "Wall-supported. Best overhead pressing for shoulder mass + long-term stability. Progress to freestanding over time.", alts: ["Pike Push-Up", "Z-Press (seated on floor, DB)", "Seated DB Shoulder Press", "Log Press"] },
      { name: "Overhead Barbell / DB Press", sets: "4 × 8–10", source: "🏊 Swimmer", rest: "2 min", note: "Builds the shoulder volume behind that wide, round-delt look. Control the eccentric.", alts: ["Arnold Press", "Landmine Press", "Cable Overhead Press", "Machine Shoulder Press"] },
      { name: "Dips (Ring Dips if possible)", sets: "4 × 8–12", source: "🤸 Gymnast", rest: "2 min", note: "Rings force stabilization that a fixed bar never will — builds tricep + chest density gymnasts are known for.", alts: ["Parallel Bar Dips", "Bench Dips (weighted)", "Close-Grip Push-Up", "Cable Tricep Pushdown"] },
      { name: "Lateral Raises (slow, high volume)", sets: "4 × 15–20", source: "🏊 Swimmer", rest: "60–90 sec", note: "Replicates the delt overload of thousands of swim strokes. Keep weight lighter, squeeze at the top.", alts: ["Cable Lateral Raise", "Band Lateral Raise", "Machine Lateral Raise", "Leaning Cable Raise"] },
      { name: "Incline Push-Up with Serratus Plus", sets: "3 × 15", source: "🤸 Gymnast", rest: "60 sec", note: "At the top, protract the scapula hard. Directly trains serratus — what makes abs look 3D and shoulders look complete.", alts: ["Wall Push-Up with protraction", "Cable Serratus Punch", "Straight-Arm Pulldown", "Bear Crawl hold"] },
      { name: "Rear Delt Face Pull", sets: "3 × 15", source: "🏊 Swimmer", rest: "60 sec", note: "Swimmers have exceptional rear delt development from pulling through water. Keeps shoulders balanced and healthy.", alts: ["Band Pull-Apart", "Reverse Pec Deck", "DB Rear Delt Fly", "Cable Rear Delt Row"] },
    ],
  },
  {
    day: "DAY 2", label: "LOWER — QUAD", athletes: "Cyclist · Sprinter",
    color: "#f4a261", focus: "Quads · Calves · Explosiveness",
    why: "Track cyclists build the freakiest quads in sport through endless high-load knee extension. Sprinters add fast-twitch explosiveness on top.",
    exercises: [
      { name: "Box Jump / Broad Jump", sets: "4 × 5 (max effort)", source: "🏃 Sprinter", rest: "2–3 min", note: "Always do these FIRST when fresh. Pure fast-twitch recruitment. Never grind these — full reset between reps.", alts: ["Depth Jump", "Jump Squat (bodyweight)", "Vertical Jump", "Skater Bounds"] },
      { name: "Hack Squat / Leg Press (high volume)", sets: "5 × 12–15", source: "🚴 Cyclist", rest: "2–2.5 min", note: "This is the cyclist key. High volume knee extension with slow eccentrics = teardrop quad development. Don't rush.", alts: ["Front Squat", "Safety Bar Squat", "Smith Machine Squat (close stance)", "Pendulum Squat"] },
      { name: "Bulgarian Split Squat", sets: "4 × 8–10 each", source: "🏃 Sprinter", rest: "90 sec–2 min", note: "Unilateral quad + glute loading that directly mimics sprint mechanics. Harder than it looks, humbling at first.", alts: ["Rear-Foot Elevated DB Squat", "Step-Up (weighted)", "Reverse Lunge", "Single-Leg Leg Press"] },
      { name: "Sissy Squat or Leg Extension", sets: "3 × 15", source: "🚴 Cyclist", rest: "60–90 sec", note: "Cyclists dominate knee extension. This isolates the quads at a range most compound lifts miss.", alts: ["Heel-Elevated Goblet Squat", "Spanish Squat (with band)", "Peterson Step-Up", "TRX Sissy Squat"] },
      { name: "Single-Leg Calf Raise (weighted, slow)", sets: "4 × 15–20", source: "⚽ Soccer · 🚴 Cyclist", rest: "60 sec", note: "Full range of motion — all the way down. Soccer players have naturally great calves from reactive cutting. Match that with slow, controlled reps.", alts: ["Seated Calf Raise (soleus focus)", "Standing Machine Calf Raise", "Donkey Calf Raise", "Jump Rope finisher"] },
      { name: "Sprint Intervals (optional finisher)", sets: "6 × 20m all-out", source: "🏃 Sprinter", rest: "2–3 min (full recovery)", note: "Short, maximum effort sprints. Trains the fast-twitch that no leg press can touch.", alts: ["Stationary Bike Sprint (10 sec all-out)", "Rowing Erg Sprint", "Assault Bike Sprint", "Treadmill Sprint"] },
    ],
  },
  {
    day: "DAY 3", label: "UPPER PULL", athletes: "Climber · Rower · Gymnast",
    color: "#9b72cf", focus: "Lats · Mid-back · Biceps · Grip · Core",
    why: "Climbers have the strongest relative pulling strength in sport; rowers build armor-plate back thickness; gymnasts tie it together with impossible core strength.",
    exercises: [
      { name: "Weighted Pull-Up / Archer Pull-Up", sets: "4 × 6–10", source: "🧗 Climber · 🤸 Gymnast", rest: "2–3 min", note: "Add weight progressively. Archer pull-ups (one arm extended) are the climber progression toward one-arm strength.", alts: ["Lat Pulldown (heavy)", "Band-Assisted Pull-Up", "Commando Pull-Up", "Neutral-Grip Pull-Up"] },
      { name: "Dead Hang (+ scapular pulls)", sets: "3 × 30–45 sec", source: "🧗 Climber", rest: "60–90 sec", note: "Builds grip, finger tendons, and decompresses the spine. Scapular pulls at the start of each hang activate the lats.", alts: ["Towel Hang", "Single-Arm Dead Hang (assisted)", "Fingerboard Hang", "Fat Bar Hang"] },
      { name: "Barbell or Seal Row", sets: "4 × 8–10", source: "🚣 Rower", rest: "2 min", note: "Rowing trains mid-back thickness. Seal rows (chest on bench) remove all cheat — pure back loading.", alts: ["T-Bar Row", "Chest-Supported Machine Row", "Pendlay Row", "Cable Row (wide grip)"] },
      { name: "Single-Arm DB Row (heavy)", sets: "3 × 10 each", source: "🚣 Rower", rest: "90 sec", note: "Rowers pull explosively through a full range. Match that — long stretch at the bottom, strong pull to hip.", alts: ["Meadows Row", "Single-Arm Cable Row", "Kroc Row", "Single-Arm Machine Row"] },
      { name: "Hollow Body Hold", sets: "4 × 30–45 sec", source: "🤸 Gymnast", rest: "60 sec", note: "The gymnast core foundation. Harder than any crunch. Lower back pressed flat, arms overhead, legs low. Build time slowly.", alts: ["Hollow Body Rock", "Ab Wheel Rollout", "Dead Bug", "Long-Lever Plank"] },
      { name: "Hanging Leg Raise to L-Sit Hold", sets: "3 × 10 + 10 sec hold", source: "🤸 Gymnast", rest: "60–90 sec", note: "Combines hip flexor strength with deep ab activation. The L-sit hold at the end builds serratus + lower ab definition.", alts: ["Toes-to-Bar", "Lying Leg Raise", "Dragon Flag (progression)", "Parallel Bar L-Sit"] },
    ],
  },
  {
    day: "DAY 4", label: "LOWER — POWER", athletes: "Sprinter · Speed Skater · Decathlete · Boxer",
    color: "#52b788", focus: "Glutes · Hamstrings · Posterior Chain · Obliques",
    why: "Sprinters and speed skaters build the most explosive posterior chains in sport. Decathletes add full-body power. Boxers finish with the densest obliques from rotational punch mechanics.",
    exercises: [
      { name: "Romanian Deadlift (RDL)", sets: "4 × 8–10", source: "🏃 Sprinter", rest: "2 min", note: "Eccentrically loads the hamstrings exactly like top-speed sprint mechanics. Feel the stretch — don't just hinge fast.", alts: ["Stiff-Leg Deadlift", "Single-Leg RDL", "Good Morning", "Cable Pull-Through"] },
      { name: "Hip Thrust (heavy + explosive)", sets: "4 × 10–12", source: "🏃 Sprinter · 🛼 Speed Skater", rest: "2 min", note: "Speed skaters and sprinters have the most powerful glutes in sport. Hip thrust is the most direct glute builder that exists.", alts: ["Glute Bridge (floor)", "Single-Leg Hip Thrust", "Cable Pull-Through", "45° Back Extension (glute focus)"] },
      { name: "Power Clean or Hang Clean", sets: "4 × 4–5", source: "🏋️ Decathlete", rest: "2.5–3 min", note: "Decathletes train explosive full-body power. The clean teaches every muscle to fire together. If new to it, do DB hang cleans instead.", alts: ["DB Hang Clean", "Kettlebell Swing (heavy)", "Jump Shrug", "Medicine Ball Slam"] },
      { name: "Copenhagen Plank / Lateral Lunge", sets: "3 × 20 sec each / 3 × 10", source: "🛼 Speed Skater", rest: "60–90 sec", note: "Speed skating is a lateral sport. Copenhagen planks build inner thigh + hip adductor strength that almost no other exercise hits.", alts: ["Side-Lying Hip Adduction", "Sumo Squat", "Cable Hip Adduction", "Lateral Band Walk"] },
      { name: "Glute Ham Raise / Nordic Curl", sets: "3 × 6–8", source: "🏃 Sprinter", rest: "2 min", note: "The single best hamstring exercise. Eccentric-dominant, exactly how sprinting loads the hamstrings. Start with feet anchored and assist with hands.", alts: ["Lying Leg Curl (slow eccentric)", "Swiss Ball Leg Curl", "Single-Leg Leg Curl", "Razor Curl"] },
      { name: "Landmine Rotation / Cable Woodchop", sets: "3 × 12 each side", source: "🥊 Boxer", rest: "60 sec", note: "Boxers develop dense obliques from transferring rotational power through the torso. This trains that punch-transfer mechanic directly.", alts: ["Pallof Press", "Russian Twist (weighted)", "Med Ball Rotational Throw", "Oblique Cable Crunch"] },
    ],
  },
];

const schedules = [
  {
    name: "Option A — Classic 2+2", rec: "Best for most people",
    weeks: [
      { label: "MON", day: "D1", name: "Push", color: "#00b4d8", type: "w" },
      { label: "TUE", day: "D2", name: "Quad", color: "#f4a261", type: "w" },
      { label: "WED", day: "—", name: "Rest", color: "#333", type: "r" },
      { label: "THU", day: "D3", name: "Pull", color: "#9b72cf", type: "w" },
      { label: "FRI", day: "D4", name: "Power", color: "#52b788", type: "w" },
      { label: "SAT", day: "—", name: "Rest", color: "#333", type: "r" },
      { label: "SUN", day: "—", name: "Rest", color: "#333", type: "r" },
    ],
    notes: [
      { pair: "Mon + Tue ✓ OK back-to-back", detail: "Push (upper) → Quad (lower). Completely different muscle groups. No overlap." },
      { pair: "Tue → Wed REST required", detail: "Legs are taxed. A rest day before pulling is essential — your spinal erectors and lower back assist both." },
      { pair: "Thu + Fri ✓ OK back-to-back", detail: "Pull (upper) → Power/Posterior (lower). Upper back recovers while legs are working." },
      { pair: "Fri → Mon 2 full rest days", detail: "Full weekend recovery before restarting. This is where adaptation happens." },
    ],
  },
  {
    name: "Option B — Spread Out", rec: "Better recovery, more flexibility",
    weeks: [
      { label: "MON", day: "D1", name: "Push", color: "#00b4d8", type: "w" },
      { label: "TUE", day: "—", name: "Rest", color: "#333", type: "r" },
      { label: "WED", day: "D2", name: "Quad", color: "#f4a261", type: "w" },
      { label: "THU", day: "D3", name: "Pull", color: "#9b72cf", type: "w" },
      { label: "FRI", day: "—", name: "Rest", color: "#333", type: "r" },
      { label: "SAT", day: "D4", name: "Power", color: "#52b788", type: "w" },
      { label: "SUN", day: "—", name: "Rest", color: "#333", type: "r" },
    ],
    notes: [
      { pair: "Wed + Thu ✓ OK back-to-back", detail: "Quad (lower) → Pull (upper). Different muscle groups. The back isn't heavily taxed on quad day." },
      { pair: "Mon rest before Wed", detail: "Push day then a rest before legs. Upper body gets full recovery, fresh for quad session." },
      { pair: "Thu → Sat 1 rest day", detail: "One rest between Pull and Power is ideal — posterior chain gets a day before being hammered again." },
    ],
  },
];

const rules = [
  { icon: "✅", title: "Upper + Lower back-to-back", body: "Almost always fine. Push day followed by Leg day (or vice versa) — the muscle groups don't overlap meaningfully." },
  { icon: "⚠️", title: "Two leg days back-to-back", body: "Avoid. Both Day 2 and Day 4 are lower body. Never train them consecutively — you need 48h for the posterior chain." },
  { icon: "⚠️", title: "Two upper days back-to-back", body: "Manageable but not ideal. Push then Pull is better than Pull then Push since the shoulder is involved in both pulling and pressing." },
  { icon: "❌", title: "Legs → Pull day (no rest)", body: "Risky. Deadlifts and rows share lower back load with squats. If you trained legs hard, rest before your pull day." },
  { icon: "💤", title: "After Day 4 (Power day)", body: "Always rest after Day 4. Power cleans, Nordic curls, and hip thrusts are neurologically and physically taxing. You need it." },
];

// ─── SUPPLEMENT DATA ─────────────────────────────────────────────────────────

const suppStacks = {
  "25": {
    label: "AGE 25",
    color: "#c8922a",
    tagline: "Active Individual · Performance + Cognition",
    sections: [
      {
        label: "MORNING STACK",
        note: "Take with a fat-containing meal",
        supplements: [
          {
            name: "Vitamin D3 + K2 (MK-7)",
            subtitle: "2000–5000 IU D3 · 100–200 mcg MK-7",
            timing: "☀ Morning · With fat",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "D3 supports immune function, testosterone production, mood regulation, and bone density before peak bone mass. K2 (MK-7) is the essential co-pilot — without it, the calcium you absorb can accumulate in soft tissue and arteries instead of bones. MK-7 activates osteocalcin and Matrix Gla Protein, directing calcium where it belongs. Taking D3 alone long-term without K2 is not optimal.",
            picks: [
              {
                rank: "TOP PICK",
                name: "NutriJa D3 5000 IU + K2 100mcg MK-7",
                price: "~₹450–550 / 60 caps",
                meta: "Lichen-sourced D3 · Capsule with MCT oil · Amazon.in / Flipkart",
                why: "One of very few Indian brands with the correct dose in a single capsule. MCT oil in the cap meaningfully improves absorption of fat-soluble vitamins. Rated 4.3/5 with 307+ ratings. Lichen D3 is vegetarian-friendly.",
                pros: ["5000 IU + 100mcg MK-7 in one cap", "Plant-based D3 (lichen)", "MCT oil for better absorption"],
                cons: ["Smaller brand — limited offline", "Confirm the 5000 IU variant before buying"],
              },
              {
                rank: "RUNNER-UP",
                name: "Carbamide Forte D3 K2 MK-7",
                price: "~₹499–599 / 120 tabs",
                meta: "Amazon India fulfilled · Veg tablets · Most trusted Indian brand",
                why: "Most trusted Indian supplement brand in community discussions. Amazon fulfillment reduces fake risk. Downside: only 600 IU per tablet — need 3–8 tablets for a clinical dose.",
                pros: ["Highest brand trust in India", "Amazon-fulfilled — low counterfeit risk"],
                cons: ["Only 600 IU/tab — need multiple tablets", "Tablet form — less absorption than capsule"],
              },
              {
                rank: "IHERB PICK",
                name: "Sports Research D3 + K2 MK-7 5000 IU",
                price: "~$18–22 / 360 softgels · iHerb",
                meta: "5000 IU D3 + 100mcg MK-7 · Organic coconut oil carrier · Fish gelatin softgel · BSCG tested",
                why: "One of the most popular D3+K2 products on iHerb globally. Organic coconut oil inside the softgel acts as a fat carrier for these fat-soluble vitamins — similar to NutriJa's MCT oil. 360 softgels = a full year's supply at excellent per-cap cost. Third-party tested by BSCG. The softgel shell is fish gelatin — not bovine or pork.",
                pros: ["5000 IU + 100mcg MK-7 in one softgel", "Organic coconut oil built in — fat carrier", "Fish gelatin only — no beef or pork", "360 softgels — full year supply, best value per dose", "BSCG third-party tested"],
                cons: ["USD pricing + iHerb shipping cost", "Import only — 7–15 day delivery"],
              },
            ],
            protocol: "1 cap/day with breakfast. Test 25-OH Vitamin D levels (~₹500) every 6 months. If already at 40–60 ng/mL, drop to 2000 IU.",
            buy: "NutriJa → Flipkart or Amazon.in · Carbamide Forte → Amazon.in official storefront · Sports Research D3+K2 → in.iherb.com",
          },
          {
            name: "Omega-3 · High DHA Priority",
            subtitle: "Target 2–3g EPA+DHA · DHA-dominant ratio",
            timing: "☀ Morning · With fat",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "DHA is structural — the primary building block of brain cell membranes. Higher DHA supports memory consolidation and neuroplasticity. EPA is functional — potent anti-inflammatory, cardiovascular support, strongest evidence for mood. At 25 with a brain-optimisation goal, DHA-dominant makes sense. Taking with fat significantly reduces fishy reflux.",
            picks: [
              {
                rank: "TOP DHA PICK",
                name: "Unived OVEGHA Algae Omega-3",
                price: "~₹1,099 / 60 caps",
                meta: "1000mg algae oil · 500mg DHA · Zero EPA · Vegan",
                why: "Algae is the original DHA source — fish get it from here. 500mg DHA per cap, the highest in India. Zero fishy taste. Pair with a separate EPA source for the full profile.",
                pros: ["500mg DHA/cap — highest in India", "Algae source — no fish contaminants", "Zero fishy burps"],
                cons: ["No EPA — must pair separately", "Higher cost per gram vs fish oil"],
              },
              {
                rank: "PAIR WITH (EPA)",
                name: "TATA 1mg Triple Strength Omega-3",
                price: "~₹799 / 90 caps",
                meta: "560mg EPA + 400mg DHA · Enteric coated · Molecularly distilled",
                why: "Best mainstream fish oil for DHA-per-cap from a trusted brand. Combine: 1 OVEGHA + 1 TATA = 900mg DHA + 560mg EPA — genuinely DHA-dominant. TATA brand credibility = near-zero counterfeit risk.",
                pros: ["560mg EPA + 400mg DHA per cap", "TATA brand — minimal fake risk", "Enteric coated, no burps"],
                cons: ["EPA-dominant when used alone"],
              },
              {
                rank: "PREMIUM FISH OIL",
                name: "TrueBasics Triple Strength Omega-3",
                price: "~₹849–999 / 60 caps",
                meta: "525mg EPA + 375mg DHA · IFOS 5-star · Triglyceride (TG) form",
                why: "Gold standard for purity verification — IFOS 5-star covers heavy metals, oxidation, and potency at the batch level. TG form absorbs up to 50% better than ethyl ester used in cheaper brands.",
                pros: ["IFOS 5-star certified — batch-level transparency", "Triglyceride form — best absorption"],
                cons: ["Pricier", "Very large capsule — some report difficulty swallowing"],
              },
              {
                rank: "IHERB PICK — HIGH DHA",
                name: "Nordic Naturals ProDHA 1000mg",
                price: "~$35–40 / 60 softgels · iHerb",
                meta: "680mg DHA + 280mg EPA per softgel · IFOS 5-star · Triglyceride form · Fish gelatin softgel",
                why: "If your goal is genuinely DHA-dominant omega-3 from a single product, Nordic Naturals ProDHA is purpose-built for it — 680mg DHA vs 280mg EPA per cap, so 2 caps = 1360mg DHA + 560mg EPA. This flips the usual fish oil ratio entirely. IFOS 5-star certified, TG form (best absorption), and sourced from wild-caught small fish with a very low oxidation score. Nordic Naturals is the most respected fish oil brand globally in clinical research. The softgel uses fish gelatin (not bovine or pork) — safe for you.",
                pros: ["680mg DHA per cap — genuinely DHA-dominant", "IFOS 5-star certified, TG form", "Fish gelatin only — no beef or pork", "Globally respected brand used in clinical trials"],
                cons: ["USD pricing — costs more than Indian options", "Import only via iHerb (7–15 days)"],
              },
            ],
            protocol: "Strategy: 1 OVEGHA cap (500mg DHA) + 1 TATA 1mg cap (400mg DHA + 560mg EPA) = 900mg DHA vs 560mg EPA — DHA-dominant. Or use 2 Nordic Naturals ProDHA caps for 1360mg DHA + 560mg EPA from a single bottle. Take with breakfast.",
            buy: "Unived OVEGHA → unived.in or Amazon.in · TATA 1mg → 1mg.com or Amazon.in · TrueBasics → Amazon.in (HealthKart storefront) · Nordic Naturals ProDHA → in.iherb.com",
            warning: "Fish oil softgels (TrueBasics, TATA 1mg) use gelatin as the outer shell — this is typically fish-derived gelatin, not bovine or pork. Unived OVEGHA uses vegan HPMC (no gelatin). Nordic Naturals explicitly uses fish gelatin. If in doubt about any product, check with the brand directly.",
          },
          {
            name: "Citicoline (CDP-Choline)",
            subtitle: "250–500mg/day · Morning strictly",
            timing: "☀ Morning only — stimulating",
            status: "IMPORT REQUIRED",
            statusColor: "#f4a261",
            why: "Citicoline is a precursor to phosphatidylcholine — the dominant phospholipid in neuron membranes — and simultaneously boosts acetylcholine, dopamine, and norepinephrine. A 12-week RCT in adults aged 50–85 found 500mg/day significantly improved memory with no serious adverse events. Morning-only timing is strict — it can disrupt sleep in sensitive individuals if taken later. Community top effects: focus (98 reports), memory (63 reports). Note: several commonly recommended citicoline brands use bovine gelatin capsules — all picks here use plant-based capsules only.",
            picks: [
              {
                rank: "TOP PICK",
                name: "Life Extension Citicoline CDP-Choline 250mg",
                price: "~₹2,400–2,800 / 60 caps · iHerb",
                meta: "Vegetarian HPMC capsule · No animal-derived ingredients · 250mg per cap · iHerb India shipping",
                why: "Highly reputable international brand using a fully plant-based HPMC capsule — no gelatin of any kind. 250mg per cap allows you to start at the lower dose and scale to 500mg (2 caps), matching the clinical trial dose. Life Extension's quality control is among the most rigorous globally. iHerb ships to India in 7–15 days.",
                pros: ["100% vegetarian HPMC capsule — no animal gelatin", "Reputable brand with rigorous QC", "250mg flexible dosing", "iHerb = direct from brand, no fakes"],
                cons: ["Import only — 7–15 day delivery from iHerb", "Pricier than alternatives"],
              },
              {
                rank: "RUNNER-UP",
                name: "NOW Foods CDP-Choline 300mg",
                price: "~₹1,800–2,200 / 60 caps · iHerb",
                meta: "Vegetarian cellulose capsule · 300mg per cap · Non-GMO · iHerb India",
                why: "NOW Foods uses a vegetable cellulose capsule — fully plant-based, no animal gelatin. At 300mg per cap, one capsule falls between the 250mg and 500mg clinical range (closer to the upper end). NOW is a deeply tested brand with a strong safety track record. A slightly more affordable iHerb option vs Life Extension.",
                pros: ["Vegetable cellulose capsule — fully plant-based", "300mg — sits close to the 500mg research dose in 2 caps", "Non-GMO verified", "More affordable than Life Extension"],
                cons: ["Import only — iHerb", "600mg per 2 caps is slightly above 500mg target"],
              },
            ],
            protocol: "Start at 250mg for 1 week (1 Life Extension cap), assess, then increase to 500mg (2 caps). If using NOW Foods 300mg, start with 1 cap (300mg) for 1 week before going to 2. Never take after noon. Standalone CDP-choline does not exist domestically in India — do not substitute choline bitartrate.",
            buy: "Life Extension Citicoline → in.iherb.com · NOW Foods CDP-Choline → in.iherb.com",
            warning: "Not made in India. What Indian platforms sell as 'choline' is bitartrate or Alpha-GPC — entirely different mechanisms. Import-only. Several popular citicoline brands sold online use bovine (beef) gelatin capsules — always confirm the capsule type is vegetarian or plant-based before buying.",
          },
          {
            name: "Creatine Monohydrate",
            subtitle: "5g/day · No loading phase",
            timing: "☀ Morning (preferred) · Timing flexible",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "Creatine replenishes ATP during high-intensity effort — more reps, more weight, faster recovery, more muscle protein synthesis. Saturation takes 3–4 weeks at 5g/day with no loading needed. Also crosses the blood-brain barrier — real cognitive benefits including working memory and processing speed under sleep deprivation. Some users report sleep disruption if taken at night; morning is the safe default.",
            picks: [
              {
                rank: "TOP PICK",
                name: "Naturaltein Creaboost (CreaPure® sourced)",
                price: "~₹699–799 / 200g (40 servings)",
                meta: "CreaPure® German-certified · Cologne List + Informed Choice + Trustified · FSSAI audited",
                why: "Most thoroughly tested creatine from an Indian brand. Reddit's r/Fitness_India recommends CreaPure-sourced over generic Chinese-sourced options — Naturaltein is that brand domestically. Full lab reports (heavy metals, pesticides, glyphosate) publicly posted.",
                pros: ["CreaPure® — gold standard German purity", "Cologne List + Informed Choice + Trustified", "Public lab reports"],
                cons: ["Pricier than generics", "Pouch packaging only"],
              },
              {
                rank: "RUNNER-UP",
                name: "Nakpro Pure Creatine Monohydrate",
                price: "~₹499 / 200g",
                meta: "Single ingredient · NABL tested · Transparent brand",
                why: "Transparent brand with published lab reports and 80+ years in dairy. Good value. Minor concern: Reddit flagged a label printing error on one creatine batch — QC slip, not a safety issue.",
                pros: ["Single ingredient, NABL tested", "Best price-to-quality"],
                cons: ["Label printing error on a batch (Reddit documented)", "Raw material source not confirmed as CreaPure"],
              },
              {
                rank: "AVOID (3RD PARTY)",
                name: "Optimum Nutrition Creatine (Amazon 3rd party sellers)",
                price: "—",
                meta: "Fine product when genuine — documented counterfeit problem in India",
                why: "Multiple community reports of authentication code failures when bought from Amazon 3rd party sellers. One reviewer documented a QR code redirecting to a fake verification site. Buy ONLY from ON's official website or Tirupati Wellness stores.",
                pros: [],
                cons: ["High counterfeit rate via Amazon 3rd-party", "Auth codes failing — multiple Reddit-documented cases"],
              },
            ],
            protocol: "5g/day, every day. No loading. Mix in water, juice, or protein shake — tasteless and stable. Drink 3L+ water on training days.",
            buy: "Naturaltein → naturaltein.in or Amazon.in · Nakpro → nakpro.com or Amazon.in",
          },
          {
            name: "Magnesium L-Threonate",
            subtitle: "144–200mg elemental Mg · Split morning + night",
            timing: "☀ 1 cap morning · 🌙 2 caps before bed",
            status: "IMPORT REQUIRED",
            statusColor: "#f4a261",
            why: "The only magnesium form that reliably crosses the blood-brain barrier and raises brain magnesium levels. Other forms (glycinate, citrate, oxide) work elsewhere in the body but don't reach the brain effectively. Higher brain magnesium activates NMDA receptors and supports synaptic density — memory, learning, cognitive flexibility. Community: 131 reports of improved sleep vs 61 reports of insomnia (~30% experience the opposite). Test your response before committing to the night dose.",
            picks: [
              {
                rank: "TOP PICK",
                name: "Life Extension Neuro-Mag® Magnesium L-Threonate",
                price: "~₹2,200–2,600 / 90 caps",
                meta: "Patented Magtein® form (MIT-developed) · 48mg elemental Mg/cap · 3 caps = 144mg · Veg capsule",
                why: "The reference product globally. Uses Magtein® — the patented compound developed at MIT used in clinical studies. 3 caps = exact research dose of 144mg elemental Mg. iHerb bestseller in this category worldwide.",
                pros: ["Patented Magtein® — identical to clinical study form", "Vegetarian capsule", "iHerb = direct from brand, no fakes"],
                cons: ["Import only — 7–15 day delivery"],
              },
              {
                rank: "VALUE ALTERNATIVE",
                name: "NOW Foods Magtein® Magnesium L-Threonate",
                price: "~₹1,800–2,200 / 90 caps",
                meta: "Same Magtein® ingredient · Vegan + Kosher + Halal · ~₹400 cheaper",
                why: "Exact same Magtein® compound at a lower price. NOW Foods is a deeply established, widely tested global brand. Saves ~₹400 per bottle with no ingredient compromise.",
                pros: ["Same Magtein® at lower cost", "Vegan, Kosher, Halal certified"],
                cons: ["Same import limitation"],
              },
            ],
            protocol: "1 cap in the morning, 2 caps 30–60 min before bed. Test the night dose for 1 week — if you experience insomnia, shift all 3 to morning. Magnesium L-Threonate does not exist in the Indian domestic market.",
            buy: "Life Extension / NOW Foods → in.iherb.com or Amazon Global Import",
            warning: "What Amazon.in sells as 'magnesium' is glycinate, citrate, or oxide — none raise brain Mg levels effectively. Import-only.",
          },
        ],
      },
      {
        label: "POST-WORKOUT",
        note: "Within 30–60 min",
        supplements: [
          {
            name: "Whey Protein Isolate",
            subtitle: "25–40g post-workout · 110–140g total daily protein",
            timing: "🏋 Post-Workout · Within 30–60 min",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "The mechanism post-workout is the leucine spike — leucine directly triggers muscle protein synthesis (MPS) via the mTOR pathway. Whey isolate delivers a rapid, high-leucine dose when muscles are most receptive. At ~70kg, your daily protein target is 110–140g (1.6–2g/kg). Isolate over concentrate: filtered to remove most lactose and fat — easier on digestion, better if concentrate causes bloating. Warning: 70% of Indian protein powders are mislabelled — brand transparency is critical.",
            picks: [
              {
                rank: "TOP PICK",
                name: "Naturaltein Whey Protein Isolate",
                price: "~₹2,499–2,999 / kg",
                meta: "Non-GMO · Glyphosate-free · Cologne List · Informed Choice · Trustified · A-rated by Unbox Health",
                why: "Unbox Health independent lab: 'A' rating + perfect 10/10 non-toxicity score. No aflatoxins, lead, arsenic, cadmium, or mercury. India's only protein with Cologne List certification. Full amino acid profile publicly disclosed.",
                pros: ["'A' rated by Unbox Health", "Cologne List + Informed Choice + Trustified", "Glyphosate-free"],
                cons: ["Minor label accuracy gap (8.49/10)", "Premium priced"],
              },
              {
                rank: "RUNNER-UP",
                name: "Nakpro Platinum 100% Whey Isolate",
                price: "~₹1,799–1,999 / kg",
                meta: "Raw whey from Hilmar Cheese Co., USA · Lab-tested above label claims",
                why: "Only Indian brand publicly disclosing raw whey source — Hilmar Cheese Company (world's largest single-site cheese producer). Lab tests show protein exceeds label claims. Best value isolate in India.",
                pros: ["Disclosed US whey source (Hilmar, CA)", "Lab-tested above label claims", "Best price-to-quality"],
                cons: ["Label printing QC error on a creatine batch (minor concern)"],
              },
              {
                rank: "MARKET WARNING",
                name: "Generic brands without lab reports",
                price: "—",
                meta: "Covers any brand without NABL/third-party certification",
                why: "70% of popular Indian protein supplements are mislabelled. Amino spiking — adding glycine/taurine to inflate nitrogen — is widespread and invisible without a lab test. No public lab report = don't buy.",
                pros: [],
                cons: ["70% mislabelling rate in India (Unbox Health)", "Amino spiking rampant — impossible to detect visually"],
              },
            ],
            protocol: "1 scoop (25–30g) within 30–60 min post-workout. Track total daily protein with Cronometer or MyFitnessPal for the first 2–3 weeks to calibrate.",
            buy: "Naturaltein → naturaltein.in or Amazon.in · Nakpro → nakpro.com or Amazon.in",
          },
        ],
      },
    ],
  },
  "60": {
    label: "AGE 60+",
    color: "#2ab8b8",
    tagline: "Elderly · Cognitive Decline · Energy · Longevity",
    sections: [
      {
        label: "MORNING STACK",
        note: "Take with breakfast",
        supplements: [
          {
            name: "Bacopa Monnieri (Brahmi)",
            subtitle: "300mg (first 2 weeks) → 600mg · Standardised extract",
            timing: "☀ Morning or Evening · With food",
            status: "INDIA: WIDELY AVAILABLE",
            statusColor: "#52b788",
            why: "The Ayurvedic adaptogen with the strongest clinical evidence for memory improvement in older adults. Works by enhancing synaptic communication, protecting neurons from oxidative damage, and modulating the stress response — all of which decline with age. Community data: 363 reports of memory improvement, 189 reports of anxiety reduction. Effects build over weeks to months — not days. Start at 300mg for 2 weeks before increasing; initial dose can cause fatigue or GI upset, especially on an empty stomach.",
            picks: [
              {
                rank: "TOP PICK",
                name: "NutriJa Bacopa Monnieri 500mg (40% Bacosides)",
                price: "~₹499–599 / 60 caps",
                meta: "500mg per cap · 40% bacosides standardisation · Vegetarian · Amazon.in",
                why: "40% bacoside standardisation is the highest available from any Indian brand — most competitors offer 20%. Bacosides are the active compounds; higher standardisation = more active ingredient per cap. Vegetarian capsule.",
                pros: ["40% bacosides — highest in India", "500mg per cap — potent single dose", "Vegetarian capsule"],
                cons: ["Smaller brand — online ordering mainly"],
              },
              {
                rank: "MOST TRUSTED BRAND",
                name: "Himalaya Organic Brahmi",
                price: "~₹299–399 / 60 tabs",
                meta: "750mg per tab · USDA Organic · Non-GMO · Available offline at pharmacies",
                why: "90+ years of Ayurvedic heritage. Widely available at pharmacies and offline — critical for elderly users who may not order online. Uses whole-plant + standardised extract blend for the full spectrum of plant compounds.",
                pros: ["90+ year brand — highest trust factor", "USDA Organic, Non-GMO", "Available offline at pharmacies"],
                cons: ["Lower bacoside % vs NutriJa", "Tablet form — harder to halve for dose titration"],
              },
              {
                rank: "BUDGET PICK",
                name: "INLIFE Brahmi Capsules 500mg (20% Bacosides)",
                price: "~₹399–499 / 60 caps (pack of 2)",
                meta: "20% bacosides · Vegetarian · Strong Amazon.in reviews",
                why: "A solid budget option with good Amazon reviews specifically noting improved concentration with consistent use. 20% bacosides is the standard clinical research level. Good entry point before committing to NutriJa.",
                pros: ["Good Amazon.in reviews for cognitive effect", "Vegetarian capsule", "Pack of 2 — good economy"],
                cons: ["20% bacosides — lower potency than NutriJa's 40%"],
              },
            ],
            protocol: "Start at 300mg/day for 2 weeks (1 INLIFE/Himalaya tab, or half NutriJa cap). If tolerated, increase to 600mg/day. Take with any fat-containing meal. Effects build over 4–12 weeks.",
            buy: "NutriJa → Amazon.in · Himalaya → Amazon.in or any pharmacy · INLIFE → Amazon.in",
            warning: "Initial fatigue (141 reports) and loose stools are common in the first 2 weeks. Both typically resolve. If GI upset persists, take with a larger meal or split dose morning/evening.",
          },
          {
            name: "Citicoline (CDP-Choline)",
            subtitle: "250–500mg/day · Morning only · Safe with Bacopa",
            timing: "☀ Morning only — stimulating",
            status: "IMPORT REQUIRED",
            statusColor: "#f4a261",
            why: "Acetylcholine — the neurotransmitter critical for memory — declines significantly with age. Citicoline is a direct precursor that boosts acetylcholine and supports dopamine and norepinephrine. A 12-week RCT specifically in adults aged 50–85 with age-associated memory impairment found 500mg/day significantly improved memory. Bacopa + Citicoline is rated SAFE — complementary cholinergic pathways with no known adverse interactions. Start each new supplement 1 week apart. All picks here use plant-based capsules — no bovine or pork gelatin.",
            picks: [
              {
                rank: "TOP PICK",
                name: "Life Extension Citicoline CDP-Choline 250mg",
                price: "~₹2,400–2,800 / 60 caps · iHerb",
                meta: "Vegetarian HPMC capsule · No animal gelatin · 250mg per cap · iHerb India",
                why: "Fully plant-based HPMC capsule — no gelatin of any kind. For elderly users, the 250mg starting dose is especially important — hold for 2 full weeks before escalating to 500mg (2 caps). Life Extension has among the most rigorous QC globally. iHerb direct = no counterfeit risk.",
                pros: ["100% vegetarian HPMC capsule", "250mg allows cautious titration for elderly", "Rigorous global QC"],
                cons: ["Most expensive option", "7–15 day iHerb delivery"],
              },
              {
                rank: "RUNNER-UP",
                name: "NOW Foods CDP-Choline 300mg",
                price: "~₹1,800–2,200 / 60 caps · iHerb",
                meta: "Vegetable cellulose capsule · 300mg per cap · Non-GMO · iHerb India",
                why: "Vegetable cellulose capsule — no animal ingredients. 300mg per cap. A more affordable import option vs Life Extension, still from a deeply trusted global brand. For elderly: start with 1 cap (300mg) per day, assess for 2 weeks before considering 2 caps.",
                pros: ["Vegetable cellulose capsule — fully plant-based", "Non-GMO", "More affordable than Life Extension"],
                cons: ["Import only — iHerb", "600mg per 2 caps is slightly above 500mg target"],
              },
            ],
            protocol: "250mg/day for 1 full week, then go to 500mg. Morning only. Note: Bacopa + Citicoline = SAFE (DopCheck verified — complementary cholinergic pathways). Only use brands with confirmed plant-based capsules.",
            buy: "Life Extension Citicoline → in.iherb.com · NOW Foods CDP-Choline → in.iherb.com",
          },
          {
            name: "CoQ10 (Coenzyme Q10)",
            subtitle: "100–200mg/day · Take with fat",
            timing: "☀ Morning or early afternoon",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "CoQ10 is the spark plug of cellular energy production — a critical component of the mitochondrial electron transport chain. Natural production declines significantly with age; by 60 the body produces roughly half what it did at 20. Manifests as fatigue, reduced cardiovascular efficiency, slower recovery. Especially critical for anyone on statins, which deplete CoQ10 as a direct side effect. Community sentiment: 78/100. At 60+, ubiquinol form is better absorbed — the body's ability to convert ubiquinone to ubiquinol declines with age.",
            picks: [
              {
                rank: "TOP PICK (UBIQUINOL)",
                name: "Miduty Active CoQ10 Ubiquinol + PQQ",
                price: "~₹1,299–1,499 / 30 caps",
                meta: "Kaneka Ubiquinol® (Japanese-patented gold standard) · PQQ included · Amazon.in",
                why: "Kaneka Ubiquinol® is the clinical-research benchmark for ubiquinol quality. Miduty is one of the few Indian brands stocking this form. Built-in PQQ is a bonus — covers both CoQ10 and PQQ in one cap, simplifying the pill burden for elderly users.",
                pros: ["Kaneka Ubiquinol® — clinical-grade form", "Covers CoQ10 + PQQ in one cap", "Ubiquinol — best absorbed at 60+"],
                cons: ["Only 30 caps — frequent reordering", "Pricier per month"],
              },
              {
                rank: "RUNNER-UP (UBIQUINONE)",
                name: "Carbamide Forte CoQ10 200mg + Piperine 5mg",
                price: "~₹599–699 / 60 caps",
                meta: "200mg CoQ10 · Piperine boosts absorption ~30% · Veg capsule · Amazon.in",
                why: "Most trusted Indian brand. 200mg hits the clinical support dose in one cap. Piperine compensates partially for ubiquinone's lower bioavailability vs ubiquinol at 60+. Best budget option from the most reliable Indian brand.",
                pros: ["Highly trusted Indian brand", "200mg in one cap", "Piperine enhances absorption ~30%"],
                cons: ["Ubiquinone form — less optimal at 60+ than ubiquinol"],
              },
            ],
            protocol: "100–200mg/day with breakfast. Miduty = covers CoQ10 + PQQ together. Allow 8–12 weeks before assessing energy changes. Check with doctor if on warfarin — mild interaction possible.",
            buy: "Miduty → Amazon.in · Carbamide Forte → Amazon.in brand storefront",
          },
          {
            name: "PQQ (Pyrroloquinoline Quinone)",
            subtitle: "10–20mg/day · Morning only, strictly",
            timing: "☀ Morning strictly — disrupts sleep",
            status: "LIMITED IN INDIA",
            statusColor: "#f4a261",
            why: "PQQ stimulates mitochondrial biogenesis — the actual creation of new mitochondria. Most supplements support existing mitochondria; PQQ grows new ones. Especially significant at 60+ when mitochondrial density has declined significantly. A 6-week RCT in elderly patients with mild cognitive impairment showed PQQ improved mitochondrial biomarkers with positive trends in cognition. PQQ + CoQ10 is synergistic: CoQ10 optimises existing mitochondria, PQQ creates new ones. Morning-only is strict — PQQ can disrupt sleep if taken later.",
            picks: [
              {
                rank: "BEST OPTION (COMBO)",
                name: "Miduty CoQ10 Ubiquinol + PQQ",
                price: "~₹1,299–1,499 / 30 caps",
                meta: "Covers both CoQ10 and PQQ in one cap — see CoQ10 entry above",
                why: "If using Miduty for CoQ10, PQQ is already included. Eliminates a separate purchase and simplifies morning routine for elderly users.",
                pros: ["One cap covers both CoQ10 + PQQ", "Kaneka Ubiquinol® quality"],
                cons: ["PQQ dose per cap not individually stated — contact brand for exact mg"],
              },
              {
                rank: "STANDALONE OPTION",
                name: "Doctor's Best PQQ 20mg",
                price: "~₹1,500–2,000 / 30 caps",
                meta: "20mg per cap · Vegetarian · Available Amazon.in",
                why: "20mg is the research-standard dose. Caveat: the brand was sold to a Chinese company — some reviewers raised quality-consistency concerns. No specific PQQ failure documented but worth flagging.",
                pros: ["20mg — exact research dose", "Vegetarian · Available Amazon.in"],
                cons: ["Brand sold to Chinese company — quality concern raised"],
              },
              {
                rank: "SAFE IMPORT ALTERNATIVE",
                name: "Life Extension PQQ 20mg",
                price: "~₹1,600–2,000 / 30 caps",
                meta: "USA manufactured · iHerb India",
                why: "Most rigorous quality control globally. If consistency matters more than convenience, this is the safer pick over Doctor's Best given the brand-ownership concern.",
                pros: ["USA manufactured, rigorous QC", "Same 20mg research dose"],
                cons: ["iHerb import — 7–15 day delivery"],
              },
            ],
            protocol: "10–20mg in the morning, strictly. Take alongside CoQ10. Start at 10mg for 2 weeks, then move to 20mg. If you experience sleep disruption, confirm it's not being taken in the afternoon accidentally.",
            buy: "Miduty (CoQ10+PQQ combo) → Amazon.in · Doctor's Best PQQ → Amazon.in · Life Extension PQQ → in.iherb.com",
          },
          {
            name: "Omega-3 (EPA/DHA)",
            subtitle: "1000mg EPA + 500mg DHA daily · EPA-dominant for 60+",
            timing: "☀ Morning · With breakfast",
            status: "INDIA: AVAILABLE",
            statusColor: "#52b788",
            why: "For 60+ individuals, omega-3 is arguably the single most important supplement for physical and brain health simultaneously. EPA is a potent anti-inflammatory that reduces neuroinflammation (a key driver of cognitive decline), supports cardiovascular function, and improves joint comfort. DHA maintains neuron membrane fluidity as it declines with age. Community sentiment: 82/100. At doses above 3g+, EPA has mild blood-thinning effects — relevant if taking aspirin or warfarin.",
            picks: [
              {
                rank: "TOP PICK",
                name: "TrueBasics Triple Strength Omega-3",
                price: "~₹849–999 / 60 caps",
                meta: "525mg EPA + 375mg DHA · IFOS 5-star · Triglyceride form · Enteric coated",
                why: "EPA-leaning ratio is ideal for 60+ — anti-inflammation is the priority. IFOS 5-star certification tests rancidity, heavy metals, potency per batch — important for elderly users who may take medications. TG form = 50% better absorption than ethyl ester. 2 caps = 1050mg EPA + 750mg DHA.",
                pros: ["IFOS 5-star certified — highest global fish oil standard", "TG form — best absorption", "EPA-leaning ratio ideal for 60+"],
                cons: ["Pricier option", "Large capsule — may be harder for elderly to swallow"],
              },
              {
                rank: "RUNNER-UP",
                name: "TATA 1mg Triple Strength Omega-3",
                price: "~₹799 / 90 caps",
                meta: "560mg EPA + 400mg DHA · Enteric coated · Molecularly distilled",
                why: "Strong EPA content (560mg/cap). TATA brand = near-zero counterfeit risk. Enteric coated for burp-free experience — important for elderly with digestive sensitivity. 2 caps hits the 1000mg EPA + 800mg DHA protocol.",
                pros: ["TATA brand — virtually no fake risk", "Enteric coated — elderly-friendly", "Molecularly distilled — mercury removed"],
                cons: ["No IFOS certification (unlike TrueBasics)"],
              },
              {
                rank: "IHERB PICK — PREMIUM QUALITY",
                name: "Nordic Naturals Ultimate Omega",
                price: "~$30–35 / 60 softgels · iHerb",
                meta: "650mg EPA + 450mg DHA per 2-softgel serving · IFOS 5-star · Triglyceride form · Fish gelatin softgel",
                why: "A step above TrueBasics in brand credibility — Nordic Naturals is considered the global benchmark for fish oil quality and is the brand used across the most clinical research studies. IFOS 5-star certified with full third-party batch transparency. TG form. Strong EPA (650mg per 2-cap serving) is ideal for the 60+ anti-inflammatory and cardiovascular priority. The softgel uses fish gelatin — not bovine or pork.",
                pros: ["Nordic Naturals — global reference-standard brand", "IFOS 5-star + TG form", "Fish gelatin only — no beef or pork gelatin", "Strong EPA-leaning ratio for 60+ anti-inflammatory goal"],
                cons: ["USD pricing — more expensive than Indian options", "Import only via iHerb (7–15 days)"],
              },
            ],
            protocol: "2 caps/day with breakfast. TrueBasics: 1050mg EPA + 750mg DHA. TATA 1mg: 1120mg EPA + 800mg DHA. Nordic Naturals: 650mg EPA + 450mg DHA per 2 caps. Inform physician before starting if on aspirin/warfarin.",
            buy: "TrueBasics → Amazon.in (HealthKart storefront) · TATA 1mg → 1mg.com or Amazon.in · Nordic Naturals Ultimate Omega → in.iherb.com",
            warning: "Blood thinner interaction: EPA/DHA has mild anticoagulant properties above 3g/day. Inform physician if on aspirin, warfarin, or blood thinners. Fish oil softgels from TrueBasics and TATA 1mg use gelatin — typically fish-derived, not bovine or pork, but confirm directly with the brand if needed. Nordic Naturals explicitly uses fish gelatin.",
          },
        ],
      },
      {
        label: "EVENING",
        note: "1–2 hours before bed",
        supplements: [
          {
            name: "Phosphatidylserine (PS)",
            subtitle: "100–200mg/day · 1–2 hours before bed for cortisol control",
            timing: "🌙 Evening · 1–2h before bed",
            status: "IMPORT REQUIRED",
            statusColor: "#f4a261",
            why: "A phospholipid that forms a critical structural component of neuron cell membranes — keeps neurons flexible and responsive. PS levels in brain tissue decline with age, impairing cell-to-cell communication. A 13-week RCT in older adults with mild cognitive impairment showed PS improved cognitive function. Evening timing specifically suppresses elevated nighttime cortisol — a significant contributor to sleep disruption, memory consolidation failure, and morning fatigue in elderly adults. Community top effects: focus (78 reports), memory (66 reports). Warning: ConsumerLab found one brand with only 10% of claimed PS — brand matters critically here.",
            picks: [
              {
                rank: "TOP PICK (SOY-FREE)",
                name: "NOW Foods Phosphatidyl Serine 150mg (Soy-Free)",
                price: "~₹2,400–2,800 / 60 caps",
                meta: "150mg PS · Soy-free · Vegetarian · iHerb India",
                why: "Most PS is derived from soy — a concern for soy-sensitive individuals or those on thyroid medications. NOW offers soy-free at 150mg per cap. NOW is one of the most tested global supplement brands. Passed ConsumerLab potency testing.",
                pros: ["Soy-free — better for sensitivities", "150mg — slightly above base dose", "Highly tested brand"],
                cons: ["Import only — iHerb (7–15 days)", "Not available in India domestically"],
              },
              {
                rank: "VALUE ALTERNATIVE",
                name: "Life Extension Phosphatidylserine 100mg",
                price: "~₹2,000–2,400 / 100 caps · iHerb",
                meta: "100mg PS per cap · Vegetarian capsule · Soy-derived (low allergen risk) · iHerb India",
                why: "Same Life Extension brand already recommended for Citicoline and Neuro-Mag — consistent quality standard throughout your stack. Vegetarian capsule, no animal-derived ingredients. 100 caps at 100mg gives a 3-month supply at the 100mg dose or 50 days at 200mg. Passed ConsumerLab potency testing. Soy-derived but at concentrations low enough that most people tolerate it without issue.",
                pros: ["Vegetarian capsule — no animal ingredients", "Same trusted brand as other picks in this stack", "100 caps — good supply per bottle", "Passed ConsumerLab potency testing"],
                cons: ["Soy-derived — flag if soy-sensitive", "Import only — iHerb (7–15 days)"],
              },
            ],
            protocol: "100–200mg, 1–2 hours before bed. If insomnia occurs in the first week, shift dose to morning — a minority of users experience this. Do not exceed 200mg without physician guidance. Introduce last in your schedule.",
            buy: "NOW Foods PS 150mg Soy-Free → in.iherb.com · Life Extension PS 100mg → in.iherb.com",
            warning: "ConsumerLab found one brand delivered only 10% of claimed PS (30mg instead of 300mg). Do NOT buy PS from unknown Indian sellers on Amazon.in — this category has serious mislabelling risk.",
          },
        ],
      },
    ],
  },
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────

export default function WorkoutPlan() {
  const [tab, setTab] = useState("days");
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [activeSched, setActiveSched] = useState(0);
  const [suppAge, setSuppAge] = useState("25");
  const [expandedSupp, setExpandedSupp] = useState(null);
  const [theme, setTheme] = useState("dark");

  const day = days[activeDay];
  const currentStack = suppStacks[suppAge];
  const isLight = theme === "light";

  return (
    <div data-theme={theme} style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: "var(--bg)", minHeight: "100vh", color: "var(--t1)", transition: "background 0.25s, color 0.25s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── DARK MODE (default) ── */
        :root, [data-theme="dark"] {
          --bg:    #0a0a0a;
          --s1:    #111111;
          --s2:    #0f0f0f;
          --s2b:   #0d0d0d;
          --s3:    #141414;
          --s4:    #161616;
          --s5:    #1a1a1a;
          --b1:    #1e1e1e;
          --b2:    #1a1a1a;
          --b3:    #181818;
          --b4:    #242424;
          --b5:    #2e2e2e;
          --b6:    #282828;
          /* Text scale — dark mode.
             t1–t3: bright content. t4–t6: secondary readable. t7–t9: muted but legible readable content.
             t10–t11: labels/metadata. t12–t13: decorative only (dividers, micro-labels). */
          --t1:    #f0f0f0;   /* main body, titles */
          --t2:    #d8d8d8;   /* card names, ex-name */
          --t3:    #c0c0c0;   /* rule-title, pick-name */
          --t4:    #a8a8a8;   /* note-pair, secondary headers */
          --t5:    #969696;   /* qr-name */
          --t6:    #878787;   /* schedule labels */
          --t7:    #929292;   /* day-why, ex-note, supp-why — 5.6:1 on #111 ✓ */
          --t8:    #848484;   /* pick-why-txt — 4.9:1 on #0d0d0d ✓ */
          --t9:    #7a7a7a;   /* note-detail, rule-body, protocol-text — 4.4:1 on #0f0f0f ✓ */
          --t10:   #646464;   /* tab inactive, pick-price — 3.2:1 on #111 */
          --t11:   #585858;   /* ex-src, supp labels — 2.6:1 (decorative) */
          --t12:   #4c4c4c;   /* alts-label, qr-price — decorative */
          --t13:   #464646;   /* divider text — decorative */
          --t14:   #6e6e6e;   /* alt-tag text */
          --t15:   #6c6c6c;   /* rest-pill text */
          --day-title:        #ffffff;
          --tab-active-col:   #ffffff;
          --sched-tab-active: #ffffff;
          --age-tab-bg:       #111111;
          --pro-bg:    #0d1f12; --pro-border: #1a3a22; --pro-col: #52b788;
          --con-bg:    #1f0d0d; --con-border: #3a1a1a; --con-col: #e05a4a;
          --warn-bg:   #1a0a00; --warn-border: #2e1800; --warn-col: #b07030;
          --chip-bg:   #0a1a0a; --chip-border: #1a2e1a; --chip-col: #52b788; --chip-strong: #6ccf92;
          --avoid-bg:  #1a0000; --avoid-border: #3a1010; --avoid-col: #e05a4a;
          --toggle-bg: #1a1a1a; --toggle-border: #2e2e2e; --toggle-col: #888888;
        }

        /* ── LIGHT MODE ── */
        [data-theme="light"] {
          --bg:    #f3ede2;
          --s1:    #ffffff;
          --s2:    #f8f3ea;
          --s2b:   #f0ebe0;
          --s3:    #e8e2d8;
          --s4:    #e4ddd0;
          --s5:    #ddd8ce;
          --b1:    #d8d0c0;
          --b2:    #ddd8ce;
          --b3:    #e4ddd0;
          --b4:    #ccc4b8;
          --b5:    #c4bcb0;
          --b6:    #d0c8bc;
          /* Text scale — light mode.
             t7–t9 are critical: must pass 4.5:1 on white (#fff) card backgrounds. */
          --t1:    #0f0e0d;   /* main body */
          --t2:    #1c1a18;   /* card names */
          --t3:    #2e2a24;   /* secondary titles */
          --t4:    #48423c;   /* note-pair */
          --t5:    #585048;   /* qr-name */
          --t6:    #605850;   /* schedule labels */
          --t7:    #524c48;   /* day-why, ex-note, supp-why — 7.8:1 on white ✓ */
          --t8:    #5c5652;   /* pick-why-txt — 6.4:1 on white ✓ */
          --t9:    #646060;   /* note-detail, rule-body, protocol — 5.5:1 on white ✓ */
          --t10:   #726e6a;   /* tab inactive, pick-price — 4.2:1 on white */
          --t11:   #807c78;   /* ex-src, supp labels — 3.4:1 on white */
          --t12:   #928e8a;   /* alts-label, qr-price — 2.9:1 (decorative OK) */
          --t13:   #8a8480;   /* divider text — decorative */
          --t14:   #585048;   /* alt-tag text */
          --t15:   #686260;   /* rest-pill text */
          --day-title:        #0f0e0d;
          --tab-active-col:   #0f0e0d;
          --sched-tab-active: #0f0e0d;
          --age-tab-bg:       #ffffff;
          --pro-bg:    #e8f5ee; --pro-border: #aad8be; --pro-col: #1e6030;
          --con-bg:    #fdf0ee; --con-border: #f0c8c4; --con-col: #942010;
          --warn-bg:   #fef3e2; --warn-border: #f0d090; --warn-col: #6a3800;
          --chip-bg:   #e8f5ee; --chip-border: #aad8be; --chip-col: #1e6030; --chip-strong: #1e6030;
          --avoid-bg:  #fdf0ee; --avoid-border: #f0c8c4; --avoid-col: #942010;
          --toggle-bg: #e8e2d8; --toggle-border: #c8c0b4; --toggle-col: #5a5450;
        }

        /* ── HEADER (stays dark in both modes — brand element) ── */
        .header { background: #111; border-bottom: 1px solid #1e1e1e; padding: 20px 20px 14px; position: sticky; top: 0; z-index: 20; }
        .header-top { display: flex; justify-content: space-between; align-items: flex-start; }
        .header-eyebrow { font-size: 9px; letter-spacing: 3px; color: #888; text-transform: uppercase; margin-bottom: 4px; }
        .header-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 4px; color: #fff; line-height: 1; }
        .header-sub { font-size: 9px; letter-spacing: 2px; color: #777; margin-top: 5px; text-transform: uppercase; }

        .theme-toggle {
          display: flex; align-items: center; gap: 5px;
          background: var(--toggle-bg); border: 1px solid var(--toggle-border);
          color: var(--toggle-col); border-radius: 20px;
          padding: 5px 11px; font-family: 'DM Mono', monospace;
          font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0; margin-top: 2px;
          white-space: nowrap;
        }
        .theme-toggle:hover { border-color: #666; color: #aaa; }
        [data-theme="light"] .theme-toggle { background: #e8e2d8; border-color: #c0b8ae; color: #6a6460; }
        [data-theme="light"] .theme-toggle:hover { border-color: #a09890; color: #3a3530; }

        /* ── MAIN TABS ── */
        .main-tabs { display: flex; background: var(--s2b); border-bottom: 1px solid var(--b2); }
        .main-tab { flex: 1; padding: 13px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 2px; background: none; border: none; cursor: pointer; color: var(--t10); border-bottom: 2px solid transparent; transition: all 0.2s; }
        .main-tab.active { color: var(--tab-active-col); border-bottom-color: var(--tab-active-col); }

        .day-tabs { display: flex; background: var(--s2b); border-bottom: 1px solid var(--s4); overflow-x: auto; scrollbar-width: none; }
        .day-tab { flex: 1; padding: 12px 6px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; background: none; border: none; cursor: pointer; color: var(--t11); border-bottom: 3px solid transparent; transition: all 0.2s; white-space: nowrap; min-width: 70px; }
        .day-tab.active { color: var(--dc); border-bottom-color: var(--dc); }

        .content { padding: 20px 18px 60px; max-width: 660px; margin: 0 auto; }

        .day-number { font-size: 9px; letter-spacing: 3px; color: var(--dc); margin-bottom: 3px; }
        .day-title { font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: 3px; color: var(--day-title); line-height: 1; margin-bottom: 6px; }
        .focus-bar { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
        .focus-tag { font-size: 9px; letter-spacing: 1px; padding: 3px 8px; border: 1px solid var(--dc); color: var(--dc); text-transform: uppercase; border-radius: 2px; }
        .day-why { font-size: 11px; line-height: 1.8; color: var(--t7); border-left: 2px solid var(--dc); padding-left: 12px; margin-bottom: 26px; }

        .divider { font-size: 8px; letter-spacing: 3px; color: var(--t13); text-transform: uppercase; display: flex; align-items: center; gap: 8px; margin: 20px 0 12px; }
        .divider::after { content: ''; flex: 1; height: 1px; background: var(--b2); }

        /* ── EXERCISE CARDS ── */
        .ex-card { background: var(--s1); border: 1px solid var(--b1); border-radius: 3px; margin-bottom: 8px; cursor: pointer; transition: border-color 0.2s; }
        .ex-card:hover { border-color: var(--b5); }
        .ex-card.open { border-color: var(--dc); }

        .ex-header { display: flex; justify-content: space-between; align-items: center; padding: 13px 14px; gap: 10px; }
        .ex-name { font-size: 12px; letter-spacing: 0.3px; color: var(--t2); font-weight: 500; line-height: 1.4; margin-bottom: 6px; }
        .ex-meta { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .ex-sets { font-size: 10px; color: var(--dc); letter-spacing: 1px; }
        .ex-rest-pill { font-size: 9px; background: var(--s3); border: 1px solid var(--b4); color: var(--t15); padding: 2px 8px; border-radius: 20px; letter-spacing: 0.3px; }
        .ex-src { font-size: 9px; color: var(--t11); }
        .ex-arrow { font-size: 10px; color: var(--t11); transition: transform 0.2s; flex-shrink: 0; margin-left: 4px; }
        .ex-card.open .ex-arrow { transform: rotate(180deg); }

        .ex-body { padding: 2px 14px 14px; border-top: 1px solid var(--b3); }
        .ex-note { font-size: 11px; line-height: 1.8; color: var(--t7); padding-top: 11px; margin-bottom: 14px; }

        .alts-label { font-size: 8px; letter-spacing: 2px; color: var(--t12); text-transform: uppercase; margin-bottom: 7px; }
        .alts-list { display: flex; flex-wrap: wrap; gap: 5px; }
        .alt-tag { font-size: 9px; background: var(--s3); border: 1px solid var(--b1); color: var(--t14); padding: 3px 10px; border-radius: 20px; letter-spacing: 0.3px; transition: all 0.15s; cursor: default; }
        .alt-tag:hover { border-color: var(--dc); color: var(--dc); }

        /* ── SCHEDULE ── */
        .sched-tabs { display: flex; gap: 8px; margin-bottom: 16px; }
        .sched-tab { flex: 1; padding: 10px 8px; background: var(--s1); border: 1px solid var(--b1); border-radius: 3px; font-size: 10px; letter-spacing: 1px; color: var(--t9); cursor: pointer; text-align: center; transition: all 0.2s; text-transform: uppercase; }
        .sched-tab.active { border-color: var(--sched-tab-active); color: var(--sched-tab-active); }

        .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; margin-bottom: 20px; }
        .week-cell { text-align: center; padding: 10px 3px; border-radius: 3px; }
        .wc-label { font-size: 8px; letter-spacing: 1px; color: var(--t11); margin-bottom: 3px; }
        .wc-day { font-size: 9px; color: var(--wc); font-weight: 500; margin-bottom: 2px; }
        .wc-name { font-size: 8px; color: var(--wc); }
        .wc-workout { background: var(--s4); }
        .wc-rest { background: var(--s2b); }

        .note-card { background: var(--s2); border: 1px solid var(--b2); border-radius: 3px; padding: 12px 14px; margin-bottom: 8px; }
        .note-pair { font-size: 11px; color: var(--t4); margin-bottom: 4px; font-weight: 500; }
        .note-detail { font-size: 10px; color: var(--t9); line-height: 1.7; }

        .rule-card { display: flex; gap: 12px; background: var(--s2); border: 1px solid var(--b2); border-radius: 3px; padding: 12px 14px; margin-bottom: 8px; }
        .rule-icon { font-size: 14px; flex-shrink: 0; }
        .rule-title { font-size: 11px; color: var(--t3); margin-bottom: 3px; font-weight: 500; }
        .rule-body { font-size: 10px; color: var(--t9); line-height: 1.7; }

        .sched-rec { display: inline-block; font-size: 9px; letter-spacing: 1px; background: var(--s5); color: var(--t7); padding: 3px 8px; border-radius: 2px; margin-bottom: 14px; text-transform: uppercase; }

        /* ── SUPPLEMENT STYLES ── */
        .age-tabs { display: flex; gap: 6px; margin-bottom: 18px; }
        .age-tab { flex: 1; padding: 11px 8px; background: var(--age-tab-bg); border: 1px solid var(--b1); border-radius: 3px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 2px; color: var(--t11); cursor: pointer; text-align: center; transition: all 0.2s; }
        .age-tab.active-25 { border-color: #c8922a; color: #c8922a; }
        .age-tab.active-60 { border-color: #2ab8b8; color: #2ab8b8; }

        .supp-section-label { font-size: 8px; letter-spacing: 3px; color: var(--t13); text-transform: uppercase; display: flex; align-items: center; gap: 8px; margin: 22px 0 10px; }
        .supp-section-label::after { content: ''; flex: 1; height: 1px; background: var(--b2); }
        .supp-section-note { font-size: 8px; color: var(--t11); letter-spacing: 1px; }

        .supp-card { background: var(--s1); border: 1px solid var(--b1); border-radius: 3px; margin-bottom: 8px; cursor: pointer; transition: border-color 0.2s; }
        .supp-card:hover { border-color: var(--b5); }
        .supp-card.open { border-color: var(--sc); }

        .supp-header { display: flex; justify-content: space-between; align-items: flex-start; padding: 13px 14px; gap: 10px; }
        .supp-name { font-size: 12px; color: var(--t2); font-weight: 500; margin-bottom: 5px; line-height: 1.3; }
        .supp-subtitle { font-size: 9px; color: var(--t9); letter-spacing: 0.5px; margin-bottom: 6px; }
        .supp-meta-row { display: flex; gap: 5px; flex-wrap: wrap; align-items: center; }
        .supp-timing { font-size: 9px; color: var(--sc); letter-spacing: 0.5px; }
        .supp-status { font-size: 8px; padding: 2px 7px; border-radius: 20px; letter-spacing: 0.5px; border: 1px solid; }

        .supp-body { padding: 0 14px 14px; border-top: 1px solid var(--b3); }
        .supp-why { font-size: 11px; line-height: 1.8; color: var(--t7); border-left: 2px solid var(--sc); padding-left: 12px; margin: 12px 0 16px; }

        .pick-block { background: var(--s2b); border: 1px solid var(--b2); border-radius: 3px; padding: 11px 12px; margin-bottom: 6px; }
        .pick-rank-badge { display: inline-block; font-size: 8px; letter-spacing: 1.5px; padding: 2px 7px; border-radius: 2px; text-transform: uppercase; margin-bottom: 7px; }
        .rank-top { background: var(--s5); color: var(--sc); border: 1px solid var(--sc); }
        .rank-alt { background: var(--s5); color: var(--t7); border: 1px solid var(--b6); }
        .rank-avoid { background: var(--avoid-bg); color: var(--avoid-col); border: 1px solid var(--avoid-border); }
        .pick-name { font-size: 11px; color: var(--t3); font-weight: 500; margin-bottom: 3px; }
        .pick-price { font-size: 9px; color: var(--t10); margin-bottom: 5px; }
        .pick-meta-txt { font-size: 9px; color: var(--t11); line-height: 1.6; margin-bottom: 7px; }
        .pick-why-txt { font-size: 10px; color: var(--t8); line-height: 1.7; margin-bottom: 8px; }
        .flags-row { display: flex; flex-wrap: wrap; gap: 4px; }
        .flag { font-size: 8px; padding: 2px 7px; border-radius: 2px; letter-spacing: 0.3px; }
        .flag-pro { background: var(--pro-bg); color: var(--pro-col); border: 1px solid var(--pro-border); }
        .flag-con { background: var(--con-bg); color: var(--con-col); border: 1px solid var(--con-border); }

        .supp-protocol { background: var(--bg); border: 1px solid var(--b2); border-left: 2px solid var(--sc); border-radius: 0 3px 3px 0; padding: 10px 12px; margin-top: 14px; }
        .protocol-label { font-size: 8px; letter-spacing: 2px; color: var(--sc); text-transform: uppercase; margin-bottom: 5px; }
        .protocol-text { font-size: 10px; color: var(--t9); line-height: 1.7; }

        .supp-buy { font-size: 9px; color: var(--t11); margin-top: 10px; line-height: 1.7; }
        .supp-buy strong { color: var(--t7); }

        .supp-warning { background: var(--warn-bg); border: 1px solid var(--warn-border); border-radius: 3px; padding: 9px 11px; margin-top: 10px; font-size: 9px; color: var(--warn-col); line-height: 1.7; }

        .interaction-row { display: flex; gap: 6px; margin-top: 10px; }
        .interaction-chip { flex: 1; background: var(--chip-bg); border: 1px solid var(--chip-border); border-radius: 3px; padding: 8px 10px; font-size: 9px; color: var(--chip-col); line-height: 1.6; }
        .interaction-chip strong { display: block; color: var(--chip-strong); margin-bottom: 2px; font-size: 8px; letter-spacing: 0.5px; }

        .quick-ref-row { background: var(--s2b); border: 1px solid var(--b2); border-radius: 3px; padding: 10px 12px; margin-bottom: 6px; display: flex; gap: 10px; align-items: baseline; }
        .qr-name { font-size: 10px; color: var(--t5); flex: 1; }
        .qr-pick { font-size: 9px; color: var(--t9); flex: 2; }
        .qr-price { font-size: 9px; color: var(--t12); white-space: nowrap; }
      `}</style>

      {/* ── HEADER ── */}
      <div className="header">
        <div className="header-top">
          <div>
            <div className="header-eyebrow">Athlete-Inspired Training</div>
            <div className="header-title">BUILD THE BEST BODY</div>
            <div className="header-sub">4 Days / Week · Sport-Specific Methods</div>
          </div>
          <button className="theme-toggle" onClick={() => setTheme(isLight ? "dark" : "light")}>
            {isLight ? "🌙 Dark" : "☀ Light"}
          </button>
        </div>
      </div>

      {/* ── MAIN TABS ── */}
      <div className="main-tabs">
        <button className={`main-tab ${tab === "days" ? "active" : ""}`} onClick={() => setTab("days")}>Workouts</button>
        <button className={`main-tab ${tab === "schedule" ? "active" : ""}`} onClick={() => setTab("schedule")}>Schedule</button>
        <button className={`main-tab ${tab === "rules" ? "active" : ""}`} onClick={() => setTab("rules")}>Rest Rules</button>
        <button className={`main-tab ${tab === "supps" ? "active" : ""}`} onClick={() => setTab("supps")}>Supplements</button>
      </div>

      {/* ── WORKOUTS TAB ── */}
      {tab === "days" && (
        <>
          <div className="day-tabs">
            {days.map((d, i) => (
              <button key={i} className={`day-tab ${activeDay === i ? "active" : ""}`}
                style={{ "--dc": d.color }}
                onClick={() => { setActiveDay(i); setExpanded(null); }}>
                {d.day}
              </button>
            ))}
          </div>
          <div className="content" style={{ "--dc": day.color }}>
            <div style={{ marginBottom: 24 }}>
              <div className="day-number">{day.day} · {day.athletes}</div>
              <div className="day-title">{day.label}</div>
              <div className="focus-bar">{day.focus.split(" · ").map((f, i) => <span key={i} className="focus-tag">{f}</span>)}</div>
              <div className="day-why">{day.why}</div>
            </div>
            <div className="divider">Exercises — tap to expand</div>
            {day.exercises.map((ex, i) => (
              <div key={i} className={`ex-card ${expanded === i ? "open" : ""}`} onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="ex-header">
                  <div style={{ flex: 1 }}>
                    <div className="ex-name">{ex.name}</div>
                    <div className="ex-meta">
                      <span className="ex-sets">{ex.sets}</span>
                      <span className="ex-rest-pill">⏱ {ex.rest} rest</span>
                      <span className="ex-src">{ex.source}</span>
                    </div>
                  </div>
                  <div className="ex-arrow">▼</div>
                </div>
                {expanded === i && (
                  <div className="ex-body">
                    <div className="ex-note">{ex.note}</div>
                    <div className="alts-label">Alternatives</div>
                    <div className="alts-list">
                      {ex.alts.map((a, j) => <span key={j} className="alt-tag">{a}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── SCHEDULE TAB ── */}
      {tab === "schedule" && (
        <div className="content">
          <div className="divider" style={{ marginTop: 4 }}>Choose your schedule</div>
          <div className="sched-tabs">
            {schedules.map((s, i) => (
              <button key={i} className={`sched-tab ${activeSched === i ? "active" : ""}`} onClick={() => setActiveSched(i)}>
                {s.name.split("—")[0].trim()}
              </button>
            ))}
          </div>
          {(() => {
            const s = schedules[activeSched];
            return (
              <>
                <div className="sched-rec">{s.rec}</div>
                <div style={{ marginBottom: 6, fontSize: 12, color: "var(--t6)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{s.name}</div>
                <div className="week-grid">
                  {s.weeks.map((w, i) => (
                    <div key={i} className={`week-cell ${w.type === "w" ? "wc-workout" : "wc-rest"}`}
                      style={{ "--wc": w.type === "w" ? w.color : (isLight ? "#888080" : "#606060") }}>
                      <div className="wc-label">{w.label}</div>
                      <div className="wc-day">{w.day}</div>
                      <div className="wc-name">{w.name}</div>
                    </div>
                  ))}
                </div>
                <div className="divider">Day pairing notes</div>
                {s.notes.map((n, i) => (
                  <div key={i} className="note-card">
                    <div className="note-pair">{n.pair}</div>
                    <div className="note-detail">{n.detail}</div>
                  </div>
                ))}
              </>
            );
          })()}
          <div className="divider" style={{ marginTop: 28 }}>The 4 Day Split</div>
          {[
            { d: "D1", label: "Upper Push", color: "#00b4d8", who: "Swimmer + Gymnast" },
            { d: "D2", label: "Lower — Quad", color: "#f4a261", who: "Cyclist + Sprinter" },
            { d: "D3", label: "Upper Pull", color: "#9b72cf", who: "Climber + Rower + Gymnast" },
            { d: "D4", label: "Lower — Power", color: "#52b788", who: "Sprinter + Skater + Decathlete + Boxer" },
          ].map((d, i) => (
            <div key={i} className="note-card" style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: d.color, flexShrink: 0 }}>{d.d}</div>
              <div>
                <div style={{ fontSize: 11, color: "var(--t3)", marginBottom: 2 }}>{d.label}</div>
                <div style={{ fontSize: 9, color: "var(--t9)", letterSpacing: 1 }}>{d.who}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── REST RULES TAB ── */}
      {tab === "rules" && (
        <div className="content">
          <div className="divider" style={{ marginTop: 4 }}>Rest day rules</div>
          {rules.map((r, i) => (
            <div key={i} className="rule-card">
              <div className="rule-icon">{r.icon}</div>
              <div>
                <div className="rule-title">{r.title}</div>
                <div className="rule-body">{r.body}</div>
              </div>
            </div>
          ))}
          <div className="divider" style={{ marginTop: 28 }}>The Golden Rule</div>
          <div className="note-card" style={{ borderColor: "var(--b5)" }}>
            <div style={{ fontSize: 12, color: "var(--t5)", lineHeight: 1.8 }}>
              The only pair you should <span style={{ color: isLight ? "#b85000" : "#f4a261" }}>never</span> do back-to-back is <span style={{ color: isLight ? "#b85000" : "#f4a261" }}>Day 2 + Day 4</span>. Both are lower body, both are taxing on the posterior chain and nervous system. Everything else is manageable with proper sleep and nutrition.
            </div>
          </div>
          <div className="divider" style={{ marginTop: 20 }}>Signs you need more rest</div>
          {[
            "Your strength is dropping session to session (not gaining)",
            "Sleep feels unrefreshing even after 8h",
            "Joints feel 'off' or you feel unusually stiff in the morning",
            "You dread training rather than feel ready for it",
          ].map((s, i) => (
            <div key={i} className="note-card" style={{ marginBottom: 6 }}>
              <div style={{ fontSize: 10, color: "var(--t8)", lineHeight: 1.7 }}>— {s}</div>
            </div>
          ))}
        </div>
      )}

      {/* ── SUPPLEMENTS TAB ── */}
      {tab === "supps" && (
        <div className="content" style={{ "--sc": currentStack.color }}>

          {/* Age selector */}
          <div style={{ marginBottom: 6, marginTop: 4 }}>
            <div className="divider" style={{ marginTop: 0 }}>Select your stack</div>
            <div className="age-tabs">
              <button
                className={`age-tab ${suppAge === "25" ? "active-25" : ""}`}
                onClick={() => { setSuppAge("25"); setExpandedSupp(null); }}>
                Age 25
              </button>
              <button
                className={`age-tab ${suppAge === "60" ? "active-60" : ""}`}
                onClick={() => { setSuppAge("60"); setExpandedSupp(null); }}>
                Age 60+
              </button>
            </div>
          </div>

          {/* Stack tagline */}
          <div style={{ fontSize: 9, letterSpacing: 2, color: currentStack.color, marginBottom: 4, textTransform: "uppercase" }}>
            {currentStack.tagline}
          </div>
          <div style={{ fontSize: 9, color: "var(--t13)", letterSpacing: 1, marginBottom: 4 }}>
            Researched: Amazon.in · iHerb · Reddit r/Fitness_India · Unbox Health · ConsumerLab · India 2025
          </div>

          {/* Supplement sections */}
          {currentStack.sections.map((section, si) => (
            <div key={si}>
              <div className="supp-section-label">
                {section.label}
                <span className="supp-section-note">{section.note}</span>
              </div>

              {section.supplements.map((supp, i) => {
                const key = `${si}-${i}`;
                const isOpen = expandedSupp === key;
                return (
                  <div key={key}
                    className={`supp-card ${isOpen ? "open" : ""}`}
                    style={{ "--sc": currentStack.color }}
                    onClick={() => setExpandedSupp(isOpen ? null : key)}>

                    {/* Card header */}
                    <div className="supp-header">
                      <div style={{ flex: 1 }}>
                        <div className="supp-name">{supp.name}</div>
                        <div className="supp-subtitle">{supp.subtitle}</div>
                        <div className="supp-meta-row">
                          <span className="supp-timing">{supp.timing}</span>
                          <span className="supp-status"
                            style={{ color: supp.statusColor, borderColor: supp.statusColor, background: "transparent" }}>
                            {supp.status}
                          </span>
                        </div>
                      </div>
                      <div className="ex-arrow" style={{ color: isOpen ? currentStack.color : "#333" }}>▼</div>
                    </div>

                    {/* Expanded body */}
                    {isOpen && (
                      <div className="supp-body" onClick={e => e.stopPropagation()}>

                        {/* Why section */}
                        <div className="supp-why">{supp.why}</div>

                        {/* Interaction chips (citicoline 60+ only) */}
                        {supp.name === "Citicoline (CDP-Choline)" && suppAge === "60" && (
                          <div className="interaction-row" style={{ marginBottom: 14 }}>
                            <div className="interaction-chip">
                              <strong>✓ Bacopa + Citicoline</strong>
                              SAFE — complementary cholinergic pathways, no adverse interaction (DopCheck)
                            </div>
                            <div className="interaction-chip">
                              <strong>✓ PS + Citicoline</strong>
                              Not flagged in interaction databases — no known adverse pairing
                            </div>
                          </div>
                        )}

                        {/* Picks */}
                        <div style={{ fontSize: 8, letterSpacing: 2, color: "var(--t13)", textTransform: "uppercase", marginBottom: 8 }}>
                          India Picks
                        </div>
                        {supp.picks.map((pick, pi) => {
                          const isAvoid = pick.rank.includes("AVOID") || pick.rank.includes("WARNING");
                          const isTop = pick.rank.includes("TOP") || pick.rank.includes("BEST");
                          return (
                            <div key={pi} className="pick-block">
                              <div className={`pick-rank-badge ${isAvoid ? "rank-avoid" : isTop ? "rank-top" : "rank-alt"}`}>
                                {pick.rank}
                              </div>
                              <div className="pick-name">{pick.name}</div>
                              {pick.price && pick.price !== "—" && <div className="pick-price">{pick.price}</div>}
                              <div className="pick-meta-txt">{pick.meta}</div>
                              <div className="pick-why-txt">{pick.why}</div>
                              {(pick.pros.length > 0 || pick.cons.length > 0) && (
                                <div className="flags-row">
                                  {pick.pros.map((p, j) => <span key={j} className="flag flag-pro">✓ {p}</span>)}
                                  {pick.cons.map((c, j) => <span key={j} className="flag flag-con">✗ {c}</span>)}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Protocol */}
                        <div className="supp-protocol">
                          <div className="protocol-label">Protocol</div>
                          <div className="protocol-text">{supp.protocol}</div>
                        </div>

                        {/* Warning */}
                        {supp.warning && (
                          <div className="supp-warning">⚠ {supp.warning}</div>
                        )}

                        {/* Where to buy */}
                        <div className="supp-buy">
                          <strong>Buy: </strong>{supp.buy}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Quick reference */}
          <div className="divider" style={{ marginTop: 28 }}>Quick reference</div>
          {currentStack.sections.flatMap(s => s.supplements).map((supp, i) => (
            <div key={i} className="quick-ref-row">
              <div className="qr-name">{supp.name.split(" (")[0].split(" —")[0]}</div>
              <div className="qr-pick">{supp.picks[0]?.name}</div>
              <div className="qr-price">{supp.picks[0]?.price}</div>
            </div>
          ))}

          <div style={{ marginTop: 28, fontSize: 9, color: "var(--t13)", letterSpacing: 1, lineHeight: 1.9, textTransform: "uppercase" }}>
            Informational only — not medical advice.<br />
            Consult a physician before starting any new supplement protocol.
          </div>
        </div>
      )}
    </div>
  );
}
