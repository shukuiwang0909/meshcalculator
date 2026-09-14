# MeshCalculator 问题清单（2026-09-12 分析，09-13 复核，09-14 P0 执行）

> 完成一项勾掉一项：`- [ ]` → `- [x]`
>
> **9-13 复核记录**：逐项对照代码核验，原 21 条全部仍然成立；新增 #15、#16、#24、#25 四条。
>
> **9-14 P0 执行记录**：P0 第一批（#1-#5、#16）+ 第二批（#6、#8、#15）已全部完成并构建验证（106 页、
> 30 个 FAQPage、全站 335 个内部链接扫描通过）。执行中的新发现：
> - **zh/blog/gabion-baskets-buying-guide.astro 自创建起就是残缺的**（git 首个提交即断在第 281 行，
>   线上页面少了半个 FAQ + CTA + 相关阅读）——已按 EN 版重建并补 FAQPage。
> - node_modules 曾损坏（is-docker 缺失），已清重装；package-lock.json 依然缺席（#12 仍未解决）。
> - 待人工操作：~~Cloudflare Email Routing 开 inquiry@ 邮箱~~ ✅ 9-14 已开通并测试收信成功、
>   Formspree 登录确认收件（#7）、Worker 部署（#8 配套，见 worker/README.md）、git commit + 推送触发云端重建。

## 🔴 P0 — 直接影响 SEO 和收入，立即修

- [x] **1. 全站无 hreflang** ✅ 9-14
  - Base.astro head 统一输出 en/zh/x-default；仅页面存在双语版本时成对输出（import.meta.glob 构建期枚举真实路由）
- [x] **2. 全站无 canonical** ✅ 9-14
  - Base.astro head 全站输出 canonical
- [x] **3. 无任何 JSON-LD 结构化数据** ✅ 9-14
  - 全站 @graph：Organization + WebSite；子页加 BreadcrumbList（URL 段派生，末级用页面 title）
  - 30 篇博客（24 EN + 6 ZH）补 FAQPage（新组件 src/components/FaqJsonLd.astro）
- [x] **4. 语言切换器死链** ✅ 9-14
  - 无译文页面不再生成切换链接（渲染为纯文本提示），18 个死链消除
- [x] **5. Base.astro 中文页链接漏判** ✅ 9-14
  - 导航 Blog、Get Quote（桌面+移动菜单）、页脚 3 个法律链接全部 zh 感知
  - 附带修复：zh/inquiry.astro 页内 terms/privacy 链接、表单 _next 跳英文感谢页
- [x] **6. 无直接联系方式** ✅ 9-14（邮箱已开通测试通过）
  - 页脚新增 Contact 列（全站 mailto:inquiry@meshcalculator.com）；inquiry 页（EN+ZH）加邮件备选入口 + 24h 响应承诺
  - Cloudflare Email Routing `inquiry@meshcalculator.com` → 常用邮箱，9-14 测试收信成功
- [x] **7. 确认 Formspree 收件邮箱** ✅ 9-14 测试通过
  - 端点 formspree.io/f/xnpqlpoj；线上真实提交一单，询盘成功落进常用邮箱（与 Email Routing 同一收件箱）
- [x] **8. /go/ 追踪跳转 + UTM** ✅ 9-14（代码就绪，部署待 #10 前完成即可）
  - worker/go-redirect.js（白名单 302 + UTM + 可选 GA4 factory_click 服务端事件）+ worker/README.md 部署文档

## 🟠 P1 — 战略与内容问题，本月内解决

- [x] **9. 关键词自相残杀** ✅ 9-14 完成：明确分工（保留 5 页，不重写正文）
  - `/anping-wire-mesh/` → 锁 "anping wire mesh" 核心产地词（Capital & Sourcing Hub）
  - `/wire-mesh-hebei/` → 锁 "wire mesh hebei" 省级词（Anping & Beyond — Regional Factory Guide）
  - `/blog/anping-wire-mesh-cluster` → 锁信息型长尾（cluster/industry/history："The Anping Wire Mesh Cluster: How One County Makes 60%..."）
  - `/blog/hebei-wire-mesh-cluster-guide` → 锁采购意图长尾（"Sourcing Wire Mesh From Hebei: A Buyer's Cluster Guide"）
  - `/blog/why-anping-wire-mesh-is-cheap` → 锁价格长尾（"Why Is Anping Wire Mesh So Cheap? Prices & Cost Traps"）
  - 5 页 title/description 差异化 + 博客索引页硬编码标题同步；互链锚文本原本已合理，未动
  - 效果观察：4-6 周后看 GSC 各页查询词是否仍大面积重叠
- [x] **10. 工厂目录空壳** ✅ 9-14 架构完成并上线（数据待录入）
  - 数据层 `src/data/factories.json`（schema 见 `src/data/README.md`；`factories.example.json` 仅供本地测试，线上为空数组不放假数据）
  - 列表页（EN/ZH）：品类筛选（vanilla JS 渐进增强）+ ItemList JSON-LD + 空态；详情页 `/factories/[slug]/`（EN/ZH）：双 CTA（询盘表单工厂名预填 + `/go/` 追踪直链）、Organization JSON-LD、Listed/Verified 分层展示
  - 新增 Base.astro `forceTranslation` prop 解决动态路由双语切换；修复 ZH-only 页面 x-default 指向不存在 EN 地址的问题
  - ⏳ 待办：用户提供 10-15 家真实工厂 → 导入数据 + 同步 worker ALLOWLIST + 部署 Worker
- [x] **11. 中文站去留决策** ✅ 9-14 已定：选项 B
  - **决策：改造为面向安平工厂的招商/认领页**（不卖排名，与 #10 目录收费模式联动）
  - PRD 原定位"一期不做中文站"，实际已有 44 页；保留全部收录资产，内容转向服务国内工厂客户
  - 招商页 `/zh/for-factories/` 已上线（权益对比表 / 认领流程 / FAQ+FAQPage）；ZH 工厂列表页已加入口横幅；全站内容招商化重写留待后续迭代
- [ ] **12. package-lock.json 被删**
  - 构建不可复现，根因未查明；9-14 重装依赖时再次踩到（node_modules 损坏、is-docker 缺失）
  - 建议：本地 `npm install` 生成 lock 后提交，或查明 Cloudflare 构建报错根因后再生成
- [x] **13. GA4 埋点未实现** ✅ 9-14 完成
  - Base.astro 统一事件脚本：tool_start（工具页首次输入）/ tool_complete（结果元素变异观察，覆盖全部 7 工具的异构 result ID）/ chart_view / inquiry_submit / inquiry_success（感谢页）/ factory_click（/go/ 链接点击，带 factory_key）
  - 零工具页改动，新增工具自动生效；服务端镜像在 worker/go-redirect.js
  - ⏳ 待办：GA4 后台创建 Measurement Protocol API Secret（部署 Worker 时配置）
- [x] **14. 联系方式分层体系** ✅ 9-14 展示层落地（计费随真实数据开通）
  - Listed（免费：官网链接带追踪，不显示直邮）→ Verified（收费：完整联系方式 + 徽章 + 验厂说明）
  - 红线已写进代码和招商页文案：排序权重不变，不卖排名
  - 待数据录入后：Verified 定价 + 开通付费 + 向工厂提供点击追踪报表
- [x] **15.【9-13 新增】6 个硬编码站内死链（404）** ✅ 9-14
  - 2 个 zh 博客文件的 6 处链接改指存在的 EN 译文（加 hreflang="en" + "（英文）"提示）；全站 335 链接扫描确认零死链
- [x] **16.【9-13 新增】全站无 Open Graph / Twitter Card meta** ✅ 9-14
  - Base.astro 输出 og:type/site_name/title/description/url/locale(+alternate) + twitter:card/title/description
  - 新增 public/og-image.png（1200×630，scripts/generate-og-image.py 可重生成）；博客页 og:type=article

## 🟡 P2 — 工程优化，有余力再做

- [ ] **17. EN/ZH 逐行镜像维护**：2.7 万行 astro 约一半重复结构，改 Content Collections 单模板双文案（工作量大）
- [ ] **18. Google Fonts 加载过多**：3 个家族含仅中文站需要的 Noto Sans SC，渲染阻塞，按语言拆分（Base.astro:53）
- [ ] **19. FOB 计算器依赖第三方汇率 API**：open.er-api.com 无缓存无降级（tools/fob-price-calculator.astro:145；ZH 镜像同样裸奔 zh/tools/fob-price-calculator.astro:89）
- [ ] **20. 死文件与残留**：`src/i18n/zh-shared.json` 无人引用；`.wrangler/tmp` 残留（空目录）；**`.wrangler/` 未进 .gitignore**，Wrangler 本地残留可能误入版本库；i18n JSON 只用了一半
- [ ] **21. README 严重过期**：sitemap 已装、GA4 已换真 ID（G-RSYRN427KH）、页面 106 页非 13 页、实际用 Formspree 非 Netlify（README:33-38 多处失实）
- [ ] **22. IndexNow 半成品**：key 文件已放 public/（02cda008af5df8b0e19b9d4e4dbee773.txt），无提交脚本/机制（全仓 grep 仅 ISSUES.md 提及）
- [ ] **23. 小瑕疵**：Get Quote 按钮硬编码 `style="color:#07090c"` —— 9-13 复核：已蔓延至 17 文件 26 处，修复时应提取为 accent 文本色 token 统一替换；全站零图片（快但内容页无配图）
- [ ] **24.【9-13 新增】`/inquiry/thanks/`（EN+ZH）无 noindex 且进了 sitemap**
  - dist/sitemap-0.xml 包含两个 thanks 页，薄转化页可被 Google 索引；404 页已被 sitemap 自动排除
- [ ] **25.【9-13 新增】本地 dist/ 过期**
  - 9-14 已重新构建，本条转为常规提醒：验证前务必先 `npm run build`

---

## 执行计划备忘

1. ~~**P0 第一批**（改 Base.astro 为主，一次搞定）：#1-#5，顺手带上 #16~~ ✅ 9-14 完成
2. ~~**P0 第二批**（半天）：#6 联系方式、#7 Formspree 确认、#8 /go/ 跳转；#15 硬编码死链~~ ✅ 9-14 完成（#7 待人工登录确认）
3. ~~**本周重点**：#10 工厂目录（前置依赖：#11 中文站决策 + 收集 10 家工厂数据 + 部署 #8 Worker）~~ ✅ 9-14 架构上线；剩：真实工厂数据 + Worker 部署（随数据）

## 已确认的市场结论（备忘）

- 丝网出口 190+ 国家，前三大市场：东盟、欧盟、中东；其次美国、俄罗斯、非洲
- 语言策略：英语覆盖 80%+ 目标买家，暂不加新语言；如要加，优先级 西班牙语 > 俄语 > 阿拉伯语
- 当前重点是把英语站 SEO 硬伤修好，比加语言划算
