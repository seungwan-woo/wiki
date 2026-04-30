# Wiki

AI/ML research wiki published with VitePress.

Only Markdown files under `/home/wsw/wiki/public` are published to the web. Root-level and private working notes remain in the vault/repository but are excluded from the VitePress source tree.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Publishing rule

- Public web content: `/home/wsw/wiki/public/**`
- Private/internal content: everything outside `public/`
- GitHub Pages URL: `https://seungwan-woo.github.io/wiki/`

## Notes

- Wiki path: `/home/wsw/wiki`
- Hermes env keys: `WIKI_PATH` and `OBSIDIAN_VAULT_PATH`
- GitHub Pages deployment uses `BASE_PATH=/${repo}/` from the workflow.
