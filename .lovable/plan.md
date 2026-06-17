# 加入分享按鈕

## 目標
讓使用者一鍵把營隊頁面分享出去（手機叫出系統分享面板、桌機自動複製連結並顯示提示）。

## 修改範圍
僅修改 `src/routes/index.tsx` 的導覽列區塊（lines 184–217 附近）。

## 實作內容

1. **新增 `handleShare` 函式**
   - 準備分享資料：`title` = 「地球守衛隊・守護任務啟動」、`text` = 簡短一句營隊介紹、`url` = `window.location.href`。
   - 若 `navigator.share` 存在：呼叫 `navigator.share({ title, text, url })`，捕捉使用者取消（`AbortError`）不報錯。
   - 否則 fallback：`navigator.clipboard.writeText(url)`，並用 `sonner` 的 `toast.success("已複製連結！")` 顯示提示。

2. **導覽列右側加入分享圖示按鈕**
   - 位置：桌機 (`lg:flex`) 的「立即報名」按鈕左邊；手機 (`lg:hidden`) 的漢堡選單左邊也放一個。
   - 樣式：`variant="ghost"` `size="icon"`，搭配 lucide `Share2` icon，視覺與現有導覽列一致（霓虹邊框 hover 效果）。
   - `aria-label="分享此頁"`。

3. **匯入**
   - 在檔案頂端補上 `import { Share2 } from "lucide-react"`（若已 import lucide 則加進現有 list）。
   - 確認 `toast` 已從 `sonner` import；若無則新增。

## 不在這次範圍
- 不額外加 LINE / FB 專屬按鈕
- 不改動其他區塊或文案
- 不調整 SEO meta（Web Share 會用目前 og:title / og:description）

## 驗證
- 桌機 preview：點擊 → 顯示「已複製連結！」toast。
- 手機 viewport (375px)：按鈕出現在漢堡左側，點擊應觸發 `navigator.share`（preview 環境可能 fallback 到複製）。
