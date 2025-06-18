// // Add Client Transaction Page
// 'use client'; // Needed to use hooks like useRouter in Next.js (client-side code)
// // ✅ Import required dependencies, components and icons
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
// import Header from '../components/Header';
// import { TbTransactionRupee, TbPlus } from 'react-icons/tb';
// import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// const AddClientTransaction = () => {
//   const router = useRouter(); // For redirection after saving

//   // ✅ Store all client objects from backend (with _id and name)
//   const [clients, setClients] = useState([]);
//   const [loadingClients, setLoadingClients] = useState(true); // Show spinner during loading
//   const [submitting, setSubmitting] = useState(false); // Show spinner during save

//   // ✅ Main form values
//   const [form, setForm] = useState({
//     clientName: '', // This will be client _id (not the label)
//     totalAmount: '',
//     tokenAmount: '',
//     description: '',
//   });

//   // ✅ UI helper: track work stages
//   const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

//   // ✅ Error display
//   const [error, setError] = useState('');

//   // ✅ Fetch all client accounts from Payload CMS
//   useEffect(() => {
//     const fetchClients = async () => {
//       try {
//         const res = await fetch('/api/client-accounts');
//         const data = await res.json();
//         setClients(data?.docs || []);
//       } catch (err) {
//         console.error('Error fetching clients:', err);
//         setClients([]);
//       } finally {
//         setLoadingClients(false); // Hide loading spinner
//       }
//     };

//     fetchClients();
//   }, []);

//   // ✅ Update form values
//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//     setError(''); // Clear error when user types
//   };

//   // ✅ Update stage (by index)
//   const updateStage = (index, field, value) => {
//     const updated = [...workingStages];
//     updated[index][field] = value;
//     setWorkingStages(updated);
//   };

//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: '', amount: '' }]);
//   };

//   const removeStage = (index) => {
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, i) => i !== index));
//     }
//   };

//   // ✅ Total credits = token + stage amounts
//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return token + workTotal;
//   };

//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   const handleReset = () => {
//     setForm({
//       clientName: '',
//       totalAmount: '',
//       tokenAmount: '',
//       description: '',
//     });
//     setWorkingStages([{ work: '', amount: '' }]);
//     setError('');
//   };

//   // ✅ Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Find the client ID from the label
//     const selectedClient = clients.find(
//       (client) => client.clientName === form.clientName || client._id === form.clientName
//     );

//     // ✅ If no valid match, show error
//     if (!selectedClient) {
//       setError(`Invalid client selected: "${form.clientName}"`);
//       setTimeout(() => handleReset(), 3000);
//       return;
//     }

//     const payload = {
//       clientName: selectedClient.id || selectedClient._id, // ✅ Must send ID for relationship
//       totalAmount: parseFloat(form.totalAmount),
//       tokenAmount: parseFloat(form.tokenAmount),
//       totalCredit: getTotalCredit(),
//       remainingAmount: getRemainingAmount(),
//       workingStage: workingStages.map((s) => ({
//         workingStage: s.work,
//         workingDescription: s.amount,
//       })),
//       description: form.description,
//       clientCreatedAt: new Date().toISOString(),
//       clientUpdatedAt: new Date().toISOString(),
//     };

//     try {
//       setSubmitting(true); // Show spinner while saving
//       const res = await fetch('/api/client-transaction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         router.push('/viewclient-transaction'); // Success
//       } else {
//         const result = await res.json();
//         console.error(result);
//         setError('Save failed. Try again.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('An unexpected error occurred.');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
//         <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
//           <TbTransactionRupee className="fs-1 mb-1" /> Add Client Transaction
//         </h4>

//         {/* ✅ Loading spinner */}
//         {loadingClients && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <div className="fw-semibold mt-2">Loading Please Wait...</div>
//           </div>
//         )}

//         {/* ✅ Alert if no clients */}
//         {!loadingClients && clients.length === 0 && (
//           <Alert variant="danger" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" />
//             No client accounts found. Please add one first.
//           </Alert>
//         )}

//         {/* ✅ Show error if any */}
//         {error && (
//           <Alert variant="danger" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" /> {error}
//           </Alert>
//         )}

//         {/* ✅ Form Section */}
//         {!loadingClients && clients.length > 0 && (
//           <Form onSubmit={handleSubmit}>
//             <Form.Group className="mb-3">
//               <Form.Label className="fw-bold fs-5">
//                 Client Name <span className="text-danger">*</span>
//               </Form.Label>
//               <Form.Control
//                 list="client-options"
//                 name="clientName"
//                 value={form.clientName}
//                 onChange={handleFormChange}
//                 placeholder="Select or type Client Name"
//                 required
//               />
//               <datalist id="client-options">
//                 {clients.map((client) => (
//                   <option key={client._id} value={client.clientName} />
//                 ))}
//               </datalist>
//             </Form.Group>

//             {/* ✅ Amount Fields */}
//             <Row className="my-4">
//               <Col sm={6} className="pb-3 pb-md-0">
//                 <Form.Label className="fw-bold fs-5">
//                 Total Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                 <span className="text-danger ms-1">*</span>
//                 </Form.Label>
//                 <Form.Control type="number" name="totalAmount" placeholder="₹ Total Amount" value={form.totalAmount} onChange={handleFormChange} required />
//               </Col>
//               <Col sm={6}>
//                 <Form.Label className="fw-bold fs-5">
//                 Token Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                 <span className="text-danger ms-1">*</span>
//                 </Form.Label>
//                 <Form.Control type="number" name="tokenAmount" placeholder="₹ Advance/Token Amount" value={form.tokenAmount} onChange={handleFormChange} required />
//               </Col>
//             </Row>

//             <div className="d-flex justify-content-between align-items-center my-4">
//               <h5 className="fw-bold text-dark fs-5">
//                 <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
//                 Working Stages
//               </h5>
//               <Button variant="warning" onClick={addStage} className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1"><TbPlus className="me-1 fw-bold fs-5" size={25}/> Add Stage</Button>
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
//                   <Button variant="danger" onClick={() => removeStage(index)} disabled={workingStages.length === 1} className="w-75 fw-bold text-white">Remove</Button>
//                 </Col>
//               </Row>
//             ))}

//             {/* ✅ Credit Summary */}
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
//             {/* ✅ Optional Description */}
//             <Form.Group className="my-4">
//               <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
//               <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={handleFormChange} />
//             </Form.Group>

//             {/* ✅ Submit & Reset Buttons */}
//             <div className="text-center">
//               <Button type="submit" variant="success" className="fw-bold px-4 py-2 me-2" disabled={submitting}>
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
//               <Button variant="secondary" className="px-4 py-2 fw-bold" onClick={handleReset}>
//                 Reset Form
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Container>
//     </>
//   );
// };
// export default AddClientTransaction;
// Add Client Transaction Page
'use client'; // Needed to use hooks like useRouter, useState, useEffect in Next.js (client-side code)
// ✅ Import required dependencies
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Next.js navigation hook
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap'; // Bootstrap components
import Header from '../components/Header'; // Your custom Header component

// ✅ Import icons for better UI
import { TbTransactionRupee, TbPlus } from 'react-icons/tb'; // Transaction icon, Plus icon
import { FaSave, FaExclamationTriangle } from 'react-icons/fa'; // Save icon, Warning icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // For Font Awesome icons
import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'; // Specific Font Awesome icons

const AddClientTransaction = () => {
  const router = useRouter(); // Initialize router for programmatic navigation

  // ✅ State for user role for client-side access control
  const [userRole, setUserRole] = useState(null);

  // ✅ State to store all client objects fetched from the backend.
  // Each client object typically has an '_id' and 'clientName'.
  const [clients, setClients] = useState([]);
  // ✅ Loading state for fetching clients, to show a spinner.
  const [loadingClients, setLoadingClients] = useState(true);
  // ✅ Submitting state for saving the transaction, to disable button and show spinner.
  const [submitting, setSubmitting] = useState(false);

  // ✅ Main form values managed by React state.
  const [form, setForm] = useState({
    clientName: '', // This will hold the client's display name, but we'll send their ID to the API.
    totalAmount: '',
    tokenAmount: '',
    description: '',
  });

  // ✅ UI helper state: an array to manage dynamic "working stages" (e.g., specific work items and their costs).
  const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

  // ✅ State for displaying error messages to the user.
  const [error, setError] = useState('');
  // ✅ State for displaying success messages to the user.
  const [success, setSuccess] = useState('');

  // 1. Client-Side Access Control (runs once on component mount)
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure code runs only in the browser
      const userData = localStorage.getItem("user");
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role); // Set role to state
        } catch (error) {
          console.error("Error parsing user data from localStorage:", error);
        }
      }

      // If the user's role is not 'admin' or 'manager', redirect them.
      // 'guest' users should not access this page. Invalid credentials would typically result in no user data or 'guest' role.
      if (role !== 'admin' && role !== 'manager') {
        // Redirect to dashboard, login, or an unauthorized page
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1500); // Redirect to login page
      }
    }
  }, [router]); // Dependency array: re-run if router object changes (rare, but good practice)

  // 2. Fetch all client accounts from Payload CMS API (runs once on component mount)
  useEffect(() => {
    const fetchClients = async () => {
      // Only fetch if the user is authorized and not loading already
      if (userRole === 'admin' || userRole === 'manager') {
        setLoadingClients(true); // Indicate that client data is being loaded
        try {
          const res = await fetch('/api/client-accounts'); // API endpoint to get client accounts
          if (res.ok) {
            const data = await res.json();
            setClients(data?.docs || []); // Set the fetched clients (Payload CMS often returns 'docs' array)
          } else {
            // Handle API error during client fetch
            console.error('Failed to fetch clients:', res.status, res.statusText);
            setError('Failed to load client data. Please try again.');
            setClients([]); // Clear clients on error
          }
        } catch (err) {
          console.error('Error fetching clients:', err);
          setError('Network error while fetching clients.');
          setClients([]);
        } finally {
          setLoadingClients(false); // Hide loading spinner regardless of success or failure
        }
      }
    };

    // Only fetch clients once the userRole is determined and is authorized
    if (userRole) { // userRole is null initially, wait for it to be set by the first useEffect
      fetchClients();
    }
  }, [userRole]); // Depend on userRole to trigger fetch after role is set

  // ✅ Handler for main form field changes
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear any previous error when the user starts typing
    setSuccess(''); // Clear any previous success message
  };

  // ✅ Handler to update a specific working stage by its index
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  // ✅ Adds a new empty working stage row
  const addStage = () => {
    setWorkingStages([...workingStages, { work: '', amount: '' }]);
  };

  // ✅ Removes a working stage row by its index. Prevents removing the last one.
  const removeStage = (index) => {
    if (workingStages.length > 1) { // Ensure at least one stage remains
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  // ✅ Calculates the total credit (token amount + sum of all stage amounts)
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0; // Convert to number, default to 0 if invalid
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return token + workTotal;
  };

  // ✅ Calculates the remaining amount (total amount - total credits)
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // ✅ Resets all form fields and error/success messages
  const handleReset = () => {
    setForm({
      clientName: '',
      totalAmount: '',
      tokenAmount: '',
      description: '',
    });
    setWorkingStages([{ work: '', amount: '' }]); // Reset to one empty stage
    setError('');
    setSuccess('');
  };

  // ✅ Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission

    // Basic client-side validation
    if (!form.clientName || !form.totalAmount || !form.tokenAmount) {
      setError('Please fill in all required fields (Client Name, Total Amount, Token Amount).');
      return;
    }

    // Find the selected client's actual ID from the clients array
    const selectedClient = clients.find(
      (client) => client.clientName === form.clientName || client._id === form.clientName // Match by clientName from datalist
    );

    // If no valid client is found from the input, show an error
    if (!selectedClient) {
      setError(`Invalid client selected: "${form.clientName}"`);
      setTimeout(() => handleReset(), 3000);
      return;
    }

    setSubmitting(true); // Disable the submit button and show spinner

    // Prepare the payload to be sent to your API
    const payload = {
      clientName: selectedClient.id || selectedClient._id, // ✅ Must send ID for relationship
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      workingStage: workingStages.map((s) => ({
        workingStage: s.work,
        workingDescription: s.amount,
      })),
      description: form.description,
      clientCreatedAt: new Date().toISOString(),
      clientUpdatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/client-transaction', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, // Tell the server we are sending JSON
        body: JSON.stringify(payload), // Convert the JavaScript object to a JSON string
      });

      if (res.ok) { // Check if the response status is 2xx (success)
        setSuccess('Client transaction saved successfully!');
        // handleReset(); // Clear the form after successful submission
        setTimeout(() => {
          handleReset();
          setSuccess('');
          router.push('/viewclient-transaction'); // Redirect to view page after success
        }, 1000); // 1-second delay before redirect
      } else {
        const result = await res.json(); // Parse the error response from the server
        console.error('API Error:', result);
        setError(result.message || 'Failed to save transaction. Please check your inputs.'); // Display server-provided error or a generic one
        setSuccess(''); // Clear any previous success messages
      }
    } catch (err) {
      console.error('Network or unexpected error:', err);
      setError('An unexpected error occurred. Please try again later.');
      setSuccess(''); // Clear any previous success messages
    } finally {
      setSubmitting(false); // Re-enable the submit button
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

  // If unauthorized, show an error message and redirect.
  // This client-side check complements the server-side middleware.
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

  // Main render for authorized users
  return (
    <>
      <Header /> {/* Renders the navigation header */}
      <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Add Client Transaction
        </h4>

        {/* ✅ Loading spinner for fetching clients */}
        {loadingClients && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Client List...</div>
          </div>
        )}

        {/* ✅ Alert if no clients are found after loading */}
        {!loadingClients && clients.length === 0 && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No client accounts found. Please add a client first to create a transaction.
          </Alert>
        )}

        {/* ✅ Display general error messages */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')} className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {/* ✅ Display success messages */}
        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess('')} className="text-center fw-semibold">
            {success}
          </Alert>
        )}

        {/* ✅ Form Section: Only render if clients are loaded and available */}
        {!loadingClients && clients.length > 0 && (
          <Form onSubmit={handleSubmit}>
            {/* Client Name Selection */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">
                Client Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                list="client-options" // Links to the datalist for suggestions
                name="clientName"
                value={form.clientName}
                onChange={handleFormChange}
                placeholder="Select or type Client Name"
                required // Mark as required for HTML5 validation
              />
              <datalist id="client-options">
                {/* Populate datalist with client names for auto-completion */}
                {clients.map((client) => (
                  <option key={client._id} value={client.clientName} />
                ))}
              </datalist>
              <Form.Text className="text-muted">
                Start typing to see suggestions or select from the list.
              </Form.Text>
            </Form.Group>

            {/* ✅ Amount Fields (Total Amount and Token Amount) */}
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
                  required
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
                  required
                />
              </Col>
            </Row>

            {/* Section for Dynamic Working Stages */}
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

            {/* Render each working stage row */}
            {workingStages.map((stage, index) => (
              <Row key={index} className="my-2 align-items-center">
                <Col sm={5} className="pb-3 pb-md-0">
                  <Form.Control
                    placeholder="Work Description"
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
                  />
                </Col>
                <Col sm={3} className="pb-3 pb-md-0">
                  <Button
                    variant="danger"
                    onClick={() => removeStage(index)}
                    disabled={workingStages.length === 1} // Disable remove button if only one stage
                    className="w-75 fw-bold text-white"
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}

            {/* ✅ Credit Summary Section (Read-only fields) */}
            <Row className="my-4">
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Total Credits (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control
                  value={getTotalCredit().toFixed(2)} // Display with 2 decimal places
                  readOnly // Make the input read-only
                  className="bg-white" // Keep background white for read-only
                />
              </Col>
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control
                  value={getRemainingAmount().toFixed(2)} // Display with 2 decimal places
                  readOnly
                  className="bg-white"
                />
              </Col>
            </Row>

            {/* ✅ Optional Description Field */}
            <Form.Group className="my-4">
              <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
              <Form.Control
                as="textarea" // Renders a textarea
                rows={2} // Sets initial number of rows
                name="description"
                value={form.description}
                onChange={handleFormChange}
              />
            </Form.Group>

            {/* ✅ Submit & Reset Buttons */}
            <div className="text-center">
              <Button
                type="submit"
                variant="success"
                className="fw-bold px-4 py-2 me-2"
                disabled={submitting || loadingClients || clients.length === 0} // Disable if submitting, loading clients, or no clients
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
              <Button variant="secondary" className="px-4 py-2 fw-bold" onClick={handleReset} disabled={submitting}>
                Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default AddClientTransaction;