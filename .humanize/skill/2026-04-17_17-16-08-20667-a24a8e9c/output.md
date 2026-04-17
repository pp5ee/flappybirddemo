PASS

- `Space` key starts and jumps: `document` listens for `keydown`, checks `e.code === 'Space'`, prevents default, and routes to `handleInput()` in `script.js:91`. In `READY`, that calls `startGame()`; in `PLAYING`, it calls `birdJump()` via `script.js:116`. `startGame()` also immediately performs a jump in `script.js:133`.
- Mouse click starts and jumps: the canvas listens for `mousedown` and calls `handleInput()` in `script.js:99`. That gives the same `READY -> startGame()+jump` and `PLAYING -> birdJump()` behavior as keyboard input.
- Touch/tap starts and jumps: the canvas listens for `touchstart`, uses `passive: false`, calls `preventDefault()`, and routes to `handleInput()` in `script.js:104`. This supports `READY -> startGame()+jump` and `PLAYING -> birdJump()`.
- Touch interaction is additionally supported by CSS: `#gameCanvas { touch-action: none; }` in `style.css:33`, which helps avoid browser gesture interference.
- The start overlay does not block input because `.overlay` has `pointer-events: none` in `style.css:42`, so clicks/taps still reach the canvas while the start prompt is visible.

Relevant references:
- `script.js:91`
- `script.js:99`
- `script.js:104`
- `script.js:116`
- `script.js:133`
- `style.css:33`
- `style.css:42`
- `index.html:13`

If you want, I can also do a browser-level runtime verification with automated input events.
