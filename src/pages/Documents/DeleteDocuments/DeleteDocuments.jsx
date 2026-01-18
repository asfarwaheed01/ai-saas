import React, { useState } from "react";
import {
  FaTrash,
  FaExclamationCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaDatabase,
} from "react-icons/fa";
import "../index.css";

const DeleteDocuments = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">
          Delete Document Embeddings and S3 File
        </h1>
        <p className="docs-page-description">
          This endpoint allows users to delete all vector embeddings for a
          document and its corresponding S3 file. The database record is
          retained for reference.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method delete">DELETE</span>
            <code className="docs-endpoint-url">
              /api/knowledge-base/docs/delete/&lt;document_id&gt;/&lt;domain&gt;/
            </code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaShieldAlt /> Authentication Required | API key Required
            </span>
          </div>

          <div className="docs-alert docs-alert-warning">
            <FaExclamationCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">User Privileges Required</div>
              <p className="docs-alert-message">
                This endpoint is restricted to users only. Regular users cannot
                delete documents or their embeddings.
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint removes all vector embeddings associated with a
            specific document and deletes the corresponding file from S3
            storage. The database record for the document is retained for
            historical reference. This operation is useful for removing outdated
            or incorrect documents while maintaining a record of what was
            previously stored.
          </p>

          <p>
            <strong className="supported-color">Domains Allowed:</strong>{" "}
            therapy,beauty,consultation,medical
          </p>

          <h3 className="docs-subsection-title">Path Parameters</h3>
          <div className="docs-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>document_id</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Document ID (from URL path)</td>
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
                  <td>Domain name (from URL path)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="docs-subsection-title">Request</h3>
          <p>This endpoint does not require a request body.</p>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button className="docs-code-copy">Copy</button>
            </div>
            <pre>
              {/* {`curl -X DELETE \\
  https://api.example.com/api/knowledge-base/docs/delete/123/pharma/ \\
  -H "Authorization: Bearer YOUR_API_KEY"`} */}
              {`curl -X DELETE https://saas.todoai.com/api/knowledge-base/docs/delete/<DOCUMENT_ID>/<DOMAIN>/
  -H "X-API-Key: pk_abc123def456" 
  -H "X-Signature: $SIGNATURE"`}
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
                          <td>message</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Detailed deletion status</td>
                        </tr>
                        <tr>
                          <td>deleted_vectors_count</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of embeddings deleted</td>
                        </tr>
                        <tr>
                          <td>s3_deleted</td>
                          <td>
                            <code>bool</code>
                          </td>
                          <td>Whether the S3 file was deleted</td>
                        </tr>
                        <tr>
                          <td>s3_error</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>
                            Error message if S3 deletion failed, or null if
                            successful
                          </td>
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
  "message": "Vector deletion attempted (100 deleted). S3 file deleted successfully.",
  "deleted_vectors_count": 100,
  "s3_deleted": true,
  "s3_error": null
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-info">
                    <FaInfoCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Partial Success</div>
                      <p className="docs-alert-message">
                        The operation may complete partially in some cases. For
                        example, if the vector embeddings are successfully
                        deleted but the S3 file deletion fails, the response
                        will indicate this with <code>s3_deleted: false</code>{" "}
                        and include an error message in <code>s3_error</code>.
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
                      <div className="docs-alert-title">
                        404: Document not found
                      </div>
                      <p className="docs-alert-message">
                        Document doesnot exsist or already deleted
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">404: No Permission</div>
                      <p className="docs-alert-message">
                        User doesnot own this document
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        500: Failed to delete embeddings
                      </div>
                      <p className="docs-alert-message">
                        Vector database error
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">
                        500: Unexpected error
                      </div>
                      <p className="docs-alert-message">
                        Server-side processing error
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
  "message": "Only users are allowed to delete documents",
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

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaTrash /> Usage and Best Practices
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaInfoCircle /> Implementation Notes
          </div>
          <div className="docs-card-content">
            <p>
              When implementing deletion functionality in your application,
              consider the following:
            </p>

            <ul className="docs-list">
              <li>
                <strong>Confirmation Dialog:</strong> Always show a confirmation
                dialog to prevent accidental deletions
              </li>
              <li>
                <strong>Batch Operations:</strong> For bulk deletions, consider
                implementing a separate batch deletion endpoint
              </li>
              <li>
                <strong>Document ID Tracking:</strong> Keep track of document
                IDs in your application to make deletion easier
              </li>
              <li>
                <strong>Audit Logging:</strong> Log all deletion operations for
                security and compliance purposes
              </li>
            </ul>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaDatabase /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to delete a document using JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Delete Example</span>
                <button className="docs-code-copy">Copy</button>
              </div>
              <pre>
                {`const deleteDocument = async (documentId, domain) => {
  const apiKey = 'YOUR_API_KEY';
  
  try {
    const response = await fetch(\`https://api.example.com/api/knowledge-base/docs/delete/\${documentId}/\${domain}/\`, {
      method: 'DELETE',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete document');
    }
    
    console.log(\`Successfully deleted \${data.deleted_vectors_count} vectors\`);
    console.log(\`S3 file deleted: \${data.s3_deleted}\`);
    
    if (!data.s3_deleted && data.s3_error) {
      console.warn(\`S3 deletion error: \${data.s3_error}\`);
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

// Usage
deleteDocument(123, 'pharma')
  .then(result => {
    console.log('Delete operation completed:', result);
  })
  .catch(error => {
    console.error('Delete operation failed:', error);
  });`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-alert docs-alert-warning">
          <FaExclamationCircle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Caution: Permanent Operation</div>
            <p className="docs-alert-message">
              Deletion operations are permanent and cannot be undone. The vector
              embeddings and S3 file are completely removed from the system.
              Only the database record of the document is retained for reference
              purposes.
            </p>
          </div>
        </div>
      </div>
      <h3 className="docs-subsection-title">Signature Creation</h3>
      {/* <p>Calculate signature</p> */}

      <div className="docs-code">
        <div className="docs-code-header">
          <span>Example Request</span>
          <button className="docs-code-copy">Copy</button>
        </div>
        <pre>
          {/* {`curl -X GET \\
  https://api.example.com/api/knowledge-base/docs/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`} */}
          {`SECRET_KEY="your_secret_key"
DOMAIN="beauty"
SIGNATURE=$(echo -n "$DOMAIN" | openssl dgst -sha256 -hmac "$SECRET_KEY" | awk '{print $2}')

//In Python
domain = "beauty"  # Domain from URL path
signature = hmac.new(
    SECRET_KEY.encode('utf-8'),
    domain.encode('utf-8'),
    hashlib.sha256
).hexdigest()

# Headers
headers = {
    "X-API-Key": "pk_your_api_key",
    "X-Signature": signature
}
`}
        </pre>
      </div>
    </div>
  );
};

export default DeleteDocuments;
