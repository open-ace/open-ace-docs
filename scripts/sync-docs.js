const fs = require('fs');
const path = require('path');

const siteRoot = path.resolve(__dirname, '..');
const sourceRepoRoot = process.env.OPEN_ACE_SOURCE_DIR
  ? path.resolve(process.env.OPEN_ACE_SOURCE_DIR)
  : path.resolve(siteRoot, '..', 'open-ace');
const docsRoot = path.join(sourceRepoRoot, 'docs');
const staticImgRoot = path.join(siteRoot, 'static', 'img');
const englishSource = path.join(docsRoot, 'en');
const chineseSource = path.join(docsRoot, 'cn');
const imagesSource = path.join(docsRoot, 'images');
const englishTarget = path.join(siteRoot, 'docs', 'reference');
const chineseTarget = path.join(
  siteRoot,
  'i18n',
  'zh-Hans',
  'docusaurus-plugin-content-docs',
  'current',
  'reference'
);
const englishCategoryFile = path.join(englishTarget, '_category_.json');
const chineseCategoryFile = path.join(chineseTarget, '_category_.json');

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, {recursive: true});
}

function assertExists(dirPath, label) {
  if (!fs.existsSync(dirPath)) {
    throw new Error(`Missing ${label} at ${dirPath}. Set OPEN_ACE_SOURCE_DIR to the open-ace repo root.`);
  }
}

function resetDir(dirPath) {
  fs.rmSync(dirPath, {recursive: true, force: true});
  ensureDir(dirPath);
}

// The source repo links each doc to its other-language twin with a relative
// path (`../cn/X.md` in docs/en, `../en/X.md` in docs/cn). On the site the
// twins live in separate locales, so rewrite those links to the twin's locale
// URL. The link is absolute: a cross-locale path cannot be resolved by the
// broken-link checker of a single-locale build, and Docusaurus would prefix a
// root-relative one with the current locale (`/zh-Hans/...`).
const baseUrl = 'https://open-ace.github.io/open-ace-docs/';
const crossLocaleLinks = {
  en: {from: /\]\(\.\.\/cn\/([\w-]+)\.md(#[^)]*)?\)/g, prefix: `${baseUrl}zh-Hans/docs/reference/`},
  cn: {from: /\]\(\.\.\/en\/([\w-]+)\.md(#[^)]*)?\)/g, prefix: `${baseUrl}docs/reference/`},
};

function rewriteCrossLocaleLinks(markdown, lang) {
  const {from, prefix} = crossLocaleLinks[lang];
  return markdown.replace(from, (_match, name, anchor) => `](${prefix}${name}${anchor || ''})`);
}

function copyDir(source, target, lang) {
  ensureDir(target);
  for (const entry of fs.readdirSync(source, {withFileTypes: true})) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath, lang);
    } else if (lang && entry.name.endsWith('.md')) {
      fs.writeFileSync(targetPath, rewriteCrossLocaleLinks(fs.readFileSync(sourcePath, 'utf8'), lang));
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
}

function writeCategoryJson(filePath, label) {
  fs.writeFileSync(
    filePath,
    `${JSON.stringify(
      {
        label,
        position: 1,
        collapsed: false,
      },
      null,
      2
    )}\n`
  );
}

function main() {
  assertExists(sourceRepoRoot, 'open-ace source repository');
  assertExists(docsRoot, 'open-ace docs directory');
  resetDir(englishTarget);
  resetDir(chineseTarget);

  copyDir(englishSource, englishTarget, 'en');
  copyDir(chineseSource, chineseTarget, 'cn');

  writeCategoryJson(englishCategoryFile, 'Reference');
  writeCategoryJson(chineseCategoryFile, '参考文档');

  ensureDir(staticImgRoot);
  fs.copyFileSync(path.join(imagesSource, 'logo.svg'), path.join(staticImgRoot, 'logo.svg'));
  fs.copyFileSync(path.join(imagesSource, 'logo.png'), path.join(staticImgRoot, 'social-card.png'));
}

main();
