import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import flyerHero from "@/assets/flyer-hero.png";

const FORM_URL = "https://forms.gle/GymxqtmTtdAQgboj8";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "地球守衛隊 ‧ 大橋國小 × 薇閣中學 2026 暑期一日營隊" },
      { name: "description", content: "2026/8/26 一日營隊：生態探索、綠能任務、歷史解謎、科學競賽。加入地球守衛隊，一起守護我們的家園！" },
      { property: "og:title", content: "地球守衛隊 ‧ 2026 暑期一日營隊" },
      { property: "og:description", content: "大橋國小 × 薇閣中學 ‧ 四大主題課程 ‧ 8/26 等你來守護地球" },
    ],
  }),
  component: Index,
});

const missions = [
  {
    no: "01",
    tag: "生態任務 🌿",
    title: "生態池大尋寶",
    en: "Ecosystem Quest",
    desc: "化身校園特派調查員，從教室「命運開卡包」解鎖微觀線索，前進校園生態池現地搜查，最後回到教室發表圖鑑、領取麥香回血。",
  },
  {
    no: "02",
    tag: "歷史解謎 🏮",
    title: "認識大稻埕",
    en: "Discover Dadaocheng",
    desc: "從清領、日治到國府時期，走過淡水河淤積、文化協會、年貨大街。透過簡報與遊戲，認識家鄉曾經的輝煌歲月。",
  },
  {
    no: "03",
    tag: "科學競賽 ⚡",
    title: "電動刷刷車",
    en: "Reaction Force Lab",
    desc: "親手組裝馬達與扇葉，體驗「作用與反作用力」如何讓刷刷車向前衝，完成後立刻來一場小組競速賽。",
  },
  {
    no: "04",
    tag: "綠能任務 🛡️",
    title: "碳索未來．綠能防禦基地",
    en: "SDG7 Tower Defense",
    desc: "對接聯合國 SDG 7 潔淨能源，透過《能源塔防戰》桌遊，在太陽能、風能與化石燃料之間做出選擇，培養永續決策力。",
  },
];

const schedule = [
  ["09:00", "學員報到"],
  ["09:30", "開場小劇場 ‧ 任務發佈"],
  ["09:50", "小隊輔破冰時間"],
  ["10:20", "小組課程 A"],
  ["11:10", "小組課程 B"],
  ["11:50", "用餐 ‧ 午休"],
  ["13:10", "小組課程 C"],
  ["14:00", "小組課程 D"],
  ["14:50", "全員逃走中 大團體戰"],
  ["15:40", "頒獎 ‧ 大合照"],
  ["16:00", "賦歸"],
];

const faqs = [
  {
    q: "誰可以報名？",
    a: "大橋國小三、四年級同學，限額 30 名。超額將以抽籤方式隨機錄取。",
  },
  {
    q: "怎麼報名？",
    a: "提供兩種報名方式：(1) 紙本報名表將由各班級發放，帶回給家長填寫後於截止日前繳回班級導師；(2) 也可直接掃描海報上的 QR Code 或透過線上報名表單完成報名。",
  },
  {
    q: "需要自備什麼？",
    a: "輕便服裝、水壺與環保餐具。其他課程材料（馬達、桌遊、卡包等）皆由主辦單位準備。",
  },
  {
    q: "放學如何接送？",
    a: "16:00 自行返家，搭乘捷運者由隊輔整隊帶至大橋頭捷運站；家長接送緩衝時間為 16:00–16:30。",
  },
];

function Index() {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Missions />
      <Schedule />
      <Apply />
      <FAQ />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-xl font-black text-gradient">地球守衛隊</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">守護任務啟動</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition">關於營隊</a>
          <a href="#missions" className="hover:text-foreground transition">四大任務</a>
          <a href="#schedule" className="hover:text-foreground transition">當日流程</a>
          <a href="#apply" className="hover:text-foreground transition">報名資訊</a>
        </nav>
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition shadow-lg shadow-primary/30"
        >
          立即報名
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative star-field min-h-screen pt-32 pb-20 px-5">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="inline-block rounded-full glass px-4 py-1.5 text-xs tracking-wider">
            大橋國小 × 薇閣中學 ‧ 2026 暑期一日營隊
          </p>
          <h1 className="mt-6 text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] text-gradient">
            地球守衛隊
          </h1>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            守護任務 ‧ 正式啟動
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground max-w-lg">
            地球正在發出求救訊號。
            <br />
            你，是被選召的小小科學家。
            <br />
            穿上守衛隊制服，用知識與行動，一起把家園守護下來！
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition"
            >
              立即線上報名 →
            </a>
            <a
              href="#missions"
              className="rounded-full glass px-6 py-3 text-sm font-bold hover:bg-white/10 transition"
            >
              探索四大任務
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
            <Stat icon="📅" label="活動日期" big="8/26" sub="2026" />
            <Stat icon="⏰" label="活動時間" big="9–16" sub="一整天" />
            <Stat icon="📣" label="招生名額" big="30" sub="三、四年級" />
          </div>
        </div>
        <div className="relative animate-float">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky/40 to-mint/30 blur-3xl" />
          <img
            src={flyerHero}
            alt="地球守衛隊 活動主視覺"
            className="relative rounded-3xl shadow-2xl ring-1 ring-white/20"
          />
          <div className="absolute -bottom-4 left-4 glass rounded-full px-4 py-2 text-xs font-bold">
            ✦ 8/26 倒數中
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, label, big, sub }: { icon: string; label: string; big: string; sub: string }) {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="text-2xl">{icon}</div>
      <div className="mt-2 text-[11px] text-muted-foreground">{label}</div>
      <div className="text-2xl font-black text-gradient leading-tight">{big}</div>
      <div className="text-[11px] text-muted-foreground">{sub}</div>
    </div>
  );
}

function Marquee() {
  const items = ["生態探索", "綠能任務", "歷史解謎", "科學競賽", "全員逃走中", "守護地球"];
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className="border-y border-white/10 bg-white/5 py-5 overflow-hidden">
      <div className="flex w-max animate-marquee gap-8 text-xl font-bold whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-muted-foreground">
            {t} <span className="text-primary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="px-5 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm tracking-[0.3em] text-primary">ABOUT</p>
        <h2 className="mt-3 text-4xl sm:text-5xl font-black">
          一場屬於 <span className="text-gradient">地球守衛者</span> 的真實冒險
        </h2>
        <p className="mt-6 text-lg leading-loose text-muted-foreground">
          孩子們化身為「地球守衛隊」，從校園生態池到大稻埕街角，從馬達電路到綠能桌遊，
          以一整天的任務挑戰，學會觀察、合作與決策。
        </p>
        <p className="mt-3 text-lg leading-loose text-muted-foreground">
          課程對接聯合國 SDGs 永續發展目標，在遊戲中累積經驗，
          培養跨領域的視野，把守護地球變成日常的能力。
        </p>
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            ["擴展知識", "認識學校不會教的事"],
            ["發現生活", "看見被忽略的日常之美"],
            ["團隊合作", "在競賽中學習溝通表達"],
          ].map(([t, d]) => (
            <div key={t} className="glass rounded-2xl p-6 text-left">
              <div className="text-xl font-bold text-gradient">{t}</div>
              <div className="mt-2 text-sm text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Missions() {
  return (
    <section id="missions" className="px-5 py-24 bg-white/[0.03]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">MISSIONS</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black">四大守護任務</h2>
          <p className="mt-4 text-muted-foreground">
            每位學員都會輪流完成四堂主題課程，集滿經驗後迎戰「全員逃走中」最終戰。
          </p>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {missions.map((m) => (
            <article key={m.no} className="glass rounded-3xl p-8 hover:-translate-y-1 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-muted-foreground">任務 {m.no}</span>
                <span className="text-xs rounded-full bg-primary/20 px-3 py-1 text-primary">{m.tag}</span>
              </div>
              <h3 className="mt-4 text-3xl font-black text-gradient">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground italic">{m.en}</p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section id="schedule" className="px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">SCHEDULE</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black">當日守護時程</h2>
          <p className="mt-4 text-muted-foreground">
            分為 A、B、C、D 四組，輪流跑遍四堂課程，最後一起進行「全員逃走中」大團體戰。
          </p>
        </div>
        <ol className="mt-12 relative border-l-2 border-primary/40 pl-6 space-y-6">
          {schedule.map(([time, label]) => (
            <li key={time} className="relative">
              <span className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
              <div className="glass rounded-xl px-5 py-4 flex items-baseline gap-5">
                <span className="text-lg font-black text-gradient w-20">{time}</span>
                <span className="text-base">{label}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Apply() {
  const items = [
    ["活動日期", "2026 / 08 / 26（三）"],
    ["活動時間", "09:00 – 16:00"],
    ["活動地點", "台北市大同區 ‧ 大橋國小"],
    ["招生對象", "大橋國小三、四年級 ‧ 限 30 名"],
    ["報名方式", "紙本報名表（班級發放）／線上報名表單"],
    ["主辦單位", "薇閣高中 一年丙班 ‧ 一年己班"],
  ];
  return (
    <section id="apply" className="px-5 py-24 bg-white/[0.03]">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">APPLY</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black">報名資訊</h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          {items.map(([t, d]) => (
            <div key={t} className="glass rounded-2xl p-6">
              <div className="text-xs tracking-widest text-primary">{t}</div>
              <div className="mt-2 text-lg font-bold">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-90 transition"
          >
            前往線上報名表單 ↗
          </a>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">FAQ</p>
          <h3 className="mt-3 text-4xl sm:text-5xl font-black">常見問題</h3>
        </div>
        <div className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="glass rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left text-base font-bold"
              >
                <span>{f.q}</span>
                <span className="text-primary text-xl">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-5 py-10 border-t border-white/10 text-center text-xs text-muted-foreground">
      © 2026 地球守衛隊 ‧ 大橋國小 × 薇閣中學 暑期營隊
    </footer>
  );
}
