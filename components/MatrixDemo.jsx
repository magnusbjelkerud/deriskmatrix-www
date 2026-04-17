// ── SVG icons (white outline, 22×22 viewBox) ─────────────────────────────────

function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <circle cx="12" cy="12" r="5.5"/>
      <circle cx="12" cy="12" r="2"/>
      <line x1="12" y1="2.5" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="21.5"/>
      <line x1="2.5" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="21.5" y2="12"/>
    </svg>
  )
}

function IconHandshake() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 8.5L6 7l4 1.5h2l4-1.5 4 1.5v3.5l-4-1.5-2 2-2-2-2 2-2-2-4 1.5V8.5z"/>
      <path d="M10 8.5l2 2.5 2-2.5"/>
      <path d="M6 15.5l3-3 3 3 3-3 3 3"/>
    </svg>
  )
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="7" x2="12" y2="12"/>
      <line x1="12" y1="12" x2="15.5" y2="14.5"/>
    </svg>
  )
}

function IconRocket() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C12 2 16 6 16 11V16L12 19L8 16V11C8 6 12 2 12 2z"/>
      <circle cx="12" cy="10" r="2"/>
      <path d="M8 16L5 17L6 13"/>
      <path d="M16 16L19 17L18 13"/>
    </svg>
  )
}

function IconMedal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="14" r="6"/>
      <path d="M9 2l3 5 3-5"/>
      <path d="M9 2h6"/>
      <path d="M12 11v2l1.5 1"/>
    </svg>
  )
}

function IconThumbUp() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 22V11l5-9 1 1v6h5l1 2-1 9H7z"/>
      <line x1="7" y1="11" x2="4" y2="11"/>
      <rect x="4" y="11" width="3" height="11" rx="1"/>
    </svg>
  )
}

function IconAlarm() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="13" r="7.5"/>
      <line x1="12" y1="9" x2="12" y2="13"/>
      <line x1="12" y1="13" x2="15" y2="15"/>
      <path d="M4 6l3 3M20 6l-3 3"/>
      <path d="M9 3h6"/>
    </svg>
  )
}

function IconHand() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 7V16.5a2 2 0 004 0V12"/>
      <path d="M12 12V8a2 2 0 014 0v4"/>
      <path d="M16 12v-1a2 2 0 014 0V16a6 6 0 01-6 6H12a6 6 0 01-6-6V7"/>
      <path d="M8 5V4a2 2 0 00-4 0v1"/>
    </svg>
  )
}

// ── Cell data ─────────────────────────────────────────────────────────────────

const CELLS = [
  // row 0 — Beyond target
  { name: 'DEFENSIVE', action: 'RAISE',     color: '#1a4a7a', Icon: IconClock    },
  { name: 'POTENT',    action: 'EXPLORE',   color: '#0d7a6a', Icon: IconRocket   },
  // row 1 — On track
  { name: 'HARMONIOUS',action: 'ENSURE',    color: '#1a9e8a', Icon: IconMedal    },
  { name: 'OPTIMISTIC',action: 'PROVE',     color: '#2ab09a', Icon: IconThumbUp  },
  // row 2 — Below threshold
  { name: 'DIRE',      action: 'LOWER',     color: '#9b1a1a', Icon: IconAlarm    },
  { name: 'PESSIMISTIC',action:'INTERVENE', color: '#c94040', Icon: IconHand     },
]

// ── Arrow (→) drawn as SVG ────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" className="flex-shrink-0">
      <line x1="0" y1="5" x2="13" y2="5" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
      <polyline points="9,1 13,5 9,9" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

const CELL_H   = 96   // px — height of each cell
const CELL_GAP = 5    // px — gap between cells
const CIRCLE_D = 44   // px — diameter of indicator circles

export default function MatrixDemo() {
  // Y positions (from top of grid) where the value-line circles sit
  const targetY     = CELL_H + CELL_GAP / 2          // divider between row 0 and 1
  const thresholdY  = 2 * CELL_H + 1.5 * CELL_GAP    // divider between row 1 and 2
  const gridH       = 3 * CELL_H + 2 * CELL_GAP

  return (
    <div className="select-none w-full max-w-[480px] mx-auto">
      <div className="flex items-start gap-2">

        {/* ── Left indicators ───────────────────────────────────────── */}
        <div className="relative flex-shrink-0" style={{ width: 72, height: gridH }}>

          {/* Vertical connecting line */}
          <div
            className="absolute left-1/2 -translate-x-px bg-white/15"
            style={{ top: targetY, height: thresholdY - targetY, width: 1 }}
          />

          {/* Target Value indicator */}
          <div
            className="absolute flex items-center gap-1.5"
            style={{ top: targetY - CIRCLE_D / 2, left: 0, right: 0 }}
          >
            <div className="flex flex-col items-end flex-1 pr-1">
              <span className="text-[9px] font-bold text-white/35 uppercase tracking-wider leading-tight text-right">
                Target<br/>Value
              </span>
            </div>
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: CIRCLE_D, height: CIRCLE_D,
                background: 'rgba(15,23,42,0.9)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 0 12px rgba(26,158,138,0.2)',
              }}
            >
              <IconTarget />
            </div>
          </div>

          {/* Threshold Value indicator */}
          <div
            className="absolute flex items-center gap-1.5"
            style={{ top: thresholdY - CIRCLE_D / 2, left: 0, right: 0 }}
          >
            <div className="flex flex-col items-end flex-1 pr-1">
              <span className="text-[9px] font-bold text-white/35 uppercase tracking-wider leading-tight text-right">
                Threshold<br/>Value
              </span>
            </div>
            <div
              className="flex-shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: CIRCLE_D, height: CIRCLE_D,
                background: 'rgba(15,23,42,0.9)',
                border: '1.5px solid rgba(255,255,255,0.18)',
                boxShadow: '0 0 12px rgba(200,80,80,0.2)',
              }}
            >
              <IconHandshake />
            </div>
          </div>
        </div>

        {/* ── Arrow connectors ──────────────────────────────────────── */}
        <div className="relative flex-shrink-0" style={{ height: gridH }}>
          <div className="absolute" style={{ top: targetY - 5 }}>
            <Arrow />
          </div>
          <div className="absolute" style={{ top: thresholdY - 5 }}>
            <Arrow />
          </div>
        </div>

        {/* ── Matrix grid ───────────────────────────────────────────── */}
        <div className="flex-1">
          <div
            className="grid grid-cols-2"
            style={{ gap: CELL_GAP }}
          >
            {CELLS.map((cell) => (
              <div
                key={cell.name}
                className="flex flex-col items-center justify-between rounded-xl px-2 py-3"
                style={{
                  height: CELL_H,
                  background: cell.color,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px rgba(0,0,0,0.3)`,
                }}
              >
                <span className="text-[11px] font-black text-white tracking-widest text-center leading-none">
                  {cell.name}
                </span>
                <cell.Icon />
                <span
                  className="text-[9px] font-bold tracking-widest text-center"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  {cell.action}
                </span>
              </div>
            ))}
          </div>

          {/* Column headers */}
          <div className="grid grid-cols-2 mt-3" style={{ gap: CELL_GAP }}>
            {['Strong Evidence', 'Weak Evidence'].map(label => (
              <div key={label} className="text-center">
                <span className="text-[10px] font-bold text-white/35 uppercase tracking-widest">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
