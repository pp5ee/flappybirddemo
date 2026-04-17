[P1] `updateParticles()` only runs while `state === PLAYING`, so death particles created in `gameOver()` never animate and remain frozen on the game-over screen. `script.js:167`, `script.js:185`, `script.js:307`

[P1] Pipe spawning is frame-based instead of time-based. Since `spawnInterval`, gravity, and movement all depend on render frequency, gameplay speed and difficulty change with actual FPS; on slower/faster devices the game behaves differently. `script.js:188`, `script.js:234`, `script.js:523`

[P2] `CONFIG.pipe.minGap` is documented as “Minimum gap for variety” but is never used. This is dead configuration and misleading documentation/API surface. `script.js:27`, `script.js:252`

[P2] The canvas score and DOM score are duplicated, but the DOM score is only updated after scoring events and not explicitly reset on initialization. It happens to start at `0` from HTML, which is brittle if the markup changes or the game is rehydrated differently. `index.html:10`, `script.js:170`, `script.js:143`

[P2] `lastTime` and the `timestamp` argument are set up but unused, which suggests an incomplete transition toward delta-time logic and adds noise to the game loop implementation. `script.js:82`, `script.js:523`

[P2] Input listeners are attached to `document`/canvas inside the `Game` constructor and never removed. That’s fine for a single instance, but it becomes a leak/duplication risk if the game is ever re-instantiated. `script.js:90`, `script.js:100`, `script.js:105`, `script.js:538`
