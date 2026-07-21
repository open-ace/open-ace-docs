import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {ProjectChrome, formatNumber, projectData, styles} from '../../components/project/ProjectLayout';

export default function ProjectOverviewPage() {
  const recentProductSignals = [
    {
      title: 'Autonomous development is now central',
      body: 'Open ACE can run issue-driven workflows with planning, execution, review, final code changes, batch issue navigation, fork flows, and auto-merge controls.',
    },
    {
      title: 'Timeline UX makes agent work inspectable',
      body: 'Timeline updates added compact milestone cards, summaries, full-text views, status semantics, deep links, approvals, and clearer failure or pause behavior.',
    },
    {
      title: 'Remote execution is broader and safer',
      body: 'ZCode support, app-server mode, token-based remote agent identity, code-server proxying, and CLI adapter hardening broaden the execution layer beyond the original tool set.',
    },
    {
      title: 'Governance is closer to runtime',
      body: 'Quota enforcement, run provenance, API key proxying, audit surfaces, and cost visibility now connect more directly to how sessions and workflows are executed.',
    },
  ];

  const metrics = [
    {
      label: 'Stars',
      value: formatNumber(projectData.repository.stars),
      hint: 'Public adoption signal pulled from repository metadata when available.',
    },
    {
      label: 'Open issues',
      value: formatNumber(projectData.repository.openIssues),
      hint: 'Current backlog volume for public product and engineering work.',
    },
    {
      label: 'Good first issues',
      value: formatNumber(projectData.community.goodFirstIssueCount),
      hint: 'Visible starter work for new external contributors.',
    },
  ];

  return (
    <ProjectChrome
      title="Project momentum without leaving the docs site."
      description="Open ACE is moving from a browser AI workspace into a self-hosted autonomous engineering control plane. This section turns repository state, roadmap planning, release history, and contribution entry points into a single public surface."
      eyebrow="Project"
      active="overview"
    >
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent product direction</h2>
          <p>
            The current codebase shows a clear product shape: issue-driven autonomous development,
            inspectable execution timelines, broader remote-agent coverage, and governance features
            that stay close to runtime behavior.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {recentProductSignals.map((signal) => (
            <article key={signal.title} className={styles.sectionCard}>
              <h3>{signal.title}</h3>
              <p>{signal.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Live repository signals</h2>
          <p>
            The site reads repository metadata at build time when GitHub API access is available, then
            falls back to committed project files so Pages builds remain deterministic.
          </p>
        </div>
        <div className={styles.cardGrid}>
          {metrics.map((metric) => (
            <article key={metric.label} className={styles.metricCard}>
              <p className={styles.metricLabel}>{metric.label}</p>
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricHint}>{metric.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>What this project surface shows</h2>
          <p>
            These pages are meant to show how Open ACE has evolved beyond a docs shell: into a product
            with autonomous workflows, remote execution, and governance features that can all be inspected
            from one public surface.
          </p>
        </div>
        <div className={styles.cardGrid}>
          <article className={styles.sectionCard}>
            <h3>Autonomous workflow story</h3>
            <ul className={styles.bulletList}>
              <li>Issue-driven runs with plan, implementation, review, and final summary stages</li>
              <li>Batch issue support for operating multiple GitHub issues from one workflow</li>
              <li>Timeline cards that expose progress, failures, retries, approvals, and code changes</li>
            </ul>
          </article>
          <article className={styles.sectionCard}>
            <h3>Remote execution story</h3>
            <ul className={styles.bulletList}>
              <li>Remote Agent registration and token management for controlled machines</li>
              <li>CLI adapters for Claude Code, Qwen Code, Codex, OpenClaw, and ZCode</li>
              <li>Browser terminal, code-server access, and ZCode app-server mode for longer-lived work</li>
            </ul>
          </article>
          <article className={styles.sectionCard}>
            <h3>Governance story</h3>
            <ul className={styles.bulletList}>
              <li>API Key Proxy keeps real model credentials on the server</li>
              <li>Quota, audit, anomaly, and compliance views stay tied to user and session activity</li>
              <li>SSO, multi-tenant controls, and org-sync integrations support team rollout</li>
            </ul>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Where to go next</h2>
          <p>Use these pages as the default project surface for roadmap, release, and contribution status.</p>
        </div>
        <div className={styles.linkGrid}>
          <Link className={styles.linkCard} to="/project/roadmap">
            <span>Roadmap</span>
            <strong>Read current priorities, next-stage work, and success signals.</strong>
          </Link>
          <Link className={styles.linkCard} to="/project/releases">
            <span>Releases</span>
            <strong>Inspect shipped capabilities, latest release metadata, and changelog structure.</strong>
          </Link>
          <Link className={styles.linkCard} to="/project/community">
            <span>Community</span>
            <strong>Find contribution links, public issue paths, and security reporting entry points.</strong>
          </Link>
          <Link className={styles.linkCard} to={projectData.repository.issuesUrl}>
            <span>
              <Translate id="project.overview.issueLinkLabel">GitHub issues</Translate>
            </span>
            <strong>Jump into the live backlog when you need the canonical queue.</strong>
          </Link>
        </div>
      </section>
    </ProjectChrome>
  );
}
