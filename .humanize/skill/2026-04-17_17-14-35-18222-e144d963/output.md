PASS

- State model exists with `READY`, `PLAYING`, and `GAME_OVER` in `script.js:50`, and transitions are implemented via `startGame()` (`script.js:133`), `gameOver()` (`script.js:160`), and `restart()` (`script.js:139`).
- Input handling matches the states: from `READY`, input starts play; from `PLAYING`, input jumps; from `GAME_OVER`, normal input does nothing and restart is button-driven in `script.js:116`.
- Game-over UI is present in `index.html:16`, and final score is written into `#finalScore` in `script.js:162` before showing the overlay in `script.js:163`.
- Restart fully resets core game state in `script.js:139`: `state` returns to `READY`, `score` resets to `0`, `frameCount` resets to `0`, bird resets from `CONFIG.bird` with `velocity: 0` (`script.js:146`), and both `pipes` and `particles` are cleared (`script.js:152`).
- UI reset is also correct: game-over overlay is hidden and start overlay is shown again in `script.js:156`.
- Minor note: `restart()` does not explicitly reset the DOM text in `#finalScore`, but this does not affect gameplay state and the next game-over updates it correctly in `script.js:162`.
