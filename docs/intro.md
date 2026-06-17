---
slug: /intro
title: Documentation Home
description: Open ACE documentation index for deployment, architecture, remote agent, and governance.
---

# Open ACE Documentation

Open ACE is a self-hosted control plane for AI coding agents. It combines browser-based AI coding sessions, Remote Agent execution, autonomous GitHub issue workflows, and governance features for teams that need to run agents on their own machines and credentials.

## What Is New

- Autonomous development workflows can take GitHub issues through planning, implementation, review, and final code-change summaries.
- Batch issue runs, auto-merge controls, pause/cancel behavior, and fork-from-here flows make agent work easier to operate.
- Timeline views now expose milestone summaries, full-text output, status semantics, usage counters, and final changes.
- Remote Agent now covers Claude Code, Qwen Code, Codex, OpenClaw, and ZCode, with token-based registration and management.
- Docker, package, macOS, source-install, migration, and upgrade paths are being actively hardened.

## Start With These Guides

- [Product introduction](./reference/INTRO.md)
- [Deployment guide](./reference/DEPLOYMENT.md)
- [Remote Agent](./reference/REMOTE-AGENT.md)
- [Permission model](./reference/PERMISSION-MODEL.md)
- [Architecture](./reference/ARCHITECTURE.md)

## Who This Is For

- Engineering teams adopting browser-based AI coding workflows
- Platform teams operating remote machines, API key routing, and audit controls
- Administrators evaluating cost, compliance, and permission boundaries

## Project Status

- [Project overview](/project)
- [Roadmap](/project/roadmap)
- [Recent release and PR highlights](/project/releases)
- [Community entry points](/project/community)

## Source Of Truth

The canonical Markdown files remain in the repository under `docs/en` and `docs/cn`. The site build syncs those directories into Docusaurus during CI and Pages deployment.
