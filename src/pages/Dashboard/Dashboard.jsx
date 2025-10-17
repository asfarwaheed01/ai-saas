import React, { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   HiTrendingUp,
//   HiTrendingDown,
//   HiUsers,
//   HiCurrencyDollar,
//   HiEye,
//   HiShoppingCart,
//   HiArrowUp,
//   HiArrowDown,
// } from "react-icons/hi";
import "./Dashboard.css"; // Assuming you have a CSS file for styling
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import {
  FaChartLine,
  FaGlobe,
  FaLanguage,
  FaSpinner,
  FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
  const { getAccessToken, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [avatarInteraction, setAvatarInteraction] = useState(null);
  const [docData, setdocData] = useState(null);

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

  // Sample data for charts
  // const revenueData = [
  //   { month: "Jan", revenue: 45000, users: 2400 },
  //   { month: "Feb", revenue: 52000, users: 2800 },
  //   { month: "Mar", revenue: 48000, users: 2600 },
  //   { month: "Apr", revenue: 61000, users: 3200 },
  //   { month: "May", revenue: 55000, users: 2900 },
  //   { month: "Jun", revenue: 67000, users: 3500 },
  //   { month: "Jul", revenue: 72000, users: 3800 },
  //   { month: "Aug", revenue: 68000, users: 3600 },
  //   { month: "Sep", revenue: 75000, users: 4000 },
  //   { month: "Oct", revenue: 82000, users: 4300 },
  //   { month: "Nov", revenue: 79000, users: 4100 },
  //   { month: "Dec", revenue: 88000, users: 4600 },
  // ];

  // const trafficData = [
  //   { hour: "00", organic: 120, direct: 80, social: 40 },
  //   { hour: "04", organic: 90, direct: 60, social: 30 },
  //   { hour: "08", organic: 200, direct: 150, social: 70 },
  //   { hour: "12", organic: 280, direct: 220, social: 110 },
  //   { hour: "16", organic: 320, direct: 180, social: 90 },
  //   { hour: "20", organic: 250, direct: 140, social: 80 },
  // ];

  // const deviceData = [
  //   { name: "Desktop", value: 45, color: "#05b1bd" },
  //   { name: "Mobile", value: 35, color: "#10b981" },
  //   { name: "Tablet", value: 20, color: "#f59e0b" },
  // ];

  // const topProducts = [
  //   { name: "AI Assistant Pro", sales: 1245, revenue: 62250 },
  //   { name: "Data Analytics Suite", sales: 987, revenue: 49350 },
  //   { name: "Cloud Storage Premium", sales: 756, revenue: 37800 },
  //   { name: "Security Package", sales: 634, revenue: 31700 },
  //   { name: "API Access Tier", sales: 523, revenue: 26150 },
  // ];

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="dashboard-stat-card">
      {/* <div className="dashboard-stat-header">
        <div className="dashboard-stat-icon">
          <Icon />
        </div>
        <div
          className={`dashboard-stat-trend ${
            trend === "up"
              ? "dashboard-stat-trend-up"
              : "dashboard-stat-trend-down"
          }`}
        >
          {trend === "up" ? <HiArrowUp /> : <HiArrowDown />}
          {change}
        </div>
      </div> */}
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
      {/* Stats Grid */}
      {/* <div className="dashboard-stats-grid">
        <StatCard
          title="Total Revenue"
          value="$847,350"
          // change="12.5%"
          // icon={HiCurrencyDollar}
          // trend="up"
        />
        <StatCard
          title="Active Subscriptions"
          value="24,567"
          // change="8.2%"
          // icon={HiUsers}
          // trend="up"
        />
        <StatCard
          title="Avatar Interactions"
          value="156,789"
          // change="3.1%"
          // icon={HiEye}
          // trend="down"
        />
        <StatCard
          title="Knowledge Base"
          value="2,847"
          // change="15.3%"
          // icon={HiShoppingCart}
          // trend="up"
        />
      </div> */}
      {/* <div className="dashboard-stats-grid">
        <StatCard
          title="Total Revenue"
          value={
            isLoading
              ? "Loading..."
              : dashboardData
              ? `$${dashboardData.total_revenue?.toLocaleString()}`
              : "—"
          }
        />
        <StatCard
          title="Active Subscriptions"
          value={
            isLoading
              ? "Loading..."
              : dashboardData
              ? dashboardData.active_subscriptions?.toLocaleString()
              : "—"
          }
        />
        <StatCard
          title="Avatar Interactions"
          value={
            isLoading
              ? "Loading..."
              : dashboardData
              ? dashboardData.total_avatar_interactions?.toLocaleString()
              : "—"
          }
        />
        <StatCard
          title="Knowledge Base Docs"
          value={
            isLoading
              ? "Loading..."
              : dashboardData
              ? dashboardData.total_knowledge_base_docs?.toLocaleString()
              : "—"
          }
        />
      </div> */}
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
      {/* Charts Grid */}
      {/* <div className="dashboard-charts-grid">
        <div className="dashboard-chart-card dashboard-chart-large">
          <div className="dashboard-chart-header">
            <h3>Revenue & User Growth</h3>
            <p>Monthly performance over the last year</p>
          </div>
          <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient
                    id="revenueGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#05b1bd" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#05b1bd" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="usersGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#05b1bd"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  name="Revenue ($)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#usersGradient)"
                  name="Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-chart-card">
          <div className="dashboard-chart-header">
            <h3>Traffic Sources</h3>
            <p>Hourly breakdown by source</p>
          </div>
          <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="organic"
                  fill="#05b1bd"
                  name="Organic"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="direct"
                  fill="#10b981"
                  name="Direct"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="social"
                  fill="#f59e0b"
                  name="Social"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-chart-card">
          <div className="dashboard-chart-header">
            <h3>Device Distribution</h3>
            <p>User sessions by device type</p>
          </div>
          <div className="dashboard-chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-chart-card">
          <div className="dashboard-chart-header">
            <h3>Top Products</h3>
            <p>Best performing products this month</p>
          </div>
          <div className="dashboard-products-list">
            {topProducts.map((product, index) => (
              <div key={index} className="dashboard-product-item">
                <div className="dashboard-product-info">
                  <span className="dashboard-product-rank">#{index + 1}</span>
                  <div>
                    <h4 className="dashboard-product-name">{product.name}</h4>
                    <p className="dashboard-product-sales">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                <div className="dashboard-product-revenue">
                  ${product.revenue.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      {/* Recent Activity */}
      {/* <div className="dashboard-activity-section">
        <div className="dashboard-chart-card">
          <div className="dashboard-chart-header">
            <h3>Recent Activity</h3>
            <p>Latest updates and transactions</p>
          </div>
          <div className="dashboard-activity-list">
            <div className="dashboard-activity-item">
              <div className="dashboard-activity-icon dashboard-activity-icon-success">
                <HiTrendingUp />
              </div>
              <div className="dashboard-activity-content">
                <h4>New subscription purchased</h4>
                <p>Premium plan activated for user john@example.com</p>
                <span className="dashboard-activity-time">2 minutes ago</span>
              </div>
            </div>
            <div className="dashboard-activity-item">
              <div className="dashboard-activity-icon dashboard-activity-icon-warning">
                <HiUsers />
              </div>
              <div className="dashboard-activity-content">
                <h4>User limit approaching</h4>
                <p>Current plan will reach user limit in 3 days</p>
                <span className="dashboard-activity-time">1 hour ago</span>
              </div>
            </div>
            <div className="dashboard-activity-item">
              <div className="dashboard-activity-icon dashboard-activity-icon-info">
                <HiCurrencyDollar />
              </div>
              <div className="dashboard-activity-content">
                <h4>Monthly revenue milestone</h4>
                <p>Reached $50,000 in monthly recurring revenue</p>
                <span className="dashboard-activity-time">3 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
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
                          user.usage_percentage > 80 ? "#fff6f6" : "inherit",
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
                    Recent Usage: {lang.recent_usage}
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
                    <p className="progress-inner-color">Avg</p>
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
