import { useState } from "react";
import { login } from "../api/userApi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await login(form);
            const user = response.data;

            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/student");
            }
        } catch (error) {
            alert(error.response?.data?.error || "Login failed");
        }
    };

  return (
    <div>
        <h2>Login</h2>

        <form onSubmit={handleLogin}>
            <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            />

            <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            />

            <button type="submit">Login</button>
        </form>
    </div>
  );
}

export default LoginPage;