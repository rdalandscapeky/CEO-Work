<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Deployment workflow

Ryland (the site owner) has asked to skip the PR/review step for routine content and copy edits on this site. After implementing a requested change: commit it, merge the working branch straight into `main` (fast-forward when possible), and push `main` to `origin` so Netlify redeploys. Do not stop at a feature branch or open a PR waiting for approval for these routine changes — pushing to `main` for this purpose is pre-authorized.

Still pause and ask first for anything higher-risk: schema/infra changes, dependency upgrades, anything touching payments/forms submission endpoints, or a change you're not confident is correct.
