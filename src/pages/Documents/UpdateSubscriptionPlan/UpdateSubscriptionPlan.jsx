import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaEdit,
  FaSave,
  FaExclamationTriangle,
  FaHistory,
  FaCheckCircle,
} from "react-icons/fa";
import "../index.css";

const UpdateSubscriptionPlan = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Update Subscription Plan</h1>
        <p className="docs-page-description">
          This endpoint allows users to update existing subscription plans. Use
          this to modify plan details, pricing, or resource limits after they
          have been created.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method put">PUT</span>
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
                This endpoint is restricted to users only. Regular users cannot
                modify subscription plans.
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint allows you to update an existing subscription plan by
            its ID. You can modify any of the plan's properties, including name,
            price, resource limits, and other configuration options. The
            endpoint requires the plan ID and at least one field to update.
          </p>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Partial Updates</div>
              <p className="docs-alert-message">
                You only need to include the fields you want to update. Any
                fields not included in the request will remain unchanged.
              </p>
            </div>
          </div>

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
                  <td>id</td>
                  <td>
                    <code>UUID</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Unique identifier of the plan to update</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>New name for the plan</td>
                </tr>
                <tr>
                  <td>api_requests</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>New number of API requests allowed</td>
                </tr>
                <tr>
                  <td>price</td>
                  <td>
                    <code>float</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>New price for the plan</td>
                </tr>
                <tr>
                  <td>pdf_uploads</td>
                  <td>
                    <code>int</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-optional">
                      Optional
                    </span>
                  </td>
                  <td>New number of PDF uploads allowed</td>
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
                  <td>New comma-separated list of allowed domains</td>
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
                  <td>New description for the plan</td>
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
                  <td>New priority for ordering plans</td>
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
                  copyToClipboard(`curl -X PUT \\
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "uuid-1234...",
    "price": 59.99,
    "api_requests": 15000,
    "description": "Piano Pro con limiti estesi"
  }'`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X PUT \\
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "id": "uuid-1234...",
    "price": 59.99,
    "api_requests": 15000,
    "description": "Piano Pro con limiti estesi"
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
                  <h4 className="docs-response-title">Response Format</h4>
                  <p>
                    The endpoint returns the complete subscription plan object
                    with all fields updated.
                  </p>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Example Response</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "id": "uuid-1234...",
  "name": "Pro Plan",
  "api_requests": 15000,
  "price": 59.99,
  "pdf_uploads": 100,
  "allowed_domains": "pharma,cosmetici",
  "description": "Piano Pro con limiti estesi",
  "created_at": "2025-05-01T12:00:00Z",
  "updated_at": "2025-05-15T09:30:45Z",
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
  "api_requests": 15000,
  "price": 59.99,
  "pdf_uploads": 100,
  "allowed_domains": "pharma,cosmetici",
  "description": "Piano Pro con limiti estesi",
  "created_at": "2025-05-01T12:00:00Z",
  "updated_at": "2025-05-15T09:30:45Z",
  "priority": 1
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-success">
                    <FaCheckCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Updated Timestamp</div>
                      <p className="docs-alert-message">
                        Note that the <code>updated_at</code> field is
                        automatically updated to reflect the time of
                        modification.
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
                        Only users can edit plans
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">404: Not Found</div>
                      <p className="docs-alert-message">Plan not found</p>
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
                      <span>404 Error Response Example</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Not Found",
  "message": "Plan with ID 'uuid-1234...' not found",
  "status": 404
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "error": "Not Found",
  "message": "Plan with ID 'uuid-1234...' not found",
  "status": 404
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
    "price": ["Must be a positive number"],
    "api_requests": ["Must be a positive integer"]
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
    "price": ["Must be a positive number"],
    "api_requests": ["Must be a positive integer"]
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
          <FaEdit /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaSave /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to update a subscription plan using
              JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to update a subscription plan
async function updateSubscriptionPlan(planId, updateData) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
  // Ensure the ID is included in the update data
  const requestData = {
    id: planId,
    ...updateData
  };
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update subscription plan');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    throw error;
  }
}

// Example usage with a form
document.getElementById('update-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const planId = document.getElementById('plan-id').value;
  const updateData = {
    name: document.getElementById('plan-name').value,
    price: parseFloat(document.getElementById('plan-price').value),
    api_requests: parseInt(document.getElementById('plan-api-requests').value),
    pdf_uploads: parseInt(document.getElementById('plan-pdf-uploads').value),
    allowed_domains: document.getElementById('plan-allowed-domains').value,
    description: document.getElementById('plan-description').value,
    priority: parseInt(document.getElementById('plan-priority').value)
  };
  
  // Remove any empty/undefined values to avoid overwriting with nulls
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === '' || updateData[key] === undefined || isNaN(updateData[key])) {
      delete updateData[key];
    }
  });
  
  try {
    const statusDiv = document.getElementById('update-status');
    statusDiv.innerHTML = 'Updating plan...';
    statusDiv.className = 'status-pending';
    
    const updatedPlan = await updateSubscriptionPlan(planId, updateData);
    
    statusDiv.innerHTML = \`Plan updated successfully! New price: \${updatedPlan.price}\`;
    statusDiv.className = 'status-success';
    
    // Update the UI with the new plan details
    displayPlanDetails(updatedPlan);
  } catch (error) {
    const statusDiv = document.getElementById('update-status');
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
                {`// Function to update a subscription plan
async function updateSubscriptionPlan(planId, updateData) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
  // Ensure the ID is included in the update data
  const requestData = {
    id: planId,
    ...updateData
  };
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update subscription plan');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating subscription plan:', error);
    throw error;
  }
}

// Example usage with a form
document.getElementById('update-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const planId = document.getElementById('plan-id').value;
  const updateData = {
    name: document.getElementById('plan-name').value,
    price: parseFloat(document.getElementById('plan-price').value),
    api_requests: parseInt(document.getElementById('plan-api-requests').value),
    pdf_uploads: parseInt(document.getElementById('plan-pdf-uploads').value),
    allowed_domains: document.getElementById('plan-allowed-domains').value,
    description: document.getElementById('plan-description').value,
    priority: parseInt(document.getElementById('plan-priority').value)
  };
  
  // Remove any empty/undefined values to avoid overwriting with nulls
  Object.keys(updateData).forEach(key => {
    if (updateData[key] === '' || updateData[key] === undefined || isNaN(updateData[key])) {
      delete updateData[key];
    }
  });
  
  try {
    const statusDiv = document.getElementById('update-status');
    statusDiv.innerHTML = 'Updating plan...';
    statusDiv.className = 'status-pending';
    
    const updatedPlan = await updateSubscriptionPlan(planId, updateData);
    
    statusDiv.innerHTML = \`Plan updated successfully! New price: \${updatedPlan.price}\`;
    statusDiv.className = 'status-success';
    
    // Update the UI with the new plan details
    displayPlanDetails(updatedPlan);
  } catch (error) {
    const statusDiv = document.getElementById('update-status');
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
            <FaExclamationTriangle /> Best Practices
          </div>
          <div className="docs-card-content">
            <p>
              When updating subscription plans, consider these best practices:
            </p>
            <ul className="docs-list">
              <li>
                <strong>Validate Before Updating:</strong> Perform client-side
                validation before sending the update request
              </li>
              <li>
                <strong>Partial Updates:</strong> Only include the fields you
                want to change to minimize data transfer and simplify your code
              </li>
              <li>
                <strong>Consider Active Subscribers:</strong> Be cautious when
                updating plans that have active subscribers
              </li>
              <li>
                <strong>Test in Development:</strong> Always test plan updates
                in a non-production environment first
              </li>
              <li>
                <strong>Backup Current Plan:</strong> Consider storing the
                current plan details before updating in case you need to revert
              </li>
              <li>
                <strong>Update Confirmation:</strong> Implement a confirmation
                step for significant changes like price increases
              </li>
            </ul>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaHistory /> Handling Price Changes
          </div>
          <div className="docs-card-content">
            <p>
              When changing the price of a subscription plan, you may need to
              handle existing subscribers. Here's an example approach:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>Price Change Handler Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to check if a price is changing
async function handlePriceChange(planId, newPrice) {
  // First, get the current plan
  const currentPlan = await getSubscriptionPlan(planId);
  
  // If the price is increasing
  if (newPrice > currentPlan.price) {
    // Ask for confirmation
    const confirmed = confirm(\`You are about to increase the price from \${currentPlan.price} to \${newPrice}. 
This will affect all current subscribers on their next billing cycle.
Continue?\`);
    
    if (!confirmed) {
      return false; // User cancelled
    }
    
    // Log the price change for audit purposes
    logPriceChange(planId, currentPlan.price, newPrice);
    
    // Optionally, notify current subscribers about the upcoming price change
    notifySubscribersOfPriceChange(planId, currentPlan.price, newPrice);
  }
  
  return true; // Proceed with the update
}

// Example usage in the update flow
document.getElementById('update-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const planId = document.getElementById('plan-id').value;
  const newPrice = parseFloat(document.getElementById('plan-price').value);
  
  // Only check for price changes if a new price is provided
  if (!isNaN(newPrice)) {
    const shouldContinue = await handlePriceChange(planId, newPrice);
    if (!shouldContinue) {
      return; // User cancelled the price change
    }
  }
  
  // Continue with the regular update process
  const updateData = {
    // ...other fields...
    price: newPrice
  };
  
  updateSubscriptionPlan(planId, updateData)
    .then(/* ... */)
    .catch(/* ... */);
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to check if a price is changing
async function handlePriceChange(planId, newPrice) {
  // First, get the current plan
  const currentPlan = await getSubscriptionPlan(planId);
  
  // If the price is increasing
  if (newPrice > currentPlan.price) {
    // Ask for confirmation
    const confirmed = confirm(\`You are about to increase the price from \${currentPlan.price} to \${newPrice}. 
This will affect all current subscribers on their next billing cycle.
Continue?\`);
    
    if (!confirmed) {
      return false; // User cancelled
    }
    
    // Log the price change for audit purposes
    logPriceChange(planId, currentPlan.price, newPrice);
    
    // Optionally, notify current subscribers about the upcoming price change
    notifySubscribersOfPriceChange(planId, currentPlan.price, newPrice);
  }
  
  return true; // Proceed with the update
}

// Example usage in the update flow
document.getElementById('update-plan-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const planId = document.getElementById('plan-id').value;
  const newPrice = parseFloat(document.getElementById('plan-price').value);
  
  // Only check for price changes if a new price is provided
  if (!isNaN(newPrice)) {
    const shouldContinue = await handlePriceChange(planId, newPrice);
    if (!shouldContinue) {
      return; // User cancelled the price change
    }
  }
  
  // Continue with the regular update process
  const updateData = {
    // ...other fields...
    price: newPrice
  };
  
  updateSubscriptionPlan(planId, updateData)
    .then(/* ... */)
    .catch(/* ... */);
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-alert docs-alert-info">
          <FaInfoCircle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Related Endpoints</div>
            <p className="docs-alert-message">
              These endpoints are often used in conjunction with the Update
              Subscription Plan endpoint:
            </p>
            <ul className="docs-list">
              <li>
                <code>GET /api/subscription-plans/</code> - List all plans (to
                find the one to update)
              </li>
              <li>
                <code>POST /api/subscription-plans/</code> - Create a new plan
                (as an alternative to updating)
              </li>
              <li>
                <code>POST /api/stripe-payment/</code> - Create a payment
                session for the updated plan
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubscriptionPlan;
