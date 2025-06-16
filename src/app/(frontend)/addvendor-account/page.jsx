//page addvendor-account.jsx
// 'use client'; // Ensures this runs in the browser (important for localStorage)
// import React, { useState } from 'react';
// import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
// import { useRouter } from 'next/navigation'; // useRouter for navigation
// import Header from '../components/Header'; // Adjust path if needed

// const AddVendorAccount = () => {
//   const [form, setForm] = useState({
//     name: '',
//     mobile: '',
//     queryLicense: '',
//     miningLicense: '',
//     village: '',
//     tehsil: '',
//     district: '',
//     state: '',
//     country: '',
//   });

//   const [validated, setValidated] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [alertMessage, setAlertMessage] = useState('');
//   const [alertVariant, setAlertVariant] = useState('success');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter(); // useRouter instead of useNavigate

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   // Reset form values
//   const resetForm = () => {
//     setForm({
//       name: '',
//       mobile: '',
//       queryLicense: '',
//       miningLicense: '',
//       village: '',
//       tehsil: '',
//       district: '',
//       state: '',
//       country: '',
//     });
//     setValidated(false);
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formElement = e.currentTarget;
//     setValidated(true);

//     if (formElement.checkValidity() === false) {
//       e.stopPropagation();
//       return;
//     }

//     setIsSubmitting(true);

//     const existingAccounts =
//       JSON.parse(localStorage.getItem('vendorAccounts')) || [];

//     const mobileExists = existingAccounts.some(
//       (acc) => acc.mobile === form.mobile
//     );

//     if (mobileExists) {
//       setAlertVariant('danger');
//       setAlertMessage('Vendor with this mobile already exists.');
//       setShowAlert(true);
//       setIsSubmitting(false);

//       setTimeout(() => {
//         setShowAlert(false);
//         resetForm();
//       }, 3000);
//       return;
//     }
// const getFormattedDate = () => {
//   const current = new Date();
//   const date = current.toLocaleDateString('en-GB'); // DD/MM/YYYY
//   const time = current.toLocaleTimeString('en-IN'); // HH:MM:SS
//   return `${date} ${time}`;
// };
//     const newVendor = {
//       ...form,
//       createdAt: getFormattedDate(),
//       status: true,
//     };

//     existingAccounts.push(newVendor);
//     localStorage.setItem('vendorAccounts', JSON.stringify(existingAccounts));

//     setAlertVariant('success');
//     setAlertMessage('Vendor account added successfully!');
//     setShowAlert(true);

//     setTimeout(() => {
//       setShowAlert(false);
//       resetForm();
//       router.push('/viewvendor-account'); // Redirect after success
//     }, 3000);
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 bg-light rounded-4 p-4 shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto">
//         <h4 className="text-center fw-bold mb-3 fs-4">
//           Add New Vendor Account
//         </h4>

//         {showAlert && (
//           <Alert
//             variant={alertVariant}
//             onClose={() => setShowAlert(false)}
//             dismissible
//           >
//             {alertMessage}
//           </Alert>
//         )}

//         <Form noValidate validated={validated} onSubmit={handleSubmit}>
//           <Row>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Vendor's Name <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="name"
//                   placeholder="Enter full name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Name is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Mobile Number <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="tel"
//                   name="mobile"
//                   pattern="[0-9]{10}"
//                   placeholder="10-digit number"
//                   value={form.mobile}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Enter valid 10-digit mobile number.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Query License <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="queryLicense"
//                   placeholder="Query License ID"
//                   value={form.queryLicense}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Query license required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Mining License <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="miningLicense"
//                   placeholder="Mining License ID"
//                   value={form.miningLicense}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Mining license required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Village <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="village"
//                   placeholder="Nearby village"
//                   value={form.village}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Village is required.
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>

//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Tehsil <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="tehsil"
//                   placeholder="Tehsil"
//                   value={form.tehsil}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Tehsil is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">District <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="district"
//                   placeholder="District"
//                   value={form.district}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   District is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">State <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="state"
//                   placeholder="State"
//                   value={form.state}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   State is required.
//                 </Form.Control.Feedback>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold">Country <span className="text-danger">*</span></Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="country"
//                   placeholder="Country"
//                   value={form.country}
//                   onChange={handleChange}
//                   required
//                 />
//                 <Form.Control.Feedback type="invalid">
//                   Country is required.
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3 ">
//             <Button type="submit" variant="primary" className="px-4 fw-bold rounded-3" disabled={isSubmitting}>
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

'use client'; // Required for using useRouter and fetch in Next.js (client-side)
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useRouter } from 'next/navigation'; // useRouter lets us programmatically redirect pages
import Header from '../components/Header'; // Import the Header component (adjust path as needed)

const AddVendorAccount = () => {
  // Form data state (controlled inputs)
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

  // Other states for validation, alerts, and loading
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter(); // Next.js navigation hook

  // Helper: Get current date in ISO format for vendorCreatedAt field
  const getCurrentDate = () => new Date().toISOString();

  // const getFormattedDate = () => {
  //   const current = new Date();
  //   const date = current.toLocaleDateString('en-GB'); // DD/MM/YYYY
  //   const time = current.toLocaleTimeString('en-IN'); // HH:MM:SS
  //   return `${date} ${time}`;
  // };

  // Helper: Reset all form fields
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
    setValidated(false);
  };

  // Handle form input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle form submit (send data to Payload CMS backend)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload
    const formElement = e.currentTarget;
    setValidated(true); // Mark the form as validated

    // If required fields are invalid, do not proceed
    if (formElement.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setIsSubmitting(true); // Start loading spinner on button

    try {
      // Create vendor payload to send to backend
      const vendorData = {
        ...form,
        vendorCreatedAt: getCurrentDate(),  // Set creation date
        vendorUpdatedAt: getCurrentDate(),  // Optional: set update time too
      };

      // Send POST request to Payload CMS backend
      const response = await fetch('/api/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vendorData),
      });

      // Check if backend request was successful
      if (response.ok) {
        setAlertVariant('success');
        setAlertMessage('Vendor account added successfully!');
        setShowAlert(true);

        // Reset form and redirect after short delay
        setTimeout(() => {
          setShowAlert(false);
          resetForm();
          router.push('/viewvendor-account'); // Redirect to view page
        }, 2000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to add vendor.');
      }
    } catch (error) {
      // Handle errors (e.g., validation, network, server errors)
      setAlertVariant('danger');
      setAlertMessage(error.message);
      setShowAlert(true);
    } finally {
      setIsSubmitting(false); // Stop loading spinner
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4 bg-light rounded-4 p-4 shadow shadow-5 rounded-5 w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto my-5 ">
        <h4 className="text-center fw-bold mb-3 fs-4">
          Add New Vendor Account
        </h4>

        {/* Alert message */}
        {showAlert && (
          <Alert
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}

        {/* Bootstrap form with validation */}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            {/* Left Column */}
            <Col xs={12} md={6}>
              {/* Vendor Name */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Name <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="vendorName"
                  value={form.vendorName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Name is required.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Mobile */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Mobile Number <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="vendorMobile"
                  value={form.vendorMobile}
                  pattern="[0-9]{10}"
                  onChange={handleChange}
                  placeholder="10-digit number"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Enter valid 10-digit mobile number.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Query License */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Query License <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="query_license"
                  value={form.query_license}
                  onChange={handleChange}
                  placeholder="Query License ID"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Query license required.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Mining License */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Mining License <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="mining_license"
                  value={form.mining_license}
                  onChange={handleChange}
                  placeholder="Mining License ID"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Mining license required.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Village */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Nearby Village <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="near_village"
                  value={form.near_village}
                  onChange={handleChange}
                  placeholder="Nearby village"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Village is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            {/* Right Column */}
            <Col xs={12} md={6}>
              {/* Tehsil */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Tehsil
                </Form.Label>
                <Form.Control
                  type="text"
                  name="tehsil"
                  value={form.tehsil}
                  onChange={handleChange}
                  placeholder="Tehsil"
                />
              </Form.Group>

              {/* District */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's District <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  value={form.district}
                  onChange={handleChange}
                  placeholder="District"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  District is required.
                </Form.Control.Feedback>
              </Form.Group>

              {/* State */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's State <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  State is required.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Country */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Vendor's Country <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Country is required.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* Submit & Reset Buttons */}
          <div className="text-center d-flex gap-2 justify-content-center align-items-center my-3 ">
            <Button type="submit" variant="success" className="px-4 fw-bold rounded-3" disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Create Vendor Account'}
            </Button>
            <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={resetForm}>
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddVendorAccount;
