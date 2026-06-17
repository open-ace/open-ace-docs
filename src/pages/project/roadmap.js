import React from 'react';
import {ProjectChrome, projectData, styles} from '../../components/project/ProjectLayout';

export default function RoadmapPage() {
  const activeThemes = [
    'Make autonomous workflows dependable enough for real repository work, including pause, retry, timeout, review, and merge behavior.',
    'Improve evaluator confidence with timeline summaries, full-text milestone views, final code changes, and release/project transparency.',
    'Keep remote execution practical across Docker, package installs, macOS, Windows, source installs, and additional CLI agents such as ZCode.',
  ];

  return (
    <ProjectChrome
      title="A practical roadmap for autonomous AI engineering."
      description="This view combines the repository roadmap with the recent product direction visible in merged PRs: dependable autonomous workflows, inspectable execution, and safer self-hosted deployment."
      eyebrow="Roadmap"
      active="roadmap"
    >
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Active themes from recent PRs</h2>
          <p>
            The public roadmap remains the source of truth, but recent merged work adds useful context
            for evaluators who want to understand where Open ACE is heading right now.
          </p>
        </div>
        <article className={styles.sectionCard}>
          <ul className={styles.bulletList}>
            {activeThemes.map((theme) => (
              <li key={theme}>{theme}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Tracked roadmap lanes</h2>
          <p>
            The source of truth remains <code>ROADMAP.md</code> in the repository. During each site build,
            the content is parsed into stable sections that can be rendered with stronger visual structure.
          </p>
        </div>
        <div className={styles.timelineGrid}>
          {projectData.roadmap.sections.map((section) => (
            <article key={section.id} className={styles.sectionCard}>
              <h3>{section.title}</h3>
              <ul className={styles.bulletList}>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </ProjectChrome>
  );
}
