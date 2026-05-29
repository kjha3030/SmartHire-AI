import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
      }}
    >
      <h1>Welcome to Dashboard 🚀</h1>

      <Link to="/upload">
        <button
          style={{
            marginTop: "20px",
          }}
        >
          Upload Resume
        </button>
      </Link>
    </div>
  );
}