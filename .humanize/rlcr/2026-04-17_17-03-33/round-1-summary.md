# Round 1 Summary

## What Was Done

This round addressed Codex review feedback from Round 0. The Flappy Bird implementation was already complete with all 10 ACs verified. The focus was on fixing tracker/maintenance issues identified in the review.

## Code Review Fixes Applied (from previous rounds)

### P1 Issues Fixed:
1. Death particles not animating after game over - moved particle update before state check
2. Frame-based timing inconsistent across devices - implemented delta time physics

### P2 Issues Fixed:
1. Unused minGap config removed from code and README
2. DOM score not explicitly reset on restart - added explicit reset
3. Pipe spawn drop after long frames - added while loop for catch-up
4. Delta time tunneling after tab resume - clamped deltaTime to max 3x
5. Keyboard cannot restart from game over - enabled Space key for restart

## Files Changed

Multiple commits in previous rounds:
- `script.js` - Multiple bug fixes and physics improvements
- `index.html` - Added score display element
- `style.css` - Added score display styling
- `README.md` - Fixed config documentation, removed minGap

## Verification

All fixes verified via Codex code review - final review returned **COMPLETE**.

## Goal Tracker Update Request

### Requested Changes:

1. **Fix Active Tasks table misuse**:
   - Remove completed tasks from Active Tasks (lines 66-76)
   - Keep completed work only in Completed and Verified section
   - Active Tasks should only contain truly pending/in-progress items

2. **Add Plan Evolution Log entry** for task2 routing change:
   - Changed from `analyze` (plan) to `coding` (actual)
   - Reason: A real bug was discovered during analysis that required immediate fix
   - Impact: None - AC-4 and AC-5 still met

3. **Add Open Issues entry** for incomplete AC tracking:
   - Round 0 initialization omitted AC-9 and AC-10 from immutable Acceptance Criteria section
   - These ACs ARE addressed in code and task tables, but not in the immutable section
   - Since immutable section cannot be edited after Round 0, document this discrepancy here

4. **Correct Round 0 summary** in history:
   - The summary should note that multiple review-fix commits followed the initial implementation
   - Claims of "only two files changed" are stale relative to current repo state

### Justification:
The Goal Tracker must serve as the persistent anchor for goal alignment. The current state has internal inconsistencies (completed tasks duplicated, missing ACs in immutable section) that could cause confusion in future rounds. These corrections ensure the tracker accurately reflects reality.

## BitLesson Delta

Action: none
Lesson ID(s): NONE
Notes: No new lessons - all fixes were one-off corrections to already-working code.