import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiPlus,
  HiTrash,
  HiEye,
  HiEyeOff,
  HiRefresh,
  HiClipboard,
  HiCheck,
  HiKey,
  HiCalendar,
  HiExclamation,
} from "react-icons/hi";
import { backendURL } from "../../config/constants";
import { useAuth } from "../../providers/AuthContext";
import "./ApiKeys.css";
import { HiExclamationTriangle } from "react-icons/hi2";
import AuthPopup from "../../components/AuthPopUp";
import { useLocation } from "react-router-dom";

const Apikeys = () => {
  // State management
  const [apiKeys, setApiKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [copiedKey, setCopiedKey] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false); //new code
  const [activeSubscription, setActiveSubscription] = useState(null);

  const { getAccessToken, logout } = useAuth();
  const location = useLocation();

  // API Headers with memoization
  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken]
  );

  // Clear messages after timeout
  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 5000);
  }, []);

  // Handle unauthorized errors
  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  // Fetch API keys
  const fetchApiKeys = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${backendURL}/users/api-keys/`, {
        method: "GET",
        headers: apiHeaders,
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      //     const data = await response.json();
      //     setApiKeys(Array.isArray(data) ? data : []);
      //   } catch (err) {
      //     console.error("Error fetching API keys:", err);
      //     setError("Failed to load API keys. Please try again.");
      //   } finally {
      //     setIsLoading(false);
      //   }
      // }, [apiHeaders, handleUnauthorized]);
      const data = await response.json();
      const apiKeysArray = data.has_api_key ? [data] : [];
      setApiKeys(apiKeysArray);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      setError("Failed to load API keys. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  // Create API key
  const createApiKey = useCallback(async () => {
    const token = getAccessToken();

    if (!token) {
      setShowAuthPopup(true);
      return;
    }
    try {
      setIsCreating(true);
      setError(null);

      const response = await fetch(`${backendURL}/users/api-keys/`, {
        method: "POST",
        headers: apiHeaders,
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      const newKey = await response.json();
      setApiKeys((prev) => [newKey, ...prev]);
      setSuccess("API key created successfully!");
      clearMessages();

      // Auto-show the newly created key
      setVisibleKeys((prev) => new Set([...prev, newKey.id || newKey.key]));
    } catch (err) {
      console.error("Error creating API key:", err);
      setError(err.message || "Failed to create API key. Please try again.");
      clearMessages();
    } finally {
      setIsCreating(false);
    }
  }, [apiHeaders, handleUnauthorized, clearMessages]);

  // Delete API key
  const deleteApiKey = useCallback(
    async (keyId) => {
      try {
        setIsDeleting(keyId);
        setError(null);

        const response = await fetch(`${backendURL}/users/api-keys/`, {
          method: "DELETE",
          headers: {
            ...apiHeaders,
            "X-API-Key-ID": keyId, // Assuming the API expects the key ID in headers
          },
        });

        if (response.status === 401) {
          handleUnauthorized();
          return;
        }

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            errorData.error ||
              errorData.message ||
              `HTTP error! status: ${response.status}`
          );
        }

        setApiKeys((prev) =>
          prev.filter((key) => (key.id || key.key) !== keyId)
        );
        setShowDeleteModal(null);
        setVisibleKeys((prev) => {
          const newSet = new Set(prev);
          newSet.delete(keyId);
          return newSet;
        });
        setSuccess("API key deleted successfully!");
        await fetchApiKeys(); //new
        clearMessages();
      } catch (err) {
        console.error("Error deleting API key:", err);
        setError(err.message || "Failed to delete API key. Please try again.");
        clearMessages();
      } finally {
        setIsDeleting(null);
      }
    },
    [apiHeaders, handleUnauthorized, clearMessages]
  );

  // Toggle key visibility
  const toggleKeyVisibility = useCallback((keyId) => {
    setVisibleKeys((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  }, []);

  // Copy key to clipboard
  const copyToClipboard = useCallback(
    async (keyValue, keyId) => {
      try {
        await navigator.clipboard.writeText(keyValue);
        setCopiedKey(keyId);
        setTimeout(() => setCopiedKey(null), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
        setError("Failed to copy to clipboard");
        clearMessages();
      }
    },
    [clearMessages]
  );

  // Format date
  const formatDate = useCallback((dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  }, []);

  // Mask API key
  const maskApiKey = useCallback((key) => {
    if (!key) return "";
    if (key.length <= 8) return "*".repeat(key.length);
    return `${key.substring(0, 4)}${"*".repeat(key.length - 8)}${key.substring(
      key.length - 4
    )}`;
  }, []);

  const fetchActiveSubscription = useCallback(async () => {
    try {
      const response = await fetch(
        `${backendURL}/payments/active-subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Active Subscription:", data);
      setActiveSubscription(data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    }
  }, [getAccessToken, handleUnauthorized]);

  useEffect(() => {
    fetchActiveSubscription();
  }, [fetchActiveSubscription]);

  // Initial data fetch
  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  // Loading state
  if (isLoading) {
    return (
      <div className="apikeys-loading">
        <div className="apikeys-spinner"></div>
        <p>Loading API keys...</p>
      </div>
    );
  }

  return (
    <div className="apikeys-container">
      {/* Header */}
      <div className="apikeys-header">
        <div className="apikeys-title-section">
          <h1 className="apikeys-title">API Keys</h1>
          <p className="apikeys-subtitle">
            Manage your API keys for secure access to our services
          </p>
        </div>
        <div className="apikeys-actions">
          <button
            onClick={fetchApiKeys}
            className="apikeys-btn apikeys-btn-secondary"
            disabled={isLoading}
          >
            <HiRefresh />
            Refresh
          </button>
          <button
            onClick={createApiKey}
            className="apikeys-btn apikeys-btn-primary"
            disabled={isCreating}
          >
            {isCreating ? (
              <>
                <div className="apikeys-spinner-small"></div>
                Creating...
              </>
            ) : (
              <>
                <HiPlus />
                Create New Key
              </>
            )}
          </button>
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="apikeys-message apikeys-message-error">
          <HiExclamationTriangle />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="apikeys-message apikeys-message-success">
          <HiCheck />
          <span>{success}</span>
        </div>
      )}

      {/* API Keys Table */}
      <div className="apikeys-content">
        {apiKeys.length === 0 ? (
          <div className="apikeys-empty-state">
            <div className="apikeys-empty-icon">
              <HiKey />
            </div>
            <h3>No API Keys Found</h3>
            <p>
              You haven't created any API keys yet. Create your first API key to
              start using our services.
            </p>
            <button
              onClick={createApiKey}
              className="apikeys-btn apikeys-btn-primary"
              disabled={isCreating}
            >
              <HiPlus />
              Create Your First API Key
            </button>
          </div>
        ) : (
          <div className="apikeys-table-container">
            <table className="apikeys-table">
              <thead>
                <tr>
                  <th>API Key</th>
                  <th>Created At</th>
                  <th>Remaining Days</th>
                  <th>Active Plan</th>
                  <th>Remaining API Requests</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((apiKey) => {
                  const keyId = apiKey.id || apiKey.key || apiKey.api_key;
                  const keyValue = apiKey.key || apiKey.api_key || keyId;
                  const isVisible = visibleKeys.has(keyId);
                  const isCopied = copiedKey === keyId;

                  return (
                    <tr key={keyId} className="apikeys-table-row">
                      <td className="apikeys-key-cell">
                        <div className="apikeys-key-display">
                          <code className="apikeys-key-value">
                            {isVisible ? keyValue : maskApiKey(keyValue)}
                          </code>
                          <div className="apikeys-key-actions">
                            <button
                              onClick={() => toggleKeyVisibility(keyId)}
                              className="apikeys-icon-btn"
                              title={isVisible ? "Hide key" : "Show key"}
                            >
                              {isVisible ? <HiEyeOff /> : <HiEye />}
                            </button>
                            <button
                              onClick={() => copyToClipboard(keyValue, keyId)}
                              className="apikeys-icon-btn"
                              title="Copy to clipboard"
                            >
                              {isCopied ? <HiCheck /> : <HiClipboard />}
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="apikeys-date-cell">
                        <div className="apikeys-date-display">
                          <HiCalendar />
                          <span>{formatDate(apiKey.created_at)}</span>
                        </div>
                      </td>
                      <td className="apikeys-days-display">
                        <div className="">
                          {/* <HiCalendar /> */}
                          <span className="apikeys-days-display">
                            {/* {formatDate(apiKey.last_used_at) || "Never"} */}
                            {activeSubscription?.days_remaining || " "}
                          </span>
                        </div>
                      </td>
                      <td className="apikeys-date-cell">
                        {activeSubscription?.plan?.name || "Free Plan"}
                      </td>
                      <td className="apikeys-days-display">
                        <div className="">
                          {/* <HiCalendar /> */}
                          <span className="">
                            {/* {formatDate(apiKey.last_used_at) || "Never"} */}
                            {activeSubscription?.remaining_api_requests || " "}
                          </span>
                        </div>
                      </td>
                      <td className="apikeys-status-cell">
                        <span className="apikeys-status apikeys-status-active">
                          Active
                        </span>
                      </td>

                      <td className="apikeys-actions-cell">
                        <button
                          onClick={() => setShowDeleteModal(keyId)}
                          className="apikeys-btn apikeys-btn-danger-small"
                          disabled={isDeleting === keyId}
                          title="Delete API key"
                        >
                          {isDeleting === keyId ? (
                            <div className="apikeys-spinner-small"></div>
                          ) : (
                            <HiTrash />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="apikeys-modal-overlay">
          <div className="apikeys-modal">
            <div className="apikeys-modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="apikeys-modal-body">
              <div className="apikeys-warning-icon">
                <HiExclamation />
              </div>
              <p>
                Are you sure you want to delete this API key? This action cannot
                be undone and will immediately revoke access for any
                applications using this key.
              </p>
            </div>
            <div className="apikeys-modal-actions">
              <button
                onClick={() => deleteApiKey(showDeleteModal)}
                disabled={isDeleting === showDeleteModal}
                className="apikeys-btn apikeys-btn-danger"
              >
                {isDeleting === showDeleteModal ? (
                  <>
                    <div className="apikeys-spinner-small"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <HiTrash />
                    Delete Key
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(null)}
                disabled={isDeleting === showDeleteModal}
                className="apikeys-btn apikeys-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          redirectPath={location.pathname}
        />
      )}
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onSuccess={() => {
            setShowAuthPopup(false);
            fetchApiKeys();
          }}
        />
      )} */}
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          redirectPath={location.pathname}
          onSuccess={() => {
            setShowAuthPopup(false);
            fetchApiKeys(); // refresh after successful login
          }}
        />
      )}
    </div>
  );
};

export default Apikeys;
