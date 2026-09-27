import React from 'react';
import Link from '@docusaurus/Link';
import {ProjectChrome, formatDate, projectData, styles} from '../../components/project/ProjectLayout';

const taggedReleaseSummaries = {
  'v2.1.0': {
    title: 'One isolation setting, more sandboxes, tighter tenancy',
    bullets: [
      'Workspace isolation is one workspace.isolation {level, backend} block; package and Docker installs convert old configs automatically, and the declared level is enforced as a floor.',
      'New backends without Kubernetes: bubblewrap confinement for OS-account workspaces, and local gVisor or Kata Containers sandboxes with allowlisted egress.',
      'Messages and analysis APIs are now strictly tenant-scoped, and the admin dashboard went from tens of seconds to milliseconds on large databases.',
    ],
  },
  'v2.0.1': {
    title: 'Published to PyPI',
    bullets: [
      'First PyPI release as open-ace-server, published with Trusted Publishing on every GitHub release.',
    ],
  },
  'v2.0.0': {
    title: 'A sandbox-isolated, multi-user platform',
    bullets: [
      'Interactive and autonomous agents can run in OpenSandbox gVisor/Kata pods behind a fail-closed SandboxProvider contract, with CLI state carried across ephemeral sandboxes.',
      'Autonomous workflows gained an independent acceptance-verification phase with mechanical gates, human override, and resume-with-feedback.',
      'SAML SSO, DingTalk and Feishu org sync, signed alert webhooks, and tenant-scoped OS isolation for shared projects. Upgrading needs Python 3.10+, a non-root image, and OPENACE_ENCRYPTION_KEY.',
    ],
  },
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
    title: 'Workspace isolation',
    links: [
      ['#3448', 'one workspace.isolation {level, backend} configuration'],
      ['#3447', 'bilingual workspace isolation guide'],
      ['#3435', 'bubblewrap confinement for os_user workspaces'],
    ],
  },
  {
    title: 'Local sandboxes without Kubernetes',
    links: [
      ['#3437', 'local gVisor container backend'],
      ['#3445', 'Kata Containers runtime for the local container backend'],
    ],
  },
  {
    title: 'Tenant boundaries',
    links: [
      ['#3441', 'tenant-scope every messages endpoint'],
      ['#3443', 'scope tenant_admin to its tenant on /api/analysis/*'],
    ],
  },
  {
    title: 'Dashboard performance',
    links: [
      ['#3439', 'stop full daily_messages scans on the admin dashboard'],
      ['#3444', 'index-walk tenant-scoped tool and host lists'],
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
            These cards summarize what each recent tagged release changed in product terms, not just
            commit volume.
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
          <h2>What shipped in {latestTag}</h2>
          <p>
            Representative pull requests behind the latest tagged release, grouped by the product
            area they strengthened.
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
              <p className={styles.releaseVersion}>v{entry.version.replace(/^v/, '')}</p>
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
