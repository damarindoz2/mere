import { useState } from 'react'
import './App.css'

function FlowerIcon() {
  return (
    <svg
      className="ornament"
      viewBox="0 0 64 64"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="petal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8a0ae" />
          <stop offset="100%" stopColor="#c45c6f" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="6" fill="#c9a227" opacity="0.85" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse
          key={deg}
          cx="32"
          cy="14"
          rx="9"
          ry="14"
          fill="url(#petal)"
          transform={`rotate(${deg} 32 32)`}
        />
      ))}
    </svg>
  )
}

function App() {
  const [open, setOpen] = useState(false)

  return (
    <main className="page">
      <div className="shell">
        <div className="card-wrap">
          <div className={`card${open ? ' open' : ''}`} aria-live="polite">
            <div className="face face--front">
              <FlowerIcon />
              <p className="subtitle">10 de mayo</p>
              <h1 className="title-script">Feliz día, mamá</h1>
              <p className="hint">Hay algo especial para ti…</p>
              <button
                type="button"
                className="open-btn"
                onClick={() => setOpen(true)}
              >
                Abrir tarjeta
              </button>
            </div>

            <div className="face face--back">
              <FlowerIcon />
              <p className="message">
                Gracias por cada abrazo, cada consejo y por el amor que nos
                das todos los días. Eres la mejor <strong>mamá del mundo</strong>
                .
              </p>
              <p className="message">
                Que este día esté lleno de risas, flores y todo lo bonito que
                mereces.
              </p>
              <p className="signature">Con todo mi cariño</p>
              <div className="close-row">
                <button
                  type="button"
                  className="close-btn"
                  onClick={() => setOpen(false)}
                >
                  Cerrar tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="footer-note">Tarjeta virtual · Día de las Madres</p>
    </main>
  )
}

export default App
