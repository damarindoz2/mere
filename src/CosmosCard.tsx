import { useState } from 'react'
import './CosmosCard.css'

const MENSAJES = [
  'Gracias por hacerme la persona que soy hoy.',
  'Gracias por siempre preocuparte por todo, por darme lo mejor',
  'Gracias por haberme (y seguirlo haciendo) dedicado tu vida, tu tiempo y tus energías. Sé que no fui facil, pero hiciste un increible trabajo.',
  'Eres la razón por la que creo en la bondad de las personas.',
  'Cada logro mío lleva tu nombre, aunque no aparezca en ningún lado.',
  'Nadie ríe como tú. Ese sonido es mi canción favorita.',
  'Contigo aprendí que el hogar no es un lugar, es una persona.',
  'Te quiero más de lo que cualquier pétalo puede decir.',
]

const MENSAJE_FINAL = 'Feliz Día de las Madres. Gracias por existir.'

/** Paleta estilo ilustración plana (referencia). */
const C = {
  petal: '#c46ba1',
  petalRead: '#b56598',
  petalActive: '#923a6a',
  stripe: '#a14d7d',
  center: '#d9b64d',
  nucleus: '#7a4a28',
  stem: '#3a5a2a',
  leaf: '#3a5a2a',
  skyTop: '#3b2b4d',
  skyBottom: '#c14a27',
  cloud: '#2d2238',
  hill: '#3a5a2a',
  butterfly: '#cc6633',
  butterflyBody: '#4a3020',
} as const

/** Pétalo tipo gota / cosmos, apuntando arriba; base en borde del centro. */
const PETAL_MAIN =
  'M 150,148 C 129,115 126,72 150,54 C 174,72 171,115 150,148 Z'
/** Franja vertical más oscura al centro del pétalo. */
const PETAL_STRIPE =
  'M 150,148 C 148,118 147,82 150,56 C 153,82 152,118 150,148 Z'

const POLLEN_DOTS = [0, 1, 2, 3, 4].map((i) => {
  const rad = ((-90 + i * 72) * Math.PI) / 180
  return {
    cx: 150 + 10.5 * Math.cos(rad),
    cy: 150 + 10.5 * Math.sin(rad),
  }
})

function petalFill(i: number, active: number | null, read: Set<number>): string {
  if (i === active) return C.petalActive
  if (read.has(i)) return C.petalRead
  return C.petal
}

function StaticCosmos({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-150 -150)`}>
      <line
        x1="150"
        y1="176"
        x2="150"
        y2="268"
        stroke={C.stem}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M150,248 C136,238 118,240 115,252 C124,260 142,258 150,248Z"
        fill={C.leaf}
      />
      <path
        d="M150,222 C164,212 182,214 185,226 C176,234 158,232 150,222Z"
        fill={C.leaf}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45} 150 150)`}>
          <path d={PETAL_MAIN} fill={C.petal} />
          <path d={PETAL_STRIPE} fill={C.stripe} />
        </g>
      ))}
      <circle cx="150" cy="150" r="26" fill={C.center} />
      {POLLEN_DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="2.2" fill={C.nucleus} />
      ))}
      <circle cx="150" cy="150" r="6" fill={C.nucleus} />
    </g>
  )
}

function Butterfly({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-18 -10 36 20"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <ellipse cx="-8" cy="0" rx="10" ry="7.5" fill={C.butterfly} />
      <ellipse cx="8" cy="0" rx="10" ry="7.5" fill={C.butterfly} />
      <circle cx="0" cy="0" r="2.2" fill={C.butterflyBody} />
    </svg>
  )
}

function CosmosCard() {
  const [active, setActive] = useState<number | null>(null)
  const [read, setRead] = useState<Set<number>>(() => new Set())
  const allRead = read.size === 8

  function handlePetal(i: number) {
    setActive(i)
    setRead((prev) => new Set([...prev, i]))
  }

  const onPetalKeyDown = (e: React.KeyboardEvent<SVGGElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePetal(i)
    }
  }

  const onDotKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePetal(i)
    }
  }

  return (
    <div className="garden">
      <svg
        className="garden__backdrop"
        viewBox="0 0 340 640"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="gardenSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.skyTop} />
            <stop offset="100%" stopColor={C.skyBottom} />
          </linearGradient>
        </defs>
        <rect width="340" height="640" fill="url(#gardenSky)" />
        <path
          d="M0,72 H340 V88 H280 L260,78 H200 L170,85 H120 L90,76 H40 L0,82 Z"
          fill={C.cloud}
          opacity={0.55}
        />
        <path
          d="M-10,108 H350 V122 H300 L280,112 H220 L190,118 H130 L100,110 H30 L-10,116 Z"
          fill={C.cloud}
          opacity={0.4}
        />
        <path
          d="M0,520 Q62,498 130,512 T260,505 Q300,498 340,518 V640 H0 Z"
          fill={C.hill}
        />
        <StaticCosmos x={72} y={228} s={0.34} />
        <StaticCosmos x={58} y={348} s={0.4} />
        <StaticCosmos x={268} y={238} s={0.36} />
        <StaticCosmos x={282} y={358} s={0.38} />
      </svg>

      <Butterfly className="garden__butterfly garden__butterfly--1" />
      <Butterfly className="garden__butterfly garden__butterfly--2" />
      <Butterfly className="garden__butterfly garden__butterfly--3" />

      <div className="garden__stage">
        <svg
          className="garden__flower-svg"
          viewBox="0 0 300 380"
          xmlns="http://www.w3.org/2000/svg"
          role="group"
          aria-label="Flor cosmos: toca un pétalo para leer un mensaje"
        >
          <line
            x1="150"
            y1="176"
            x2="150"
            y2="340"
            stroke={C.stem}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M150,288 C132,272 108,276 104,290 C114,300 138,296 150,288Z"
            fill={C.leaf}
          />
          <path
            d="M150,252 C168,236 192,240 196,254 C186,264 162,260 150,252Z"
            fill={C.leaf}
          />

          {Array.from({ length: 8 }, (_, i) => (
            <g
              key={i}
              role="button"
              tabIndex={0}
              transform={`rotate(${i * 45} 150 150)`}
              style={{ cursor: 'pointer' }}
              aria-label={`Pétalo ${i + 1} de 8`}
              onClick={() => handlePetal(i)}
              onKeyDown={(e) => onPetalKeyDown(e, i)}
            >
              <path
                d={PETAL_MAIN}
                fill={petalFill(i, active, read)}
                style={{ transition: 'fill 0.2s ease' }}
              />
              <path
                d={PETAL_STRIPE}
                fill={C.stripe}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          ))}

          <circle cx="150" cy="150" r="26" fill={C.center} />
          {POLLEN_DOTS.map((d, i) => (
            <circle key={i} cx={d.cx} cy={d.cy} r="2.2" fill={C.nucleus} />
          ))}
          <circle cx="150" cy="150" r="6" fill={C.nucleus} />
        </svg>
      </div>

      <div className="garden__ui">
        <div className="message-panel" aria-live="polite">
          {active === null ? (
            allRead ? (
              <p className="hint">
                Toca un pétalo para volver a leer un mensaje.
              </p>
            ) : (
              <p className="hint">Toca un pétalo para leer un mensaje</p>
            )
          ) : (
            <>
              <span className="counter">{active + 1} / 8</span>
              <p key={active} className="message">
                {MENSAJES[active]}
              </p>
            </>
          )}
        </div>

        {allRead ? <p className="final-message">{MENSAJE_FINAL}</p> : null}

        <div className="progress-row" role="group" aria-label="Progreso por pétalo">
          {Array.from({ length: 8 }, (_, i) => (
            <button
              key={i}
              type="button"
              className={`dot${read.has(i) ? ' dot--filled' : ''}`}
              aria-label={`Abrir pétalo ${i + 1}`}
              aria-pressed={read.has(i)}
              onClick={() => handlePetal(i)}
              onKeyDown={(e) => onDotKeyDown(e, i)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CosmosCard
