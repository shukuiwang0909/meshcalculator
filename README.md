# MeshCalculator (meshcalculator.com)

安平丝网出海工具站。免费计算器 + 规格表 + 工厂目录 + 询盘撮合。

## 技术栈
Astro 5 + Tailwind CSS v4，纯静态输出（`dist/`），目标部署 Cloudflare Pages。

## 本地开发
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 输出到 dist/
npm run preview  # 预览构建产物
```

## 上线（域名注册完成后执行）

### 方式 A：Cloudflare Pages Git 集成（推荐，自动部署）
1. 把本仓库 push 到 GitHub（私有库即可）
2. Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git
3. 选仓库，Build command: `npm run build`，Output directory: `dist`
4. Pages → Custom domains → 添加 `meshcalculator.com` 和 `www.meshcalculator.com`

### 方式 B：Wrangler CLI（手动）
```bash
npm i -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=meshcalculator
```

## 上线后待办
- [ ] GA4：Base.astro 里替换 G-XXXXXXXXXX，同时注册 GSC
- [ ] 询盘表单：当前 data-netlify 在 CF Pages 不生效，需改用 Cloudflare Workers + MailChannels/Resend（二期）
- [ ] 工厂目录第一批真实数据
- [ ] sitemap 自动生成本身已内置（@astrojs/sitemap 未装，需加）

## 页面清单（13 页）
- `/` 首页（工具卡 + 采购流程 + FAQ）
- `/tools/woven-wire-mesh-weight-calculator/` 编织网重量计算器
- `/tools/welded-wire-mesh-weight-calculator/` 焊接网重量计算器
- `/tools/mesh-count-conversion/` 目数↔微米换算（含 ASTM E11 表）
- `/charts/mesh-size-chart/` 规格对照表
- `/anping-wire-mesh/` 安平产地内容页
- `/factories/` 工厂目录（占位）
- `/inquiry/` + `/inquiry/thanks/` 询盘表单
- `/privacy/` `/terms/` `/disclaimer/` `/404/`
