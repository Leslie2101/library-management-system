import { useEffect, useState } from "react";
import { getUsers, createUser } from "../api/userApi";

function UsersPage() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const loadUsers = async () => {
    const response = await getUsers();
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUser(form);

      setForm({
        name: "",
        email: "",
        password: "",
        role: "STUDENT",
      });

      loadUsers();
    } catch (error) {
      alert(error.response?.data?.error || "Failed to create user");
    }
  };

  return (
    <div>
        <h2>Users</h2>

        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />

            <select name="role" value={form.role} onChange={handleChange}>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
            </select>

            <button type="submit">Create User</button>
        </form>


        <table border="1">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                </tr>
            </thead>

            <tbody>
                {users.map((user) => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default UsersPage;