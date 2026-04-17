#!/bin/sh
cd '/app/workspaces/f59dfc15-9c54-4642-b8df-b80c728c0f44' || exit 1
exec 'claude' '--dangerously-skip-permissions' '--print' '/humanize:start-rlcr-loop docs/plan.md --max 30 --yolo --codex-model gpt-5.4:high --full-review-round 5 --track-plan-file --agent-teams --push-every-round'
