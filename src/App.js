import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home/HomePage";
import Contact from "./pages/Contact/contactUs";
import MainLayout from "./layout/MainLayout";
import DocsLayout from "./layout/DocsLayout";
import GettingStarted from "./pages/Documents/GettingStarted/GettingStarted";
import ListDocumentsPage from "./pages/Documents/ListDocuments/ListDocuments";
import { ROUTES } from "../src/routes/routes";
import UploadAndProcessDoc from "./pages/Documents/UploadAndProcessDoc/UploadAndProcessDoc";
import DeleteDocuments from "./pages/Documents/DeleteDocuments/DeleteDocuments";
import AgentProcessVideo from "./pages/Documents/AgentProcessVideo/AgentProcessVideo";
import AgentConversationalResponse from "./pages/Documents/AgentConversationalResponse/AgentConversationalResponse";
import NotFound from "./pages/NotFound/NotFound";
import CreateSubscriptionPlan from "./pages/Documents/CreateSubscriptionPlan/CreateSubscriptionPlan";
import ListSubscriptionPlans from "./pages/Documents/ListSubscriptionPlans/ListSubscriptionPlans";
import UpdateSubscriptionPlan from "./pages/Documents/UpdateSubscriptionPlan/UpdateSubscriptionPlan";
import CreateStripePaymentSession from "./pages/Documents/CreateStrpieSession/CreateStripePaymentSession";
import CancelSubscription from "./pages/Documents/CancelSubscription/CancelSubscription";
import GetActiveSubscription from "./pages/Documents/GetActiveSubscription/GetActiveSubscription";
import Services from "./pages/Services/Services";
import Avatars from "./pages/Avatars/Avatars";
import Login from "./pages/Auth/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardLayout from "./layout/DashboardLayout";
import OrganizationContext from "./pages/OrganizationContext/OrganizationContext";
import Apikeys from "./pages/ApiKeys/Apikeys";
import PricingPlans from "./pages/PricingPlans/PricingPlans";

function App() {
  return (
    <Routes>
      {/* Main Routes */}
      <Route
        path={ROUTES.home.path}
        element={
          <MainLayout>
            <HomePage />
          </MainLayout>
        }
      />

      <Route
        path={ROUTES.login.path}
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.contact.path}
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.services.path}
        element={
          <MainLayout>
            <Services />
          </MainLayout>
        }
      />
      <Route
        path={ROUTES.pricing.path}
        element={
          <MainLayout>
            <PricingPlans />
          </MainLayout>
        }
      />
      <Route path={ROUTES.avatars.path} element={<Avatars />} />

      <Route
        path={ROUTES.docs.path}
        element={
          <DocsLayout>
            <GettingStarted />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsGettingStarted.path}
        element={
          <DocsLayout>
            <GettingStarted />
          </DocsLayout>
        }
      />
      {/* Knowledge Base API Routes */}
      <Route
        path={ROUTES.docsListDocuments.path}
        element={
          <DocsLayout>
            <ListDocumentsPage />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsUploadDocuments.path}
        element={
          <DocsLayout>
            <UploadAndProcessDoc />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsDeleteDocuments.path}
        element={
          <DocsLayout>
            <DeleteDocuments />
          </DocsLayout>
        }
      />
      {/* Agent API Routes */}
      <Route
        path={ROUTES.docsProcessVideo.path}
        element={
          <DocsLayout>
            <AgentProcessVideo />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsGenerateResponse.path}
        element={
          <DocsLayout>
            <AgentConversationalResponse />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsCreateSubscription.path}
        element={
          <DocsLayout>
            <CreateSubscriptionPlan />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsListSubscriptions.path}
        element={
          <DocsLayout>
            <ListSubscriptionPlans />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsUpdateSubscription.path}
        element={
          <DocsLayout>
            <UpdateSubscriptionPlan />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsStripePayment.path}
        element={
          <DocsLayout>
            <CreateStripePaymentSession />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsCancelSubscription.path}
        element={
          <DocsLayout>
            <CancelSubscription />
          </DocsLayout>
        }
      />
      <Route
        path={ROUTES.docsActiveSubscription.path}
        element={
          <DocsLayout>
            <GetActiveSubscription />
          </DocsLayout>
        }
      />
      {/* Dashboard Routes */}
      <Route
        path={ROUTES.dashboard.path}
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path={ROUTES.organization.path}
        element={
          <DashboardLayout>
            <OrganizationContext />
          </DashboardLayout>
        }
      />
      <Route
        path={ROUTES.apiKeys.path}
        element={
          <DashboardLayout>
            <Apikeys />
          </DashboardLayout>
        }
      />
      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
