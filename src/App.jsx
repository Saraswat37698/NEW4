import "./App.css";
import { useState } from "react";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation, Link } from "react-router-dom";
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
import p3 from "./assets/p3.png";
import p4 from "./assets/p4.png";
import p5 from "./assets/p5.png";
import p6 from "./assets/p6.png";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function Click() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === email &&
      storedUser.password === password
    ) {
      alert("Login successful!");
      navigate("/Shop");
    } else {
      alert("Invalid credentials!");
    }
  }

  return (
    <div className="container">
      <h1 className="head">Log-In</h1>
      <h1 style={{ fontFamily: "inertia", color: "rgba(24, 38, 55, 0.90)", letterSpacing: "2px" }}>The Mountain Shop</h1>

      <input
        className="email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="password"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login" onClick={Click}>
        Login
      </button>
      <Link to="/signup" id="switch">
        Don't have an account? Sign up
      </Link>
    </div>
  );
}

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function Click() {
    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Sign up successful! You can now log in.");
    navigate("/login");
  }

  return (
    <div className="container">
      <h1 className="head">Sign-Up</h1>
      <h1 style={{ fontFamily: "inertia", color: "rgba(24, 38, 55, 0.90)", letterSpacing: "2px" }}>The Mountain Shop</h1>

      <input
        className="email"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="email"
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="password"
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login" onClick={Click}>
        Sign Up
      </button>
      <Link to="/login" id="switch">
        Already have an account? Log in
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/Shop" element={<Shop />} />
      <Route path="/Information" element={<Information />} />
    </Routes>
  );
}

// Shop and Information functions remain unchanged...
