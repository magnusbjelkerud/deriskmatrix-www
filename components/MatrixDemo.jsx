// ─── White line icons ─────────────────────────────────────────────────────────

const S = { fill: 'none', stroke: 'rgba(255,255,255,0.85)', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

function IcoTarget() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="12" r="9.5"/>
      <circle cx="12" cy="12" r="5.5"/>
      <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.85)" stroke="none"/>
      <line x1="12" y1="2" x2="12" y2="5.5"/>
      <line x1="12" y1="18.5" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5.5" y2="12"/>
      <line x1="18.5" y1="12" x2="22" y2="12"/>
    </svg>
  )
}

function IcoHandshake() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...S}>
      <path d="M3 9l3-2 3.5 1.5H14l3.5-1.5 3 2v4l-3-1.5-2.5 2.5-2.5-2-2.5 2-2.5-2.5L3 13V9z"/>
      <path d="M9.5 8.5l2.5 3 2.5-3"/>
    </svg>
  )
}

function IcoClock() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="12" r="9"/>
      <path d="M12 7v5l3 2"/>
      <path d="M6.5 4.5l1.5 1.5M17.5 4.5l-1.5 1.5"/>
    </svg>
  )
}

function IcoRocket() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <path d="M12 3s4 3 4 8v5l-4 3-4-3v-5c0-5 4-8 4-8z"/>
      <circle cx="12" cy="10" r="2"/>
      <path d="M8 16l-2.5 1.5 1-3.5"/>
      <path d="M16 16l2.5 1.5-1-3.5"/>
    </svg>
  )
}

function IcoMedal() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="14.5" r="5.5"/>
      <path d="M8.5 3h7l-1.5 5.5h-4L8.5 3z"/>
      <path d="M10 8.5l-1.5 5M14 8.5l1.5 5"/>
      <path d="M10.5 13l1.5 2.5 1.5-2.5"/>
    </svg>
  )
}

function IcoThumbUp() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <path d="M7 22V12l4-8.5 1 .5v6.5h5.5l.5 1.5-1 9H7z"/>
      <line x1="7" y1="12" x2="4.5" y2="12"/>
      <rect x="3" y="12" width="4" height="10" rx="1"/>
    </svg>
  )
}

function IcoAlarm() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <circle cx="12" cy="13" r="7.5"/>
      <path d="M12 9.5V13l2.5 1.5"/>
      <path d="M4.5 6.5l2 2M19.5 6.5l-2 2"/>
      <path d="M9.5 3.5h5"/>
    </svg>
  )
}

function IcoHand() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" {...S}>
      <path d="M8 13V7.5a1.5 1.5 0 013 0V12"/>
      <path d="M11 12V6.5a1.5 1.5 0 013 0V12"/>
      <path d="M14 12V8.5a1.5 1.5 0 013 0V13"/>
      <path d="M17 13v-1a1.5 1.5 0 013 0v3a7 7 0 01-7 7H11a7 7 0 01-7-7v-3"/>
      <path d="M4 12V7.5a1.5 1.5 0 013 0V13"/>
    </svg>
  )
}

// ─── Cell data ────────────────────────────────────────────────────────────────

const CELLS = [
  { name: 'DEFENSIVE',   action: 'RAISE',     bg: '#1a3f7a', Icon: IcoClock   },
  { name: 'POTENT',      action: 'EXPLORE',   bg: '#0d6e8a', Icon: IcoRocket  },
  { name: 'HARMONIOUS',  action: 'ENSURE',    bg: '#0d8a7a', Icon: IcoMedal   },
  { name: 'OPTIMISTIC',  action: 'PROVE',     bg: '#1a9e8a', Icon: IcoThumbUp },
  { name: 'DIRE',        action: 'LOWER',     bg: '#8a1a1a', Icon: IcoAlarm   },
  { name: 'PESSIMISTIC', action: 'INTERVENE', bg: '#b83232', Icon: IcoHand    },
]

// ─── Layout constants ─────────────────────────────────────────────────────────

const CELL_H   = 118   // px
const CELL_GAP = 6     // px
const CIRCLE   = 50    // px diameter
const LEFT_W   = 80    // px for label+circle area
const ARROW_W  = 22    // px

// Y position of dividers (from top of grid)
const TARGET_Y    = CELL_H + CELL_GAP / 2
const THRESHOLD_Y = 2 * CELL_H + 1.5 * CELL_GAP
const GRID_H      = 3 * CELL_H + 2 * CELL_GAP

// ─── Main component ───────────────────────────────────────────────────────────

export default function MatrixDemo() {
  return (
    <div className="select-none" style={{ maxWidth: 520 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 0 }}>

        {/* ── Left: value indicators ──────────────────────────────── */}
        <div style={{ position: 'relative', width: LEFT_W, height: GRID_H, flexShrink: 0 }}>

          {/* Vertical connecting line between the two circles */}
          <div style={{
            position: 'absolute',
            left: LEFT_W - CIRCLE / 2 - 1,
            top: TARGET_Y,
            width: 1,
            height: THRESHOLD_Y - TARGET_Y,
            background: 'rgba(255,255,255,0.15)',
          }}/>

          {/* Target Value indicator */}
          <div style={{
            position: 'absolute',
            top: TARGET_Y - CIRCLE / 2,
            left: 0, right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>
                Target<br/>Value
              </div>
            </div>
            <div style={{
              width: CIRCLE, height: CIRCLE, borderRadius: '50%',
              background: 'rgba(10,20,40,0.9)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(26,158,138,0.25)',
              flexShrink: 0,
            }}>
              <IcoTarget />
            </div>
          </div>

          {/* Threshold Value indicator */}
          <div style={{
            position: 'absolute',
            top: THRESHOLD_Y - CIRCLE / 2,
            left: 0, right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <div style={{ flex: 1, textAlign: 'right' }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: 1.3 }}>
                Threshold<br/>Value
              </div>
            </div>
            <div style={{
              width: CIRCLE, height: CIRCLE, borderRadius: '50%',
              background: 'rgba(10,20,40,0.9)',
              border: '1.5px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(180,60,60,0.25)',
              flexShrink: 0,
            }}>
              <IcoHandshake />
            </div>
          </div>
        </div>

        {/* ── Arrows ──────────────────────────────────────────────── */}
        <div style={{ position: 'relative', width: ARROW_W, height: GRID_H, flexShrink: 0 }}>
          {[TARGET_Y, THRESHOLD_Y].map((y, i) => (
            <svg key={i} width={ARROW_W} height={14} style={{ position: 'absolute', top: y - 7, left: 0 }}
              viewBox={`0 0 ${ARROW_W} 14`} fill="none">
              <line x1="1" y1="7" x2={ARROW_W - 5} y2="7" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5"/>
              <polyline points={`${ARROW_W - 9},3 ${ARROW_W - 4},7 ${ARROW_W - 9},11`}
                stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ))}
        </div>

        {/* ── Grid ────────────────────────────────────────────────── */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: CELL_GAP }}>
            {CELLS.map(cell => (
              <div key={cell.name} style={{
                height: CELL_H,
                background: cell.bg,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 8px 10px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.35)',
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 900, color: 'rgba(255,255,255,0.92)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  {cell.name}
                </span>
                <cell.Icon />
                <span style={{
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                }}>
                  {cell.action}
                </span>
              </div>
            ))}
          </div>

          {/* Column headers */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: CELL_GAP, marginTop: 10,
          }}>
            {['Strong Evidence', 'Weak Evidence'].map(label => (
              <div key={label} style={{ textAlign: 'center' }}>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>
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
