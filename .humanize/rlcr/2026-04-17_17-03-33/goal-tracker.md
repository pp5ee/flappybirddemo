# Goal Tracker

<!--
This file tracks the ultimate goal, acceptance criteria, and plan evolution.
It prevents goal drift by maintaining a persistent anchor across all rounds.

RULES:
- IMMUTABLE SECTION: Do not modify after initialization
- MUTABLE SECTION: Update each round, but document all changes
- Every task must be in one of: Active, Completed, or Deferred
- Deferred items require explicit justification
-->

## IMMUTABLE SECTION
<!-- Do not modify after initialization -->

### Ultimate Goal

Build a fully runnable Flappy Bird-style browser game using plain HTML, CSS, and JavaScript that serves as a demo project to showcase the coding and iteration capabilities of an automated programming tool. The implementation should be easy to understand, visually polished, and extensible for future improvements.

## Acceptance Criteria

### Acceptance Criteria
<!-- Each criterion must be independently verifiable -->
<!-- Claude must extract or define these in Round 0 -->


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

---

## MUTABLE SECTION
<!-- Update each round with justification for changes -->

### Plan Version: 1 (Updated: Round 0)

#### Plan Evolution Log
<!-- Document any changes to the plan with justification -->
| Round | Change | Reason | Impact on AC |
|-------|--------|--------|--------------|
| 0 | Initial plan | - | - |
| 1 | Routed `task2` from `analyze` to `coding` in execution | A concrete gameplay bug was found during review and fixed immediately in `script.js` instead of stopping at analysis | None; supports AC-4 and AC-5 |

#### Active Tasks
<!-- Map each task to its target Acceptance Criterion and routing tag -->
| Task | Target AC | Status | Tag | Owner | Notes |
|------|-----------|--------|-----|-------|-------|


### Completed and Verified
<!-- Only move tasks here after Codex verification -->
| AC | Task | Completed Round | Verified Round | Evidence |
|----|------|-----------------|----------------|----------|
| AC-1, AC-2 | task1 | 0 | 0 | Codex PASS |
| AC-4, AC-5 | task2 | 0 | 0 | Fixed collision bug - early return added |
| AC-6, AC-7 | task3 | 0 | 0 | Codex PASS |
| AC-8 | task4 | 0 | 0 | Codex PASS |
| AC-9 | task5 | 0 | 0 | Codex PASS |
| AC-10 | task6 | 0 | 0 | Codex PASS |
| All | task7 | 0 | 0 | README.md created |

### Explicitly Deferred
<!-- Items here require strong justification -->
| Task | Original AC | Deferred Since | Justification | When to Reconsider |
|------|-------------|----------------|---------------|-------------------|

### Open Issues
<!-- Issues discovered during implementation -->
| Issue | Discovered Round | Blocking AC | Resolution Path |
|-------|-----------------|-------------|-----------------|
| Immutable Acceptance Criteria section omitted `AC-9` and `AC-10` during Round 0 initialization | 0 | No | Preserve immutable section as-is; use this log entry to document the discrepancy for future rounds |
| Round 0 summary is stale relative to repository history and follow-up fix commits | 1 | No | Treat later commits as the authoritative implementation state when reviewing completion claims |
