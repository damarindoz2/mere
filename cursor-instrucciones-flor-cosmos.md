# Instrucciones para Cursor — Tarjeta interactiva Día de las Madres

## Qué construir

Un componente React llamado `CosmosCard` (archivo `CosmosCard.jsx`) que funciona como tarjeta del Día de las Madres. El elemento central es una **flor cosmos** dibujada en SVG, con pétalos interactivos que al tocarse revelan un mensaje en la parte inferior.

---

## La flor cosmos — geometría y forma

La flor cosmos tiene una anatomía muy específica que hay que respetar:

- **8 pétalos** anchos, planos y levemente dentados/redondeados en la punta.
- Todos los pétalos **nacen del mismo disco central** y están completamente unidos a él — no flotan separados, como si fueran pétalos cortados.
- Cada pétalo es una forma `<path>` en SVG, construida con curvas de Bézier para que la silueta sea orgánica, no un simple óvalo.
- Los pétalos se distribuyen en 360° con rotaciones de 45° cada uno (`rotate(45 * i, cx, cy)`).
- El centro es un **círculo dorado-amarillo** con un patrón de pequeños círculos o puntos que simula el disco floral (pistilo). Encima va un corazón pequeño o la letra inicial de la mamá.
- Debajo de la flor hay un **tallo recto** con 2 hojas alargadas usando curvas `<path>`.

### Proporciones sugeridas (viewport 300×420 SVG):
- Centro de la flor: `cx=150, cy=170`
- Radio del disco central: `28px`
- Longitud de pétalo desde el borde del disco hasta la punta: `~72px`
- Ancho máximo del pétalo: `~48px` (en su punto medio)
- Tallo: desde `y=198` hasta `y=380`

### Path de pétalo de referencia (sin rotar, apunta hacia arriba):
```
M 150,142          ← base izquierda donde el pétalo toca el disco
C 128,120 122,90 150,98   ← lado izquierdo con curva
C 178,90 172,120 150,142  ← lado derecho con curva (simétrico)
Z
```
Ajusta los puntos de control para que la punta sea un poco más ancha y con una ligera hendidura central (el cosmos tiene pétalos con muesca en la punta).

---

## Interactividad

- Cada pétalo es clickeable/tappable.
- Al hacer tap, el pétalo seleccionado **se ilumina** (cambia de tono, se escala levemente con `transform: scale(1.06)`) y aparece su mensaje en el panel inferior.
- Los pétalos ya leídos muestran un estado visual diferente (más saturados, o con un pequeño punto en la base).
- El panel de mensaje aparece con una **transición suave** (fade + slide-up leve).
- Cuando todos los pétalos han sido abiertos, el centro de la flor cambia (brilla, pulsa, o muestra un corazón) y aparece un mensaje final especial.

---

## Panel de mensajes

Debajo de la flor hay un panel tipo tarjeta (`div` redondeado con borde suave) que muestra:
- Estado inicial: texto de invitación tipo *"Toca un pétalo…"* en color apagado.
- Al seleccionar un pétalo: el mensaje aparece centrado, con tipografía serif elegante, en texto oscuro.
- El número de pétalo actual (ej. `3 / 8`) en texto pequeño arriba del mensaje.
- Una fila de 8 puntos de progreso abajo del panel, que se llenan de color conforme se van abriendo pétalos.

---

## Mensajes (editables al inicio del archivo)

Coloca este arreglo en la parte de arriba del componente para que sea fácil de personalizar:

```js
const MENSAJES = [
  "Gracias por estar siempre, en los días buenos y en los difíciles.",
  "Tu abrazo es el lugar más seguro que conozco.",
  "Me enseñaste que el amor no se dice, se demuestra — y tú lo demuestras cada día.",
  "Eres la razón por la que creo en la bondad de las personas.",
  "Cada logro mío lleva tu nombre, aunque no aparezca en ningún lado.",
  "Nadie ríe como tú. Ese sonido es mi canción favorita.",
  "Contigo aprendí que el hogar no es un lugar, es una persona.",
  "Te quiero más de lo que cualquier pétalo puede decir.",
];

const MENSAJE_FINAL = "Feliz Día de las Madres. Gracias por existir.";
```

---

## Paleta de colores

```css
--petal-base:    #F2A7C3   /* rosa cosmos base */
--petal-hover:   #E8739F   /* rosa más intenso al hover */
--petal-read:    #D4537E   /* pétalos ya leídos */
--petal-stroke:  #C45C89   /* borde del pétalo */
--center-fill:   #FAEEDA   /* disco central, amarillo cálido */
--center-dot:    #F0C060   /* puntitos del pistilo */
--stem:          #5A7A2E   /* tallo */
--leaf:          #7AAF3A   /* hojas */
--bg:            #FDF6F0   /* fondo general, crema muy claro */
--text-main:     #3D1A2B   /* texto oscuro sobre fondo claro */
--text-muted:    #B08090   /* texto de pista / apagado */
--dot-empty:     #F0D0DC   /* puntos de progreso vacíos */
--dot-filled:    #D4537E   /* puntos de progreso llenos */
```

---

## Tipografía

- Importar desde Google Fonts: `'Playfair Display'` para el texto del mensaje (serif elegante).
- UI pequeña (número de pétalo, puntos, hint): cualquier sans-serif del sistema o `'DM Sans'`.

---

## Estructura de componentes

```
CosmosCard
├── CosmosFlower (SVG)
│   ├── Petal × 8  (paths con onClick, estado abierto/cerrado)
│   ├── FlowerCenter (círculo + puntitos + corazón/letra)
│   └── Stem + Leaves
└── MessagePanel
    ├── HintText (cuando ningún pétalo está seleccionado)
    ├── MessageText (fade-in al seleccionar)
    ├── PetalCounter ("3 / 8")
    └── ProgressDots × 8
```

---

## Estado (useState)

```js
const [activeIndex, setActiveIndex] = useState(null);   // pétalo seleccionado
const [readPetals, setReadPetals] = useState(new Set()); // pétalos ya leídos
const allRead = readPetals.size === 8;
```

---

## Animaciones (CSS transitions, sin librerías extra)

- **Pétalo activo**: `transform: scale(1.06); transition: transform 0.2s ease, fill 0.2s ease;`
- **Mensaje**: `opacity 0.35s ease, transform 0.35s ease` (entra desde abajo 8px).
- **Mensaje final**: el centro del SVG pulsa con `@keyframes pulse { 0%,100% { r: 28 } 50% { r: 31 } }` aplicado al círculo central cuando `allRead === true`.
- **Pétalos leídos**: transición de color a `--petal-read` cuando entran a `readPetals`.

---

## Mobile first

- El componente tiene un ancho máximo de `360px` y se centra con `margin: 0 auto`.
- El SVG usa `width="100%" viewBox="0 0 300 420"` para que escale bien.
- El tap target de cada pétalo debe tener al menos 44px de área efectiva — si el path es muy delgado, agregar un `<path>` invisible con más área encima del visible solo para capturar el click.
- No usar `hover` como única interacción — funcionar bien con touch.

---

## Lo que NO hacer

- No usar pétalos como elementos separados que flotan sin conectarse al disco central.
- No usar `<ellipse>` para los pétalos — usar `<path>` con curvas para que la forma sea orgánica.
- No poner texto dentro de los pétalos — solo en el panel inferior.
- No depender de librerías de animación externas (Framer Motion, GSAP) — CSS transitions son suficientes.
- No hardcodear los mensajes dentro del JSX — siempre del arreglo `MENSAJES`.

