import React, { useCallback, useEffect, useMemo, useState } from "react";

import "./Dashboard.css";
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import {
  FaChartLine,
  FaGlobe,
  FaLanguage,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";
import { MdDataUsage } from "react-icons/md";

const Dashboard = () => {
  const { getAccessToken, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [avatarInteraction, setAvatarInteraction] = useState(null);
  const [docData, setdocData] = useState(null);

  const data = avatarInteraction?.api_usage_stats?.usage_by_plan || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

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

  const dashboardAnalytics = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${backendURL}/analytics/dashboard/`, {
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
      const data = await response.json();
      setDashboardData(data);
    } catch (err) {
      console.error("Error fetching API keys:", err);
      setError("Failed to load API keys. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  useEffect(() => {
    dashboardAnalytics();
  }, [dashboardAnalytics]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${backendURL}/analytics/revenue`, {
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

      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [backendURL, apiHeaders, handleUnauthorized]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const avatarInteractionData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${backendURL}/analytics/usage`, {
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

      const data = await response.json();
      setAvatarInteraction(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [backendURL, apiHeaders, handleUnauthorized]);

  useEffect(() => {
    avatarInteractionData();
  }, [avatarInteractionData]);

  const docsData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${backendURL}/analytics/knowledge-base`, {
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

      const data = await response.json();
      setdocData(data);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [backendURL, apiHeaders, handleUnauthorized]);

  useEffect(() => {
    docsData();
  }, [docsData]);

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-content">
        <h3 className="dashboard-stat-value">{value}</h3>
        <p className="dashboard-stat-title">{title}</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header-section">
        <h1 className="dashboard-title">Analytics Dashboard</h1>
        <p className="dashboard-subtitle">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      <div className="dashboard-stats-grid">
        <StatCard
          title="Total Revenue"
          value={
            isLoading ? (
              <FaSpinner className="animate-spin text-blue-500 text-lg" />
            ) : dashboardData ? (
              `$${dashboardData.total_revenue?.toLocaleString()}`
            ) : (
              "—"
            )
          }
        />
        <StatCard
          title="Active Subscriptions"
          value={
            isLoading ? (
              <FaSpinner className="animate-spin text-blue-500 text-lg" />
            ) : dashboardData ? (
              dashboardData.active_subscriptions?.toLocaleString()
            ) : (
              "—"
            )
          }
        />
        <StatCard
          title="Avatar Interactions"
          value={
            isLoading ? (
              <FaSpinner className="animate-spin text-blue-500 text-lg" />
            ) : dashboardData ? (
              dashboardData.total_avatar_interactions?.toLocaleString()
            ) : (
              "—"
            )
          }
        />
        <StatCard
          title="Knowledge Base Docs"
          value={
            isLoading ? (
              <FaSpinner className="animate-spin text-blue-500 text-lg" />
            ) : dashboardData ? (
              dashboardData.total_knowledge_base_docs?.toLocaleString()
            ) : (
              "—"
            )
          }
        />
      </div>

      <div className="dashboard-sections">
        <div className="dashboard-section">
          <h2>💰 Revenue by Plan</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Revenue ($)</th>
                  <th>Subscribers</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData?.revenue_by_plan?.map((plan, i) => (
                  <tr key={i}>
                    <td>{plan.plan__name}</td>
                    <td>${plan.revenue.toLocaleString()}</td>
                    <td>{plan.count}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={3}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>📊 Plan Distribution</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                {analyticsData?.plan_distribution?.map((plan, i) => (
                  <tr key={i}>
                    <td>{plan.plan__name}</td>
                    <td>{plan.count}</td>
                  </tr>
                )) || (
                  <tr>
                    <td colSpan={2}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* ===== Users Near Limit ===== */}
      <div className="dashboard-section">
        <h2>⚠️ Users Near Limit</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Plan Name</th>
                <th>Usage (%)</th>
                <th>Remaining Requests</th>
              </tr>
            </thead>
            <tbody>
              {avatarInteraction?.api_usage_stats?.users_near_limit?.length ? (
                avatarInteraction.api_usage_stats.users_near_limit.map(
                  (user, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor:
                          user.usage_percentage > 80 ? "#ecfbffff" : "inherit",
                      }}
                    >
                      <td>{user.user_id}</td>
                      <td>{user.username}</td>
                      <td>{user.plan_name}</td>
                      <td>{user.usage_percentage}%</td>
                      <td>{user.remaining_requests}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={5}>No users near limit</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* ===== Language Usage Stats ===== */}
      <div className="dashboard-section">
        <h2 className="section-heading">🌍 Language Usage Insights</h2>

        {isLoading ? (
          <div className="loader-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
            <p className="text-gray-400 mt-2">Loading insights...</p>
          </div>
        ) : (
          <div className="interactive-language-grid">
            {avatarInteraction?.language_usage?.map((lang, index) => (
              <div key={index} className="interactive-card">
                <div className="card-top">
                  <div className="lang-icon">
                    <FaLanguage />
                  </div>
                  <h3>{lang.lang.toUpperCase()}</h3>
                  <span className="usage-badge">
                    Last 30 days Usage: {lang.recent_usage}
                  </span>
                </div>

                <div className="circle-progress">
                  <div
                    className="progress-ring"
                    style={{
                      background: `conic-gradient(#05AAB6 ${Math.min(
                        lang.avg_length * 10,
                        100
                      )}%, #e5e7eb 0%)`,
                    }}
                  ></div>
                  <div className="progress-inner">
                    <span>{lang.avg_length.toFixed(1)}</span>
                    <p className="progress-inner-color">Avg len</p>
                  </div>
                </div>

                <div className="metrics-row">
                  <div className="metric">
                    <FaChartLine />
                    <p>{lang.count.toLocaleString()}</p>
                    <small>Interactions</small>
                  </div>
                  <div className="metric">
                    <FaUsers />
                    <p>{lang.unique_users.toLocaleString()}</p>
                    <small>Users</small>
                  </div>
                  <div className="metric">
                    <FaGlobe />
                    <p>{lang.unique_domains.toLocaleString()}</p>
                    <small>Domains</small>
                  </div>
                </div>

                <div className="top-domains">
                  <strong>Top Domains</strong>
                  <ul>
                    {lang.top_domains.slice(0, 3).map((d, i) => (
                      <li key={i}>
                        <span>{d.domain}</span>
                        <span>{d.domain_count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===== Usage PLan By Plans===== */}
      <div className="dashboard-section">
        <h2>
          {" "}
          <MdDataUsage color="#05b1d1" />
          Active Subscriptions Usage By Plans
        </h2>
        <div className="cards-row">
          <div className="card-box">
            <h4>Active Subscriptions</h4>
            <p>
              {avatarInteraction?.api_usage_stats?.total_active_subscriptions ||
                0}
            </p>
          </div>
          <div className="card-box">
            <h4>Total Allowed</h4>
            <p>
              {avatarInteraction?.api_usage_stats?.total_allowed?.toLocaleString() ||
                0}
            </p>
          </div>

          <div className="card-box">
            <h4>Used</h4>
            <p>
              {avatarInteraction?.api_usage_stats?.used?.toLocaleString() || 0}
            </p>
          </div>

          <div className="card-box">
            <h4>Remaining</h4>
            <p>
              {avatarInteraction?.api_usage_stats?.remaining?.toLocaleString() ||
                0}
            </p>
          </div>

          <div className="card-box">
            <h4>Usage %</h4>
            <p>
              {avatarInteraction?.api_usage_stats?.usage_percentage?.toFixed(
                2
              ) || 0}
              %
            </p>
          </div>
        </div>
        {/* <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Total Allowed</th>
                <th>Used</th>
                <th>Remaining Requests</th>
                <th>Usage (%)</th>
              </tr>
            </thead>
            <tbody>
              {avatarInteraction?.api_usage_stats?.usage_by_plan?.length ? (
                avatarInteraction.api_usage_stats.usage_by_plan.map(
                  (user, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor:
                          user.usage_percentage > 80 ? "#ecfbffff" : "inherit",
                      }}
                    >
                      <td>{user.plan_name}</td>
                      <td>{user.total_allowed}</td>
                      <td>{user.used}</td>
                      <td>{user.remaining}</td>
                      <td>{user.usage_percentage}%</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={5}>No users near limit</td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Total Allowed</th>
                <th>Used</th>
                <th>Remaining Requests</th>
                <th>Usage (%)</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((user, i) => (
                  <tr
                    key={i}
                    style={{
                      backgroundColor:
                        user.usage_percentage > 80 ? "#ecfbffff" : "inherit",
                    }}
                  >
                    <td>{user.plan_name}</td>
                    <td>{user.total_allowed}</td>
                    <td>{user.used}</td>
                    <td>{user.remaining}</td>
                    <td>{user.usage_percentage}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No users near limit</td>
                </tr>
              )}
            </tbody>
          </table>

          {data.length > itemsPerPage && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Knowledge Base Analytics ===== */}
      <div className="dashboard-section">
        <h2 className="section-heading">🧠 Knowledge Base Analytics</h2>

        {isLoading ? (
          <div className="loader-center">
            <FaSpinner className="animate-spin text-blue-500 text-3xl" />
            <p className="text-gray-400 mt-2">Analyzing document stats...</p>
          </div>
        ) : docData ? (
          <div className="knowledge-base-grid">
            {/* Summary Cards */}
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Documents</h3>
                <p className="summary-value">{docData.total_documents}</p>
              </div>
              <div className="summary-card">
                <h3>Success Rate</h3>
                <p className="summary-value">
                  {docData.processing_success_rate.success_rate}%
                </p>
              </div>
              <div className="summary-card">
                <h3>Total Storage Used</h3>
                <p className="summary-value">
                  {docData.storage_usage.total_mb.toFixed(2)} MB
                </p>
              </div>
            </div>

            {/* Domain-wise Analytics */}

            <div className="domain-cards-display">
              <div class Name="domain-section">
                <h3>📁 Documents by Domain</h3>
                <div className="domain-list">
                  {docData.documents_by_domain.map((d, i) => (
                    <div key={i} className="domain-card">
                      <div className="domain-header">
                        <span className="domain-name">{d.domain}</span>
                        <span className="domain-count">{d.count} files</span>
                      </div>

                      <div className="domain-bar-container">
                        <div
                          className="domain-progress"
                          style={{
                            width: `${d.processing_success_rate}%`,
                            background:
                              d.processing_success_rate >= 90
                                ? "#05b1bd"
                                : "#f59e0b",
                          }}
                        ></div>
                      </div>

                      <div className="domain-stats">
                        <p>
                          <strong>Users:</strong> {d.unique_users}
                        </p>
                        <p>
                          <strong>Processed:</strong> {d.processed_count}
                        </p>
                        <p>
                          <strong>Avg Size:</strong> {d.avg_size_mb.toFixed(2)}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="filetype-section">
                <h3>📄 File Type Distribution</h3>
                <div className="filetype-grid">
                  {docData.file_type_distribution.map((f, i) => (
                    <div key={i} className="filetype-card">
                      <div className="filetype-header">
                        {/* <div className="filetype-icon">📑</div> */}
                        <span className="filetype-name">
                          {f.file_type.toUpperCase()}
                        </span>
                        <span className="filetype-count">{f.count} files</span>
                      </div>

                      <div className="filetype-body">
                        <div className="filetype-progress">
                          <div
                            className="filetype-progress-inner"
                            style={{
                              width: `${f.processing_success_rate}%`,
                              backgroundColor:
                                f.processing_success_rate > 95
                                  ? "#05b1bd"
                                  : "#f59e0b",
                            }}
                          ></div>
                        </div>
                        <span className="filetype-rate">
                          {f.processing_success_rate.toFixed(1)}% success
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="storage-section">
                <h3>💾 Storage Overview</h3>
                <div className="storage-grid">
                  {docData.storage_usage.storage_by_file_type.map((s, i) => {
                    const percent =
                      (s.total_size_mb / docData.storage_usage.total_mb) * 100;
                    const color =
                      percent > 50
                        ? "#05b1bd"
                        : percent > 20
                        ? "#10b981"
                        : "#f59e0b";

                    return (
                      <div key={i} className="storage-card">
                        <div className="storage-header">
                          <span className="storage-type">
                            {s.file_type.toUpperCase()}
                          </span>
                          <span className="storage-size">
                            {s.total_size_mb.toFixed(2)} MB
                          </span>
                        </div>
                        <div className="storage-bar">
                          <div
                            className="storage-progress"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: color,
                            }}
                          ></div>
                        </div>
                        <p className="storage-percent">
                          {percent.toFixed(1)}% of total
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            No knowledge base data found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
