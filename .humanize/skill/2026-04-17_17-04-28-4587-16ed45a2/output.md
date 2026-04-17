PASS

**Checks**
- `index.html`, `style.css`, and `script.js` all exist in the repo root and are linked correctly from `index.html:7` and `index.html:22`.
- HTML structure is appropriate for a static canvas game: canvas, start overlay, game-over overlay, final score span, and restart button are present in `index.html:10`, `index.html:12`, `index.html:13`, `index.html:16`, `index.html:18`, `index.html:19`.
- CSS provides layout and interaction support for the game container, canvas, overlays, and restart button in `style.css:17`, `style.css:33`, `style.css:42`, `style.css:69`, `style.css:91`.

**Features**
- Bird implementation exists with position, size, color, gravity, jump velocity, and rendering in `script.js:10`, `script.js:172`, `script.js:432`.
- Pipes are implemented with spawn, movement, drawing, and cleanup in `script.js:24`, `script.js:222`, `script.js:240`, `script.js:367`.
- Collision detection exists for ceiling/ground and pipe hits in `script.js:209`, `script.js:253`.
- Scoring is implemented when the bird passes a pipe, and score rendering/final score display are present in `script.js:271`, `script.js:494`, `script.js:162`.
- Game states are clearly defined and used for ready, playing, and game-over flows in `script.js:50`, `script.js:68`, `script.js:133`, `script.js:160`, `script.js:179`.

**Organization**
- Configuration is centralized in a top-level `CONFIG` object in `script.js:4`.
- Game logic is encapsulated in a `Game` class, separate from config/state definitions, starting at `script.js:56`.
- Initialization is separated to DOM-ready startup in `script.js:527`.

**Static Execution**
- The app uses only relative local assets (`style.css`, `script.js`) and browser APIs; no build step or server dependency is required.
- Script syntax validates successfully with `node --check script.js`.
- Opening `index.html` directly in a browser should work as a static file.
