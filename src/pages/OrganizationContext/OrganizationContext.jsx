import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiPencil,
  HiTrash,
  HiPlus,
  HiSave,
  HiX,
  HiExclamation,
  HiCheckCircle,
  HiInformationCircle,
  HiRefresh,
} from "react-icons/hi";
import { backendURL } from "../../config/constants";
import { useAuth } from "../../providers/AuthContext";
import "./OrganizationalContext.css";
import { HiExclamationTriangle } from "react-icons/hi2";

const OrganizationContext = () => {
  // State management
  const [organizationData, setOrganizationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editText, setEditText] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false); // Track if we're creating new

  const { getAccessToken, logout } = useAuth();

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

  // Fetch organization context
  const fetchOrganizationContext = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${backendURL}/agents/organization-context/`,
        {
          method: "GET",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      // Handle 404 (Not Found) OR empty details as no organization context exists
      if (response.status === 404) {
        setOrganizationData(null);
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("API Response:", data);
      console.log("Details field:", JSON.stringify(data.details));
      console.log(
        "Details empty?",
        !data.details || data.details.trim() === ""
      );

      // Check if details are empty - treat as no context exists
      if (!data.details || data.details.trim() === "") {
        console.log("Setting organizationData to null - no valid details");
        setOrganizationData(null);
      } else {
        console.log("Setting organizationData - has valid details");
        setOrganizationData(data);
      }
    } catch (err) {
      console.error("Error fetching organization context:", err);
      // Only show error for actual errors, not for missing data
      setError("Failed to load organization context. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  // Create organization context (POST)
  const createOrganizationContext = useCallback(
    async (organizationDetails) => {
      try {
        setIsSaving(true);
        setError(null);

        const response = await fetch(
          `${backendURL}/agents/organization-context/`,
          {
            method: "POST",
            headers: apiHeaders,
            body: JSON.stringify({ organization_details: organizationDetails }),
          }
        );

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

        const data = await response.json();
        setOrganizationData(data);
        setIsEditing(false);
        setIsCreatingNew(false);
        setSuccess("Organization context created successfully!");
        clearMessages();

        // Fetch the latest data to ensure we have the complete response
        setTimeout(() => {
          fetchOrganizationContext();
        }, 500);

        return data;
      } catch (err) {
        console.error("Error creating organization context:", err);
        setError(
          err.message ||
            "Failed to create organization context. Please try again."
        );
        clearMessages();
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [apiHeaders, handleUnauthorized, clearMessages]
  );

  // Update organization context (PUT)
  const updateOrganizationContext = useCallback(
    async (organizationDetails) => {
      try {
        setIsSaving(true);
        setError(null);

        const response = await fetch(
          `${backendURL}/agents/organization-context/`,
          {
            method: "PUT",
            headers: apiHeaders,
            body: JSON.stringify({ organization_details: organizationDetails }),
          }
        );

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

        const data = await response.json();
        setOrganizationData(data);
        setIsEditing(false);
        setIsCreatingNew(false);
        setSuccess("Organization context updated successfully!");
        clearMessages();

        // Fetch the latest data to ensure we have the complete response
        setTimeout(() => {
          fetchOrganizationContext();
        }, 500);

        return data;
      } catch (err) {
        console.error("Error updating organization context:", err);
        setError(
          err.message ||
            "Failed to update organization context. Please try again."
        );
        clearMessages();
        throw err;
      } finally {
        setIsSaving(false);
      }
    },
    [apiHeaders, handleUnauthorized, clearMessages]
  );

  // Delete organization context
  const deleteOrganizationContext = useCallback(async () => {
    try {
      setIsDeleting(true);
      setError(null);

      const response = await fetch(
        `${backendURL}/agents/organization-context/`,
        {
          method: "DELETE",
          headers: apiHeaders,
        }
      );

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

      setOrganizationData(null);
      setShowDeleteModal(false);
      setSuccess("Organization context deleted successfully!");
      clearMessages();
    } catch (err) {
      console.error("Error deleting organization context:", err);
      setError(
        err.message ||
          "Failed to delete organization context. Please try again."
      );
      clearMessages();
    } finally {
      setIsDeleting(false);
    }
  }, [apiHeaders, handleUnauthorized, clearMessages]);

  // Handle edit mode (for existing data)
  const handleEdit = useCallback(() => {
    setEditText(organizationData?.details || "");
    setIsEditing(true);
    setIsCreatingNew(false); // We're editing existing data
    setError(null);
  }, [organizationData]);

  // Handle save (ALWAYS use POST when no meaningful data exists)
  const handleSave = useCallback(async () => {
    if (!editText.trim()) {
      setError("Organization details cannot be empty.");
      clearMessages();
      return;
    }

    // Check if we have actual organization details (not just empty details)
    const hasValidDetails =
      organizationData &&
      organizationData.details &&
      organizationData.details.trim() !== "";

    console.log("Save triggered:", {
      hasOrganizationData: !!organizationData,
      hasValidDetails,
      isCreatingNew,
      willUseMethod: !hasValidDetails || isCreatingNew ? "POST" : "PUT",
    });

    try {
      // Use POST if no valid details exist OR explicitly creating new
      if (!hasValidDetails || isCreatingNew) {
        console.log("Using POST - creating new context");
        await createOrganizationContext(editText);
      } else {
        console.log("Using PUT - updating existing context");
        await updateOrganizationContext(editText);
      }
    } catch (err) {
      console.error("Save error:", err);
      // Error handling is done in the API functions
    }
  }, [
    editText,
    organizationData,
    isCreatingNew,
    createOrganizationContext,
    updateOrganizationContext,
    clearMessages,
  ]);

  // Handle cancel edit
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    setIsCreatingNew(false);
    setEditText("");
    setError(null);
  }, []);

  // Handle delete confirmation
  const handleDeleteClick = useCallback(() => {
    setShowDeleteModal(true);
  }, []);

  // Handle create new (for new data)
  const handleCreateNew = useCallback(() => {
    setEditText("");
    setIsEditing(true);
    setIsCreatingNew(true); // We're creating new data
    setError(null);
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchOrganizationContext();
  }, [fetchOrganizationContext]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isEditing && e.ctrlKey && e.key === "s") {
        e.preventDefault();
        handleSave();
      }
      if (isEditing && e.key === "Escape") {
        handleCancelEdit();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [isEditing, handleSave, handleCancelEdit]);

  // Loading state
  if (isLoading) {
    return (
      <div className="organization-loading">
        <div className="organization-spinner"></div>
        <p>Loading organization context...</p>
      </div>
    );
  }

  return (
    <div className="organization-container">
      {/* Debug Info */}

      {/* Header */}
      <div className="organization-header">
        <div className="organization-title-section">
          <h1 className="organization-title">Organization Context</h1>
          <p className="organization-subtitle">
            Manage your organization's details and context information
          </p>
        </div>
        <div className="organization-actions">
          <button
            onClick={fetchOrganizationContext}
            className="organization-btn organization-btn-secondary"
            disabled={isLoading}
          >
            <HiRefresh />
            Refresh
          </button>
          {/* Only show Edit/Delete if data exists with valid details AND not editing */}
          {organizationData &&
            organizationData.details &&
            organizationData.details.trim() !== "" &&
            !isEditing && (
              <>
                <button
                  onClick={handleEdit}
                  className="organization-btn organization-btn-primary"
                >
                  <HiPencil />
                  Edit
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="organization-btn organization-btn-danger"
                >
                  <HiTrash />
                  Delete
                </button>
              </>
            )}
          {/* Only show Create New if NO valid details exist AND not editing */}
          {(!organizationData ||
            !organizationData.details ||
            organizationData.details.trim() === "") &&
            !isEditing && (
              <button
                onClick={handleCreateNew}
                className="organization-btn organization-btn-primary"
              >
                <HiPlus />
                Create New
              </button>
            )}
        </div>
      </div>

      {/* Messages */}
      {error && (
        <div className="organization-message organization-message-error">
          <HiExclamationTriangle />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="organization-message organization-message-success">
          <HiCheckCircle />
          <span>{success}</span>
        </div>
      )}

      {/* Main Content */}
      <div className="organization-content">
        {isEditing ? (
          <div className="organization-edit-section">
            <div className="organization-edit-header">
              <h3>
                {isCreatingNew
                  ? "Create Organization Context"
                  : "Edit Organization Context"}
              </h3>
              <div className="organization-edit-actions">
                <button
                  onClick={handleSave}
                  disabled={isSaving || !editText.trim()}
                  className="organization-btn organization-btn-primary"
                >
                  {isSaving ? (
                    <>
                      <div className="organization-spinner-small"></div>
                      {isCreatingNew ? "Creating..." : "Saving..."}
                    </>
                  ) : (
                    <>
                      <HiSave />
                      {isCreatingNew ? "Create" : "Save"}
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="organization-btn organization-btn-secondary"
                >
                  <HiX />
                  Cancel
                </button>
              </div>
            </div>
            <div className="organization-edit-form">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                placeholder="Enter detailed information about your organization, including its name, mission, services, team size, locations, and any other relevant details..."
                className="organization-textarea"
                disabled={isSaving}
                autoFocus
              />
              <div className="organization-textarea-footer">
                <span className="organization-char-count">
                  {editText.length} characters
                </span>
                <span className="organization-shortcut-hint">
                  Ctrl+S to {isCreatingNew ? "create" : "save"} • Esc to cancel
                </span>
              </div>
            </div>
          </div>
        ) : organizationData &&
          organizationData.details &&
          organizationData.details.trim() !== "" ? (
          <div className="organization-display-section">
            <div className="organization-display-header">
              <h3>Current Organization Context</h3>
              <div className="organization-meta">
                Last updated:{" "}
                {new Date(
                  organizationData.updated_at || Date.now()
                ).toLocaleString()}
              </div>
            </div>
            <div className="organization-display-content">
              <p>{organizationData.details}</p>
            </div>
          </div>
        ) : (
          <div className="organization-empty-state">
            <div className="organization-empty-icon">
              <HiInformationCircle />
            </div>
            <h3>No Organization Context Found</h3>
            <p>
              You haven't set up your organization context yet. Click "Create
              New" to add detailed information about your organization including
              its name, mission, services, and other relevant details.
            </p>
            <button
              onClick={handleCreateNew}
              className="organization-btn organization-btn-primary"
            >
              <HiPlus />
              Create Organization Context
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="organization-modal-overlay">
          <div className="organization-modal">
            <div className="organization-modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="organization-modal-body">
              <p>
                Are you sure you want to delete the organization context? This
                action cannot be undone.
              </p>
            </div>
            <div className="organization-modal-actions">
              <button
                onClick={deleteOrganizationContext}
                disabled={isDeleting}
                className="organization-btn organization-btn-danger"
              >
                {isDeleting ? (
                  <>
                    <div className="organization-spinner-small"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <HiTrash />
                    Delete
                  </>
                )}
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="organization-btn organization-btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizationContext;
