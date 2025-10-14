import { TrendingUp } from "lucide-react";

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  total?: number;
}> = ({ title, value, icon, color, description, trend, total = 1 }) => (
  <div className="stat-card">
    <div className="stat-card-background"></div>

    <div className="stat-card-content">
      <div className="stat-text-content">
        <div className="stat-header">
          <p className="stat-card-title">{title}</p>
          {trend && (
            <div
              className={`trend-indicator ${trend.isPositive ? "positive" : "negative"}`}
            >
              <TrendingUp className="trend-icon" />
              <span className="trend-value">{trend.value}%</span>
            </div>
          )}
        </div>

        <p className="stat-card-value">{value.toLocaleString()}</p>

        {description && <p className="stat-card-description">{description}</p>}
      </div>

      <div className="stat-icon-container">
        <div className={`stat-icon-wrapper ${color}`}>{icon}</div>
      </div>
    </div>

    {/* Progress bar for visual interest */}
    <div className="stat-progress-bar">
      <div
        className={`stat-progress-fill ${color}`}
        style={{
          width: `${Math.min((value / total) * 100, 100)}%`,
        }}
      ></div>
    </div>

    <style jsx>{`
      .stat-card {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border-radius: 1.25rem;
        box-shadow:
          0 4px 20px rgba(0, 0, 0, 0.08),
          0 1px 3px rgba(0, 0, 0, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.8);
        padding: 2rem;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
      }

      .stat-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #059669, #3b82f6, #8b5cf6);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .stat-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow:
          0 20px 40px rgba(0, 0, 0, 0.12),
          0 8px 16px rgba(0, 0, 0, 0.06);
      }

      .stat-card:hover::before {
        opacity: 1;
      }

      .stat-card-background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          circle at top right,
          rgba(5, 150, 105, 0.03) 0%,
          transparent 50%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .stat-card:hover .stat-card-background {
        opacity: 1;
      }

      .stat-card-content {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        z-index: 2;
      }

      .stat-text-content {
        flex: 1;
      }

      .stat-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 0.75rem;
      }

      .stat-card-title {
        font-size: 0.875rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        margin: 0;
        opacity: 0.9;
      }

      .trend-indicator {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.25rem 0.5rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
      }

      .trend-indicator.positive {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
      }

      .trend-indicator.negative {
        background: rgba(239, 68, 68, 0.1);
        color: #dc2626;
      }

      .trend-icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      .trend-indicator.negative .trend-icon {
        transform: rotate(180deg);
      }

      .stat-card-value {
        font-size: 3rem;
        font-weight: 800;
        color: #0f172a;
        font-family: "Bebas Neue", sans-serif;
        margin: 0 0 0.75rem 0;
        line-height: 1;
        background: linear-gradient(135deg, #0f172a 0%, #334155 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .stat-card-description {
        font-size: 0.875rem;
        color: #64748b;
        margin: 0;
        line-height: 1.4;
        opacity: 0.8;
      }

      .stat-icon-container {
        margin-left: 1rem;
      }

      .stat-icon-wrapper {
        padding: 1.25rem;
        border-radius: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .stat-card:hover .stat-icon-wrapper {
        transform: scale(1.1) rotate(5deg);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }

      .stat-icon-wrapper::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          135deg,
          rgba(255, 255, 255, 0.2) 0%,
          transparent 50%
        );
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .stat-card:hover .stat-icon-wrapper::before {
        opacity: 1;
      }

      .stat-icon-wrapper .stat-icon {
        width: 2.25rem;
        height: 2.25rem;
        position: relative;
        z-index: 2;
      }

      /* Color variants for stat icons */
      .stat-icon-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      }
      .stat-icon-blue .stat-icon {
        color: white;
      }

      .stat-icon-yellow {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      }
      .stat-icon-yellow .stat-icon {
        color: white;
      }

      .stat-icon-green {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      }
      .stat-icon-green .stat-icon {
        color: white;
      }

      .stat-icon-purple {
        background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
      }
      .stat-icon-purple .stat-icon {
        color: white;
      }

      .stat-icon-gray {
        background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      }
      .stat-icon-gray .stat-icon {
        color: white;
      }

      .stat-icon-red {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      }
      .stat-icon-red .stat-icon {
        color: white;
      }

      .stat-icon-orange {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      }
      .stat-icon-orange .stat-icon {
        color: white;
      }

      /* Progress bar */
      .stat-progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: rgba(0, 0, 0, 0.06);
        border-radius: 0 0 1.25rem 1.25rem;
        overflow: hidden;
      }

      .stat-progress-fill {
        height: 100%;
        transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        border-radius: 0 0 1.25rem 1.25rem;
      }

      .stat-progress-fill.stat-icon-blue {
        background: linear-gradient(90deg, #3b82f6, #1d4ed8);
      }

      .stat-progress-fill.stat-icon-yellow {
        background: linear-gradient(90deg, #f59e0b, #d97706);
      }

      .stat-progress-fill.stat-icon-green {
        background: linear-gradient(90deg, #10b981, #059669);
      }

      .stat-progress-fill.stat-icon-purple {
        background: linear-gradient(90deg, #8b5cf6, #7c3aed);
      }

      .stat-progress-fill.stat-icon-gray {
        background: linear-gradient(90deg, #6b7280, #4b5563);
      }

      .stat-progress-fill.stat-icon-red {
        background: linear-gradient(90deg, #ef4444, #dc2626);
      }

      .stat-progress-fill.stat-icon-orange {
        background: linear-gradient(90deg, #f97316, #ea580c);
      }

      /* Animation for stat cards */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .stat-card {
        animation: fadeInUp 0.6s ease-out;
      }

      /* Responsive design for individual cards */
      @media (max-width: 768px) {
        .stat-card {
          padding: 1.5rem;
        }

        .stat-card-value {
          font-size: 2.5rem;
        }

        .stat-icon-wrapper {
          padding: 1rem;
        }

        .stat-icon-wrapper .stat-icon {
          width: 2rem;
          height: 2rem;
        }
      }
    `}</style>
  </div>
);

export default StatCard;
