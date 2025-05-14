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
        path={ROUTES.contact.path}
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
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

      {/* Fallback route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
