import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  HiTrendingUp,
  HiTrendingDown,
  HiUsers,
  HiCurrencyDollar,
  HiEye,
  HiShoppingCart,
  HiArrowUp,
  HiArrowDown,
} from "react-icons/hi";
import "./Dashboard.css"; // Assuming you have a CSS file for styling

const Dashboard = () => {
  // Sample data for charts
  const revenueData = [
    { month: "Jan", revenue: 45000, users: 2400 },
    { month: "Feb", revenue: 52000, users: 2800 },
    { month: "Mar", revenue: 48000, users: 2600 },
    { month: "Apr", revenue: 61000, users: 3200 },
    { month: "May", revenue: 55000, users: 2900 },
    { month: "Jun", revenue: 67000, users: 3500 },
    { month: "Jul", revenue: 72000, users: 3800 },
    { month: "Aug", revenue: 68000, users: 3600 },
    { month: "Sep", revenue: 75000, users: 4000 },
    { month: "Oct", revenue: 82000, users: 4300 },
    { month: "Nov", revenue: 79000, users: 4100 },
    { month: "Dec", revenue: 88000, users: 4600 },
  ];

  const trafficData = [
    { hour: "00", organic: 120, direct: 80, social: 40 },
    { hour: "04", organic: 90, direct: 60, social: 30 },
    { hour: "08", organic: 200, direct: 150, social: 70 },
    { hour: "12", organic: 280, direct: 220, social: 110 },
    { hour: "16", organic: 320, direct: 180, social: 90 },
    { hour: "20", organic: 250, direct: 140, social: 80 },
  ];

  const deviceData = [
    { name: "Desktop", value: 45, color: "#3b82f6" },
    { name: "Mobile", value: 35, color: "#10b981" },
    { name: "Tablet", value: 20, color: "#f59e0b" },
  ];

  const topProducts = [
    { name: "AI Assistant Pro", sales: 1245, revenue: 62250 },
    { name: "Data Analytics Suite", sales: 987, revenue: 49350 },
    { name: "Cloud Storage Premium", sales: 756, revenue: 37800 },
    { name: "Security Package", sales: 634, revenue: 31700 },
    { name: "API Access Tier", sales: 523, revenue: 26150 },
  ];

  const StatCard = ({ title, value, change, icon: Icon, trend }) => (
    <div className="dashboard-stat-card">
      <div className="dashboard-stat-header">
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
      </div>
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
      <div className="dashboard-stats-grid">
        <StatCard
          title="Total Revenue"
          value="$847,350"
          change="12.5%"
          icon={HiCurrencyDollar}
          trend="up"
        />
        <StatCard
          title="Active Users"
          value="24,567"
          change="8.2%"
          icon={HiUsers}
          trend="up"
        />
        <StatCard
          title="Page Views"
          value="156,789"
          change="3.1%"
          icon={HiEye}
          trend="down"
        />
        <StatCard
          title="Conversions"
          value="2,847"
          change="15.3%"
          icon={HiShoppingCart}
          trend="up"
        />
      </div>

      {/* Charts Grid */}
      <div className="dashboard-charts-grid">
        {/* Revenue Chart */}
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
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
                  stroke="#3b82f6"
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

        {/* Traffic Sources */}
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
                  fill="#3b82f6"
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

        {/* Device Distribution */}
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

        {/* Top Products */}
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
      </div>

      {/* Recent Activity */}
      <div className="dashboard-activity-section">
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
      </div>
    </div>
  );
};

export default Dashboard;
