import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";
import "../index.css";

const CancelSubscription = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Cancel Subscription</h1>
        <p className="docs-page-description">
          This endpoint allows users to cancel their active subscription both in
          your application and on Stripe.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">/api/subscription-cancel/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint cancels the authenticated user's active subscription.
            The cancellation occurs both in your application's database and in
            Stripe's system. The user will retain access to subscription
            benefits until the end of the current billing period.
          </p>

          <h3 className="docs-subsection-title">Request</h3>
          <p>This endpoint does not require any input parameters.</p>

          <div className="docs-code">
            <div className="docs-code-header">
              <span>Example Request</span>
              <button
                className="docs-code-copy"
                onClick={() =>
                  copyToClipboard(`curl -X POST \\
  https://api.example.com/api/subscription-cancel/ \\
  -H "Authorization: Bearer YOUR_API_KEY"`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X POST \\
  https://api.example.com/api/subscription-cancel/ \\
  -H "Authorization: Bearer YOUR_API_KEY"`}
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
                          <td>Cancellation status message</td>
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
  "message": "Subscription cancelled successfully"
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "message": "Subscription cancelled successfully"
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
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        User is not a customer on Stripe or no active
                        subscription
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">404: Not Found</div>
                      <p className="docs-alert-message">
                        No active subscriptions found
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Stripe cancellation failed
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="docs-section">
        <h2 className="docs-section-title">
          <FaTimesCircle /> Implementation Example
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaCheckCircle /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <div className="docs-code">
              <div className="docs-code-header">
                <span>Cancel Subscription Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to cancel subscription
async function cancelSubscription() {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-cancel/';
  
  try {
    // Update UI to show loading state
    const cancelButton = document.getElementById('cancel-subscription-btn');
    cancelButton.disabled = true;
    cancelButton.textContent = 'Cancelling...';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to cancel subscription');
    }
    
    const data = await response.json();
    
    // Show success message
    document.getElementById('status-message').textContent = data.message;
    document.getElementById('status-container').className = 'success';
    document.getElementById('status-container').style.display = 'block';
    
    // Update UI to reflect cancelled subscription
    cancelButton.style.display = 'none';
    document.getElementById('subscription-details').style.display = 'none';
    document.getElementById('resubscribe-container').style.display = 'block';
    
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    
    // Show error message
    document.getElementById('status-message').textContent = \`Error: \${error.message}\`;
    document.getElementById('status-container').className = 'error';
    document.getElementById('status-container').style.display = 'block';
    
    // Reset button
    const cancelButton = document.getElementById('cancel-subscription-btn');
    cancelButton.disabled = false;
    cancelButton.textContent = 'Cancel Subscription';
  }
}

// Add confirmation before cancellation
document.getElementById('cancel-subscription-btn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your current billing period.')) {
    cancelSubscription();
  }
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to cancel subscription
async function cancelSubscription() {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/subscription-cancel/';
  
  try {
    // Update UI to show loading state
    const cancelButton = document.getElementById('cancel-subscription-btn');
    cancelButton.disabled = true;
    cancelButton.textContent = 'Cancelling...';
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to cancel subscription');
    }
    
    const data = await response.json();
    
    // Show success message
    document.getElementById('status-message').textContent = data.message;
    document.getElementById('status-container').className = 'success';
    document.getElementById('status-container').style.display = 'block';
    
    // Update UI to reflect cancelled subscription
    cancelButton.style.display = 'none';
    document.getElementById('subscription-details').style.display = 'none';
    document.getElementById('resubscribe-container').style.display = 'block';
    
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    
    // Show error message
    document.getElementById('status-message').textContent = \`Error: \${error.message}\`;
    document.getElementById('status-container').className = 'error';
    document.getElementById('status-container').style.display = 'block';
    
    // Reset button
    const cancelButton = document.getElementById('cancel-subscription-btn');
    cancelButton.disabled = false;
    cancelButton.textContent = 'Cancel Subscription';
  }
}

// Add confirmation before cancellation
document.getElementById('cancel-subscription-btn').addEventListener('click', function() {
  if (confirm('Are you sure you want to cancel your subscription? You will still have access until the end of your current billing period.')) {
    cancelSubscription();
  }
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
              These endpoints are related to subscription management:
            </p>
            <ul className="docs-list">
              <li>
                <code>/api/active-subscription/</code> - Get the current user's
                active subscription
              </li>
              <li>
                <code>/api/stripe-payment/</code> - Create a new subscription
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelSubscription;
