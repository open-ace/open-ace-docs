---
slug: /intro
title: 文档首页
description: Open ACE 文档入口，覆盖部署、架构、Remote Agent 与治理能力。
---

# Open ACE 文档

Open ACE 是一个面向 AI Coding Agent 的自托管控制面。它把浏览器化 AI 编码会话、Remote Agent 远程执行、GitHub issue 自主开发工作流，以及团队需要的审计与治理能力放在同一个平台里。

## 最近变化

- 自主开发工作流已经可以围绕 GitHub issue 完成计划、实现、评审与最终代码变更总结。
- 批量 issue、自动合并、暂停/取消、从某个阶段重新 fork 等能力，让 agent 执行更容易运营。
- 时间线视图增加了里程碑摘要、完整输出、状态语义、用量统计与最终变更展示。
- Remote Agent 已覆盖 Claude Code、Qwen Code、Codex、OpenClaw 与 ZCode，并加入 token 注册与管理能力。
- Docker、Package、macOS、源码安装、数据库迁移与升级路径正在持续加固。

## 建议先阅读

- [产品介绍](./reference/INTRO.md)
- [部署指南](./reference/DEPLOYMENT.md)
- [Remote Agent](./reference/REMOTE-AGENT.md)
- [权限模型](./reference/PERMISSION-MODEL.md)
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
