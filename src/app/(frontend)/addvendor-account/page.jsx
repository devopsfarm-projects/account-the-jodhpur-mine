//page.jsx addvendor-account
// 'use client'; // This enables client-side features like useRouter, useState, and useEffect in Next.js
// import React, { useEffect, useState } from 'react'; // Import useEffect for lifecycle methods
// import { Alert, Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'; // Import Spinner for loading indication
// import { useRouter } from 'next/navigation'; // Used to navigate programmatically in Next.js
// import Header from '../components/Header'; // Header component for consistent layout

// const AddVendorAccount = () => {
//   // ✅ Form state to store user input for vendor details
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

//   // ✅ UI states for validation, alerts, and submission status
//   const [validated, setValidated] = useState(false); // Controls Bootstrap's form validation feedback
//   const [showAlert, setShowAlert] = useState(false); // Controls visibility of the alert message
//   const [alertMessage, setAlertMessage] = useState(''); // Content of the alert message
//   const [alertVariant, setAlertVariant] = useState('success'); // Variant of the alert (e.g., 'success', 'danger')
//   const [isSubmitting, setIsSubmitting] = useState(false); // Indicates if the form is currently being submitted
//   const [userRole, setUserRole] = useState(null); // State to store the user's role for access control

//   const router = useRouter(); // Initialize router for programmatic redirection

//   // ✅ Client-side Access Control: Checks user role on component mount
//   useEffect(() => {
//     if (typeof window !== "undefined") { // Ensure this code runs only in the browser
//       const userData = localStorage.getItem("user");
//       let role = null;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           role = parsedUser.role;
//           setUserRole(role); // Set the role to state
//         } catch (error) {
//           console.error("Error parsing user data from localStorage:", error);
//           // If parsing fails, treat as unauthorized or guest
//         }
//       }

//       // If the user's role is not 'admin' or 'manager', redirect them.
//       // This handles cases where credentials might be invalid (resulting in no role or 'guest' role).
//       if (role !== 'admin' && role !== 'manager') {
//         console.log(`Unauthorized access attempt to AddVendorAccount by user with role: ${role || 'undefined'}. Redirecting...`);
//         setTimeout(() => {
//           localStorage.clear()
//           window.location.href = '/api/logout'
//         }, 1500); // Redirect to login page
//       }
//     }
//   }, [router]); // Dependency array: re-run if router object changes (rare, but good practice)


//   // ✅ Helper function to get current timestamp in ISO format
//   const getCurrentDate = () => new Date().toISOString();

//   // ✅ Resets all form fields to their initial empty state and clears validation
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
//     setValidated(false); // Reset Bootstrap validation styling
//     setShowAlert(false); // Hide any active alerts
//     setAlertMessage(''); // Clear alert message content
//   };

//   // ✅ Handles changes to form input fields, updating the `form` state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value }); // Update the specific field
//     // Optionally, clear alert messages immediately when user starts typing
//     setShowAlert(false);
//     setAlertMessage('');
//   };

//   // ✅ Handles form submission logic
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default browser form submission (page reload)
//     const formElement = e.currentTarget; // Get the form DOM element for HTML5 validation

//     // Set `validated` to true to trigger Bootstrap's visual validation feedback
//     setValidated(true);

//     // Check if the form's required fields are valid according to HTML5 validation
//     if (formElement.checkValidity() === false) {
//       e.stopPropagation(); // Stop further event propagation if validation fails
//       setAlertVariant('danger');
//       setAlertMessage('Please fill in all required fields correctly.');
//       setShowAlert(true);
//       return; // Exit the function if validation fails
//     }

//     setIsSubmitting(true); // Set submitting state to true to disable button and show spinner

//     try {
//       // Prepare the payload object to send to the API.
//       // Add creation and update timestamps.
//       const vendorData = {
//         ...form, // Spread all current form values
//         vendorCreatedAt: getCurrentDate(),
//         vendorUpdatedAt: getCurrentDate(),
//       };

//       // Send a POST request to your Payload CMS API endpoint for vendors
//       const response = await fetch('/api/vendor', {
//         method: 'POST', // HTTP method
//         headers: {
//           'Content-Type': 'application/json' // Specify that we are sending JSON data
//         },
//         body: JSON.stringify(vendorData), // Convert the JavaScript object to a JSON string
//       });

//       if (response.ok) { // Check if the response status is 2xx (success)
//         setAlertVariant('success');
//         setAlertMessage('Vendor account added successfully!');
//         setShowAlert(true);

//         // Reset form and redirect after a short delay for user to see success message
//         setTimeout(() => {
//           setShowAlert(false); // Hide the alert
//           resetForm(); // Clear the form fields
//           router.push('/viewvendor-account'); // Redirect to the vendor view page
//         }, 2000); // 2-second delay
//       } else {
//         // If response is not OK, parse the error message from the server
//         const errorData = await response.json();
//         // Throw an error with the server's message or a generic one
//         throw new Error(errorData.message || 'Failed to add vendor account. Please try again.');
//       }
//     } catch (error) {
//       // Catch any network errors or errors thrown from the try block
//       console.error("Error submitting vendor data:", error);
//       setAlertVariant('danger'); // Set alert to danger variant
//       setAlertMessage(error.message || 'An unexpected error occurred. Please try again later.'); // Display error message
//       setShowAlert(true); // Show the alert
//     } finally {
//       setIsSubmitting(false); // Always set submitting to false after request completes (success or failure)
//     }
//   };

//   // Render nothing or a loading spinner until the user's role is determined
//   if (userRole === null) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold mt-2">Checking authorization...</p>
//       </div>
//     );
//   }

//   // If unauthorized, show an error message and potentially redirect.
//   // This client-side check complements the server-side middleware (which should also be in place).
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     return (
//       <>
//         <Container className="mt-5 text-center">
//           <Alert variant="danger" className="fw-semibold">
//             You do not have permission to access this page. Redirecting...
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   // Main component render for authorized users
//   return (
//     <>
//       <Header /> {/* Renders the consistent navigation header */}
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto my-5">
//         <h4 className="text-center fw-bold mb-3 fs-4">Add New Vendor Account</h4>

//         {/* ✅ Alert message display */}
//         {showAlert && (
//           <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
//             {alertMessage}
//           </Alert>
//         )}

//         {/* ✅ Vendor Account Form Starts */}
//         {/* `noValidate` disables browser's default HTML5 validation, allowing Bootstrap's `validated` prop to take over */}
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             {/* LEFT COLUMN for primary vendor details */}
//             <Col xs={12} md={6}>
//               {/* Vendor Name (Required Field) */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Name <span className="text-danger">*</span> {/* Red asterisk indicates required field */}
//                 </Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="vendorName"
//                   value={form.vendorName}
//                   onChange={handleChange}
//                   placeholder="Enter full name of the vendor"
//                   required // HTML5 required attribute
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Vendor name is required. {/* Message shown if validation fails */}
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Mobile Number (Required, 10-digit pattern) */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">
//                   Vendor's Mobile Number <span className="text-danger">*</span>
//                 </Form.Label>
//                 <Form.Control
//                   type="tel" // Semantic type for telephone numbers
//                   name="vendorMobile"
//                   value={form.vendorMobile}
//                   pattern="[0-9]{10}" // Regex pattern to enforce 10 digits (numbers only)
//                   onChange={handleChange}
//                   placeholder="Enter 10-digit mobile number (e.g., 9876543210)"
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Enter a valid 10-digit mobile number.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               {/* Optional Fields for Licenses and Village */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Vendor's Query License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="query_license"
//                   value={form.query_license}
//                   onChange={handleChange}
//                   placeholder="Enter Query License ID (Optional)"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Vendor's Mining License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mining_license"
//                   value={form.mining_license}
//                   onChange={handleChange}
//                   placeholder="Enter Mining License ID (Optional)"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Nearby Village</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="near_village"
//                   value={form.near_village}
//                   onChange={handleChange}
//                   placeholder="Enter nearby village (Optional)"
//                 />
//               </Form.Group>
//             </Col>

//             {/* RIGHT COLUMN for address details */}
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Tehsil</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tehsil"
//                   value={form.tehsil}
//                   onChange={handleChange}
//                   placeholder="Enter Tehsil (Optional)"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">District</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="district"
//                   value={form.district}
//                   onChange={handleChange}
//                   placeholder="Enter District (Optional)"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={form.state}
//                   onChange={handleChange}
//                   placeholder="Enter State (Optional)"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Country</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="country"
//                   value={form.country}
//                   onChange={handleChange}
//                   placeholder="Enter Country (Optional)"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* ✅ Action Buttons */}
//           <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3">
//             <Button
//               type="submit"
//               variant="success"
//               className="px-4 fw-bold rounded-3"
//               disabled={isSubmitting} // Disable button when submitting to prevent double clicks
//             >
//               {isSubmitting ? (
//                 <>
//                   <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
//                   Processing...
//                 </>
//               ) : (
//                 'Create Vendor Account'
//               )}
//             </Button>
//             <Button
//               variant="secondary"
//               className="px-4 fw-bold rounded-3"
//               onClick={resetForm}
//               disabled={isSubmitting} // Disable reset button while submitting
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


// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import { FaXmark } from "react-icons/fa6";
// import Header from '../components/Header';
// import locationData from '../India-state-city-subDistrict-village.json';
// const AddVendorAccount = () => {
//   const router = useRouter();

//   // Holds the current form values
//   const [formData, setFormData] = useState({
//     vendorName: '',
//     vendorMobile: '',
//     query_license: '',
//     mining_license: '',
//     country: 'India',
//     state: '',
//     district: '',
//     tehsil: '',
//     near_village: ''
//   });

//   // Validation and UI control states
//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [tehsils, setTehsils] = useState([]);
//   const [villages, setVillages] = useState([]);
//   const [userRole, setUserRole] = useState(null);
//   const [vendorNameWarning, setVendorNameWarning] = useState('');
//   const [isOtherDistrict, setIsOtherDistrict] = useState(false); // Flag for 'Other' district selection

//   // On component mount, get states and user role
//   useEffect(() => {
//     const userData = localStorage.getItem('user');
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         const role = parsed.role;
//         setUserRole(role);
//         if (role !== 'admin' && role !== 'manager') {
//           setTimeout(() => {
//             localStorage.clear();
//             window.location.href = '/api/logout';
//           }, 1500);
//         }
//       } catch (err) {
//         console.error('Invalid user data:', err);
//       }
//     }
//     setStates(locationData.map(item => item.state));
//   }, []);

//   // Handle all input changes here
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Vendor name should only allow lowercase letters and spaces
//     if (name === 'vendorName') {
//       const valid = value.replace(/[^a-z ]/g, '');
//       setVendorNameWarning(valid !== value ? 'Only lowercase letters and spaces allowed' : '');
//       setFormData({ ...formData, [name]: valid });
//       return;
//     }

//     // If typing custom district/tehsil/village (when 'Other' is selected)
//     if (['district', 'tehsil', 'near_village'].includes(name) && isOtherDistrict) {
//       const valid = value.replace(/[^a-z ]/g, '');
//       setFormData({ ...formData, [name]: valid });
//       return;
//     }

//     if (name === 'state') {
//       const selected = locationData.find(s => s.state === value);
//       const distList = selected?.districts.map(d => d.district) || [];
//       setDistricts([...distList, 'Other']);
//       setTehsils([]);
//       setVillages([]);
//       setFormData({ ...formData, state: value, district: '', tehsil: '', near_village: '' });
//       setIsOtherDistrict(false);
//       return;
//     }

//     if (name === 'district') {
//       if (value === 'Other') {
//         setIsOtherDistrict(true);
//         setFormData({ ...formData, district: '', tehsil: '', near_village: '' });
//         setTehsils([]);
//         setVillages([]);
//       } else {
//         const stateData = locationData.find(s => s.state === formData.state);
//         const districtData = stateData?.districts.find(d => d.district === value);
//         const tehsilList = districtData?.subDistricts.map(t => t.subDistrict) || [];
//         setTehsils(tehsilList);
//         setVillages([]);
//         setFormData({ ...formData, district: value, tehsil: '', near_village: '' });
//         setIsOtherDistrict(false);
//       }
//       return;
//     }

//     if (name === 'tehsil') {
//       const stateData = locationData.find(s => s.state === formData.state);
//       const districtData = stateData?.districts.find(d => d.district === formData.district);
//       const tehsilData = districtData?.subDistricts.find(t => t.subDistrict === value);
//       const villageList = tehsilData?.villages || [];
//       setVillages(villageList);
//       setFormData({ ...formData, tehsil: value, near_village: '' });
//       return;
//     }

//     setFormData({ ...formData, [name]: value });
//   };

//   // Reset form back to initial values
//   const resetForm = () => {
//     setFormData({
//       vendorName: '',
//       vendorMobile: '',
//       query_license: '',
//       mining_license: '',
//       country: 'India',
//       state: '',
//       district: '',
//       tehsil: '',
//       near_village: ''
//     });
//     setValidated(false);
//     setVendorNameWarning('');
//     setDistricts([]);
//     setTehsils([]);
//     setVillages([]);
//     setIsOtherDistrict(false);
//     setStates(locationData.map(item => item.state));
//   };

//   const getFormattedDate = () => new Date().toISOString();

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setValidated(true);
//     if (!e.currentTarget.checkValidity()) return;

//     setIsSubmitting(true);
//     try {
//       const res = await fetch('/api/vendor');
//       const data = await res.json();

//       const duplicate = data?.docs?.some(
//         vendor => vendor.vendorName?.toLowerCase() === formData.vendorName.toLowerCase() &&
//           vendor.query_license?.toLowerCase() === formData.query_license.toLowerCase() &&
//           vendor.near_village?.toLowerCase() === formData.near_village.toLowerCase()
//       );

//       if (duplicate) {
//         setAlertVariant('danger');
//         setAlertMessage('This vendor account already exists.');
//         setShowAlert(true);
//         setIsSubmitting(false);
//         setTimeout(() => {
//           resetForm();
//           setShowAlert(false);
//         }, 3000);
//         return;
//       }

//       const newVendor = {
//         ...formData,
//         vendorCreatedAt: getFormattedDate(),
//         vendorUpdatedAt: getFormattedDate()
//       };

//       const create = await fetch('/api/vendor', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newVendor)
//       });

//       if (create.ok) {
//         setAlertVariant('success');
//         setAlertMessage('Vendor account created successfully!');
//         setShowAlert(true);
//         setTimeout(() => {
//           resetForm();
//           router.push('/viewvendor-account');
//         }, 1000);
//       } else {
//         throw new Error('Failed to save vendor.');
//       }
//     } catch (err) {
//       setAlertVariant('danger');
//       setAlertMessage(err.message || 'Network error.');
//       setShowAlert(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (userRole === null) return <p className="text-center mt-5">Loading...</p>;
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     return (
//       <Container className="mt-4 text-center">
//         <Alert variant="danger">Access denied. Log in with appropriate credentials.</Alert>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-md-75 w-xl-50 mx-auto my-5">
//         <h4 className="text-center mb-3 fw-bold">Add New Vendor Account</h4>

//         {showAlert && (
//           <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
//             {alertMessage}
//           </Alert>
//         )}

//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             {/* Left Column */}
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Vendor Name <span className="text-danger">*</span></Form.Label>
//                 <Form.Control type="text" name="vendorName" required pattern="^[a-z ]+$" value={formData.vendorName} onChange={handleChange} placeholder="Only lowercase letters" />
//                 <Form.Control.Feedback type="invalid">Lowercase letters and spaces only.</Form.Control.Feedback>
//                 {vendorNameWarning && <div className="text-danger mt-1">{vendorNameWarning}</div>}
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Mobile Number <span className="text-danger">*</span></Form.Label>
//                 <Form.Control type="tel" name="vendorMobile" required pattern="[0-9]{10}" value={formData.vendorMobile} onChange={handleChange} placeholder="10-digit number" />
//                 <Form.Control.Feedback type="invalid">Enter a valid 10-digit number.</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Query License <span className="text-danger">*</span></Form.Label>
//                 <Form.Control type="text" name="query_license" required value={formData.query_license} onChange={handleChange} />
//                 <Form.Control.Feedback type="invalid">Query License is required.</Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Mining License</Form.Label>
//                 <Form.Control type="text" name="mining_license" value={formData.mining_license} onChange={handleChange} />
//                 <Form.Control.Feedback type="invalid">Mining License is required.</Form.Control.Feedback>
//               </Form.Group>
//             </Col>

//             {/* Right Column */}
//             <Col md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">State <span className="text-danger">*</span></Form.Label>
//                 <Form.Select name="state" value={formData.state} onChange={handleChange} required>
//                   <option value="">-- Select State --</option>
//                   {states.map(s => <option key={s} value={s}>{s}</option>)}
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid">State is required.</Form.Control.Feedback>
//               </Form.Group>

//               {/* District Input OR Dropdown */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">District <span className="text-danger">*</span></Form.Label>
//                 {isOtherDistrict ? (
//                   <div className="d-flex align-items-center gap-2">
//                     <Form.Control type="text" name="district" placeholder="Enter district" pattern="^[a-z ]+$" required value={formData.district} onChange={handleChange} />
//                     <Button variant="outline-danger" onClick={() => {
//                       setIsOtherDistrict(false);
//                       setFormData({ ...formData, district: '', tehsil: '', near_village: '' });
//                     }}>
//                       <FaXmark size={20} className="text-center fw-bold fs-5"/>
//                     </Button>
//                   </div>
//                 ) : (
//                   <Form.Select name="district" value={formData.district} onChange={handleChange} required>
//                     <option value="">-- Select District --</option>
//                     {districts.map(d => <option key={d} value={d}>{d}</option>)}
//                   </Form.Select>
//                 )}
//                 <Form.Control.Feedback type="invalid">District is required.</Form.Control.Feedback>
//               </Form.Group>

//               {/* Tehsil Field */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Tehsil <span className="text-danger">*</span></Form.Label>
//                 {isOtherDistrict ? (
//                   <Form.Control type="text" name="tehsil" placeholder="Enter tehsil" pattern="^[a-z ]+$" required value={formData.tehsil} onChange={handleChange} />
//                 ) : (
//                   <Form.Select name="tehsil" value={formData.tehsil} onChange={handleChange} required>
//                     <option value="">-- Select Tehsil --</option>
//                     {tehsils.map(t => <option key={t} value={t}>{t}</option>)}
//                   </Form.Select>
//                 )}
//                 <Form.Control.Feedback type="invalid">Tehsil is required.</Form.Control.Feedback>
//               </Form.Group>

//               {/* Village Field */}
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-5">Nearby Village <span className="text-danger">*</span></Form.Label>
//                 {isOtherDistrict ? (
//                   <Form.Control type="text" name="near_village" placeholder="Enter village" pattern="^[a-z ]+$" required value={formData.near_village} onChange={handleChange} />
//                 ) : (
//                   <Form.Select name="near_village" value={formData.near_village} onChange={handleChange} required>
//                     <option value="">-- Select Village --</option>
//                     {villages.map(v => <option key={v} value={v}>{v}</option>)}
//                   </Form.Select>
//                 )}
//                 <Form.Control.Feedback type="invalid">Nearby Village is required.</Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           <div className="text-center mt-4 d-flex justify-content-center gap-2 flex-wrap">
//             <Button type="submit" variant="success" className="fw-bold fs-5" disabled={isSubmitting}>
//               {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
//             </Button>
//             <Button type="button" variant="secondary" className="fw-bold fs-5" onClick={resetForm}>Reset Form</Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default AddVendorAccount;

//page.jsx addvendor-account
'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FaXmark } from "react-icons/fa6";
import Header from '../components/Header';
import locationData from '../India-state-city-subDistrict-village.json';

const AddVendorAccount = () => {
  const router = useRouter();

  // Holds the current form values
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorMobile: '',
    query_license: '',
    mining_license: '',
    country: 'India',
    state: '',
    district: '',
    tehsil: '',
    near_village: ''
  });

  // Validation and UI control states
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [tehsils, setTehsils] = useState([]);
  const [villages, setVillages] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [vendorNameWarning, setVendorNameWarning] = useState('');
  const [isOtherDistrict, setIsOtherDistrict] = useState(false);

  // On component mount, get states and user role
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const role = parsed.role;
        setUserRole(role);
        if (role !== 'admin' && role !== 'manager') {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/api/logout';
          }, 1500);
        }
      } catch (err) {
        console.error('Invalid user data:', err);
      }
    }
    setStates(locationData.map(item => item.state));
  }, []);

  // Handle all input changes here
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Vendor name should only allow lowercase letters and spaces
    if (name === 'vendorName') {
      const valid = value.replace(/[^a-z ]/g, '');
      setVendorNameWarning(valid !== value ? 'Only lowercase letters and spaces allowed' : '');
      setFormData({ ...formData, [name]: valid });
      return;
    }

    // If typing custom district/tehsil/village (when 'Other' is selected)
    if (['district', 'tehsil', 'near_village'].includes(name) && isOtherDistrict) {
      const valid = value.replace(/[^a-z ]/g, '');
      setFormData({ ...formData, [name]: valid });
      return;
    }

    if (name === 'state') {
      const selected = locationData.find(s => s.state === value);
      const distList = selected?.districts.map(d => d.district) || [];
      setDistricts([...distList, 'Other']);
      setTehsils([]);
      setVillages([]);
      setFormData({ ...formData, state: value, district: '', tehsil: '', near_village: '' });
      setIsOtherDistrict(false);
      return;
    }

    if (name === 'district') {
      if (value === 'Other') {
        setIsOtherDistrict(true);
        setFormData({ ...formData, district: '', tehsil: '', near_village: '' });
        setTehsils([]);
        setVillages([]);
      } else {
        const stateData = locationData.find(s => s.state === formData.state);
        const districtData = stateData?.districts.find(d => d.district === value);
        const tehsilList = districtData?.subDistricts.map(t => t.subDistrict) || [];
        setTehsils(tehsilList);
        setVillages([]);
        setFormData({ ...formData, district: value, tehsil: '', near_village: '' });
        setIsOtherDistrict(false);
      }
      return;
    }

    if (name === 'tehsil') {
      const stateData = locationData.find(s => s.state === formData.state);
      const districtData = stateData?.districts.find(d => d.district === formData.district);
      const tehsilData = districtData?.subDistricts.find(t => t.subDistrict === value);
      const villageList = tehsilData?.villages || [];
      setVillages(villageList);
      setFormData({ ...formData, tehsil: value, near_village: '' });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  // Reset form back to initial values
  const resetForm = () => {
    setFormData({
      vendorName: '',
      vendorMobile: '',
      query_license: '',
      mining_license: '',
      country: 'India',
      state: '',
      district: '',
      tehsil: '',
      near_village: ''
    });
    setValidated(false);
    setVendorNameWarning('');
    setDistricts([]);
    setTehsils([]);
    setVillages([]);
    setIsOtherDistrict(false);
    setStates(locationData.map(item => item.state));
  };

  const getFormattedDate = () => new Date().toISOString();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    if (!e.currentTarget.checkValidity()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/vendor');
      const data = await res.json();

      const duplicate = data?.docs?.some(
        vendor => vendor.vendorName?.toLowerCase() === formData.vendorName.toLowerCase() &&
          vendor.query_license?.toLowerCase() === formData.query_license.toLowerCase() &&
          vendor.near_village?.toLowerCase() === formData.near_village.toLowerCase()
      );

      if (duplicate) {
        setAlertVariant('danger');
        setAlertMessage('This vendor account already exists.');
        setShowAlert(true);
        setIsSubmitting(false);
        setTimeout(() => {
          resetForm();
          setShowAlert(false);
        }, 3000);
        return;
      }

      const newVendor = {
        ...formData,
        vendorCreatedAt: getFormattedDate(),
        vendorUpdatedAt: getFormattedDate()
      };

      const create = await fetch('/api/vendor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newVendor)
      });

      if (create.ok) {
        setAlertVariant('success');
        setAlertMessage('Vendor account created successfully!');
        setShowAlert(true);
        setTimeout(() => {
          resetForm();
          router.push('/viewvendor-account');
        }, 1000);
      } else {
        throw new Error('Failed to save vendor account.');
      }
    } catch (err) {
      setAlertVariant('danger');
      setAlertMessage(err.message || 'Network error.');
      setShowAlert(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (userRole === null) return <p className="text-center mt-5">Loading...</p>;
  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="danger">Access denied. Log in with appropriate credentials.</Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-md-75 w-xl-50 mx-auto my-5">
        <h4 className="text-center mb-3 fw-bold">Add New Vendor Account</h4>

        {showAlert && (
          <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            {/* Left Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Vendor Name <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="vendorName" required pattern="^[a-z ]+$" value={formData.vendorName} onChange={handleChange} placeholder="Enter vendor name" />
                <Form.Control.Feedback type="invalid">Lowercase letters and spaces are allowed.</Form.Control.Feedback>
                {vendorNameWarning && <div className="text-danger mt-1">{vendorNameWarning}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Mobile Number <span className="text-danger">*</span></Form.Label>
                <Form.Control type="tel" name="vendorMobile" required pattern="[0-9]{10}" value={formData.vendorMobile} onChange={handleChange} placeholder="Enter 10-digit number" />
                <Form.Control.Feedback type="invalid">Enter a valid 10-digit number.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Query License <span className="text-danger">*</span></Form.Label>
                <Form.Control type="text" name="query_license" required value={formData.query_license} onChange={handleChange} placeholder="Enter query license"/>
                <Form.Control.Feedback type="invalid">Query License is required.</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Mining License</Form.Label>
                <Form.Control type="text" name="mining_license" value={formData.mining_license} onChange={handleChange} placeholder="Enter mining license"/>
              </Form.Group>
            </Col>

            {/* Right Column */}
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">State <span className="text-danger">*</span></Form.Label>
                <Form.Select name="state" value={formData.state} onChange={handleChange} required>
                  <option value="">-- Select State --</option>
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </Form.Select>
                <Form.Control.Feedback type="invalid">State is required.</Form.Control.Feedback>
              </Form.Group>

              {/* District Input OR Dropdown */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">District <span className="text-danger">*</span></Form.Label>
                {isOtherDistrict ? (
                  <div className="d-flex align-items-center gap-2">
                    <Form.Control type="text" name="district" placeholder="Enter district" pattern="^[a-z ]+$" required value={formData.district} onChange={handleChange} />
                    <Button variant="outline-danger" onClick={() => {
                      setIsOtherDistrict(false);
                      setFormData({ ...formData, district: '', tehsil: '', near_village: '' });
                    }}>
                      <FaXmark size={20} className="text-center fw-bold fs-5"/>
                    </Button>
                  </div>
                ) : (
                  <Form.Select name="district" value={formData.district} onChange={handleChange} required>
                    <option value="">-- Select District --</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </Form.Select>
                )}
                <Form.Control.Feedback type="invalid">District is required.</Form.Control.Feedback>
              </Form.Group>

              {/* Tehsil Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Tehsil</Form.Label>
                {isOtherDistrict ? (
                  <Form.Control type="text" name="tehsil" placeholder="Enter tehsil" pattern="^[a-z ]+$" value={formData.tehsil} onChange={handleChange} />
                ) : (
                  <Form.Select name="tehsil" value={formData.tehsil} onChange={handleChange}>
                    <option value="">-- Select Tehsil --</option>
                    {tehsils.map(t => <option key={t} value={t}>{t}</option>)}
                  </Form.Select>
                )}
              </Form.Group>

              {/* Village Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5">Nearby Village <span className="text-danger">*</span></Form.Label>
                {isOtherDistrict ? (
                  <Form.Control type="text" name="near_village" placeholder="Enter village" pattern="^[a-z ]+$" required value={formData.near_village} onChange={handleChange} />
                ) : (
                  <Form.Select name="near_village" value={formData.near_village} onChange={handleChange} required>
                    <option value="">-- Select Village --</option>
                    {villages.map(v => <option key={v} value={v}>{v}</option>)}
                  </Form.Select>
                )}
                <Form.Control.Feedback type="invalid">Nearby Village is required.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4 d-flex justify-content-center gap-2 flex-wrap">
            <Button type="submit" variant="success" className="fw-bold fs-5" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
            </Button>
            <Button type="button" variant="secondary" className="fw-bold fs-5" onClick={resetForm}>Reset Form</Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddVendorAccount;
