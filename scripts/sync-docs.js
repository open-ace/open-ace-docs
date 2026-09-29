const fs = require('fs');
const path = require('path');

const siteRoot = path.resolve(__dirname, '..');
const sourceRepoRoot = process.env.OPEN_ACE_SOURCE_DIR
  ? path.resolve(process.env.OPEN_ACE_SOURCE_DIR)
  : path.resolve(siteRoot, '..', 'open-ace');
const docsRoot = path.join(sourceRepoRoot, 'docs');
const staticImgRoot = path.join(siteRoot, 'static', 'img');
const imagesSource = path.join(docsRoot, 'images');

// Curated bilingual sections (2026-09-29 open-ace docs governance
// restructure). Every source file under docs/<section>/ is a single bilingual
// document with a combined H1 ("# EN title — CN title"), a
// "[English](#english) | [中文](#中文)" nav line, and "## English" / "## 中文"
// sections. This script splits each file per locale:
//
//   English half -> docs/<section>/
//   Chinese half -> i18n/zh-Hans/docusaurus-plugin-content-docs/current/<section>/
//
// which preserves the site's locale switcher. dev-notes/ is an English-only
// process archive and is not published.
const SECTIONS = [
  {dir: 'guide', en: 'Guide', cn: '指南', position: 1},
  {dir: 'dev', en: 'Development', cn: '开发', position: 2},
  {dir: 'contracts', en: 'Contracts', cn: '契约', position: 3},
  {dir: 'security', en: 'Security', cn: '安全', position: 4},
];

const chineseTargetRoot = path.join(
  siteRoot,
  'i18n',
  'zh-Hans',
  'docusaurus-plugin-content-docs',
  'current'
);

const githubBlobBase = 'https://github.com/open-ace/open-ace/blob/main/';

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, {recursive: true});
}

function assertExists(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(
      `Missing ${label} at ${dirPath}. Set OPEN_ACE_SOURCE_DIR to the open-ace repo root.`
    );
  }
}

function resetDir(dirPath) {
  fs.rmSync(dirPath, {recursive: true, force: true});
  ensureDir(dirPath);
}

// Split one bilingual source file into its two language halves.
function splitBilingual(text, relPath) {
  const lines = text.split('\n');
  const anchors = {};
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i] === '## English' && anchors.en === undefined) anchors.en = i;
    if (lines[i] === '## 中文' && anchors.cn === undefined) anchors.cn = i;
  }
  if (anchors.en === undefined || anchors.cn === undefined || anchors.cn < anchors.en) {
    throw new Error(
      `${relPath}: expected exactly one "## English" section followed by one "## 中文" section`
    );
  }
  const h1 = lines[0].startsWith('# ') ? lines[0].slice(2).trim() : '';
  const sep = h1.indexOf(' — ');
  if (!h1 || sep === -1) {
    throw new Error(`${relPath}: expected combined H1 "# EN title — CN title"`);
  }
  const strip = (from, to) =>
    lines
      .slice(from + 1, to)
      .join('\n')
      // drop the bilingual nav line and the "---" separators around the halves
      .replace(/^\[English\]\(#english\) \| \[中文\]\(#中文\)\s*\n?/, '')
      .replace(/^---\s*\n/, '')
      .replace(/\n---\s*$/, '')
      .trim();
  return {
    titleEn: h1.slice(0, sep),
    titleCn: h1.slice(sep + 3),
    en: strip(anchors.en, anchors.cn),
    cn: strip(anchors.cn, lines.length),
  };
}

// Locale-independent rewrites applied to each half before writing:
// - images: ../images/x.png -> /img/x.png (all images land in static/img)
// - dev-notes links: not published on the site; point at the GitHub blob
function rewriteLinks(markdown) {
  return markdown
    .replace(/\]\((\.\.\/)+images\//g, '](/img/')
    .replace(/\]\((\.\.\/)+dev-notes\/([^)#\s]+?)(#[^)]*)?\)/g, (_m, _dots, file, anchor) =>
      `](${githubBlobBase}docs/dev-notes/${file}${anchor || ''})`
    )
    // Links that climb out of docs/ (e.g. ../../schema/schema-postgres.sql)
    // have no site-side target: point at the GitHub blob instead.
    .replace(/\]\((\.\.\/){2,}([^)#\s]+?)(#[^)]*)?\)/g, (_m, _dots, file, anchor) =>
      `](${githubBlobBase}${file}${anchor || ''})`
    );
}

function writeCategoryJson(filePath, label, position) {
  fs.writeFileSync(
    filePath,
    `${JSON.stringify({label, position, collapsed: false}, null, 2)}\n`
  );
}

function syncSection(section) {
  const sourceDir = path.join(docsRoot, section.dir);
  assertExists(sourceDir, `docs/${section.dir} section`);
  const englishTarget = path.join(siteRoot, 'docs', section.dir);
  const chineseTarget = path.join(chineseTargetRoot, section.dir);
  resetDir(englishTarget);
  resetDir(chineseTarget);

  let count = 0;
  for (const entry of fs.readdirSync(sourceDir, {withFileTypes: true})) {
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const relPath = `docs/${section.dir}/${entry.name}`;
    const {titleEn, titleCn, en, cn} = splitBilingual(
      fs.readFileSync(path.join(sourceDir, entry.name), 'utf8'),
      relPath
    );
    fs.writeFileSync(
      path.join(englishTarget, entry.name),
      `# ${titleEn}\n\n${rewriteLinks(en)}\n`
    );
    fs.writeFileSync(
      path.join(chineseTarget, entry.name),
      `# ${titleCn}\n\n${rewriteLinks(cn)}\n`
    );
    count += 1;
  }
  writeCategoryJson(path.join(englishTarget, '_category_.json'), section.en, section.position);
  writeCategoryJson(path.join(chineseTarget, '_category_.json'), section.cn, section.position);
  return count;
}

function main() {
  assertExists(sourceRepoRoot, 'open-ace source repository');
  assertExists(docsRoot, 'open-ace docs directory');

  let total = 0;
  for (const section of SECTIONS) {
    total += syncSection(section);
  }

  ensureDir(staticImgRoot);
  for (const entry of fs.readdirSync(imagesSource, {withFileTypes: true})) {
    if (!entry.isFile()) continue;
    const target = entry.name === 'logo.png' ? 'social-card.png' : entry.name;
    fs.copyFileSync(path.join(imagesSource, entry.name), path.join(staticImgRoot, target));
  }

  console.log(
    `sync-docs: ${total} bilingual docs split into docs/{${SECTIONS.map((s) => s.dir).join(
      ','
    )}} (English) and i18n/zh-Hans/... (Chinese)`
  );
}

main();
