## 目標

解決 (1) 頂部導覽列在中小視窗擠成兩行直書、(6) 整頁在手機（375–414px）排版破版的問題。只動前端樣式與結構，不改文案、不改商業邏輯。

## 變更內容

### 1. 導覽列改為「桌機展開 / 行動裝置漢堡選單」

- 斷點：`lg`（≥1024px）顯示完整橫向選單；以下收成漢堡按鈕。
  - 目前在 818px 就破版，原因是 9 個項目 + CTA 同列硬塞，改用 `lg` 才安全。
- 漢堡選單使用既有的 shadcn `Sheet`（右側滑出），項目縱向排列，點擊後 `setOpen(false)` 並 smooth scroll 到對應 `#anchor`。
- 「立即報名」CTA：
  - 桌機：保留在導覽列右側膠囊按鈕。
  - 手機：固定顯示在漢堡按鈕旁（縮小版），確保隨時可點。
- Logo「地球守衛隊」在窄螢幕用 `truncate` + `text-base`，桌機放大。
- 採用 `grid-cols-[minmax(0,1fr)_auto] lg:flex` 的安全列佈局，避免 logo 與按鈕互相擠壓。

### 2. 全頁 RWD 修正

逐區段檢查並調整 padding、字級、堆疊方式：

- **Hero 區**
  - 主標 `text-5xl sm:text-7xl lg:text-8xl`（目前太大會溢出窄螢幕）。
  - 副標、說明文字同步降一級。
  - 兩顆 CTA 在手機改為 `flex-col w-full`，桌機 `sm:flex-row sm:w-auto`。
  - 標籤 chip（「大橋國小 × 薇閣中學…」）加 `flex-wrap` 與 `text-xs sm:text-sm`。

- **海報輪播 / 倒數**
  - 輪播容器寬度改 `w-full`，左右箭頭在手機縮小並貼邊（`-left-2 sm:-left-4`）。
  - 倒數計時格子在手機改 `grid-cols-4 gap-2`、數字 `text-2xl sm:text-4xl`，避免破版。
  - QR code 區塊在手機 `max-w-[60vw]` 置中。

- **四大任務 / 流程 / FAQ / 聯絡資訊等 section**
  - 統一外層 `px-4 sm:px-6 lg:px-8`、`py-12 sm:py-20`。
  - 多欄 grid 統一改 `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`（依該區原欄數調整）。
  - 卡片內標題 `text-lg sm:text-xl`，內文 `text-sm sm:text-base`。

- **Footer / 聯絡資訊**
  - `flex-col md:flex-row`，間距 `gap-6`。

### 3. 驗證

- 用 `browser--set_viewport_size` 在 375、414、768、1024、1440 各截圖確認：
  - 導覽列在 <1024 顯示漢堡、≥1024 顯示完整列。
  - 沒有水平捲軸、文字不溢出、CTA 可點。

## 不在此次範圍

- 文案、配色、倒數金光邏輯、人物圖、SEO、Hero 與海報重複的取捨（先前選項 2/3/4/5）—等這次完成後若你想做再開新一輪。
