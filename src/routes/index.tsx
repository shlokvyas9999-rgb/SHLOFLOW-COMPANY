import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Bot, Globe, Workflow, Clapperboard, Megaphone, Zap, ArrowRight, Sparkles, Brain, Target,
  Check, Menu, X, Mail, MessageCircle, Instagram, Linkedin, Twitter, Github,
} from "lucide-react";
import projectsImg from "@/assets/projects.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SHLOFLOW AI — AI-Powered Digital Agency" },
      { name: "description", content: "SHLOFLOW AI builds intelligent chatbots, websites and automations that help businesses grow with artificial intelligence." },
      { property: "og:title", content: "SHLOFLOW AI — Flow Beyond Limits" },
      { property: "og:description", content: "Transform your business with AI chatbots, automation, websites and creative AI." },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/910000000000";
const EMAIL = "hello@shloflow.ai";
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
  { n: "Starter", p: "$499", d: "For small businesses starting with AI.", f: ["1 AI chatbot", "Basic website integration", "Email support", "1 revision round"] },
  { n: "Professional", p: "$1,499", d: "For growing teams ready to scale.", f: ["Advanced AI chatbot", "AI-powered website", "3 workflow automations", "Priority support", "Monthly reports"], hot: true },
  { n: "Enterprise", p: "Custom", d: "Tailored AI for large organisations.", f: ["Unlimited automations", "Custom AI solutions", "Dedicated manager", "24/7 support", "SLA & security review"] },
];

function Pricing() {
  return (
    <section id="pricing" className="py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHead tag="Pricing" title={<>Simple, <span className="text-gradient">transparent</span> plans</>} sub="Choose a package or contact us for a custom quote." />
        <div className="grid items-stretch gap-6 lg:grid-cols-3">
          {plans.map((pl, i) => (
            <div key={pl.n} className={`reveal card-lift relative flex flex-col rounded-3xl p-8 ${pl.hot ? "glass glow border-primary/50" : "glass"}`} style={{ transitionDelay: `${i * 100}ms` }}>
              {pl.hot && <span className="btn-glow absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs">Most popular</span>}
              <h3 className="text-xl font-semibold">{pl.n}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{pl.d}</p>
              <p className="mt-6 font-display text-5xl font-bold">{pl.p}{pl.p !== "Custom" && <span className="text-base font-normal text-muted-foreground"> /project</span>}</p>
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

type Field = "name" | "email" | "service" | "message";

function Contact() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = Object.fromEntries(fd) as Record<Field, string>;
    const err: Partial<Record<Field, string>> = {};
    if (!v.name?.trim() || v.name.length > 100) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email ?? "")) err.email = "Please enter a valid email.";
    if (!v.service) err.service = "Please choose a service.";
    if (!v.message || v.message.trim().length < 10) err.message = "Tell us a bit more (10+ characters).";
    setErrors(err);
    if (Object.keys(err).length) return;
    setStatus("sending");
    const form = e.currentTarget;
    setTimeout(() => {
      const body = encodeURIComponent(`Name: ${v.name}\nEmail: ${v.email}\nService: ${v.service}\n\n${v.message}`);
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("New project: " + v.service)}&body=${body}`;
      setStatus("done"); form.reset();
    }, 800);
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
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><MessageCircle className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">WhatsApp</p><p className="text-sm text-muted-foreground">Chat with us instantly</p></div></a>
            <a href={`mailto:${EMAIL}`} className="glass card-lift flex items-center gap-4 rounded-2xl p-5"><Mail className="h-10 w-10 rounded-xl bg-gradient-brand p-2.5" /><div><p className="font-medium">Email</p><p className="text-sm text-muted-foreground">{EMAIL}</p></div></a>
          </div>
        </div>
        <form onSubmit={onSubmit} noValidate className="reveal glass space-y-5 rounded-3xl p-8 lg:col-span-3">
          {status === "done" ? (
            <div className="py-16 text-center animate-in fade-in zoom-in-95">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-brand glow"><Check className="h-8 w-8" /></div>
              <h3 className="mt-6 text-2xl font-semibold">Thank you!</h3>
              <p className="mt-2 text-muted-foreground">Your message is ready in your email app — hit send and we'll reply within 24 hours.</p>
              <button type="button" onClick={() => setStatus("idle")} className="glass mt-6 rounded-full px-5 py-2 text-sm">Send another</button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2">
                <div><input name="name" placeholder="Your name" maxLength={100} className={field} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}</div>
                <div><input name="email" type="email" placeholder="Email address" maxLength={255} className={field} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}</div>
              </div>
              <div>
                <select name="service" defaultValue="" className={field}>
                  <option value="" disabled>Select a service</option>
                  {services.map((s) => <option key={s.t}>{s.t}</option>)}
                </select>
                {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
              </div>
              <div><textarea name="message" rows={5} maxLength={2000} placeholder="Describe your project" className={field} />{errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}</div>
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
        <div><h4 className="font-semibold">Contact</h4><ul className="mt-4 space-y-2 text-sm text-muted-foreground"><li>{EMAIL}</li><li><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a></li><li>Worldwide · Remote</li></ul></div>
      </div>
      <p className="mt-12 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} SHLOFLOW AI. All rights reserved.</p>
    </footer>
  );
}

function Index() {
  useReveal();
  return (
    <main>
      <Navbar /><Hero /><Services /><About /><Projects /><Pricing /><Contact /><Footer />
    </main>
  );
}
