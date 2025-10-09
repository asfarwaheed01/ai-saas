// import React from "react";

// const UpdateOrganizationContext = () => {
//   return <div>UpdateOrganizationContext</div>;
// };

// export default UpdateOrganizationContext;
import React, { useState } from "react";
import { FaExclamationCircle, FaInfo } from "react-icons/fa";
import "../index.css";

const PutOrganizationContext = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Update Organization Context</h1>
        <p className="docs-page-description">
          Update existing organization details for an authenticated user.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method put">PUT</span>
            <code className="docs-endpoint-url">
              /api/agents/organization-context/
            </code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfo /> Authentication Required (JWT)
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint allows an authenticated user to update their
            organization details. Only one record exists per user, and this will
            modify the existing entry.
          </p>

          <h3 className="docs-subsection-title">Request Body</h3>
          <div className="docs-table">
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>organization_details</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    Updated organization details text (max 100,000 tokens)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button className="docs-code-copy">Copy</button>
            </div>
            <pre>
              {`curl -X PUT \\
  https://api.example.com/api/agents/organization-context/ \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "organization_details": "Updated organization details text (max 100,000 tokens)"
  }'`}
            </pre>
          </div>

          <h3 className="docs-subsection-title">Response</h3>

          <div className="docs-tabs">
            <div className="docs-tabs-header">
              <button
                className={`docs-tab-button ${showResponse ? "active" : ""}`}
                onClick={() => {
                  setShowResponse(true);
                  setShowError(false);
                }}
              >
                Success Response
              </button>
              <button
                className={`docs-tab-button ${showError ? "active" : ""}`}
                onClick={() => {
                  setShowResponse(false);
                  setShowError(true);
                }}
              >
                Error Response
              </button>
            </div>

            <div className="docs-tabs-content">
              {/* ✅ Success Response */}
              {showResponse && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Response Fields</h4>
                  <div className="docs-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Type</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>message</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Confirmation message</td>
                        </tr>
                        <tr>
                          <td>user_id</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>User ID of the authenticated user</td>
                        </tr>
                        <tr>
                          <td>created_at</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Timestamp when the record was created</td>
                        </tr>
                        <tr>
                          <td>updated_at</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Timestamp when the record was last updated</td>
                        </tr>
                        <tr>
                          <td>token_count</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>
                            Number of tokens used in the organization details
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response (200 OK)</span>
                      <button className="docs-code-copy">Copy</button>
                    </div>
                    <pre>
                      {`{
  "message": "Organization details updated successfully",
  "user_id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T12:00:00Z",
  "token_count": 1500
}`}
                    </pre>
                  </div>
                </div>
              )}

              {/* ❌ Error Response */}
              {showError && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Error Responses</h4>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        Organization details too long (max 100,000 tokens).
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">404: Not Found</div>
                      <p className="docs-alert-message">
                        Organization details not found for this user.
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Failed to update organization details.
                      </p>
                    </div>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Error Response Example</span>
                      <button className="docs-code-copy">Copy</button>
                    </div>
                    <pre>
                      {`{
  "error": "Bad Request",
  "message": "Organization details too long (max 100,000 tokens)",
  "status": 400
}`}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutOrganizationContext;
