import { useEffect, useState, type ReactNode } from 'react';
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
const nav = [['Home', '/'], ['About', '/about'], ['Programs', '/programs'], ['Join', '/join'], ['Contact', '/contact']];
const pageMeta: Record<string, [string, string]> = {
  '/': ['Columbus Women Connect | Leadership Across Cultures', 'Columbus Women Connect empowers women through leadership, advocacy and community across cultures and generations in Columbus, Ohio.'],
  '/about': ['About Columbus Women Connect | Our Story', 'Learn about the mission, vision and story of Columbus Women Connect, founded in November 2024 by B4P CODEFOUND.'],
  '/programs': ['Programs | Columbus Women Connect', 'Explore CWC programs: community dialogues, professional development, mentorship, events, business development, and well-being.'],
  '/join': ['Join Columbus Women Connect | All Women Welcome', 'Join Columbus Women Connect. All women and their daughters are welcome in this community of leadership, advocacy and belonging.'],
  '/contact': ['Contact Columbus Women Connect | Columbus, Ohio', 'Contact Columbus Women Connect and connect with the chair or parent organization, B4P CODEFOUND.'],
};

function Metadata({ path }: { path: string }) {
  useEffect(() => {
    const [title, description] = pageMeta[path] ?? pageMeta['/'];
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }, [path]);
  return null;
}

function Header() {
  const [path] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return <>
    <div className="topline">A Columbus community for women across cultures & generations</div>
    <header className="nav-wrap">
      <nav className="nav-inner" aria-label="Main navigation">
        <Link href="/" className="brand" aria-label="Columbus Women Connect home">
          <img src="/cwc-logo.png" width="350" height="157" alt="Columbus Women Connect logo" />
        </Link>
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`nav-links ${open ? 'open' : ''}`}>
          {nav.map(([label, href]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} data-testid={`link-nav-${label.toLowerCase()}`}>{label}</Link>)}
        </div>
        <Link href="/join" className="nav-join" data-testid="link-join-header">Find your place <ArrowUpRight size={14} /></Link>
      </nav>
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="footer-inner">
      <div>
        <img className="footer-logo" src="/cwc-logo.png" width="350" height="157" alt="Columbus Women Connect" />
        <p>Women coming together to lead, advocate and build community across cultures and generations.</p>
      </div>
      <div><h3>Explore</h3>{nav.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      <div><h3>Connect</h3>
        <a href={joinHref}>Email Columbus Women Connect</a>
        <a href={chairEmail}>Contact the chair</a>
        <a href={parentSite} target="_blank" rel="noopener noreferrer">B4P CODEFOUND <ArrowUpRight size={12} /></a>
      </div>
    </div>
    <div className="footer-bottom"><span>Columbus Women Connect · Founded November 2024</span><span>A subsidiary of B4P CODEFOUND</span></div>
  </footer>;
}

function Layout({ children }: { children: ReactNode }) {
  const [path] = useLocation();
  return <div className="site-shell"><Metadata path={path} /><a className="skip-link" href="#main-content">Skip to content</a><Header /><main id="main-content" className="page-main">{children}</main><Footer /></div>;
}

function Home() {
  return <Layout>
    <section className="hero">
      <div className="fade-up">
        <div className="eyebrow">Columbus, Ohio · Women, together</div>
        <h1>Many stories.<br />One <em>shared</em><br />future.</h1>
        <p className="hero-copy">Columbus Women Connect brings women together across cultures and generations—to lead, advocate and build a stronger community.</p>
        <div className="hero-actions"><Link href="/about" className="button-primary">Discover our story <ArrowRight size={15} /></Link><Link href="/programs" className="button-outline">Explore programs</Link></div>
      </div>
      <div className="hero-art fade-up">
        <img src="/cwc-community.png" width="705" height="458" alt="Women leaders and community members gathered at a Columbus Women Connect event" fetchPriority="high" />
        <div className="ring-stamp" aria-hidden="true"></div>
        <div className="photo-note"><strong>Room for every voice.</strong>Building connection across cultures, careers and generations.</div>
      </div>
    </section>
    <section className="proof-strip" aria-label="Inaugural conference impact">
      <div className="proof-inner">
        <div className="proof-item"><span className="proof-number">60+</span><span className="proof-label">women leaders at our inaugural conference</span></div>
        <div className="proof-item"><span className="proof-number">20+</span><span className="proof-label">nationalities represented in one room</span></div>
        <div className="proof-note">A beginning rooted in the strength of women showing up for one another.</div>
      </div>
    </section>
    <section className="section">
      <div className="section-heading"><div><div className="eyebrow">What brings us together</div><h2>Connection with<br />room to grow.</h2></div><p>From a first conversation to a new leadership path, our offerings create ways to meet, learn and move forward together.</p></div>
      <div className="program-grid">{programs.map(([num,title,description]) => <Link key={num} href="/programs" className="program-card"><span className="program-index">{num} / CWC</span><span className="arrow-mark"><ArrowUpRight size={18} /></span><h3>{title}</h3><p>{description}</p></Link>)}</div>
      <div className="hero-actions"><Link href="/programs" className="button-outline">See all program areas <ArrowRight size={14} /></Link></div>
    </section>
    <section className="split-band"><div className="split-inner">
      <div className="quote-box">“Leadership grows when we make space for one another.”</div>
      <div className="split-copy"><div className="eyebrow">A community by design</div><h2>Different paths.<br />Shared possibility.</h2><p>Founded in November 2024 by B4P CODEFOUND, CWC was created to empower women through leadership, advocacy and community. All women and their daughters are welcome.</p><Link href="/about" className="button-outline">Meet CWC <ArrowRight size={14} /></Link></div>
    </div></section>
    <section className="section" style={{textAlign:'center'}}>
      <div className="eyebrow" style={{justifyContent:'center'}}>Start with a hello</div>
      <h2 className="serif" style={{fontSize:'clamp(43px,6vw,68px)',fontWeight:400,lineHeight:1,margin:'20px 0'}}>There is a place for you here.</h2>
      <p style={{color:'#65636a',maxWidth:500,margin:'0 auto 26px',lineHeight:1.7}}>Whether you are exploring, building or ready to contribute, we would love to hear from you.</p>
      <Link href="/join" className="button-primary">Find your place <ArrowRight size={15} /></Link>
    </section>
  </Layout>;
}

function About() {
  return <Layout>
    <section className="page-hero compact">
      <div className="eyebrow">About Columbus Women Connect</div>
      <h1>Rooted in community.<br /><em>Open to every story.</em></h1>
      <p className="intro">CWC is a multicultural women’s leadership and community network in Columbus, Ohio—bringing people together across cultures and generations.</p>
    </section>
    <section className="about-story"><div className="story-inner">
      <div><div className="eyebrow">Our beginning</div><h2>A new kind<br />of gathering.</h2></div>
      <div><p>Founded in November 2024 by B4P CODEFOUND, Columbus Women Connect began with a clear belief: women are stronger when they can learn, lead and advocate alongside one another.</p><p>At the inaugural conference, more than 60 women leaders representing over 20 nationalities came together. That gathering reflected the community CWC is here to nurture—generous, varied and full of possibility.</p>
        <div className="mission-grid">
          <article className="mission-card"><h3>Our mission</h3><p>Empower women through leadership, advocacy and community across cultures and generations.</p></article>
          <article className="mission-card"><h3>Our vision</h3><p>A connected community where every woman can contribute, grow and lead.</p></article>
        </div>
      </div>
    </div></section>
    <section className="section"><div className="section-heading"><div><div className="eyebrow">The CWC spirit</div><h2>Belonging is<br />the beginning.</h2></div><p>Every woman arrives with her own experience. We make room for those experiences to meet, and for new connections to take shape.</p></div>
      <img src="/cwc-community.png" width="705" height="458" alt="Community members and women leaders gathered together at a CWC event" loading="lazy" style={{width:'100%',height:'auto',maxHeight:490,objectFit:'cover'}} />
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow" style={{color:'#f5d36e'}}>Part of a wider purpose</div><h2>A subsidiary of B4P CODEFOUND</h2><p>Columbus Women Connect was founded by B4P CODEFOUND and is part of its wider commitment to community. Learn more about the parent organization and its work.</p></div><a href={parentSite} target="_blank" rel="noopener noreferrer">Visit B4P CODEFOUND <ArrowUpRight size={14} /></a></div></section>
  </Layout>;
}

function Programs() {
  return <Layout>
    <section className="page-hero compact">
      <div className="eyebrow">Programs & opportunities</div>
      <h1>Ways to connect.<br /><em>Ways to flourish.</em></h1>
      <p className="intro">Our program areas reflect the many ways women build confidence, community and opportunity—together.</p>
    </section>
    <section className="section" style={{paddingTop:20}}>
      <div className="program-grid">{programs.map(([num,title,description]) => <article key={num} className="program-card" style={{cursor:'default'}}><span className="program-index">{num} / CWC</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>
    <section className="split-band"><div className="split-inner"><div className="quote-box">The best work begins with being in the room—and knowing you belong there.</div><div className="split-copy"><div className="eyebrow">Take the next step</div><h2>Let’s find what<br />fits for you.</h2><p>Whether you are looking for community, mentorship or ways to contribute, start a conversation with CWC.</p><Link href="/join" className="button-primary">Ways to join <ArrowRight size={15} /></Link></div></div></section>
  </Layout>;
}

function Join() {
  return <Layout>
    <section className="page-hero compact">
      <div className="eyebrow">Join the community</div>
      <h1>Come as you are.<br /><em>Bring what you know.</em></h1>
      <p className="intro">All women and their daughters are welcome. CWC is a place to meet people, share perspectives and find new ways to participate.</p>
    </section>
    <section className="join-layout">
      <div>
        <div className="eyebrow">Ways to take part</div>
        <div className="join-steps" style={{marginTop:22}}>
          <article className="join-step"><span>01</span><div><h3>Start a conversation</h3><p>Tell us a little about yourself and what you hope to find in a community.</p></div></article>
          <article className="join-step"><span>02</span><div><h3>Explore the program areas</h3><p>Discover opportunities across dialogues, development, mentorship and well-being.</p></div></article>
          <article className="join-step"><span>03</span><div><h3>Bring your perspective</h3><p>Your experience matters here. Join in, connect with others and help shape the community.</p></div></article>
        </div>
        <p style={{color:'#67656b',fontSize:12,lineHeight:1.7,marginTop:24}}>There is no form to fill out on this page. Email is the direct way to reach the CWC team.</p>
      </div>
      <aside className="join-card">
        <div className="eyebrow">Your next step</div>
        <h2>We’d love<br />to meet you.</h2>
        <p>Send a note to the CWC team to introduce yourself and ask about getting involved.</p>
        <a className="button-primary" href={joinHref} data-testid="link-join-email">Email CWC about joining <ArrowUpRight size={15} /></a>
        <p style={{fontSize:10,marginTop:18,marginBottom:0}}>Opens your email app addressed to management@b4pcodefound.org.</p>
      </aside>
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow" style={{color:'#f5d36e'}}>Share the invitation</div><h2>Community grows by welcome.</h2><p>Know a woman or daughter who would value a community like this? Let them know there is room for them here.</p></div><a href={joinHref}>Connect with CWC <ArrowUpRight size={14} /></a></div></section>
  </Layout>;
}

function Contact() {
  return <Layout>
    <section className="page-hero compact">
      <div className="eyebrow">Contact CWC</div>
      <h1>Let’s begin<br /><em>a conversation.</em></h1>
      <p className="intro">Questions about the community, programs or ways to join? We would be glad to hear from you.</p>
    </section>
    <section className="contact-layout">
      <div className="contact-panel"><h2>Reach the team</h2>
        <div className="contact-line"><span>Columbus Women Connect</span><a href={joinHref}>management@b4pcodefound.org</a></div>
        <div className="contact-line"><span>Chair</span><a href={chairEmail}>fatimahane@hotmail.com</a><a href="tel:+16144242938">614-424-2938</a></div>
        <div className="contact-line"><span>Parent organization</span><a href={parentSite} target="_blank" rel="noopener noreferrer">B4P CODEFOUND <ArrowUpRight size={13} /></a></div>
      </div>
      <div className="contact-panel"><h2>Connected by community</h2>
        <p style={{color:'#65636a',fontSize:14,lineHeight:1.75,maxWidth:460}}>Columbus Women Connect brings women together across cultures and generations, in Columbus and beyond. Reach out directly by email or phone—no contact form, no extra steps.</p>
        <img className="contact-photo" src="/cwc-community.png" width="705" height="458" alt="CWC community members gathered at a Columbus event" loading="lazy" />
      </div>
    </section>
    <section className="parent-band"><div className="parent-inner"><div><div className="eyebrow" style={{color:'#f5d36e'}}>A wider community</div><h2>Learn about B4P CODEFOUND</h2><p>Columbus Women Connect is a subsidiary of B4P CODEFOUND. Visit the parent organization’s website for more.</p></div><a href={parentSite} target="_blank" rel="noopener noreferrer">b4pcodefound.org <ArrowUpRight size={14} /></a></div></section>
  </Layout>;
}

function Router() {
  return <RoutedErrorBoundary><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
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
