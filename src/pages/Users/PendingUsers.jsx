import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Users.css"; // reuse same styles
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import { FaSpinner } from "react-icons/fa";

const PendingUsers = () => {
  const [usersData, setUsersData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingUserId, setDeletingUserId] = useState(null);

  const { getAccessToken, logout } = useAuth();

  /* ---------------- API HEADERS ---------------- */
  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken]
  );

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const deletePendingUser = async (userId) => {
    try {
      setDeletingUserId(userId);

      const response = await fetch(
        `${backendURL}/users/pending-users/${userId}/`,
        {
          method: "DELETE",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      // ✅ API returns 204 on success
      if (response.status === 204) {
        // remove user from UI without refetch
        setUsersData((prev) => ({
          ...prev,
          count: prev.count - 1,
          results: prev.results.filter((u) => u.id !== userId),
        }));

        alert("User deleted successfully"); // or toast
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  /* ---------------- FETCH PENDING USERS ---------------- */
  // const fetchPendingUsers = useCallback(async () => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);

  //     const response = await fetch(
  //       `${backendURL}/analytics/pending-users/?page=1`,
  //       {
  //         method: "GET",
  //         headers: apiHeaders,
  //       }
  //     );

  //     if (response.status === 401) {
  //       handleUnauthorized();
  //       return;
  //     }

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setUsersData(data);
  //   } catch (err) {
  //     console.error("Error fetching pending users:", err);
  //     setError("Failed to load pending users. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [apiHeaders, handleUnauthorized]);
  const fetchPendingUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      params.append("page", "1");

      if (searchTerm.trim()) {
        params.append("search", searchTerm.trim());
      }

      const response = await fetch(
        `${backendURL}/analytics/pending-users/?${params.toString()}`,
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
        throw new Error("Failed to fetch pending users");
      }

      const data = await response.json();
      setUsersData(data);
    } catch (err) {
      console.error("Error fetching pending users:", err);
      setError("Failed to load pending users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized, searchTerm]);

  useEffect(() => {
    fetchPendingUsers();
  }, [fetchPendingUsers]);

  /* ---------------- HELPERS ---------------- */
  const formatDateTime = (date, time) => {
    if (!date || !time) return "-";
    return `${date} ${time}`;
  };

  const TableCellWithTooltip = ({ content, limit = 20 }) => {
    if (!content) return "-";
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

    return usersData.results.filter(
      (user) =>
        user.username?.toLowerCase().includes(term) ||
        user.email?.toLowerCase().includes(term)
    );
  }, [usersData, searchTerm]);

  /* ---------------- PAGINATION ---------------- */
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  // const currentItems =
  //   usersData?.results?.slice(indexOfFirstItem, indexOfLastItem) || [];

  // const totalPages = usersData
  //   ? Math.ceil(usersData.results.length / itemsPerPage)
  //   : 0;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="users-container">
      <div className="users-flex-stats">
        <div className="users-header-section">
          <h1 className="users-title">Pending Users</h1>
          <p className="users-subtitle">
            Users who have registered but not yet activated.
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
      <div className="users-search-container">
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
        {/* <input
          type="text"
          placeholder="Search by username or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="users-search-input"
        /> */}
      </div>

      <div className="users-table-section">
        {isLoading ? (
          <div className="loader-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          </div>
        ) : error ? (
          <div className="dashboard-error">
            <p>{error}</p>
            <button onClick={fetchPendingUsers}>Retry</button>
          </div>
        ) : (
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Created At</th>
                  <th>Timezone</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems?.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <TableCellWithTooltip content={user.username} />
                    </td>
                    <td>
                      <TableCellWithTooltip content={user.email} />
                    </td>
                    <td>
                      {formatDateTime(user.created_date, user.created_time)}
                    </td>
                    <td>{user.timezone || "-"}</td>
                    <td>
                      <span className="status-badge status-inactive">
                        {user.is_expired ? "Expired" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="delete-btn"
                        disabled={deletingUserId === user.id}
                        onClick={() => {
                          // if (
                          //   window.confirm(
                          //     "Are you sure you want to delete this user?"
                          //   )
                          // ) {
                          deletePendingUser(user.id);
                          // }
                        }}
                      >
                        {deletingUserId === user.id ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
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
    </div>
  );
};

export default PendingUsers;
