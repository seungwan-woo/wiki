import { defineConfig } from 'vitepress';
import fs from 'node:fs';
import path from 'node:path';

const workspaceRoot = process.cwd();
const publicRoot = path.join(workspaceRoot, 'public');
const base = process.env.BASE_PATH ?? '/';

const ignoredDirs = new Set([
  '.git',
  '.github',
  '.obsidian',
  '.vitepress',
  'node_modules',
]);

function titleFromMarkdown(filePath: string): string {
  const text = fs.readFileSync(filePath, 'utf8');
  const h1 = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
  if (h1) return h1;
  return path.basename(filePath, '.md')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function linkFor(filePath: string): string {
  const rel = path.relative(publicRoot, filePath).replace(/\\/g, '/').replace(/\.md$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
}

function collectMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) files.push(...collectMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'README.md') {
      files.push(full);
    }
  }
  return files.sort((a, b) => a.localeCompare(b));
}

function sidebarItems() {
  const files = collectMarkdownFiles(publicRoot).filter((file) => path.basename(file) !== 'index.md');
  return files.map((file) => ({ text: titleFromMarkdown(file), link: linkFor(file) }));
}

function slugifyWikiTarget(target: string): string {
  return target
    .trim()
    .replace(/\.md$/i, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default defineConfig({
  title: 'Wiki',
  description: 'Public AI/ML research wiki',
  srcDir: 'public',
  base,
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Test', link: '/test-publish' },
    ],
    sidebar: [
      { text: 'Public Wiki', items: sidebarItems() },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
    },
    socialLinks: [],
  },
  markdown: {
    config(md) {
      md.inline.ruler.before('emphasis', 'wikilink', (state, silent) => {
        const start = state.pos;
        const marker = state.src.slice(start, start + 2);
        if (marker !== '[[') return false;
        const end = state.src.indexOf(']]', start + 2);
        if (end < 0) return false;
        if (!silent) {
          const raw = state.src.slice(start + 2, end);
          const [targetPart, labelPart] = raw.split('|');
          const target = slugifyWikiTarget(targetPart);
          const label = (labelPart ?? targetPart).trim();
          const tokenOpen = state.push('link_open', 'a', 1);
          tokenOpen.attrs = [['href', `${base}${target}`.replace(/\/+/g, '/')]];
          const tokenText = state.push('text', '', 0);
          tokenText.content = label;
          state.push('link_close', 'a', -1);
        }
        state.pos = end + 2;
        return true;
      });
    },
  },
});
