import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";
import {
  Bot, Globe, Workflow, Clapperboard, Megaphone, Zap, ArrowRight, Sparkles, Brain, Target,
  Check, Menu, X, Mail, MessageCircle, Instagram, Linkedin, Twitter, Github, Phone, MapPin,
} from "lucide-react";
import projectsImg from "@/assets/projects.jpg";

const SITE_URL = "https://shloflow-company.lovable.app";

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "SHLOFLOW AI — AI-Powered Digital Agency in Anand, Gujarat" },
      { name: "description", content: "SHLOFLOW AI builds AI chatbots, voice agents, websites and business automations. Founded by Shlok Vyas in Anand, Gujarat, India." },
      { property: "og:title", content: "SHLOFLOW AI — Flow Beyond Limits" },
      { property: "og:description", content: "AI chatbots, voice agents, websites, videos and automations for your business — starting at ₹599." },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "SHLOFLOW AI" },
      { name: "application-name", content: "SHLOFLOW AI" },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "SHLOFLOW AI",
          alternateName: ["SHLOFLOW", "Shloflow AI"],
          url: `${SITE_URL}`,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "SHLOFLOW AI",
          description:
            "AI-powered digital agency building chatbots, voice agents, websites, AI videos and business automations.",
          url: SITE_URL,
          email: "shlokvyas9999@gmail.com",
          telephone: "+91 91711 38891",
          founder: { "@type": "Person", name: "Shlok Vyas" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Anand",
            addressRegion: "Gujarat",
            addressCountry: "IN",
          },
          areaServed: "IN",
          priceRange: "₹599 - ₹64,994",
          knowsAbout: [
            "AI chatbots",
            "AI voice agents",
            "Business websites",
            "Business automations",
            "AI video creation",
            "AI image creation",
            "Social media automation",
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const EMAIL = "shlokvyas9999@gmail.com";
const WHATSAPP = "https://wa.me/919171138891";
const PHONE_TEL = "+919171138891";
const PHONE = "+91 91711 38891";
const LOCATION = "Anand, Gujarat, India";
const FOUNDER = "Shlok Vyas";
const nav = ["Home", "Services", "About", "Projects", "Pricing", "Contact"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Logo() {
  return (
    <a href="#home" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand glow"><Sparkles className="h-4 w-4" /></span>
      SHLOFLOW<span className="text-gradient">AI</span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{n}</a>
          ))}
        </nav>
        <a href="#contact" className="btn-glow hidden rounded-full px-5 py-2.5 text-sm font-medium md:inline-flex">Get Started</a>
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      <div className={`overflow-hidden transition-all duration-500 md:hidden ${open ? "max-h-96" : "max-h-0"}`}>
        <div className="glass mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-4">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground">{n}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-glow mt-2 rounded-full px-5 py-2.5 text-center text-sm font-medium">Get Started</a>
        </div>
      </div>
    </header>
  );
}

function SectionHead({ tag, title, sub }: { tag: string; title: ReactNode; sub?: string }) {
  return (
    <div className="reveal mx-auto mb-16 max-w-2xl text-center">
      <span className="glass inline-block rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-neon">{tag}</span>
      <h2 className="mt-5 text-4xl font-bold md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

const particles = Array.from({ length: 40 }, (_, i) => ({
  left: (i * 37) % 100, top: (i * 53) % 100, delay: (i % 7) * 0.6, size: (i % 3) + 1,
}));

function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-primary/25 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-neon/20 blur-[140px]" />
        {particles.map((p, i) => (
          <span key={i} className="absolute rounded-full bg-foreground"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, animation: `twinkle 4s ${p.delay}s ease-in-out infinite` }} />
        ))}
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon" /> Flow Beyond Limits. Build Beyond Imagination.
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-7xl">
            Transform Your Business With <span className="text-gradient animate-gradient">AI.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            We build intelligent digital solutions, automate workflows and help businesses unlock their full potential with artificial intelligence.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium">Get Started <ArrowRight className="h-4 w-4" /></a>
            <a href="#services" className="glass inline-flex items-center rounded-full px-7 py-3.5 font-medium transition hover:bg-secondary">Explore Services</a>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md animate-in fade-in zoom-in-90 duration-1000">
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/30" />
          <div className="absolute inset-10 rounded-full border border-neon/20" />
          <div className="orb absolute inset-20 rounded-full" />
          <div className="glass animate-float absolute -left-4 top-10 rounded-2xl p-4 shadow-2xl">
            <p className="text-xs text-muted-foreground">Automations running</p>
            <p className="font-display text-2xl font-bold text-gradient">1,284</p>
          </div>
          <div className="glass animate-float-slow absolute -right-2 bottom-16 flex items-center gap-3 rounded-2xl p-4 shadow-2xl">
            <Bot className="h-8 w-8 rounded-lg bg-gradient-brand p-1.5" />
            <div><p className="text-sm font-medium">AI Agent</p><p className="text-xs text-neon">● Online</p></div>
          </div>
          <div className="glass animate-float absolute bottom-0 left-8 rounded-2xl px-4 py-3 text-xs shadow-2xl" style={{ animationDelay: "2s" }}>
            ⚡ Response time <span className="font-semibold text-foreground">0.4s</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: Bot, t: "AI Chatbot Development", d: "Smart assistants that answer customers 24/7 and capture leads in your voice." },
  { icon: Globe, t: "AI Website Development", d: "Blazing-fast, beautiful websites powered by intelligent features." },
  { icon: Workflow, t: "Business Process Automation", d: "Eliminate repetitive tasks and let your team focus on what matters." },
  { icon: Clapperboard, t: "AI Video & Image Creation", d: "Scroll-stopping visuals and videos created at the speed of ideas." },
  { icon: Megaphone, t: "AI Marketing Solutions", d: "Data-driven campaigns, content and targeting that convert." },
  { icon: Zap, t: "Smart Workflow Automation", d: "Connect your tools into seamless, self-running workflows." },
];

const prices = [
  { icon: Globe, t: "Business Website", p: "₹5,999", d: "A fast, modern website that makes your business look serious." },
  { icon: Sparkles, t: "Premium Website", p: "₹9,999", d: "High-end design with advanced AI features built in." },
  { icon: Bot, t: "AI Chatbot", p: "₹9,999", d: "Answers customers 24/7 and captures leads for you." },
  { icon: MessageCircle, t: "AI Voice Agent", p: "₹12,999", d: "A voice assistant that handles your calls like a pro." },
  { icon: Workflow, t: "Business Automations", p: "₹9,999", d: "Repetitive work removed from your team, permanently." },
  { icon: Clapperboard, t: "AI Videos Creation", p: "₹1,999", d: "Scroll-stopping videos produced with AI in hours, not weeks." },
  { icon: Zap, t: "AI Image Creations", p: "₹599", d: "Custom images for posts, ads, menus and branding." },
  { icon: Megaphone, t: "Social Media Automation", p: "₹3,999", d: "Content scheduled and posted on autopilot." },
];

function Services() {
  return (
    <section id="services" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead tag="Services" title={<>What we <span className="text-gradient">build</span></>} sub="End-to-end AI solutions designed to make your business faster, smarter and more profitable." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className="reveal glass card-lift group rounded-3xl p-8" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-brand glow transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"><Icon className="h-6 w-6" /></div>
              <h3 className="mt-6 text-xl font-semibold">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-neon">Learn More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    { icon: Sparkles, t: "Innovation", d: "We explore the newest AI so you stay ahead." },
    { icon: Brain, t: "Intelligence", d: "Solutions that learn, adapt and improve." },
    { icon: Target, t: "Impact", d: "Measured by real results for your business." },
  ];
  return (
    <section id="about" className="py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="reveal relative">
          <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-brand opacity-20 blur-3xl" />
          <div className="glass relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[2rem]">
            <div className="absolute inset-0 bg-gradient-brand opacity-10 animate-gradient" />
            <div className="grid grid-cols-3 gap-4 p-8">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`h-16 w-16 rounded-2xl md:h-20 md:w-20 ${i === 4 ? "orb" : "glass"}`} style={i !== 4 ? { animation: `twinkle 5s ${i * 0.4}s ease-in-out infinite` } : undefined} />
              ))}
            </div>
          </div>
        </div>
        <div className="reveal">
          <span className="text-xs uppercase tracking-[0.2em] text-neon">About us</span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">We Make AI Work For <span className="text-gradient">Your Business.</span></h2>
          <p className="mt-6 text-muted-foreground">
            SHLOFLOW AI blends creativity, technology and artificial intelligence to design smarter business solutions. From your first chatbot to fully automated operations, we turn complex AI into simple tools that save time, cut costs and unlock growth.
          </p>
          <div className="glass card-lift mt-8 flex items-center gap-4 rounded-2xl p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-brand font-display text-lg font-bold">SV</span>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neon">Founder</p>
              <h3 className="font-semibold">{FOUNDER}</h3>
              <p className="text-sm text-muted-foreground">Building SHLOFLOW AI from {LOCATION}.</p>
            </div>
          </div>
          <div className="mt-10 space-y-4">
            {values.map(({ icon: Icon, t, d }) => (
              <div key={t} className="glass card-lift flex items-center gap-4 rounded-2xl p-5">
                <Icon className="h-10 w-10 shrink-0 rounded-xl bg-gradient-brand p-2.5" />
                <div><h3 className="font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const projects = [
  { t: "AI Customer Support Chatbot", c: "Conversational AI", pos: "0% 0%" },
  { t: "Automated Business Dashboard", c: "Automation & Analytics", pos: "100% 0%" },
  { t: "AI-Powered Modern Website", c: "Web Development", pos: "100% 100%" },
  { t: "AI Creative Content Studio", c: "Creative AI", pos: "0% 100%" },
];

function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead tag="Projects" title={<>Demo <span className="text-gradient">showcase</span></>} sub="Concept demos showing what we can build for you. These are sample projects, not client work." />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.t} className="reveal glass card-lift group overflow-hidden rounded-3xl" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <div className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${projectsImg})`, backgroundSize: "200% 200%", backgroundPosition: p.pos }} />
                <span className="glass absolute left-4 top-4 rounded-full px-3 py-1 text-xs">Demo</span>
              </div>
              <div className="flex items-center justify-between p-6">
                <div><p className="text-xs text-neon">{p.c}</p><h3 className="mt-1 text-lg font-semibold">{p.t}</h3></div>
                <a href="#contact" className="glass inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm transition hover:bg-secondary">View Project <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const plans = [
  { n: "Starter", p: "₹10,999", d: "For small businesses taking their first step into AI.", f: ["Business website", "1 AI chatbot", "1 basic automation", "Email support", "1 revision round"] },
  { n: "Professional", p: "₹14,999", d: "For growing teams ready to scale with AI.", f: ["Premium website", "AI chatbot + voice agent", "3 business automations", "Social media automation", "Priority support"], hot: true },
  { n: "Enterprise", p: "₹64,994", d: "Tailored AI for large organisations.", f: ["Everything in Professional", "Custom AI solutions", "Unlimited automations", "Dedicated manager", "24/7 support"] },
];

function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead tag="Pricing" title={<>Simple, <span className="text-gradient">transparent</span> pricing</>} sub="Pick exactly what you need — or choose a plan below." />
        <div className="mb-20 grid gap-4 md:grid-cols-2">
          {prices.map(({ icon: Icon, t, d, p }, i) => (
            <div key={t} className="reveal glass card-lift flex items-center gap-5 rounded-2xl p-6" style={{ transitionDelay: `${i * 60}ms` }}>
              <Icon className="h-10 w-10 shrink-0 rounded-xl bg-gradient-brand p-2.5" />
              <div className="min-w-0 flex-1"><h3 className="font-semibold">{t}</h3><p className="text-sm leading-relaxed text-muted-foreground">{d}</p></div>
              <p className="font-display text-2xl font-bold text-gradient">{p}</p>
            </div>
          ))}
        </div>
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((pl, i) => (
            <div key={pl.n} className={`reveal card-lift relative flex flex-col rounded-3xl p-8 ${pl.hot ? "glass glow border-primary/50" : "glass"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {pl.hot && <span className="btn-glow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs">Most popular</span>}
              <h3 className="text-xl font-semibold">{pl.n}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pl.d}</p>
              <p className="mt-6 font-display text-5xl font-bold">{pl.p}<span className="text-base font-normal text-muted-foreground"> /project</span></p>
              <ul className="mt-8 flex-1 space-y-3">
                {pl.f.map((f) => <li key={f} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-neon" />{f}</li>)}
              </ul>
              <a href="#contact" className={`mt-8 rounded-full py-3 text-center font-medium ${pl.hot ? "btn-glow" : "glass transition hover:bg-secondary"}`}>Contact Us</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Field = "name" | "email" | "phone" | "service" | "message" | "files" | "form";

const toBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const submit = useServerFn(submitContact);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = Object.fromEntries(fd) as Record<"name" | "email" | "phone" | "service" | "message", string>;
    const files = (fd.getAll("files") as File[]).filter((f) => f && f.size > 0);
    const err: Partial<Record<Field, string>> = {};
    if (!v.name?.trim() || v.name.length > 100) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email ?? "")) err.email = "Please enter a valid email.";
    if (v.phone && !/^[0-9+\-\s()]{6,30}$/.test(v.phone)) err.phone = "Please enter a valid phone number.";
    if (!v.service) err.service = "Please choose a service.";
    if (!v.message || v.message.trim().length < 10) err.message = "Tell us a bit more (10+ characters).";
    if (files.length > 3) err.files = "You can attach up to 3 files.";
    else if (files.some((f) => f.size > 4 * 1024 * 1024)) err.files = "Each file must be under 4 MB.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("sending");
    try {
      const encoded = await Promise.all(files.map(async (f) => ({ name: f.name, type: f.type, base64: await toBase64(f) })));
      await submit({ data: { name: v.name, email: v.email, phone: v.phone ?? "", service: v.service, message: v.message, files: encoded } });
      form.reset();
      setStatus("done");
    } catch (error) {
      console.error(error);
      setErrors({ form: "Sorry, we couldn't send your message. Please try again or contact us on WhatsApp." });
      setStatus("idle");
    }
  };
  const field = "w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";
  return (
    <section id="contact" className="py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-5">
        <div className="reveal lg:col-span-2">
          <span className="text-xs uppercase tracking-[0.2em] text-neon">Contact</span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Let's Build Something <span className="text-gradient">Intelligent.</span></h2>
          <p className="mt-6 text-muted-foreground">Tell us about your idea and we'll get back within 24 hours.</p>
          <div className="mt-10 space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><MessageCircle className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">WhatsApp</p><p className="text-sm text-muted-foreground">{PHONE} · Chat with us instantly</p></div></a>
            <a href={`tel:${PHONE_TEL}`} className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><Phone className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">Call us</p><p className="text-sm text-muted-foreground">{PHONE}</p></div></a>
            <a href={`mailto:${EMAIL}`} className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><Mail className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">Email</p><p className="text-sm text-muted-foreground">{EMAIL}</p></div></a>
            <div className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><MapPin className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">Location</p><p className="text-sm text-muted-foreground">{LOCATION}</p></div></div>
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="reveal glass space-y-5 rounded-3xl p-8 lg:col-span-3">
          {status === "done" ? (
            <div className="py-16 text-center animate-in fade-in zoom-in-95">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand glow"><Check className="h-8 w-8" /></div>
              <h3 className="mt-6 text-2xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">Your enquiry has been received — we'll reply within 24 hours.</p>
              <button type="button" onClick={() => setStatus("idle")} className="glass mt-6 rounded-full px-5 py-2 text-sm">Send another</button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <div><input name="name" placeholder="Your name" maxLength={100} className={field} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}</div>
                <div><input name="email" type="email" placeholder="Email address" maxLength={255} className={field} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}</div>
              </div>
              <div><input name="phone" type="tel" placeholder="Phone number (optional)" maxLength={30} className={field} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}</div>
              <div>
                <select name="service" defaultValue="" className={field}>
                  <option value="" disabled>Select a service</option>
                  {prices.map((s) => <option key={s.t}>{s.t}</option>)}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>
              <div><textarea name="message" rows={5} maxLength={2000} placeholder="Describe your project" className={field} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}</div>
              <div><input name="files" type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.zip" className={`${field} file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:text-primary-foreground`} />{errors.files ? <p className="mt-1 text-xs text-destructive">{errors.files}</p> : <p className="mt-1 text-xs text-muted-foreground">Optional · up to 3 files, 4 MB each</p>}</div>
              {errors.form && <p role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">{errors.form}</p>}
              <button disabled={status === "sending"} className="btn-glow w-full rounded-full py-3.5 font-medium disabled:opacity-70">
                {status === "sending" ? <span className="inline-flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" /> Sending…</span> : "Send Message"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t py-16">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">An AI-powered digital agency helping businesses flow beyond limits with intelligent automation, websites and creative AI.</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, Twitter, Github].map((I, i) => <a key={i} href="#home" aria-label="Social link" className="glass grid h-10 w-10 place-items-center rounded-full transition hover:glow"><I className="h-4 w-4" /></a>)}
          </div>
        </div>
        <div><h4 className="font-semibold">Quick links</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground">{nav.map((n) => <li key={n}><a href={`#${n.toLowerCase()}`} className="hover:text-foreground">{n}</a></li>)}</ul></div>
        <div><h4 className="font-semibold">Contact</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li><a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a></li><li><a href={`tel:${PHONE_TEL}`} className="hover:text-foreground">{PHONE}</a></li><li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a></li><li>{LOCATION}</li></ul></div>
      </div>
      <p className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} SHLOFLOW AI · Founded by {FOUNDER} · {LOCATION}. All rights reserved.</p>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Navbar /><Hero /><Services /><About /><Projects /><Pricing /><Contact /><Footer />
      <Link to="/chat" aria-label="Chat with our AI assistant" className="btn-glow fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-sm font-medium">
        <Bot className="h-5 w-5" /> Ask Shlo
      </Link>
    </main>
  );
}
