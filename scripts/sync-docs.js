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

function copyDir(source, target) {
  ensureDir(target);
  for (const entry of fs.readdirSync(source, {withFileTypes: true})) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);
    if (entry.isDirectory()) {
      copyDir(sourcePath, targetPath);
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

  copyDir(englishSource, englishTarget);
  copyDir(chineseSource, chineseTarget);

  writeCategoryJson(englishCategoryFile, 'Reference');
  writeCategoryJson(chineseCategoryFile, '参考文档');

  ensureDir(staticImgRoot);
  fs.copyFileSync(path.join(imagesSource, 'logo.svg'), path.join(staticImgRoot, 'logo.svg'));
  fs.copyFileSync(path.join(imagesSource, 'logo.png'), path.join(staticImgRoot, 'social-card.png'));
}

main();
