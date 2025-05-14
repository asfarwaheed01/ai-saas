import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaStripe,
  FaShoppingCart,
  FaExternalLinkAlt,
  FaArrowRight,
} from "react-icons/fa";
import "../index.css";

const CreateStripePaymentSession = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">Create Stripe Payment Session</h1>
        <p className="docs-page-description">
          This endpoint initiates a Stripe checkout session for a subscription
          plan, allowing users to purchase a plan and begin their subscription.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method post">POST</span>
            <code className="docs-endpoint-url">/api/stripe-payment/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaInfoCircle /> Authentication Required
            </span>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint creates a Stripe checkout session for the specified
            subscription plan. It returns a session ID that can be used to
            redirect the user to Stripe's hosted checkout page. Once the payment
            is completed, the user will be redirected back to your application
            based on the success and cancel URLs configured in your Stripe
            dashboard.
          </p>

          <div className="docs-alert docs-alert-info">
            <FaStripe className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Stripe Integration</div>
              <p className="docs-alert-message">
                This endpoint requires a valid Stripe account and proper
                configuration in your backend. Make sure your Stripe webhook
                endpoints are set up to handle successful payments and
                subscription updates.
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
                  <td>sub_plan_id</td>
                  <td>
                    <code>UUID</code>
                  </td>
                  <td>
                    <span className="docs-badge docs-badge-required">
                      Required
                    </span>
                  </td>
                  <td>Subscription plan ID to purchase</td>
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
  https://api.example.com/api/stripe-payment/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sub_plan_id": "uuid-1234..."
  }'`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X POST \\
  https://api.example.com/api/stripe-payment/ \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sub_plan_id": "uuid-1234..."
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
                          <td>Status message</td>
                        </tr>
                        <tr>
                          <td>session_id</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Stripe checkout session ID</td>
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
  "message": "Session created successfully",
  "session_id": "cs_test_..."
}`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`{
  "message": "Session created successfully",
  "session_id": "cs_test_..."
}`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-success">
                    <FaCheckCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Next Steps</div>
                      <p className="docs-alert-message">
                        After receiving the session ID, redirect the user to
                        Stripe's checkout page using the session ID. See the
                        implementation example below for details.
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
                      <div className="docs-alert-title">404: Not Found</div>
                      <p className="docs-alert-message">
                        Product does not exist
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">400: Bad Request</div>
                      <p className="docs-alert-message">
                        User already has an active subscription
                      </p>
                    </div>
                  </div>

                  <div className="docs-alert docs-alert-error">
                    <FaExclamationCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">500: Server Error</div>
                      <p className="docs-alert-message">
                        Stripe error or session creation failed
                      </p>
                    </div>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Error Response Example - Plan Not Found</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Not Found",
  "message": "Product does not exist",
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
  "message": "Product does not exist",
  "status": 404
}`}
                    </pre>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Error Response Example - Active Subscription</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Bad Request",
  "message": "User already has an active subscription",
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
  "message": "User already has an active subscription",
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
          <FaShoppingCart /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaStripe /> JavaScript Implementation
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to implement the Stripe checkout flow
              using JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to create a Stripe session and redirect to checkout
async function initiateStripeCheckout(subscriptionPlanId) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/stripe-payment/';
  
  try {
    // Show loading state
    const buyButton = document.getElementById('buy-now-button');
    const originalText = buyButton.innerHTML;
    buyButton.disabled = true;
    buyButton.innerHTML = 'Processing...';
    
    // Create session
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sub_plan_id: subscriptionPlanId
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }
    
    const data = await response.json();
    
    // Redirect to Stripe Checkout
    // Note: You should have Stripe.js loaded for this to work
    const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
    stripe.redirectToCheckout({
      sessionId: data.session_id
    }).then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, display the localized error message to your customer
      if (result.error) {
        alert(result.error.message);
        buyButton.disabled = false;
        buyButton.innerHTML = originalText;
      }
    });
  } catch (error) {
    console.error('Error initiating checkout:', error);
    alert(\`Checkout error: \${error.message}\`);
    
    // Reset button state
    const buyButton = document.getElementById('buy-now-button');
    if (buyButton) {
      buyButton.disabled = false;
      buyButton.innerHTML = originalText;
    }
  }
}

// Example usage with a "Buy Now" button
document.addEventListener('DOMContentLoaded', function() {
  const buyButtons = document.querySelectorAll('.buy-plan-button');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planId = this.getAttribute('data-plan-id');
      initiateStripeCheckout(planId);
    });
  });
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to create a Stripe session and redirect to checkout
async function initiateStripeCheckout(subscriptionPlanId) {
  const apiKey = 'YOUR_API_KEY';
  const url = 'https://api.example.com/api/stripe-payment/';
  
  try {
    // Show loading state
    const buyButton = document.getElementById('buy-now-button');
    const originalText = buyButton.innerHTML;
    buyButton.disabled = true;
    buyButton.innerHTML = 'Processing...';
    
    // Create session
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sub_plan_id: subscriptionPlanId
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create checkout session');
    }
    
    const data = await response.json();
    
    // Redirect to Stripe Checkout
    // Note: You should have Stripe.js loaded for this to work
    const stripe = Stripe('YOUR_STRIPE_PUBLISHABLE_KEY');
    stripe.redirectToCheckout({
      sessionId: data.session_id
    }).then(function (result) {
      // If redirectToCheckout fails due to a browser or network
      // error, display the localized error message to your customer
      if (result.error) {
        alert(result.error.message);
        buyButton.disabled = false;
        buyButton.innerHTML = originalText;
      }
    });
  } catch (error) {
    console.error('Error initiating checkout:', error);
    alert(\`Checkout error: \${error.message}\`);
    
    // Reset button state
    const buyButton = document.getElementById('buy-now-button');
    if (buyButton) {
      buyButton.disabled = false;
      buyButton.innerHTML = originalText;
    }
  }
}

// Example usage with a "Buy Now" button
document.addEventListener('DOMContentLoaded', function() {
  const buyButtons = document.querySelectorAll('.buy-plan-button');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      const planId = this.getAttribute('data-plan-id');
      initiateStripeCheckout(planId);
    });
  });
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaArrowRight /> HTML Implementation
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to set up the HTML part of the
              subscription selection interface:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>HTML Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`<!-- Subscription Plans Section -->
<section class="subscription-plans">
  <h2>Choose a Subscription Plan</h2>
  
  <div class="plans-container">
    <!-- Basic Plan -->
    <div class="plan-card">
      <div class="plan-header">
        <h3>Basic Plan</h3>
        <p class="plan-price">€19.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>5,000 API Requests</li>
          <li>50 PDF Uploads</li>
          <li>Single Domain Access</li>
          <li>Standard Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" id="buy-now-button" data-plan-id="uuid-basic-plan">
        Buy Now
      </button>
    </div>
    
    <!-- Pro Plan -->
    <div class="plan-card featured">
      <div class="plan-badge">Most Popular</div>
      <div class="plan-header">
        <h3>Pro Plan</h3>
        <p class="plan-price">€49.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>10,000 API Requests</li>
          <li>100 PDF Uploads</li>
          <li>Multiple Domain Access</li>
          <li>Priority Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" data-plan-id="uuid-pro-plan">
        Buy Now
      </button>
    </div>
    
    <!-- Enterprise Plan -->
    <div class="plan-card">
      <div class="plan-header">
        <h3>Enterprise Plan</h3>
        <p class="plan-price">€99.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>30,000 API Requests</li>
          <li>Unlimited PDF Uploads</li>
          <li>All Domain Access</li>
          <li>24/7 Premium Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" data-plan-id="uuid-enterprise-plan">
        Buy Now
      </button>
    </div>
  </div>
  
  <!-- Include Stripe.js -->
  <script src="https://js.stripe.com/v3/"></script>
  <script src="./checkout.js"></script>
</section>`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`<!-- Subscription Plans Section -->
<section class="subscription-plans">
  <h2>Choose a Subscription Plan</h2>
  
  <div class="plans-container">
    <!-- Basic Plan -->
    <div class="plan-card">
      <div class="plan-header">
        <h3>Basic Plan</h3>
        <p class="plan-price">€19.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>5,000 API Requests</li>
          <li>50 PDF Uploads</li>
          <li>Single Domain Access</li>
          <li>Standard Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" id="buy-now-button" data-plan-id="uuid-basic-plan">
        Buy Now
      </button>
    </div>
    
    <!-- Pro Plan -->
    <div class="plan-card featured">
      <div class="plan-badge">Most Popular</div>
      <div class="plan-header">
        <h3>Pro Plan</h3>
        <p class="plan-price">€49.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>10,000 API Requests</li>
          <li>100 PDF Uploads</li>
          <li>Multiple Domain Access</li>
          <li>Priority Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" data-plan-id="uuid-pro-plan">
        Buy Now
      </button>
    </div>
    
    <!-- Enterprise Plan -->
    <div class="plan-card">
      <div class="plan-header">
        <h3>Enterprise Plan</h3>
        <p class="plan-price">€99.99<span>/month</span></p>
      </div>
      
      <div class="plan-features">
        <ul>
          <li>30,000 API Requests</li>
          <li>Unlimited PDF Uploads</li>
          <li>All Domain Access</li>
          <li>24/7 Premium Support</li>
        </ul>
      </div>
      
      <button class="buy-plan-button" data-plan-id="uuid-enterprise-plan">
        Buy Now
      </button>
    </div>
  </div>
  
  <!-- Include Stripe.js -->
  <script src="https://js.stripe.com/v3/"></script>
  <script src="./checkout.js"></script>
</section>`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaExternalLinkAlt /> Handling Success and Cancellation
          </div>
          <div className="docs-card-content">
            <p>
              After the user completes or cancels the checkout process, Stripe
              will redirect them back to your application. Here's how to handle
              these redirects:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>Success and Cancel Page Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// success.js - Handle successful payments
document.addEventListener('DOMContentLoaded', function() {
  // Parse the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (sessionId) {
    // Optionally verify the session status with your backend
    verifyPaymentSession(sessionId)
      .then(paymentStatus => {
        if (paymentStatus.success) {
          // Update UI to show success message
          document.getElementById('payment-status').innerText = 'Payment successful!';
          document.getElementById('plan-details').innerText = \`Your \${paymentStatus.planName} is now active.\`;
          
          // You might want to update the user's UI to reflect their new subscription
          updateUserInterface(paymentStatus.subscriptionData);
        } else {
          // Handle verification failure
          document.getElementById('payment-status').innerText = 'Payment verification failed.';
          document.getElementById('error-details').innerText = paymentStatus.message;
          document.getElementById('error-container').style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error verifying payment:', error);
        document.getElementById('payment-status').innerText = 'Payment verification error.';
        document.getElementById('error-details').innerText = error.message;
        document.getElementById('error-container').style.display = 'block';
      });
  } else {
    // No session ID found in the URL
    document.getElementById('payment-status').innerText = 'No payment information found.';
    document.getElementById('error-container').style.display = 'block';
  }
});

// cancel.js - Handle cancelled payments
document.addEventListener('DOMContentLoaded', function() {
  // You might want to provide feedback or options for the user
  document.getElementById('retry-button').addEventListener('click', function() {
    // Redirect back to the subscription selection page
    window.location.href = '/subscription-plans';
  });
});

// Helper function to verify payment with your backend
async function verifyPaymentSession(sessionId) {
  const apiKey = 'YOUR_API_KEY';
  const url = \`https://api.example.com/api/verify-payment/\${sessionId}\`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// success.js - Handle successful payments
document.addEventListener('DOMContentLoaded', function() {
  // Parse the URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('session_id');
  
  if (sessionId) {
    // Optionally verify the session status with your backend
    verifyPaymentSession(sessionId)
      .then(paymentStatus => {
        if (paymentStatus.success) {
          // Update UI to show success message
          document.getElementById('payment-status').innerText = 'Payment successful!';
          document.getElementById('plan-details').innerText = \`Your \${paymentStatus.planName} is now active.\`;
          
          // You might want to update the user's UI to reflect their new subscription
          updateUserInterface(paymentStatus.subscriptionData);
        } else {
          // Handle verification failure
          document.getElementById('payment-status').innerText = 'Payment verification failed.';
          document.getElementById('error-details').innerText = paymentStatus.message;
          document.getElementById('error-container').style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error verifying payment:', error);
        document.getElementById('payment-status').innerText = 'Payment verification error.';
        document.getElementById('error-details').innerText = error.message;
        document.getElementById('error-container').style.display = 'block';
      });
  } else {
    // No session ID found in the URL
    document.getElementById('payment-status').innerText = 'No payment information found.';
    document.getElementById('error-container').style.display = 'block';
  }
});

// cancel.js - Handle cancelled payments
document.addEventListener('DOMContentLoaded', function() {
  // You might want to provide feedback or options for the user
  document.getElementById('retry-button').addEventListener('click', function() {
    // Redirect back to the subscription selection page
    window.location.href = '/subscription-plans';
  });
});

// Helper function to verify payment with your backend
async function verifyPaymentSession(sessionId) {
  const apiKey = 'YOUR_API_KEY';
  const url = \`https://api.example.com/api/verify-payment/\${sessionId}\`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
}`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-alert docs-alert-info">
          <FaInfoCircle className="docs-alert-icon" />
          <div className="docs-alert-content">
            <div className="docs-alert-title">Stripe Configuration</div>
            <p className="docs-alert-message">
              For this integration to work properly, you need to configure the
              following in your Stripe dashboard:
            </p>
            <ul className="docs-list">
              <li>
                Create subscription products and price points that match your
                application's plans
              </li>
              <li>Set up success and cancel URLs for checkout sessions</li>
              <li>
                Configure webhooks to notify your backend of successful payments
                and subscription status changes
              </li>
              <li>
                Ensure your backend properly maps your application's
                subscription plans to Stripe product IDs
              </li>
            </ul>
            <p>
              For more information, visit the{" "}
              <a
                href="https://stripe.com/docs/payments/checkout"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe Checkout documentation
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateStripePaymentSession;
