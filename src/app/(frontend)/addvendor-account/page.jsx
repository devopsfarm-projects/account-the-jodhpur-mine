//page addvendor-account.jsx
// 'use client'; // Required for using useRouter and fetch in Next.js (client-side)
// import React, { useState } from 'react';
// import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
// import { useRouter } from 'next/navigation'; // useRouter lets us programmatically redirect pages
// import Header from '../components/Header'; // Import the Header component (adjust path as needed)

// const AddVendorAccount = () => {
//   // Form data state (controlled inputs)
//   const [form, setForm] = useState({
//     vendorName: '',
//     vendorMobile: '',
//     query_license: '',
//     mining_license: '',
//     near_village: '',
//     tehsil: '',
//     district: '',
//     state: '',
//     country: '',
//   });

//   // Other states for validation, alerts, and loading
//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter(); // Next.js navigation hook

//   // Helper: Get current date in ISO format for vendorCreatedAt field
//   const getCurrentDate = () => new Date().toISOString();

//   // const getFormattedDate = () => {
//   //   const current = new Date();
//   //   const date = current.toLocaleDateString('en-GB'); // DD/MM/YYYY
//   //   const time = current.toLocaleTimeString('en-IN'); // HH:MM:SS
//   //   return `${date} ${time}`;
//   // };

//   // Helper: Reset all form fields
//   const resetForm = () => {
//     setForm({
//       vendorName: '',
//       vendorMobile: '',
//       query_license: '',
//       mining_license: '',
//       near_village: '',
//       tehsil: '',
//       district: '',
//       state: '',
//       country: '',
//     });
//     setValidated(false);
//   };

//   // Handle form input changes and update state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handle form submit (send data to Payload CMS backend)
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default page reload
//     const formElement = e.currentTarget;
//     setValidated(true); // Mark the form as validated

//     // If required fields are invalid, do not proceed
//     if (formElement.checkValidity() === false) {
//       e.stopPropagation();
//       return;
//     }

//     setIsSubmitting(true); // Start loading spinner on button

//     try {
//       // Create vendor payload to send to backend
//       const vendorData = {
//         ...form,
//         vendorCreatedAt: getCurrentDate(),  // Set creation date
//         vendorUpdatedAt: getCurrentDate(),  // Optional: set update time too
//       };

//       // Send POST request to Payload CMS backend
//       const response = await fetch('/api/vendor', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(vendorData),
//       });

//       // Check if backend request was successful
//       if (response.ok) {
//         setAlertVariant('success');
//         setAlertMessage('Vendor account added successfully!');
//         setShowAlert(true);

//         // Reset form and redirect after short delay
//         setTimeout(() => {
//           setShowAlert(false);
//           resetForm();
//           router.push('/viewvendor-account'); // Redirect to view page
//         }, 2000);
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to add vendor.');
//       }
//     } catch (error) {
//       // Handle errors (e.g., validation, network, server errors)
//       setAlertVariant('danger');
//       setAlertMessage(error.message);
//       setShowAlert(true);
//     } finally {
//       setIsSubmitting(false); // Stop loading spinner
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow shadow-5 rounded-5 w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto my-5 ">
//         <h4 className="text-center fw-bold mb-3 fs-4">
//           Add New Vendor Account
//         </h4>

//         {/* Alert message */}
//         {showAlert && (
//           <Alert
//             variant={alertVariant}
//             onClose={() => setShowAlert(false)}
//             dismissible
//           >
//             {alertMessage}
//           </Alert>
//         )}

//         {/* Bootstrap form with validation */}
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             {/* Left Column */}
//             <Col xs={12} md={6}>
//               {/* Vendor Name */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Name <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="vendorName"
//                   value={form.vendorName}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Name is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Mobile */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Mobile Number <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="tel"
//                   name="vendorMobile"
//                   value={form.vendorMobile}
//                   pattern="[0-9]{10}"
//                   onChange={handleChange}
//                   placeholder="10-digit number"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Enter valid 10-digit mobile number.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Query License */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Query License <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="query_license"
//                   value={form.query_license}
//                   onChange={handleChange}
//                   placeholder="Query License ID"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Query license required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Mining License */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Mining License <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mining_license"
//                   value={form.mining_license}
//                   onChange={handleChange}
//                   placeholder="Mining License ID"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Mining license required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Village */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Nearby Village <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="near_village"
//                   value={form.near_village}
//                   onChange={handleChange}
//                   placeholder="Nearby village"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Village is required.
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>

//             {/* Right Column */}
//             <Col xs={12} md={6}>
//               {/* Tehsil */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Tehsil
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tehsil"
//                   value={form.tehsil}
//                   onChange={handleChange}
//                   placeholder="Tehsil"
//                 />
//               </Form.Group>

//               {/* District */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's District <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="district"
//                   value={form.district}
//                   onChange={handleChange}
//                   placeholder="District"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   District is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* State */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's State <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   placeholder="State"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   State is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Country */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Country <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   placeholder="Country"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Country is required.
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Submit & Reset Buttons */}
//           <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3 ">
//             <Button type="submit" variant="success" className="px-4 fw-bold rounded-3" disabled={isSubmitting}>
//               {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
//             </Button>
//             <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={resetForm}>
//               Reset Form
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default AddVendorAccount;

// 'use client'; // This enables client-side features like useRouter in Next.js
// import React, { useState } from 'react';
// import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
// import { useRouter } from 'next/navigation'; // Used to navigate programmatically
// import Header from '../components/Header'; // Header component

// const AddVendorAccount = () => {
//   // Form state to store user input
//   const [form, setForm] = useState({
//     vendorName: '',
//     vendorMobile: '',
//     query_license: '',
//     mining_license: '',
//     near_village: '',
//     tehsil: '',
//     district: '',
//     state: '',
//     country: '',
//   });

//   // UI states
//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter(); // For redirection after form submission

//   // Returns current timestamp in ISO format
//   const getCurrentDate = () => new Date().toISOString();

//   // Resets all form fields and validation
//   const resetForm = () => {
//     setForm({
//       vendorName: '',
//       vendorMobile: '',
//       query_license: '',
//       mining_license: '',
//       near_village: '',
//       tehsil: '',
//       district: '',
//       state: '',
//       country: '',
//     });
//     setValidated(false);
//   };

//   // Updates form state as user types
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Handles form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page refresh
//     const formElement = e.currentTarget;
//     setValidated(true); // Enable validation styling

//     // Only check if required fields are valid (others are optional)
//     if (formElement.checkValidity() === false) {
//       e.stopPropagation();
//       return;
//     }

//     setIsSubmitting(true); // Show loading state

//     try {
//       // Create payload object to send
//       const vendorData = {
//         ...form,
//         vendorCreatedAt: getCurrentDate(),
//         vendorUpdatedAt: getCurrentDate(),
//       };

//       // Send POST request to Payload CMS API
//       const response = await fetch('/api/vendor', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(vendorData),
//       });

//       if (response.ok) {
//         setAlertVariant('success');
//         setAlertMessage('Vendor account added successfully!');
//         setShowAlert(true);

//         // Reset form and redirect after delay
//         setTimeout(() => {
//           setShowAlert(false);
//           resetForm();
//           router.push('/viewvendor-account');
//         }, 2000);
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to add vendor.');
//       }
//     } catch (error) {
//       setAlertVariant('danger');
//       setAlertMessage(error.message);
//       setShowAlert(true);
//     } finally {
//       setIsSubmitting(false); // Stop loading
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto my-5">
//         <h4 className="text-center fw-bold mb-3 fs-4">Add New Vendor Account</h4>

//         {/* Show alert message */}
//         {showAlert && (
//           <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//             {alertMessage}
//           </Alert>
//         )}

//         {/* Form Starts */}
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             {/* LEFT COLUMN */}
//             <Col xs={12} md={6}>
//               {/* Vendor Name (Required) */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Name <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="vendorName"
//                   value={form.vendorName}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Vendor name is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Mobile (Required) */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Mobile Number <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="tel"
//                   name="vendorMobile"
//                   value={form.vendorMobile}
//                   pattern="[0-9]{10}"
//                   onChange={handleChange}
//                   placeholder="10-digit mobile number"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Enter a valid 10-digit mobile number.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Optional Fields */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Vendor's Query License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="query_license"
//                   value={form.query_license}
//                   onChange={handleChange}
//                   placeholder="Query License ID"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Vendor's Mining License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mining_license"
//                   value={form.mining_license}
//                   onChange={handleChange}
//                   placeholder="Mining License ID"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Nearby Village</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="near_village"
//                   value={form.near_village}
//                   onChange={handleChange}
//                   placeholder="Village"
//                 />
//               </Form.Group>
//             </Col>

//             {/* RIGHT COLUMN */}
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Tehsil</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tehsil"
//                   value={form.tehsil}
//                   onChange={handleChange}
//                   placeholder="Tehsil"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">District</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="district"
//                   value={form.district}
//                   onChange={handleChange}
//                   placeholder="District"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   placeholder="State"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Country</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   placeholder="Country"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Action Buttons */}
//           <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3">
//             <Button
//               type="submit"
//               variant="success"
//               className="px-4 fw-bold rounded-3"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
//             </Button>
//             <Button
//               variant="secondary"
//               className="px-4 fw-bold rounded-3"
//               onClick={resetForm}
//             >
//               Reset Form
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default AddVendorAccount;

'use client'; // This enables client-side features like useRouter, useState, and useEffect in Next.js

import React, { useEffect, useState } from 'react'; // Import useEffect for lifecycle methods
import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'; // Import Spinner for loading indication
import { useRouter } from 'next/navigation'; // Used to navigate programmatically in Next.js
import Header from '../components/Header'; // Header component for consistent layout

const AddVendorAccount = () => {
  // ✅ Form state to store user input for vendor details
  const [form, setForm] = useState({
    vendorName: '',
    vendorMobile: '',
    query_license: '',
    mining_license: '',
    near_village: '',
    tehsil: '',
    district: '',
    state: '',
    country: '',
  });

  // ✅ UI states for validation, alerts, and submission status
  const [validated, setValidated] = useState(false); // Controls Bootstrap's form validation feedback
  const [showAlert, setShowAlert] = useState(false); // Controls visibility of the alert message
  const [alertMessage, setAlertMessage] = useState(''); // Content of the alert message
  const [alertVariant, setAlertVariant] = useState('success'); // Variant of the alert (e.g., 'success', 'danger')
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicates if the form is currently being submitted
  const [userRole, setUserRole] = useState(null); // State to store the user's role for access control

  const router = useRouter(); // Initialize router for programmatic redirection

  // ✅ Client-side Access Control: Checks user role on component mount
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure this code runs only in the browser
      const userData = localStorage.getItem("user");
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role); // Set the role to state
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
          // If parsing fails, treat as unauthorized or guest
        }
      }

      // If the user's role is not 'admin' or 'manager', redirect them.
      // This handles cases where credentials might be invalid (resulting in no role or 'guest' role).
      if (role !== 'admin' && role !== 'manager') {
        console.log(`Unauthorized access attempt to AddVendorAccount by user with role: ${role || 'undefined'}. Redirecting...`);
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1500); // Redirect to login page
      }
    }
  }, [router]); // Dependency array: re-run if router object changes (rare, but good practice)


  // ✅ Helper function to get current timestamp in ISO format
  const getCurrentDate = () => new Date().toISOString();

  // ✅ Resets all form fields to their initial empty state and clears validation
  const resetForm = () => {
    setForm({
      vendorName: '',
      vendorMobile: '',
      query_license: '',
      mining_license: '',
      near_village: '',
      tehsil: '',
      district: '',
      state: '',
      country: '',
    });
    setValidated(false); // Reset Bootstrap validation styling
    setShowAlert(false); // Hide any active alerts
    setAlertMessage(''); // Clear alert message content
  };

  // ✅ Handles changes to form input fields, updating the `form` state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // Update the specific field
    // Optionally, clear alert messages immediately when user starts typing
    setShowAlert(false);
    setAlertMessage('');
  };

  // ✅ Handles form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)
    const formElement = e.currentTarget; // Get the form DOM element for HTML5 validation

    // Set `validated` to true to trigger Bootstrap's visual validation feedback
    setValidated(true);

    // Check if the form's required fields are valid according to HTML5 validation
    if (formElement.checkValidity() === false) {
      e.stopPropagation(); // Stop further event propagation if validation fails
      setAlertVariant('danger');
      setAlertMessage('Please fill in all required fields correctly.');
      setShowAlert(true);
      return; // Exit the function if validation fails
    }

    setIsSubmitting(true); // Set submitting state to true to disable button and show spinner

    try {
      // Prepare the payload object to send to the API.
      // Add creation and update timestamps.
      const vendorData = {
        ...form, // Spread all current form values
        vendorCreatedAt: getCurrentDate(),
        vendorUpdatedAt: getCurrentDate(),
      };

      // Send a POST request to your Payload CMS API endpoint for vendors
      const response = await fetch('/api/vendor', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json' // Specify that we are sending JSON data
        },
        body: JSON.stringify(vendorData), // Convert the JavaScript object to a JSON string
      });

      if (response.ok) { // Check if the response status is 2xx (success)
        setAlertVariant('success');
        setAlertMessage('Vendor account added successfully!');
        setShowAlert(true);

        // Reset form and redirect after a short delay for user to see success message
        setTimeout(() => {
          setShowAlert(false); // Hide the alert
          resetForm(); // Clear the form fields
          router.push('/viewvendor-account'); // Redirect to the vendor view page
        }, 2000); // 2-second delay
      } else {
        // If response is not OK, parse the error message from the server
        const errorData = await response.json();
        // Throw an error with the server's message or a generic one
        throw new Error(errorData.message || 'Failed to add vendor account. Please try again.');
      }
    } catch (error) {
      // Catch any network errors or errors thrown from the try block
      console.error("Error submitting vendor data:", error);
      setAlertVariant('danger'); // Set alert to danger variant
      setAlertMessage(error.message || 'An unexpected error occurred. Please try again later.'); // Display error message
      setShowAlert(true); // Show the alert
    } finally {
      setIsSubmitting(false); // Always set submitting to false after request completes (success or failure)
    }
  };

  // Render nothing or a loading spinner until the user's role is determined
  if (userRole === null) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="fw-semibold mt-2">Checking authorization...</p>
      </div>
    );
  }

  // If unauthorized, show an error message and potentially redirect.
  // This client-side check complements the server-side middleware (which should also be in place).
  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <>
        <Container className="mt-5 text-center">
          <Alert variant="danger" className="fw-semibold">
            You do not have permission to access this page. Redirecting...
          </Alert>
        </Container>
      </>
    );
  }

  // Main component render for authorized users
  return (
    <>
      <Header /> {/* Renders the consistent navigation header */}
      <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto my-5">
        <h4 className="text-center fw-bold mb-3 fs-4">Add New Vendor Account</h4>

        {/* ✅ Alert message display */}
        {showAlert && (
          <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        )}

        {/* ✅ Vendor Account Form Starts */}
        {/* `noValidate` disables browser's default HTML5 validation, allowing Bootstrap's `validated` prop to take over */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            {/* LEFT COLUMN for primary vendor details */}
            <Col xs={12} md={6}>
              {/* Vendor Name (Required Field) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Name <span className="text-danger">*</span> {/* Red asterisk indicates required field */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="vendorName"
                  value={form.vendorName}
                  onChange={handleChange}
                  placeholder="Enter full name of the vendor"
                  required // HTML5 required attribute
                />
                <Form.Control.Feedback type="invalid">
                  Vendor name is required. {/* Message shown if validation fails */}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Mobile Number (Required, 10-digit pattern) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Mobile Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel" // Semantic type for telephone numbers
                  name="vendorMobile"
                  value={form.vendorMobile}
                  pattern="[0-9]{10}" // Regex pattern to enforce 10 digits (numbers only)
                  onChange={handleChange}
                  placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter a valid 10-digit mobile number.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Optional Fields for Licenses and Village */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Vendor's Query License</Form.Label>
                <Form.Control
                  type="text"
                  name="query_license"
                  value={form.query_license}
                  onChange={handleChange}
                  placeholder="Enter Query License ID (Optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Vendor's Mining License</Form.Label>
                <Form.Control
                  type="text"
                  name="mining_license"
                  value={form.mining_license}
                  onChange={handleChange}
                  placeholder="Enter Mining License ID (Optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Nearby Village</Form.Label>
                <Form.Control
                  type="text"
                  name="near_village"
                  value={form.near_village}
                  onChange={handleChange}
                  placeholder="Enter nearby village (Optional)"
                />
              </Form.Group>
            </Col>

            {/* RIGHT COLUMN for address details */}
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Tehsil</Form.Label>
                <Form.Control
                  type="text"
                  name="tehsil"
                  value={form.tehsil}
                  onChange={handleChange}
                  placeholder="Enter Tehsil (Optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">District</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="Enter District (Optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Enter State (Optional)"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Enter Country (Optional)"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* ✅ Action Buttons */}
          <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3">
            <Button
              type="submit"
              variant="success"
              className="px-4 fw-bold rounded-3"
              disabled={isSubmitting} // Disable button when submitting to prevent double clicks
            >
              {isSubmitting ? (
                <>
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                  Processing...
                </>
              ) : (
                'Create Vendor Account'
              )}
            </Button>
            <Button
              variant="secondary"
              className="px-4 fw-bold rounded-3"
              onClick={resetForm}
              disabled={isSubmitting} // Disable reset button while submitting
            >
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddVendorAccount;
