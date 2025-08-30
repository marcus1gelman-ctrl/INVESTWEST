import React, { useEffect, useState } from "react";
import "./App.css";

// -----------------------------
// Utilities
// -----------------------------
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.pageYOffset - 72; // sticky nav offset
  window.scrollTo({ top: y, behavior: "smooth" });
};

const ExternalLink = ({ href, children }) => (
  <a className="link" href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

// -----------------------------
// Navbar
// -----------------------------
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_ITEMS = [
    { id: "about", label: "About" },
    { id: "how", label: "How It Works" },
    { id: "prizes", label: "Prizes" },
    { id: "rules", label: "Rules" },
    { id: "eligibility", label: "Eligibility" },
    { id: "registration", label: "Registration" },
    { id: "dates", label: "Dates" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <button
          className="brand"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          InvestWest
        </button>

        <ul className="nav__list" role="menubar" aria-label="Site sections">
          {NAV_ITEMS.map((it) => (
            <li key={it.id} role="none">
              <button
                className="nav__link"
                role="menuitem"
                onClick={() => scrollToId(it.id)}
              >
                {it.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// -----------------------------
// Hero
// -----------------------------
function Hero() {
  return (
    <header className="hero" role="banner">
      <div className="container hero__inner">
        <h1 className="hero__title">The InvestWest Competition</h1>
        <p className="hero__subtitle">
          A national investment challenge created by high school students from
          Westchester to promote financial literacy and real-world investing
          skills — hosted on{" "}
          <ExternalLink href="https://www.howthemarketworks.com/">
            How The Market Works (HTMW)
          </ExternalLink>
          .
        </p>
        <div className="hero__actions">
          <button
            className="btn btn--primary"
            onClick={() => scrollToId("registration")}
          >
            Register Now
          </button>
          <button className="btn" onClick={() => scrollToId("how")}>
            See How It Works
          </button>
        </div>
      </div>
      <div className="hero__wave" aria-hidden="true" />
    </header>
  );
}

// -----------------------------
// Section wrapper
// -----------------------------
const Section = ({ id, title, children, tone = "default" }) => (
  <section
    id={id}
    className={`section section--${tone}`}
    aria-labelledby={`${id}-title`}
  >
    <div className="container">
      <h2 id={`${id}-title`} className="section__title">
        {title}
      </h2>
      <div className="section__content">{children}</div>
    </div>
  </section>
);

// -----------------------------
// Content Sections
// -----------------------------
function About() {
  return (
    <Section id="about" title="About the Competition">
      <p>
        The InvestWest Competition is a national investment challenge created by
        high school students from Westchester with the goal of promoting financial
        literacy and investment skills among students across the country. Hosted
        on the <em>How The Market Works (HTMW)</em> trading platform, the competition
        provides participants with a hands-on opportunity to learn about the stock
        market and practice real-world investing strategies in a risk-free environment.
      </p>
      <p>
        By combining education with competition, InvestWest empowers students to build
        the financial knowledge and confidence they need for the future.
      </p>
    </Section>
  );
}

function HowItWorks() {
  return (
    <Section id="how" title="How It Works" tone="alt">
      <p>
        Each participant begins the competition with a virtual balance of{" "}
        <strong>$100,000</strong> in cash. Trading mirrors the real market and follows
        the New York Stock Exchange schedule: Monday through Friday, 9:30 AM – 4:00 PM EST.
        Participants can invest in publicly traded companies and experience market dynamics
        in real time — without financial risk.
      </p>
    </Section>
  );
}

function Prizes() {
  return (
    <Section id="prizes" title="Prizes">
      <p>
        To recognize achievement, InvestWest offers a prize pool of <strong>$1,000</strong>.
        Prizes are awarded to the top three competitors by final portfolio value.
      </p>
    </Section>
  );
}

function Rules() {
  return (
    <Section id="rules" title="Rules & Fair Play" tone="alt">
      <p>
        To ensure fairness and encourage smart investing, participants may not purchase
        stocks priced under $5 or allocate more than <strong>25%</strong> of their portfolio
        to a single stock. Trading follows the schedule of the New York Stock Exchange, with
        market hours from Monday to Friday, 9:30 AM to 4:00 PM EST. Options, commodities,
        and short selling are prohibited.
      </p>
    </Section>
  );
}

function Eligibility() {
  return (
    <Section id="eligibility" title="Student Eligibility">
      <p>
        The InvestWest Competition is open to all <strong>high school students in the United States</strong>.
      </p>
    </Section>
  );
}

// -----------------------------
// Registration (updated with screenshot instructions)
// -----------------------------
function Registration() {
  const handleHTMW = () =>
    window.open("https://app.howthemarketworks.com/register/343878", "_blank");

  const handleGoogleForm = () =>
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSfHwX6r2kgORMj8v_oUI4khJ-JMN6QuMfgs2zjoEb8wcUlaxw/viewform?usp=header",
      "_blank"
    );

  return (
    <Section id="registration" title="Registration">
      <p>
        Step 1: Click the button below to join the HTMW competition. When prompted, enter the password{" "}
        <strong>West100</strong>.
      </p>
      <div className="cta">
        <button className="btn btn--primary btn--lg" onClick={handleHTMW}>
          Register on HTMW
        </button>
        <p className="muted">
          If the link does not open, copy this URL into your browser:{" "}
          <code>https://app.howthemarketworks.com/register/343878</code>
        </p>
      </div>

      <div className="important">
        <p>
          If the above link gives you trouble, you can first register a normal HTMW account, then
          locate the <strong>Find New Contest</strong> button. Type in <strong>"The InvestWest Competition"</strong> and click <strong>Join</strong> to enter. See the screenshot below for reference.
        </p>
        <img
          src="/screenshot.png"
          alt="How to find and join the InvestWest competition on HTMW"
          style={{ width: "100%", borderRadius: "12px", marginTop: "1rem" }}
        />
      </div>

      <p>
        Step 2: After registering on HTMW, fill out the Google Form below. You will need your HTMW username, school, grade, and email to complete it. This step is required to be officially entered.
      </p>
      <div className="important">
        <button className="btn btn--primary" onClick={handleGoogleForm}>
          Fill Out Google Form
        </button>
      </div>
    </Section>
  );
}

// -----------------------------
// Dates
// -----------------------------
function Dates() {
  const timeline = [
    { label: "Registration opens", date: "Wednesday, August 20" },
    { label: "Registration closes", date: "Friday, November 28" },
    { label: "Trading begins", date: "Monday, December 1" },
    { label: "Trading ends", date: "Monday, March 2" },
    { label: "Winners announced", date: "Monday, March 9" },
  ];

  return (
    <Section id="dates" title="Important Dates" tone="alt">
      <ol className="timeline" aria-label="Key dates timeline">
        {timeline.map((t, i) => (
          <li key={i} className="timeline__item">
            <div className="timeline__dot" aria-hidden="true" />
            <div className="timeline__content">
              <div className="timeline__label">{t.label}</div>
              <div className="timeline__date">{t.date}</div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// -----------------------------
// FAQ
// -----------------------------
function FAQItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`faq ${open ? "faq--open" : ""}`}>
      <button
        className="faq__q"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{q}</span>
        <span className="faq__chev" aria-hidden="true">{open ? "▾" : "▸"}</span>
      </button>
      <div className="faq__a">
        <p>{a}</p>
      </div>
    </div>
  );
}

function FAQ() {
  return (
    <Section id="faq" title="Frequently Asked Questions">
      <FAQItem
        q="Do I need real money to participate?"
        a="No. The competition uses virtual cash on the HTMW simulator, so there is no real financial risk."
        defaultOpen
      />
      <FAQItem
        q="What happens if I create more than one account?"
        a="Only one account per student is allowed. Multiple accounts will result in removal of all accounts."
      />
      <FAQItem
        q="Can I trade crypto or options?"
        a="No. Options, commodities, and short selling are prohibited. Stick to equities priced at $5 or higher."
      />
      <FAQItem
        q="What time can I trade?"
        a="Trades follow real market hours: Monday–Friday, 9:30 AM to 4:00 PM EST, in line with the NYSE."
      />
    </Section>
  );
}

// -----------------------------
// Contact
// -----------------------------
function Contact() {
  return (
    <Section id="contact" title="Contact Us" tone="alt">
      <p>Have questions about the competition? Reach out directly:</p>
      <div className="contact-grid">
        <div className="contact-card">
          <strong>Phone:</strong>
          <p>914-374-2069</p>
        </div>
        <div className="contact-card">
          <strong>Email:</strong>
          <p><a href="mailto:marcushane@icloud.com">marcushane@icloud.com</a></p>
        </div>
      </div>
    </Section>
  );
}

// -----------------------------
// Footer
// -----------------------------
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__inner">
        <div className="footer__brand">InvestWest</div>
        <div className="footer__meta">© 2025 InvestWest Competition • All Rights Reserved</div>
      </div>
    </footer>
  );
}

// -----------------------------
// Back To Top
// -----------------------------
function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      className="backtotop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      title="Back to top"
    >
      ↑
    </button>
  );
}

// -----------------------------
// App composition
// -----------------------------
export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <Prizes />
      <Rules />
      <Eligibility />
      <Registration />
      <Dates />
      <FAQ />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

