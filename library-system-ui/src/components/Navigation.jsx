import { Link, useNavigate } from "react-router-dom";

export function Navigation() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Books</Link> |{" "}
      <Link to="/student">Student Portal</Link> |{" "}
      <Link to="/admin">Admin Portal</Link> |{" "}
      <Link to="/users">Users</Link>
      {!user && (
        <>
          {" | "}
          <Link to="/login">Login</Link>
        </>
      )}
      {user && (
        <>
          {" | "}
          <span>
            Logged in as {user.name} ({user.role}. ID: {user.id})
          </span>

          {" "}

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}