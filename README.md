# Wiki

AI/ML research wiki published with VitePress.

Only Markdown files under `public/` are published to the web. Root-level and private working notes remain in the local vault but are excluded from the VitePress source tree.

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

- Public web content: `public/**`
- Private/internal content: local vault content outside `public/`
- GitHub Pages URL: `https://seungwan-woo.github.io/wiki/`

## Notes

- Public source directory: `public/`
- GitHub Pages deployment uses `BASE_PATH=/${repo}/` from the workflow.
