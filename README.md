# MeshCalculator (meshcalculator.com)

安平丝网出海工具站：免费计算器 + 规格表 + 工厂目录 + 询盘撮合。英文站面向海外买家，中文站面向安平工厂（招商/收录）。

## 技术栈

Astro 5 + Tailwind CSS v4，纯静态输出（`dist/`），Cloudflare Pages 自动部署（Git 集成，push 即构建）。

## 本地开发

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/（107 页）
npm run preview
```

注意：`package-lock.json` 暂不提交（#12：曾导致 Cloudflare 构建失败，根因未查明）。

## 目录结构

```
src/
  layouts/Base.astro      全站布局：canonical/hreflang/OG/JSON-LD/GA4 事件/导航页脚
  components/FaqJsonLd    FAQPage 结构化数据组件
  pages/                  英文页（约 60 页）
  pages/zh/               中文页（约 45 页）
  pages/factories/        工厂目录详情（动态路由，数据驱动）
  data/                   工厂目录数据层（factories.json + schema 文档）
  i18n/                   en.json / zh.json（导航、页脚、首页文案）
worker/                   /go/ 点击追踪 Worker（Cloudflare，见 worker/README.md）
scripts/
  generate-og-image.py    生成 public/og-image.png（PIL）
  indexnow-submit.js      IndexNow 提交（node scripts/indexnow-submit.js）
```

## 已配置（不要重复 setup）

- **GA4**：G-RSYRN427KH，基础标签 + 转化事件（tool_start/tool_complete/chart_view/factory_click/inquiry_submit/inquiry_success）在 Base.astro
- **GSC**：google-site-verification 已在 Base.astro
- **Sitemap**：@astrojs/sitemap 自动生成，`/inquiry/thanks/` 已过滤
- **询盘表单**：Formspree（`formspree.io/f/xnpqlpoj`）→ 转发常用邮箱
- **邮箱**：`inquiry@meshcalculator.com`（Cloudflare Email Routing）
- **IndexNow**：key 文件在 `public/`，提交用 `node scripts/indexnow-submit.js`
- **Bing Webmaster**：✅ 已注册（9-15，经 GSC 导入免验证，sitemap 已自动导入）

## 内容/数据维护

- 新工厂录入：见 `src/data/README.md`（schema + 录入 checklist + Worker 白名单同步）
- 问题清单与优先级：`ISSUES.md`
- 博客发布计划：`BLOG-CALENDAR.md`

## 常用运维

```bash
npm run build && node scripts/indexnow-submit.js   # 发布后推送给 Bing/Yandex
python scripts/generate-og-image.py                # 品牌图变更后重新生成 OG 图
```
