import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();

    const res = await fetch(window.location.origin + "/djangoapp/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, password }),
    });

    const json = await res.json();

    if (json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      window.location.href = "/";
    } else {
      setErrorMessage("Sai tên đăng nhập hoặc mật khẩu.");
    }
  };

  return (
    <div className="login_container">
      <form className="login_form" onSubmit={login}>
        <h2>Login</h2>

        {errorMessage && <p className="error_message">{errorMessage}</p>}

        <label htmlFor="userName">Username</label>
        <input
          type="text"
          id="userName"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="switch_link">
          Chưa có tài khoản? <a href="/register">Đăng ký</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
