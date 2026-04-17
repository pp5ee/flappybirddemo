FAIL

- `Ground collision` does trigger `gameOver()` when the bird falls below the playable area at `script.js:217`, but `updatePhysics()` continues running in the same frame and still calls `updatePipes()` and `checkCollisions()` because there is no early return after `checkBoundaries()` at `script.js:197`.
- `Game end flow` is therefore not cleanly finalized on first collision: `gameOver()` can be called again in the same tick from pipe checks at `script.js:261` or `script.js:266`, which can duplicate death particles and means the frame continues processing after the game is already over.
- `Pipe collision` detection is otherwise logically correct: overlap on X is checked at `script.js:258`, then collisions are detected for the upper pipe at `script.js:260` and lower pipe at `script.js:265`.
- `Scoring` increments only once per pipe pair because each spawned pair is represented by one pipe object with a `passed` flag set on first pass at `script.js:272`; that prevents repeat increments.
- `Scoring timing` is correct for a full pass: score increments only after the bird’s left edge is beyond the pipe’s right edge at `script.js:272`, so it won’t count early.

- Suggested fix: add an early return in `updatePhysics()` right after `checkBoundaries()` if `this.state !== GameState.PLAYING`, or make `gameOver()` idempotent with a guard.
