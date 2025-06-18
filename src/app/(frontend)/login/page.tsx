
'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';

import '../styles.css'; // Optional: your custom styles

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(false)
 
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault()
     setError('')
     setIsLoading(true)
 
     try {
       const res = await fetch('/api/users/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password }),
       })
 
       const data = await res.json()
 
       if (res.ok && data.token) {
         localStorage.setItem('token', data.token)
         localStorage.setItem('user', JSON.stringify(data.user))
        //  router.replace('/dashboard')
         setTimeout(() => {
           window.location.href = '/dashboard'
         }, 2000)
       } else {
         setError(data.message || 'Login failed.')
         setTimeout(() => {
           setError('')
           setIsLoading(false)
           setEmail('')
           setPassword('')
         }, 2000)
       }
     } catch (err) {
       console.error(err)
       setError('An unexpected error occurred.')
       setIsLoading(false)
     }
   }
 
 
  return (
    <Container fluid className="login-container d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={10} md={6} lg={4}>
          <div className="login-box p-4 p-md-5 rounded">
            {/* App Header */}
            <div className="text-center mb-4">
              <h2 className="text-warning fw-bold">JODHPUR MINES</h2>
              <p className="text-white-50 mb-0">Financial Ledger System</p>
            </div>

            {/* Show error message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Login form */}
            <Form onSubmit={handleSubmit}>
              {/* Email input */}
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

              {/* Password input */}
              <Form.Group className="mb-3">
                <Form.Label className="text-white text-uppercase small">
                  Password
                </Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaLock />
                  </InputGroup.Text>
                  <Form.Control
                    type='password'
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                 
                </InputGroup>
              </Form.Group>

              {/* Password help note */}
              <div className="mb-4">
                <small className="text-white-50">
                  Forgot Password? Contact System Administrator
                </small>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-100 ledger-button text-dark fw-bold bg-warning d-flex justify-content-center align-items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : (
                  <>
                    ACCESS LEDGER SYSTEM <FaArrowRight />
                  </>
                )}
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

export default LoginForm;