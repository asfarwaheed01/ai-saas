export const ROUTES = {
  home: { path: "/", name: "Home" },
  login: { path: "/login", name: "Login" },
  forgotPassword: { path: "/forgot-password", name: "Forgot Password" },
  resetPassword: { path: "/reset-password", name: "Reset Password" },
  services: { path: "/services", name: "Services" },
  contact: { path: "/contact-us", name: "Contact Us" },
  docs: { path: "/docs", name: "Documents" },
  avatars: { path: "/avatars", name: "Avatars" },
  aboutUs: { path: "/about-us", name: "About Us" },
  // Documentation sections
  docsGettingStarted: {
    path: "/docs/getting-started",
    name: "Getting API Documentation",
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

  //Organizational Context
  docsOrganizationalContext: {
    path: "/docs/organizational-context",
    name: "Organizational Context",
  },
  docsRetrieveOrganization: {
    path: "/docs/organizational-context/retrieve",
    name: "Retrieve Organization Details",
  },
  docsCreateOrganization: {
    path: "/docs/organizational-context/create",
    name: "Create Organization Details",
  },
  docsUpdateOrganization: {
    path: "/docs/organizational-context/update",
    name: "Update Organization Details",
  },
  docsDeleteOrganization: {
    path: "/docs/organizational-context/delete",
    name: "Delete Organization Details",
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
  pricing: {
    path: "/pricing-plans",
    name: "Pricing Plans",
  },
  // Dashboard routes
  dashboard: { path: "/dashboard", name: "Dashboard" },
  organization: { path: "/docs/organization", name: "Organization" },
  apiKeys: { path: "/docs/api-keys", name: "API Keys" },

  //Footer Routes
  certificate: {
    path: "/informativa_privacy",
    name: "Co-financed by the eurpeion union",
  },
  success: {
    path: "/payment-success",
    name: "Payment Success",
  },
  failure: {
    path: "/payment-fail",
    name: "Payment Fail",
  },
};
