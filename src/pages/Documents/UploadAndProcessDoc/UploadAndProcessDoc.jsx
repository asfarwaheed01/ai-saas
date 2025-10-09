import React, { useState } from "react";
import {
  FaUpload,
  FaFileUpload,
  FaExclamationCircle,
  FaCheckCircle,
  FaInfoCircle,
} from "react-icons/fa";
import "../index.css";

const UploadAndProcessDoc = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Upload and Process Document</h1>
        <p className="docs-page-description">
          Upload a CSV or Excel document, process its contents, and store
          embeddings. The embeddings are stored per-row, and the file is
          uploaded to S3 with document ID in the metadata.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">/api/knowledge-base/docs/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint allows you to upload a CSV or Excel document to be
            processed and have its contents stored as embeddings. Each row in
            the document is processed individually and stored with embedded
            vector representations. The original file is uploaded to S3 storage
            with the document ID included in its metadata.
          </p>

          <h3 className="docs-subsection-title">Request</h3>
          <p>
            This endpoint accepts <code>multipart/form-data</code> content type
            for file uploads.
          </p>

          <div className="docs-table">
            <h4 className="docs-response-title">Input Parameters</h4>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>file</td>
                  <td>
                    <code>file</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>CSV or Excel file to be processed</td>
                </tr>
                <tr>
                  <td>domain</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Domain/category name for organizing the document</td>
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
              {`curl -X POST \\
  https://api.example.com/api/knowledge-base/docs/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@/path/to/your/document.csv" \\
  -F "domain=pharma"`}
            </pre>
          </div>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Content-Type Notice</div>
              <p className="docs-alert-message">
                When uploading files, ensure that your Content-Type is set to{" "}
                <code>multipart/form-data</code>. Most HTTP client libraries
                will set this automatically when using file upload methods.
              </p>
            </div>
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
                          <td>message</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Success message</td>
                        </tr>
                        <tr>
                          <td>document_id</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>ID of the created Document</td>
                        </tr>
                        <tr>
                          <td>stats</td>
                          <td>
                            <code>object</code>
                          </td>
                          <td>Processing statistics</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h4 className="docs-response-title">Stats Object</h4>
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
                          <td>total_rows</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Total rows in the file</td>
                        </tr>
                        <tr>
                          <td>processed_rows</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of rows processed</td>
                        </tr>
                        <tr>
                          <td>failed_rows</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of rows failed</td>
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
  "message": "Document processed successfully",
  "document_id": 123,
  "stats": {
    "total_rows": 100,
    "processed_rows": 98,
    "failed_rows": 2
  }
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-success">
                    <FaCheckCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Processing Details</div>
                      <p className="docs-alert-message">
                        The API will attempt to process all rows in your file.
                        The response includes statistics about how many rows
                        were successfully processed and how many failed. For
                        large files, processing may take some time, but the
                        request remains synchronous and will return once
                        complete.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {showError && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Error Responses</h4>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        No domain specified / No file uploaded
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Failed to upload file / Error processing document
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
  "message": "No domain specified",
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

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaFileUpload /> Usage Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaUpload /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to upload a document using JavaScript and
              the Fetch API:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Upload Example</span>
                <button className="docs-code-copy">Copy</button>
              </div>
              <pre>
                {`// Assuming you have a file input element with id="fileInput"
const fileInput = document.getElementById('fileInput');
const apiKey = 'YOUR_API_KEY';
const domain = 'pharma';

// Create a FormData object to hold the file data
const formData = new FormData();
formData.append('file', fileInput.files[0]);
formData.append('domain', domain);

// Make the API request
fetch('https://api.example.com/api/knowledge-base/docs/', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`
    // Note: Do not set Content-Type header manually for FormData
  },
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  console.log(\`Processed \${data.stats.processed_rows} out of \${data.stats.total_rows} rows\`);
})
.catch(error => {
  console.error('Error:', error);
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaInfoCircle /> Best Practices
          </div>
          <div className="docs-card-content">
            <ul className="docs-list">
              <li>
                <strong>File Format:</strong> Ensure your CSV or Excel files
                have proper headers and are formatted consistently
              </li>
              <li>
                <strong>Domain Naming:</strong> Use clear, consistent domain
                names to organize your documents (e.g., "pharma", "finance",
                "retail")
              </li>
              <li>
                <strong>Large Files:</strong> For very large files, consider
                splitting them into smaller chunks to improve processing
                reliability
              </li>
              <li>
                <strong>Error Handling:</strong> Always check the response for
                failed rows and examine why they might have failed
              </li>
              <li>
                <strong>Domain Consistency:</strong> Using the same domain for
                related documents will improve search results when querying the
                knowledge base
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAndProcessDoc;
