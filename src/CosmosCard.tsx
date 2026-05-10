import { useState } from 'react'
import './CosmosCard.css'

const MENSAJES = [
  'Gracias por estar siempre, en los días buenos y en los difíciles.',
  'Tu abrazo es el lugar más seguro que conozco.',
  'Me enseñaste que el amor no se dice, se demuestra — y tú lo demuestras cada día.',
  'Eres la razón por la que creo en la bondad de las personas.',
  'Cada logro mío lleva tu nombre, aunque no aparezca en ningún lado.',
  'Nadie ríe como tú. Ese sonido es mi canción favorita.',
  'Contigo aprendí que el hogar no es un lugar, es una persona.',
  'Te quiero más de lo que cualquier pétalo puede decir.',
]

const MENSAJE_FINAL = 'Feliz Día de las Madres. Gracias por existir.'

/** Pétalo apuntando hacia arriba; base en el borde del disco (cx=150, cy=170, r=28). */
const PETAL_D =
  'M 150,142 C 126,116 118,82 147,95 Q 150,87 153,95 C 182,82 174,116 150,142 Z'

const CX = 150
const CY = 170

function CosmosCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [readPetals, setReadPetals] = useState<Set<number>>(() => new Set())
  const allRead = readPetals.size === 8

  const handlePetal = (index: number) => {
    setActiveIndex(index)
    setReadPetals((prev) => new Set(prev).add(index))
  }

  const onPetalKeyDown = (
    e: React.KeyboardEvent<SVGGElement>,
    index: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePetal(index)
    }
  }

  const dotAngles = [0, 45, 90, 135, 180, 225, 270, 315].map((d) => {
    const r = 14
    const rad = ((d - 90) * Math.PI) / 180
    return { cx: CX + r * Math.cos(rad), cy: CY + r * Math.sin(rad) }
  })

  const readDotPosition = (index: number) => {
    const rad = ((-90 + index * 45) * Math.PI) / 180
    const rr = 26.2
    return { cx: CX + rr * Math.cos(rad), cy: CY + rr * Math.sin(rad) }
  }

  return (
    <div className="cosmos-card">
      <svg
        className="cosmos-card__svg"
        viewBox="0 0 300 420"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Flor cosmos interactiva. Toca un pétalo para leer un mensaje."
      >
        <path
          className="cosmos-stem"
          d="M 150 198 L 150 380"
          aria-hidden
        />
        <path
          className="cosmos-leaf"
          d="M 150 268 Q 88 248 72 298 Q 118 278 148 272 Z"
          aria-hidden
        />
        <path
          className="cosmos-leaf"
          d="M 150 288 Q 212 268 228 318 Q 182 298 152 292 Z"
          aria-hidden
        />

        {Array.from({ length: 8 }, (_, i) => (
          <g key={i} transform={`rotate(${i * 45} ${CX} ${CY})`}>
            <g
              role="button"
              tabIndex={0}
              aria-label={`Pétalo ${i + 1} de 8`}
              onClick={() => handlePetal(i)}
              onKeyDown={(e) => onPetalKeyDown(e, i)}
            >
              <path
                className="petal-hit"
                d={PETAL_D}
                transform={`translate(${CX} ${CY}) scale(1.32) translate(${-CX} ${-CY})`}
              />
              <g
                className={`petal-group${readPetals.has(i) ? ' petal-group--read' : ''}${activeIndex === i ? ' petal-group--active' : ''}`}
                transform={
                  activeIndex === i
                    ? 'translate(150 142) scale(1.06) translate(-150 -142)'
                    : undefined
                }
              >
                <path className="petal-visible" d={PETAL_D} />
              </g>
            </g>
          </g>
        ))}

        <g className={allRead ? 'cosmos-center cosmos-center--pulse' : 'cosmos-center'}>
          <circle className="cosmos-center-disk" cx={CX} cy={CY} r="28" />
          {dotAngles.map((p, i) => (
            <circle
              key={i}
              className="cosmos-center-dot"
              cx={p.cx}
              cy={p.cy}
              r="2.8"
              aria-hidden
            />
          ))}
          <path
            className="cosmos-heart"
            d="M150,176 C148,174 142,169 142,163 C142,158 145,155 150,158 C155,155 158,158 158,163 C158,169 152,174 150,176 Z"
            aria-hidden
          />
        </g>

        {Array.from(readPetals).map((i) => {
          const p = readDotPosition(i)
          return (
            <circle
              key={`read-${i}`}
              className="petal-read-dot"
              cx={p.cx}
              cy={p.cy}
              r="2.6"
              aria-hidden
            />
          )
        })}
      </svg>

      <div className="message-panel" aria-live="polite">
        <div className="message-panel__inner">
          {allRead ? (
            <p
              className={`final-banner${allRead ? ' final-banner--visible' : ''}`}
            >
              {MENSAJE_FINAL}
            </p>
          ) : null}

          {activeIndex !== null ? (
            <>
              <span className="petal-counter">
                {activeIndex + 1} / 8
              </span>
              <p className="message-text message-text--visible">
                {MENSAJES[activeIndex]}
              </p>
            </>
          ) : !allRead ? (
            <p className="hint-text">Toca un pétalo…</p>
          ) : (
            <p className="hint-text">
              Toca un pétalo para volver a leer un mensaje.
            </p>
          )}
        </div>

        <div className="progress-dots" aria-hidden>
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className={`progress-dot${readPetals.has(i) ? ' progress-dot--filled' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CosmosCard
