import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Braces,
  Code2,
  Database,
  Github,
  GraduationCap,
  Heart,
  Layers3,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Palette,
  PanelsTopLeft,
  Send,
  Sparkles,
  Sun,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kunibilli Tejaswini | Software Developer Portfolio" },
      {
        name: "description",
        content:
          "Meet Kunibilli Tejaswini, a Computer Science student in Visakhapatnam focused on frontend development, thoughtful interfaces, and continuous learning.",
      },
      { property: "og:title", content: "Kunibilli Tejaswini | Software Developer Portfolio" },
      {
        property: "og:description",
        content:
          "A portfolio of Kunibilli Tejaswini, aspiring software developer and Computer Science student at Vignan's Institute of Information Technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const learnedSkills = [
  { name: "HTML5", mark: "5", detail: "Structure" },
  { name: "CSS3", mark: "3", detail: "Styling" },
  { name: "JavaScript", mark: "JS", detail: "Programming" },
  { name: "Python", mark: "Py", detail: "Programming" },
  { name: "MySQL", mark: "SQL", detail: "Database" },
];

const learningSkills = [
  { name: "React.js", mark: "R", detail: "Frontend library" },
  { name: "Tailwind CSS", mark: "Tw", detail: "Styling" },
];

type ProjectCategory = "All" | "HTML/CSS/JavaScript" | "React.js";

const projectCategories: ProjectCategory[] = ["All", "HTML/CSS/JavaScript", "React.js"];

const projects = [
  {
    title: "Personal Portfolio Website",
    description:
      "A professional, responsive portfolio introducing its creator, education, skills, projects, and contact details.",
    category: "HTML/CSS/JavaScript" as const,
    art: "portfolio" as const,
  },
  {
    title: "Movie Explorer Application",
    description:
      "A movie discovery interface for exploring titles, viewing details, and keeping a list of favourites.",
    category: "React.js" as const,
    art: "movies" as const,
  },
  {
    title: "Task Management Application",
    description:
      "An interactive task manager concept for creating, organizing, and tracking everyday tasks.",
    category: "React.js" as const,
    art: "tasks" as const,
  },
];

const interests = ["Frontend Development", "UI/UX Design", "Problem Solving"];
const rotatingInterests = ["Frontend Development", "UI/UX Design", "Digital Experiences"];

function Portfolio() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [themeReady, setThemeReady] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState<ProjectCategory>("All");
  const [interestIndex, setInterestIndex] = useState(0);
  const [typedInterest, setTypedInterest] = useState("");
  const [isDeletingInterest, setIsDeletingInterest] = useState(false);
  const [formNotice, setFormNotice] = useState("");

  useEffect(() => {
    try {
      if (window.localStorage.getItem("tejaswini-portfolio-theme") === "light") {
        setTheme("light");
      }
    } catch {
      // The portfolio remains usable when browser storage is unavailable.
    }
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;

    document.documentElement.classList.toggle("light", theme === "light");
    try {
      window.localStorage.setItem("tejaswini-portfolio-theme", theme);
    } catch {
      // Theme switching still works for the current visit without browser storage.
    }
  }, [theme, themeReady]);

  useEffect(() => {
    const sectionNodes = navItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        const latestSection = visibleSections.at(-1);
        if (latestSection) setActiveSection(latestSection.target.id);
      },
      { rootMargin: "-22% 0px -65% 0px", threshold: 0 },
    );

    sectionNodes.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const word = rotatingInterests[interestIndex] ?? rotatingInterests[0] ?? "Frontend Development";
    const timeoutDuration =
      !isDeletingInterest && typedInterest === word
        ? 1100
        : isDeletingInterest && typedInterest.length === 0
          ? 300
          : isDeletingInterest
            ? 38
            : 78;

    const timeout = window.setTimeout(() => {
      if (!isDeletingInterest && typedInterest === word) {
        setIsDeletingInterest(true);
        return;
      }

      if (isDeletingInterest && typedInterest.length === 0) {
        setIsDeletingInterest(false);
        setInterestIndex((current) => (current + 1) % rotatingInterests.length);
        return;
      }

      setTypedInterest(word.slice(0, typedInterest.length + (isDeletingInterest ? -1 : 1)));
    }, timeoutDuration);

    return () => window.clearTimeout(timeout);
  }, [interestIndex, isDeletingInterest, typedInterest]);

  const visibleProjects =
    projectFilter === "All"
      ? projects
      : projects.filter((project) => project.category === projectFilter);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const values = new FormData(form);
    const senderName = String(values.get("name") ?? "").trim();
    const senderEmail = String(values.get("email") ?? "").trim();
    const subject = String(values.get("subject") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();
    const body = `From: ${senderName}\nEmail: ${senderEmail}\n\n${message}`;

    setFormNotice("Your email app should open with a draft to review. This page does not send or store messages.");
    window.location.href = `mailto:ktejaswini099@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <div className="site-header__inner page-container">
          <a className="brand" href="#home" aria-label="Kunibilli Tejaswini, home" onClick={closeMobileMenu}>
            <span className="brand__mark" aria-hidden="true">KT</span>
            <span className="brand__name">Kunibilli Tejaswini</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`nav-link${activeSection === item.id ? " nav-link--active" : ""}`}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-header__actions">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="theme-toggle"
              onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-site-navigation"
              title={mobileMenuOpen ? "Close navigation" : "Open navigation"}
            >
              {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen ? (
          <nav className="mobile-nav page-container" id="mobile-site-navigation" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                className={`mobile-nav__link${activeSection === item.id ? " mobile-nav__link--active" : ""}`}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
                <ArrowUpRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main>
        <section className="hero-section" id="home" aria-labelledby="hero-title">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-art" aria-hidden="true">
            <img src="/images/tejaswini-developer-art.png" alt="" />
          </div>
          <div className="hero-content page-container">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" /> CSE student · Class of 2027</p>
              <h1 className="hero-title" id="hero-title">
                Hi, I&apos;m <span className="hero-title__name">Kunibilli<br className="desktop-break" /> Tejaswini.</span>
              </h1>
              <p className="hero-role">Aspiring Software Developer <span aria-hidden="true">|</span> Frontend Developer</p>
              <p className="hero-intro">
                I&apos;m a Computer Science and Engineering student passionate about frontend development, UI/UX design and creating beautiful digital experiences. I enjoy transforming ideas into responsive, interactive and user-friendly websites while continuously improving my technical and problem-solving skills.
              </p>
              <div className="hero-interest" aria-live="polite" aria-atomic="true">
                <Sparkles aria-hidden="true" />
                <span>Exploring</span>
                <span className="typing-text">{typedInterest}<span className="typing-caret" aria-hidden="true" /></span>
              </div>
              <div className="hero-actions">
                <Button asChild size="lg" className="button-primary">
                  <a href="#projects">View my projects <ArrowRight aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="outline" size="lg" className="button-secondary">
                  <a href="/resume-placeholder.txt" download="Kunibilli-Tejaswini-resume-placeholder.txt">
                    Download resume <ArrowDown aria-hidden="true" />
                  </a>
                </Button>
              </div>
              <p className="resume-note">Temporary placeholder download · replace with your actual resume PDF</p>
              <div className="hero-socials" aria-label="Social profiles">
                <Button asChild variant="ghost" size="icon" className="social-icon">
                  <a href="https://github.com/ktejaswini09" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub">
                    <Github aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="social-icon">
                  <a href="https://www.linkedin.com/in/tejaswini-kunibilli-9969bb2b6" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
                    <Linkedin aria-hidden="true" />
                  </a>
                </Button>
                <Button asChild variant="ghost" size="icon" className="social-icon">
                  <a href="mailto:ktejaswini099@gmail.com" aria-label="Email Kunibilli Tejaswini" title="Email">
                    <Mail aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
            <a className="hero-scroll" href="#about" aria-label="Scroll to about section">
              <span>Scroll to explore</span><ArrowDown aria-hidden="true" />
            </a>
          </div>
          <div className="hero-art-caption" aria-hidden="true">
            <span className="hero-art-caption__line" />
            <span>Curiosity in motion</span>
          </div>
        </section>

        <section className="content-section about-section" id="about" aria-labelledby="about-title">
          <div className="page-container">
            <SectionHeading number="01" label="A little about me" title="Curious by nature. Building with purpose." id="about-title" />
            <div className="about-layout">
              <div className="about-copy">
                <p>
                  I&apos;m Kunibilli Tejaswini, a B.Tech Computer Science and Engineering student at Vignan&apos;s Institute of Information Technology, Duvvada, Visakhapatnam. I am passionate about frontend development, UI/UX design and software development. I enjoy creating responsive websites and interactive user interfaces. I am always interested in learning new technologies, improving my programming skills and building practical projects.
                </p>
                <h3 className="subheading">What I&apos;m interested in</h3>
                <ul className="interest-list">
                  {interests.map((interest) => <li key={interest}>{interest}</li>)}
                  <li>Responsive Web Design</li>
                  <li>Interactive Web Applications</li>
                  <li>Continuous Learning</li>
                </ul>
              </div>
              <aside className="profile-facts" aria-label="Personal and education details">
                <div className="profile-facts__top">
                  <span className="fact-icon"><GraduationCap aria-hidden="true" /></span>
                  <span className="fact-label">Currently studying</span>
                </div>
                <h3>Vignan&apos;s Institute of Information Technology</h3>
                <p>B.Tech · Computer Science and Engineering</p>
                <div className="profile-facts__bottom">
                  <span><span className="fact-label">Graduating</span><strong>2027</strong></span>
                  <span><span className="fact-label">Based in</span><strong>Visakhapatnam, India</strong></span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section skills-section" id="skills" aria-labelledby="skills-title">
          <div className="page-container">
            <SectionHeading number="02" label="Tools & technologies" title="A growing toolkit." id="skills-title" />
            <p className="section-intro">Skills I&apos;ve learned so far, kept separate from the technologies I&apos;m learning now.</p>
            <div className="skills-groups">
              <SkillGroup title="Currently learned" note="Foundations" items={learnedSkills} />
              <SkillGroup title="Currently learning" note="In progress" items={learningSkills} learning />
            </div>
            <p className="skills-footnote"><Code2 aria-hidden="true" /> No skill percentages or unverified proficiency claims.</p>
          </div>
        </section>

        <section className="content-section projects-section" id="projects" aria-labelledby="projects-title">
          <div className="page-container">
            <SectionHeading number="03" label="Selected work" title="Ideas worth exploring." id="projects-title" />
            <div className="projects-toolbar">
              <p className="section-intro">Example entries from your brief — replace with verified project details and links.</p>
              <div className="project-filters" aria-label="Filter projects">
                {projectCategories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={projectFilter === category ? "secondary" : "ghost"}
                    size="sm"
                    className={`filter-button${projectFilter === category ? " filter-button--active" : ""}`}
                    onClick={() => setProjectFilter(category)}
                    aria-pressed={projectFilter === category}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div className="projects-grid" aria-live="polite">
              {visibleProjects.map((project, index) => (
                <article className="project-item" key={project.title}>
                  <ProjectArtwork variant={project.art} />
                  <div className="project-item__body">
                    <div className="project-item__meta">
                      <span>Example entry</span>
                      <span className="project-category">{project.category}</span>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-item__footer">
                      <span className="project-stack"><Layers3 aria-hidden="true" /> Stack details to confirm</span>
                      <span className="project-index">0{index + 1}</span>
                    </div>
                    <p className="project-links-note">Repository and live demo links not provided yet.</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section education-section" id="education" aria-labelledby="education-title">
          <div className="page-container">
            <SectionHeading number="04" label="Education" title="Learning the foundations." id="education-title" />
            <div className="education-timeline">
              <div className="timeline-marker"><GraduationCap aria-hidden="true" /></div>
              <div className="education-entry">
                <div className="education-entry__top">
                  <div>
                    <p className="eyebrow">Currently pursuing</p>
                    <h3>Vignan&apos;s Institute of Information Technology</h3>
                    <p className="education-degree">B.Tech — Computer Science and Engineering</p>
                  </div>
                  <span className="year-badge">2027</span>
                </div>
                <div className="education-entry__details">
                  <span><PanelsTopLeft aria-hidden="true" /> Duvvada, Visakhapatnam, Andhra Pradesh</span>
                  <span><span className="status-dot" /> In progress</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section certifications-section" id="certifications" aria-labelledby="certifications-title">
          <div className="page-container">
            <SectionHeading number="05" label="Certifications" title="Credentials, when they’re ready." id="certifications-title" />
            <div className="certification-empty">
              <span className="empty-icon"><BadgeCheck aria-hidden="true" /></span>
              <div>
                <h3>Certificate details to be added</h3>
                <p>No certificate names, issuers, dates, or verification links were supplied. Add confirmed details here when ready.</p>
              </div>
              <span className="empty-state-label">Awaiting details</span>
            </div>
          </div>
        </section>

        <section className="content-section contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page-container">
            <SectionHeading number="06" label="Get in touch" title="Let’s make something useful." id="contact-title" />
            <div className="contact-layout">
              <div className="contact-copy">
                <p className="contact-lede">Open to conversations about internships, early-career opportunities, and thoughtful digital work.</p>
                <a className="contact-email" href="mailto:ktejaswini099@gmail.com">
                  <span className="contact-email__icon"><Mail aria-hidden="true" /></span>
                  <span><span className="fact-label">Email me</span><strong>ktejaswini099@gmail.com</strong></span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
                <div className="contact-socials">
                  <a href="https://github.com/ktejaswini09" target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub <ArrowUpRight aria-hidden="true" /></a>
                  <a href="https://www.linkedin.com/in/tejaswini-kunibilli-9969bb2b6" target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn <ArrowUpRight aria-hidden="true" /></a>
                </div>
                <p className="contact-location"><span className="status-dot" /> Visakhapatnam, Andhra Pradesh, India</p>
              </div>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <Label htmlFor="contact-name">Full name</Label>
                    <Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required minLength={2} />
                  </div>
                  <div className="form-field">
                    <Label htmlFor="contact-email">Email address</Label>
                    <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                  </div>
                </div>
                <div className="form-field">
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" name="subject" placeholder="What would you like to discuss?" required minLength={3} />
                </div>
                <div className="form-field">
                  <Label htmlFor="contact-message">Message</Label>
                  <Textarea id="contact-message" name="message" placeholder="Write a few lines…" required minLength={10} rows={5} />
                </div>
                <div className="form-submit-row">
                  <Button type="submit" size="lg" className="button-primary"><span>Send message</span><Send aria-hidden="true" /></Button>
                  <p>Opens a draft in your email app. Nothing is sent from this page.</p>
                </div>
                <p className="form-notice" role="status" aria-live="polite">{formNotice}</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-container">
          <div className="footer-top">
            <div className="footer-identity">
              <a className="brand" href="#home" aria-label="Kunibilli Tejaswini, back to top">
                <span className="brand__mark" aria-hidden="true">KT</span>
                <span className="brand__name">Kunibilli Tejaswini</span>
              </a>
              <p>Aspiring Software Developer <span aria-hidden="true">·</span> Frontend Developer</p>
            </div>
            <nav className="footer-nav" aria-label="Footer navigation">
              {navItems.slice(1).map((item) => <a key={item.id} href={`#${item.id}`}>{item.label}</a>)}
            </nav>
            <div className="footer-contact-links">
              <a href="https://github.com/ktejaswini09" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub"><Github aria-hidden="true" /></a>
              <a href="https://www.linkedin.com/in/tejaswini-kunibilli-9969bb2b6" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><Linkedin aria-hidden="true" /></a>
              <a href="mailto:ktejaswini099@gmail.com" aria-label="Email Kunibilli Tejaswini" title="Email"><Mail aria-hidden="true" /></a>
              <Button asChild variant="outline" size="icon" className="back-to-top">
                <a href="#home" aria-label="Back to top" title="Back to top"><ArrowUp aria-hidden="true" /></a>
              </Button>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Kunibilli Tejaswini</span>
            <span>Made with curiosity <Heart aria-hidden="true" /></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading__label"><span>{number}</span><span className="section-heading__rule" /><span>{label}</span></div>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function SkillGroup({
  title,
  note,
  items,
  learning = false,
}: {
  title: string;
  note: string;
  items: { name: string; mark: string; detail: string }[];
  learning?: boolean;
}) {
  return (
    <div className="skill-group">
      <div className="skill-group__heading">
        <div><h3>{title}</h3><p>{note}</p></div>
        <span className="skill-group__count">{String(items.length).padStart(2, "0")}</span>
      </div>
      <div className="skill-grid">
        {items.map((skill) => (
          <div className={`skill-item${learning ? " skill-item--learning" : ""}`} key={skill.name}>
            <span className="skill-mark" aria-hidden="true">{skill.mark}</span>
            <span className="skill-item__copy"><strong>{skill.name}</strong><span>{skill.detail}</span></span>
            {learning ? <Sparkles className="skill-item__sparkle" aria-label="Currently learning" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectArtwork({ variant }: { variant: "portfolio" | "movies" | "tasks" }) {
  if (variant === "portfolio") {
    return (
      <div className="project-art project-art--portfolio" aria-hidden="true">
        <div className="art-window">
          <div className="art-window__top"><span /><span /><span /><i>portfolio.html</i></div>
          <div className="art-code">
            <span className="art-code__number">01</span><span className="art-code__tag">&lt;section</span><span className="art-code__prop"> class=</span><span className="art-code__value">&quot;hello&quot;</span><span className="art-code__tag">&gt;</span>
            <span className="art-code__number">02</span><span className="art-code__indent" /><span className="art-code__tag">&lt;h1&gt;</span><span>Curiosity, crafted.</span><span className="art-code__tag">&lt;/h1&gt;</span>
            <span className="art-code__number">03</span><span className="art-code__tag">&lt;/section&gt;</span>
          </div>
          <div className="art-window__footer"><span><Code2 aria-hidden="true" /> responsive layout</span><span>01 / 03</span></div>
        </div>
        <span className="art-accent art-accent--portfolio"><Braces aria-hidden="true" /></span>
      </div>
    );
  }

  if (variant === "movies") {
    return (
      <div className="project-art project-art--movies" aria-hidden="true">
        <div className="movie-art-header"><span>Discover</span><span className="movie-art-search">⌕</span></div>
        <div className="movie-art-feature"><span>TONIGHT&apos;S PICK</span><strong>Stories<br />worth seeing.</strong><i>Explore collection <ArrowRight aria-hidden="true" /></i></div>
        <div className="movie-art-shelf"><span /><span /><span /></div>
        <span className="art-accent art-accent--movies"><Sparkles aria-hidden="true" /></span>
      </div>
    );
  }

  return (
    <div className="project-art project-art--tasks" aria-hidden="true">
      <div className="task-art-heading"><span>Today</span><span>3 of 5 complete</span></div>
      <div className="task-art-progress"><span /></div>
      <div className="task-art-list">
        <span className="task-art-row task-art-row--done"><i>✓</i><b>Plan the week</b><em>DONE</em></span>
        <span className="task-art-row"><i /><b>Build a new idea</b><em>NOW</em></span>
        <span className="task-art-row"><i /><b>Review and learn</b><em>LATER</em></span>
      </div>
      <span className="art-accent art-accent--tasks"><Code2 aria-hidden="true" /></span>
    </div>
  );
}