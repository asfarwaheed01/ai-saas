export const ROUTES = {
  home: { path: "/", name: "Home" },
  login: { path: "/login", name: "Login" },
  services: { path: "/services", name: "Services" },
  contact: { path: "/contact-us", name: "Contact Us" },
  docs: { path: "/docs", name: "Documents" },
  avatars: { path: "/avatars", name: "Avatars" },
  // Documentation sections
  docsGettingStarted: {
    path: "/docs/getting-started",
    name: "Getting Started",
  },

  // Knowledge Base API routes
  docsKnowledgeBase: {
    path: "/docs/knowledge-base",
    name: "Knowledge Base API",
  },
  docsListDocuments: {
    path: "/docs/knowledge-base/list-documents",
    name: "List Documents",
  },
  docsUploadDocuments: {
    path: "/docs/knowledge-base/upload-documents",
    name: "Upload Documents",
  },
  docsDeleteDocuments: {
    path: "/docs/knowledge-base/delete-documents",
    name: "Delete Documents",
  },

  // Agent API routes
  docsAgent: { path: "/docs/agent", name: "Agent API" },
  docsProcessVideo: {
    path: "/docs/agent/process-video",
    name: "Process Video",
  },
  docsGenerateResponse: {
    path: "/docs/agent/generate-response",
    name: "Generate Response",
  },

  // Payments API routes
  docsPayments: { path: "/docs/payments", name: "Payments API" },
  docsCreateSubscription: {
    path: "/docs/payments/create-subscription",
    name: "Create Subscription",
  },
  docsListSubscriptions: {
    path: "/docs/payments/list-subscriptions",
    name: "List Subscriptions",
  },
  docsUpdateSubscription: {
    path: "/docs/payments/update-subscription",
    name: "Update Subscription",
  },
  docsStripePayment: {
    path: "/docs/payments/stripe-payment",
    name: "Stripe Payment",
  },
  docsCancelSubscription: {
    path: "/docs/payments/cancel-subscription",
    name: "Cancel Subscription",
  },
  docsActiveSubscription: {
    path: "/docs/payments/active-subscription",
    name: "Active Subscription",
  },
};
