import React, { useState, useEffect, useRef, useCallback } from "react";
import "./PrivacyPolicy.css";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const SECTIONS = [
  {
    id: "controller",
    num: "01",
    icon: "fas fa-building",
    // tag: "Identity",
    color: "teal",
    title: "Data Controller",
    summary: "Who is responsible for your data",
  },
  {
    id: "scope",
    num: "02",
    icon: "fas fa-layer-group",
    // tag: "Coverage",
    color: "blue",
    title: "Scope of this Privacy Policy",
    summary: "Where and how this policy applies",
  },
  {
    id: "data-categories",
    num: "03",
    icon: "fas fa-database",
    // tag: "Data Types",
    color: "purple",
    title: "Categories of Personal Data Processed",
    summary: "What kinds of data we collect",
  },
  {
    id: "purposes",
    num: "04",
    icon: "fas fa-bullseye",
    // tag: "Why",
    color: "coral",
    title: "Purposes of Processing",
    summary: "Why your data is used",
  },
  {
    id: "legal-bases",
    num: "05",
    icon: "fas fa-gavel",
    // tag: "Legal",
    color: "amber",
    title: "Legal Bases for Processing",
    summary: "The legal grounds we rely on",
  },
  {
    id: "ai-systems",
    num: "06",
    icon: "fas fa-brain",
    // tag: "AI",
    color: "teal",
    title: "AI Systems and Automated Processing",
    summary: "How our AI handles your data",
  },
  {
    id: "data-provision",
    num: "07",
    icon: "fas fa-hand-paper",
    // tag: "Optional",
    color: "blue",
    title: "Data Provision",
    summary: "What's mandatory vs optional",
  },
  {
    id: "processing-methods",
    num: "08",
    icon: "fas fa-server",
    // tag: "Security",
    color: "green",
    title: "Data Processing Methods",
    summary: "How data is processed and protected",
  },
  {
    id: "retention",
    num: "09",
    icon: "fas fa-clock",
    // tag: "Duration",
    color: "amber",
    title: "Data Retention",
    summary: "How long we keep your data",
  },
  {
    id: "processors",
    num: "10",
    icon: "fas fa-sitemap",
    // tag: "Partners",
    color: "blue",
    title: "Data Processors and Third Parties",
    summary: "Who else may handle your data",
  },
  {
    id: "business-clients",
    num: "11",
    icon: "fas fa-users-cog",
    // tag: "Business",
    color: "purple",
    title: "Business Clients as Controllers",
    summary: "Roles for enterprise users",
  },
  {
    id: "international",
    num: "12",
    icon: "fas fa-globe",
    // tag: "Global",
    color: "teal",
    title: "International Data Transfers",
    summary: "Cross-border data movement",
  },
  {
    id: "cookies",
    num: "13",
    icon: "fas fa-cookie-bite",
    // tag: "Cookies",
    color: "amber",
    title: "Cookies and Similar Technologies",
    summary: "Tracking and analytics tools",
  },
  {
    id: "user-rights",
    num: "14",
    icon: "fas fa-user-check",
    // tag: "Your Rights",
    color: "green",
    title: "User Rights",
    summary: "Your GDPR rights explained",
  },
  {
    id: "physical",
    num: "15",
    icon: "fas fa-tv",
    // tag: "In-store",
    color: "coral",
    title: "Notice for Physical Installations",
    summary: "Totems, kiosks, and screens",
  },
  {
    id: "minors",
    num: "16",
    icon: "fas fa-child",
    // tag: "Minors",
    color: "red",
    title: "Minors",
    summary: "Policy for users under 18",
  },
  {
    id: "changes",
    num: "17",
    icon: "fas fa-sync-alt",
    // tag: "Updates",
    color: "gray",
    title: "Changes to this Privacy Policy",
    summary: "How we notify you of updates",
  },
];

/* ─────────────────────────────────────────
   SECTION CONTENT COMPONENTS
───────────────────────────────────────── */
const S1 = () => (
  <>
    <p>The Data Controller is:</p>
    <div className="pp-info-card">
      {[
        ["Company", "TODO GROUP S.R.L."],
        ["Address", "Via Ilioneo 85/D, 80124 Naples, Italy"],
        ["VAT/Tax ID", "09781131215"],
        ["REA", "NA - 1056793"],
        [
          "Website",
          <a href="https://todoai.ai" target="_blank" rel="noreferrer">
            https://todoai.ai
          </a>,
        ],
        ["Email", <a href="mailto:support@todoai.ai">support@todoai.ai</a>],
        ["PEC", <a href="mailto:todogroupsrl@pec.it">todogroupsrl@pec.it</a>],
      ].map(([label, val], i) => (
        <div className="pp-info-row" key={i}>
          <span className="pp-info-label">{label}</span>
          <span className="pp-info-value">{val}</span>
        </div>
      ))}
    </div>
    <p>
      TODO GROUP S.R.L. determines the purposes and means of the processing of
      personal data collected through TODO AI, unless a business client acts as
      an independent data controller or joint controller for specific processing
      activities.
    </p>
  </>
);

const S2 = () => (
  <>
    <p>This Privacy Policy applies to personal data collected through:</p>
    <div className="pp-chip-grid">
      {[
        { icon: "fas fa-globe", text: "Website https://todoai.ai" },
        { icon: "fas fa-tachometer-alt", text: "Web platform and dashboard" },
        { icon: "fas fa-code", text: "APIs, SDKs, plugins and integrations" },
        { icon: "fas fa-user-circle", text: "AI avatar interactions" },
        { icon: "fas fa-comments", text: "Voice and text conversations" },
        { icon: "fas fa-eye", text: "Facial analysis and visual recognition" },
        { icon: "fas fa-briefcase", text: "Business client accounts" },
        { icon: "fas fa-mobile-alt", text: "Mobile applications" },
        { icon: "fas fa-desktop", text: "Interactive totems and kiosks" },
        { icon: "fas fa-envelope", text: "Contact forms and demo requests" },
        {
          icon: "fas fa-chart-line",
          text: "Analytics and tracking technologies",
        },
      ].map((item, i) => (
        <div className="pp-chip" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </>
);

const DataCategoryCard = ({ sub, note, items, extra }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`pp-data-cat ${open ? "open" : ""}`}>
      <button className="pp-data-cat-header" onClick={() => setOpen((o) => !o)}>
        <span>{sub}</span>
        <i
          className={`fas fa-chevron-down pp-cat-chevron ${open ? "rot" : ""}`}
        ></i>
      </button>
      <div className={`pp-data-cat-body ${open ? "visible" : ""}`}>
        {note && <p className="pp-cat-note">{note}</p>}
        <ul className="pp-dot-list">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        {extra && <div className="pp-extra-note">{extra}</div>}
      </div>
    </div>
  );
};

const S3 = () => (
  <>
    <p>
      Depending on the services used, TODO AI may collect and process the
      following categories of personal data.
    </p>
    <div className="pp-data-cats">
      {[
        {
          sub: "3.1 Identification and Contact Data",
          items: [
            "Name and surname",
            "Company name",
            "Business role",
            "Email address",
            "Telephone number",
            "Login credentials",
            "User ID",
            "Billing or administrative information",
            "Information voluntarily provided through forms or support requests",
          ],
        },
        {
          sub: "3.2 Account and Business Client Data",
          items: [
            "Account registration data",
            "Subscription plan information",
            "Dashboard activity",
            "API usage",
            "Uploaded datasets",
            "Configuration preferences",
            "Avatar customization settings",
            "Business content uploaded by clients",
            "Technical and administrative records related to the service",
          ],
        },
        {
          sub: "3.3 Technical and Browsing Data",
          items: [
            "IP address",
            "Browser type",
            "Device type",
            "Operating system",
            "Access logs",
            "Timestamps",
            "Pages visited",
            "Platform interactions",
            "Crash reports",
            "Performance data",
            "Security logs",
            "Approximate location derived from technical data",
          ],
        },
        {
          sub: "3.4 Voice and Textual Data",
          note: "When users interact with TODO AI through voice or text, the platform may process:",
          items: [
            "Questions asked to the AI assistant",
            "Voice commands",
            "Audio inputs, where enabled",
            "Transcriptions",
            "Chat messages",
            "Prompts",
            "AI-generated answers",
            "Conversation history, where enabled",
            "Feedback and ratings",
          ],
        },
        {
          sub: "3.5 Visual, Facial and Biometric-related Data",
          note: "Where the user voluntarily uses visual or facial AI features, TODO AI may process:",
          items: [
            "Images captured by camera or webcam",
            "Facial images",
            "Facial parameters",
            "Facial expressions",
            "Emotional indicators",
            "Skin or visual characteristics, where applicable",
            "Visual data used to generate AI analysis or recommendations",
          ],
          extra:
            "If visual or facial data is processed in a way that allows or may allow unique identification of a person through biometric characteristics, such data may be considered biometric data under applicable privacy law. TODO AI processes these data only where necessary for the service requested and, where required, on the basis of explicit consent.",
        },
        {
          sub: "3.6 Sensitive or Special Category Data",
          note: "In some use cases, especially when TODO AI is used in health, wellness, beauty, pharmaceutical, medical or care-related contexts, users may voluntarily provide information that could be considered special category data under Article 9 GDPR, such as:",
          items: [
            "Health-related information",
            "Symptoms",
            "Conditions",
            "Treatments",
            "Wellness preferences",
            "Skin-related information",
            "Information provided during interaction with AI assistants",
          ],
          extra:
            "Such data is processed only when necessary for the requested service and, where required, on the basis of explicit consent or another valid legal basis under GDPR.",
        },
        {
          sub: "3.7 Preference and Profiling Data",
          note: "TODO AI may process:",
          items: [
            "Interaction history",
            "Service preferences",
            "Products or services recommended",
            "Avatar preferences",
            "User choices",
            "AI-generated insights",
            "Behavioral data connected to platform usage",
          ],
          extra:
            "Profiling activities for marketing or advanced personalization are carried out only where permitted by law and, where required, after obtaining consent.",
        },
      ].map((block, i) => (
        <DataCategoryCard key={i} {...block} />
      ))}
    </div>
  </>
);

const S4 = () => (
  <>
    <p>Personal data may be processed for the following purposes:</p>
    <div className="pp-purpose-grid">
      {[
        {
          icon: "fas fa-cogs",
          num: "4.1",
          title: "Service Delivery",
          desc: "To provide access to TODO AI, including AI avatars, conversational AI, dashboards, APIs, integrations, plugins, mobile applications and physical installations.",
        },
        {
          icon: "fas fa-robot",
          num: "4.2",
          title: "AI Interaction & Personalization",
          desc: "To allow users to interact with virtual assistants, receive automated responses, use voice and text recognition, and obtain personalized recommendations.",
        },
        {
          icon: "fas fa-eye",
          num: "4.3",
          title: "Facial, Visual & Emotional Analysis",
          desc: "To provide facial analysis, visual recognition, emotional analysis or similar AI-powered features, where enabled and voluntarily used by the user.",
        },
        {
          icon: "fas fa-briefcase",
          num: "4.4",
          title: "Business Client Management",
          desc: "To create, manage and support business client accounts, subscriptions, billing, onboarding, platform configuration, technical support and service delivery.",
        },
        {
          icon: "fas fa-upload",
          num: "4.5",
          title: "Dataset Upload & AI Customization",
          desc: "To allow business clients to upload authorized content, datasets, documents, product data, knowledge bases or training materials for the purpose of customizing AI assistants.",
        },
        {
          icon: "fas fa-shield-alt",
          num: "4.6",
          title: "Security & Fraud Prevention",
          desc: "To protect the platform, detect abuse, prevent unauthorized access, monitor security events, prevent fraud and ensure technical stability.",
        },
        {
          icon: "fas fa-balance-scale",
          num: "4.7",
          title: "Legal & Administrative Obligations",
          desc: "To comply with applicable legal, accounting, tax, regulatory and administrative obligations.",
        },
        {
          icon: "fas fa-headset",
          num: "4.8",
          title: "Support & Communication",
          desc: "To respond to contact requests, support tickets, demo requests, commercial inquiries and technical assistance needs.",
        },
        {
          icon: "fas fa-envelope-open-text",
          num: "4.9",
          title: "Marketing & Newsletter",
          desc: "To send newsletters, commercial communications, promotional content or updates about TODO AI, only where the user has given consent or where otherwise permitted by applicable law.",
        },
        {
          icon: "fas fa-chart-bar",
          num: "4.10",
          title: "Analytics & Service Improvement",
          desc: "To analyze usage, improve performance, test features, enhance user experience and improve AI quality, preferably using aggregated or anonymized data where possible.",
        },
      ].map((p, i) => (
        <div className="pp-purpose-card" key={i}>
          <div className="pp-purpose-top">
            <span className="pp-purpose-num">{p.num}</span>
            <span className="pp-purpose-ico">
              <i className={p.icon}></i>
            </span>
          </div>
          <h4 className="pp-purpose-title">{p.title}</h4>
          <p className="pp-purpose-desc">{p.desc}</p>
        </div>
      ))}
    </div>
  </>
);

const S5 = () => (
  <>
    <p>TODO AI processes personal data on the following legal bases:</p>
    <div className="pp-legal-bases">
      {[
        {
          icon: "fas fa-file-contract",
          label: "Contract",
          text: "Performance of a contract or pre-contractual measures",
        },
        {
          icon: "fas fa-check-square",
          label: "Consent",
          text: "Explicit consent of the user",
        },
        {
          icon: "fas fa-balance-scale",
          label: "Legal Obligation",
          text: "Legal obligation",
        },
        {
          icon: "fas fa-star",
          label: "Legitimate Interest",
          text: "Legitimate interest of TODO GROUP S.R.L.",
        },
        {
          icon: "fas fa-bullhorn",
          label: "Marketing Consent",
          text: "Consent for marketing, profiling or optional communications",
        },
        {
          icon: "fas fa-fingerprint",
          label: "Biometric Consent",
          text: "Explicit consent for biometric, health-related or other special category data, where required",
        },
      ].map((b, i) => (
        <div className="pp-legal-card" key={i}>
          <i className={b.icon}></i>
          <span className="pp-legal-label">{b.label}</span>
          <p>{b.text}</p>
        </div>
      ))}
    </div>
    <div className="pp-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Where processing is based on consent, the user may withdraw consent at
        any time.
      </span>
    </div>
  </>
);

const S6 = () => (
  <>
    <p>
      TODO AI uses artificial intelligence, machine learning, natural language
      processing, voice processing, visual recognition, facial analysis and
      avatar technologies.
    </p>
    <div className="pp-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <div>
        <strong>Important Notice</strong>
        <p>
          AI-generated outputs are produced automatically and may not always be
          accurate, complete or suitable for every situation. TODO AI does not
          provide medical diagnosis, legal advice, financial advice or any
          professional advice unless expressly stated and supported by a
          qualified professional service.
        </p>
      </div>
    </div>
    <p>
      Where AI is used in medical, pharmaceutical, wellness, beauty or similar
      contexts, the output is provided for informational, support, orientation
      or commercial purposes and must not replace the advice of a doctor,
      pharmacist, dermatologist, psychologist or other qualified professional.
    </p>
    <p>
      Users remain responsible for evaluating the information received and,
      where necessary, consulting a qualified professional.
    </p>
  </>
);

const S7 = () => (
  <>
    <p>
      Some personal data is necessary to use the platform, create an account,
      access dashboards, receive support or use AI services.
    </p>
    <div className="pp-two-col">
      <div className="pp-req-card required">
        <div className="pp-req-header">
          <i className="fas fa-lock"></i>
          <span>Required Data</span>
        </div>
        <p>
          Necessary to use the platform, create accounts, access dashboards, and
          receive support.
        </p>
      </div>
      <div className="pp-req-card optional">
        <div className="pp-req-header">
          <i className="fas fa-unlock-alt"></i>
          <span>Optional Data</span>
        </div>
        <p>
          Data for marketing, profiling, facial analysis, biometric processing,
          or advanced personalization — unless strictly necessary for the
          specific feature requested.
        </p>
      </div>
    </div>
    <p>
      Failure to provide required data may prevent access to certain features.
    </p>
  </>
);

const S8 = () => (
  <>
    <p>
      Personal data is processed using electronic, digital, automated and manual
      tools. TODO GROUP S.R.L. applies technical and organizational measures
      designed to protect personal data against:
    </p>
    <div className="pp-shield-list">
      {[
        "Unauthorized access",
        "Accidental or unlawful destruction",
        "Loss",
        "Alteration",
        "Unauthorized disclosure",
        "Misuse",
        "Unlawful processing",
      ].map((item, i) => (
        <div className="pp-shield-item" key={i}>
          <i className="fas fa-shield-alt"></i>
          <span>{item}</span>
        </div>
      ))}
    </div>
  </>
);

const S9 = () => (
  <>
    <p>
      Personal data is retained only for the period necessary to achieve the
      purposes for which it was collected, unless a longer retention period is
      required by law.
    </p>
    <div className="pp-retention-table">
      <div className="pp-ret-head">
        <span>Data Type</span>
        <span>Retention Period</span>
      </div>
      {[
        ["Account data", "While account is active"],
        ["Business client data", "Duration of contract + legal period"],
        ["Billing & administrative data", "Per tax and accounting laws"],
        ["Support data", "Time needed to handle request"],
        ["Marketing data", "Until consent is withdrawn"],
        ["Security logs", "Time needed for platform security"],
        ["Voice, visual & facial data", "Strictly necessary for service only"],
        ["Anonymized datasets", "May be retained for statistical purposes"],
      ].map(([type, period], i) => (
        <div className="pp-ret-row" key={i}>
          <span className="pp-ret-type">{type}</span>
          <span className="pp-ret-period">{period}</span>
        </div>
      ))}
    </div>
    <div className="pp-callout info" style={{ marginTop: "16px" }}>
      <i className="fas fa-info-circle"></i>
      <span>
        TODO GROUP S.R.L. adopts measures aimed at limiting the retention of
        visual, voice and facial data to what is strictly necessary for the
        requested service.
      </span>
    </div>
  </>
);

const S10 = () => (
  <>
    <p>Personal data may be processed by:</p>
    <div className="pp-processor-grid">
      {[
        { icon: "fas fa-cloud", label: "Hosting & Cloud Providers" },
        { icon: "fas fa-brain", label: "AI, NLP & Voice Processing Providers" },
        { icon: "fas fa-user-shield", label: "Cybersecurity Providers" },
        { icon: "fas fa-credit-card", label: "Payment Providers" },
        { icon: "fas fa-code", label: "Software Developers & Integrators" },
        { icon: "fas fa-chart-pie", label: "Analytics Providers" },
        { icon: "fas fa-mail-bulk", label: "CRM & Email Marketing Providers" },
        {
          icon: "fas fa-gavel",
          label: "Legal, Tax & Administrative Consultants",
        },
        { icon: "fas fa-headset", label: "Customer Support Providers" },
        {
          icon: "fas fa-briefcase",
          label: "Business Clients, where applicable",
        },
        {
          icon: "fas fa-landmark",
          label: "Public Authorities, where required by law",
        },
      ].map((item, i) => (
        <div className="pp-proc-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <p>
      Third parties may act as data processors, independent data controllers or
      joint controllers, depending on the specific processing activity. An
      updated list of external processors may be requested by contacting TODO
      GROUP S.R.L.
    </p>
  </>
);

const S11 = () => (
  <>
    <p>
      Business clients using TODO AI to process data of their own users,
      customers, patients, visitors or employees may act as:
    </p>
    <div className="pp-role-cards">
      {[
        {
          icon: "fas fa-user-shield",
          title: "Independent Data Controllers",
          color: "teal",
          desc: "When they independently determine purposes and means of processing.",
        },
        {
          icon: "fas fa-handshake",
          title: "Joint Controllers",
          color: "blue",
          desc: "When they jointly determine purposes and means with TODO GROUP S.R.L.",
        },
        {
          icon: "fas fa-cog",
          title: "Data Processors",
          color: "purple",
          desc: "Where applicable and contractually agreed.",
        },
      ].map((r, i) => (
        <div className={`pp-role-card role-${r.color}`} key={i}>
          <i className={r.icon}></i>
          <h4>{r.title}</h4>
          <p>{r.desc}</p>
        </div>
      ))}
    </div>
    <p>
      Business clients are responsible for providing their own privacy notices,
      obtaining valid consents, ensuring lawful use of uploaded data and
      verifying that they have the legal right to process any data uploaded or
      connected to TODO AI.
    </p>
  </>
);

const S12 = () => (
  <>
    <p>
      Some providers used by TODO AI may process data outside the European
      Economic Area.
    </p>
    <div className="pp-callout blue">
      <i className="fas fa-globe-europe"></i>
      <div>
        <strong>GDPR Safeguards Apply</strong>
        <p>
          Where this occurs, TODO GROUP S.R.L. adopts appropriate safeguards
          under Articles 44 to 49 GDPR, including adequacy decisions, Standard
          Contractual Clauses or other legally recognized transfer mechanisms.
        </p>
      </div>
    </div>
  </>
);

const S13 = () => (
  <>
    <p>
      TODO AI may use cookies, pixels, tags, SDKs, local storage and similar
      technologies for technical, analytics, functional and marketing purposes.
    </p>
    <div className="pp-cookie-types">
      {[
        {
          icon: "fas fa-cog",
          label: "Technical",
          desc: "Essential for platform functionality",
        },
        {
          icon: "fas fa-chart-bar",
          label: "Analytics",
          desc: "Usage measurement and improvement",
        },
        {
          icon: "fas fa-sliders-h",
          label: "Functional",
          desc: "Personalization and preferences",
        },
        {
          icon: "fas fa-bullhorn",
          label: "Marketing",
          desc: "Promotional and advertising purposes",
        },
      ].map((c, i) => (
        <div className="pp-cookie-card" key={i}>
          <i className={c.icon}></i>
          <span className="pp-cookie-label">{c.label}</span>
          <span className="pp-cookie-desc">{c.desc}</span>
        </div>
      ))}
    </div>
    <p>
      Further details are provided in the Cookie Policy available on the
      website.
    </p>
  </>
);

const S14 = () => (
  <>
    <p>Users may exercise the rights provided by GDPR, including:</p>
    <div className="pp-rights-grid">
      {[
        { icon: "fas fa-search", right: "Right of access" },
        { icon: "fas fa-edit", right: "Right to rectification" },
        { icon: "fas fa-trash-alt", right: "Right to erasure" },
        {
          icon: "fas fa-pause-circle",
          right: "Right to restriction of processing",
        },
        { icon: "fas fa-exchange-alt", right: "Right to data portability" },
        { icon: "fas fa-hand-paper", right: "Right to object" },
        { icon: "fas fa-undo", right: "Right to withdraw consent" },
        {
          icon: "fas fa-robot",
          right:
            "Right not to be subject to unlawful automated decision-making",
        },
        {
          icon: "fas fa-flag",
          right:
            "Right to lodge a complaint with the Italian Data Protection Authority",
        },
      ].map((r, i) => (
        <div className="pp-right-item" key={i}>
          <span className="pp-right-ico">
            <i className={r.icon}></i>
          </span>
          <span>{r.right}</span>
        </div>
      ))}
    </div>
    <p style={{ marginTop: "20px" }}>Requests may be sent to:</p>
    <div className="pp-contact-btns">
      <a href="mailto:support@todoai.ai" className="pp-contact-btn primary">
        <i className="fas fa-envelope"></i>support@todoai.ai
      </a>
      <a href="mailto:todogroupsrl@pec.it" className="pp-contact-btn outline">
        <i className="fas fa-envelope-open"></i>todogroupsrl@pec.it
      </a>
    </div>
  </>
);

const S15 = () => (
  <>
    <p>
      Where TODO AI is used through physical installations, such as totems,
      kiosks, screens or desktop stations, users should be shown a simplified
      notice before interacting with the AI system.
    </p>
    <div className="pp-steps">
      {[
        {
          icon: "fas fa-info-circle",
          step: "1",
          text: "Users shown a simplified notice before interacting with the AI system.",
        },
        {
          icon: "fas fa-lock",
          step: "2",
          text: "Notice informs users that AI may process voice, visual, facial or other personal data.",
        },
        {
          icon: "fas fa-check-circle",
          step: "3",
          text: "Users must be able to provide consent before using facial, voice or sensitive-data features.",
        },
        {
          icon: "fas fa-user-secret",
          step: "4",
          text: "Where available, an anonymous session option may be offered.",
        },
      ].map((s, i) => (
        <div className="pp-step" key={i}>
          <div className="pp-step-num">{s.step}</div>
          <div className="pp-step-body">
            <i className={s.icon}></i>
            <span>{s.text}</span>
          </div>
        </div>
      ))}
    </div>
  </>
);

const S16 = () => (
  <>
    <div className="pp-callout red">
      <i className="fas fa-child"></i>
      <div>
        <strong>Notice Regarding Minors</strong>
        <p>
          TODO AI is not intended for use by minors unless authorized by a
          parent, guardian or responsible adult, and only where permitted by
          applicable law and the relevant service configuration.
        </p>
      </div>
    </div>
    <p>
      Business clients using TODO AI in contexts accessible to minors are
      responsible for implementing appropriate consent and parental
      authorization mechanisms where required.
    </p>
  </>
);

const S17 = () => (
  <>
    <p>
      TODO GROUP S.R.L. may amend this Privacy Policy at any time due to legal,
      technical, organizational or business changes.
    </p>
    <p>
      The updated version will be published on{" "}
      <a href="https://todoai.ai" target="_blank" rel="noreferrer">
        https://todoai.ai
      </a>{" "}
      and, where necessary, users will be notified through the platform, email,
      app, dashboard or physical installation.
    </p>
    <div className="pp-notify-channels">
      {[
        { icon: "fas fa-globe", label: "Website" },
        { icon: "fas fa-envelope", label: "Email" },
        { icon: "fas fa-mobile-alt", label: "App" },
        { icon: "fas fa-tachometer-alt", label: "Dashboard" },
        { icon: "fas fa-desktop", label: "Physical Installation" },
      ].map((c, i) => (
        <div className="pp-notify-item" key={i}>
          <i className={c.icon}></i>
          <span>{c.label}</span>
        </div>
      ))}
    </div>
  </>
);

const CONTENT_MAP = {
  controller: S1,
  scope: S2,
  "data-categories": S3,
  purposes: S4,
  "legal-bases": S5,
  "ai-systems": S6,
  "data-provision": S7,
  "processing-methods": S8,
  retention: S9,
  processors: S10,
  "business-clients": S11,
  international: S12,
  cookies: S13,
  "user-rights": S14,
  physical: S15,
  minors: S16,
  changes: S17,
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const sectionRefs = useRef({});
  // const mainRef = useRef(null);

  const toggleSection = useCallback((id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

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

  /* Scroll progress */
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

  /* Active section tracker */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.dataset.id);
        });
      },
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
    <div className="pp-page">
      {/* Read progress bar */}
      <div className="pp-progress-bar" style={{ width: `${readProgress}%` }} />

      {/* Hero */}
      <div className="pp-hero">
        <div className="pp-hero-shapes">
          <div className="pp-shape pp-shape-1" />
          <div className="pp-shape pp-shape-2" />
          <div className="pp-shape pp-shape-3" />
        </div>
        <div className="pp-hero-inner">
          <div className="pp-hero-badges">
            <span className="pp-hero-badge">
              <i className="fas fa-shield-alt"></i> GDPR Compliant
            </span>
            <span className="pp-hero-badge secondary">
              <i className="fas fa-calendar-alt"></i> Last updated: June 03,
              2026
            </span>
          </div>
          <h1 className="pp-hero-title">Privacy Policy</h1>
          <p className="pp-hero-company">TODO AI — TODO GROUP S.R.L.</p>
          <p className="pp-hero-desc">
            This Privacy Policy describes how TODO GROUP S.R.L. collects, uses,
            stores, shares and protects personal data of users, clients and
            visitors who access or use the TODO AI platform, available through
            the website https://todoai.ai and related services, , dashboards,
            APIs, plugins, integrations, mobile applications where available,
            and physical or digital AI installations.
          </p>
          <p className="pp-hero-desc">
            TODO AI is an artificial intelligence platform that provides
            interactive AI avatars, conversational AI, voice and text
            interaction, facial analysis, visual recognition, emotional
            analysis, AI-powered consultation flows, personalized
            recommendations, business dashboards, APIs and integrations for
            companies, professionals, e-commerce platforms, clinics, pharmacies,
            beauty, wellness and other business sectors.
          </p>
          <p className="pp-hero-desc">
            This Privacy Policy is provided pursuant to Articles 13 and 14 of
            Regulation (EU) 2016/679, known as the General Data Protection
            Regulation, GDPR.
          </p>
          <div className="pp-hero-stats">
            <div className="pp-hero-stat">
              <span className="pp-stat-num">17</span>
              <span className="pp-stat-label">Sections</span>
            </div>
            <div className="pp-hero-divider" />
            <div className="pp-hero-stat">
              <span className="pp-stat-num">EU</span>
              <span className="pp-stat-label">GDPR Compliant</span>
            </div>
            <div className="pp-hero-divider" />
            <div className="pp-hero-stat">
              <span className="pp-stat-num">{readProgress}%</span>
              <span className="pp-stat-label">Read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pp-layout">
        {/* Mobile header */}
        <div className="pp-mobile-bar">
          <button
            className="pp-toc-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
            <span>{sidebarOpen ? "Close" : "Contents"}</span>
          </button>
          <div className="pp-mini-progress">
            <div
              className="pp-mini-fill"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`pp-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="pp-sidebar-inner">
            <div className="pp-toc-search">
              {/* <i className="fas fa-search pp-search-ico"></i>
              <input
                type="text"
                placeholder="Search sections…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pp-search-input"
              />
              {searchQuery && (
                <button
                  className="pp-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )} */}
            </div>
            <nav className="pp-toc">
              {filtered.length === 0 && (
                <p className="pp-no-results">No sections found</p>
              )}
              {filtered.map((s) => (
                <button
                  key={s.id}
                  className={`pp-toc-item ${activeSection === s.id ? "active" : ""} ${openSections[s.id] ? "opened" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className={`pp-toc-dot color-${s.color}`} />
                  <span className="pp-toc-num">{s.num}</span>
                  <span className="pp-toc-label">{s.title}</span>
                  {openSections[s.id] && (
                    <i className="fas fa-check pp-toc-check"></i>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="pp-main">
          {/* Controls bar */}
          <div className="pp-controls-bar">
            <span className="pp-section-count">{SECTIONS.length} sections</span>
            <button className="pp-expand-btn" onClick={handleExpandAll}>
              <i
                className={`fas ${expandAll ? "fa-compress-alt" : "fa-expand-alt"}`}
              ></i>
              {expandAll ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {SECTIONS.map((s, idx) => {
            const Content = CONTENT_MAP[s.id];
            const isOpen = !!openSections[s.id];
            return (
              <div
                key={s.id}
                className={`pp-section color-${s.color} ${isOpen ? "is-open" : ""}`}
                data-id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
              >
                <button
                  className="pp-section-header"
                  onClick={() => toggleSection(s.id)}
                  aria-expanded={isOpen}
                >
                  <div className="pp-section-left">
                    <span className={`pp-section-num color-${s.color}`}>
                      {s.num}
                    </span>
                    <div className="pp-section-meta">
                      {/* <span className={`pp-section-tag color-${s.color}`}>
                        {s.tag}
                      </span> */}
                      <span className="pp-section-title-text">{s.title}</span>
                      <span className="pp-section-summary">{s.summary}</span>
                    </div>
                  </div>
                  <div className="pp-section-right">
                    <span className={`pp-section-icon-wrap color-${s.color}`}>
                      <i className={s.icon}></i>
                    </span>
                    <span className={`pp-chevron-wrap ${isOpen ? "open" : ""}`}>
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </button>

                <div className={`pp-section-body ${isOpen ? "expanded" : ""}`}>
                  <div className="pp-section-content">
                    <Content />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div className="pp-footer-cta">
            <div className="pp-footer-icon">
              <i className="fas fa-envelope-open-text"></i>
            </div>
            <h3>Questions about your privacy?</h3>
            <p>Reach out to the TODO GROUP S.R.L. privacy team</p>
            <div className="pp-footer-btns">
              <a
                href="mailto:support@todoai.ai"
                className="pp-footer-btn primary"
              >
                <i className="fas fa-envelope"></i> support@todoai.ai
              </a>
              <a
                href="mailto:todogroupsrl@pec.it"
                className="pp-footer-btn outline"
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

export default PrivacyPolicy;
