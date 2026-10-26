import { useEffect, useRef, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Link, useLocation, Router as WouterRouter } from 'wouter';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

const queryClient = new QueryClient();
const joinHref = 'mailto:management@b4pcodefound.org?subject=Join%20Columbus%20Women%20Connect';
const chairEmail = 'mailto:fatimahane@hotmail.com';
const parentSite = 'https://www.b4pcodefound.org/';
const programs = [
  ['01', 'Community dialogues', 'A welcoming place for women to exchange perspectives and build understanding across cultures and generations.'],
  ['02', 'Networking & professional development', 'Meaningful connections and opportunities to grow with the support of a broad community.'],
  ['03', 'Mentorship & leadership', 'Encouraging women to share knowledge, find guidance and step into leadership.'],
  ['04', 'Events & programming', 'Gatherings and experiences that bring women together around shared purpose.'],
  ['05', 'Business development services', 'Support for women building professional pathways and business ideas.'],
  ['06', 'Mental health & financial well-being', 'Space to support personal well-being and strengthen financial confidence.'],
];
const nav = [['Home', '/'], ['About', '/about'], ['Chair', '/chair'], ['Programs', '/programs'], ['Join', '/join'], ['Contact', '/contact']];
const pageMeta: Record<string, [string, string]> = {
  '/': ['Columbus Women Connect | Leadership Across Cultures', 'Columbus Women Connect empowers women through leadership, advocacy and community across cultures and generations in Columbus, Ohio.'],
  '/about': ['About Columbus Women Connect | Our Story', 'Learn about the mission, vision and story of Columbus Women Connect, founded in November 2024 by B4P CODEFOUND.'],
  '/chair': ['A Message from the Chair | Columbus Women Connect', 'A welcome from the Chair of Columbus Women Connect to our supporters, partners, friends and visitors.'],
  '/programs': ['Programs | Columbus Women Connect', 'Explore CWC programs: community dialogues, professional development, mentorship, events, business development, and well-being.'],
  '/join': ['Join Columbus Women Connect | All Women Welcome', 'Join Columbus Women Connect. All women and their daughters are welcome in this community of leadership, advocacy and belonging.'],
  '/contact': ['Contact Columbus Women Connect | Columbus, Ohio', 'Contact Columbus Women Connect and connect with the chair or parent organization, B4P CODEFOUND.'],
};

function Metadata({ path }: { path: string }) {
  useEffect(() => {
    const [title, description] = pageMeta[path] ?? pageMeta['/'];
    document.title = title;
    const setMeta = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.startsWith('meta[name=')) element.setAttribute('name', selector.match(/"([^"]+)"/)?.[1] ?? '');
        else element.setAttribute('property', selector.match(/"([^"]+)"/)?.[1] ?? '');
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
  }, [path]);
  return null;
}

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      window.requestAnimationFrame(() => toggleRef.current?.focus());
    };
  }, [open]);
  return <>
    <div className="topline">A Columbus community for women across cultures & generations</div>
    <header className="nav-wrap">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Columbus Women Connect home">
          <img src="/cwc-logo.png" width="350" height="157" alt="Columbus Women Connect logo" />
        </Link>
        <button ref={toggleRef} className="menu-toggle" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
        <div className="nav-links" id="desktop-links">
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
        </div>
        <Link href="/join" className="nav-join" data-testid="link-join-header">Find your place <ArrowUpRight size={16} /></Link>
      </nav>
    </header>
    <div ref={menuRef} className={`mobile-menu${open ? ' open' : ''}`} id="mobile-menu" role="dialog" aria-label="Mobile navigation" aria-modal={open || undefined} aria-hidden={!open}>
      <div className="mobile-menu-header">
        <Link href="/" className="brand mobile-brand" aria-label="Columbus Women Connect home" onClick={() => setOpen(false)}>
          <img src="/cwc-logo.png" width="350" height="157" alt="Columbus Women Connect logo" />
        </Link>
        <button ref={closeRef} className="mobile-menu-close" type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
          <X size={23} />
        </button>
      </div>
      <div className="mobile-menu-content">
        <div className="eyebrow">Explore Columbus Women Connect</div>
        <nav className="mobile-nav-links" aria-label="Mobile navigation links">
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(false)}>
            <span>{label}</span><ArrowUpRight size={19} aria-hidden="true" />
          </Link>)}
        </nav>
        <div className="mobile-menu-actions">
          <Link href="/join" className="button-primary" onClick={() => setOpen(false)}>Find your place <ArrowUpRight size={16} /></Link>
          <Link href="/programs" className="button-outline" onClick={() => setOpen(false)}>Explore programs <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <img className="footer-logo" src="/cwc-logo.png" width="350" height="157" alt="Columbus Women Connect" />
        <p>Women coming together to lead, advocate and build community across cultures and generations.</p>
      </div>
      <div><h2>Explore</h2>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h2>Connect</h2>
        <a href={joinHref}>Email Columbus Women Connect</a>
        <a href={chairEmail}>Contact the chair</a>
        <a href={parentSite} target="_blank" rel="noopener noreferrer">B4P CODEFOUND <ArrowUpRight size={14} /></a>
      </div>
    </div>
    <div className="footer-bottom"><span>Columbus Women Connect · Founded November 2024</span><span>A subsidiary of B4P CODEFOUND</span></div>
  </footer>;
}

function Layout({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  return <div className="site-shell"><Metadata path={path} /><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="page-main">{children}</main><Footer /></div>;
}

function PageHero({ eyebrow, title, emphasis, intro, image, alt, imagePosition = 'center', action }: {
  eyebrow: string; title: string; emphasis: string; intro: string; image: string; alt: string; imagePosition?: string; action?: ReactNode;
}) {
  return <section className="image-hero">
    <div className="image-hero-copy">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}<br /><em>{emphasis}</em></h1>
      <p className="intro">{intro}</p>
      {action}
    </div>
    <figure className="image-hero-photo">
      <img src={image} alt={alt} width="705" height="458" fetchPriority="high" style={{ objectPosition: imagePosition }} />
      <figcaption>Columbus Women Connect <span>·</span> Together, across generations</figcaption>
    </figure>
  </section>;
}

function Home() {
  return <Layout>
    <section className="hero">
      <div className="hero-copy-block fade-up">
        <div className="eyebrow">Columbus, Ohio · Women, together</div>
        <h1>Many stories.<br />One <em>shared</em><br />future.</h1>
        <p className="hero-copy">Columbus Women Connect brings women together across cultures and generations—to lead, advocate and build a stronger community.</p>
        <div className="hero-actions"><Link href="/about" className="button-primary">Discover our story <ArrowRight size={17} /></Link><Link href="/programs" className="button-outline">Explore programs</Link></div>
      </div>
      <div className="hero-collage fade-up" aria-label="CWC community photographs">
        <figure className="hero-photo-main"><img src="/cwc-community.png" width="705" height="458" alt="Women leaders and community members gathered at a Columbus Women Connect event" fetchPriority="high" /><figcaption>A community built by showing up.</figcaption></figure>
        <img className="hero-photo-small hero-photo-cultural" src="/cwc-cultural-community.png" width="350" height="250" alt="Women in colorful cultural dress gathered beneath flags representing their communities" />
        <span className="collage-note">Many cultures.<br />One community.</span>
      </div>
    </section>
    <section className="proof-strip" aria-label="Inaugural conference community">
      <div className="proof-inner">
        <div className="proof-item"><span className="proof-number">60+</span><span className="proof-label">women leaders at our inaugural conference</span></div>
        <div className="proof-item"><span className="proof-number">20+</span><span className="proof-label">nationalities represented in one room</span></div>
        <p className="proof-note">A beginning rooted in the strength of women showing up for one another.</p>
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><div><div className="eyebrow">What brings us together</div><h2>Connection with<br />room to grow.</h2></div><p>From a first conversation to a new leadership path, our offerings create ways to meet, learn and move forward together.</p></div>
      <div className="program-grid">{programs.map(([num,title,description]) => <Link key={num} href="/programs" className="program-card"><span className="program-index">{num} / CWC</span><span className="arrow-mark" aria-hidden="true"><ArrowUpRight size={19} /></span><h3>{title}</h3><p>{description}</p></Link>)}</div>
      <div className="hero-actions"><Link href="/programs" className="button-outline">See all program areas <ArrowRight size={16} /></Link></div>
    </section>
    <section className="split-band"><div className="split-inner">
      <div className="quote-box">“Leadership grows when we make space for one another.”</div>
      <div className="split-copy"><div className="eyebrow">A community by design</div><h2>Different paths.<br />Shared possibility.</h2><p>Founded in November 2024 by B4P CODEFOUND, CWC was created to empower women through leadership, advocacy and community. All women and their daughters are welcome.</p><Link href="/about" className="button-outline">Meet CWC <ArrowRight size={16} /></Link></div>
    </div></section>
    <section className="home-invitation">
      <div className="invitation-photo"><img src="/cwc-outdoor-activity.png" width="705" height="458" alt="Women and families taking part in an outdoor group activity together" loading="lazy" /></div>
      <div className="invitation-copy"><div className="eyebrow">Start with a hello</div><h2>There is a place<br />for you here.</h2><p>Whether you are exploring, building or ready to contribute, we would love to hear from you.</p><Link href="/join" className="button-primary">Find your place <ArrowRight size={17} /></Link></div>
    </section>
  </Layout>;
}

function About() {
  return <Layout>
    <PageHero eyebrow="About Columbus Women Connect" title="Rooted in community." emphasis="Open to every story." intro="CWC is a multicultural women’s leadership and community network in Columbus, Ohio—bringing people together across cultures and generations." image="/cwc-cultural-community.png" alt="Women in vibrant cultural dress representing the diversity of the Columbus Women Connect community" imagePosition="center 43%" />
    <section className="about-story"><div className="story-inner">
      <div><div className="eyebrow">Our beginning</div><h2>A new kind<br />of gathering.</h2></div>
      <div><p>Founded in November 2024 by B4P CODEFOUND, Columbus Women Connect began with a clear belief: women are stronger when they can learn, lead and advocate alongside one another.</p><p>At the inaugural conference, more than 60 women leaders representing over 20 nationalities came together. That gathering reflected the community CWC is here to nurture—generous, varied and full of possibility.</p>
        <div className="mission-grid">
          <article className="mission-card"><h3>Our mission</h3><p>Empower women through leadership, advocacy and community across cultures and generations.</p></article>
          <article className="mission-card"><h3>Our vision</h3><p>A connected community where every woman can contribute, grow and lead.</p></article>
        </div>
      </div>
    </div></section>
    <section className="section spirit-section"><div className="section-heading"><div><div className="eyebrow">The CWC spirit</div><h2>Belonging is<br />the beginning.</h2></div><p>Every woman arrives with her own experience. We make room for those experiences to meet, and for new connections to take shape.</p></div>
      <figure className="wide-photo"><img src="/cwc-community.png" width="705" height="458" alt="A large group of women and community members gathered together at a CWC event" loading="lazy" /><figcaption>Room for every voice.</figcaption></figure>
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow">Part of a wider purpose</div><h2>A subsidiary of B4P CODEFOUND</h2><p>Columbus Women Connect was founded by B4P CODEFOUND and is part of its wider commitment to community. Learn more about the parent organization and its work.</p></div><a href={parentSite} target="_blank" rel="noopener noreferrer">Visit B4P CODEFOUND <ArrowUpRight size={16} /></a></div></section>
  </Layout>;
}

function Programs() {
  return <Layout>
    <PageHero eyebrow="Programs & opportunities" title="Ways to connect." emphasis="Ways to flourish." intro="Our program areas reflect the many ways women build confidence, community and opportunity—together." image="/cwc-community-workshop.png" alt="Women sharing ideas and listening to one another at a community workshop" imagePosition="center 47%" />
    <section className="section programs-section">
      <div className="section-heading"><div><div className="eyebrow">Six ways to take part</div><h2>Find your way<br />into the room.</h2></div><p>Explore the areas CWC brings together. Each is an invitation to connect, share what you know and keep growing.</p></div>
      <div className="program-grid">{programs.map(([num,title,description]) => <article key={num} className="program-card"><span className="program-index">{num} / CWC</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className="program-photo-band"><img src="/cwc-outdoor-activity.png" width="705" height="458" alt="Women and families enjoying an outdoor group activity together" loading="lazy" /><div><div className="eyebrow">Community, in every setting</div><h2>Good things happen<br />when we gather.</h2><p>From thoughtful conversation to shared experiences, there are many ways to find connection.</p></div></section>
    <section className="split-band"><div className="split-inner"><div className="quote-box">The best work begins with being in the room—and knowing you belong there.</div><div className="split-copy"><div className="eyebrow">Take the next step</div><h2>Let’s find what<br />fits for you.</h2><p>Whether you are looking for community, mentorship or ways to contribute, start a conversation with CWC.</p><Link href="/join" className="button-primary">Ways to join <ArrowRight size={17} /></Link></div></div></section>
  </Layout>;
}

function Join() {
  return <Layout>
    <PageHero eyebrow="Join the community" title="Come as you are." emphasis="Bring what you know." intro="All women and their daughters are welcome. CWC is a place to meet people, share perspectives and find new ways to participate." image="/cwc-outdoor-activity.png" alt="Women and families taking part in a lively outdoor community activity" imagePosition="center 52%" action={<div className="hero-actions"><a href={joinHref} className="button-primary">Email CWC about joining <ArrowUpRight size={16} /></a></div>} />
    <section className="join-layout">
      <div>
        <div className="eyebrow">Ways to take part</div>
        <div className="join-steps">
          <article className="join-step"><span>01</span><div><h3>Start a conversation</h3><p>Tell us a little about yourself and what you hope to find in a community.</p></div></article>
          <article className="join-step"><span>02</span><div><h3>Explore the program areas</h3><p>Discover opportunities across dialogues, development, mentorship and well-being.</p></div></article>
          <article className="join-step"><span>03</span><div><h3>Bring your perspective</h3><p>Your experience matters here. Join in, connect with others and help shape the community.</p></div></article>
        </div>
        <p className="join-note">There is no form to fill out on this page. Email is the direct way to reach the CWC team.</p>
      </div>
      <aside className="join-card">
        <div className="eyebrow">Your next step</div>
        <h2>We’d love<br />to meet you.</h2>
        <p>Send a note to the CWC team to introduce yourself and ask about getting involved.</p>
        <a className="button-primary" href={joinHref} data-testid="link-join-email">Email CWC about joining <ArrowUpRight size={16} /></a>
        <p className="email-hint">Opens your email app addressed to management@b4pcodefound.org.</p>
      </aside>
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow">Share the invitation</div><h2>Community grows by welcome.</h2><p>Know a woman or daughter who would value a community like this? Let them know there is room for them here.</p></div><a href={joinHref}>Connect with CWC <ArrowUpRight size={16} /></a></div></section>
  </Layout>;
}

function Chair() {
  return <Layout>
    <PageHero
      eyebrow="A message from our Chair"
      title="A welcome shaped"
      emphasis="by every voice."
      intro="To everyone who supports, partners with, visits and believes in Columbus Women Connect: you are welcome here."
      image="/cwc-community.png"
      alt="Women and community members gathered together at a Columbus Women Connect event"
      imagePosition="center 48%"
      action={<div className="hero-actions"><Link href="/join" className="button-primary">Find your place <ArrowRight size={17} /></Link><Link href="/contact" className="button-outline">Get in touch</Link></div>}
    />
    <section className="chair-letter-section">
      <div className="chair-letter-layout">
        <div className="chair-letter-intro">
          <div className="eyebrow">From the Chair</div>
          <h2>Connection makes room for every woman to grow.</h2>
          <p>Columbus Women Connect brings women together across cultures and generations to lead, advocate and build community.</p>
        </div>
        <article className="chair-letter">
          <p className="chair-letter-greeting">Dear supporters, partners, friends, and visitors,</p>
          <p>Welcome to Columbus Women Connect. I am glad you are here.</p>
          <p>CWC began with a simple belief: when women across cultures and generations come together, every voice can be heard and everyone has more room to grow. We bring that belief to life through conversation, mentorship, professional development, community events and support for well-being.</p>
          <p>Whether you have supported this work from the beginning, partnered with us, shared our message or just found our site today, your presence matters. Each connection helps strengthen the community we are building together.</p>
          <p>Thank you for your encouragement, generosity and trust. I invite you to explore our programs, reach out and take part in whatever way feels right to you. We look forward to meeting you.</p>
          <p className="chair-letter-signoff">With gratitude,<br /><strong>Chair</strong><br />Columbus Women Connect</p>
        </article>
      </div>
    </section>
  </Layout>;
}

function Contact() {
  return <Layout>
    <PageHero eyebrow="Contact CWC" title="Let’s begin" emphasis="a conversation." intro="Questions about the community, programs or ways to join? We would be glad to hear from you." image="/cwc-community.png" alt="Columbus Women Connect members gathered together at a community event" imagePosition="center 48%" />
    <section className="contact-layout">
      <div className="contact-panel"><div className="eyebrow">Reach the people</div><h2>Talk with CWC.</h2>
        <div className="contact-line"><span>Columbus Women Connect</span><a href={joinHref}>management@b4pcodefound.org</a></div>
        <div className="contact-line"><span>Chair</span><a href={chairEmail}>fatimahane@hotmail.com</a><a href="tel:+16144242938">614-424-2938</a></div>
        <div className="contact-line"><span>Parent organization</span><a href={parentSite} target="_blank" rel="noopener noreferrer">B4P CODEFOUND <ArrowUpRight size={15} /></a></div>
      </div>
      <div className="contact-panel contact-story"><div className="eyebrow">Connected by community</div><h2>One conversation<br />can open a door.</h2>
        <p>Columbus Women Connect brings women together across cultures and generations, in Columbus and beyond. Reach out directly by email or phone—no contact form, no extra steps.</p>
        <img className="contact-photo" src="/cwc-cultural-community.png" width="350" height="250" alt="Women in cultural dress celebrating the cultures and traditions represented in the CWC community" loading="lazy" />
      </div>
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow">A wider community</div><h2>Learn about B4P CODEFOUND</h2><p>Columbus Women Connect is a subsidiary of B4P CODEFOUND. Visit the parent organization’s website for more.</p></div><a href={parentSite} target="_blank" rel="noopener noreferrer">b4pcodefound.org <ArrowUpRight size={16} /></a></div></section>
  </Layout>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/chair" component={Chair} />
    <Route path="/programs" component={Programs} />
    <Route path="/join" component={Join} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch></RoutedErrorBoundary>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
