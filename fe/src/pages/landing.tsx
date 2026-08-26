import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <div className="home-container">
        <div className="home-badge">Simple. Focused. Productive.</div>

        <h1 className="home-title">
          Get things <span>done.</span>
        </h1>

        <p className="home-description">
          A simple task manager designed to help you organize your work, track
          progress, and keep your day moving.
        </p>

        <div className="home-actions">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/signin")}
          >
            Sign in
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate("/signup")}
          >
            Create account
          </button>
        </div>
      </div>
    </main>
  );
}
