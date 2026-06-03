import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PrivacyRoles.css";

/* ─────────────────────────────────
   SECTION METADATA
───────────────────────────────── */
const SECTIONS = [
  {
    id: "controller",
    num: "01",
    icon: "fas fa-building",
    color: "teal",
    // tag: "Controller",
    title: "Data Controller",
    summary: "Who controls your data",
  },
  {
    id: "processors",
    num: "02",
    icon: "fas fa-sitemap",
    color: "blue",
    // tag: "Processors",
    title: "Data Processors under Article 28 GDPR",
    summary: "Third-party providers we engage",
  },
  {
    id: "biz-clients",
    num: "03",
    icon: "fas fa-briefcase",
    color: "purple",
    // tag: "Business",
    title: "Business Clients as Independent Controllers",
    summary: "When clients control their own data",
  },
  {
    id: "joint",
    num: "04",
    icon: "fas fa-handshake",
    color: "coral",
    // tag: "Joint",
    title: "Joint Controllers",
    summary: "Shared data control arrangements",
  },
  {
    id: "todo-proc",
    num: "05",
    icon: "fas fa-cogs",
    color: "amber",
    // tag: "As Processor",
    title: "TODO GROUP as Data Processor",
    summary: "When we process on your behalf",
  },
  {
    id: "subjects",
    num: "06",
    icon: "fas fa-users",
    color: "teal",
    // tag: "People",
    title: "Data Subjects",
    summary: "Who the data is about",
  },
  {
    id: "special",
    num: "07",
    icon: "fas fa-fingerprint",
    color: "red",
    // tag: "Sensitive",
    title: "Special Categories of Data",
    summary: "Biometric and sensitive data",
  },
  {
    id: "integration",
    num: "08",
    icon: "fas fa-plug",
    color: "blue",
    // tag: "Integration",
    title: "Technical and Legal Integration Guidelines",
    summary: "How to deploy compliantly",
  },
  {
    id: "requests",
    num: "09",
    icon: "fas fa-user-check",
    color: "green",
    // tag: "Requests",
    title: "Data Subject Requests",
    summary: "How to exercise your rights",
  },
  {
    id: "updates",
    num: "10",
    icon: "fas fa-sync-alt",
    color: "gray",
    // tag: "Updates",
    title: "Updates to this Document",
    summary: "How changes are communicated",
  },
];

/* ─────────────────────────────────
   CONTENT COMPONENTS
───────────────────────────────── */
const C1 = () => (
  <>
    <p>
      For personal data collected directly through https://todoai.ai, the TODO
      AI platform, business dashboard, demo requests, contact forms, support
      requests, account management, billing, security logs and service
      administration, the Data Controller is:
    </p>
    <div className="pr-info-card">
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
        <div className="pr-info-row" key={i}>
          <span className="pr-info-label">{label}</span>
          <span className="pr-info-value">{val}</span>
        </div>
      ))}
    </div>
    <p>
      TODO GROUP S.R.L. defines the purposes and means of processing for data
      collected through:
    </p>
    <div className="pr-chip-grid">
      {[
        { icon: "fas fa-globe", text: "Website and landing pages" },
        { icon: "fas fa-cloud", text: "SaaS platform" },
        { icon: "fas fa-brain", text: "AI engine" },
        { icon: "fas fa-tachometer-alt", text: "Dashboard" },
        { icon: "fas fa-server", text: "Cloud systems" },
        { icon: "fas fa-code", text: "APIs and SDKs" },
        { icon: "fas fa-plug", text: "Plugins" },
        {
          icon: "fas fa-mobile-alt",
          text: "Mobile applications, where available",
        },
        { icon: "fas fa-headset", text: "Support channels" },
        {
          icon: "fas fa-desktop",
          text: "Physical installations, where directly operated by TODO GROUP S.R.L.",
        },
      ].map((item, i) => (
        <div className="pr-chip" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </>
);

const C2 = () => (
  <>
    <p>
      TODO GROUP S.R.L. may engage third-party providers to process personal
      data on its behalf.
    </p>
    <p>Such providers may include:</p>
    <div className="pr-proc-grid">
      {[
        { icon: "fas fa-server", label: "Hosting providers" },
        { icon: "fas fa-cloud", label: "Cloud platforms" },
        { icon: "fas fa-robot", label: "AI service providers" },
        { icon: "fas fa-comments", label: "NLP providers" },
        {
          icon: "fas fa-camera",
          label: "Facial analysis and voice processing providers",
        },
        { icon: "fas fa-shield-alt", label: "Cybersecurity providers" },
        { icon: "fas fa-credit-card", label: "Payment providers" },
        { icon: "fas fa-code", label: "Software developers" },
        { icon: "fas fa-tools", label: "System integrators" },
        { icon: "fas fa-chart-bar", label: "Analytics providers" },
        {
          icon: "fas fa-mail-bulk",
          label: "CRM and email marketing providers",
        },
        { icon: "fas fa-headset", label: "Customer support providers" },
      ].map((item, i) => (
        <div className="pr-proc-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="pr-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Where required, these providers are appointed as Data Processors under
        Article 28 GDPR through appropriate agreements. An updated list of
        external processors may be requested by contacting{" "}
        <a href="mailto:support@todoai.ai">support@todoai.ai</a>.
      </span>
    </div>
  </>
);

const C3 = () => (
  <>
    <p>
      Business Clients may act as independent Data Controllers when they use
      TODO AI to process data of their own customers, users, visitors, patients,
      employees or contacts and independently decide the purposes and means of
      such processing.
    </p>
    <p>Examples include:</p>
    <div className="pr-example-cards">
      {[
        {
          icon: "fas fa-globe",
          text: "A company using TODO AI on its own website",
        },
        {
          icon: "fab fa-shopify",
          text: "An e-commerce using TODO AI to recommend products to customers",
        },
        {
          icon: "fas fa-clinic-medical",
          text: "A clinic or pharmacy using TODO AI to interact with its own users",
        },
        {
          icon: "fas fa-upload",
          text: "A business uploading its own customer data or knowledge base",
        },
        {
          icon: "fas fa-cogs",
          text: "A company configuring the AI assistant for its own commercial or operational purposes",
        },
      ].map((item, i) => (
        <div className="pr-example-card" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <p>In such cases, the Business Client is responsible for:</p>
    <div className="pr-resp-list">
      {[
        { icon: "fas fa-file-alt", text: "Providing its own privacy notice" },
        {
          icon: "fas fa-balance-scale",
          text: "Identifying the correct legal basis",
        },
        {
          icon: "fas fa-check-square",
          text: "Obtaining valid consent where required",
        },
        { icon: "fas fa-user-check", text: "Managing data subject requests" },
        { icon: "fas fa-database", text: "Ensuring uploaded data is lawful" },
        {
          icon: "fas fa-gavel",
          text: "Ensuring compliance with GDPR and other applicable laws",
        },
      ].map((item, i) => (
        <div className="pr-resp-item" key={i}>
          <span className="pr-resp-ico">
            <i className={item.icon}></i>
          </span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </>
);

const C4 = () => (
  <>
    <p>
      TODO GROUP S.R.L. and a Business Client may act as joint controllers where
      they jointly determine the purposes and means of a specific processing
      activity.
    </p>
    <p>This may occur, for example, where:</p>
    <div className="pr-joint-cards">
      {[
        {
          icon: "fas fa-brain",
          text: "Both parties define the purpose of AI training using client datasets",
        },
        {
          icon: "fas fa-project-diagram",
          text: "Both parties jointly decide how user data is used for a specific customized AI project",
        },
        {
          icon: "fas fa-share-alt",
          text: "Both parties share responsibility for a common data processing operation",
        },
      ].map((item, i) => (
        <div className="pr-joint-card" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <div className="pr-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Where joint controllership applies, the parties should define their
        respective responsibilities through a specific agreement pursuant to{" "}
        <strong>Article 26 GDPR</strong>.
      </span>
    </div>
  </>
);

const C5 = () => (
  <>
    <p>
      In certain cases, TODO GROUP S.R.L. may act as Data Processor on behalf of
      a Business Client.
    </p>
    <p>
      This may occur where the Business Client independently determines the
      purposes and means of processing and TODO GROUP S.R.L. processes personal
      data only to provide technical services, hosting, AI processing, dashboard
      access or integrations.
    </p>
    <div className="pr-services-grid">
      {[
        { icon: "fas fa-server", label: "Technical services" },
        { icon: "fas fa-cloud", label: "Hosting" },
        { icon: "fas fa-brain", label: "AI processing" },
        { icon: "fas fa-tachometer-alt", label: "Dashboard access" },
        { icon: "fas fa-plug", label: "Integrations" },
      ].map((item, i) => (
        <div className="pr-service-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="pr-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        In such cases, the relationship must be governed by a{" "}
        <strong>Data Processing Agreement pursuant to Article 28 GDPR</strong>.
      </span>
    </div>
  </>
);

const C6 = () => (
  <>
    <p>Depending on the use case, data subjects may include:</p>
    <div className="pr-subjects-grid">
      {[
        { icon: "fas fa-globe", label: "Website visitors" },
        {
          icon: "fas fa-user-circle",
          label: "Users interacting with AI avatars",
        },
        {
          icon: "fas fa-microphone",
          label: "Users interacting by voice or text",
        },
        {
          icon: "fas fa-camera",
          label: "Users using facial or visual AI features",
        },
        { icon: "fas fa-briefcase", label: "Business client representatives" },
        { icon: "fas fa-tachometer-alt", label: "Dashboard operators" },
        {
          icon: "fas fa-users",
          label: "Employees or collaborators of business clients",
        },
        {
          icon: "fas fa-hospital-user",
          label:
            "Customers, patients, visitors or contacts of business clients",
        },
        { icon: "fas fa-headset", label: "Support requesters" },
        { icon: "fas fa-envelope", label: "Newsletter subscribers" },
      ].map((item, i) => (
        <div className="pr-subject-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </>
);

const C7 = () => (
  <>
    <p>
      TODO AI may process special categories of data only where required by the
      specific service and where a valid legal basis exists.
    </p>
    <p>Such data may include:</p>
    <div className="pr-special-grid">
      {[
        { icon: "fas fa-fingerprint", label: "Biometric data", color: "red" },
        { icon: "fas fa-camera", label: "Facial images", color: "red" },
        {
          icon: "fas fa-heartbeat",
          label: "Health-related information",
          color: "red",
        },
        { icon: "fas fa-microphone", label: "Voice data", color: "coral" },
        { icon: "fas fa-smile", label: "Emotional indicators", color: "amber" },
        {
          icon: "fas fa-user-secret",
          label: "Sensitive information voluntarily provided by users",
          color: "purple",
        },
      ].map((item, i) => (
        <div className={`pr-special-item special-${item.color}`} key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="pr-callout red">
      <i className="fas fa-exclamation-circle"></i>
      <span>
        Where required, <strong>explicit consent must be obtained</strong>{" "}
        before processing such data.
      </span>
    </div>
    <div className="pr-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        Business Clients are responsible for obtaining consent from their own
        users when they deploy TODO AI in their own environment.
      </span>
    </div>
  </>
);

/* Sub-accordion for integration sections */
const IntegSubSection = ({ icon, color, title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pr-integ-sub ${open ? "open" : ""} integ-${color}`}>
      <button className="pr-integ-header" onClick={() => setOpen((o) => !o)}>
        <div className="pr-integ-left">
          <span className={`pr-integ-icon integ-bg-${color}`}>
            <i className={icon}></i>
          </span>
          <span className="pr-integ-title">{title}</span>
        </div>
        <i
          className={`fas fa-chevron-down pr-integ-chevron ${open ? "rot" : ""}`}
        ></i>
      </button>
      <div className={`pr-integ-body ${open ? "visible" : ""}`}>
        <div className="pr-integ-content">{children}</div>
      </div>
    </div>
  );
};

const C8 = () => (
  <>
    <p>
      Business Clients using TODO AI should implement appropriate legal notices
      and consent mechanisms across all user interfaces.
    </p>
    <div className="pr-integ-subs">
      <IntegSubSection
        icon="fas fa-globe"
        color="teal"
        title="8.1 Website or CMS Integration"
      >
        <p>Business Clients should include links to:</p>
        <div className="pr-link-chips">
          {[
            "Terms and Conditions",
            "Privacy Policy",
            "Cookie Policy",
            "Consent settings, where applicable",
          ].map((t, i) => (
            <span className="pr-link-chip" key={i}>
              <i className="fas fa-link"></i>
              {t}
            </span>
          ))}
        </div>
        <p>
          These links should be visible in the footer or another easily
          accessible area.
        </p>
      </IntegSubSection>

      <IntegSubSection
        icon="fas fa-mobile-alt"
        color="blue"
        title="8.2 Mobile App Integration"
      >
        <p>
          Where TODO AI is integrated into a mobile app, the app should include
          a legal section with links to:
        </p>
        <div className="pr-link-chips">
          {[
            "Terms and Conditions",
            "Privacy Policy",
            "Cookie Policy, where applicable",
          ].map((t, i) => (
            <span className="pr-link-chip" key={i}>
              <i className="fas fa-link"></i>
              {t}
            </span>
          ))}
        </div>
        <div className="pr-callout info" style={{ marginTop: "12px" }}>
          <i className="fas fa-info-circle"></i>
          <span>
            Where voice, facial, biometric or sensitive data is processed, a
            short notice and explicit consent mechanism should be displayed
            before the feature is activated.
          </span>
        </div>
      </IntegSubSection>

      <IntegSubSection
        icon="fas fa-desktop"
        color="purple"
        title="8.3 Physical Totems, Kiosks and Offline Installations"
      >
        <p>
          At the start of a session, physical installations should display a
          clear notice such as:
        </p>
        <div className="pr-notice-box">
          <i className="fas fa-quote-left"></i>
          <p>
            "This station uses AI-powered virtual assistants. Voice, visual,
            facial or sensitive data may be processed. By continuing, you
            confirm that you have read the Privacy Policy and, where required,
            consent to the processing of your data. You may request an anonymous
            session where available."
          </p>
        </div>
        <p>Users should be able to:</p>
        <div className="pr-steps">
          {[
            {
              icon: "fas fa-qrcode",
              step: "1",
              text: "View the full Privacy Policy through QR code, touchscreen or printed copy",
            },
            {
              icon: "fas fa-check-square",
              step: "2",
              text: "Provide consent where required",
            },
            {
              icon: "fas fa-user-secret",
              step: "3",
              text: "Choose an anonymous session where available",
            },
          ].map((s, i) => (
            <div className="pr-step" key={i}>
              <div className="pr-step-num">{s.step}</div>
              <div className="pr-step-body">
                <i className={s.icon}></i>
                <span>{s.text}</span>
              </div>
            </div>
          ))}
        </div>
      </IntegSubSection>

      <IntegSubSection
        icon="fas fa-brain"
        color="amber"
        title="8.4 AI Training Dashboard"
      >
        <p>
          When Business Clients upload datasets, documents, product lists,
          knowledge bases or sensitive information, the dashboard should include
          a confirmation such as:
        </p>
        <div className="pr-confirm-box">
          <i className="fas fa-check-circle"></i>
          <p>
            "I confirm that I have the legal right and authorization to upload
            and process this data through TODO AI, and that all required notices
            and consents have been provided."
          </p>
        </div>
      </IntegSubSection>
    </div>
  </>
);

const C9 = () => (
  <>
    <div className="pr-req-split">
      <div className="pr-req-card controller">
        <div className="pr-req-head">
          <i className="fas fa-building"></i>
          <span>TODO GROUP S.R.L. as Controller</span>
        </div>
        <p>
          Where TODO GROUP S.R.L. acts as Data Controller, data subject requests
          may be sent to:
        </p>
        <div className="pr-contact-btns">
          <a href="mailto:support@todoai.ai" className="pr-contact-btn primary">
            <i className="fas fa-envelope"></i>support@todoai.ai
          </a>
          <a
            href="mailto:todogroupsrl@pec.it"
            className="pr-contact-btn outline"
          >
            <i className="fas fa-envelope-open"></i>todogroupsrl@pec.it
          </a>
        </div>
      </div>
      <div className="pr-req-card biz">
        <div className="pr-req-head">
          <i className="fas fa-briefcase"></i>
          <span>Business Client as Controller</span>
        </div>
        <p>
          Where the Business Client acts as Data Controller, the request should
          be handled by the Business Client, with reasonable technical support
          from TODO GROUP S.R.L. where applicable.
        </p>
      </div>
    </div>
  </>
);

const C10 = () => (
  <>
    <p>
      TODO GROUP S.R.L. may update this Privacy Roles and Responsibilities
      Document at any time due to legal, technical, organizational or business
      changes.
    </p>
    <p>
      The updated version will be made available on{" "}
      <a href="https://todoai.ai" target="_blank" rel="noreferrer">
        https://todoai.ai
      </a>{" "}
      or provided to Business Clients through:
    </p>
    <div className="pr-notify-row">
      {[
        { icon: "fas fa-globe", label: "Website" },
        { icon: "fas fa-tachometer-alt", label: "Platform" },
        { icon: "fas fa-tachometer-alt", label: "Dashboard" },
        { icon: "fas fa-file-contract", label: "Contractual documentation" },
      ].map((c, i) => (
        <div className="pr-notify-item" key={i}>
          <i className={c.icon}></i>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  </>
);

const CONTENT_MAP = {
  controller: C1,
  processors: C2,
  "biz-clients": C3,
  joint: C4,
  "todo-proc": C5,
  subjects: C6,
  special: C7,
  integration: C8,
  requests: C9,
  updates: C10,
};

/* ─────────────────────────────────
   MAIN COMPONENT
───────────────────────────────── */
const PrivacyRoles = () => {
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

  /* Role legend items */
  const roles = [
    {
      color: "teal",
      dot: "#05b1bd",
      label: "Data Controller",
      note: "TODO GROUP S.R.L.",
    },
    {
      color: "purple",
      dot: "#8b5cf6",
      label: "Indep. Controller",
      note: "Business Clients",
    },
    {
      color: "coral",
      dot: "#f97316",
      label: "Joint Controllers",
      note: "Both parties",
    },
    {
      color: "amber",
      dot: "#f59e0b",
      label: "Data Processor",
      note: "TODO GROUP S.R.L.",
    },
  ];

  return (
    <div className="pr-page">
      <div className="pr-progress-bar" style={{ width: `${readProgress}%` }} />

      {/* Hero */}
      <div className="pr-hero">
        <div className="pr-hero-shapes">
          <div className="pr-shape pr-shape-1" />
          <div className="pr-shape pr-shape-2" />
          <div className="pr-shape pr-shape-3" />
        </div>
        <div className="pr-hero-inner">
          <div className="pr-hero-badges">
            <span className="pr-hero-badge">
              <i className="fas fa-shield-alt"></i> GDPR Compliant
            </span>
            <span className="pr-hero-badge secondary">
              <i className="fas fa-calendar-alt"></i> Last updated: June 03,
              2026
            </span>
            <span className="pr-hero-badge secondary">
              <i className="fas fa-gavel"></i> Pursuant to Regulation (EU)
              2016/679
            </span>
          </div>
          <h1 className="pr-hero-title">
            Privacy Roles &amp; Responsibilities
          </h1>
          <p className="pr-hero-company">TODO AI — TODO GROUP S.R.L.</p>
          <p className="pr-hero-desc">
            This document explains the privacy roles and responsibilities
            applicable to the use of the TODO AI platform, operated by TODO
            GROUP S.R.L. It clarifies how TODO GROUP S.R.L., business clients,
            end users, processors and other parties may be classified under GDPR
            depending on the specific use of the platform.
          </p>

          {/* Role pills */}
          <div className="pr-hero-roles">
            {[
              {
                label: "Data Controller",
                icon: "fas fa-building",
                bg: "rgba(5,177,189,.25)",
              },
              {
                label: "Data Processor",
                icon: "fas fa-cogs",
                bg: "rgba(245,158,11,.25)",
              },
              {
                label: "Joint Controllers",
                icon: "fas fa-handshake",
                bg: "rgba(249,115,22,.25)",
              },
              {
                label: "Indep. Controller",
                icon: "fas fa-briefcase",
                bg: "rgba(139,92,246,.25)",
              },
            ].map((r, i) => (
              <div
                className="pr-hero-role"
                style={{ background: r.bg }}
                key={i}
              >
                <i className={r.icon}></i>
                <span>{r.label}</span>
              </div>
            ))}
          </div>

          <div className="pr-hero-stats">
            <div className="pr-hero-stat">
              <span className="pr-stat-num">10</span>
              <span className="pr-stat-label">Sections</span>
            </div>
            <div className="pr-hero-divider" />
            <div className="pr-hero-stat">
              <span className="pr-stat-num">4</span>
              <span className="pr-stat-label">GDPR Roles</span>
            </div>
            <div className="pr-hero-divider" />
            <div className="pr-hero-stat">
              <span className="pr-stat-num">{readProgress}%</span>
              <span className="pr-stat-label">Read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pr-layout">
        {/* Mobile bar */}
        <div className="pr-mobile-bar">
          <button
            className="pr-toc-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
            <span>{sidebarOpen ? "Close" : "Contents"}</span>
          </button>
          <div className="pr-mini-progress">
            <div
              className="pr-mini-fill"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`pr-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="pr-sidebar-inner">
            <div className="pr-toc-search">
              {/* <i className="fas fa-search pr-search-ico"></i>
              <input
                type="text"
                placeholder="Search sections…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-search-input"
              />
              {searchQuery && (
                <button
                  className="pr-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )} */}
            </div>

            {/* Role legend */}
            <div className="pr-sidebar-legend">
              <p className="pr-legend-title">GDPR roles</p>
              {roles.map((r, i) => (
                <div className="pr-legend-row" key={i}>
                  <span
                    className="pr-legend-dot"
                    style={{ background: r.dot }}
                  ></span>
                  <span className="pr-legend-label">{r.label}</span>
                  <span className="pr-legend-note">{r.note}</span>
                </div>
              ))}
            </div>

            <nav className="pr-toc">
              {filtered.length === 0 && (
                <p className="pr-no-results">No sections found</p>
              )}
              {filtered.map((s) => (
                <button
                  key={s.id}
                  className={`pr-toc-item ${activeSection === s.id ? "active" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className={`pr-toc-dot color-${s.color}`} />
                  <span className="pr-toc-num">{s.num}</span>
                  <span className="pr-toc-label">{s.title}</span>
                  {openSections[s.id] && (
                    <i className="fas fa-check pr-toc-check"></i>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="pr-main">
          <div className="pr-controls-bar">
            <span className="pr-section-count">{SECTIONS.length} sections</span>
            <button className="pr-expand-btn" onClick={handleExpandAll}>
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
                className={`pr-section color-${s.color} ${isOpen ? "is-open" : ""}`}
                data-id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
              >
                <button
                  className="pr-section-header"
                  onClick={() => toggleSection(s.id)}
                  aria-expanded={isOpen}
                >
                  <div className="pr-section-left">
                    <span className={`pr-section-num color-${s.color}`}>
                      {s.num}
                    </span>
                    <div className="pr-section-meta">
                      {/* <span className={`pr-section-tag color-${s.color}`}>
                        {s.tag}
                      </span> */}
                      <span className="pr-section-title-text">{s.title}</span>
                      <span className="pr-section-summary">{s.summary}</span>
                    </div>
                  </div>
                  <div className="pr-section-right">
                    <span className={`pr-section-icon-wrap color-${s.color}`}>
                      <i className={s.icon}></i>
                    </span>
                    <span className={`pr-chevron-wrap ${isOpen ? "open" : ""}`}>
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </button>
                <div className={`pr-section-body ${isOpen ? "expanded" : ""}`}>
                  <div className="pr-section-content">
                    <Content />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div className="pr-footer-cta">
            <div className="pr-footer-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Questions about privacy roles?</h3>
            <p>Contact the TODO GROUP S.R.L. privacy team</p>
            <div className="pr-footer-btns">
              <a
                href="mailto:support@todoai.ai"
                className="pr-footer-btn primary"
              >
                <i className="fas fa-envelope"></i> support@todoai.ai
              </a>
              <a
                href="mailto:todogroupsrl@pec.it"
                className="pr-footer-btn outline"
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

export default PrivacyRoles;
