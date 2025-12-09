import React from "react";
import { HiX } from "react-icons/hi";
import "./Users.css";

const UserDetailModal = ({ user, onClose }) => {
  if (!user) return null;

  const {
    basic_info,
    plan_info,
    knowledge_base_info,
    api_key_info,
    usage_info,
  } = user;

  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "-";
    return new Date(dateString).toLocaleString();
  };

  const InfoSection = ({ title, children }) => (
    <div className="detail-section">
      <h3>{title}</h3>
      <div className="detail-grid">{children}</div>
    </div>
  );

  const DetailItem = ({ label, value, highlight = false }) => (
    <div className="detail-item">
      <span className="detail-label">{label}</span>
      <span className={`detail-value ${highlight ? "highlight" : ""}`}>
        {value === true
          ? "Yes"
          : value === false
          ? "No"
          : value === "N/A" || value === null || value === undefined
          ? "-"
          : value}
      </span>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">User Details</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <HiX />
          </button>
        </div>

        <div className="modal-body">
          <InfoSection title="Basic Information">
            <DetailItem
              label="Username"
              value={basic_info.username}
              highlight
            />
            <DetailItem label="Email" value={basic_info.email} />
            <DetailItem label="User ID" value={basic_info.id} />
            <DetailItem label="Superuser" value={basic_info.is_superuser} />
            <DetailItem
              label="Date Joined"
              value={formatDate(basic_info.date_joined)}
            />
            <DetailItem
              label="Last Login"
              value={formatDate(basic_info.last_login)}
            />
          </InfoSection>

          <InfoSection title="Plan Information">
            <DetailItem
              label="Plan Name"
              value={plan_info.plan_name}
              highlight
            />
            <DetailItem label="Status" value={plan_info.status} />
            <DetailItem label="Price" value={plan_info.plan_price} />
            <DetailItem label="Subscribed" value={plan_info.is_subscribed} />
            <DetailItem label="Start Date" value={plan_info.start_date} />
            <DetailItem label="Expiry Date" value={plan_info.expiry_date} />
            <DetailItem
              label="API Limit"
              value={plan_info.plan_api_requests_limit}
            />
            <DetailItem
              label="PDF Limit"
              value={plan_info.plan_pdf_uploads_limit}
            />
          </InfoSection>

          <InfoSection title="Usage Statistics">
            <DetailItem
              label="Remaining API Requests (User)"
              value={usage_info.user_remaining_api_requests}
              highlight
            />
            <DetailItem
              label="Remaining API Requests (Sub)"
              value={usage_info.subscription_remaining_api_requests}
            />
            <DetailItem
              label="Remaining PDF Uploads"
              value={usage_info.subscription_remaining_pdf_uploads}
            />
          </InfoSection>

          <InfoSection title="Knowledge Base">
            <DetailItem
              label="Total Documents"
              value={knowledge_base_info.total_documents}
            />
            <DetailItem
              label="Processed"
              value={knowledge_base_info.processed_documents}
            />
            <DetailItem
              label="Pending"
              value={knowledge_base_info.pending_documents}
            />
            <DetailItem
              label="Total Storage"
              value={knowledge_base_info.total_storage_mb}
            />
          </InfoSection>

          <InfoSection title="API Key Information">
            <DetailItem
              label="Generated Key"
              value={api_key_info.has_generated_api_key}
            />
            <DetailItem
              label="Active Key"
              value={api_key_info.has_active_api_key}
            />
            <DetailItem
              label="Total Keys"
              value={api_key_info.total_api_keys}
            />
            <DetailItem
              label="Active Keys Count"
              value={api_key_info.active_api_keys_count}
            />
            <DetailItem
              label="Last Used"
              value={formatDate(api_key_info.api_key_last_used)}
            />
          </InfoSection>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
