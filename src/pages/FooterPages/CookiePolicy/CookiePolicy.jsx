import React, { useState, useEffect, useRef, useCallback } from "react";
import "./CookiePolicy.css";

/* ─────────────────────────────────
   SECTION METADATA
───────────────────────────────── */
const SECTIONS = [
  {
    id: "controller",
    num: "01",
    icon: "fas fa-building",
    color: "teal",
    // tag: "Identity",
    title: "Data Controller",
    summary: "Who manages this policy",
  },
  {
    id: "what",
    num: "02",
    icon: "fas fa-cookie-bite",
    color: "amber",
    // tag: "Basics",
    title: "What Are Cookies?",
    summary: "Definition and similar technologies",
  },
  {
    id: "types",
    num: "03",
    icon: "fas fa-layer-group",
    color: "blue",
    // tag: "Categories",
    title: "Types of Cookies Used",
    summary: "Technical, functional, analytics, marketing",
  },
  {
    id: "banner",
    num: "04",
    icon: "fas fa-sliders-h",
    color: "purple",
    // tag: "Consent",
    title: "Cookie Banner and Consent Management",
    summary: "How we manage your preferences",
  },
  {
    id: "third-party",
    num: "05",
    icon: "fas fa-plug",
    color: "coral",
    // tag: "Third-party",
    title: "Third-Party Cookies",
    summary: "External services and their cookies",
  },
  {
    id: "duration",
    num: "06",
    icon: "fas fa-clock",
    color: "green",
    // tag: "Duration",
    title: "Cookie Duration",
    summary: "Session vs persistent cookies",
  },
  {
    id: "disable",
    num: "07",
    icon: "fas fa-ban",
    color: "red",
    // tag: "Control",
    title: "How to Disable Cookies",
    summary: "Browser-level cookie management",
  },
  {
    id: "rights",
    num: "08",
    icon: "fas fa-user-check",
    color: "teal",
    // tag: "Your Rights",
    title: "User Rights",
    summary: "Your GDPR rights",
  },
  {
    id: "changes",
    num: "09",
    icon: "fas fa-sync-alt",
    color: "gray",
    // tag: "Updates",
    title: "Changes to this Cookie Policy",
    summary: "How we notify you of updates",
  },
];

/* ─────────────────────────────────
   CONTENT COMPONENTS
───────────────────────────────── */
const C1 = () => (
  <>
    <p>The Data Controller is:</p>
    <div className="cp-info-card">
      {[
        ["Company", "TODO GROUP S.R.L."],
        ["Registered office", "Via Ilioneo 85/D, 80124 Naples, Italy"],
        ["VAT/Tax ID", "09781131215"],
        ["REA", "NA - 1056793"],
        [
          "Website",
          <a href="https://todoai.ai" target="_blank" rel="noreferrer">
            https://todoai.ai
          </a>,
        ],
        ["Email", <a href="mailto:support@todoai.ai">support@todoai.ai</a>],
        [
          "Certified email",
          <a href="mailto:todogroupsrl@pec.it">todogroupsrl@pec.it</a>,
        ],
      ].map(([label, val], i) => (
        <div className="cp-info-row" key={i}>
          <span className="cp-info-label">{label}</span>
          <span className="cp-info-value">{val}</span>
        </div>
      ))}
    </div>
  </>
);

const C2 = () => (
  <>
    <p>
      Cookies are small text files stored on the user's device when visiting a
      website or using an online service.
    </p>
    <p>Similar technologies include:</p>
    <div className="cp-tech-grid">
      {[
        { icon: "fas fa-image", label: "Pixels" },
        { icon: "fas fa-tag", label: "Tags" },
        { icon: "fas fa-mobile-alt", label: "SDKs" },
        { icon: "fas fa-hdd", label: "Local Storage" },
        { icon: "fas fa-history", label: "Session Storage" },
        { icon: "fas fa-fingerprint", label: "Device Identifiers" },
        { icon: "fas fa-code", label: "Tracking Scripts" },
      ].map((item, i) => (
        <div className="cp-tech-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="cp-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        For the purposes of this Cookie Policy, all such technologies are
        referred to as <strong>cookies or similar technologies</strong>.
      </span>
    </div>
  </>
);

/* Sub-accordion for cookie types */
const CookieTypeCard = ({
  icon,
  color,
  title,
  badge,
  badgeColor,
  items,
  note,
  noteColor,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`cp-cookie-type ${open ? "open" : ""} border-${color}`}>
      <button className="cp-ct-header" onClick={() => setOpen((o) => !o)}>
        <div className="cp-ct-left">
          <span className={`cp-ct-icon bg-${color}`}>
            <i className={icon}></i>
          </span>
          <span className="cp-ct-title">{title}</span>
          {badge && (
            <span className={`cp-ct-badge badge-${badgeColor}`}>{badge}</span>
          )}
        </div>
        <i
          className={`fas fa-chevron-down cp-ct-chevron ${open ? "rot" : ""}`}
        ></i>
      </button>
      <div className={`cp-ct-body ${open ? "visible" : ""}`}>
        {items.map((item, i) => (
          <div className="cp-ct-item" key={i}>
            <i className="fas fa-circle cp-ct-dot"></i>
            <span>{item}</span>
          </div>
        ))}
        {note && (
          <div className={`cp-ct-note note-${noteColor || "info"}`}>
            <i
              className={`fas ${noteColor === "green" ? "fa-check-circle" : "fa-info-circle"}`}
            ></i>
            <span>{note}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const C3 = () => (
  <>
    <p>TODO AI may use the following categories of cookies.</p>
    <div className="cp-cookie-types">
      <CookieTypeCard
        icon="fas fa-cog"
        color="teal"
        title="3.1 Technical Cookies"
        badge="No Consent Required"
        badgeColor="green"
        items={[
          "Enable navigation",
          "Maintain sessions",
          "Manage login",
          "Store security preferences",
          "Provide requested services",
          "Ensure platform stability",
        ]}
        note="Technical cookies are necessary for the correct operation of the website and platform. They do not require user consent."
        noteColor="green"
      />
      <CookieTypeCard
        icon="fas fa-sliders-h"
        color="blue"
        title="3.2 Functional Cookies"
        badge="Improves Experience"
        badgeColor="blue"
        items={[
          "Remember language preferences",
          "Store interface settings",
          "Save previous selections",
          "Personalize user experience",
        ]}
        note="Functional cookies allow the platform to remember user choices and improve the overall experience."
        noteColor="info"
      />
      <CookieTypeCard
        icon="fas fa-chart-bar"
        color="purple"
        title="3.3 Analytics Cookies"
        badge="May Require Consent"
        badgeColor="amber"
        items={[
          "Pages visited",
          "Time spent on the website",
          "Traffic sources",
          "Aggregated usage statistics",
          "Technical performance",
        ]}
        note="Analytics cookies may require consent unless they are fully anonymized and used only for statistical purposes in accordance with applicable law."
        noteColor="info"
      />
      <CookieTypeCard
        icon="fas fa-bullhorn"
        color="coral"
        title="3.4 Marketing and Profiling Cookies"
        badge="Consent Required"
        badgeColor="red"
        items={[
          "Measure advertising campaigns",
          "Deliver personalized advertising",
          "Carry out retargeting",
          "Understand user interests",
          "Connect advertising platforms such as Google, Meta, TikTok, LinkedIn or similar services",
        ]}
        note="Marketing and profiling cookies require prior consent before being activated."
        noteColor="warning"
      />
    </div>
  </>
);

const C4 = () => (
  <>
    <p>
      Upon first access to the website or platform, users may be shown a cookie
      banner that allows them to:
    </p>
    <div className="cp-banner-demo">
      <div className="cp-banner-preview">
        <div className="cp-banner-top">
          <i className="fas fa-cookie-bite"></i>
          <span>We use cookies to improve your experience</span>
        </div>
        <div className="cp-banner-actions">
          <button className="cp-btn-accept">Accept All</button>
          <button className="cp-btn-reject">Reject Non-Essential</button>
          <button className="cp-btn-custom">Customize</button>
        </div>
      </div>
    </div>
    <div className="cp-consent-options">
      {[
        {
          icon: "fas fa-check-circle",
          color: "green",
          text: "Accept all cookies",
        },
        {
          icon: "fas fa-times-circle",
          color: "red",
          text: "Reject non-essential cookies",
        },
        {
          icon: "fas fa-sliders-h",
          color: "blue",
          text: "Customize preferences",
        },
        {
          icon: "fas fa-file-alt",
          color: "teal",
          text: "Access this Cookie Policy",
        },
        {
          icon: "fas fa-undo",
          color: "purple",
          text: "Manage consent choices",
        },
      ].map((item, i) => (
        <div className={`cp-consent-item border-${item.color}`} key={i}>
          <i className={`${item.icon} icon-${item.color}`}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <div className="cp-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Consent preferences may be recorded through a Consent Management
        Platform or similar tool. Users may modify or withdraw consent at any
        time through the cookie settings link, where available, or through
        browser settings.
      </span>
    </div>
  </>
);

const C5 = () => (
  <>
    <p>
      TODO AI may use or integrate third-party services that may install their
      own cookies or similar technologies.
    </p>
    <p>These may include, by way of example:</p>
    <div className="cp-third-grid">
      {[
        { icon: "fab fa-google", label: "Google Analytics", color: "blue" },
        { icon: "fab fa-google", label: "Google Ads", color: "red" },
        { icon: "fab fa-facebook", label: "Meta Pixel", color: "blue" },
        {
          icon: "fab fa-linkedin",
          label: "LinkedIn Insight Tag",
          color: "blue",
        },
        { icon: "fab fa-tiktok", label: "TikTok Pixel", color: "gray" },
        { icon: "fab fa-youtube", label: "YouTube", color: "red" },
        { icon: "fab fa-google", label: "Google Maps", color: "green" },
        { icon: "fas fa-address-book", label: "CRM Tools", color: "teal" },
        { icon: "fas fa-comments", label: "Chat Tools", color: "purple" },
        { icon: "fas fa-credit-card", label: "Payment Tools", color: "green" },
        {
          icon: "fas fa-chart-line",
          label: "Analytics & Performance Tools",
          color: "amber",
        },
      ].map((item, i) => (
        <div className={`cp-third-item tc-${item.color}`} key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="cp-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        Third-party cookies are governed by the privacy and cookie policies of
        the respective third parties. TODO GROUP S.R.L. is not responsible for
        cookies installed directly by independent third parties.
      </span>
    </div>
  </>
);

const C6 = () => (
  <>
    <p>Cookies may be:</p>
    <div className="cp-duration-cards">
      <div className="cp-dur-card session">
        <div className="cp-dur-icon">
          <i className="fas fa-hourglass-end"></i>
        </div>
        <div className="cp-dur-body">
          <h4>Session Cookies</h4>
          <p>
            Deleted automatically when the browser is closed. They exist only
            for the duration of your browsing session.
          </p>
          <span className="cp-dur-tag">Temporary</span>
        </div>
      </div>
      <div className="cp-dur-card persistent">
        <div className="cp-dur-icon">
          <i className="fas fa-save"></i>
        </div>
        <div className="cp-dur-body">
          <h4>Persistent Cookies</h4>
          <p>
            Stored for a defined period unless deleted earlier by the user.
            Duration depends on the purpose and provider settings.
          </p>
          <span className="cp-dur-tag">Time-limited</span>
        </div>
      </div>
    </div>
    <div className="cp-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Where required, persistent non-essential cookies are used only after
        consent.
      </span>
    </div>
  </>
);

const C7 = () => (
  <>
    <p>
      Users can manage or delete cookies through their browser settings. The
      main browsers allow users to block, delete or limit cookies. However,
      disabling technical cookies may affect the correct functioning of the
      website or platform.
    </p>
    <p>Users should consult the official instructions of their browser:</p>
    <div className="cp-browser-grid">
      {[
        {
          icon: "fab fa-chrome",
          label: "Google Chrome",
          url: "https://support.google.com/chrome/answer/95647",
          color: "blue",
        },
        {
          icon: "fab fa-firefox",
          label: "Mozilla Firefox",
          url: "https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer",
          color: "coral",
        },
        {
          icon: "fab fa-safari",
          label: "Apple Safari",
          url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
          color: "teal",
        },
        {
          icon: "fab fa-edge",
          label: "Microsoft Edge",
          url: "https://support.microsoft.com/help/4027947",
          color: "blue",
        },
      ].map((b, i) => (
        <a
          href={b.url}
          target="_blank"
          rel="noreferrer"
          className={`cp-browser-card bc-${b.color}`}
          key={i}
        >
          <i className={b.icon}></i>
          <span>{b.label}</span>
          <i className="fas fa-external-link-alt cp-ext-ico"></i>
        </a>
      ))}
    </div>
    <div className="cp-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        Disabling technical cookies may affect the correct functioning of the
        website or platform.
      </span>
    </div>
  </>
);

const C8 = () => (
  <>
    <p>Users may exercise their rights under GDPR, including:</p>
    <div className="cp-rights-grid">
      {[
        { icon: "fas fa-search", right: "Access" },
        { icon: "fas fa-edit", right: "Rectification" },
        { icon: "fas fa-trash-alt", right: "Erasure" },
        { icon: "fas fa-pause-circle", right: "Restriction" },
        { icon: "fas fa-hand-paper", right: "Objection" },
        { icon: "fas fa-exchange-alt", right: "Portability" },
        { icon: "fas fa-undo", right: "Withdrawal of Consent" },
      ].map((r, i) => (
        <div className="cp-right-item" key={i}>
          <span className="cp-right-ico">
            <i className={r.icon}></i>
          </span>
          <span>{r.right}</span>
        </div>
      ))}
    </div>
    <p style={{ marginTop: "18px" }}>Requests may be sent to:</p>
    <div className="cp-contact-btns">
      <a href="mailto:support@todoai.ai" className="cp-contact-btn primary">
        <i className="fas fa-envelope"></i> support@todoai.ai
      </a>
      <a href="mailto:todogroupsrl@pec.it" className="cp-contact-btn outline">
        <i className="fas fa-envelope-open"></i> todogroupsrl@pec.it
      </a>
    </div>
  </>
);

const C9 = () => (
  <>
    <p>
      TODO GROUP S.R.L. may amend this Cookie Policy at any time due to legal,
      technical or operational changes.
    </p>
    <p>
      The updated version will be published on{" "}
      <a href="https://todoai.ai" target="_blank" rel="noreferrer">
        https://todoai.ai
      </a>{" "}
      and, where necessary, users will be notified through:
    </p>
    <div className="cp-notify-row">
      {[
        { icon: "fas fa-cookie-bite", label: "Cookie Banner" },
        { icon: "fas fa-globe", label: "Website" },
        { icon: "fas fa-desktop", label: "Platform" },
      ].map((c, i) => (
        <div className="cp-notify-item" key={i}>
          <i className={c.icon}></i>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  </>
);

const CONTENT_MAP = {
  controller: C1,
  what: C2,
  types: C3,
  banner: C4,
  "third-party": C5,
  duration: C6,
  disable: C7,
  rights: C8,
  changes: C9,
};

/* ─────────────────────────────────
   MAIN COMPONENT
───────────────────────────────── */
const CookiePolicy = () => {
  const [openSections, setOpenSections] = useState({});
  const [activeSection, setActiveSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const sectionRefs = useRef({});

  const toggleSection = useCallback(
    (id) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] })),
    [],
  );

  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpenSections((prev) => ({ ...prev, [id]: true }));
      setSidebarOpen(false);
    }
  }, []);

  const handleExpandAll = useCallback(() => {
    const next = !expandAll;
    setExpandAll(next);
    const map = {};
    SECTIONS.forEach((s) => {
      map[s.id] = next;
    });
    setOpenSections(map);
  }, [expandAll]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActiveSection(e.target.dataset.id),
        ),
      { rootMargin: "-25% 0px -65% 0px" },
    );
    Object.values(sectionRefs.current).forEach(
      (el) => el && observer.observe(el),
    );
    return () => observer.disconnect();
  }, []);

  const filtered = searchQuery.trim()
    ? SECTIONS.filter(
        (s) =>
          s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.tag.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : SECTIONS;

  return (
    <div className="cp-page">
      {/* Progress bar */}
      <div className="cp-progress-bar" style={{ width: `${readProgress}%` }} />

      {/* Hero */}
      <div className="cp-hero">
        <div className="cp-hero-shapes">
          <div className="cp-shape cp-shape-1" />
          <div className="cp-shape cp-shape-2" />
          <div className="cp-shape cp-shape-3" />
          <div className="cp-cookie-float cp-cf-1">
            <i className="fas fa-cookie-bite"></i>
          </div>
          <div className="cp-cookie-float cp-cf-2">
            <i className="fas fa-cookie"></i>
          </div>
          <div className="cp-cookie-float cp-cf-3">
            <i className="fas fa-cookie-bite"></i>
          </div>
        </div>
        <div className="cp-hero-inner">
          <div className="cp-hero-badges">
            <span className="cp-hero-badge">
              <i className="fas fa-shield-alt"></i> GDPR & ePrivacy Compliant
            </span>
            <span className="cp-hero-badge secondary">
              <i className="fas fa-calendar-alt"></i> Last updated: June 03,
              2026
            </span>
          </div>
          {/* <div className="cp-hero-icon-wrap">
            <i className="fas fa-cookie-bite"></i>
          </div> */}
          <h1 className="cp-hero-title">Cookie Policy</h1>
          <p className="cp-hero-company">TODO AI — TODO GROUP S.R.L.</p>
          <p className="cp-hero-desc">
            This Cookie Policy explains how TODO GROUP S.R.L. uses cookies and
            similar technologies on the website https://todoai.ai, related web
            services, dashboards, mobile applications where available, and
            digital services connected to the TODO AI platform.
          </p>
          <p className="cp-hero-legal">
            Provided pursuant to Regulation (EU) 2016/679, GDPR, and the
            ePrivacy Directive 2002/58/EC, as amended.
          </p>
          <div className="cp-hero-stats">
            <div className="cp-hero-stat">
              <span className="cp-stat-num">9</span>
              <span className="cp-stat-label">Sections</span>
            </div>
            <div className="cp-hero-divider" />
            <div className="cp-hero-stat">
              <span className="cp-stat-num">4</span>
              <span className="cp-stat-label">Cookie Types</span>
            </div>
            <div className="cp-hero-divider" />
            <div className="cp-hero-stat">
              <span className="cp-stat-num">{readProgress}%</span>
              <span className="cp-stat-label">Read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="cp-layout">
        {/* Mobile bar */}
        <div className="cp-mobile-bar">
          <button
            className="cp-toc-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
            <span>{sidebarOpen ? "Close" : "Contents"}</span>
          </button>
          <div className="cp-mini-progress">
            <div
              className="cp-mini-fill"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`cp-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="cp-sidebar-inner">
            <div className="cp-toc-search">
              {/* <i className="fas fa-search cp-search-ico"></i>
              <input
                type="text"
                placeholder="Search sections…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cp-search-input"
              />
              {searchQuery && (
                <button
                  className="cp-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )} */}
            </div>
            {/* Cookie type quick-reference */}
            <div className="cp-sidebar-legend">
              <p className="cp-legend-title">Cookie types</p>
              {[
                { color: "teal", label: "Technical", note: "No consent" },
                { color: "blue", label: "Functional", note: "Improves UX" },
                {
                  color: "purple",
                  label: "Analytics",
                  note: "May need consent",
                },
                { color: "red", label: "Marketing", note: "Consent required" },
              ].map((t, i) => (
                <div className="cp-legend-row" key={i}>
                  <span className={`cp-legend-dot dot-${t.color}`}></span>
                  <span className="cp-legend-label">{t.label}</span>
                  <span className="cp-legend-note">{t.note}</span>
                </div>
              ))}
            </div>
            <nav className="cp-toc">
              {filtered.length === 0 && (
                <p className="cp-no-results">No sections found</p>
              )}
              {filtered.map((s) => (
                <button
                  key={s.id}
                  className={`cp-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className={`cp-toc-dot color-${s.color}`} />
                  <span className="cp-toc-num">{s.num}</span>
                  <span className="cp-toc-label">{s.title}</span>
                  {openSections[s.id] && (
                    <i className="fas fa-check cp-toc-check"></i>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="cp-main">
          <div className="cp-controls-bar">
            <span className="cp-section-count">{SECTIONS.length} sections</span>
            <button className="cp-expand-btn" onClick={handleExpandAll}>
              <i
                className={`fas ${expandAll ? "fa-compress-alt" : "fa-expand-alt"}`}
              ></i>
              {expandAll ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {SECTIONS.map((s) => {
            const Content = CONTENT_MAP[s.id];
            const isOpen = !!openSections[s.id];
            return (
              <div
                key={s.id}
                className={`cp-section color-${s.color} ${isOpen ? "is-open" : ""}`}
                data-id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
              >
                <button
                  className="cp-section-header"
                  onClick={() => toggleSection(s.id)}
                  aria-expanded={isOpen}
                >
                  <div className="cp-section-left">
                    <span className={`cp-section-num color-${s.color}`}>
                      {s.num}
                    </span>
                    <div className="cp-section-meta">
                      {/* <span className={`cp-section-tag color-${s.color}`}>
                        {s.tag}
                      </span> */}
                      <span className="cp-section-title-text">{s.title}</span>
                      <span className="cp-section-summary">{s.summary}</span>
                    </div>
                  </div>
                  <div className="cp-section-right">
                    <span className={`cp-section-icon-wrap color-${s.color}`}>
                      <i className={s.icon}></i>
                    </span>
                    <span className={`cp-chevron-wrap ${isOpen ? "open" : ""}`}>
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </button>
                <div className={`cp-section-body ${isOpen ? "expanded" : ""}`}>
                  <div className="cp-section-content">
                    <Content />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div className="cp-footer-cta">
            <div className="cp-footer-icon">
              <i className="fas fa-cookie-bite"></i>
            </div>
            <h3>Questions about our Cookie Policy?</h3>
            <p>Contact the TODO GROUP S.R.L. privacy team</p>
            <div className="cp-footer-btns">
              <a
                href="mailto:support@todoai.ai"
                className="cp-footer-btn primary"
              >
                <i className="fas fa-envelope"></i> support@todoai.ai
              </a>
              <a
                href="mailto:todogroupsrl@pec.it"
                className="cp-footer-btn outline"
              >
                <i className="fas fa-envelope-open"></i> todogroupsrl@pec.it
              </a>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CookiePolicy;
