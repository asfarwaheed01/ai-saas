import React, { useState, useEffect, useRef, useCallback } from "react";
import "./TermsConditions.css";

/* ─────────────────────────────────────────
   SECTION METADATA
───────────────────────────────────────── */
const SECTIONS = [
  {
    id: "company",
    num: "01",
    icon: "fas fa-building",
    color: "teal",
    // tag: "Identity",
    title: "Company Information",
    summary: "Who operates TODO AI",
  },
  {
    id: "definitions",
    num: "02",
    icon: "fas fa-book-open",
    color: "blue",
    // tag: "Glossary",
    title: "Definitions",
    summary: "Key terms explained",
  },
  {
    id: "scope",
    num: "03",
    icon: "fas fa-layer-group",
    color: "purple",
    // tag: "Services",
    title: "Scope of the Service",
    summary: "What the platform covers",
  },
  {
    id: "users",
    num: "04",
    icon: "fas fa-users",
    color: "coral",
    // tag: "For Whom",
    title: "Intended Users",
    summary: "Who this platform is for",
  },
  {
    id: "access",
    num: "05",
    icon: "fas fa-key",
    color: "amber",
    // tag: "Account",
    title: "Access and Registration",
    summary: "How to access the platform",
  },
  {
    id: "business",
    num: "06",
    icon: "fas fa-briefcase",
    color: "teal",
    // tag: "Business",
    title: "Business Client Responsibilities",
    summary: "Obligations for business clients",
  },
  {
    id: "permitted",
    num: "07",
    icon: "fas fa-check-circle",
    color: "green",
    // tag: "Rules",
    title: "Permitted Use",
    summary: "Allowed and prohibited activities",
  },
  {
    id: "paid",
    num: "08",
    icon: "fas fa-credit-card",
    color: "blue",
    // tag: "Billing",
    title: "Paid Services and Subscriptions",
    summary: "Plans, pricing and billing",
  },
  {
    id: "ai-disclaimer",
    num: "09",
    icon: "fas fa-robot",
    color: "purple",
    // tag: "AI",
    title: "AI Functionality and Disclaimer",
    summary: "Limitations of AI outputs",
  },
  {
    id: "medical",
    num: "10",
    icon: "fas fa-heartbeat",
    color: "red",
    // tag: "Health",
    title: "Medical, Health and Professional Disclaimer",
    summary: "Not a substitute for professionals",
  },
  {
    id: "facial",
    num: "11",
    icon: "fas fa-eye",
    color: "coral",
    // tag: "Sensitive",
    title: "Facial Analysis, Voice and Sensitive Data",
    summary: "Biometric and sensitive features",
  },
  {
    id: "content",
    num: "12",
    icon: "fas fa-upload",
    color: "amber",
    // tag: "Data",
    title: "Client Content and Uploaded Data",
    summary: "Ownership and responsibilities",
  },
  {
    id: "ip",
    num: "13",
    icon: "fas fa-copyright",
    color: "teal",
    // tag: "IP",
    title: "Intellectual Property",
    summary: "Who owns what",
  },
  {
    id: "availability",
    num: "14",
    icon: "fas fa-server",
    color: "blue",
    // tag: "Uptime",
    title: "Availability and Changes to the Platform",
    summary: "Service continuity policy",
  },
  {
    id: "third-party",
    num: "15",
    icon: "fas fa-plug",
    color: "purple",
    // tag: "Integrations",
    title: "Third-Party Services",
    summary: "External tools and providers",
  },
  {
    id: "privacy",
    num: "16",
    icon: "fas fa-shield-alt",
    color: "green",
    // tag: "Privacy",
    title: "Personal Data and Privacy",
    summary: "How your data is handled",
  },
  {
    id: "cookies",
    num: "17",
    icon: "fas fa-cookie-bite",
    color: "amber",
    // tag: "Cookies",
    title: "Cookies and Tracking Technologies",
    summary: "Tracking tools used",
  },
  {
    id: "liability",
    num: "18",
    icon: "fas fa-exclamation-triangle",
    color: "red",
    // tag: "Liability",
    title: "Limitation of Liability",
    summary: "What we are not liable for",
  },
  {
    id: "termination",
    num: "19",
    icon: "fas fa-ban",
    color: "coral",
    // tag: "Suspension",
    title: "Suspension and Termination",
    summary: "When access may be ended",
  },
  {
    id: "amendments",
    num: "20",
    icon: "fas fa-sync-alt",
    color: "gray",
    // tag: "Updates",
    title: "Amendments to these Terms",
    summary: "How we update these terms",
  },
  {
    id: "governing",
    num: "21",
    icon: "fas fa-gavel",
    color: "blue",
    // tag: "Legal",
    title: "Governing Law and Jurisdiction",
    summary: "Legal framework and disputes",
  },
];

/* ─────────────────────────────────────────
   CONTENT COMPONENTS
───────────────────────────────────────── */
const C1 = () => (
  <>
    <p>TODO AI is operated by:</p>
    <div className="tc-info-card">
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
        <div className="tc-info-row" key={i}>
          <span className="tc-info-label">{label}</span>
          <span className="tc-info-value">{val}</span>
        </div>
      ))}
    </div>
  </>
);

const C2 = () => (
  <>
    <p>For the purposes of these Terms:</p>
    <div className="tc-definitions">
      {[
        { term: "Company", def: "TODO GROUP S.R.L." },
        {
          term: "TODO AI or Platform",
          def: "The AI-powered platform operated by the Company.",
        },
        { term: "User", def: "Any person accessing or using the Platform." },
        {
          term: "Business Client",
          def: "Any company, professional, organization, clinic, pharmacy, e-commerce, brand, agency, institution or other entity subscribing to or using TODO AI for business purposes.",
        },
        {
          term: "AI Avatar",
          def: "The digital virtual assistant, visual character or conversational interface made available through TODO AI.",
        },
        {
          term: "AI Services",
          def: "Artificial intelligence functionalities, including conversational AI, voice and text recognition, facial analysis, visual recognition, emotional analysis, recommendations, automation, APIs, dashboards and integrations.",
        },
        {
          term: "Content",
          def: "Text, images, audio, video, documents, datasets, prompts, product information, knowledge bases, training materials or any other data uploaded or processed through the Platform.",
        },
      ].map((d, i) => (
        <div className="tc-def-item" key={i}>
          <span className="tc-def-term">{d.term}</span>
          <span className="tc-def-sep">means</span>
          <span className="tc-def-desc">{d.def}</span>
        </div>
      ))}
    </div>
  </>
);

const C3 = () => (
  <>
    <p>
      TODO AI is an AI-powered platform that enables businesses and users to
      create, configure and use interactive virtual assistants and AI avatars.
    </p>
    <p>The platform may include, depending on the activated features:</p>
    <div className="tc-feature-chips">
      {[
        { icon: "fas fa-user-circle", text: "Interactive digital avatars" },
        { icon: "fas fa-comments", text: "Conversational AI" },
        { icon: "fas fa-microphone", text: "Voice and text interaction" },
        { icon: "fas fa-camera", text: "Facial analysis" },
        { icon: "fas fa-smile", text: "Emotional analysis" },
        { icon: "fas fa-eye", text: "Visual recognition" },
        { icon: "fas fa-star", text: "Personalized recommendations" },
        { icon: "fas fa-tachometer-alt", text: "Business dashboards" },
        { icon: "fas fa-code", text: "APIs and SDKs" },
        { icon: "fas fa-plug", text: "CMS & e-commerce integrations" },
        {
          icon: "fas fa-desktop",
          text: "Physical installations (totems, kiosks)",
        },
        {
          icon: "fas fa-brain",
          text: "AI knowledge base and training features",
        },
      ].map((item, i) => (
        <div className="tc-chip" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <p>
      TODO AI may be used across different sectors, including beauty, wellness,
      retail, pharmaceutical, healthcare, customer support, education, marketing
      and enterprise services.
    </p>
  </>
);

const C4 = () => (
  <>
    <p>The Platform is intended for:</p>
    <div className="tc-user-cards">
      {[
        {
          icon: "fas fa-user",
          color: "teal",
          title: "End Users",
          desc: "Interacting with AI avatars or assistants",
        },
        {
          icon: "fas fa-briefcase",
          color: "blue",
          title: "Business Clients",
          desc: "Subscribing to TODO AI",
        },
        {
          icon: "fas fa-cogs",
          color: "purple",
          title: "Professionals",
          desc: "Configuring AI assistants for their own users",
        },
        {
          icon: "fas fa-tools",
          color: "amber",
          title: "Operators",
          desc: "Managing dashboards, integrations or content",
        },
        {
          icon: "fas fa-globe",
          color: "coral",
          title: "Website Visitors",
          desc: "Visitors of the website todoai.ai",
        },
      ].map((u, i) => (
        <div className={`tc-user-card uc-${u.color}`} key={i}>
          <i className={u.icon}></i>
          <h4>{u.title}</h4>
          <p>{u.desc}</p>
        </div>
      ))}
    </div>
  </>
);

const C5 = () => (
  <>
    <p>Some features may require registration or credentials.</p>
    <p>Users agree to:</p>
    <div className="tc-agree-list">
      {[
        {
          icon: "fas fa-check",
          text: "Provide accurate and updated information",
        },
        { icon: "fas fa-lock", text: "Keep credentials confidential" },
        {
          icon: "fas fa-user-times",
          text: "Avoid unauthorized account sharing",
        },
        {
          icon: "fas fa-bell",
          text: "Immediately notify the Company of suspected unauthorized access",
        },
        {
          icon: "fas fa-balance-scale",
          text: "Use the Platform only in compliance with applicable laws and these Terms",
        },
      ].map((item, i) => (
        <div className="tc-agree-item" key={i}>
          <span className="tc-agree-ico">
            <i className={item.icon}></i>
          </span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <div className="tc-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        The Company may suspend or restrict access in case of security risks,
        misuse, breach of these Terms or legal obligations.
      </span>
    </div>
  </>
);

const C6 = () => (
  <>
    <p>Business Clients are responsible for:</p>
    <ul className="tc-dot-list">
      {[
        "Ensuring that uploaded content is lawful and authorized",
        "Obtaining all necessary rights, consents and permissions",
        "Providing privacy notices to their own users where required",
        "Obtaining consent for voice, facial, biometric, health-related or sensitive data where required",
        "Verifying that datasets uploaded to TODO AI may lawfully be processed",
        "Ensuring that the AI assistant is not configured to provide unlawful, misleading or harmful information",
        "Supervising use of the Platform in regulated sectors",
      ].map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
    <div className="tc-callout red">
      <i className="fas fa-exclamation-circle"></i>
      <span>
        Business Clients must not upload personal data, sensitive data, health
        data, biometric data, confidential information or third-party content
        unless they have a valid legal basis and all necessary authorizations.
      </span>
    </div>
  </>
);

const C7 = () => (
  <>
    <p>
      Users may use TODO AI only for lawful purposes and in accordance with
      these Terms.
    </p>
    <div className="tc-permitted-grid">
      <div className="tc-permitted-col allowed">
        <div className="tc-permitted-header">
          <i className="fas fa-check-circle"></i>
          <span>Permitted</span>
        </div>
        <ul>
          {[
            "Lawful use of the platform",
            "Authorized content uploads",
            "Using AI for supported use cases",
            "Accessing APIs with valid credentials",
            "Commercial use under subscription terms",
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="tc-permitted-col prohibited">
        <div className="tc-permitted-header">
          <i className="fas fa-times-circle"></i>
          <span>Prohibited</span>
        </div>
        <ul>
          {[
            "Reverse engineering, copying or decompiling the Platform",
            "Attempting unauthorized access to systems, APIs or data",
            "Uploading unlawful, offensive, discriminatory or defamatory content",
            "Using the Platform for fraudulent or harmful purposes",
            "Using AI to provide unvalidated medical diagnosis or emergency assistance",
            "Violating privacy, intellectual property or third-party rights",
            "Scraping, extracting or copying data without authorization",
            "Interfering with platform security or performance",
            "Generating or distributing malicious, illegal or harmful content",
          ].map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </>
);

const C8 = () => (
  <>
    <p>
      Some features of TODO AI may be available only through paid plans or
      commercial agreements.
    </p>
    <div className="tc-billing-cards">
      {[
        {
          icon: "fas fa-file-contract",
          title: "Subscription Terms",
          desc: "Pricing, billing, usage limits, service levels, modules, activated avatars and custom developments may be governed by separate commercial agreements.",
        },
        {
          icon: "fas fa-pause-circle",
          title: "Non-payment",
          desc: "Failure to pay may result in suspension, limitation or termination of services.",
        },
        {
          icon: "fas fa-undo",
          title: "Refunds",
          desc: "Unless otherwise agreed, fees are non-refundable except where required by law or expressly stated in the applicable agreement.",
        },
      ].map((c, i) => (
        <div className="tc-billing-card" key={i}>
          <i className={c.icon}></i>
          <h4>{c.title}</h4>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  </>
);

const C9 = () => (
  <>
    <p>
      TODO AI provides automated responses and outputs based on AI models,
      datasets, prompts, configurations and user inputs.
    </p>
    <div className="tc-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <div>
        <strong>AI Disclaimer</strong>
        <p>
          The Company does not guarantee that AI outputs will always be
          accurate, complete, updated, suitable or error-free. AI outputs are
          provided for informational, operational, commercial, support or
          recommendation purposes, depending on the configured use case.
        </p>
      </div>
    </div>
    <div className="tc-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Users and Business Clients are responsible for reviewing and validating
        AI outputs before relying on them, especially in regulated or
        high-impact contexts.
      </span>
    </div>
  </>
);

const C10 = () => (
  <>
    <div className="tc-callout red">
      <i className="fas fa-heartbeat"></i>
      <div>
        <strong>Medical Disclaimer</strong>
        <p>
          TODO AI does not replace doctors, pharmacists, dermatologists,
          psychologists, lawyers, financial advisors or other qualified
          professionals.
        </p>
      </div>
    </div>
    <p>
      Where the Platform is used in pharmaceutical, medical, healthcare,
      wellness, beauty or similar sectors, the AI assistant must not be
      considered a medical device, diagnostic tool or substitute for
      professional advice unless expressly certified, authorized and configured
      for that purpose under applicable law.
    </p>
    <div className="tc-emergency-box">
      <i className="fas fa-ambulance"></i>
      <div>
        <strong>In case of medical emergencies</strong>
        <p>
          In case of medical emergencies, symptoms, health conditions,
          treatments, allergies, pregnancy, mental health concerns or other
          health-related issues, users must contact a qualified professional or
          emergency services.
        </p>
      </div>
    </div>
  </>
);

const C11 = () => (
  <>
    <p>
      Some features may involve facial analysis, visual recognition, emotional
      analysis, voice processing, transcription or processing of sensitive
      information.
    </p>
    <div className="tc-steps">
      {[
        {
          icon: "fas fa-hand-paper",
          step: "1",
          text: "Users must use such features only voluntarily and after receiving appropriate information.",
        },
        {
          icon: "fas fa-check-square",
          step: "2",
          text: "Where consent is required, the feature must not be used without valid consent.",
        },
        {
          icon: "fas fa-user-shield",
          step: "3",
          text: "Business Clients are responsible for displaying appropriate notices and obtaining legally valid consent from their own users when they deploy TODO AI on their websites, apps, physical locations or internal systems.",
        },
      ].map((s, i) => (
        <div className="tc-step" key={i}>
          <div className="tc-step-num">{s.step}</div>
          <div className="tc-step-body">
            <i className={s.icon}></i>
            <span>{s.text}</span>
          </div>
        </div>
      ))}
    </div>
  </>
);

const C12 = () => (
  <>
    <p>
      Business Clients retain ownership of their uploaded content, datasets,
      documents, product information and knowledge bases.
    </p>
    <div className="tc-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        By uploading content to TODO AI, the Business Client grants the Company
        the rights necessary to process, host, analyze and use such content for
        providing, maintaining and improving the contracted services.
      </span>
    </div>
    <p>The Business Client guarantees that uploaded content:</p>
    <div className="tc-guarantee-grid">
      {[
        { icon: "fas fa-balance-scale", text: "Is lawful" },
        {
          icon: "fas fa-copyright",
          text: "Does not infringe third-party rights",
        },
        {
          icon: "fas fa-user-secret",
          text: "Does not contain unauthorized personal data",
        },
        {
          icon: "fas fa-check-double",
          text: "Is accurate to the best of the client's knowledge",
        },
        {
          icon: "fas fa-shield-alt",
          text: "May be processed by TODO AI under applicable law",
        },
      ].map((g, i) => (
        <div className="tc-guarantee-item" key={i}>
          <i className={g.icon}></i>
          <span>{g.text}</span>
        </div>
      ))}
    </div>
  </>
);

const C13 = () => (
  <>
    <p>
      All intellectual property rights relating to TODO AI, including software,
      source code, AI models, workflows, avatars, designs, interfaces,
      databases, documentation, trademarks and know-how, belong to the Company
      or its licensors.
    </p>
    <div className="tc-ip-grid">
      {[
        { icon: "fas fa-code", label: "Software & Source Code" },
        { icon: "fas fa-brain", label: "AI Models & Workflows" },
        { icon: "fas fa-user-circle", label: "Avatars & Designs" },
        { icon: "fas fa-desktop", label: "Interfaces & Dashboards" },
        { icon: "fas fa-database", label: "Databases" },
        { icon: "fas fa-file-alt", label: "Documentation" },
        { icon: "fas fa-trademark", label: "Trademarks" },
        { icon: "fas fa-lightbulb", label: "Know-how" },
      ].map((item, i) => (
        <div className="tc-ip-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="tc-callout warning">
      <i className="fas fa-ban"></i>
      <span>
        Users and Business Clients may not copy, reproduce, modify, distribute,
        sell, sublicense, reverse engineer or exploit the Platform without prior
        written authorization. No rights are granted except those expressly
        provided in these Terms or in a separate written agreement.
      </span>
    </div>
  </>
);

const C14 = () => (
  <>
    <p>
      The Company aims to provide a reliable and secure service but does not
      guarantee uninterrupted, error-free or always available access.
    </p>
    <p>
      The Company may modify, update, suspend, replace or discontinue features,
      modules, integrations, AI models, avatars or services for technical,
      business, security or legal reasons.
    </p>
    <div className="tc-callout info">
      <i className="fas fa-bell"></i>
      <span>
        Where significant changes affect paid services, Business Clients will be
        informed in accordance with the applicable agreement.
      </span>
    </div>
  </>
);

const C15 = () => (
  <>
    <p>
      TODO AI may integrate or rely on third-party services, including cloud
      providers, AI providers, payment providers, analytics tools, communication
      tools, CMS, e-commerce systems, CRM tools or external APIs.
    </p>
    <div className="tc-third-party-grid">
      {[
        { icon: "fas fa-cloud", label: "Cloud Providers" },
        { icon: "fas fa-robot", label: "AI Providers" },
        { icon: "fas fa-credit-card", label: "Payment Providers" },
        { icon: "fas fa-chart-bar", label: "Analytics Tools" },
        { icon: "fas fa-comments", label: "Communication Tools" },
        { icon: "fab fa-wordpress", label: "CMS Platforms" },
        { icon: "fab fa-shopify", label: "E-commerce Systems" },
        { icon: "fas fa-address-book", label: "CRM Tools" },
        { icon: "fas fa-code", label: "External APIs" },
      ].map((item, i) => (
        <div className="tc-third-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
    <div className="tc-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <span>
        The Company is not responsible for interruptions, limitations, policies,
        changes or failures attributable to independent third-party services.
        Use of third-party services may be subject to separate terms and privacy
        policies.
      </span>
    </div>
  </>
);

const C16 = () => (
  <>
    <p>
      Personal data is processed in accordance with the TODO AI Privacy Policy.
    </p>
    <div className="tc-callout info">
      <i className="fas fa-file-alt"></i>
      <span>
        Users and Business Clients must read the Privacy Policy before using the
        Platform.
      </span>
    </div>
    <p>
      Business Clients acting as data controllers or joint controllers are
      responsible for providing their own privacy information and obtaining
      valid consent from their users where required.
    </p>
  </>
);

const C17 = () => (
  <>
    <p>
      Use of the website, dashboard, apps or related services may involve
      cookies and similar technologies.
    </p>
    <div className="tc-callout info">
      <i className="fas fa-cookie-bite"></i>
      <span>Such technologies are governed by the TODO AI Cookie Policy.</span>
    </div>
  </>
);

const C18 = () => (
  <>
    <div className="tc-callout warning">
      <i className="fas fa-exclamation-triangle"></i>
      <div>
        <strong>Limitation of Liability</strong>
        <p>
          To the maximum extent permitted by applicable law, the Company shall
          not be liable for the items listed below.
        </p>
      </div>
    </div>
    <div className="tc-liability-grid">
      {[
        {
          icon: "fas fa-robot",
          text: "Decisions made by users based on AI outputs",
        },
        {
          icon: "fas fa-times-circle",
          text: "Incorrect, incomplete or outdated AI responses",
        },
        {
          icon: "fas fa-user-slash",
          text: "Unlawful use of the Platform by Business Clients or users",
        },
        { icon: "fas fa-upload", text: "Content uploaded by Business Clients" },
        {
          icon: "fas fa-file-signature",
          text: "Failure to obtain valid consent by Business Clients",
        },
        {
          icon: "fas fa-plug",
          text: "Interruptions caused by third-party services",
        },
        {
          icon: "fas fa-database",
          text: "Loss of data caused by misuse, unauthorized access or client-side errors",
        },
        {
          icon: "fas fa-chart-line",
          text: "Indirect, consequential or loss-of-profit damages",
        },
      ].map((item, i) => (
        <div className="tc-liability-item" key={i}>
          <i className={item.icon}></i>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
    <div className="tc-callout info">
      <i className="fas fa-info-circle"></i>
      <span>
        Nothing in these Terms excludes liability where exclusion is not
        permitted by applicable law.
      </span>
    </div>
  </>
);

const C19 = () => (
  <>
    <p>The Company may suspend or terminate access to the Platform if:</p>
    <div className="tc-termination-list">
      {[
        {
          icon: "fas fa-file-contract",
          text: "The user or Business Client breaches these Terms",
        },
        { icon: "fas fa-credit-card", text: "Payment is not made" },
        { icon: "fas fa-gavel", text: "The Platform is used unlawfully" },
        {
          icon: "fas fa-exclamation-circle",
          text: "Uploaded content violates laws or third-party rights",
        },
        { icon: "fas fa-shield-alt", text: "Security risks are detected" },
        {
          icon: "fas fa-balance-scale",
          text: "Continued access may expose the Company or others to legal, technical or reputational risk",
        },
        {
          icon: "fas fa-landmark",
          text: "Required by law or competent authority",
        },
      ].map((item, i) => (
        <div className="tc-termination-item" key={i}>
          <span className="tc-term-num">{String(i + 1).padStart(2, "0")}</span>
          <span className="tc-term-ico">
            <i className={item.icon}></i>
          </span>
          <span className="tc-term-text">{item.text}</span>
        </div>
      ))}
    </div>
  </>
);

const C20 = () => (
  <>
    <p>The Company may amend these Terms at any time.</p>
    <div className="tc-steps">
      {[
        {
          icon: "fas fa-edit",
          step: "1",
          text: "The updated version will be published on https://todoai.ai or made available through the Platform.",
        },
        {
          icon: "fas fa-mouse-pointer",
          step: "2",
          text: "Continued use of the Platform after publication of the updated Terms constitutes acceptance of the revised Terms.",
        },
      ].map((s, i) => (
        <div className="tc-step" key={i}>
          <div className="tc-step-num">{s.step}</div>
          <div className="tc-step-body">
            <i className={s.icon}></i>
            <span>{s.text}</span>
          </div>
        </div>
      ))}
    </div>
  </>
);

const C21 = () => (
  <>
    <p>These Terms are governed by Italian law.</p>
    <div className="tc-jurisdiction-cards">
      <div className="tc-juris-card">
        <i className="fas fa-gavel"></i>
        <h4>Governing Law</h4>
        <p>
          Italian law governs the interpretation, validity, performance and
          termination of these Terms.
        </p>
      </div>
      <div className="tc-juris-card">
        <i className="fas fa-map-marker-alt"></i>
        <h4>General Jurisdiction</h4>
        <p>
          Any dispute shall be submitted to the competent Italian court, without
          prejudice to mandatory consumer protection laws where applicable.
        </p>
      </div>
      <div className="tc-juris-card">
        <i className="fas fa-landmark"></i>
        <h4>Business Clients</h4>
        <p>
          Unless otherwise agreed in writing, the competent court shall be the
          Court of Naples.
        </p>
      </div>
    </div>
  </>
);

const CONTENT_MAP = {
  company: C1,
  definitions: C2,
  scope: C3,
  users: C4,
  access: C5,
  business: C6,
  permitted: C7,
  paid: C8,
  "ai-disclaimer": C9,
  medical: C10,
  facial: C11,
  content: C12,
  ip: C13,
  availability: C14,
  "third-party": C15,
  privacy: C16,
  cookies: C17,
  liability: C18,
  termination: C19,
  amendments: C20,
  governing: C21,
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);
  const sectionRefs = useRef({});

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

  /* Read progress */
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

  /* Active section via IntersectionObserver */
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
    <div className="tc-page">
      {/* Progress bar */}
      <div className="tc-progress-bar" style={{ width: `${readProgress}%` }} />

      {/* Hero */}
      <div className="tc-hero">
        <div className="tc-hero-shapes">
          <div className="tc-shape tc-shape-1" />
          <div className="tc-shape tc-shape-2" />
          <div className="tc-shape tc-shape-3" />
        </div>
        <div className="tc-hero-inner">
          <div className="tc-hero-badges">
            <span className="tc-hero-badge">
              <i className="fas fa-file-contract"></i> Version 1.0
            </span>
            <span className="tc-hero-badge secondary">
              <i className="fas fa-calendar-alt"></i> Last updated: June 03,
              2026
            </span>
          </div>
          <h1 className="tc-hero-title">Terms &amp; Conditions</h1>
          <p className="tc-hero-company">TODO AI — TODO GROUP S.R.L.</p>
          <p className="tc-hero-desc">
            These Terms and Conditions of Use govern access to and use of the
            TODO AI platform, available through the website https://todoai.ai,
            related dashboards, APIs, plugins, integrations, mobile applications
            where available, and physical or digital AI installations.
          </p>
          <div className="tc-hero-notice">
            <i className="fas fa-info-circle"></i>
            <span>
              By accessing or using TODO AI, the user accepts these Terms. If
              the user does not agree with these Terms, they must not use the
              platform.
            </span>
          </div>
          <div className="tc-hero-stats">
            <div className="tc-hero-stat">
              <span className="tc-stat-num">21</span>
              <span className="tc-stat-label">Sections</span>
            </div>
            <div className="tc-hero-divider" />
            <div className="tc-hero-stat">
              <span className="tc-stat-num">IT</span>
              <span className="tc-stat-label">Governed by Italian Law</span>
            </div>
            <div className="tc-hero-divider" />
            <div className="tc-hero-stat">
              <span className="tc-stat-num">{readProgress}%</span>
              <span className="tc-stat-label">Read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="tc-layout">
        {/* Mobile bar */}
        <div className="tc-mobile-bar">
          <button
            className="tc-toc-toggle"
            onClick={() => setSidebarOpen((o) => !o)}
          >
            <i className={`fas ${sidebarOpen ? "fa-times" : "fa-bars"}`}></i>
            <span>{sidebarOpen ? "Close" : "Contents"}</span>
          </button>
          <div className="tc-mini-progress">
            <div
              className="tc-mini-fill"
              style={{ width: `${readProgress}%` }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <aside className={`tc-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="tc-sidebar-inner">
            <div className="tc-toc-search">
              {/* <i className="fas fa-search tc-search-ico"></i>
              <input
                type="text"
                placeholder="Search sections…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tc-search-input"
              />
              {searchQuery && (
                <button
                  className="tc-search-clear"
                  onClick={() => setSearchQuery("")}
                >
                  <i className="fas fa-times"></i>
                </button>
              )} */}
            </div>
            <nav className="tc-toc">
              {filtered.length === 0 && (
                <p className="tc-no-results">No sections found</p>
              )}
              {filtered.map((s) => (
                <button
                  key={s.id}
                  className={`tc-toc-item ${activeSection === s.id ? "active" : ""} ${openSections[s.id] ? "opened" : ""}`}
                  onClick={() => scrollToSection(s.id)}
                >
                  <span className={`tc-toc-dot color-${s.color}`} />
                  <span className="tc-toc-num">{s.num}</span>
                  <span className="tc-toc-label">{s.title}</span>
                  {openSections[s.id] && (
                    <i className="fas fa-check tc-toc-check"></i>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="tc-main">
          <div className="tc-controls-bar">
            <span className="tc-section-count">{SECTIONS.length} sections</span>
            <button className="tc-expand-btn" onClick={handleExpandAll}>
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
                className={`tc-section color-${s.color} ${isOpen ? "is-open" : ""}`}
                data-id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
              >
                <button
                  className="tc-section-header"
                  onClick={() => toggleSection(s.id)}
                  aria-expanded={isOpen}
                >
                  <div className="tc-section-left">
                    <span className={`tc-section-num color-${s.color}`}>
                      {s.num}
                    </span>
                    <div className="tc-section-meta">
                      {/* <span className={`tc-section-tag color-${s.color}`}>
                        {s.tag}
                      </span> */}
                      <span className="tc-section-title-text">{s.title}</span>
                      <span className="tc-section-summary">{s.summary}</span>
                    </div>
                  </div>
                  <div className="tc-section-right">
                    <span className={`tc-section-icon-wrap color-${s.color}`}>
                      <i className={s.icon}></i>
                    </span>
                    <span className={`tc-chevron-wrap ${isOpen ? "open" : ""}`}>
                      <i className="fas fa-chevron-down"></i>
                    </span>
                  </div>
                </button>
                <div className={`tc-section-body ${isOpen ? "expanded" : ""}`}>
                  <div className="tc-section-content">
                    <Content />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Footer */}
          <div className="tc-footer-cta">
            <div className="tc-footer-icon">
              <i className="fas fa-file-contract"></i>
            </div>
            <h3>Questions about these Terms?</h3>
            <p>Reach out to the TODO GROUP S.R.L. legal team</p>
            <div className="tc-footer-btns">
              <a
                href="mailto:support@todoai.ai"
                className="tc-footer-btn primary"
              >
                <i className="fas fa-envelope"></i> support@todoai.ai
              </a>
              <a
                href="mailto:todogroupsrl@pec.it"
                className="tc-footer-btn outline"
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

export default TermsConditions;
