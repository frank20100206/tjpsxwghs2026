# 分享預覽 / SEO 強化

讓使用者貼到 LINE / Facebook / Threads 時，預覽卡片顯示正確的標題、描述、封面圖，並讓 Google 認得這是一場活動。

## 修改檔案

### 1. `src/routes/__root.tsx`（清理通用層）

- 移除 `og:image` 與 `twitter:image`（root 的 head 會被合併到每個子路由，會覆蓋 leaf 的 og:image，依規範只能在 leaf 設定）
- 移除模板殘留：`{ name: "author", content: "Lovable" }`、`{ name: "twitter:site", content: "@Lovable" }`
- root 預設 `title` / `description` 改成與首頁一致的長版（作為其他未來新增路由的 fallback）
- `twitter:card` 由 `summary` 改為 `summary_large_image`
- 補上 `{ property: "og:site_name", content: "地球守衛隊 2026" }`、`{ property: "og:locale", content: "zh_TW" }`

### 2. `src/routes/index.tsx`（leaf 補齊）

在現有 `head()` 的 `meta` 補上：
- `{ property: "og:image", content: "<原本 root 的 R2 預覽圖網址>" }`
- `{ name: "twitter:image", content: "<同上>" }`
- `{ property: "og:url", content: "https://tjpsxwghs2026.lovable.app/" }`
- `{ name: "twitter:title" / "twitter:description" }` 對齊 og 內容

加上 `links`：
- `{ rel: "canonical", href: "https://tjpsxwghs2026.lovable.app/" }`

加上 `scripts`（JSON-LD `Event` 結構化資料）：
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "地球守衛隊・大橋國小 × 薇閣中學 2026 暑期一日營隊",
  "startDate": "2026-08-26T08:30:00+08:00",
  "endDate":   "2026-08-26T16:00:00+08:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": { "@type": "Place", "name": "臺北市大橋國小" },
  "organizer": [
    { "@type": "Organization", "name": "臺北市大橋國民小學" },
    { "@type": "Organization", "name": "薇閣中學" }
  ],
  "image": "<同 og:image>",
  "description": "2026/8/26 一日營隊：生態探索、綠能任務、歷史解謎、科學競賽。",
  "url": "https://tjpsxwghs2026.lovable.app/"
}
```

> 大橋國小詳細地址若需要請告知，我會補進 `location.address`（PostalAddress）。目前先填到 `name`。

## 不在這次範圍

- 不改任何內容文案 / 區塊樣式
- 不重新生成封面圖
- 不新增 sitemap.xml / robots.txt（待需要 SEO 收錄時再處理）

## 驗證

- build 通過
- 把 `https://tjpsxwghs2026.lovable.app/` 貼進 Facebook Sharing Debugger / LINE 分享測試，預覽應顯示新的標題、描述與封面
- 透過 Google Rich Results Test 檢查 Event 結構化資料是否被辨識

> 提醒：各平台會快取分享預覽，更新後通常要在 Facebook Debugger 點「Scrape Again」、LINE 重新貼一次才會刷新。
