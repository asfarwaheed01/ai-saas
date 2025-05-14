import React, { useState } from "react";
import {
  FaCreditCard,
  FaExclamationCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaListAlt,
  FaTable,
  FaFilter,
  FaSortAmountDown,
} from "react-icons/fa";
import "../index.css";

const ListSubscriptionPlans = () => {
  const [showResponse, setShowResponse] = useState(true);
  const [showError, setShowError] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // In a real app, you would show a toast or notification here
  };

  return (
    <div className="docs-page">
      <div className="docs-page-header">
        <h1 className="docs-page-title">List Subscription Plans</h1>
        <p className="docs-page-description">
          This endpoint allows admin users to retrieve a list of all available
          subscription plans. Use this to view and manage the plans available to
          your users.
        </p>
      </div>

      <div className="docs-section">
        <div className="docs-endpoint">
          <div className="docs-endpoint-header">
            <span className="docs-endpoint-method get">GET</span>
            <code className="docs-endpoint-url">/api/subscription-plans/</code>
          </div>

          <div className="docs-endpoint-meta">
            <span className="docs-endpoint-auth">
              <FaShieldAlt /> Authentication Required (admin only)
            </span>
          </div>

          <div className="docs-alert docs-alert-warning">
            <FaExclamationCircle className="docs-alert-icon" />
            <div className="docs-alert-content">
              <div className="docs-alert-title">Admin Privileges Required</div>
              <p className="docs-alert-message">
                This endpoint is restricted to admin users only. Regular users
                cannot access the list of subscription plans.
              </p>
            </div>
          </div>

          <h3 className="docs-subsection-title">Description</h3>
          <p className="docs-endpoint-description">
            This endpoint retrieves all available subscription plans from the
            system. It returns an array of plan objects, each containing details
            such as name, price, allowed API requests, and other configuration
            options. This is useful for admin dashboards to display and manage
            available plans.
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
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"`)
                }
              >
                Copy
              </button>
            </div>
            <pre>
              {`curl -X GET \\
  https://api.example.com/api/subscription-plans/ \\
  -H "Authorization: Bearer YOUR_ADMIN_API_KEY"`}
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
                    The endpoint returns an array of subscription plan objects.
                    Each plan object contains the following fields:
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
                          <td>name</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Name of the plan</td>
                        </tr>
                        <tr>
                          <td>api_requests</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of API requests allowed</td>
                        </tr>
                        <tr>
                          <td>price</td>
                          <td>
                            <code>float</code>
                          </td>
                          <td>Price of the plan</td>
                        </tr>
                        <tr>
                          <td>pdf_uploads</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>Number of PDF uploads allowed</td>
                        </tr>
                        <tr>
                          <td>allowed_domains</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Comma-separated list of allowed domains</td>
                        </tr>
                        <tr>
                          <td>description</td>
                          <td>
                            <code>string</code>
                          </td>
                          <td>Description of the plan</td>
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
                          <td>priority</td>
                          <td>
                            <code>int</code>
                          </td>
                          <td>
                            Priority for ordering plans (lower numbers displayed
                            first)
                          </td>
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
                          copyToClipboard(`[
  {
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
  }
]`)
                        }
                      >
                        Copy
                      </button>
                    </div>
                    <pre>
                      {`[
  {
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
  }
]`}
                    </pre>
                  </div>

                  <div className="docs-alert docs-alert-info">
                    <FaInfoCircle className="docs-alert-icon" />
                    <div className="docs-alert-content">
                      <div className="docs-alert-title">Plan Ordering</div>
                      <p className="docs-alert-message">
                        The plans are returned in order of their priority field
                        (ascending). This means plans with lower priority values
                        will be listed first, allowing you to control the
                        display order in your UI.
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
                        Only admin users can access the list
                      </p>
                    </div>
                  </div>

                  <div className="docs-code">
                    <div className="docs-code-header">
                      <span>Error Response Example</span>
                      <button
                        className="docs-code-copy"
                        onClick={() =>
                          copyToClipboard(`{
  "error": "Forbidden",
  "message": "Only admin users can access the list",
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
  "message": "Only admin users can access the list",
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
          <FaListAlt /> Implementation Examples
        </h2>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaTable /> JavaScript Example
          </div>
          <div className="docs-card-content">
            <p>
              Here's an example of how to fetch and display subscription plans
              using JavaScript:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>JavaScript Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to fetch subscription plans
async function getSubscriptionPlans() {
  const apiKey = 'YOUR_ADMIN_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
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
      throw new Error(errorData.message || 'Failed to fetch subscription plans');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
}

// Function to render plans in an HTML table
function renderPlansTable(plans) {
  const tableBody = document.getElementById('plans-table-body');
  tableBody.innerHTML = '';
  
  plans.forEach(plan => {
    const row = document.createElement('tr');
    
    row.innerHTML = \`
      <td>\${plan.name}</td>
      <td>\${plan.price.toFixed(2)}</td>
      <td>\${plan.api_requests.toLocaleString()}</td>
      <td>\${plan.pdf_uploads.toLocaleString()}</td>
      <td>\${plan.allowed_domains || 'All'}</td>
      <td>
        <button class="edit-btn" data-id="\${plan.id}">Edit</button>
        <button class="delete-btn" data-id="\${plan.id}">Delete</button>
      </td>
    \`;
    
    tableBody.appendChild(row);
  });
  
  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const planId = e.target.getAttribute('data-id');
      openEditPlanModal(planId);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const planId = e.target.getAttribute('data-id');
      confirmDeletePlan(planId);
    });
  });
}

// Initialize the admin dashboard
async function initializeAdminDashboard() {
  try {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    
    const plans = await getSubscriptionPlans();
    renderPlansTable(plans);
    
    loadingIndicator.style.display = 'none';
  } catch (error) {
    document.getElementById('error-message').textContent = \`Error: \${error.message}\`;
    document.getElementById('error-container').style.display = 'block';
    loadingIndicator.style.display = 'none';
  }
}

// Call the initialization function when the page loads
window.addEventListener('DOMContentLoaded', initializeAdminDashboard);`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to fetch subscription plans
async function getSubscriptionPlans() {
  const apiKey = 'YOUR_ADMIN_API_KEY';
  const url = 'https://api.example.com/api/subscription-plans/';
  
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
      throw new Error(errorData.message || 'Failed to fetch subscription plans');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    throw error;
  }
}

// Function to render plans in an HTML table
function renderPlansTable(plans) {
  const tableBody = document.getElementById('plans-table-body');
  tableBody.innerHTML = '';
  
  plans.forEach(plan => {
    const row = document.createElement('tr');
    
    row.innerHTML = \`
      <td>\${plan.name}</td>
      <td>\${plan.price.toFixed(2)}</td>
      <td>\${plan.api_requests.toLocaleString()}</td>
      <td>\${plan.pdf_uploads.toLocaleString()}</td>
      <td>\${plan.allowed_domains || 'All'}</td>
      <td>
        <button class="edit-btn" data-id="\${plan.id}">Edit</button>
        <button class="delete-btn" data-id="\${plan.id}">Delete</button>
      </td>
    \`;
    
    tableBody.appendChild(row);
  });
  
  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const planId = e.target.getAttribute('data-id');
      openEditPlanModal(planId);
    });
  });
  
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const planId = e.target.getAttribute('data-id');
      confirmDeletePlan(planId);
    });
  });
}

// Initialize the admin dashboard
async function initializeAdminDashboard() {
  try {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block';
    
    const plans = await getSubscriptionPlans();
    renderPlansTable(plans);
    
    loadingIndicator.style.display = 'none';
  } catch (error) {
    document.getElementById('error-message').textContent = \`Error: \${error.message}\`;
    document.getElementById('error-container').style.display = 'block';
    loadingIndicator.style.display = 'none';
  }
}

// Call the initialization function when the page loads
window.addEventListener('DOMContentLoaded', initializeAdminDashboard);`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaFilter /> Using the API for Filtering
          </div>
          <div className="docs-card-content">
            <p>
              While the endpoint doesn't directly support filtering, you can
              implement client-side filtering to help admins find specific
              plans:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>Client-Side Filtering Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to filter plans based on search input
function filterPlans(plans, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  
  return plans.filter(plan => {
    // Match on name, description, or allowed domains
    return (
      plan.name.toLowerCase().includes(searchTerm) ||
      (plan.description && plan.description.toLowerCase().includes(searchTerm)) ||
      (plan.allowed_domains && plan.allowed_domains.toLowerCase().includes(searchTerm))
    );
  });
}

// Function to filter plans based on price range
function filterPlansByPrice(plans, minPrice, maxPrice) {
  return plans.filter(plan => {
    return (
      (!minPrice || plan.price >= minPrice) &&
      (!maxPrice || plan.price <= maxPrice)
    );
  });
}

// Example usage
const searchInput = document.getElementById('search-plans');
let allPlans = []; // Store all plans from API

// Initial data fetch
getSubscriptionPlans().then(plans => {
  allPlans = plans;
  renderPlansTable(plans);
});

// Handle search input
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const filteredPlans = filterPlans(allPlans, searchTerm);
  renderPlansTable(filteredPlans);
});

// Handle price range filtering
document.getElementById('filter-by-price').addEventListener('click', () => {
  const minPrice = parseFloat(document.getElementById('min-price').value) || null;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || null;
  
  const filteredPlans = filterPlansByPrice(allPlans, minPrice, maxPrice);
  renderPlansTable(filteredPlans);
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to filter plans based on search input
function filterPlans(plans, searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  
  return plans.filter(plan => {
    // Match on name, description, or allowed domains
    return (
      plan.name.toLowerCase().includes(searchTerm) ||
      (plan.description && plan.description.toLowerCase().includes(searchTerm)) ||
      (plan.allowed_domains && plan.allowed_domains.toLowerCase().includes(searchTerm))
    );
  });
}

// Function to filter plans based on price range
function filterPlansByPrice(plans, minPrice, maxPrice) {
  return plans.filter(plan => {
    return (
      (!minPrice || plan.price >= minPrice) &&
      (!maxPrice || plan.price <= maxPrice)
    );
  });
}

// Example usage
const searchInput = document.getElementById('search-plans');
let allPlans = []; // Store all plans from API

// Initial data fetch
getSubscriptionPlans().then(plans => {
  allPlans = plans;
  renderPlansTable(plans);
});

// Handle search input
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const filteredPlans = filterPlans(allPlans, searchTerm);
  renderPlansTable(filteredPlans);
});

// Handle price range filtering
document.getElementById('filter-by-price').addEventListener('click', () => {
  const minPrice = parseFloat(document.getElementById('min-price').value) || null;
  const maxPrice = parseFloat(document.getElementById('max-price').value) || null;
  
  const filteredPlans = filterPlansByPrice(allPlans, minPrice, maxPrice);
  renderPlansTable(filteredPlans);
});`}
              </pre>
            </div>
          </div>
        </div>

        <div className="docs-card">
          <div className="docs-card-title">
            <FaSortAmountDown /> Sorting Plans
          </div>
          <div className="docs-card-content">
            <p>
              While plans are already sorted by priority, you might want to
              implement additional sorting options for your admin interface:
            </p>

            <div className="docs-code">
              <div className="docs-code-header">
                <span>Sorting Function Example</span>
                <button
                  className="docs-code-copy"
                  onClick={() =>
                    copyToClipboard(`// Function to sort plans by different fields
function sortPlans(plans, sortField, sortDirection = 'asc') {
  return [...plans].sort((a, b) => {
    // Handle special case for numeric fields
    if (['price', 'api_requests', 'pdf_uploads', 'priority'].includes(sortField)) {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
    // Default string comparison for other fields
    const valueA = a[sortField]?.toString().toLowerCase() || '';
    const valueB = b[sortField]?.toString().toLowerCase() || '';
    
    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}

// Example usage with table headers
document.querySelectorAll('.sortable-header').forEach(header => {
  header.addEventListener('click', () => {
    const sortField = header.getAttribute('data-sort');
    const currentDirection = header.getAttribute('data-direction') || 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    
    // Update sort indicators in UI
    document.querySelectorAll('.sortable-header').forEach(h => {
      h.setAttribute('data-direction', '');
      h.querySelector('.sort-indicator')?.remove();
    });
    
    header.setAttribute('data-direction', newDirection);
    
    // Add sort indicator
    const indicator = document.createElement('span');
    indicator.className = 'sort-indicator';
    indicator.innerHTML = newDirection === 'asc' ? ' ↑' : ' ↓';
    header.appendChild(indicator);
    
    // Sort and render
    const sortedPlans = sortPlans(allPlans, sortField, newDirection);
    renderPlansTable(sortedPlans);
  });
});`)
                  }
                >
                  Copy
                </button>
              </div>
              <pre>
                {`// Function to sort plans by different fields
function sortPlans(plans, sortField, sortDirection = 'asc') {
  return [...plans].sort((a, b) => {
    // Handle special case for numeric fields
    if (['price', 'api_requests', 'pdf_uploads', 'priority'].includes(sortField)) {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField]
        : b[sortField] - a[sortField];
    }
    
    // Default string comparison for other fields
    const valueA = a[sortField]?.toString().toLowerCase() || '';
    const valueB = b[sortField]?.toString().toLowerCase() || '';
    
    if (sortDirection === 'asc') {
      return valueA.localeCompare(valueB);
    } else {
      return valueB.localeCompare(valueA);
    }
  });
}

// Example usage with table headers
document.querySelectorAll('.sortable-header').forEach(header => {
  header.addEventListener('click', () => {
    const sortField = header.getAttribute('data-sort');
    const currentDirection = header.getAttribute('data-direction') || 'asc';
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    
    // Update sort indicators in UI
    document.querySelectorAll('.sortable-header').forEach(h => {
      h.setAttribute('data-direction', '');
      h.querySelector('.sort-indicator')?.remove();
    });
    
    header.setAttribute('data-direction', newDirection);
    
    // Add sort indicator
    const indicator = document.createElement('span');
    indicator.className = 'sort-indicator';
    indicator.innerHTML = newDirection === 'asc' ? ' ↑' : ' ↓';
    header.appendChild(indicator);
    
    // Sort and render
    const sortedPlans = sortPlans(allPlans, sortField, newDirection);
    renderPlansTable(sortedPlans);
  });
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
              After fetching the list of plans, you can use the following
              related endpoints for plan management:
            </p>
            <ul className="docs-list">
              <li>
                <code>POST /api/subscription-plans/</code> - Create a new
                subscription plan
              </li>
              <li>
                <code>PUT /api/subscription-plans/</code> - Update an existing
                subscription plan
              </li>
              <li>
                <code>GET /api/active-subscription/</code> - Get the active
                subscription for the current user
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSubscriptionPlans;
