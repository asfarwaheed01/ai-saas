import React from "react";
import { FaCreditCard, FaInfoCircle, FaUserCheck } from "react-icons/fa";
import "../index.css";

const GetActiveSubscription = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Get Active Subscription</h1>
        <p className="docs-page-description">
          This endpoint allows you to retrieve the authenticated user's active
          subscription plan name.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method get">GET</span>
            <code className="docs-endpoint-url">/api/active-subscription/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint retrieves the name of the authenticated user's
            currently active subscription plan. If the user doesn't have an
            active subscription, it returns "Free Plan".
          </p>

          <h3 className="docs-subsection-title">Request</h3>
          <p>This endpoint does not require any input parameters.</p>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button
                className="docs-code-copy"
                onClick={() =>
                  copyToClipboard(`curl -X GET \\
  https://api.example.com/api/active-subscription/ \\
  -H "Authorization: Bearer YOUR_API_KEY"`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X GET \\
  https://api.example.com/api/active-subscription/ \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
            </pre>
          </div>

          <h3 className="docs-subsection-title">Response</h3>

          <div className="docs-table">
            <h4 className="docs-response-title">Response Fields</h4>
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
                  <td>plan_name</td>
                  <td>
                    <code>string</code>
                  </td>
                  <td>Name of the active plan, or "Free Plan" if none</td>
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
  "plan_name": "Pro Plan"
}`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`{
  "plan_name": "Pro Plan"
}`}
            </pre>
          </div>

          <div className="docs-alert docs-alert-info">
            <FaInfoCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Default Plan</div>
              <p className="docs-alert-message">
                If the user has no active subscription, the endpoint will return
                "Free Plan" as the plan_name. This can be used to handle free
                tier users.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaUserCheck /> Implementation Example
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaCreditCard /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <div className="docs-code">
              <div className="docs-code-header">
                <span>Get Active Subscription Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to get active subscription
async function getActiveSubscription() {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/active-subscription/';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get subscription info');
    }
    
    const data = await response.json();
    return data.plan_name;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return 'Unknown';
  }
}

// Example usage
async function updateSubscriptionUI() {
  try {
    // Show loading indicator
    document.getElementById('plan-badge').textContent = 'Loading...';
    
    // Get the active plan
    const planName = await getActiveSubscription();
    
    // Update the UI
    const planBadge = document.getElementById('plan-badge');
    planBadge.textContent = planName;
    
    // Apply styling based on plan type
    if (planName === 'Free Plan') {
      planBadge.className = 'badge-free';
      // Show upgrade options
      document.getElementById('upgrade-options').style.display = 'block';
      document.getElementById('plan-management').style.display = 'none';
    } else {
      planBadge.className = 'badge-premium';
      // Show plan management
      document.getElementById('upgrade-options').style.display = 'none';
      document.getElementById('plan-management').style.display = 'block';
    }
  } catch (error) {
    console.error('Error updating UI:', error);
    document.getElementById('plan-badge').textContent = 'Error';
    document.getElementById('plan-badge').className = 'badge-error';
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateSubscriptionUI);`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to get active subscription
async function getActiveSubscription() {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/active-subscription/';
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to get subscription info');
    }
    
    const data = await response.json();
    return data.plan_name;
  } catch (error) {
    console.error('Error checking subscription:', error);
    return 'Unknown';
  }
}

// Example usage
async function updateSubscriptionUI() {
  try {
    // Show loading indicator
    document.getElementById('plan-badge').textContent = 'Loading...';
    
    // Get the active plan
    const planName = await getActiveSubscription();
    
    // Update the UI
    const planBadge = document.getElementById('plan-badge');
    planBadge.textContent = planName;
    
    // Apply styling based on plan type
    if (planName === 'Free Plan') {
      planBadge.className = 'badge-free';
      // Show upgrade options
      document.getElementById('upgrade-options').style.display = 'block';
      document.getElementById('plan-management').style.display = 'none';
    } else {
      planBadge.className = 'badge-premium';
      // Show plan management
      document.getElementById('upgrade-options').style.display = 'none';
      document.getElementById('plan-management').style.display = 'block';
    }
  } catch (error) {
    console.error('Error updating UI:', error);
    document.getElementById('plan-badge').textContent = 'Error';
    document.getElementById('plan-badge').className = 'badge-error';
  }
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateSubscriptionUI);`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-alert docs-alert-info">
          <FaInfoCircle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Common Use Cases</div>
            <p className="docs-alert-message">
              This endpoint is commonly used for:
            </p>
            <ul className="docs-list">
              <li>Displaying the user's current plan in the UI</li>
              <li>
                Determining whether to show upgrade options or plan management
                features
              </li>
              <li>
                Checking subscription status before allowing access to premium
                features
              </li>
              <li>
                Personalizing the user interface based on subscription tier
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetActiveSubscription;
