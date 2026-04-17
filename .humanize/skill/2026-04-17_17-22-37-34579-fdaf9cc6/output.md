COMPLETE

- All 10 acceptance criteria are satisfied by the current implementation: game UI exists in `index.html:9`, input handling covers keyboard/mouse/touch in `script.js:90`, physics and pipe updates exist in `script.js:184` and `script.js:232`, collisions and scoring are implemented in `script.js:263`, restart resets state in `script.js:140`, code is organized around `CONFIG` and `Game` in `script.js:4` and `script.js:56`, and the project runs as static files per `README.md:24`.
- The bug fix is properly applied: `updatePhysics()` now calls `checkBoundaries()` and immediately exits if state is no longer playing in `script.js:201` and `script.js:205`.
- The score display is visible during gameplay in two ways: DOM score element exists in `index.html:11` with visible styling in `style.css:38`, and the canvas score is rendered while playing in `script.js:346` and `script.js:505`.
- The `README.md` `CONFIG` example matches the actual code values and structure in `README.md:60` and `script.js:4`.

- One note: the visible gameplay score is primarily drawn on the canvas during play (`script.js:347`), while the DOM score display is updated on score changes (`script.js:170`). This is consistent enough to pass your check since the score is visible during gameplay.
