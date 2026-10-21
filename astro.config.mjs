// @ts-check
import { defineConfig } from 'astro/config';

// DEPLOY_BASE: '/idea-alliance' khi deploy GitHub Pages dạng project site,
// để trống (hoặc không đặt) khi chạy root domain / custom domain / Cloudflare Pages.
const raw = (process.env.DEPLOY_BASE || '').replace(/^.*[/]([^/]+)$/, '$1');
const base = raw ? '/' + raw : '/';

export default defineConfig({
  site: process.env.DEPLOY_SITE || 'https://hieudamsau.github.io',
  base,
  redirects: { '/bai-viet': '/tin-tuc/trong-cay-xanh-chua-lanh-tam-hon', '/idea-hrds': '/economy' },
});
