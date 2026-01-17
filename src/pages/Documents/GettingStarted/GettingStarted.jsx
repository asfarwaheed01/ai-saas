import React, { useEffect, useState } from "react";
import {
  FaRocket,
  FaKey,
  FaCode,
  FaLock,
  FaExclamationTriangle,
} from "react-icons/fa";
import "./GettingStarted.css";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../../../config/constants";

const GettingStarted = () => {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // Fetch supported languages
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendURL}/agents/supported-languages/`);
        // "https://saas.todopharma.com/api/agents/supported-languages/"
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        // Expected format: { details: [{ code: "eng", name: "English" }, ...] }
        if (Array.isArray(data.details)) {
          setLanguages(data.details);
        } else {
          setLanguages([]);
        }
      } catch (err) {
        console.error("Error fetching languages:", err);
        setError("Failed to load supported languages.");
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);
  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Getting API Documentation</h1>
        <p className="docs-page-description">
          Welcome to the AI Customer Service API Documentation. This guide will
          help you get started with our APIs and show you how to integrate them
          into your applications. Here's the{" "}
          <span className="text-color">Base URL:</span>
        </p>
        <section className="live-api-section container-xlarge">
          <h2 className="api-heading">Developer's API</h2>

          <div className="api-box" onClick={() => navigate("/docs/api-keys")}>
            <pre className="api-code">
              {`const url = https://saas.todoai.com/
  {
    auth: {
      token: 'your_api_key_here'
    },
  }
`}
            </pre>
            <div className="tooltip">Access Developer API </div>
          </div>
        </section>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaRocket /> Introduction
        </h2>
        <p>
          {/* Our API provides a comprehensive set of endpoints for building
          AI-powered customer service applications. The API is organized into
          several sections: */}
          Welcome to the AI Customer Service API! Our platform provides two
          powerful AI-driven services that you can easily integrate into your
          applications:
        </p>
        <ul className="docs-list">
          <li>
            <strong>Knowledge Base API:</strong> Document management and
            retrieval for context-aware responses
          </li>
          <li>
            <strong>AI Agent API:</strong> Intelligent conversational AI with
            multi-language support and video analysis
          </li>
          {/* <li className="supported-lang">
            <strong>Supported Languages:</strong> English (eng), Italian (it),
            French (fr)
          </li> */}
          <li className="supported-lang">
            <strong>Supported Languages:</strong>{" "}
            {loading ? (
              <span>Loading...</span>
            ) : error ? (
              <span className="error-text">{error}</span>
            ) : languages.length > 0 ? (
              languages.map((lang, index) => (
                <span key={lang.code}>
                  {lang.name}
                  {index < languages.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span>
                English, Italian, French, Spanish, German, Portuguese, Arabic,
                Chinese (Simplified), Polish
              </span>
            )}
          </li>
          {/* <li>
            <strong>Payments API:</strong> Manage subscription plans and handle
            payments
          </li> */}
        </ul>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaKey /> Authentication
        </h2>
        <p>
          All API requests require authentication using API keys. You should
          include your API key and Signature key in the Authorization header of
          each request.
        </p>

        <div className="docs-alert docs-alert-warning">
          <FaExclamationTriangle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">API Key Security</div>
            <p className="docs-alert-message">
              Keep your API keys secure and never share them in publicly
              accessible areas such as client-side code or repositories.
            </p>
          </div>
        </div>

        <h3 className="docs-subsection-title">Authentication Header</h3>
        <div className="docs-code">
          <div className="docs-code-header">
            <span>HTTP Headers</span>
          </div>
          <pre>
            {`Authorization: Bearer YOUR_API_KEY
-H "X-Signature: $SIGNATURE" 
Content-Type: application/json
Accept: application/json`}
          </pre>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaCode /> Example Request
        </h2>
        <p>Here's an example of how to make a request to our API using cURL:</p>

        <div className="docs-code">
          <div className="docs-code-header">
            <span>cURL Example</span>
          </div>
          <pre>
            {`curl -X GET \\
  https://api.example.com/api/documents/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "X-Signature: $SIGNATURE" 
  -H "Content-Type: application/json"`}
          </pre>
        </div>

        <h3 className="docs-subsection-title">Response Format</h3>
        <p>
          All responses are returned in JSON format. A typical successful
          response will have the following structure:
        </p>

        <div className="docs-code">
          <div className="docs-code-header">
            <span>JSON Response</span>
          </div>
          <pre>
            {`{
  "total_domains": 2,
  "total_documents": 5,
  "total_size_kb": 1234.56,
  "domains": [
    {
      "domain": "pharma",
      "files": [
        {
          "file_name": "file1.csv",
          "document_id": "123",
          "uploaded_at": "2024-05-01T12:34:56.789Z",
          "size_kb": 56.78,
          "domain": "pharma",
          "s3_path": "s3://bucket/documents/user_1/pharma/file1.csv"
        }
      ],
      "total_files": 1,
      "total_size_kb": 56.78
    }
  ]
}`}
          </pre>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaLock /> Error Handling
        </h2>
        <p>
          The API uses conventional HTTP response codes to indicate the success
          or failure of an API request. In general, codes in the 2xx range
          indicate success, codes in the 4xx range indicate an error that
          resulted from the provided information (e.g., a required parameter was
          missing), and codes in the 5xx range indicate an error with our
          servers.
        </p>

        <h3 className="docs-subsection-title">Error Response Format</h3>
        <p>
          Error responses will contain a JSON object with an error message and
          additional details when applicable:
        </p>

        <div className="docs-code">
          <div className="docs-code-header">
            <span>Error Response</span>
          </div>
          <pre>
            {`{
  "error": "Unauthorized",
  "message": "Invalid API key provided",
  "status": 401
}`}
          </pre>
        </div>

        <h3 className="docs-subsection-title">Common Error Codes</h3>
        <div className="docs-table">
          <table>
            <thead>
              <tr>
                <th>Status Code</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>400</td>
                <td>
                  Bad Request - Invalid parameters or missing required fields
                </td>
              </tr>
              <tr>
                <td>401</td>
                <td>Unauthorized - Invalid API key</td>
              </tr>
              <tr>
                <td>403</td>
                <td>
                  Forbidden - You don't have permission to access this resource
                </td>
              </tr>
              <tr>
                <td>404</td>
                <td>Not Found - The requested resource does not exist</td>
              </tr>
              <tr>
                <td>429</td>
                <td>Too Many Requests - You've exceeded your rate limit</td>
              </tr>
              <tr>
                <td>500, 502, 503, 504</td>
                <td>Server Error - Something went wrong on our end</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaCode /> Next Steps
        </h2>
        <p>
          Now that you understand the basics, you can explore our API endpoints
          in more detail. Use the sidebar navigation to browse through the
          various API sections.
        </p>
        <ul className="docs-list">
          <li>
            Check out the{" "}
            <strong
              onClick={() => navigate("/docs/knowledge-base/list-documents")}
            >
              Knowledge Base API
            </strong>{" "}
            to learn how to upload and query your documents
          </li>
          <li>
            Explore the{" "}
            <strong onClick={() => navigate("/docs/agent/process-video")}>
              AI Agent API
            </strong>{" "}
            to see how to process videos and generate conversational responses
          </li>
          {/* <li>
            Learn about the <strong>Payments API</strong> to manage subscription
            plans
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default GettingStarted;
