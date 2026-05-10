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

const PETAL_OUTER =
  'M 150,148 C 133,125 128,93 150,68 C 172,93 167,125 150,148 Z'
const PETAL_VEIN =
  'M 150,148 C 145,128 143,100 150,78 C 157,100 155,128 150,148 Z'

const PISTIL_DOTS: { cx: number; cy: number; r: number }[] = [
  { cx: 142, cy: 143, r: 3 },
  { cx: 152, cy: 140, r: 2.8 },
  { cx: 160, cy: 146, r: 3.1 },
  { cx: 158, cy: 156, r: 2.9 },
  { cx: 149, cy: 159, r: 3.2 },
  { cx: 141, cy: 154, r: 2.8 },
]

const DECOR_PETAL =
  'M 0,6 C -3.2,1.5 -3.8,-5 0,-12.5 C 3.8,-5 3.2,1.5 0,6 Z'

function petalFill(i: number, active: number | null, read: Set<number>): string {
  if (i === active) return '#B8336A'
  if (read.has(i)) return '#D4699F'
  return '#E87DB5'
}

function DecorBloom({
  x,
  y,
  s,
  rot = 0,
  petalFill: pf = '#e598c4',
  centerFill = '#f2c14e',
}: {
  x: number
  y: number
  s: number
  rot?: number
  petalFill?: string
  centerFill?: string
}) {
  const angles = [0, 72, 144, 216, 288]
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {angles.map((a, i) => (
        <path
          key={i}
          d={DECOR_PETAL}
          fill={pf}
          opacity={0.88}
          transform={`rotate(${a})`}
        />
      ))}
      <circle r={3.4} fill={centerFill} opacity={0.95} />
    </g>
  )
}

function Butterfly({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="-22 -14 44 28"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M0,1.5 C-10,-10 -20,-4 -18,6 C-14,12 -4,10 0,4 Z"
        fill="#3d2a55"
        opacity={0.92}
      />
      <path
        d="M0,1.5 C10,-10 20,-4 18,6 C14,12 4,10 0,4 Z"
        fill="#3d2a55"
        opacity={0.92}
      />
      <path
        d="M0,1.5 C-7,-6 -14,-2 -12,5 C-8,8 -2,6 0,3 Z"
        fill="#7b5ea7"
        opacity={0.85}
      />
      <path
        d="M0,1.5 C7,-6 14,-2 12,5 C8,8 2,6 0,3 Z"
        fill="#7b5ea7"
        opacity={0.85}
      />
      <circle cx="-5" cy="-2" r="1.6" fill="#f8e8ff" opacity={0.7} />
      <circle cx="5" cy="-2" r="1.6" fill="#f8e8ff" opacity={0.7} />
      <ellipse cx="0" cy="5" rx="1.2" ry="5" fill="#2a1f38" opacity={0.85} />
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
      <div className="garden__sun" aria-hidden />
      <div className="garden__horizon" aria-hidden />

      <svg
        className="garden__backdrop"
        viewBox="0 0 340 640"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="gardenGrass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d5c2e" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1e2d18" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <path
          d="M0,520 Q85,500 170,515 T340,520 L340,640 L0,640 Z"
          fill="url(#gardenGrass)"
        />
        <DecorBloom x={48} y={118} s={1.15} rot={-8} petalFill="#d88fb8" />
        <DecorBloom x={288} y={132} s={0.95} rot={12} petalFill="#e8a0c8" />
        <DecorBloom x={72} y={210} s={0.72} rot={22} petalFill="#c97bab" />
        <DecorBloom x={278} y={228} s={0.68} rot={-18} petalFill="#dea0c4" />
        <DecorBloom x={38} y={300} s={0.55} rot={6} petalFill="#b87aa0" />
        <DecorBloom x={302} y={318} s={0.52} rot={-14} petalFill="#c889b0" />
        <DecorBloom x={118} y={92} s={0.42} rot={35} petalFill="#e7b8d4" />
        <DecorBloom x={232} y={88} s={0.4} rot={-25} petalFill="#dcb0cf" />
        <DecorBloom x={165} y={72} s={0.38} rot={8} petalFill="#f0c4df" />
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
            stroke="#5A7A2E"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M150,270 C130,255 108,258 105,270 C115,278 138,278 150,270Z"
            fill="#7AAF3A"
          />
          <path
            d="M150,240 C170,225 192,228 195,240 C185,248 162,248 150,240Z"
            fill="#7AAF3A"
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
                d={PETAL_OUTER}
                fill={petalFill(i, active, read)}
                stroke="#C45C89"
                strokeWidth={0.8}
                style={{ transition: 'fill 0.2s ease' }}
              />
              <path
                d={PETAL_VEIN}
                fill="#F4BCE1"
                opacity={0.45}
                style={{ pointerEvents: 'none' }}
              />
            </g>
          ))}

          <circle
            cx="150"
            cy="150"
            r="26"
            fill="#F7C84A"
            stroke="#E8A820"
            strokeWidth={1}
          />
          {PISTIL_DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.cx}
              cy={d.cy}
              r={d.r}
              fill="#E8A820"
            />
          ))}
          <circle cx="150" cy="150" r="6" fill="#C47010" />
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
