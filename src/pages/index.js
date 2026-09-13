import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './index.module.css';

const featureCards = [
  {
    title: 'Issue-driven autonomous development',
    description:
      'Turn GitHub issues into planned, executed, reviewed, and merge-ready engineering workflows with milestones, timeline views, and final code-change summaries.',
  },
  {
    title: 'Multi-CLI remote workspace',
    description:
      'Run Claude Code, Qwen Code, Codex, OpenClaw, and ZCode on controlled machines with browser terminal, session recovery, and code-server access.',
  },
  {
    title: 'Governance for real team usage',
    description:
      'Track API key routing, proxy-token usage, approvals, audit events, quotas, anomalies, compliance, and cost signals.',
  },
];

const audienceCards = [
  {
    eyebrow: 'For builders',
    title: 'Run real AI development work from issues',
    body: 'Batch GitHub issues, inspect milestone timelines, fork from a previous step, control merge behavior, and keep final code changes visible.',
  },
  {
    eyebrow: 'For platform teams',
    title: 'Keep deployment and secrets inside your boundary',
    body: 'Remote Agent, token-based registration, code-server proxying, and API Key Proxy keep machines, credentials, and execution policy self-hosted.',
  },
  {
    eyebrow: 'For governance',
    title: 'See what happened while the agent worked',
    body: 'Compact timeline cards, full-text milestone views, run provenance, audit logs, approvals, and usage counters make runs explainable.',
  },
];

const signalItems = [
  {
    label: 'Latest focus',
    value: 'Autonomous workflows, run timeline, ZCode support, install hardening',
  },
  {
    label: 'Execution layer',
    value: 'Remote Agent, token auth, CLI adapters, terminal relay, app-server mode',
  },
  {
    label: 'Best next read',
    value: 'Remote Agent, Deployment, Product Guide, Project status',
  },
];

const recentHighlights = [
  {
    title: 'Autonomous workflows became a product surface',
    description:
      'Recent work added issue-driven autonomous development, batch navigation, auto-merge controls, retry and timeout handling, fork flows, and session-aware execution.',
  },
  {
    title: 'Execution is easier to inspect',
    description:
      'Timeline cards now show milestone summaries, full-text detail, final code changes, status filters, deep links, approvals, and clearer pause or failure semantics.',
  },
  {
    title: 'Remote Agent is broader and safer',
    description:
      'ZCode joined Claude Code, Qwen Code, Codex, and OpenClaw, while token management, app-server support, and remote identity checks hardened agent access.',
  },
  {
    title: 'Governance and install paths are getting sharper',
    description:
      'Quota enforcement, auditability, API key routing, and Docker, package, macOS, sudoers, migration, and config-path fixes make evaluation and upgrade flows less brittle.',
  },
];

export default function Home() {
  return (
    <Layout
      title="Open ACE"
      description="Self-hosted AI coding agent workspace and governance plane"
    >
      <header className={styles.hero}>
        <div className={styles.heroBackdrop} />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>Open ACE</p>
            <h1>Self-hosted control plane for AI coding agents.</h1>
            <p className={styles.heroText}>
              Open ACE gives teams a browser workspace for AI coding agents, a remote execution
              layer for internal machines, and an auditable autonomous workflow system that can
              take GitHub issues from planning through implementation, review, and merge.
            </p>
            <div className={styles.heroActions}>
              <Link className="button button--primary button--lg" to="/docs/intro">
                Read the docs
              </Link>
              <Link className="button button--secondary button--lg" to="/docs/reference/DEPLOYMENT">
                Start deployment
              </Link>
            </div>
          </div>
          <div className={styles.heroPanel}>
            <div className={styles.heroPanelTop}>
              <span className={styles.panelBadge}>Current</span>
              <span className={styles.panelBadgeMuted}>Updated from recent PRs</span>
            </div>
            {signalItems.map((item) => (
              <div key={item.label} className={styles.signalBlock}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Core value</p>
            <h2>From AI sessions to autonomous engineering runs</h2>
          </div>
          <div className={styles.featureGrid}>
            {featureCards.map((card) => (
              <article key={card.title} className={styles.featureCard}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={clsx(styles.section, styles.audienceSection)}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Why teams adopt it</p>
            <h2>Designed for teams that need useful automation and real control</h2>
          </div>
          <div className={styles.audienceGrid}>
            {audienceCards.map((card) => (
              <article key={card.title} className={styles.audienceCard}>
                <p className={styles.audienceEyebrow}>{card.eyebrow}</p>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Recent momentum</p>
            <h2>What the current codebase now makes possible</h2>
          </div>
          <div className={styles.featureGrid}>
            {recentHighlights.map((card) => (
              <article key={card.title} className={styles.featureCard}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <p className={styles.kicker}>Start here</p>
            <h2>Evaluate the current product surface</h2>
          </div>
          <div className={styles.linkGrid}>
            <Link className={styles.linkCard} to="/docs/intro">
              <span>Documentation Home</span>
              <strong>Browse the structured docs entry point</strong>
            </Link>
            <Link className={styles.linkCard} to="/docs/reference/INTRO">
              <span>Product Intro</span>
              <strong>Understand positioning, features, and architecture at a glance</strong>
            </Link>
            <Link className={styles.linkCard} to="/docs/reference/DEPLOYMENT">
              <span>Deployment Guide</span>
              <strong>Go from local startup to production deployment decisions</strong>
            </Link>
            <Link className={styles.linkCard} to="/docs/reference/REMOTE_AGENT">
              <span>Remote Agent</span>
              <strong>Learn how CLI agents are executed on controlled remote machines</strong>
            </Link>
            <Link className={styles.linkCard} to="/project">
              <span>Project Status</span>
              <strong>View recent highlights, roadmap, release history, and contribution entry points</strong>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
