# Code Review Findings

You are in the **Review Phase**. Codex has performed a code review and found issues that need to be addressed.

## Review Results

## Codex Review Issues

- No `[P0]`–`[P9]` issues are present because there is no review output and no diff content to analyze.

**Evidence**
- Branch is `main`.
- Diff check returns clean: `git diff --quiet main...HEAD` exits `0`.
- No prior round-3 review artifacts were found in the workspace.

**Next Action**
- This round should transition to Finalize Phase.
- If you want, I can also create a small `round-3-review-result.md` note documenting that the review command is unavailable and the diff is empty.
**Review Result**
- `codex review --base main` cannot run here because this Codex CLI build has no `review` subcommand; `codex --help` lists no such command.
- `git diff main...HEAD` is empty, so there are no tracked code changes to review.
- No `[P0]`–`[P9]` issues are present because there is no review output and no diff content to analyze.

**Evidence**
- Branch is `main`.
- Diff check returns clean: `git diff --quiet main...HEAD` exits `0`.
- No prior round-3 review artifacts were found in the workspace.

**Next Action**
- This round should transition to Finalize Phase.
- If you want, I can also create a small `round-3-review-result.md` note documenting that the review command is unavailable and the diff is empty.

## Instructions

1. **Read `.humanize/bitlesson.md` and run `bitlesson-selector`** for each fix task before coding
2. **Address all issues** marked with `[P0-9]` severity markers
3. **Focus on fixes only** - do not add new features or make unrelated changes
4. **Commit your changes** after fixing the issues
5. **Write your summary** to: `/app/workspaces/f59dfc15-9c54-4642-b8df-b80c728c0f44/.humanize/rlcr/2026-04-17_17-03-33/round-3-summary.md`

## Summary Template

Your summary should include:
- Which issues were fixed
- How each issue was resolved
- Any issues that could not be resolved (with explanation)

## Important Notes

- The COMPLETE signal has no effect during the review phase
- You must address the code review findings to proceed
- After you commit and write your summary, Codex will perform another code review
- The loop continues until no `[P0-9]` issues are found

## Task Tag Routing Reminder

Follow the plan's per-task routing tags strictly:
- `coding` task -> Claude executes directly
- `analyze` task -> execute via `/humanize:ask-codex`, then integrate the result
- Keep Goal Tracker Active Tasks columns `Tag` and `Owner` aligned with execution
