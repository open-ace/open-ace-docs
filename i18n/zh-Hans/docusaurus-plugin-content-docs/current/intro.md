---
slug: /intro
title: 文档首页
description: Open ACE 文档入口，覆盖部署、架构、Remote Agent 与治理能力。
---

# Open ACE 文档

Open ACE 是一个面向 AI Coding Agent 的自托管控制面。它把浏览器化 AI 编码会话、Remote Agent 远程执行、GitHub issue 自主开发工作流、API Key 治理，以及团队需要的审计和配额能力放在同一个平台里。

## v2.0 新变化

- Agent 可以运行在 OpenSandbox 的 gVisor/Kata Pod 中，由 fail-closed 的 `SandboxProvider` 契约统一约束；CLI 会话记录可跨临时沙箱携带，`--resume` 持续可用。
- 交互工作区新增 `sandboxed` 隔离等级，以及带版本的隔离能力契约（`GET /api/workspace/isolation-capabilities`）与服务端隔离下限。
- 自主开发工作流新增独立的验收校验阶段：机械门禁、owner/管理员覆盖、带反馈恢复；用量窗口配额暂停会在重置时自动恢复。
- 多用户部署按租户在 OS 层隔离共享项目，容器重建时固定账户 uid，并自动预置共享命名空间。
- 企业身份与运营：SAML SSO、钉钉与飞书组织同步、签名告警 Webhook、个人文件浏览器、可配置的 ROI 分析。
- **从 v1.x 升级**：需要 Python 3.10+，Docker 镜像以非 root 的 uid 1000 运行，首次重启前必须设置 `OPENACE_ENCRYPTION_KEY`。详见[部署指南](./reference/DEPLOYMENT.md#升级)。

## 建议先阅读

- [产品介绍](./reference/INTRO.md)
- [部署指南](./reference/DEPLOYMENT.md)
- [Remote Agent](./reference/REMOTE_AGENT.md)
- [权限模型](./reference/PERMISSION_MODEL.md)
- [系统架构](./reference/ARCHITECTURE.md)

## 适用对象

- 正在落地浏览器化 AI Coding 工作流的研发团队
- 负责远程机器、API Key 路由与审计治理的平台团队
- 需要评估成本、合规与权限边界的管理员

## 项目状态

- [项目概览](/project)
- [路线图](/project/roadmap)
- [近期发布与 PR 亮点](/project/releases)
- [社区入口](/project/community)

## 文档来源

仓库里的 `docs/en` 与 `docs/cn` 仍然是原始文档来源。站点构建时会自动把这两套文档同步到 Docusaurus。
