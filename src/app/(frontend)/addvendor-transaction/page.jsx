// 'use client'; // Required for Next.js client-side features like useRouter
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// // Bootstrap components for layout and form UI
// import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
// // FontAwesome and React Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
// import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
// import { TbPlus, TbTransactionRupee } from 'react-icons/tb';
// // Reusable site-wide header
// import Header from '../components/Header';

// const AddVendorTransaction = () => {
//   const router = useRouter(); // To navigate between pages programmatically

//   // Store all active vendor objects from backend (with _id and name)
//   const [vendors, setVendors] = useState([]);
//   const [loadingVendors, setLoadingVendors] = useState(true); // To show spinner during loading
//   const [submitting, setSubmitting] = useState(false); // To show spinner during save

//   // Main form values
//   const [form, setForm] = useState({
//     vendorName: '', // This will store the vendor's name for the input, but we'll submit the ID
//     totalAmount: '',
//     tokenAmount: '',
//     description: '',
//   });

//   // UI helper: track work stages
//   const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

//   // Error display
//   const [error, setError] = useState('');

//   // Fetch all vendor accounts from the backend API
//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         const res = await fetch('/api/vendor'); // Fetch all vendors
//         const data = await res.json();
//         // Assuming the API returns active vendors or all vendors that can be used.
//         // If not, you might need to filter them here.
//         setVendors(data?.docs || []);
//       } catch (err) {
//         console.error('Error in fetching vendors:', err);
//         setError('Failed to fetch vendors. Please try again.');
//         setVendors([]);
//       } finally {
//         setLoadingVendors(false); // Hide loading spinner
//       }
//     };

//     fetchVendors();
//   }, []);

//   // Update form values
//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(''); // Clear error when user types
//   };

//   // Update a specific working stage by its index
//   const updateStage = (index, field, value) => {
//     const updated = [...workingStages];
//     updated[index][field] = value;
//     setWorkingStages(updated);
//   };

//   // Add a new empty working stage
//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: '', amount: '' }]);
//   };

//   // Remove a working stage by its index
//   const removeStage = (index) => {
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, i) => i !== index));
//     }
//   };

//   // Calculate total credits = token amount + all stage amounts
//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return token + workTotal;
//   };

//   // Calculate the remaining amount
//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   // Reset all form fields to their initial state
//   const handleReset = () => {
//     setForm({
//       vendorName: '',
//       totalAmount: '',
//       tokenAmount: '',
//       description: '',
//     });
//     setWorkingStages([{ work: '', amount: '' }]);
//     setError('');
//   };

//   // Handle the final form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Find the selected vendor object to get its ID
//     const selectedVendor = vendors.find(
//       (vendor) => vendor.vendorName === form.vendorName || vendor._id === form.vendorName
//     );

//     // If no valid vendor is found, show an error
//     if (!selectedVendor) {
//       setError(`Invalid vendor selected: "${form.vendorName}"`);
//       return;
//     }

//     // Prepare the payload for the backend API
//     const payload = {
//       vendorName: selectedVendor.id || selectedVendor._id, // Send the ID for the relationship
//       totalAmount: parseFloat(form.totalAmount),
//       tokenAmount: parseFloat(form.tokenAmount),
//       totalCredit: getTotalCredit(),
//       remainingAmount: getRemainingAmount(),
//       workingStage: workingStages.map((s) => ({
//         workingStage: s.work,
//         workingDescription: s.amount,
//       })),
//       description: form.description,
//       vendorCreatedAt: new Date().toISOString(),
//       vendorUpdatedAt: new Date().toISOString(),
//     };

//     try {
//       setSubmitting(true); // Show spinner while saving

//       // Submit POST request to the backend
//       const res = await fetch('/api/vendor-transaction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         router.push('/viewvendor-transaction'); // Redirect on success
//       } else {
//         const result = await res.json();
//         console.error(result);
//         setError('Save failed. Please try again.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An unexpected error occurred.');
//     } finally {
//       setSubmitting(false); // Hide spinner
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="my-3 p-3 p-sm-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
//         <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
//           <TbTransactionRupee className="fs-1 mb-1" /> Add Vendor Transaction
//         </h4>

//         {/* Loading spinner while fetching vendors */}
//         {loadingVendors && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <div className="fw-semibold mt-2">Loading Please Wait...</div>
//           </div>
//         )}

//         {/* Alert if no vendors are found */}
//         {!loadingVendors && vendors.length === 0 && (
//           <Alert variant="danger" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" />
//             No active vendors found. Please add a Vendor Account first.
//           </Alert>
//         )}

//         {/* Show error if any */}
//         {error && (
//           <Alert variant="danger" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" /> {error}
//           </Alert>
//         )}

//         {/* Form Section - rendered only when not loading and vendors are available */}
//         {!loadingVendors && vendors.length > 0 && (
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold fs-5">
//                 Vendor Name <span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 list="vendor-options"
//                 name="vendorName"
//                 value={form.vendorName}
//                 onChange={handleFormChange}
//                 placeholder="Select or type Vendor Name"
//                 required
//               />
//               <datalist id="vendor-options">
//                 {vendors.map((vendor) => (
//                   <option key={vendor._id} value={vendor.vendorName} />
//                 ))}
//               </datalist>
//             </Form.Group>

//             {/* Amount Fields */}
//             <Row className="my-4">
//               <Col sm={6} className="pb-3 pb-md-0">
//                 <Form.Label className="fw-bold fs-5">
//                   Total Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                   <span className="text-danger ms-1">*</span>
//                 </Form.Label>
//                 <Form.Control type="number" name="totalAmount" placeholder="₹ Total Amount" value={form.totalAmount} onChange={handleFormChange} required />
//               </Col>
//               <Col sm={6}>
//                 <Form.Label className="fw-bold fs-5">
//                   Token Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                   <span className="text-danger ms-1">*</span>
//                 </Form.Label>
//                 <Form.Control type="number" name="tokenAmount" placeholder="₹ Advance/Token Amount" value={form.tokenAmount} onChange={handleFormChange} required />
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-between align-items-center my-4">
//               <h5 className="fw-bold text-dark fs-5">
//                 <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
//                 Working Stages
//               </h5>
//               <Button variant="warning" onClick={addStage} className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1">
//                 <TbPlus className="me-1 fw-bold fs-5" size={25} /> Add Stage
//               </Button>
//             </div>

//             {workingStages.map((stage, index) => (
//               <Row key={index} className="my-2">
//                 <Col sm={5} className="pb-3 pb-md-0">
//                   <Form.Control placeholder="Work Description" value={stage.work} onChange={(e) => updateStage(index, 'work', e.target.value)} />
//                 </Col>
//                 <Col sm={4} className="pb-3 pb-md-0">
//                   <Form.Control type="number" placeholder="₹ Amount" value={stage.amount} onChange={(e) => updateStage(index, 'amount', e.target.value)} />
//                 </Col>
//                 <Col sm={3} className="pb-3 pb-md-0">
//                   <Button variant="danger" onClick={() => removeStage(index)} disabled={workingStages.length === 1} className="w-75 fw-bold text-white">
//                     Remove
//                   </Button>
//                 </Col>
//               </Row>
//             ))}

//             {/* Credit Summary */}
//             <Row className="my-4">
//               <Col sm={6} className="pb-3 pb-md-0">
//                 <Form.Label className="fw-bold fs-5">Total Credits (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
//                 <Form.Control value={getTotalCredit()} readOnly className="bg-white" />
//               </Col>
//               <Col sm={6} className="pb-3 pb-md-0">
//                 <Form.Label className="fw-bold fs-5">Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
//                 <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
//               </Col>
//             </Row>

//             {/* Optional Description */}
//             <Form.Group className="my-4">
//               <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
//               <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={handleFormChange} placeholder="Extra notes or remarks..." />
//             </Form.Group>

//             {/* Submit & Reset Buttons */}
//             <div className="text-center d-flex justify-content-center gap-3 flex-wrap mt-4">
//               <Button type="submit" variant="success" disabled={submitting} className="fw-bold px-4 py-2">
//                 {submitting ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Saving Transaction...
//                   </>
//                 ) : (
//                   <>
//                     <FaSave className="me-1 fs-5" /> Save Transaction
//                   </>
//                 )}
//               </Button>
//               <Button type="button" variant="secondary" className="px-4 py-2 fw-bold" onClick={handleReset}>
//                 Reset Form
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Container>
//     </>
//   );
// };

// export default AddVendorTransaction;

'use client'; // Required for Next.js client-side features like useRouter, useState, and useEffect
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Bootstrap components for layout and form UI
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

// FontAwesome and React Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
import { TbPlus, TbTransactionRupee } from 'react-icons/tb';
// Reusable site-wide header
import Header from '../components/Header';

const AddVendorTransaction = () => {
  const router = useRouter(); // To navigate between pages programmatically

  // State for user role to implement client-side access control
  const [userRole, setUserRole] = useState(null); // Initially null, then 'admin', 'manager', or 'guest'

  // Store all active vendor objects from backend (with _id and name)
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true); // To show spinner during loading vendors
  const [submitting, setSubmitting] = useState(false); // To show spinner during transaction save

  // Main form values for a new vendor transaction
  const [form, setForm] = useState({
    vendorName: '', // This will store the vendor's name for the input (data-list), but we'll submit the ID
    totalAmount: '',
    tokenAmount: '',
    description: '',
  });

  // UI helper: track work stages (multiple entries possible)
  const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

  // Error display for form submission or data fetching
  const [error, setError] = useState('');

  // 🚀 ACCESS CONTROL: Check user role on component mount
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure this code runs only in the browser (client-side)
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
      // This is a client-side gate; a strong server-side check is also crucial for the API routes.
      if (role !== 'admin' && role !== 'manager') {
        console.log(`Unauthorized access attempt to AddVendorTransaction by user with role: ${role || 'undefined'}. Redirecting...`);
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1500); //Redirect to login page
      }
    }
  }, [router]); // Dependency array: re-run if router object changes (rare, but good practice)


  // 🚀 PERFORMANCE / DATA FETCHING: Fetch all vendor accounts from the backend API
  useEffect(() => {
    // Only fetch vendors if the user is authorized.
    // userRole state updates after the first useEffect, so this runs after role is determined.
    if (userRole === 'admin' || userRole === 'manager') {
      const fetchVendors = async () => {
        try {
          const res = await fetch('/api/vendor'); // Fetch all vendors from your backend API
          if (!res.ok) {
            throw new Error(`Failed to fetch vendors: ${res.statusText}`);
          }
          const data = await res.json();
          setVendors(data?.docs || []); // Assuming the API returns an object with a 'docs' array
        } catch (err) {
          console.error('Error fetching vendors:', err);
          setError('Failed to load vendors. Please try again or check your network.');
          setVendors([]); // Clear vendors on error
        } finally {
          setLoadingVendors(false); // Hide loading spinner for vendors
        }
      };

      fetchVendors();
    }
  }, [userRole]); // Dependency array: re-run when userRole changes

  // Update form values for the main transaction details
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear any previous error when user starts typing
  };

  // Update a specific working stage entry by its index
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  // Add a new empty working stage row to the form
  const addStage = () => {
    setWorkingStages([...workingStages, { work: '', amount: '' }]);
  };

  // Remove a working stage row by its index
  const removeStage = (index) => {
    // Prevent removing the last stage to always have at least one input field
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  // Calculate total credits: sum of token amount and all individual working stage amounts
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0; // Convert to number, default to 0 if invalid
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return token + workTotal;
  };

  // Calculate the remaining amount (Total Amount - Total Credits)
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // Reset all form fields to their initial empty state
  const handleReset = () => {
    setForm({
      vendorName: '',
      totalAmount: '',
      tokenAmount: '',
      description: '',
    });
    setWorkingStages([{ work: '', amount: '' }]); // Reset to one empty stage
    setError(''); // Clear any error messages
  };

  // Handle the final form submission to create a new vendor transaction
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)

    // Basic client-side validation before sending to API
    if (!form.vendorName || !form.totalAmount || !form.tokenAmount) {
      setError('Please fill in Vendor Name, Total Amount, and Token Amount.');
      return;
    }

    // Find the selected vendor object to get its actual ID (important for database relationships)
    const selectedVendor = vendors.find(
      (vendor) => vendor.vendorName === form.vendorName || vendor._id === form.vendorName
    );

    // If no valid vendor is found (e.g., user typed a non-existent name)
    if (!selectedVendor) {
      setError(`Invalid vendor selected: "${form.vendorName}". Please select from the list or add a new vendor.`);
      return;
    }

    // Prepare the payload for the backend API
    const payload = {
      vendorName: selectedVendor.id || selectedVendor._id,
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(), // Calculated field
      remainingAmount: getRemainingAmount(), // Calculated field
      // Map working stages to match backend schema (e.g., 'workingStage' and 'workingDescription')
      workingStage: workingStages.map((s) => ({
        workingStage: s.work,       // Ensure these match your Payload CMS field names
        workingDescription: s.amount, // Changed from s.amount as it seems to be description for stage
      })),
      description: form.description,
      // Add creation and update timestamps (server might auto-generate these, but good to send if needed)
      vendorCreatedAt: new Date().toISOString(),
      vendorUpdatedAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true); // Show spinner while saving

      // Submit POST request to the backend for vendor transactions
      const res = await fetch('/api/vendor-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Transaction saved successfully
        handleReset(); // Clear the form
        router.push('/viewvendor-transaction'); // Redirect to view transactions page
      } else {
        const result = await res.json();
        console.error('API submission error:', result);
        // Display specific error message from the backend if available, otherwise a generic one
        setError(result.message || 'Failed to save transaction. Please check your inputs and try again.');
      }
    } catch (err) {
      console.error('Network or unexpected error during submission:', err);
      setError('An unexpected error occurred. Please check your network connection.');
    } finally {
      setSubmitting(false); // Hide spinner regardless of success or failure
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

  // If unauthorized, show an error message and indicate redirection.
  // This client-side check complements the server-side middleware (which should also be in place).
  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <>
        <Container className="mt-5 text-center">
          <Alert variant="danger" className="fw-semibold">
            <FaExclamationTriangle className="me-2" />
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
      <Container className="my-3 p-3 p-sm-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Add Vendor Transaction
        </h4>

        {/* Loading spinner while fetching vendors list */}
        {loadingVendors && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Vendor List...</div>
          </div>
        )}

        {/* Alert if no vendors are found after loading */}
        {!loadingVendors && vendors.length === 0 && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No active vendors found. Please add a Vendor Account first via "Vendor Accounts" menu.
          </Alert>
        )}

        {/* Show generic error message if any */}
        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {/* Form Section - rendered only when not loading and vendors are available */}
        {!loadingVendors && vendors.length > 0 && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">
                Vendor Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                list="vendor-options" // Links to the datalist for autofill suggestions
                name="vendorName"
                value={form.vendorName}
                onChange={handleFormChange}
                placeholder="Select or type Vendor Name"
                required // Makes this field mandatory
              />
              <datalist id="vendor-options">
                {vendors.map((vendor) => (
                  // The value should be the vendorName for display, but ensure you match by ID on submit
                  <option key={vendor._id} value={vendor.vendorName} />
                ))}
              </datalist>
            </Form.Group>

            {/* Amount Fields (Total Amount and Token Amount) */}
            <Row className="my-4">
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">
                  Total Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                  <span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  placeholder="₹ Total Amount"
                  value={form.totalAmount}
                  onChange={handleFormChange}
                  required // Makes this field mandatory
                  min="0" // Prevents negative values
                />
              </Col>
              <Col sm={6}>
                <Form.Label className="fw-bold fs-5">
                  Token Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                  <span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  name="tokenAmount"
                  placeholder="₹ Advance/Token Amount"
                  value={form.tokenAmount}
                  onChange={handleFormChange}
                  required // Makes this field mandatory
                  min="0" // Prevents negative values
                />
              </Col>
            </Row>

            {/* Working Stages Section */}
            <div className="d-flex justify-content-between align-items-center my-4">
              <h5 className="fw-bold text-dark fs-5">
                <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
                Working Stages
              </h5>
              <Button
                variant="warning"
                onClick={addStage}
                className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1"
              >
                <TbPlus className="me-1 fw-bold fs-5" size={25} /> Add Stage
              </Button>
            </div>

            {/* Render each working stage dynamically */}
            {workingStages.map((stage, index) => (
              <Row key={index} className="my-2 align-items-center"> {/* Added align-items-center for vertical alignment */}
                <Col sm={5} className="pb-3 pb-md-0">
                  <Form.Control
                    placeholder="Work Description (e.g., Material cost, Labor fee)"
                    value={stage.work}
                    onChange={(e) => updateStage(index, 'work', e.target.value)}
                  />
                </Col>
                <Col sm={4} className="pb-3 pb-md-0">
                  <Form.Control
                    type="number"
                    placeholder="₹ Amount"
                    value={stage.amount}
                    onChange={(e) => updateStage(index, 'amount', e.target.value)}
                    min="0" // Prevents negative values
                  />
                </Col>
                <Col sm={3} className="pb-3 pb-md-0 d-grid"> {/* d-grid makes button full width */}
                  <Button
                    variant="danger"
                    onClick={() => removeStage(index)}
                    disabled={workingStages.length === 1} // Disable remove button if only one stage
                    className="fw-bold text-white"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}

            {/* Credit Summary (Total Credits and Remaining Amount) */}
            <Row className="my-4">
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Total Credits (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control
                  value={getTotalCredit().toFixed(2)} // Display with 2 decimal places
                  readOnly // This field is calculated, not editable
                  className="bg-white"
                />
              </Col>
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control
                  value={getRemainingAmount().toFixed(2)} // Display with 2 decimal places
                  readOnly // This field is calculated, not editable
                  className="bg-white"
                />
              </Col>
            </Row>

            {/* Optional Description for the entire transaction */}
            <Form.Group className="my-4">
              <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Add any extra notes or remarks about this transaction..."
              />
            </Form.Group>

            {/* Submit & Reset Buttons */}
            <div className="text-center d-flex justify-content-center gap-3 flex-wrap mt-4">
              <Button
                type="submit"
                variant="success"
                disabled={submitting} // Disable button while submitting
                className="fw-bold px-4 py-2"
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving Transaction...
                  </>
                ) : (
                  <>
                    <FaSave className="me-1 fs-5" /> Save Transaction
                  </>
                )}
              </Button>
              <Button
                type="button" // Important: type="button" to prevent accidental form submission
                variant="secondary"
                className="px-4 py-2 fw-bold"
                onClick={handleReset}
                disabled={submitting} // Disable reset button while submitting
              >
                Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default AddVendorTransaction;