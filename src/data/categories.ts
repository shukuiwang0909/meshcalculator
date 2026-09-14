export interface Category {
  key: string;
  en: string;
  zh: string;
  productEn: string;
  productZh: string;
}

// Directory category taxonomy — keys match factories.json categories
// and the site's product guide pages 1:1.
export const CATEGORIES: Category[] = [
  {
    key: "stainless-steel-wire-mesh",
    en: "Stainless Steel Woven Mesh",
    zh: "不锈钢编织网",
    productEn: "/products/stainless-steel-wire-mesh/",
    productZh: "/zh/products/stainless-steel-wire-mesh/",
  },
  {
    key: "welded-wire-mesh",
    en: "Welded Wire Mesh",
    zh: "焊接丝网",
    productEn: "/products/welded-wire-mesh/",
    productZh: "/zh/products/welded-wire-mesh/",
  },
  {
    key: "wire-mesh-fence-panels",
    en: "Wire Mesh Fence Panels",
    zh: "网片护栏",
    productEn: "/products/wire-mesh-fence-panels/",
    productZh: "/zh/products/wire-mesh-fence-panels/",
  },
  {
    key: "chain-link-fence",
    en: "Chain Link Fence",
    zh: "勾花网护栏",
    productEn: "/products/chain-link-fence/",
    productZh: "/zh/products/chain-link-fence/",
  },
  {
    key: "gabion-baskets",
    en: "Gabion Baskets",
    zh: "石笼网箱",
    productEn: "/products/gabion-baskets/",
    productZh: "/zh/products/gabion-baskets/",
  },
  {
    key: "hexagonal-wire-mesh",
    en: "Hexagonal Wire Mesh",
    zh: "六角网",
    productEn: "/products/hexagonal-wire-mesh/",
    productZh: "/zh/products/hexagonal-wire-mesh/",
  },
  {
    key: "expanded-metal",
    en: "Expanded Metal",
    zh: "扩张网",
    productEn: "/products/expanded-metal/",
    productZh: "/zh/products/expanded-metal/",
  },
  {
    key: "perforated-metal",
    en: "Perforated Metal",
    zh: "冲孔板",
    productEn: "/products/perforated-metal/",
    productZh: "/zh/products/perforated-metal/",
  },
];
