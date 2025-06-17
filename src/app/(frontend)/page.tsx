// 'use client';
// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
// import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import './styles.css'; // Optional custom CSS file

// const LoginForm = () => {
//   const router = useRouter();

//   // State variables
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Toggle password visibility
//   const toggleShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Handle login form submission
//   const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     const startTime = performance.now(); // Start timer

//     try {
//       const response = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const endTime = performance.now(); // End timer
//       const duration = (endTime - startTime).toFixed(2);
//       console.log(`Login API response time: ${duration}ms`);

//       const data = await response.json();

//       if (response.ok && data.token) {
//         // Save token and user info
//         localStorage.setItem('token', data.token);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         router.replace('/dashboard');
//         // Optional: You can validate token existence before redirect
//         // setTimeout(() => {
//         //   router.push('/dashboard');
//         // }, 300); // Delay ensures localStorage is ready
//       } else {
//         setError(data.message || 'Login failed. Please try again.');
//       }
//     } catch (err) {
//       console.error('Login error:', err);
//       setError('Unexpected error occurred. Try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Container fluid className="login-container d-flex align-items-center justify-content-center">
//       <Row className="w-100 justify-content-center">
//         <Col xs={11} sm={10} md={6} lg={4}>
//           <div className="login-box p-4 p-md-5 rounded">
//             {/* Header */}
//             <div className="text-center mb-4">
//               <h2 className="text-warning fw-bold">JODHPUR MINES</h2>
//               <p className="text-white-50 mb-0">Financial Ledger System</p>
//             </div>

//             {/* Error Message */}
//             {error && <Alert variant="danger">{error}</Alert>}

//             {/* Login Form */}
//             <Form onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="text-white text-uppercase small">
//                   Username
//                 </Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <FaUser />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your username"
//                     value={email}
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               {/* Password Field */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="text-white text-uppercase small">
//                   Password
//                 </Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text>
//                     <FaLock />
//                   </InputGroup.Text>
//                   <Form.Control
//                     type={showPassword ? 'text' : 'password'}
//                     placeholder="Enter your password"
//                     value={password}
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                   <Button
//                     variant="outline-secondary"
//                     onClick={toggleShowPassword}
//                     title={showPassword ? 'Hide Password' : 'Show Password'}
//                     style={{ backgroundColor: '#f8f9fa' }}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </Button>
//                 </InputGroup>
//               </Form.Group>

//               <div className="mb-4">
//                 <small className="text-white-50">
//                   Forgot Password? Contact System Administrator
//                 </small>
//               </div>

//               {/* Submit Button */}
//               <Button
//                 type="submit"
//                 className="w-100 ledger-button text-dark fw-bold bg-warning d-flex justify-content-center align-items-center gap-2"
//                 disabled={isLoading}
//               >
//                 {isLoading ? 'Logging in...' : (
//                   <>
//                     ACCESS LEDGER SYSTEM <FaArrowRight />
//                   </>
//                 )}
//               </Button>
//             </Form>

//             {/* Footer */}
//             <hr className="fw-bold text-white mb-0" />
//             <footer className="mt-4 text-center text-white-50 text-wrap small">
//               &copy; 2025 Jodhpur Mining Corporation. All rights reserved.
//             </footer>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginForm;

'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';

import './styles.css'; // Optional: your custom styles

const LoginForm = () => {
  const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')
   const [isDarkMode, setIsDarkMode] = useState(false)
   const [isLoading, setIsLoading] = useState(false)
 
   useEffect(() => {
     // Check if dark mode is preferred by the user
     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
     setIsDarkMode(prefersDark)
 
     // Listen for changes in system preference
     window
       .matchMedia('(prefers-color-scheme: dark)')
       .addEventListener('change', (e) => setIsDarkMode(e.matches))
   }, [])
 
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
         setTimeout(() => {
           window.location.href = '/dashboard'
         }, 2000)
       } else {
         setError(data.message || 'Login failed.')
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