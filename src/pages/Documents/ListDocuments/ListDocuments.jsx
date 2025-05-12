import React, { useState } from "react";
import { FaExclamationCircle, FaInfo } from "react-icons/fa";
import "../index.css";

const ListDocumentsPage = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">List Uploaded Documents</h1>
        <p className="docs-page-description">
          Retrieve all uploaded documents for the authenticated admin user,
          grouped by domain. Returns S3 metadata, file info, and summary stats.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method get">GET</span>
            <code className="docs-endpoint-url">/api/documents/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfo /> Authentication Required (admin only)
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint retrieves all uploaded documents for the authenticated
            admin user, grouped by domain. It returns S3 metadata, file
            information, and summary statistics.
          </p>

          <h3 className="docs-subsection-title">Request</h3>
          <p>No input parameters are required for this endpoint.</p>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button className="docs-code-copy">Copy</button>
            </div>
            <pre>
              {`curl -X GET \\
  https://api.example.com/api/documents/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
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
                          <td>total_domains</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of unique domains</td>
                        </tr>
                        <tr>
                          <td>total_documents</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Total number of documents</td>
                        </tr>
                        <tr>
                          <td>total_size_kb</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Total size of all documents (KB)</td>
                        </tr>
                        <tr>
                          <td>domains</td>
                          <td>
                            <code>list</code>
                          </td>
                          <td>List of domain-specific file info</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">Domain Object</h4>
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
                          <td>domain</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Domain name (e.g., "pharma")</td>
                        </tr>
                        <tr>
                          <td>files</td>
                          <td>
                            <code>list</code>
                          </td>
                          <td>List of files for this domain</td>
                        </tr>
                        <tr>
                          <td>total_files</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of files in this domain</td>
                        </tr>
                        <tr>
                          <td>total_size_kb</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Total size for this domain (KB)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">File Object</h4>
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
                          <td>file_name</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Name of the file</td>
                        </tr>
                        <tr>
                          <td>document_id</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Document ID from S3 metadata</td>
                        </tr>
                        <tr>
                          <td>uploaded_at</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO timestamp of upload</td>
                        </tr>
                        <tr>
                          <td>size_kb</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>File size in kilobytes</td>
                        </tr>
                        <tr>
                          <td>domain</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Domain of the file</td>
                        </tr>
                        <tr>
                          <td>s3_path</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>S3 URI of the file</td>
                        </tr>
                        <tr>
                          <td>error</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>(optional) Error if metadata failed</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button className="docs-code-copy">Copy</button>
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
              )}

              {showError && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Error Responses</h4>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">403: Forbidden</div>
                      <p className="docs-alert-message">
                        Only admin users can view uploaded documents
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Failed to retrieve documents from storage
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
  "error": "Forbidden",
  "message": "Only admin users can view uploaded documents",
  "status": 403
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

export default ListDocumentsPage;
