import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard 🔒</h1>
      <p>
        Welcome to the secret area, <strong>{user.name}</strong>!
      </p>
      <p>
        Your Role:{" "}
        <span style={{ textTransform: "capitalize" }}>{user.role}</span>
      </p>
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          border: "1px dashed var(--border-color)",
          borderRadius: "8px",
        }}
      >
        <h3>Inventory Stats (Coming Soon)</h3>
        <p>📦 Total Items: 0</p>
        <p>⚠️ Low Stock: 0</p>
      </div>
    </div>
  );
};

export default Dashboard;
