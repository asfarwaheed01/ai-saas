import React, { useState } from "react";
import {
  FaCreditCard,
  FaExclamationCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaClipboard,
  FaCheckCircle,
  FaLayerGroup,
  FaTags,
} from "react-icons/fa";
import "../index.css";

const CreateSubscriptionPlan = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Create Subscription Plan</h1>
        <p className="docs-page-description">
          This endpoint allows users to create new subscription plans with
          various limitations and features. These plans can later be purchased
          by users through the payment system.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">/api/subscription-plans/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaShieldAlt /> Authentication Required
            </span>
          </div>

          <div className="docs-alert docs-alert-warning">
            <FaExclamationCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">User Privileges Required</div>
              <p className="docs-alert-message">
                This endpoint is restricted to users only. Regular users
                cannot create subscription plans.
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint enables administrators to create new subscription
            plans with defined resource limits such as API request allowances
            and PDF upload limits. Each plan can have a specific price,
            description, and priority for display ordering. Plans can also be
            restricted to specific domains.
          </p>

          <h3 className="docs-subsection-title">Request</h3>
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
                  <td>name</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Name of the plan</td>
                </tr>
                <tr>
                  <td>api_requests</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Number of API requests allowed</td>
                </tr>
                <tr>
                  <td>price</td>
                  <td>
                    <code>float</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Price of the plan</td>
                </tr>
                <tr>
                  <td>pdf_uploads</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Number of PDF uploads allowed</td>
                </tr>
                <tr>
                  <td>allowed_domains</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>Comma-separated list of allowed domains</td>
                </tr>
                <tr>
                  <td>description</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>Description of the plan</td>
                </tr>
                <tr>
                  <td>priority</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>
                    Priority for ordering plans (lower numbers displayed first)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button
                className="docs-code-copy"
                onClick={() =>
                  copyToClipboard(`curl -X POST \\
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Pro Plan",
    "api_requests": 10000,
    "price": 49.99,
    "pdf_uploads": 100,
    "allowed_domains": "pharma,cosmetici",
    "description": "Accesso completo alle API",
    "priority": 1
  }'`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X POST \\
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Pro Plan",
    "api_requests": 10000,
    "price": 49.99,
    "pdf_uploads": 100,
    "allowed_domains": "pharma,cosmetici",
    "description": "Accesso completo alle API",
    "priority": 1
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
              {showResponse && (
                <div className="docs-tab-pane active">
                  <h4 className="docs-response-title">Response Fields</h4>
                  <p>
                    Returns the created plan object with all input fields plus
                    the additional fields:
                  </p>
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
                          <td>id</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>
                            Unique identifier (UUID) for the subscription plan
                          </td>
                        </tr>
                        <tr>
                          <td>created_at</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO timestamp of creation time</td>
                        </tr>
                        <tr>
                          <td>updated_at</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>ISO timestamp of last update</td>
                        </tr>
                        <tr>
                          <td>and all request fields...</td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "id": "uuid-1234...",
  "name": "Pro Plan",
  "api_requests": 10000,
  "price": 49.99,
  "pdf_uploads": 100,
  "allowed_domains": "pharma,cosmetici",
  "description": "Accesso completo alle API",
  "created_at": "2025-05-01T12:00:00Z",
  "updated_at": "2025-05-01T12:00:00Z",
  "priority": 1
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "id": "uuid-1234...",
  "name": "Pro Plan",
  "api_requests": 10000,
  "price": 49.99,
  "pdf_uploads": 100,
  "allowed_domains": "pharma,cosmetici",
  "description": "Accesso completo alle API",
  "created_at": "2025-05-01T12:00:00Z",
  "updated_at": "2025-05-01T12:00:00Z",
  "priority": 1
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-success">
                    <FaCheckCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Success Response</div>
                      <p className="docs-alert-message">
                        On successful creation, the API returns a 200 OK status
                        code along with the complete subscription plan object
                        including the assigned ID and timestamps.
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
                      <div className="docs-alert-title">403: Forbidden</div>
                      <p className="docs-alert-message">
                        Users can create plans
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">Validation error</p>
                    </div>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>403 Error Response Example</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Forbidden",
  "message": " users can create plans",
  "status": 403
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "error": "Forbidden",
  "message": " users can create plans",
  "status": 403
}`}
                    </pre>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>400 Error Response Example</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "name": ["This field is required"],
    "api_requests": ["Must be a positive integer"],
    "price": ["Must be a positive number"]
  },
  "status": 400
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "name": ["This field is required"],
    "api_requests": ["Must be a positive integer"],
    "price": ["Must be a positive number"]
  },
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
          <FaCreditCard /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaLayerGroup /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to create a subscription plan using
              JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to create a subscription plan
async function createSubscriptionPlan(planData) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create subscription plan');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
}

// Example usage
const planData = {
  name: 'Pro Plan',
  api_requests: 10000,
  price: 49.99,
  pdf_uploads: 100,
  allowed_domains: 'pharma,cosmetici',
  description: 'Accesso completo alle API',
  priority: 1
};

// panel submission handler
document.getElementById('create-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const statusDiv = document.getElementById('submission-status');
  statusDiv.innerHTML = 'Creating plan...';
  statusDiv.className = 'status-pending';
  
  try {
    const plan = await createSubscriptionPlan(planData);
    statusDiv.innerHTML = \`Plan created successfully! ID: \${plan.id}\`;
    statusDiv.className = 'status-success';
    
    // Update the plan list
    updatePlansList();
  } catch (error) {
    statusDiv.innerHTML = \`Error: \${error.message}\`;
    statusDiv.className = 'status-error';
  }
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to create a subscription plan
async function createSubscriptionPlan(planData) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create subscription plan');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating subscription plan:', error);
    throw error;
  }
}

// Example usage
const planData = {
  name: 'Pro Plan',
  api_requests: 10000,
  price: 49.99,
  pdf_uploads: 100,
  allowed_domains: 'pharma,cosmetici',
  description: 'Accesso completo alle API',
  priority: 1
};

//  panel submission handler
document.getElementById('create-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const statusDiv = document.getElementById('submission-status');
  statusDiv.innerHTML = 'Creating plan...';
  statusDiv.className = 'status-pending';
  
  try {
    const plan = await createSubscriptionPlan(planData);
    statusDiv.innerHTML = \`Plan created successfully! ID: \${plan.id}\`;
    statusDiv.className = 'status-success';
    
    // Update the plan list
    updatePlansList();
  } catch (error) {
    statusDiv.innerHTML = \`Error: \${error.message}\`;
    statusDiv.className = 'status-error';
  }
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaTags /> Plan Management Best Practices
          </div>
          <div className="docs-card-content">
            <p>
              When designing and managing subscription plans, consider the
              following best practices:
            </p>
            <ul className="docs-list">
              <li>
                <strong>Consistent Naming:</strong> Use clear, descriptive names
                that reflect the plan tier (e.g., "Basic", "Pro", "Enterprise")
              </li>
              <li>
                <strong>Logical Resource Allocation:</strong> Ensure resources
                (API requests, PDF uploads) increase proportionally with price
              </li>
              <li>
                <strong>Use Priorities:</strong> Set meaningful priority values
                to control the order in which plans are displayed to users
              </li>
              <li>
                <strong>Domain Restrictions:</strong> Use domain restrictions to
                create industry-specific plans for targeted sectors
              </li>
              <li>
                <strong>Detailed Descriptions:</strong> Write clear descriptions
                explaining the benefits and target audience for each plan
              </li>
              <li>
                <strong>Testing:</strong> Test new plans in a non-production
                environment before making them available to users
              </li>
              <li>
                <strong>Update Existing Plans:</strong> Use the update endpoint
                to modify plans rather than creating new ones for minor changes
              </li>
            </ul>
          </div>
        </div>

        <div className="docs-alert docs-alert-info">
          <FaInfoCircle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Subscription Management</div>
            <p className="docs-alert-message">
              After creating subscription plans, users can subscribe to them
              using the <code>/api/stripe-payment/</code> endpoint, which
              creates a Stripe checkout session. Plan management should be
              integrated with your payment processing system to ensure users
              have access to the appropriate resources based on their
              subscription level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriptionPlan;
