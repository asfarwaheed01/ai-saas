import React, { useState, useEffect, useCallback, useMemo } from "react";
import UserDetailModal from "./UserDetailModal";
import "./Users.css";
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import { FaSpinner } from "react-icons/fa";

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { getAccessToken, logout } = useAuth();

  // API Headers with memoization
  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken]
  );

  // Handle unauthorized errors
  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [statusFilter, setStatusFilter] = useState("Active"); // Active | Inactive
  const [searchInput, setSearchInput] = useState("");
  const [actionMessage, setActionMessage] = useState(null);

  // const fetchUsers = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     // Always fetch page 1 as it contains all data (or backend doesn't support other pages)
  //     const response = await fetch(`${backendURL}/analytics/users/?page=1`, {
  //       method: "GET",
  //       headers: apiHeaders,
  //     });

  //     if (response.status === 401) {
  //       handleUnauthorized();
  //       return;
  //     }

  //     if (!response.ok) {
  //       console.error(
  //         "API Error:",
  //         response.status,
  //         response.statusText,
  //         await response.text()
  //       );
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setUsersData(data);
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //     setError("Failed to load users. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [apiHeaders, handleUnauthorized]);
  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("status", statusFilter);
      if (searchInput.trim()) {
        params.append("search", searchInput.trim());
      }

      const response = await fetch(
        `${backendURL}/analytics/users/?${params.toString()}`,
        {
          method: "GET",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsersData(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized, statusFilter, searchInput]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleReactivate = async (userId) => {
    try {
      const response = await fetch(
        `${backendURL}/users/reactivate/${userId}/`,
        {
          method: "PUT",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to reactivate user");
      }

      setActionMessage("User reactivated successfully!");
      fetchUsers();

      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      console.error(err);
      setActionMessage("Failed to reactivate user");
      setTimeout(() => setActionMessage(null), 3000);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeactivateClick = (e, user) => {
    e.stopPropagation();
    setUserToDeactivate(user);
    setIsConfirmModalOpen(true);
    setErrorMessage(null);
  };

  const confirmDeactivation = async () => {
    if (!userToDeactivate) return;

    try {
      setSuccessMessage(null);
      setErrorMessage(null);
      const response = await fetch(`${backendURL}/users/deactivate/`, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify({ user_id: userToDeactivate.basic_info.id }),
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to deactivate user");
      }

      setSuccessMessage("User deactivated successfully!");
      setIsConfirmModalOpen(false);
      setUserToDeactivate(null);

      // Refresh the list to show updated status
      fetchUsers();

      // Clear message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error deactivating user:", err);
      setErrorMessage(`Error: ${err.message}`);
      setIsConfirmModalOpen(false); // Close modal to show error on main screen or keep open?
      // Let's close it and show error on main screen for now as per plan
    }
  };

  const cancelDeactivation = () => {
    setIsConfirmModalOpen(false);
    setUserToDeactivate(null);
    setErrorMessage(null);
  };

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "-";
    return new Date(dateString).toLocaleDateString();
  };

  const TableCellWithTooltip = ({ content, limit = 20 }) => {
    if (!content || content === "N/A") return "-";
    if (content.length <= limit) return content;
    return (
      <div className="tooltip-container">
        {content.substring(0, limit)}...
        <span className="tooltip-text">{content}</span>
      </div>
    );
  };

  const filteredResults = useMemo(() => {
    if (!usersData?.results) return [];

    if (!searchTerm.trim()) return usersData.results;

    const term = searchTerm.toLowerCase();

    return usersData.results.filter((user) => {
      const username = user.basic_info?.username?.toLowerCase() || "";
      const email = user.basic_info?.email?.toLowerCase() || "";

      return username.includes(term) || email.includes(term);
    });
  }, [usersData, searchTerm]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = usersData?.results?.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );

  // const totalPages = usersData?.results
  //   ? Math.ceil(usersData.results.length / itemsPerPage)
  //   : 0;

  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="users-container">
      <div className="users-flex-stats">
        <div className="users-header-section">
          <h1 className="users-title">User Management</h1>
          <p className="users-subtitle">
            View and manage user details and subscriptions.
          </p>
        </div>
        {usersData && (
          <div className="users-stats">
            <span>
              <strong>Total Users:</strong> {usersData.count}
            </span>
          </div>
        )}
      </div>

      {/* <div className="users-search-container">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset pagination on search
          }}
          className="users-search-input"
        />
      </div> */}
      <div className="users-search-filter">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="users-search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="users-status-dropdown"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="users-table-section">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {isLoading ? (
          <div className="loader-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
        ) : error ? (
          <div className="dashboard-error">
            <p>{error}</p>
            <button onClick={() => fetchUsers(currentPage)}>Retry</button>
          </div>
        ) : (
          <div className="users-table-container">
            {actionMessage && (
              <div className="success-message">{actionMessage}</div>
            )}

            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Joined / Last Login</th>
                  <th>Active Plan</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((user) => (
                  <tr
                    key={user.basic_info.id}
                    onClick={() => handleUserClick(user)}
                  >
                    <td>
                      <TableCellWithTooltip
                        content={user.basic_info.username}
                      />
                    </td>
                    <td>
                      <TableCellWithTooltip content={user.basic_info.email} />
                    </td>
                    <td>
                      {formatDate(user.basic_info.date_joined)} <br />
                      <span className="text-sm text-gray-500">
                        {formatDate(user.basic_info.last_login)}
                      </span>
                    </td>
                    <td>
                      {user.plan_info?.plan_name &&
                      user.plan_info.plan_name !== "N/A"
                        ? user.plan_info.plan_name
                        : "-"}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.plan_info?.status === "active"
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {user.plan_info?.status || "Inactive"}
                      </span>
                    </td>
                    {/* <td>
                      <button
                        className="deactivate-btn"
                        onClick={(e) => handleDeactivateClick(e, user)}
                      >
                        Deactivate
                      </button>
                    </td> */}
                    <td>
                      {statusFilter === "Active" ? (
                        <button
                          className="deactivate-btn"
                          onClick={(e) => handleDeactivateClick(e, user)}
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="activate-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReactivate(user.basic_info.id);
                          }}
                        >
                          Activate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {!isLoading && !error && usersData?.results?.length > 0 && (
          <div className="pagination-container">
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          user={selectedUser}
        />
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="confirm-modal-content">
            <h3 className="confirm-modal-title">Confirm Deactivation</h3>
            <p className="confirm-modal-text">
              Are you sure you want to deactivate user{" "}
              <strong>{userToDeactivate?.basic_info?.username}</strong>? This
              action might restrict their access.
            </p>
            <div className="confirm-modal-actions">
              <button
                className="confirm-btn-cancel"
                onClick={cancelDeactivation}
              >
                Cancel
              </button>
              <button
                className="confirm-btn-confirm"
                onClick={confirmDeactivation}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
