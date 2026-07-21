import React from 'react';
import Link from '@docusaurus/Link';
import {ProjectChrome, formatDate, projectData, styles} from '../../components/project/ProjectLayout';

const taggedReleaseSummaries = {
  'v1.2.0': {
    title: 'Operational hardening for maintained deployments',
    bullets: [
      'Upgrade safety tightened with minimum-revision checks and clearer upgrade boundaries.',
      'Repository review reminders now ship with built-in health checks covering security, dependency, migration, and database signals.',
      'Model-gateway dark-mode polish and runtime quality fixes reduce friction for administrators already running the platform.',
    ],
  },
  'v1.1.0': {
    title: 'Autonomous workflows became a real product surface',
    bullets: [
      'Issue-driven autonomous development, retry, fork, cancel, and PR linkage landed as core workflow behavior.',
      'Persisted run provenance, milestone TL;DR summaries, and code-change views made remote-agent execution inspectable.',
      'ZCode support, token-based remote-agent identity hardening, quota gates, and terminal relay broadened the execution layer.',
    ],
  },
  'v1.0.0': {
    title: 'Initial public release of the self-hosted platform',
    bullets: [
      'Work Mode, Remote Workspace, Remote Agent, and multi-CLI support established the core browser workspace.',
      'API Key Proxy, governance dashboards, auditability, compliance workflows, and ROI views defined the management plane.',
      'Docker, Kubernetes, reverse-proxy guidance, and bilingual documentation made the project externally evaluable.',
    ],
  },
};

const recentHighlights = [
  {
    title: 'Docs, deployment, and operator trust',
    links: [
      ['#1937', 'product docs refreshed around current capabilities'],
      ['#1935', 'Python 3.10+ requirement aligned across docs and install guidance'],
      ['#1215', 'minimum revision guard for safer upgrade paths'],
      ['#1079', 'Docker upgrade config detection'],
    ],
  },
  {
    title: 'Autonomous workflow operating model',
    links: [
      ['#717', 'full autonomous development workspace'],
      ['#925', 'batched GitHub issues'],
      ['#929', 'batch workflow auto-merge'],
      ['#984', 'session topology and final summaries'],
    ],
  },
  {
    title: 'Timeline and run observability',
    links: [
      ['#982', 'timeline and batch UX'],
      ['#995', 'milestone TL;DR summaries'],
      ['#1056', 'streamlined timeline summaries'],
      ['#1059', 'compact milestone cards'],
    ],
  },
  {
    title: 'Remote Agent and CLI coverage',
    links: [
      ['#773', 'token-based remote agent auth'],
      ['#888', 'agent client token management'],
      ['#890', 'token rotate/revoke UI'],
      ['#1074', 'ZCode CLI and app-server mode'],
    ],
  },
];

function prUrl(label) {
  return `${projectData.repository.pullsUrl}/${label.replace('#', '')}`;
}

export default function ReleasesPage() {
  const releasedEntries = projectData.releases.entries.filter((entry) => entry.version !== 'Unreleased');
  const recentTaggedReleases = (projectData.releases.githubRecent || []).filter((entry) => !entry.draft).slice(0, 3);
  const latestTag = projectData.releases.latest?.tagName || 'the latest tagged release';

  return (
    <ProjectChrome
      title="Release history that reads like product progress."
      description="This page combines committed changelog data with live release metadata when the GitHub API is available during the build. It gives evaluators one place to inspect shipping cadence and scope."
      eyebrow="Releases"
      active="releases"
    >
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Latest published release</h2>
          <p>
            The hero release card is sourced from GitHub releases when available and falls back to the
            committed changelog if the API cannot be reached during the build.
          </p>
        </div>
        <article className={styles.releaseCard}>
          <p className={styles.releaseVersion}>{projectData.releases.latest?.tagName || 'Unreleased'}</p>
          <h3>{projectData.releases.latest?.name || 'Pending first tagged release'}</h3>
          <p className={styles.releaseDate}>
            {projectData.releases.latest?.publishedAt
              ? `Published ${formatDate(projectData.releases.latest.publishedAt)}`
              : 'No published release metadata available yet'}
          </p>
          <Link className="button button--primary" to={projectData.releases.latest?.url || projectData.repository.releasesUrl}>
            View release on GitHub
          </Link>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent tagged releases</h2>
          <p>
            Open ACE has moved quickly across the July 2026 release line. These cards summarize what
            each recent tagged release changed in product terms, not just commit volume.
          </p>
        </div>
        <div className={styles.timelineGrid}>
          {recentTaggedReleases.map((release) => {
            const summary = taggedReleaseSummaries[release.tagName];

            return (
              <article key={release.tagName} className={styles.releaseCard}>
                <p className={styles.releaseVersion}>{release.tagName}</p>
                <p className={styles.releaseDate}>{formatDate(release.publishedAt)}</p>
                <h3>{summary?.title || release.name}</h3>
                <ul className={styles.bulletList}>
                  {(summary?.bullets || [release.name]).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link className="button button--secondary" to={release.url}>
                  View release
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Current direction after {latestTag}</h2>
          <p>
            The repository is still moving after the latest tag. These highlights show where the
            product and operator experience are being sharpened right now.
          </p>
        </div>
        <div className={styles.timelineGrid}>
          {recentHighlights.map((highlight) => (
            <article key={highlight.title} className={styles.releaseCard}>
              <h3>{highlight.title}</h3>
              <ul className={styles.bulletList}>
                {highlight.links.map(([label, text]) => (
                  <li key={label}>
                    <Link to={prUrl(label)}>{label}</Link> {text}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Changelog highlights</h2>
          <p>
            The content below is parsed from <code>CHANGELOG.md</code>. Each release section stays close to
            the repository source while becoming easier to scan on the public site.
          </p>
        </div>
        <div className={styles.timelineGrid}>
          {releasedEntries.map((entry) => (
            <article key={`${entry.version}-${entry.date}`} className={styles.releaseCard}>
              <p className={styles.releaseVersion}>v{entry.version}</p>
              <p className={styles.releaseDate}>{formatDate(entry.date)}</p>
              {entry.sections.map((section) => (
                <div key={section.title}>
                  <p className={styles.sectionTag}>{section.title}</p>
                  <ul className={styles.bulletList}>
                    {section.items.slice(0, 5).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </ProjectChrome>
  );
}
