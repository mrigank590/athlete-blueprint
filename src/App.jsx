import { useState } from "react";

const days = [
  {
    day: "DAY 1",
    label: "UPPER PUSH",
    athletes: "Swimmer · Gymnast",
    color: "#00b4d8",
    focus: "Shoulders · Chest · Triceps · Serratus",
    why: "Swimmers build the widest V-taper through massive shoulder volume; gymnasts build dense pressing power through bodyweight isometric loading.",
    exercises: [
      {
        name: "Handstand Push-Up (or Pike Push-Up)",
        sets: "4 × 6–10", source: "🤸 Gymnast", rest: "2–3 min",
        note: "Wall-supported. Best overhead pressing for shoulder mass + long-term stability. Progress to freestanding over time.",
        alts: ["Pike Push-Up", "Z-Press (seated on floor, DB)", "Seated DB Shoulder Press", "Log Press"],
      },
      {
        name: "Overhead Barbell / DB Press",
        sets: "4 × 8–10", source: "🏊 Swimmer", rest: "2 min",
        note: "Builds the shoulder volume behind that wide, round-delt look. Control the eccentric.",
        alts: ["Arnold Press", "Landmine Press", "Cable Overhead Press", "Machine Shoulder Press"],
      },
      {
        name: "Dips (Ring Dips if possible)",
        sets: "4 × 8–12", source: "🤸 Gymnast", rest: "2 min",
        note: "Rings force stabilization that a fixed bar never will — builds tricep + chest density gymnasts are known for.",
        alts: ["Parallel Bar Dips", "Bench Dips (weighted)", "Close-Grip Push-Up", "Cable Tricep Pushdown"],
      },
      {
        name: "Lateral Raises (slow, high volume)",
        sets: "4 × 15–20", source: "🏊 Swimmer", rest: "60–90 sec",
        note: "Replicates the delt overload of thousands of swim strokes. Keep weight lighter, squeeze at the top.",
        alts: ["Cable Lateral Raise", "Band Lateral Raise", "Machine Lateral Raise", "Leaning Cable Raise"],
      },
      {
        name: "Incline Push-Up with Serratus Plus",
        sets: "3 × 15", source: "🤸 Gymnast", rest: "60 sec",
        note: "At the top, protract the scapula hard. Directly trains serratus — what makes abs look 3D and shoulders look complete.",
        alts: ["Wall Push-Up with protraction", "Cable Serratus Punch", "Straight-Arm Pulldown", "Bear Crawl hold"],
      },
      {
        name: "Rear Delt Face Pull",
        sets: "3 × 15", source: "🏊 Swimmer", rest: "60 sec",
        note: "Swimmers have exceptional rear delt development from pulling through water. Keeps shoulders balanced and healthy.",
        alts: ["Band Pull-Apart", "Reverse Pec Deck", "DB Rear Delt Fly", "Cable Rear Delt Row"],
      },
    ],
  },
  {
    day: "DAY 2",
    label: "LOWER — QUAD",
    athletes: "Cyclist · Sprinter",
    color: "#f4a261",
    focus: "Quads · Calves · Explosiveness",
    why: "Track cyclists build the freakiest quads in sport through endless high-load knee extension. Sprinters add fast-twitch explosiveness on top.",
    exercises: [
      {
        name: "Box Jump / Broad Jump",
        sets: "4 × 5 (max effort)", source: "🏃 Sprinter", rest: "2–3 min",
        note: "Always do these FIRST when fresh. Pure fast-twitch recruitment. Never grind these — full reset between reps.",
        alts: ["Depth Jump", "Jump Squat (bodyweight)", "Vertical Jump", "Skater Bounds"],
      },
      {
        name: "Hack Squat / Leg Press (high volume)",
        sets: "5 × 12–15", source: "🚴 Cyclist", rest: "2–2.5 min",
        note: "This is the cyclist key. High volume knee extension with slow eccentrics = teardrop quad development. Don't rush.",
        alts: ["Front Squat", "Safety Bar Squat", "Smith Machine Squat (close stance)", "Pendulum Squat"],
      },
      {
        name: "Bulgarian Split Squat",
        sets: "4 × 8–10 each", source: "🏃 Sprinter", rest: "90 sec–2 min",
        note: "Unilateral quad + glute loading that directly mimics sprint mechanics. Harder than it looks, humbling at first.",
        alts: ["Rear-Foot Elevated DB Squat", "Step-Up (weighted)", "Reverse Lunge", "Single-Leg Leg Press"],
      },
      {
        name: "Sissy Squat or Leg Extension",
        sets: "3 × 15", source: "🚴 Cyclist", rest: "60–90 sec",
        note: "Cyclists dominate knee extension. This isolates the quads at a range most compound lifts miss.",
        alts: ["Heel-Elevated Goblet Squat", "Spanish Squat (with band)", "Peterson Step-Up", "TRX Sissy Squat"],
      },
      {
        name: "Single-Leg Calf Raise (weighted, slow)",
        sets: "4 × 15–20", source: "⚽ Soccer · 🚴 Cyclist", rest: "60 sec",
        note: "Full range of motion — all the way down. Soccer players have naturally great calves from reactive cutting. Match that with slow, controlled reps.",
        alts: ["Seated Calf Raise (soleus focus)", "Standing Machine Calf Raise", "Donkey Calf Raise", "Jump Rope finisher"],
      },
      {
        name: "Sprint Intervals (optional finisher)",
        sets: "6 × 20m all-out", source: "🏃 Sprinter", rest: "2–3 min (full recovery)",
        note: "Short, maximum effort sprints. Trains the fast-twitch that no leg press can touch.",
        alts: ["Stationary Bike Sprint (10 sec all-out)", "Rowing Erg Sprint", "Assault Bike Sprint", "Treadmill Sprint"],
      },
    ],
  },
  {
    day: "DAY 3",
    label: "UPPER PULL",
    athletes: "Climber · Rower · Gymnast",
    color: "#9b72cf",
    focus: "Lats · Mid-back · Biceps · Grip · Core",
    why: "Climbers have the strongest relative pulling strength in sport; rowers build armor-plate back thickness; gymnasts tie it together with impossible core strength.",
    exercises: [
      {
        name: "Weighted Pull-Up / Archer Pull-Up",
        sets: "4 × 6–10", source: "🧗 Climber · 🤸 Gymnast", rest: "2–3 min",
        note: "Add weight progressively. Archer pull-ups (one arm extended) are the climber progression toward one-arm strength.",
        alts: ["Lat Pulldown (heavy)", "Band-Assisted Pull-Up", "Commando Pull-Up", "Neutral-Grip Pull-Up"],
      },
      {
        name: "Dead Hang (+ scapular pulls)",
        sets: "3 × 30–45 sec", source: "🧗 Climber", rest: "60–90 sec",
        note: "Builds grip, finger tendons, and decompresses the spine. Scapular pulls at the start of each hang activate the lats.",
        alts: ["Towel Hang", "Single-Arm Dead Hang (assisted)", "Fingerboard Hang", "Fat Bar Hang"],
      },
      {
        name: "Barbell or Seal Row",
        sets: "4 × 8–10", source: "🚣 Rower", rest: "2 min",
        note: "Rowing trains mid-back thickness. Seal rows (chest on bench) remove all cheat — pure back loading.",
        alts: ["T-Bar Row", "Chest-Supported Machine Row", "Pendlay Row", "Cable Row (wide grip)"],
      },
      {
        name: "Single-Arm DB Row (heavy)",
        sets: "3 × 10 each", source: "🚣 Rower", rest: "90 sec",
        note: "Rowers pull explosively through a full range. Match that — long stretch at the bottom, strong pull to hip.",
        alts: ["Meadows Row", "Single-Arm Cable Row", "Kroc Row", "Single-Arm Machine Row"],
      },
      {
        name: "Hollow Body Hold",
        sets: "4 × 30–45 sec", source: "🤸 Gymnast", rest: "60 sec",
        note: "The gymnast core foundation. Harder than any crunch. Lower back pressed flat, arms overhead, legs low. Build time slowly.",
        alts: ["Hollow Body Rock", "Ab Wheel Rollout", "Dead Bug", "Long-Lever Plank"],
      },
      {
        name: "Hanging Leg Raise to L-Sit Hold",
        sets: "3 × 10 + 10 sec hold", source: "🤸 Gymnast", rest: "60–90 sec",
        note: "Combines hip flexor strength with deep ab activation. The L-sit hold at the end builds serratus + lower ab definition.",
        alts: ["Toes-to-Bar", "Lying Leg Raise", "Dragon Flag (progression)", "Parallel Bar L-Sit"],
      },
    ],
  },
  {
    day: "DAY 4",
    label: "LOWER — POWER",
    athletes: "Sprinter · Speed Skater · Decathlete · Boxer",
    color: "#52b788",
    focus: "Glutes · Hamstrings · Posterior Chain · Obliques",
    why: "Sprinters and speed skaters build the most explosive posterior chains in sport. Decathletes add full-body power. Boxers finish with the densest obliques from rotational punch mechanics.",
    exercises: [
      {
        name: "Romanian Deadlift (RDL)",
        sets: "4 × 8–10", source: "🏃 Sprinter", rest: "2 min",
        note: "Eccentrically loads the hamstrings exactly like top-speed sprint mechanics. Feel the stretch — don't just hinge fast.",
        alts: ["Stiff-Leg Deadlift", "Single-Leg RDL", "Good Morning", "Cable Pull-Through"],
      },
      {
        name: "Hip Thrust (heavy + explosive)",
        sets: "4 × 10–12", source: "🏃 Sprinter · 🛼 Speed Skater", rest: "2 min",
        note: "Speed skaters and sprinters have the most powerful glutes in sport. Hip thrust is the most direct glute builder that exists.",
        alts: ["Glute Bridge (floor)", "Single-Leg Hip Thrust", "Cable Pull-Through", "45° Back Extension (glute focus)"],
      },
      {
        name: "Power Clean or Hang Clean",
        sets: "4 × 4–5", source: "🏋️ Decathlete", rest: "2.5–3 min",
        note: "Decathletes train explosive full-body power. The clean teaches every muscle to fire together. If new to it, do DB hang cleans instead.",
        alts: ["DB Hang Clean", "Kettlebell Swing (heavy)", "Jump Shrug", "Medicine Ball Slam"],
      },
      {
        name: "Copenhagen Plank / Lateral Lunge",
        sets: "3 × 20 sec each / 3 × 10", source: "🛼 Speed Skater", rest: "60–90 sec",
        note: "Speed skating is a lateral sport. Copenhagen planks build inner thigh + hip adductor strength that almost no other exercise hits.",
        alts: ["Side-Lying Hip Adduction", "Sumo Squat", "Cable Hip Adduction", "Lateral Band Walk"],
      },
      {
        name: "Glute Ham Raise / Nordic Curl",
        sets: "3 × 6–8", source: "🏃 Sprinter", rest: "2 min",
        note: "The single best hamstring exercise. Eccentric-dominant, exactly how sprinting loads the hamstrings. Start with feet anchored and assist with hands.",
        alts: ["Lying Leg Curl (slow eccentric)", "Swiss Ball Leg Curl", "Single-Leg Leg Curl", "Razor Curl"],
      },
      {
        name: "Landmine Rotation / Cable Woodchop",
        sets: "3 × 12 each side", source: "🥊 Boxer", rest: "60 sec",
        note: "Boxers develop dense obliques from transferring rotational power through the torso. This trains that punch-transfer mechanic directly.",
        alts: ["Pallof Press", "Russian Twist (weighted)", "Med Ball Rotational Throw", "Oblique Cable Crunch"],
      },
    ],
  },
];

const schedules = [
  {
    name: "Option A — Classic 2+2",
    rec: "Best for most people",
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
    name: "Option B — Spread Out",
    rec: "Better recovery, more flexibility",
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

export default function WorkoutPlan() {
  const [tab, setTab] = useState("days");
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [activeSched, setActiveSched] = useState(0);

  const day = days[activeDay];

  return (
    <div style={{ fontFamily: "'DM Mono', 'Courier New', monospace", background: "#0a0a0a", minHeight: "100vh", color: "#e8e8e8" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .header { background: #111; border-bottom: 1px solid #1e1e1e; padding: 24px 20px 16px; position: sticky; top: 0; z-index: 20; }
        .header-eyebrow { font-size: 9px; letter-spacing: 3px; color: #444; text-transform: uppercase; margin-bottom: 4px; }
        .header-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 4px; color: #fff; line-height: 1; }
        .header-sub { font-size: 9px; letter-spacing: 2px; color: #3a3a3a; margin-top: 5px; text-transform: uppercase; }

        .main-tabs { display: flex; background: #0d0d0d; border-bottom: 1px solid #1a1a1a; }
        .main-tab { flex: 1; padding: 13px 8px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 2px; background: none; border: none; cursor: pointer; color: #3a3a3a; border-bottom: 2px solid transparent; transition: all 0.2s; }
        .main-tab.active { color: #fff; border-bottom-color: #fff; }

        .day-tabs { display: flex; background: #0d0d0d; border-bottom: 1px solid #161616; overflow-x: auto; scrollbar-width: none; }
        .day-tab { flex: 1; padding: 12px 6px; font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; background: none; border: none; cursor: pointer; color: #333; border-bottom: 3px solid transparent; transition: all 0.2s; white-space: nowrap; min-width: 70px; }
        .day-tab.active { color: var(--dc); border-bottom-color: var(--dc); }

        .content { padding: 20px 18px 60px; max-width: 660px; margin: 0 auto; }

        .day-number { font-size: 9px; letter-spacing: 3px; color: var(--dc); margin-bottom: 3px; }
        .day-title { font-family: 'Bebas Neue', sans-serif; font-size: 38px; letter-spacing: 3px; color: #fff; line-height: 1; margin-bottom: 6px; }
        .focus-bar { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 12px; }
        .focus-tag { font-size: 9px; letter-spacing: 1px; padding: 3px 8px; border: 1px solid var(--dc); color: var(--dc); text-transform: uppercase; border-radius: 2px; }
        .day-why { font-size: 11px; line-height: 1.8; color: #555; border-left: 2px solid var(--dc); padding-left: 12px; margin-bottom: 26px; }

        .divider { font-size: 8px; letter-spacing: 3px; color: #2a2a2a; text-transform: uppercase; display: flex; align-items: center; gap: 8px; margin: 20px 0 12px; }
        .divider::after { content: ''; flex: 1; height: 1px; background: #1a1a1a; }

        .ex-card { background: #111; border: 1px solid #1e1e1e; border-radius: 3px; margin-bottom: 8px; cursor: pointer; transition: border-color 0.2s; }
        .ex-card:hover { border-color: #2e2e2e; }
        .ex-card.open { border-color: var(--dc); }

        .ex-header { display: flex; justify-content: space-between; align-items: center; padding: 13px 14px; gap: 10px; }
        .ex-name { font-size: 12px; letter-spacing: 0.3px; color: #ccc; font-weight: 500; line-height: 1.4; margin-bottom: 6px; }
        .ex-meta { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; }
        .ex-sets { font-size: 10px; color: var(--dc); letter-spacing: 1px; }
        .ex-rest-pill { font-size: 9px; background: #1c1c1c; border: 1px solid #242424; color: #5a5a5a; padding: 2px 8px; border-radius: 20px; letter-spacing: 0.3px; }
        .ex-src { font-size: 9px; color: #333; }
        .ex-arrow { font-size: 10px; color: #333; transition: transform 0.2s; flex-shrink: 0; margin-left: 4px; }
        .ex-card.open .ex-arrow { transform: rotate(180deg); }

        .ex-body { padding: 2px 14px 14px; border-top: 1px solid #181818; }
        .ex-note { font-size: 11px; line-height: 1.8; color: #555; padding-top: 11px; margin-bottom: 14px; }

        .alts-label { font-size: 8px; letter-spacing: 2px; color: #2e2e2e; text-transform: uppercase; margin-bottom: 7px; }
        .alts-list { display: flex; flex-wrap: wrap; gap: 5px; }
        .alt-tag { font-size: 9px; background: #141414; border: 1px solid #1e1e1e; color: #484848; padding: 3px 10px; border-radius: 20px; letter-spacing: 0.3px; transition: all 0.15s; cursor: default; }
        .alt-tag:hover { border-color: var(--dc); color: var(--dc); }

        .sched-tabs { display: flex; gap: 8px; margin-bottom: 16px; }
        .sched-tab { flex: 1; padding: 10px 8px; background: #111; border: 1px solid #1e1e1e; border-radius: 3px; font-size: 10px; letter-spacing: 1px; color: #444; cursor: pointer; text-align: center; transition: all 0.2s; text-transform: uppercase; }
        .sched-tab.active { border-color: #fff; color: #fff; }

        .week-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 3px; margin-bottom: 20px; }
        .week-cell { text-align: center; padding: 10px 3px; border-radius: 3px; }
        .wc-label { font-size: 8px; letter-spacing: 1px; color: #333; margin-bottom: 3px; }
        .wc-day { font-size: 9px; color: var(--wc); font-weight: 500; margin-bottom: 2px; }
        .wc-name { font-size: 8px; color: var(--wc); }
        .wc-workout { background: #161616; }
        .wc-rest { background: #0d0d0d; }

        .note-card { background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 3px; padding: 12px 14px; margin-bottom: 8px; }
        .note-pair { font-size: 11px; color: #888; margin-bottom: 4px; font-weight: 500; }
        .note-detail { font-size: 10px; color: #444; line-height: 1.7; }

        .rule-card { display: flex; gap: 12px; background: #0f0f0f; border: 1px solid #1a1a1a; border-radius: 3px; padding: 12px 14px; margin-bottom: 8px; }
        .rule-icon { font-size: 14px; flex-shrink: 0; }
        .rule-title { font-size: 11px; color: #bbb; margin-bottom: 3px; font-weight: 500; }
        .rule-body { font-size: 10px; color: #444; line-height: 1.7; }

        .sched-rec { display: inline-block; font-size: 9px; letter-spacing: 1px; background: #1a1a1a; color: #555; padding: 3px 8px; border-radius: 2px; margin-bottom: 14px; text-transform: uppercase; }
      `}</style>

      <div className="header">
        <div className="header-eyebrow">Athlete-Inspired Training</div>
        <div className="header-title">BUILD THE BEST BODY</div>
        <div className="header-sub">4 Days / Week · Sport-Specific Methods</div>
      </div>

      <div className="main-tabs">
        <button className={`main-tab ${tab === "days" ? "active" : ""}`} onClick={() => setTab("days")}>Workouts</button>
        <button className={`main-tab ${tab === "schedule" ? "active" : ""}`} onClick={() => setTab("schedule")}>Schedule</button>
        <button className={`main-tab ${tab === "rules" ? "active" : ""}`} onClick={() => setTab("rules")}>Rest Rules</button>
      </div>

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
                <div style={{ marginBottom: 6, fontSize: 12, color: "#666", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2 }}>{s.name}</div>
                <div className="week-grid">
                  {s.weeks.map((w, i) => (
                    <div key={i} className={`week-cell ${w.type === "w" ? "wc-workout" : "wc-rest"}`}
                      style={{ "--wc": w.type === "w" ? w.color : "#2a2a2a" }}>
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
                <div style={{ fontSize: 11, color: "#aaa", marginBottom: 2 }}>{d.label}</div>
                <div style={{ fontSize: 9, color: "#444", letterSpacing: 1 }}>{d.who}</div>
              </div>
            </div>
          ))}
        </div>
      )}

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
          <div className="note-card" style={{ borderColor: "#2a2a2a" }}>
            <div style={{ fontSize: 12, color: "#777", lineHeight: 1.8 }}>
              The only pair you should <span style={{ color: "#f4a261" }}>never</span> do back-to-back is <span style={{ color: "#f4a261" }}>Day 2 + Day 4</span>. Both are lower body, both are taxing on the posterior chain and nervous system. Everything else is manageable with proper sleep and nutrition.
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
              <div style={{ fontSize: 10, color: "#4a4a4a", lineHeight: 1.7 }}>— {s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
