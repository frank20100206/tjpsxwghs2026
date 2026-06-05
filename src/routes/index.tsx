import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import flyerHero from "@/assets/flyer-hero.png";
import characterBoy from "@/assets/character-boy.png";
import characterGirl from "@/assets/character-girl.png";
import escapeRunnerGirl from "@/assets/escape-runner-girl.png";
import escapeRunnerBoy from "@/assets/escape-runner-boy.png";

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
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now ? Math.max(0, target.getTime() - now.getTime()) : 0;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { ready: now !== null, d, h, m, s };
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
    a: "大橋國小 二年級升三年級、三年級升四年級、四年級升五年級 的同學，限額 32 名。報名人數若超出名額限制，將依抽籤結果決定錄取名單。",
  },
  {
    q: "怎麼報名？",
    a: "本次僅提供線上報名，請掃描海報上的 QR Code 或點擊「立即線上報名」按鈕，至線上表單完成報名。",
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
      <Video />
      <Apply />
      <FAQ />
      <Footer />
      <BackToTop />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["#about", "關於營隊"],
    ["#missions", "四大任務"],
    ["#escape", "全員逃走中"],
    ["#schedule", "當日流程"],
    ["#apply", "報名資訊"],
    ["#video", "宣傳影片"],
    ["#faq", "常見問題"],
    ["#contact", "聯絡資訊"],
  ];
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "backdrop-blur-xl bg-background/80 border-b border-white/10 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="text-xl font-black text-gradient">地球守衛隊</span>
          <span className="hidden sm:inline text-xs text-muted-foreground">守護任務啟動</span>
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {links.map(([h, t]) => (
            <a key={h} href={h} className="hover:text-foreground transition story-link">{t}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-primary-foreground hover:opacity-90 transition shadow-lg shadow-primary/30"
          >
            立即報名
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="開啟選單"
            aria-expanded={open}
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
          >
            <span className="relative w-5 h-3.5 block">
              <span className={`absolute left-0 right-0 top-0 h-0.5 bg-foreground rounded transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 right-0 top-1.5 h-0.5 bg-foreground rounded transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 right-0 top-3 h-0.5 bg-foreground rounded transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? "max-h-[80vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-5 pb-4 pt-1 flex flex-col gap-1 text-sm">
          {links.map(([h, t]) => (
            <a
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 glass hover:bg-white/10 transition"
            >
              {t}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative star-field min-h-screen pt-32 pb-20 px-5 overflow-hidden">
      <span className="shooting-star" style={{ top: "8%", right: "-10%", animationDelay: "0s" }} />
      <span className="shooting-star" style={{ top: "22%", right: "-20%", animationDelay: "2.5s" }} />
      <span className="shooting-star" style={{ top: "45%", right: "-15%", animationDelay: "5s" }} />
      <span className="shooting-star" style={{ top: "5%", right: "20%", animationDelay: "1.2s" }} />

      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="inline-block rounded-full glass px-4 py-1.5 text-xs tracking-wider">
            大橋國小 × 薇閣中學 高一丙己 ‧ 全員逃走中
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
            <Stat icon="⏰" label="活動時間" big={"9 AM –\n4 PM"} sub="一整天" />
            <Stat icon="📣" label="招生名額" big="32" sub="升 3 / 4 / 5 年級" />
          </div>
          <Countdown />
        </div>
        <div className="relative animate-float">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-sky/40 to-mint/30 blur-3xl" />
          <div className="relative">
            <img
              src={flyerHero}
              alt="地球守衛隊 活動主視覺"
              className="relative rounded-3xl shadow-2xl ring-1 ring-white/20"
            />
            <img
              src={characterBoy}
              alt=""
              aria-hidden
              className="pointer-events-none absolute left-[-4%] top-[26%] w-[40%] animate-sway-left origin-bottom drop-shadow-[0_24px_32px_rgba(0,0,0,0.55)]"
            />
            <img
              src={characterGirl}
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-[-4%] top-[26%] w-[38%] animate-sway-right origin-bottom drop-shadow-[0_24px_32px_rgba(0,0,0,0.55)]"
            />
          </div>
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
      <div className="text-2xl font-black text-gradient leading-tight whitespace-pre-line break-words">{big}</div>
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
    <section id="about" className="section-light px-5 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm tracking-[0.3em] text-primary-foreground/70" style={{ color: "oklch(0.5 0.18 220)" }}>ABOUT</p>
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
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="glass-light rounded-2xl p-6 text-left h-full hover:-translate-y-1 transition">
                <div className="text-xl font-bold text-gradient">{t}</div>
                <div className="mt-2 text-sm text-muted-foreground">{d}</div>
              </div>
            </Reveal>
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
    <section id="schedule" className="section-light px-5 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em]" style={{ color: "oklch(0.5 0.18 220)" }}>SCHEDULE</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black">當日守護時程</h2>
          <p className="mt-4 text-muted-foreground">
            分為 A、B、C、D 四組，輪流跑遍四堂課程，最後一起進行「全員逃走中」大團體戰。
          </p>
        </div>
        <ol className="mt-12 relative border-l-2 border-primary/40 pl-6 space-y-4">
          {schedule.map(([time, label], i) => (
            <Reveal key={time} delay={i * 60}>
              <li className="relative">
                <span className="absolute -left-[33px] top-3 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
                <div className="glass-light rounded-xl px-5 py-4 flex items-baseline gap-5 hover:translate-x-1 transition">
                  <span className="text-lg font-black text-gradient w-20">{time}</span>
                  <span className="text-base">{label}</span>
                </div>
              </li>
            </Reveal>
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
    ["招生對象", "大橋國小 二升三、三升四、四升五年級 ‧ 限 32 名（報名人數若超出名額限制，將依抽籤結果決定錄取名單）"],
    ["報名方式", "線上表單填寫"],
    ["主辦單位", "薇閣高中 高一丙 ‧ 高一己"],
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

function Video() {
  return (
    <section id="video" className="section-light px-5 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">PROMO VIDEO</p>
          <h3 className="mt-3 text-4xl sm:text-5xl font-black">宣傳影片</h3>
          <p className="mt-4 text-foreground/70">搶先看 ‧ 全員逃走中 ‧ 守衛隊招募</p>
        </div>
        <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-primary/20 bg-black">
          <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/x2Ya1swTCp0"
              title="全員逃走中 宣傳影片"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const contacts = [
    { role: "負責老師", name: "鄭雅文 老師", email: "ywcheng23@gmail.com", phone: "0988968386" },
    { role: "總召", name: "陳育穎", email: "h1140635@stu.wghs.tp.edu.tw", phone: "0938718655" },
  ];
  return (
    <section id="faq" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm tracking-[0.3em] text-primary">FAQ & CONTACT</p>
          <h3 className="mt-3 text-4xl sm:text-5xl font-black">常見問題 ‧ 聯絡資訊</h3>
        </div>
        <div className="mt-12 grid lg:grid-cols-5 gap-6 lg:gap-10">
          {/* FAQ — left */}
          <div className="lg:col-span-3 space-y-3">
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
          {/* Contact — right */}
          <div className="lg:col-span-2" id="contact">
            <div className="glass rounded-2xl p-6 sm:p-7 h-full">
              <div>
                <p className="text-xs tracking-[0.3em] text-primary">CONTACT</p>
                <h4 className="mt-2 text-2xl font-black">聯絡資訊</h4>
                <p className="mt-2 text-sm text-muted-foreground">如有任何疑問，歡迎來信或來電洽詢</p>
              </div>
              <div className="mt-6 space-y-4">
                {contacts.map((c) => (
                  <div
                    key={c.role}
                    className="rounded-xl p-4 bg-white/[0.04] border border-white/10"
                  >
                    <div className="text-xs tracking-widest text-primary">{c.role}</div>
                    <div className="mt-1 text-lg font-bold">{c.name}</div>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-2 inline-block text-sm font-bold text-gradient tracking-wider break-all"
                    >
                      ✉️ {c.email}
                    </a>
                    <a
                      href={`tel:${c.phone}`}
                      className="mt-1 block text-sm font-bold text-gradient tracking-wider"
                    >
                      📞 {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  const deadline = new Date("2026-06-13T00:00:00+08:00");
  const eventDate = new Date("2026-08-26T09:00:00+08:00");
  const deadlineCd = useCountdown(deadline);
  const eventCd = useCountdown(eventDate);
  const deadlinePassed = deadlineCd.ready && deadlineCd.d === 0 && deadlineCd.h === 0 && deadlineCd.m === 0 && deadlineCd.s === 0;
  const { ready, d, h, m, s } = deadlinePassed ? eventCd : deadlineCd;
  const label = deadlinePassed ? "距離出任務還有" : "距離報名截止還有";
  const cells: [string, number][] = [
    ["DAYS", d],
    ["HRS", h],
    ["MIN", m],
    ["SEC", s],
  ];
  return (
    <div className="mt-6 glass rounded-2xl p-4 max-w-lg">
      <div className="text-[11px] tracking-[0.3em] text-primary mb-2">{label}</div>
      <div className="grid grid-cols-4 gap-2">
        {cells.map(([l, v]) => (
          <div key={l} className="text-center bg-white/5 rounded-xl py-3">
            <div className="text-2xl sm:text-3xl font-black text-gradient tabular-nums">
              {ready ? String(v).padStart(2, "0") : "--"}
            </div>
            <div className="text-[10px] text-muted-foreground tracking-widest">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Escape() {
  // deterministic particle positions to avoid hydration mismatch
  const particles = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 53) % 100,
    top: (i * 37) % 100,
    delay: (i % 6) * 0.9,
    duration: 4 + (i % 5),
    size: 2 + (i % 3),
  }));
  return (
    <section
      id="escape"
      className="relative px-5 py-28 overflow-hidden"
      style={{
        background:
          "radial-gradient(900px 500px at 15% 30%, oklch(0.35 0.18 280 / 0.7), transparent 65%), radial-gradient(700px 400px at 90% 80%, oklch(0.45 0.22 300 / 0.55), transparent 65%), linear-gradient(180deg, oklch(0.18 0.12 265), oklch(0.12 0.1 270))",
      }}
    >
      {/* Sci-fi scan grid */}
      <div aria-hidden className="absolute inset-0 mission-grid pointer-events-none" />

      {/* Horizontal scan line */}
      <div
        aria-hidden
        className="absolute inset-x-0 h-[2px] pointer-events-none animate-scan"
        style={{
          background:
            "linear-gradient(90deg, transparent, oklch(0.85 0.18 290 / 0.9), transparent)",
          boxShadow: "0 0 18px oklch(0.75 0.2 290 / 0.8)",
        }}
      />

      {/* Speed streaks */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[15, 38, 62, 80].map((top, i) => (
          <div
            key={top}
            className="absolute h-[2px] w-[40%] animate-streak"
            style={{
              top: `${top}%`,
              left: 0,
              background:
                "linear-gradient(90deg, transparent, oklch(0.85 0.18 290 / 0.7), transparent)",
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${1.8 + i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Particles */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/80 animate-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 8px oklch(0.85 0.18 290 / 0.9)",
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-20 items-center">
        {/* LEFT: mission briefing */}
        <div className="relative animate-slide-in-left">
          {/* corner brackets */}
          <div aria-hidden className="pointer-events-none absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-[oklch(0.85_0.18_290)]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-[oklch(0.85_0.18_290)]" />

          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] tracking-[0.4em] text-[oklch(0.9_0.12_290)] animate-neon-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.85_0.18_290)] animate-pulse" />
            CLASSIFIED · FINAL MISSION
          </div>

          <h2 className="mt-5 text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight">
            <span className="block text-neon animate-neon-pulse">最終任務</span>
            <span className="block text-gradient">全員逃走中</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base tracking-[0.3em] text-[oklch(0.85_0.1_280)]">
            ‧ EARTH GUARDIANS · FINAL DEFENSE ‧
          </p>

          <div className="mt-8 space-y-4 max-w-lg">
            <p className="text-lg leading-relaxed text-foreground/90">
              <span className="text-neon font-bold">上午的訓練已經結束。</span>
              <br />
              現在,地球守衛隊必須分散行動。
              <br />
              在魔王追捕下尋找情報站,
              <br />
              回答生態、歷史、科學與能源任務,
              <br />
              蒐集拯救地球的能量核心。
            </p>
          </div>

          {/* mission stats */}
          <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg">
            {[
              ["TARGETS", "32", "守衛隊員"],
              ["DURATION", "40", "MIN"],
            ].map(([k, v, s]) => (
              <div
                key={k}
                className="relative rounded-xl border border-[oklch(0.7_0.2_290_/_0.4)] bg-[oklch(0.2_0.1_270_/_0.5)] backdrop-blur p-3 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_290)] to-transparent" />
                <div className="text-[10px] tracking-[0.25em] text-[oklch(0.8_0.12_290)]">{k}</div>
                <div className="text-3xl font-black text-neon leading-tight tabular-nums">{v}</div>
                <div className="text-[10px] text-muted-foreground tracking-widest">{s}</div>
              </div>
            ))}
          </div>

          {/* Roles: 魔王 / 逃走者 */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4 max-w-lg">
            <div className="rounded-2xl p-5 border border-[oklch(0.7_0.25_25_/_0.5)] bg-[oklch(0.25_0.12_20_/_0.35)] backdrop-blur hover:-translate-y-1 transition">
              <div className="text-3xl">🕶️</div>
              <h3 className="mt-2 text-xl font-black text-[oklch(0.9_0.15_25)]">魔王</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                潛伏在校園各處的獵人，冷靜、快速、絕不留情。觸碰出局。
              </p>
            </div>
            <div className="rounded-2xl p-5 border border-[oklch(0.7_0.2_290_/_0.5)] bg-[oklch(0.25_0.12_280_/_0.35)] backdrop-blur hover:-translate-y-1 transition">
              <div className="text-3xl">🏃‍♂️</div>
              <h3 className="mt-2 text-xl font-black text-neon">逃走者</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                闖關收集印章，運用整天累積的線索與默契，撐到鈴響就是勝利。
              </p>
            </div>
          </div>

          {/* Mission briefing paragraph */}
          <p className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground">
            你能在時間結束前完成使命嗎?
            你的每一枚<span className="text-neon font-bold">印章</span>,
            都將化為守衛隊能量。
            最終決戰中,
            <span className="text-[oklch(0.9_0.15_290)]">你的努力將決定指揮官是否有足夠力量擊敗魔王。</span>
          </p>
        </div>



        {/* RIGHT: characters bursting in from the right, breaking the frame */}
        <div className="relative h-[340px] sm:h-[420px] md:h-[460px] lg:h-[480px] xl:h-[520px] overflow-hidden lg:overflow-visible rounded-3xl">
          {/* HUD frame */}
          <div
            aria-hidden
            className="absolute inset-4 rounded-3xl border border-[oklch(0.7_0.2_290_/_0.35)]"
            style={{
              boxShadow:
                "inset 0 0 60px oklch(0.6 0.25 290 / 0.25), 0 0 40px oklch(0.5 0.22 290 / 0.3)",
            }}
          />
          {/* HUD corners */}
          {[
            "top-2 left-2 border-l-2 border-t-2",
            "top-2 right-2 border-r-2 border-t-2",
            "bottom-2 left-2 border-l-2 border-b-2",
            "bottom-2 right-2 border-r-2 border-b-2",
          ].map((cls) => (
            <div key={cls} className={`absolute ${cls} w-10 h-10 border-[oklch(0.85_0.18_290)] pointer-events-none`} />
          ))}

          {/* target reticle */}
          <div
            aria-hidden
            className="absolute top-6 right-6 text-[10px] tracking-[0.3em] text-[oklch(0.9_0.12_290)] flex items-center gap-2 z-10"
          >
            <span className="w-2 h-2 rounded-full bg-[oklch(0.7_0.25_25)] animate-pulse" />
            REC · TRACKING
          </div>

          {/* radial glow behind characters */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-3xl"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.65 0.25 290 / 0.45), transparent 70%)",
            }}
          />

          {/* Girl — burst in first, breaks top-right of frame */}
          <img
            src={escapeRunnerGirl}
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[-4%] sm:right-[-6%] lg:right-[-10%] xl:right-[-12%] top-[2%] sm:top-[-2%] lg:top-[-4%] w-[62%] sm:w-[66%] lg:w-[72%] xl:w-[78%] animate-dash-in-right animate-neon-pulse"
            style={{ animationDelay: "0s, 1s" }}
          />
          {/* Boy — chases, breaks bottom-left of HUD area */}
          <img
            src={escapeRunnerBoy}
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[-2%] sm:left-[-4%] lg:left-[-8%] xl:left-[-10%] bottom-[4%] sm:bottom-[0%] lg:bottom-[-2%] xl:bottom-[-4%] w-[54%] sm:w-[58%] lg:w-[64%] xl:w-[70%] animate-dash-in-right animate-float-soft"
            style={{ animationDelay: "0.35s, 0s", filter: "drop-shadow(0 0 18px oklch(0.7 0.22 290 / 0.7))" }}
          />


          {/* coords readout */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] tracking-widest text-[oklch(0.85_0.12_280)] font-mono">
            <span>X: 25.0478° N</span>
            <span className="text-[oklch(0.7_0.25_25)]">● LIVE</span>
            <span>Y: 121.5170° E</span>
          </div>
        </div>
      </div>


      {/* === MISSION DOSSIER : 規則 === */}
      <div className="relative mx-auto max-w-7xl mt-10">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[oklch(0.7_0.2_290_/_0.6)] to-[oklch(0.7_0.2_290_/_0.6)]" />
            <span className="text-[11px] tracking-[0.5em] text-[oklch(0.9_0.12_290)] font-bold">
              MISSION DOSSIER · 任務檔案
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-[oklch(0.7_0.2_290_/_0.6)] to-[oklch(0.7_0.2_290_/_0.6)]" />
          </div>
        </Reveal>

        {/* 規則 */}
        <Reveal delay={80}>
          <div
            className="relative rounded-3xl p-6 sm:p-8 backdrop-blur overflow-hidden"
            style={{
              background: "linear-gradient(135deg, oklch(0.22 0.13 270 / 0.7), oklch(0.18 0.12 280 / 0.5))",
              border: "1px solid oklch(0.7 0.2 290 / 0.35)",
              boxShadow: "0 0 40px oklch(0.55 0.22 290 / 0.2)",
            }}
          >
            <div aria-hidden className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-[oklch(0.85_0.18_290)]" />
            <div aria-hidden className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-[oklch(0.85_0.18_290)]" />
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">📜</span>
              <h3 className="text-2xl sm:text-3xl font-black text-neon tracking-wide">遊戲規則</h3>
              <span className="ml-auto text-[10px] tracking-[0.3em] text-[oklch(0.8_0.12_290)]">RULES · 01</span>
            </div>
            <ol className="grid sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                "你們會分成四個組別，大逃殺開始時每組再拆成兩小隊行動。",
                "每個小隊都有一位隊輔同行，如果被魔王碰到，由隊輔判定是否出局。",
                "你們的任務是躲避魔王，找到關主完成闖關。",
                "闖關時要全隊到齊（包括隊輔），關主確認後才能開始。",
                "每個關卡的內容和可獲得的印章數量都不一樣。",
                "如果有隊友被魔王抓到，全隊要停下來開會，魔王會劃掉你們某一關的闖關資格。",
                "如果有隊友需要休息，以組為單位到醫療區，處理完畢後可以重新出發，還能獲得額外印章補償。",
                "記得在時間內趕回集合處，遲到的話會被扣除印章。",
              ].map((rule, i) => (
                <li
                  key={i}
                  className="group relative flex gap-3 rounded-xl p-3 sm:p-4 bg-[oklch(0.2_0.1_270_/_0.4)] border border-[oklch(0.7_0.2_290_/_0.2)] hover:border-[oklch(0.7_0.2_290_/_0.6)] transition"
                >
                  <span className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black text-[oklch(0.95_0.05_280)] bg-[oklch(0.4_0.2_290_/_0.5)] border border-[oklch(0.7_0.2_290_/_0.5)] tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/90">{rule}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>


      </div>



      {/* Bottom mission banner */}
      <Reveal delay={200}>
        <div
          className="relative mx-auto max-w-5xl mt-16 rounded-3xl p-7 sm:p-9 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.25 0.15 270 / 0.7), oklch(0.3 0.18 290 / 0.6))",
            border: "1px solid oklch(0.7 0.2 290 / 0.4)",
            boxShadow: "0 0 50px oklch(0.55 0.22 290 / 0.35)",
          }}
        >
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_290)] to-transparent" />
          <p className="relative text-center text-base sm:text-xl font-bold leading-relaxed">
            撐到 <span className="text-neon">15:30</span> 鈴響，你就是真正的 <span className="text-gradient">地球守衛隊精英特務</span>。
          </p>
        </div>
      </Reveal>
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
