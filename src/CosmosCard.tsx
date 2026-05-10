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

/** Y en viewBox donde los tallos “plantan” en el suelo (borde superior del montículo). */
const STEM_GROUND_Y = 568

/** Pétalo tipo gota / cosmos, apuntando arriba; base en borde del centro. */
const PETAL_MAIN =
  'M 150,148 C 129,115 126,72 150,54 C 174,72 171,115 150,148 Z'
const PETAL_STRIPE =
  'M 150,148 C 148,118 147,82 150,56 C 153,82 152,118 150,148 Z'

const POLLEN_DOTS = [0, 1, 2, 3, 4].map((i) => {
  const rad = ((-90 + i * 72) * Math.PI) / 180
  return {
    cx: 150 + 10.5 * Math.cos(rad),
    cy: 150 + 10.5 * Math.sin(rad),
  }
})

/** Tallo decorativo termina en y=268 local; centro flor en 150,150 → pie del tallo = y + 118*s. */
function stemAnchorY(s: number): number {
  return STEM_GROUND_Y - 118 * s
}

function petalFill(i: number, active: number | null, read: Set<number>): string {
  if (i === active) return C.petalActive
  if (read.has(i)) return C.petalRead
  return C.petal
}

function StaticCosmos({
  x,
  y,
  s,
  bloomBase = 0,
}: {
  x: number
  y: number
  s: number
  bloomBase?: number
}) {
  const b = bloomBase
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) translate(-150 -150)`}>
      <line
        className="garden__stem-draw"
        x1="150"
        y1="176"
        x2="150"
        y2="268"
        stroke={C.stem}
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={100}
        strokeDashoffset={100}
        style={{ animationDelay: `${b}s` }}
      />
      <path
        className="garden__leaf-pop"
        d="M150,248 C136,238 118,240 115,252 C124,260 142,258 150,248Z"
        fill={C.leaf}
        style={{ animationDelay: `${b + 0.18}s` }}
      />
      <path
        className="garden__leaf-pop"
        d="M150,222 C164,212 182,214 185,226 C176,234 158,232 150,222Z"
        fill={C.leaf}
        style={{ animationDelay: `${b + 0.26}s` }}
      />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45} 150 150)`}>
          <g
            className="garden__petal-bloom"
            style={{ animationDelay: `${b + 0.32 + i * 0.055}s` }}
          >
            <path d={PETAL_MAIN} fill={C.petal} />
            <path d={PETAL_STRIPE} fill={C.stripe} />
          </g>
        </g>
      ))}
      <g
        className="garden__center-pop"
        style={{ animationDelay: `${b + 0.78}s` }}
      >
        <circle cx="150" cy="150" r="26" fill={C.center} />
        {POLLEN_DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r="2.2" fill={C.nucleus} />
        ))}
        <circle cx="150" cy="150" r="6" fill={C.nucleus} />
      </g>
    </g>
  )
}

/** Flor central: mismo sistema local 300×380; pie del tallo en y=340. */
const HERO_GROUP_TX = 20
const HERO_GROUP_TY = STEM_GROUND_Y - 340

const BF_WING_U = '#cc6633'
const BF_WING_L = '#e07848'

function Butterfly({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-22 -16 44 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g className="garden__bf-side garden__bf-side--left">
        <ellipse
          cx="-10"
          cy="-5"
          rx="11"
          ry="8.5"
          fill={BF_WING_U}
          transform="rotate(-22 -10 -5)"
        />
        <ellipse
          cx="-8"
          cy="7"
          rx="7.5"
          ry="6"
          fill={BF_WING_L}
          transform="rotate(-12 -8 7)"
        />
      </g>
      <g className="garden__bf-side garden__bf-side--right">
        <ellipse
          cx="10"
          cy="-5"
          rx="11"
          ry="8.5"
          fill={BF_WING_U}
          transform="rotate(22 10 -5)"
        />
        <ellipse
          cx="8"
          cy="7"
          rx="7.5"
          ry="6"
          fill={BF_WING_L}
          transform="rotate(12 8 7)"
        />
      </g>
      <ellipse cx="0" cy="0" rx="2" ry="9" fill={C.butterflyBody} />
      <circle cx="0" cy="-7" r="1.4" fill="#5a4030" />
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
      <div className="garden__canvas">
        <svg
          className="garden__backdrop"
          viewBox="0 0 340 640"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
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
            d="M0,575 Q55,548 115,560 Q170,568 225,556 Q295,542 340,570 L340,640 L0,640 Z"
            fill={C.hill}
          />

          {/* Laterales más separadas (X/Y) y algo más pequeñas para que no se tapen */}
          <StaticCosmos
            x={34}
            y={stemAnchorY(0.27) + 4}
            s={0.27}
            bloomBase={0}
          />
          <StaticCosmos
            x={100}
            y={stemAnchorY(0.33) - 5}
            s={0.33}
            bloomBase={0.12}
          />
          <StaticCosmos
            x={312}
            y={stemAnchorY(0.26) + 3}
            s={0.26}
            bloomBase={0.06}
          />
          <StaticCosmos
            x={258}
            y={stemAnchorY(0.32) - 6}
            s={0.32}
            bloomBase={0.18}
          />

          <g
            transform={`translate(${HERO_GROUP_TX} ${HERO_GROUP_TY})`}
            role="group"
            aria-label="Flor cosmos: toca un pétalo para leer un mensaje"
          >
            <line
              className="garden__stem-draw"
              x1="150"
              y1="176"
              x2="150"
              y2="340"
              stroke={C.stem}
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={100}
              strokeDashoffset={100}
              style={{ animationDelay: '0.28s' }}
            />
            <path
              className="garden__leaf-pop"
              d="M150,288 C132,272 108,276 104,290 C114,300 138,296 150,288Z"
              fill={C.leaf}
              style={{ animationDelay: '0.52s' }}
            />
            <path
              className="garden__leaf-pop"
              d="M150,252 C168,236 192,240 196,254 C186,264 162,260 150,252Z"
              fill={C.leaf}
              style={{ animationDelay: '0.6s' }}
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
                <g
                  className="garden__petal-bloom"
                  style={{ animationDelay: `${0.68 + i * 0.06}s` }}
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
              </g>
            ))}
            <g
              className="garden__center-pop"
              style={{ animationDelay: '1.18s' }}
            >
              <circle cx="150" cy="150" r="26" fill={C.center} />
              {POLLEN_DOTS.map((d, i) => (
                <circle key={i} cx={d.cx} cy={d.cy} r="2.2" fill={C.nucleus} />
              ))}
              <circle cx="150" cy="150" r="6" fill={C.nucleus} />
            </g>
          </g>
        </svg>

        <Butterfly className="garden__butterfly garden__butterfly--1" />
        <Butterfly className="garden__butterfly garden__butterfly--2" />
        <Butterfly className="garden__butterfly garden__butterfly--3" />
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
