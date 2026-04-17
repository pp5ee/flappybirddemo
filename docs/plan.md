# Flappy Bird Demo - Implementation Plan

## Goal Description

Build a fully runnable Flappy Bird-style browser game using plain HTML, CSS, and JavaScript that serves as a demo project to showcase the coding and iteration capabilities of an automated programming tool. The implementation should be easy to understand, visually polished, and extensible for future improvements.

## Acceptance Criteria

- AC-1: Game renders correctly in browser with all visual elements visible
  - Positive Tests: Open index.html in browser, game canvas displays with title, sky background, ground, and bird visible
  - Negative Tests: Missing canvas, broken images, or layout overflow indicates failure
- AC-2: Bird responds to input with gravity and jump mechanics
  - Positive Tests: Press Space key, bird jumps upward; bird falls due to gravity when not jumping
  - Negative Tests: Bird does not move, or jumps without input trigger
- AC-3: Pipes generate and move from right to left continuously during gameplay
  - Positive Tests: Pipes spawn at intervals, move horizontally, pass behind bird
  - Negative Tests: No pipes appear, pipes stationary, or pipes move in wrong direction
- AC-4: Collision detection ends game when bird hits pipe or ground
  - Positive Tests: Bird touching pipe triggers game over; bird reaching ground triggers game over
  - Negative Tests: Bird passes through pipes without collision, or collision does not end game
- AC-5: Score increments by 1 when bird successfully passes pipe pair
  - Positive Tests: Score increases from 0 to 1 after passing first pipe; continues incrementing
  - Negative Tests: Score does not change, or increments multiple times for single pipe
- AC-6: Game over screen displays with final score and restart option
  - Positive Tests: Game over overlay shows "Game Over" text, displays correct final score, shows restart button
  - Negative Tests: No game over screen, missing score, or missing restart button
- AC-7: Restart fully resets game state to initial conditions
  - Positive Tests: After restart, score is 0, bird at starting position, all pipes cleared
  - Negative Tests: Score persists after restart, old pipes remain, bird position unchanged
- AC-8: Game supports multiple input methods (keyboard, mouse, touch)
  - Positive Tests: Space key starts/jumps; mouse click starts/jumps; touch starts/jumps
  - Negative Tests: Some input methods do not trigger game action
- AC-9: Code is organized with clear separation of concerns
  - Positive Tests: CONFIG object, Game class, separate methods for physics/rendering/input
  - Negative Tests: Monolithic code block, unclear variable names, no comments
- AC-10: Project runs from static files without build steps
  - Positive Tests: Opening index.html directly in browser works; simple static server works
  - Negative Tests: Requires npm install, bundler, or server-side code

## Path Boundaries

### Upper Bound (Maximum Acceptable Scope)
The implementation includes HTML5 Canvas rendering with modern vector-style graphics, particle effects, animated bird with rotation, cloud decorations, gradient sky background, ground with grass pattern, responsive touch controls, game state management (ready/playing/game over), full collision detection, scoring system, restart functionality, and polished UI overlays. Code is organized with CONFIG object, Game class, and clear method separation.

### Lower Bound (Minimum Acceptable Scope)
The implementation includes basic Canvas rendering with simple graphics, gravity physics, jump mechanics, pipe spawning and movement, collision detection, score tracking, game over detection, restart capability, and functional UI. The game must be playable and demonstrable.

### Allowed Choices
- Can use: HTML5 Canvas API, CSS for UI overlay styling, vanilla JavaScript, requestAnimationFrame for game loop
- Cannot use: Heavy frameworks (React, Vue, Angular), external game libraries, build tools requiring compilation

## Feasibility Hints and Suggestions

### Conceptual Approach
The existing implementation follows a solid architecture:
- `CONFIG` object stores all tunable game parameters (physics, dimensions, colors)
- `Game` class manages the complete game lifecycle
- `requestAnimationFrame` drives the game loop at 60fps
- Canvas rendering for game elements, DOM overlays for UI

The code structure allows easy extension for:
- Sound effects via Audio API
- High score persistence via localStorage
- Difficulty scaling by modifying CONFIG.pipe values
- Mobile optimization via viewport meta tag

### Relevant References
- `index.html` - Main HTML structure with canvas and UI overlays
- `style.css` - Styling for game container, overlays, and typography
- `script.js` - Complete game implementation with CONFIG, Game class, and rendering logic

## Dependencies and Sequence

### Milestones
1. **Verify Core Implementation**: Ensure all gameplay mechanics function correctly
   - Phase A: Test physics (gravity, jump)
   - Phase B: Test obstacle system (spawn, move, collision)
2. **Verify UI/UX**: Ensure all UI elements display and function correctly
   - Phase A: Test overlays (start, game over)
   - Phase B: Test input handling (keyboard, mouse, touch)
3. **Documentation**: Add README.md with project information
   - Create project documentation with usage instructions

## Task Breakdown

| Task ID | Description | Target AC | Tag (`coding`/`analyze`) | Depends On |
|---------|-------------|-----------|----------------------------|------------|
| task1 | Verify game renders and runs in browser | AC-1, AC-2 | analyze | - |
| task2 | Verify collision detection and scoring | AC-4, AC-5 | analyze | task1 |
| task3 | Verify game state transitions and restart | AC-6, AC-7 | analyze | task2 |
| task4 | Verify multi-input support (keyboard/mouse/touch) | AC-8 | analyze | task1 |
| task5 | Verify code organization and readability | AC-9 | analyze | - |
| task6 | Verify static file execution works | AC-10 | analyze | - |
| task7 | Add README.md with project documentation | All | coding | task6 |

## Claude-Codex Deliberation

### Agreements
- Both Claude and Codex agree the existing implementation covers all core requirements from the draft
- Both agree the code organization is clean with CONFIG object and Game class separation
- Both agree the visual presentation (canvas, gradients, particles) meets the "polished, lightweight" requirement

### Resolved Disagreements
- Codex suggested adding localStorage for high score persistence - decision deferred as optional enhancement not in original requirements
- Codex suggested adding audio effects - decision deferred as explicitly optional for demos
- Codex suggested mobile responsiveness testing - decision deferred, current implementation includes touch support and viewport meta

### Convergence Status
- Final Status: `partially_converged`
- Note: Direct mode was used, skipping iterative convergence. Some optional enhancements identified but not required.

## Pending User Decisions

- DEC-1: High score persistence via localStorage
  - Claude Position: Not required by draft, but would be nice-to-have for demo
  - Codex Position: Recommended as extension capability
  - Tradeoff Summary: Adds complexity; user may add later as iteration example
  - Decision Status: `PENDING` - defer to future iteration

- DEC-2: Audio/sound effects
  - Claude Position: Not required, may distract from code demo focus
  - Codex Position: Optional for polish
  - Tradeoff Summary: Requires audio asset management; keep silent for cleaner code demo
  - Decision Status: `PENDING` - defer to future iteration

- DEC-3: README.md documentation
  - Claude Position: Required by draft "Standard Deliverables" section
  - Codex Position: Standard requirement for any project
  - Tradeoff Summary: Missing from current implementation, needs to be added
  - Decision Status: `PENDING` - task7 addresses this

## Implementation Notes

### Code Style Requirements
- Implementation code and comments must NOT contain plan-specific terminology such as "AC-", "Milestone", "Step", "Phase", or similar workflow markers
- These terms are for plan documentation only, not for the resulting codebase
- Use descriptive, domain-appropriate naming in code instead

### Standard Deliverables
Per the draft requirements, the following must be included:
- **README.md** at project root with: project title & description, prerequisites, installation steps, usage examples with code snippets, configuration options, and project structure overview
- **Git commits** with conventional commit prefix `feat:` for all commits