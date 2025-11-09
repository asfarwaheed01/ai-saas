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
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Certificate from "./pages/Certificate/Certificate";
import AboutUs from "./pages/AboutUs/AboutUs";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure/PaymentFailure";
import ProtectedRoute from "./routes/protectedRoutes";
import GetOrganizationContext from "./pages/Documents/GetOrganizationalContext/GetOrganizationContext";
import CreateOrganizationContext from "./pages/Documents/CreateOrganizationContext/CreateOrganizationContext";
import UpdateOrganizationContext from "./pages/Documents/UpdateOrganizationContext/UpdateOrganizationContext";
import DeleteOrganizationContext from "./pages/Documents/DeleteOrganizationContext/DeleteOrganizationContext";
import ResetPassword from "./pages/Auth/Login/ResetPassword";
import ForgotPassword from "./pages/Auth/Login/ForgotPassword";
import ChangePassword from "./pages/Auth/Login/ChangePassword";
import VerifyEmail from "./pages/Auth/Login/VerifyEmail";
import ManageSubscription from "./pages/ManageSubscriptions/ManageSubscription";

function App() {
  return (
    <>
      <ScrollToTop />
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
          path={ROUTES.manageSubscription.path}
          element={
            <MainLayout>
              <ManageSubscription />
            </MainLayout>
          }
        />

        <Route
          path={ROUTES.VerifyEmail.path}
          element={
            <MainLayout>
              <VerifyEmail />
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
          path={ROUTES.forgotPassword.path}
          element={
            <MainLayout>
              <ForgotPassword />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.resetPassword.path}
          element={
            <MainLayout>
              <ResetPassword />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.changePassword.path}
          element={
            <MainLayout>
              <ChangePassword />
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
        <Route
          path={ROUTES.certificate.path}
          element={
            <MainLayout>
              <Certificate />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.success.path}
          element={
            <MainLayout>
              <PaymentSuccess />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.failure.path}
          element={
            <MainLayout>
              <PaymentFailure />
            </MainLayout>
          }
        />
        <Route
          path={ROUTES.aboutUs.path}
          element={
            <MainLayout>
              <AboutUs />
            </MainLayout>
          }
        />
        <Route path={ROUTES.avatars.path} element={<Avatars />} />

        <Route
          path={ROUTES.docs.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <GettingStarted />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsGettingStarted.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <GettingStarted />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        {/* Knowledge Base API Routes */}
        <Route
          path={ROUTES.docsListDocuments.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <ListDocumentsPage />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsUploadDocuments.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <UploadAndProcessDoc />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsDeleteDocuments.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <DeleteDocuments />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        {/* Agent API Routes */}
        <Route
          path={ROUTES.docsProcessVideo.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <AgentProcessVideo />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsGenerateResponse.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <AgentConversationalResponse />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsCreateSubscription.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <CreateSubscriptionPlan />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsListSubscriptions.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <ListSubscriptionPlans />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsUpdateSubscription.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <UpdateSubscriptionPlan />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsStripePayment.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <CreateStripePaymentSession />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsCancelSubscription.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <CancelSubscription />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsActiveSubscription.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <GetActiveSubscription />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.docsRetrieveOrganization.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <GetOrganizationContext />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsCreateOrganization.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <CreateOrganizationContext />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsUpdateOrganization.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <UpdateOrganizationContext />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.docsDeleteOrganization.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <DeleteOrganizationContext />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        {/* Dashboard Routes */}
        <Route
          path={ROUTES.dashboard.path}
          element={
            <ProtectedRoute adminOnly>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.organization.path}
          element={
            // <ProtectedRoute>
            <DocsLayout>
              <OrganizationContext />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.apiKeys.path}
          element={
            // <DashboardLayout>
            //   <Apikeys />
            // </DashboardLayout>
            // <ProtectedRoute>
            <DocsLayout>
              <Apikeys />
            </DocsLayout>
            // </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
