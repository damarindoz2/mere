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

/** Imagen local servida desde `public/cosmos.png` (mismo origen, sin CORS). */
const IMG_SRC = '/cosmos.png'

const BASE_PETAL =
  'M 160,135 C 145,115 140,85 160,72 C 180,85 175,115 160,135 Z'

const CX = 160
const CY = 160

const petals = Array.from({ length: 8 }, (_, i) => ({
  path: BASE_PETAL,
  transform: `rotate(${i * 45} ${CX} ${CY})`,
}))

function CosmosCard() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [readPetals, setReadPetals] = useState<Set<number>>(() => new Set())

  const allRead = readPetals.size === 8

  function handlePetalClick(i: number) {
    setActiveIndex(i)
    setReadPetals((prev) => new Set([...prev, i]))
  }

  const onPetalKeyDown = (
    e: React.KeyboardEvent<SVGPathElement>,
    i: number,
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePetalClick(i)
    }
  }

  const onDotKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePetalClick(i)
    }
  }

  return (
    <div className="cosmos-card">
      <div className="cosmos-card__flower-zone">
        <img
          className="cosmos-card__photo"
          src={IMG_SRC}
          alt="Flor cosmos rosa"
          width={320}
          height={320}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
        <svg
          className="cosmos-card__overlay"
          viewBox="0 0 320 320"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          role="group"
          aria-label="Zona interactiva: ocho pétalos para descubrir mensajes"
        >
          {petals.map((petal, i) => (
            <path
              key={i}
              d={petal.path}
              transform={petal.transform}
              fill={
                activeIndex === i ? 'rgba(212,83,126,0.25)' : 'transparent'
              }
              stroke={
                readPetals.has(i) ? 'rgba(212,83,126,0.6)' : 'transparent'
              }
              strokeWidth={1.5}
              className="cosmos-card__petal-hit"
              role="button"
              tabIndex={0}
              aria-label={`Pétalo ${i + 1} de 8`}
              onClick={() => handlePetalClick(i)}
              onKeyDown={(e) => onPetalKeyDown(e, i)}
            />
          ))}
        </svg>
      </div>

      <div
        className={`message-panel${allRead ? ' message-panel--final-bg' : ''}`}
        aria-live="polite"
      >
        {activeIndex === null ? (
          allRead ? (
            <p className="message message--final">{MENSAJE_FINAL}</p>
          ) : (
            <p className="hint">Toca un pétalo para leer un mensaje</p>
          )
        ) : (
          <>
            <span className="counter">{activeIndex + 1} / 8</span>
            <p className="message" key={activeIndex}>
              {MENSAJES[activeIndex]}
            </p>
          </>
        )}
      </div>

      <div className="progress-row" role="group" aria-label="Progreso por pétalo">
        {Array.from({ length: 8 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`dot${readPetals.has(i) ? ' dot--filled' : ''}`}
            aria-label={`Abrir pétalo ${i + 1}`}
            aria-pressed={readPetals.has(i)}
            onClick={() => handlePetalClick(i)}
            onKeyDown={(e) => onDotKeyDown(e, i)}
          />
        ))}
      </div>
    </div>
  )
}

export default CosmosCard
