**CORE_RISKS**
- Scope ambiguity: “Flappy Bird-style” is clear at a concept level, but gameplay feel depends heavily on constants like gravity, jump force, pipe spacing, and speed; without target tuning, the demo may feel unpolished even if technically correct.
- Canvas vs DOM uncertainty: the draft mentions a “game canvas” but also emphasizes polished UI; if not explicitly choosing `canvas` rendering, implementation may drift into mixed DOM/canvas patterns that are harder to keep clean.
- Input handling gaps: “jump” is underspecified across mouse, touch, keyboard, and restart interactions; demos often fail on mobile if tap and keyboard behavior are not explicitly defined.
- Collision reliability: simplistic bounding-box collision can feel unfair, while more precise collision adds complexity; for a demo, poor collision feel is one of the fastest ways to make the game seem broken.
- Game-state bugs: start, running, game over, and restart transitions are easy to implement inconsistently, causing duplicate loops, stale timers, or score/pipes not resetting correctly.
- Performance assumptions: plain JS is feasible, but if the draft expects responsive layout plus vector polish plus overlays, low-end device/browser behavior can degrade unless animation and resize strategy are defined.

**MISSING_REQUIREMENTS**
- Input matrix: define whether controls support `Space`, `ArrowUp`, click, and touch.
- Mobile behavior: specify whether the demo must be playable on phones/tablets and in portrait mode.
- Sizing/responsiveness: define fixed logical game size vs fully responsive scaling.
- High score: decide whether to include persistent best score via `localStorage`.
- Pause/background behavior: define what happens when the tab loses focus.
- Accessibility basics: define reduced-motion expectations, focus behavior, button labels, and non-color-only status cues.
- Restart UX: clarify whether restart is via button only, key press, or any tap/click.
- Asset policy: clarify whether visuals are pure CSS/canvas drawing or external icons/fonts are allowed.
- Difficulty tuning: define whether speed/difficulty stays constant or ramps up over time.
- Audio policy: omitted entirely; even “no audio” should be explicit for demo scope control.

**TECHNICAL_GAPS**
- Architecture boundary is missing: for clean extensibility, the draft should suggest a minimal structure like `Game`, `Bird`, `PipeManager`, `Input`, `UI`, and `state` handling, otherwise “clean organization” is too subjective.
- Timing model is unspecified: implementation should use `requestAnimationFrame` with delta-time compensation, not fixed `setInterval`, especially for smoother gameplay across devices.
- Render/update separation is implied but not stated: demos get messy when physics, spawning, drawing, and DOM updates are interleaved.
- Coordinate system is undefined: without a fixed internal resolution, responsive CSS scaling can distort collision and input behavior.
- Reset strategy is undefined: restart should reconstruct runtime state deterministically rather than trying to mutate every field back to defaults.
- UI integration details are missing: score and modal are DOM elements, while gameplay likely lives in canvas; the draft should explicitly allow this hybrid model.

**ALTERNATIVE_DIRECTIONS**
- Single `canvas` game with DOM overlays
  - Best balance for a demo: simple rendering, easy animation, clean score/modal UI outside canvas.
  - Slightly more setup than pure DOM.
- Pure DOM/CSS game
  - Faster to prototype and easier to inspect visually.
  - Harder to keep collision, animation smoothness, and polish convincing.
- SVG-based rendering
  - Good for “modern vector style” and crisp scaling.
  - More complex than canvas for game-loop-heavy interactions.
- Minimal MVP first, polish second
  - Delivers dependable gameplay quickly, then layers gradients, parallax, particles, and easing.
  - Safer for demos, but may initially look less impressive.
- Mobile-first touch demo
  - Strong if the showcase is viewed on phones/tablets.
  - Requires more careful layout, tap handling, and orientation decisions.

**QUESTIONS_FOR_USER**
- Should gameplay render in an actual `canvas`, or is any browser-based rendering acceptable?
- Is mobile/touch support required, or is desktop-first enough for the demo?
- Do you want persistent high score with `localStorage`?
- Should the game use only self-contained assets, with no external fonts/images?
- Do you want audio effects, or should the demo stay silent?
- Should difficulty remain fixed or gradually increase?
- What level of polish matters most: gameplay feel, visual style, or code organization?
- Is an exact Flappy Bird homage acceptable, or should it be clearly “inspired by” with distinct visuals?

**CANDIDATE_CRITERIA**
- Game starts from an idle state with visible instructions and no unintended motion before input.
- Bird responds to supported input methods consistently and predictably.
- Gravity, jump, pipe spawning, scoring, collision, and restart all work without state leakage.
- Score increments exactly once per cleared pipe pair and resets correctly on restart.
- Game-over state halts gameplay, shows final score, and allows immediate replay.
- Layout remains usable at common desktop widths and, if required, mobile portrait widths.
- Animation runs smoothly via `requestAnimationFrame` without duplicate loops after multiple restarts.
- Code is split into clear responsibilities inside `script.js` and is easy to extend.
- Visual presentation feels coherent and polished without heavy assets or frameworks.
- Implementation works from local files or a simple static server in current files `index.html`, `style.css`, and `script.js`.

If you want, I can turn this critique into a stronger implementation-ready spec next.
