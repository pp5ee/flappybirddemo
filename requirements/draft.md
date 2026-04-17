# Requirement

Please generate a fully runnable web-based Flappy Bird demo that I can use to showcase the coding and iteration capabilities of an automated programming tool. Follow the requirements below carefully.

[Project Goal]
Build a classic Flappy Bird-style browser game that users can open and play immediately. This project is intended for demo purposes, so it should:
- Be easy to understand and play
- Have a clean but complete visual presentation
- Use a clear code structure so it is easy to modify and extend later
- Avoid heavy setup and preferably run as static files

[Technical Requirements]
- Use plain HTML, CSS, and JavaScript
- Do not use heavy front-end frameworks
- It is okay to split the project into files such as index.html, style.css, and script.js
- The project should run either by opening the HTML file directly or via a simple static server
- Code should be readable and include comments around key logic

[Core Gameplay]
1. The player controls a bird that is constantly pulled downward by gravity.
2. Pressing Space, clicking the mouse, or tapping the screen makes the bird jump upward once.
3. The game continuously generates pairs of upper and lower pipe obstacles that move from right to left.
4. Each pipe pair has a gap that the bird must fly through.
5. The game ends if the bird collides with:
   - Any pipe
   - The ground
   - The ceiling, if an upper boundary is implemented
6. The score increases by 1 each time the bird successfully passes through one pipe pair.
7. After game over, the player must be able to restart the game easily.

[UI Requirements]
Please design a complete single-page game interface including:
- A game title, such as "Flappy Bird"
- A main game area or canvas
- A visible current score display
- A start instruction area, such as "Press Space to Start" or "Tap to Start"
- A game-over modal, panel, or overlay showing:
  - "Game Over"
  - Final score
  - Restart button
- A restart mechanism that fully resets score, bird position, obstacle state, and game state

[Visual Style]
Use a polished, lightweight visual style suitable for a demo:
- Bright background or simple sky theme
- Distinct bird appearance
- Readable pipe styling
- Ground area at the bottom
- Good spacing, alignment, and clear typography
- Add subtle animations or transitions if appropriate, but do not overcomplicate the implementation

[Game Logic Requirements]
Please implement the following clearly:
- Gravity
- Jump impulse
- Bird vertical velocity
- Obstacle generation at intervals
- Obstacle movement
- Collision detection
- Scoring logic
- Start state, running state, and game-over state
- Restart logic

[Code Quality Requirements]
- Organize the code cleanly
- Use clear variable and function names
- Separate rendering, state management, input handling, and collision logic as much as reasonably possible
- Add comments to important logic sections so the code is easy to demo and explain
- Avoid unnecessary complexity

[Demo-Oriented Requirements]
Because this is for a live demo of an automated coding tool, please make the implementation suitable for showing iterative improvements later. That means:
- Keep the structure extensible
- Make it easy to later add features like sound effects, difficulty scaling, mobile optimization, themes, or high-score persistence
- Do not hard-code everything in one unstructured block if it can be avoided

[Output Format]
Please provide:
1. The full project code
2. A clear file-by-file breakdown
3. Instructions on how to run it locally
4. A short explanation of the main architecture and game loop

If you think there are small improvements that make this demo feel more complete, you may include them, as long as the implementation remains lightweight and easy to understand.

cleaner modern vector style,HTML5 Canvas,need robust touch/tap controls,just skip first,

---

## Standard Deliverables (mandatory for every project)

- **README.md** — must be included at the project root with: project title & description, prerequisites, installation steps, usage examples with code snippets, configuration options, and project structure overview.
- **Git commits** — use conventional commit prefix `feat:` for all commits.
