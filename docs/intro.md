---
slug: /intro
title: Documentation Home
description: Open ACE documentation index for deployment, architecture, remote agent, and governance.
---

# Open ACE Documentation

Open ACE is a self-hosted control plane for AI coding agents. It combines browser-based AI coding sessions, Remote Agent execution, autonomous GitHub issue workflows, API key governance, and team-level audit and quota controls for organizations that want to keep AI engineering inside their own boundary.

## What Is New in v2.1

- Workspace isolation is configured in one block, `workspace.isolation {"level", "backend"}`, and the declared level is enforced as a floor. Package and Docker installs convert existing configs automatically.
- New backends that need no Kubernetes: `bwrap` confinement for OS-account workspaces, and `local-gvisor` / `local-kata` container sandboxes with allowlisted egress and an audit log.
- The messages and analysis APIs are strictly tenant-scoped; tenant admins now see only their own tenant.
- The admin dashboard loads in milliseconds on large databases (it previously rescanned message tables on every request).
- **Upgrading to v2.1**: source installs and read-only mounted configs must run the isolation config converter first. See the [deployment guide](./reference/DEPLOYMENT.md#upgrading) and [workspace isolation](./reference/WORKSPACE_ISOLATION.md).

## v2.0 Highlights

- Agents can run in OpenSandbox gVisor/Kata pods behind a fail-closed `SandboxProvider` contract, and the CLI session transcript carries across ephemeral sandboxes so `--resume` keeps working.
- Interactive workspaces gained a `sandboxed` isolation level and a versioned isolation capability contract (`GET /api/workspace/isolation-capabilities`) with a server-side isolation floor.
- Autonomous workflows now pass an independent acceptance-verification phase with mechanical gates, owner/admin override, and resume-with-feedback. Usage-window quota pauses auto-resume at reset.
- Multi-user deployments isolate shared projects per tenant at the OS level, pin account uids across container recreation, and provision the shared namespace automatically.
- Enterprise identity and operations: SAML SSO, DingTalk and Feishu org sync, signed alert webhooks, a personal files browser, and configurable ROI analysis.
- **Upgrading from v1.x**: Python 3.10+ is required, the Docker image runs as non-root uid 1000, and `OPENACE_ENCRYPTION_KEY` must be set before the first restart. See the [deployment guide](./reference/DEPLOYMENT.md#upgrading).

## Start With These Guides

- [Product introduction](./reference/INTRO.md)
- [Deployment guide](./reference/DEPLOYMENT.md)
- [Remote Agent](./reference/REMOTE_AGENT.md)
- [Permission model](./reference/PERMISSION_MODEL.md)
- [Workspace isolation](./reference/WORKSPACE_ISOLATION.md)
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
