// Hậu xử lý sau build: prefix các đường dẫn tuyệt đối (href/src="/...")
// bằng DEPLOY_BASE khi deploy dưới subpath (GitHub Pages project site).
// Không đặt DEPLOY_BASE => không làm gì (deploy root domain).
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.DEPLOY_BASE || '').replace(/\/$/, '');
if (!base) { console.log('fix-base: DEPLOY_BASE trống — bỏ qua'); process.exit(0); }

const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
});

let n = 0;
for (const file of walk('dist')) {
  const src = readFileSync(file, 'utf8');
  // chỉ prefix đường dẫn nội bộ bắt đầu bằng "/" (không phải "//" hay đã có base)
  const out = src.replace(/(href|src)="\/(?!\/)/g, (_, attr) =>
    `${attr}="${base}/`);
  if (out !== src) { writeFileSync(file, out); n++; }
}
console.log(`fix-base: đã prefix ${base} cho ${n} file HTML`);
