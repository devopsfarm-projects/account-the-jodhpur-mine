"use client";

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert, InputGroup, } from "react-bootstrap";
import { FaUser, FaLock, FaArrowRight, FaEye, FaEyeSlash, } from "react-icons/fa";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import "../styles.css"; // ✅ Adjust based on your project

const LoginPage = () => {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Error message
  const [error, setError] = useState("");

  const router = useRouter(); // ✅ Next.js navigation

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "admin2025@gmail.com" && password === "Admin@123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "admin");
      router.push("/dashboard"); // ✅ Redirect using Next.js
    } else if (email === "manager2025@gmail.com" && password === "Manager@123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "manager");
      router.push("/dashboard");
    }else if(email === "clienttransaction2025@gmail.com" && password === "Clienttransaction@123"){
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", "client");
      router.push("/dashboard");
    }
     else {
      setError("Invalid email or password");
    }
  };

  // Reset form
  const handleReset = () => {
    setEmail("");
    setPassword("");
    setError("");
  };

  // Auto-clear error after 3 seconds
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => handleReset(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  // Toggle password show/hide
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center"
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={6} lg={4}>
          <div className="login-box p-4 p-md-5 rounded">
            {/* Header */}
            <div className="text-center mb-4">
              <h2 className="text-warning fw-bold">JODHPUR MINES</h2>
              <p className="text-white-50 mb-0">Financial Ledger System</p>
            </div>

            {/* Error Alert */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Login Form */}
            <Form onSubmit={handleSubmit}>
              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white text-uppercase small">
                  Username
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your username"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white text-uppercase small">
                  Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={toggleShowPassword}
                    title={showPassword ? "Hide Password" : "Show Password"}
                    style={{ backgroundColor: "#f8f9fa" }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              {/* Forgot Password Info */}
              <div className="mb-4">
                <small className="text-white-50">
                  Forgot Password? Contact System Administrator
                </small>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-100 ledger-button d-flex justify-content-center align-items-center gap-2"
              >
                ACCESS LEDGER SYSTEM <FaArrowRight />
              </Button>
            </Form>

            {/* Footer */}
            <hr className="fw-bold text-white mb-0" />
            <footer className="mt-4 text-center text-white-50 text-wrap small">
              &copy; 2025 Jodhpur Mining Corporation. All rights reserved.
            </footer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
