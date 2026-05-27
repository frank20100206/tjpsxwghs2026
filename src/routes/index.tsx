import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import flyerHero from "@/assets/flyer-hero.png";

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target.getTime() - now.getTime());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

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
    a: "大橋國小 升三、升四、升五年級 同學，限額 30 名。超額將以抽籤方式隨機錄取。",
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
      <Escape />
      <Schedule />
      <Apply />
      <FAQ />
      <Footer />
      <BackToTop />
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
          <a href="#about" className="hover:text-foreground transition story-link">關於營隊</a>
          <a href="#missions" className="hover:text-foreground transition story-link">四大任務</a>
          <a href="#escape" className="hover:text-foreground transition story-link">全員逃走中</a>
          <a href="#schedule" className="hover:text-foreground transition story-link">當日流程</a>
          <a href="#apply" className="hover:text-foreground transition story-link">報名資訊</a>
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
            <Stat icon="📣" label="招生名額" big="30" sub="升三 / 四 / 五" />
          </div>
          <Countdown />
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
          {missions.map((m, i) => (
            <Reveal key={m.no} delay={i * 100}>
              <article className="group relative glass rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:ring-2 hover:ring-primary/60 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-between">
                  <span className="text-xs tracking-widest text-muted-foreground">任務 {m.no}</span>
                  <span className="text-xs rounded-full bg-primary/20 px-3 py-1 text-primary">{m.tag}</span>
                </div>
                <h3 className="relative mt-4 text-3xl font-black text-gradient group-hover:scale-105 origin-left transition-transform">{m.title}</h3>
                <p className="relative mt-1 text-sm text-muted-foreground italic">{m.en}</p>
                <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
                <div className="relative mt-6 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ✦ 任務啟動中
                </div>
              </article>
            </Reveal>
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
    ["招生對象", "大橋國小 升三 / 升四 / 升五年級 ‧ 限 30 名"],
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

function Countdown() {
  const { d, h, m, s } = useCountdown(new Date("2026-08-26T09:00:00+08:00"));
  const cells: [string, number][] = [
    ["DAYS", d],
    ["HRS", h],
    ["MIN", m],
    ["SEC", s],
  ];
  return (
    <div className="mt-6 glass rounded-2xl p-4 max-w-lg">
      <div className="text-[11px] tracking-[0.3em] text-primary mb-2">距離出任務還有</div>
      <div className="grid grid-cols-4 gap-2">
        {cells.map(([l, v]) => (
          <div key={l} className="text-center bg-white/5 rounded-xl py-3">
            <div className="text-2xl sm:text-3xl font-black text-gradient tabular-nums">
              {String(v).padStart(2, "0")}
            </div>
            <div className="text-[10px] text-muted-foreground tracking-widest">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const escapeRules = [
  {
    icon: "🏃",
    title: "獵人 vs 逃走者",
    desc: "全員逃走中改編自人氣節目！小隊輔扮演黑衣獵人，學員們是被通緝的逃走者，誰能撐到最後就是冠軍！",
  },
  {
    icon: "🪙",
    title: "任務金幣加碼",
    desc: "白天四大任務累積的金幣，可以在最終戰兌換護身符、增援、迷你雷達等道具，讓每一場任務都不浪費。",
  },
  {
    icon: "🧩",
    title: "突發解謎事件",
    desc: "校園各角落會出現任務卡，需要全隊合作解開謎題才能解鎖逃走路線，比的是腦力也是團隊默契。",
  },
  {
    icon: "🏆",
    title: "存活就是榮耀",
    desc: "撐到 15:30 響鈴的逃走者直接獲得「地球守衛隊精英徽章」，被抓到的學員則會回到觀察席擔任戰術指揮官。",
  },
];

function Escape() {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <section id="escape" className="relative px-5 py-24 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 30%, oklch(0.6 0.25 30 / 0.35), transparent 60%), radial-gradient(500px 280px at 80% 70%, oklch(0.7 0.2 90 / 0.3), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] text-primary">FINAL BATTLE</p>
            <h2 className="mt-3 text-4xl sm:text-6xl font-black">
              <span className="text-gradient">全員逃走中</span> 大團體戰
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              一整天的累積，在下午 14:50 化為一場全校級的追捕大冒險。
              黑衣獵人現身大橋國小，地球守衛隊員必須運用任務裡學到的觀察、合作與決策，
              撐過最後 50 分鐘，把地球守護到底！
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          {escapeRules.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className={`glass rounded-3xl p-7 h-full transition-all duration-300 cursor-pointer ${
                  hover === i ? "scale-[1.02] ring-2 ring-primary/60 shadow-2xl shadow-primary/20" : ""
                }`}
              >
                <div className={`text-5xl transition-transform duration-300 ${hover === i ? "scale-125 -rotate-6" : ""}`}>
                  {r.icon}
                </div>
                <h3 className="mt-4 text-2xl font-black text-gradient">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 glass rounded-3xl p-8 text-center">
            <div className="text-xs tracking-[0.3em] text-primary">RULE OF THUMB</div>
            <p className="mt-3 text-lg sm:text-xl font-bold leading-relaxed">
              「跑得快不一定贏，<span className="text-gradient">願意一起守護的人才會贏</span>。」
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              這場最終戰是為了讓孩子親身體會：任務裡學到的合作與判斷，才是真正的超能力。
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到頂端"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-primary text-primary-foreground font-black shadow-lg shadow-primary/40 transition-all hover:scale-110 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      ↑
    </button>
  );
}
