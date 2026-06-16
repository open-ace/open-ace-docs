# Open ACE Docs

This repository hosts the standalone Docusaurus documentation and project site for Open ACE.

## Relationship to the main repo

- Product code lives in `open-ace/open-ace`
- Product documentation source stays in `open-ace/open-ace/docs`
- This repo builds and publishes the docs site by syncing content from the main repo during CI

## Local development

1. Clone both repositories side by side:

```bash
git clone https://github.com/open-ace/open-ace.git
git clone https://github.com/open-ace/open-ace-docs.git
```

2. Start the docs site:

```bash
cd open-ace-docs
OPEN_ACE_SOURCE_DIR=../open-ace npm ci
OPEN_ACE_SOURCE_DIR=../open-ace npm run start
```

## Build

```bash
OPEN_ACE_SOURCE_DIR=../open-ace npm run build
```
