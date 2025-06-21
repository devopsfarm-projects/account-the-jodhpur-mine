//page.jsx addclient-account

// 'use client'; // Required for client-side hooks like useState and useRouter
// import React, { useState, useEffect } from 'react'; // Added useEffect for client-side role check
// import { useRouter } from 'next/navigation';
// import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
// import Header from '../components/Header';

// const AddClientAccount = () => {
//   const router = useRouter();

//   // State to hold form input data
//   const [formData, setFormData] = useState({
//     clientName: '',
//     clientMobile: '',
//     query_license: '',
//     mining_license: '',
//     near_village: '',
//     tehsil: '',
//     district: '',
//     state: '',
//     country: ''
//   });

//   const [validated, setValidated] = useState(false); // Manages Bootstrap's form validation styles
//   const [showAlert, setShowAlert] = useState(false); // Controls visibility of success/error alerts
//   const [alertMessage, setAlertMessage] = useState(''); // Text content for the alert
//   const [alertVariant, setAlertVariant] = useState('success'); // 'success' or 'danger' for alert styling
//   const [isSubmitting, setIsSubmitting] = useState(false); // Disables submit button during API call
//   const [userRole, setUserRole] = useState(null); // State to store the user's role for client-side authorization

//   // Client-side role check on component mount for immediate redirection
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("user");
//       let role;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           role = parsedUser.role;
//           setUserRole(role);
//         } catch (error) {
//           console.error("Error parsing user data from localStorage:", error);
//         }
//       }

//       // If user is not admin or manager, redirect them away
//       if (role !== 'admin' && role !== 'manager') {
//         setTimeout(() => {
//           localStorage.clear()
//           window.location.href = '/api/logout'
//         }, 1500); // Redirect to login page
//       }
//     }
//   }, [router]); // Depend on router to ensure effect runs if router object changes (though usually static)

//   // Handles changes in any form input field and updates the formData state
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   // Resets all form fields and validation state
//   const resetForm = () => {
//     setFormData({
//       clientName: '',
//       clientMobile: '',
//       query_license: '',
//       mining_license: '',
//       near_village: '',
//       tehsil: '',
//       district: '',
//       state: '',
//       country: ''
//     });
//     setValidated(false); // Reset validation visual feedback
//   };

//   // Generates an ISO 8601 formatted timestamp, suitable for database date fields
//   const getFormattedDate = () => {
//     const now = new Date();
//     return now.toISOString();
//   };

//   // Handles the form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevents the default browser form submission (page reload)
//     const form = e.currentTarget; // Get the form element for validation check
//     setValidated(true); // Triggers Bootstrap's validation feedback

//     // If form validation fails (e.g., required fields are empty), stop submission
//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//       return;
//     }

//     setIsSubmitting(true); // Disable the submit button to prevent multiple submissions

//     // Prepare the data to be sent to the API, adding creation/update timestamps
//     const newClient = {
//       ...formData,
//       clientCreatedAt: getFormattedDate(), // Timestamp for when the client record was created
//       clientUpdatedAt: getFormattedDate(), // Timestamp for the last update (initially same as created)
//     };

//     try {
//       // Send a POST request to your API endpoint
//       const response = await fetch('/api/client-accounts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json' // Indicate that the request body is JSON
//         },
//         body: JSON.stringify(newClient) // Convert the form data object to a JSON string
//       });

//       // Check if the API response was successful (status code 2xx)
//       if (response.ok) {
//         setAlertVariant('success');
//         setAlertMessage('Client account created successfully!');
//         setShowAlert(true);
//         // After a short delay, hide the alert, clear the form, and navigate to the view page
//         setTimeout(() => {
//           setShowAlert(false);
//           resetForm();
//           router.push('/viewclient-account'); // Navigate to the page showing all client accounts
//         }, 2000); // 2-second delay
//       } else {
//         // If API response indicates an error, parse the error message and display it
//         const error = await response.json();
//         setAlertVariant('danger');
//         setAlertMessage(error.message || 'Something went wrong.'); // Use API's error message or a generic one
//         setShowAlert(true);
//         setIsSubmitting(false); // Re-enable the submit button
//       }
//     } catch (err) {
//       // Handle network errors (e.g., API is unreachable)
//       setAlertVariant('danger');
//       setAlertMessage('Network error. Please try again.');
//       setShowAlert(true);
//       setIsSubmitting(false); // Re-enable the submit button
//     }
//   };

//   // Render nothing or a loading spinner if the role hasn't been determined yet
//   if (userRole === null) {
//     return <p className="text-center mt-5">Loading...</p>;
//   }

//   // Render the form only if the user has admin or manager role
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     // This case should ideally be handled by the middleware, but provides client-side feedback
//     return (
//       <>
//         <Container className="mt-4 text-center">
//           <Alert variant="danger">
//             You do not have permission to access this page. Please log in with appropriate credentials.
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-md-75 w-xl-50 mx-auto my-5">
//         <h4 className="mb-3 text-center fw-bold fs-4">Add New Client Account</h4>

//         {/* Alert for success or error feedback */}
//         {showAlert && (
//           <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
//             {alertMessage}
//           </Alert>
//         )}

//         {/* Client Account Registration Form */}
//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             {/* Left Column for Client Details */}
//             <Col md={6}>
//               <Form.Group className="mb-3" controlId="clientName">
//                 <Form.Label className="fw-bold">Client's Name <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="clientName"
//                   required // Makes this field mandatory
//                   value={formData.clientName}
//                   onChange={handleChange}
//                   placeholder="Enter full name"
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Client name is required. {/* Message displayed if validation fails */}
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="clientMobile">
//                 <Form.Label className="fw-bold">Client's Mobile Number <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="tel"
//                   name="clientMobile"
//                   required
//                   pattern="[0-9]{10}" // Regex for 10-digit numbers
//                   value={formData.clientMobile}
//                   onChange={handleChange}
//                   placeholder="10-digit mobile number"
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Enter valid 10-digit mobile number.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="query_license">
//                 <Form.Label className="fw-bold">Client's Query License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="query_license"
//                   value={formData.query_license}
//                   onChange={handleChange}
//                   placeholder="Enter query license"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="mining_license">
//                 <Form.Label className="fw-bold">Client's Mining License</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="mining_license"
//                   value={formData.mining_license}
//                   onChange={handleChange}
//                   placeholder="Enter mining license"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="near_village">
//                 <Form.Label className="fw-bold">Nearby Village</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="near_village"
//                   value={formData.near_village}
//                   onChange={handleChange}
//                   placeholder="Enter nearby village"
//                 />
//               </Form.Group>
//             </Col>

//             {/* Right Column for Location Details */}
//             <Col md={6}>
//               <Form.Group className="mb-3" controlId="tehsil">
//                 <Form.Label className="fw-bold">Tehsil</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tehsil"
//                   value={formData.tehsil}
//                   onChange={handleChange}
//                   placeholder="Enter tehsil"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="district">
//                 <Form.Label className="fw-bold">District</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="district"
//                   value={formData.district}
//                   onChange={handleChange}
//                   placeholder="Enter district"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="state">
//                 <Form.Label className="fw-bold">State</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   placeholder="Enter state"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3" controlId="country">
//                 <Form.Label className="fw-bold">Country</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   placeholder="Enter country"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Form Actions (Submit and Reset Buttons) */}
//           <div className="text-center d-flex justify-content-center gap-2 flex-wrap mt-3">
//             <Button
//               type="submit"
//               variant="success"
//               className="fw-bold px-4 rounded-3"
//               disabled={isSubmitting} // Button disabled when form is submitting
//             >
//               {isSubmitting ? 'Processing...' : 'Create Client Account'} {/* Changes text while submitting */}
//             </Button>
//             <Button
//               type="button" // Important: 'button' to prevent form submission
//               variant="secondary"
//               className="fw-bold px-4 rounded-3"
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
// export default AddClientAccount;

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import Header from '../components/Header';

const AddClientAccount = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: '',
    clientMobile: '',
    query_license: '',
    mining_license: '',
    near_village: '',
    tehsil: '',
    district: '',
    state: '',
    country: ''
  });

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      let role;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role);
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }

      if (role !== 'admin' && role !== 'manager') {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/api/logout';
        }, 1500);
      }
    }
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientMobile: '',
      query_license: '',
      mining_license: '',
      near_village: '',
      tehsil: '',
      district: '',
      state: '',
      country: ''
    });
    setValidated(false);
  };

  const getFormattedDate = () => {
    const now = new Date();
    return now.toISOString();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setValidated(true);

    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setIsSubmitting(true);

    try {
      // Check for existing account with same clientName, query_license, and near_village (case-insensitive)
      const checkRes = await fetch('/api/client-accounts');
      const existingClients = await checkRes.json();

      const isDuplicate = existingClients?.docs?.some((client) =>
        client.clientName?.toLowerCase() === formData.clientName.toLowerCase() &&
        client.query_license?.toLowerCase() === formData.query_license.toLowerCase() &&
        client.near_village?.toLowerCase() === formData.near_village.toLowerCase()
      );

      if (isDuplicate) {
        setAlertVariant('danger');
        setAlertMessage('This client account already exists. Duplicate combination not allowed.');
        setShowAlert(true);
        setIsSubmitting(false);

        // Auto-reset form after 3 seconds
        setTimeout(() => {
          resetForm();
          setShowAlert(false);
        }, 3000);

        return;
      }

      const newClient = {
        ...formData,
        clientCreatedAt: getFormattedDate(),
        clientUpdatedAt: getFormattedDate(),
      };

      const response = await fetch('/api/client-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient)
      });

      if (response.ok) {
        setAlertVariant('success');
        setAlertMessage('Client account created successfully!');
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          resetForm();
          router.push('/viewclient-account');
        }, 2000);
      } else {
        const error = await response.json();
        setAlertVariant('danger');
        setAlertMessage(error.message || 'Something went wrong.');
        setShowAlert(true);
        setIsSubmitting(false);
      }
    } catch (err) {
      setAlertVariant('danger');
      setAlertMessage('Network error. Please try again.');
      setShowAlert(true);
      setIsSubmitting(false);
    }
  };

  if (userRole === null) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <Container className="mt-4 text-center">
        <Alert variant="danger">
          You do not have permission to access this page. Please log in with appropriate credentials.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-md-75 w-xl-50 mx-auto my-5">
        <h4 className="mb-3 text-center fw-bold fs-4">Add New Client Account</h4>

        {showAlert && (
          <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
            {alertMessage}
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="clientName">
                <Form.Label className="fw-bold">Client's Name <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="clientName"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                />
                <Form.Control.Feedback type="invalid">
                  Client name is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="clientMobile">
                <Form.Label className="fw-bold">Client's Mobile Number <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="tel"
                  name="clientMobile"
                  required
                  pattern="[0-9]{10}"
                  value={formData.clientMobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid 10-digit mobile number.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="query_license">
                <Form.Label className="fw-bold">Client's Query License <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="query_license"
                  required
                  value={formData.query_license}
                  onChange={handleChange}
                  placeholder="Enter query license"
                />
                <Form.Control.Feedback type="invalid">
                  Query license is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="mining_license">
                <Form.Label className="fw-bold">Client's Mining License</Form.Label>
                <Form.Control
                  type="text"
                  name="mining_license"
                  value={formData.mining_license}
                  onChange={handleChange}
                  placeholder="Enter mining license"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="near_village">
                <Form.Label className="fw-bold">Nearby Village <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  name="near_village"
                  required
                  value={formData.near_village}
                  onChange={handleChange}
                  placeholder="Enter nearby village"
                />
                <Form.Control.Feedback type="invalid">
                  Nearby village is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3" controlId="tehsil">
                <Form.Label className="fw-bold">Tehsil</Form.Label>
                <Form.Control
                  type="text"
                  name="tehsil"
                  value={formData.tehsil}
                  onChange={handleChange}
                  placeholder="Enter tehsil"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="district">
                <Form.Label className="fw-bold">District</Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="Enter district"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="state">
                <Form.Label className="fw-bold">State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="country">
                <Form.Label className="fw-bold">Country</Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center d-flex justify-content-center gap-2 flex-wrap mt-3">
            <Button
              type="submit"
              variant="success"
              className="fw-bold px-4 rounded-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Create Client Account'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="fw-bold px-4 rounded-3"
              onClick={resetForm}
            >
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddClientAccount;
