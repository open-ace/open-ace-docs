import React from 'react';
import Link from '@docusaurus/Link';
import {ProjectChrome, formatDate, projectData, styles} from '../../components/project/ProjectLayout';

const recentHighlights = [
  {
    title: 'Autonomous development workflows',
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
  {
    title: 'Deployment and upgrade reliability',
    links: [
      ['#901', 'Docker upgrade mode'],
      ['#1020', 'macOS deployment paths'],
      ['#1053', 'install upgrade/migration checks'],
      ['#1079', 'Docker upgrade config detection'],
    ],
  },
];

function prUrl(label) {
  return `${projectData.repository.pullsUrl}/${label.replace('#', '')}`;
}

export default function ReleasesPage() {
  const releasedEntries = projectData.releases.entries.filter((entry) => entry.version !== 'Unreleased');

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
          <h2>Since v1.0.0</h2>
          <p>
            The repository has shipped a dense set of post-release PRs. These highlights are curated
            from the most visible product changes over the last three weeks.
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
