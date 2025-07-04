// Add Client Transaction Page
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
// 'use client'; // This directive marks the component as a Client Component in Next.js
// // Import necessary React hooks and components from 'react' and 'next/navigation'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// // Import Bootstrap components for layout, forms, buttons, alerts, and spinners
// import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap'; // Added Card for better sectioning

// // Import icons from various libraries for a richer UI
// import { TbTransactionRupee, TbPlus, TbCreditCard, TbTrashFilled } from 'react-icons/tb'; // Transaction, Add, Credit Card, Receipt, Home Check
// import { FaSave, FaExclamationTriangle, FaUserTie, FaMapMarkerAlt, FaCoins, FaPencilAlt, FaUndo } from 'react-icons/fa'; // Save, Warning, User, Building, Map Marker, Coins, Balance Scale, Pencil, Undo
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIndianRupeeSign, faScrewdriverWrench, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'; // Indian Rupee, Tools, Money Check

// // Import a custom Header component (assuming it exists in '../components/Header')
// import Header from '../components/Header';

// // Main functional component for adding client transactions
// const AddClientTransaction = () => {
//   // Initialize the Next.js router for navigation
//   const router = useRouter();

//   // State variables to manage component data and UI states:

//   // Stores the role of the logged-in user (e.g., 'admin', 'manager')
//   const [userRole, setUserRole] = useState(null);
//   // Stores the list of available clients fetched from the API
//   const [clients, setClients] = useState([]);
//   // Indicates if client data is currently being loaded
//   const [loadingClients, setLoadingClients] = useState(true);
//   // Indicates if the form is currently being submitted
//   const [submitting, setSubmitting] = useState(false);

//   // Form state to hold the values of input fields.
//   // 'paymentstatus' is set to 'pending' by default.
//   const [form, setForm] = useState({
//     clientName: '',
//     query_license: '',
//     near_village: '',
//     description: '',
//     paymentstatus: 'pending',
//   });

//   // State for dynamically added 'Our Working Stages' (work done by our side)
//   // Each stage has a 'work' description and an 'amount'.
//   const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

//   // State for dynamically added 'Client's Working Stages' (payments/work done by the client)
//   const [workingStagesClient, setWorkingStagesClient] = useState([{ work: '', amount: '' }]);

//   // State to store any error messages to display to the user
//   const [error, setError] = useState('');
//   // State to store any success messages to display to the user
//   const [success, setSuccess] = useState('');

//   // --- Helper Functions for Unique Options ---

//   // Get unique client names (removes duplicates)
//   const getUniqueClientNames = () => {
//     const names = clients.filter((client) => client.clientName && client.clientName.trim() !== '')
//       .map((client) => client.clientName);
//     return [...new Set(names)]; // Remove duplicates using Set
//   };

//   // Get unique query licenses (removes duplicates)
//   const getUniqueQueryLicenses = () => {
//     const licenses = clients.filter((client) => client.query_license && client.query_license.trim() !== '')
//       .map((client) => client.query_license);
//     return [...new Set(licenses)]; // Remove duplicates using Set
//   };

//   // Get unique near villages (removes duplicates)
//   const getUniqueNearVillages = () => {
//     const villages = clients.filter((client) => client.near_village && client.near_village.trim() !== '')
//       .map((client) => client.near_village);
//     return [...new Set(villages)]; // Remove duplicates using Set
//   };

//   // --- useEffect Hook: Client-Side Access Control ---
//   // This runs once when the component mounts to check user authorization.
//   useEffect(() => {
//     // Ensure this code only runs in the browser environment
//     if (typeof window !== 'undefined') {
//       const userData = localStorage.getItem('user'); // Get user data from local storage
//       let role = null;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData); // Parse the JSON string
//           role = parsedUser.role; // Extract the user's role
//           setUserRole(role); // Set the user role in state
//         } catch (error) {
//           console.error('Error parsing user data from localStorage:', error);
//         }
//       }

//       // If the user is not an 'admin' or 'manager', log them out and redirect
//       if (role !== 'admin' && role !== 'manager') {
//         setTimeout(() => {
//           localStorage.clear(); // Clear all local storage data
//           window.location.href = '/api/logout'; // Redirect to the logout API endpoint
//         }, 1500); // Wait for 1.5 seconds before redirecting
//       }
//     }
//   }, [router]); // Dependency array: run when router object changes (usually once)

//   // --- useEffect Hook: Fetch All Client Accounts ---
//   // This runs when the userRole state is set, to fetch the list of clients.
//   useEffect(() => {
//     const fetchClients = async () => {
//       // Only fetch if the user has 'admin' or 'manager' role
//       if (userRole === 'admin' || userRole === 'manager') {
//         setLoadingClients(true); // Set loading state to true
//         try {
//           // Make an API call to fetch client accounts
//           const res = await fetch('/api/client-accounts?limit=100000');
//           if (res.ok) {
//             const data = await res.json(); // Parse the JSON response
//             setClients(data?.docs || []); // Set clients, defaulting to an empty array if no docs
//             console.log(data.docs); // Log fetched client data for debugging
//           } else {
//             // Handle HTTP errors (e.g., 404, 500)
//             console.error('Failed to fetch clients:', res.status, res.statusText);
//             setError('Failed to load client data. Please try again.');
//             setClients([]); // Clear clients on error
//           }
//         } catch (err) {
//           // Handle network or unexpected errors
//           console.error('Error fetching clients:', err);
//           setError('Network error while fetching clients.');
//           setClients([]); // Clear clients on error
//         } finally {
//           setLoadingClients(false); // Always set loading to false after fetch attempt
//         }
//       }
//     };

//     if (userRole) {
//       fetchClients(); // Call the fetch function if userRole is determined
//     }
//   }, [userRole]); // Dependency array: run when userRole changes

//   // --- Event Handlers ---

//   // Handles changes for the main form fields (clientName, query_license, near_village, description)
//   const handleFormChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value }); // Update the specific field in form state
//     setError(''); // Clear any previous errors
//     setSuccess(''); // Clear any previous success messages
//   };

//   // Updates a specific 'Our Working Stage' field (work or amount)
//   const updateStage = (index, field, value) => {
//     const updated = [...workingStages]; // Create a mutable copy of the working stages array
//     updated[index][field] = value; // Update the specific field of the stage at the given index
//     setWorkingStages(updated); // Update the state
//   };

//   // Updates a specific 'Client's Working Stage' field (work or amount)
//   const updateStageClient = (index, field, value) => {
//     const updated = [...workingStagesClient]; // Create a mutable copy
//     updated[index][field] = value; // Update the specific field
//     setWorkingStagesClient(updated); // Update the state
//   };

//   // Adds a new empty row for 'Our Working Stages'
//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: '', amount: '' }]); // Add a new empty object
//   };

//   // Adds a new empty row for 'Client's Working Stages'
//   const addStageClient = () => {
//     setWorkingStagesClient([...workingStagesClient, { work: '', amount: '' }]); // Add a new empty object
//   };

//   // Removes a specific row from 'Our Working Stages'
//   const removeStage = (index) => {
//     // Prevent removing the last remaining stage
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, i) => i !== index)); // Filter out the stage at the given index
//     }
//   };

//   // Removes a specific row from 'Client's Working Stages'
//   const removeStageClient = (index) => {
//     // Prevent removing the last remaining stage
//     if (workingStagesClient.length > 1) {
//       setWorkingStagesClient(workingStagesClient.filter((_, i) => i !== index)); // Filter out the stage at the given index
//     }
//   };

//   // --- Calculation Functions ---

//   // Calculates the total amount from 'Our Working Stages'
//   const getTotalAmount = () => {
//     const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return workTotal;
//   };

//   // Calculates the total amount from 'Client's Working Stages'
//   const getTotalAmountClient = () => {
//     const workTotalClient = workingStagesClient.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return workTotalClient;
//   };

//   // Calculates the remaining amount (Our Total - Client Total)
//   const getRemainingAmount = () => {
//     return getTotalAmount() - getTotalAmountClient();
//   };

//   // Resets the entire form to its initial empty state
//   const handleReset = () => {
//     setForm({
//       clientName: '',
//       query_license: '',
//       near_village: '',
//       description: '',
//       paymentstatus: 'pending',
//     });
//     setWorkingStages([{ work: '', amount: '' }]); // Reset our stages
//     setWorkingStagesClient([{ work: '', amount: '' }]); // Reset client stages
//     setError(''); // Clear errors
//     setSuccess(''); // Clear success messages
//   };

//   // --- Form Submission Handler ---
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload on form submit
//     setError("");       // Clear any previous errors
//     setSuccess("");     // Clear any previous success messages

//     // Step 1: Basic field presence check
//     if (!form.clientName || !form.query_license || !form.near_village) {
//       setError("Please fill in all required fields: Client Name, Query License, and Near Village.");
//       return;
//     }

//     // Step 2: Try to find the client that matches all 3 fields
//     const matchedClient = clients.find((client) =>
//       (client.clientName === form.clientName || client.id === form.clientName) &&
//       (client.query_license === form.query_license || client.id === form.query_license) &&
//       (client.near_village === form.near_village || client.id === form.near_village)
//     );

//     // Step 3: If no exact match is found, check individual mismatches and show custom errors
//     if (!matchedClient) {
//       // Check for each valid match individually
//       const clientMatch = clients.some((client) => client.clientName === form.clientName || client.id === form.clientName);
//       const licenseMatch = clients.some((client) => client.query_license === form.query_license || client.id === form.query_license);
//       const villageMatch = clients.some((client) => client.near_village === form.near_village || client.id === form.near_village);

//       // Provide specific error messages based on mismatches
      
//       if (licenseMatch && villageMatch && !clientMatch) {
//         setError("Client Name is incorrect for the selected Query License and Near Village.");
//       } else if (clientMatch && licenseMatch && !villageMatch) {
//         setError("Near Village is incorrect for the selected Client Name and Query License.");
//       } else if (clientMatch && villageMatch && !licenseMatch) {
//         setError("Query License is incorrect for the selected Client Name and Near Village.");
//       } else if (clientMatch && !licenseMatch && !villageMatch) {
//         setError("Both Query License and Near Village are incorrect for the selected Client Name.");
//       } else if (!clientMatch && licenseMatch && !villageMatch) {
//         setError("Client Name and Near Village are incorrect for the selected Query License.");
//       } else if (!clientMatch && !licenseMatch && villageMatch) {
//         setError("Client Name and Query License are incorrect for the selected Near Village.");
//       } else {
//         setError("The provided Client Name, Query License, and Near Village do not match any known client.");
//       }
//       // Reset the form after showing error
//       setTimeout(() => handleReset(), 5000);
//       return;
//     }

//     // Step 4: Prepare payload using the matched client
//     setSubmitting(true); // Show loading indicator

//     const payload = {
//       clientName: matchedClient.id,
//       query_license: matchedClient.id,
//       near_village: matchedClient.id,
//       totalAmount: getTotalAmount(),
//       totalAmountclient: getTotalAmountClient(),
//       remainingAmount: getRemainingAmount(),
//       workingStage: workingStages.map((s) => ({
//         workingStage: s.work,
//         workingDescription: s.amount,
//       })),
//       workingStageclient: workingStagesClient.map((s) => ({
//         workingStageclient: s.work,
//         workingDescriptionclient: s.amount,
//       })),
//       description: form.description,
//       clientCreatedAt: new Date().toISOString(),
//       clientUpdatedAt: new Date().toISOString(),
//       paymentstatus: "pending",
//     };

//     // Step 5: Submit data to API
//     try {
//       const res = await fetch("/api/client-transaction", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setSuccess("Client transaction saved successfully!");
//         setTimeout(() => {
//           handleReset();
//           router.push("/viewclient-transaction");
//         }, 1000);
//       } else {
//         const result = await res.json();
//         console.error("API Error:", result);
//         setError(result.message || "Failed to save transaction. Please check your inputs.");
//       }
//     } catch (err) {
//       console.error("Unexpected error:", err);
//       setError("An unexpected error occurred. Please try again later.");
//     } finally {
//       setSubmitting(false); // Turn off loading state
//     }
//   };

//   // --- Conditional Rendering based on user role and loading state ---

//   // Show a spinner while determining user role
//   if (userRole === null) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold mt-2">Checking authorization...</p>
//       </div>
//     );
//   }

//   // If unauthorized, show an error and redirect.
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     return (
//       <Container className="mt-5 text-center">
//         <Alert variant="danger" className="fw-semibold">
//           <FaExclamationTriangle className="me-2" />
//           You do not have permission to access this page. Redirecting...
//         </Alert>
//       </Container>
//     );
//   }

//   // --- Main Component JSX (What gets rendered on the screen) ---
//   return (
//     <>
//       <Header /> {/* Render the common Header component */}

//       {/* Main container for the form, responsive padding and margin */}
//       <Container className="mt-3 px-3 px-sm-4 px-md-5 py-4 bg-light rounded-4 shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
//         {/* Page Title with an icon */}
//         <h4 className="text-center mb-4 fs-3 fw-bold text-danger">
//           <TbTransactionRupee className="fs-1 mb-1 me-2" /> Add Client Transaction
//         </h4>
//         <hr className="mb-4" />

//         {/* Loading Clients Spinner */}
//         {loadingClients && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <div className="fw-semibold mt-2">Loading Client List...</div>
//           </div>
//         )}

//         {/* No Clients Found Alert */}
//         {!loadingClients && clients.length === 0 && (
//           <Alert variant="info" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" />
//             No client accounts found. Please add a client first to create a transaction.
//             <Button variant="info" className="ms-2 btn-sm" onClick={() => router.push('/add-client-account')}>
//               Add Client Now
//             </Button>
//           </Alert>
//         )}

//         {/* Error Alert */}
//         {error && (
//           <Alert variant="danger" dismissible onClose={() => setError('')} className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" /> {error}
//           </Alert>
//         )}

//         {/* Success Alert */}
//         {success && (
//           <Alert variant="success" dismissible onClose={() => setSuccess('')} className="text-center fw-semibold">
//             {success}
//           </Alert>
//         )}

//         {/* Render the form only if clients are loaded and available */}
//         {!loadingClients && clients.length > 0 && (
//           <Form onSubmit={handleSubmit}>
//             {/* Client Information Section */}
//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Header className="bg-warning text-dark fw-bold fs-5 d-flex align-items-center">
//                 <FaUserTie className="me-2" /> Client Details
//               </Card.Header>
//               <Card.Body>
//                 <Row>
//                   <Col md={12} className="mb-3">
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         Client Name <span className="text-danger">*</span>
//                       </Form.Label>
//                       <Form.Control
//                         list="client-options" // Connects to the datalist for suggestions
//                         name="clientName"
//                         value={form.clientName}
//                         onChange={handleFormChange}
//                         placeholder="Select or type Client Name"
//                         required
//                         className="p-2" // Add padding for better look
//                       />
//                       {/* Datalist provides autocomplete suggestions for client names - NOW WITH UNIQUE VALUES */}
//                       {form.clientName.length >= 2 && (
//                         <datalist id="client-options">
//                           {/* Filter values that include typed letters and limit to 10 */}
//                           {getUniqueClientNames()
//                             .filter(name => name.toLowerCase().includes(form.clientName.toLowerCase()))
//                             .slice(0, 10)
//                             .map((clientName, index) => (
//                               <option key={`client-${index}`} value={clientName} />
//                             ))}
//                         </datalist>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         <TbCreditCard className="me-1" /> Query License
//                         <span className="text-danger ms-1">*</span>
//                       </Form.Label>
//                       <Form.Control
//                         list="query-license-options"
//                         name="query_license"
//                         value={form.query_license}
//                         onChange={handleFormChange}
//                         placeholder="Select or type Query License"
//                         required
//                         className="p-2"
//                       />
//                       {/* Datalist for query licenses - NOW WITH UNIQUE VALUES */}
//                       {form.query_license.length >= 2 && (
//                         <datalist id="query-license-options">
//                           {getUniqueQueryLicenses()
//                             .filter(license =>
//                               license.toLowerCase().includes(form.query_license.toLowerCase())
//                             )
//                             .slice(0, 10)
//                             .map((license, index) => (
//                               <option key={`license-${index}`} value={license} />
//                             ))}
//                         </datalist>
//                       )}
//                     </Form.Group>
//                   </Col>
//                   <Col md={6} className="mb-3">
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         <FaMapMarkerAlt className="me-1" /> NearBy Village
//                         <span className="text-danger ms-1">*</span>
//                       </Form.Label>
//                       <Form.Control
//                         list="near-village-options"
//                         name="near_village"
//                         value={form.near_village}
//                         onChange={handleFormChange}
//                         placeholder="Select or type Village"
//                         required
//                         className="p-2"
//                       />
//                       {/* Datalist for near villages - NOW WITH UNIQUE VALUES */}
//                       {form.near_village.length >= 2 && (
//                         <datalist id="near-village-options">
//                           {getUniqueNearVillages()
//                             .filter(village =>
//                               village.toLowerCase().includes(form.near_village.toLowerCase())
//                             )
//                             .slice(0, 10)
//                             .map((village, index) => (
//                               <option key={`village-${index}`} value={village} />
//                             ))}
//                         </datalist>
//                       )}
//                     </Form.Group>
//                   </Col>
//                 </Row>
//               </Card.Body>
//             </Card>

//             {/* Our Working Stages Section */}
//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Header className="bg-primary text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
//                 <div>
//                   <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" /> Our Working Stages
//                 </div>
//                 <Button
//                   variant="light"
//                   onClick={addStage}
//                   className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
//                 >
//                   <TbPlus className="me-1" size={25} /> Add Stage
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 {workingStages.map((stage, index) => (
//                   <Row key={`our-stage-${index}`} className="mb-3 align-items-center g-2">
//                     <Col xs={12} md={6}>
//                       <Form.Control
//                         placeholder="Work Description (e.g., Land Survey, Documentation)"
//                         value={stage.work}
//                         onChange={(e) => updateStage(index, 'work', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={8} md={4}>
//                       <Form.Control
//                         type="number"
//                         placeholder="₹ Amount"
//                         value={stage.amount}
//                         onChange={(e) => updateStage(index, 'amount', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={4} md={2} className="d-flex justify-content-end">
//                       <Button
//                         variant="danger"
//                         onClick={() => removeStage(index)}
//                         disabled={workingStages.length === 1}
//                         className="w-100 fw-bold d-flex align-items-center justify-content-center"
//                       >
//                         <TbTrashFilled className="d-none d-md-inline me-1" /> Remove
//                       </Button>
//                     </Col>
//                   </Row>
//                 ))}
//               </Card.Body>
//             </Card>

//             {/* Client's Working Stages Section */}
//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Header className="bg-success text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
//                 <div>
//                   <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" /> Client's Stages
//                 </div>
//                 <Button
//                   variant="light"
//                   onClick={addStageClient}
//                   className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
//                 >
//                   <TbPlus className="me-1" size={25} /> Add Stage
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 {workingStagesClient.map((stage, index) => (
//                   <Row key={`client-stage-${index}`} className="mb-3 align-items-center g-2">
//                     <Col xs={12} md={6}>
//                       <Form.Control
//                         placeholder="Client Payment Description (e.g., Advance, Installment)"
//                         value={stage.work}
//                         onChange={(e) => updateStageClient(index, 'work', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={8} md={4}>
//                       <Form.Control
//                         type="number"
//                         placeholder="₹ Client Paid Amount"
//                         value={stage.amount}
//                         onChange={(e) => updateStageClient(index, 'amount', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={4} md={2} className="d-flex justify-content-end">
//                       <Button
//                         variant="danger"
//                         onClick={() => removeStageClient(index)}
//                         disabled={workingStagesClient.length === 1}
//                         className="w-100 fw-bold d-flex align-items-center justify-content-center"
//                       >
//                         <TbTrashFilled className="d-none d-md-inline me-1" /> Remove
//                       </Button>
//                     </Col>
//                   </Row>
//                 ))}
//               </Card.Body>
//             </Card>

//             {/* Credit Summary Section */}
//             <Card className="mb-4 border-0 shadow-sm bg-light">
//               <Card.Header className="bg-dark text-white fw-bold fs-5 d-flex align-items-center">
//                 <FaCoins className="me-2" /> Transaction Summary
//               </Card.Header>
//               <Card.Body>
//                 <Row className="mb-3">
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         Total Amount Our Side (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                       </Form.Label>
//                       <Form.Control
//                         value={getTotalAmount().toFixed(2)} // Display with 2 decimal places
//                         readOnly // Make it read-only
//                         className="bg-white fw-bold p-2 text-danger"
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col md={6}>
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         Total Client Paid Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                       </Form.Label>
//                       <Form.Control
//                         value={getTotalAmountClient().toFixed(2)}
//                         readOnly
//                         className="bg-white fw-bold p-2 text-success"
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Remaining Amount Field */}
//                 <Form.Group className="mb-4">
//                   <Form.Label className="fw-bold fs-5">
//                     Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                   </Form.Label>
//                   <Form.Control
//                     value={getRemainingAmount().toFixed(2)}
//                     readOnly
//                     className="bg-white fw-bold p-2 text-primary" // Highlight remaining amount in blue
//                   />
//                 </Form.Group>
//               </Card.Body>
//             </Card>

//             {/* Optional Description Field */}
//             <Form.Group className="mb-4">
//               <Form.Label className="fw-bold fs-5">
//                 <FaPencilAlt className="me-1" /> Description (Optional)
//               </Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3} // Increased rows for better input area
//                 name="description"
//                 value={form.description}
//                 onChange={handleFormChange}
//                 placeholder="Add any additional notes or details about this transaction..."
//                 className="p-2"
//               />
//             </Form.Group>

//             {/* Submit & Reset Buttons */}
//             <div className="text-center mt-5">
//               <Button
//                 type="submit"
//                 variant="success"
//                 className="fw-bold px-4 py-2 me-3 rounded-pill d-inline-flex align-items-center justify-content-center"
//                 disabled={submitting || loadingClients || clients.length === 0}
//               >
//                 {submitting ? (
//                   <>
//                     <Spinner animation="border" size="sm" className="me-2" />
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <FaSave className="me-2 fs-5" /> Save Transaction
//                   </>
//                 )}
//               </Button>
//               <Button
//                 variant="secondary"
//                 className="px-4 py-2 fw-bold rounded-pill d-inline-flex align-items-center justify-content-center"
//                 onClick={handleReset}
//                 disabled={submitting}
//               >
//                 <FaUndo className="me-2 fs-5" /> Reset Form
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Container>
//     </>
//   );
// };
// export default AddClientTransaction;

'use client'; // This directive marks the component as a Client Component in Next.js
// Import necessary React hooks and components from 'react' and 'next/navigation'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import Bootstrap components for layout, forms, buttons, alerts, and spinners
import { Container, Form, Button, Row, Col, Alert, Spinner, Card, Badge } from 'react-bootstrap';

// Import icons from various libraries for a richer UI
import { TbTransactionRupee, TbPlus, TbCreditCard, TbTrashFilled } from 'react-icons/tb';
import { FaSave, FaExclamationTriangle, FaUserTie, FaMapMarkerAlt, FaCoins, FaPencilAlt, FaUndo, FaClock } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faScrewdriverWrench, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

// Import a custom Header component
import Header from '../components/Header';

// Main functional component for adding client transactions
const AddClientTransaction = () => {
  // Initialize the Next.js router for navigation
  const router = useRouter();

  // State variables to manage component data and UI states
  const [userRole, setUserRole] = useState(null);
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state aligned with ClientTransactions collection
  const [form, setForm] = useState({
    clientName: '',
    query_license: '',
    near_village: '',
    description: '',
    paymentstatus: 'pending',
  });

  // Working stages aligned with collection schema
  const [workingStages, setWorkingStages] = useState([{ 
    workingStage: '', 
    workingDescription: '', 
    workstatus: 'incomplete' 
  }]);

  // Client working stages aligned with collection schema
  const [workingStagesClient, setWorkingStagesClient] = useState([{ 
    workingStageclient: '', 
    workingDescriptionclient: '' 
  }]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper Functions for Unique Options
  const getUniqueClientNames = () => {
    const names = clients.filter((client) => client.clientName && client.clientName.trim() !== '')
      .map((client) => client.clientName);
    return [...new Set(names)];
  };

  const getUniqueQueryLicenses = () => {
    const licenses = clients.filter((client) => client.query_license && client.query_license.trim() !== '')
      .map((client) => client.query_license);
    return [...new Set(licenses)];
  };

  const getUniqueNearVillages = () => {
    const villages = clients.filter((client) => client.near_village && client.near_village.trim() !== '')
      .map((client) => client.near_village);
    return [...new Set(villages)];
  };

  // useEffect Hook: Client-Side Access Control
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user');
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
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

  // useEffect Hook: Fetch All Client Accounts
  useEffect(() => {
    const fetchClients = async () => {
      if (userRole === 'admin' || userRole === 'manager') {
        setLoadingClients(true);
        try {
          const res = await fetch('/api/client-accounts?limit=100000');
          if (res.ok) {
            const data = await res.json();
            setClients(data?.docs || []);
            console.log(data.docs);
          } else {
            console.error('Failed to fetch clients:', res.status, res.statusText);
            setError('Failed to load client data. Please try again.');
            setClients([]);
          }
        } catch (err) {
          console.error('Error fetching clients:', err);
          setError('Network error while fetching clients.');
          setClients([]);
        } finally {
          setLoadingClients(false);
        }
      }
    };

    if (userRole) {
      fetchClients();
    }
  }, [userRole]);

  // Event Handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Updated to match collection schema field names
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  const updateStageClient = (index, field, value) => {
    const updated = [...workingStagesClient];
    updated[index][field] = value;
    setWorkingStagesClient(updated);
  };

  const addStage = () => {
    setWorkingStages([...workingStages, { 
      workingStage: '', 
      workingDescription: '', 
      workstatus: 'incomplete' 
    }]);
  };

  const addStageClient = () => {
    setWorkingStagesClient([...workingStagesClient, { 
      workingStageclient: '', 
      workingDescriptionclient: '' 
    }]);
  };

  const removeStage = (index) => {
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  const removeStageClient = (index) => {
    if (workingStagesClient.length > 1) {
      setWorkingStagesClient(workingStagesClient.filter((_, i) => i !== index));
    }
  };

  // Calculation Functions - Updated to use correct field names
  const getTotalAmount = () => {
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.workingDescription) || 0), 0);
    return workTotal;
  };

  const getTotalAmountClient = () => {
    const workTotalClient = workingStagesClient.reduce((sum, s) => sum + (parseFloat(s.workingDescriptionclient) || 0), 0);
    return workTotalClient;
  };

  const getRemainingAmount = () => {
    return getTotalAmount() - getTotalAmountClient();
  };

  const handleReset = () => {
    setForm({
      clientName: '',
      query_license: '',
      near_village: '',
      description: '',
      paymentstatus: 'pending',
    });
    setWorkingStages([{ 
      workingStage: '', 
      workingDescription: '', 
      workstatus: 'incomplete' 
    }]);
    setWorkingStagesClient([{ 
      workingStageclient: '', 
      workingDescriptionclient: '' 
    }]);
    setError('');
    setSuccess('');
  };

  // Form Submission Handler - Updated payload structure
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.clientName || !form.query_license || !form.near_village) {
      setError("Please fill in all required fields: Client Name, Query License, and Near Village.");
      return;
    }

    const matchedClient = clients.find((client) =>
      (client.clientName === form.clientName || client.id === form.clientName) &&
      (client.query_license === form.query_license || client.id === form.query_license) &&
      (client.near_village === form.near_village || client.id === form.near_village)
    );

    if (!matchedClient) {
      const clientMatch = clients.some((client) => client.clientName === form.clientName || client.id === form.clientName);
      const licenseMatch = clients.some((client) => client.query_license === form.query_license || client.id === form.query_license);
      const villageMatch = clients.some((client) => client.near_village === form.near_village || client.id === form.near_village);

      if (licenseMatch && villageMatch && !clientMatch) {
        setError("Client Name is incorrect for the selected Query License and Near Village.");
      } else if (clientMatch && licenseMatch && !villageMatch) {
        setError("Near Village is incorrect for the selected Client Name and Query License.");
      } else if (clientMatch && villageMatch && !licenseMatch) {
        setError("Query License is incorrect for the selected Client Name and Near Village.");
      } else if (clientMatch && !licenseMatch && !villageMatch) {
        setError("Both Query License and Near Village are incorrect for the selected Client Name.");
      } else if (!clientMatch && licenseMatch && !villageMatch) {
        setError("Client Name and Near Village are incorrect for the selected Query License.");
      } else if (!clientMatch && !licenseMatch && villageMatch) {
        setError("Client Name and Query License are incorrect for the selected Near Village.");
      } else {
        setError("The provided Client Name, Query License, and Near Village do not match any known client.");
      }
      setTimeout(() => handleReset(), 3000);
      return;
    }

    setSubmitting(true);

    // Updated payload to match ClientTransactions collection schema
    const payload = {
      clientName: matchedClient.id,
      query_license: matchedClient.id,
      near_village: matchedClient.id,
      totalAmount: getTotalAmount(),
      totalAmountclient: getTotalAmountClient(),
      remainingAmount: getRemainingAmount(),
      workingStage: workingStages.map((s) => ({
        workingStage: s.workingStage,
        workingDescription: s.workingDescription,
        workstatus: s.workstatus
      })),
      workingStageclient: workingStagesClient.map((s) => ({
        workingStageclient: s.workingStageclient,
        workingDescriptionclient: s.workingDescriptionclient,
      })),
      description: form.description,
      clientCreatedAt: new Date().toISOString(),
      clientUpdatedAt: new Date().toISOString(),
      paymentstatus: "pending",
    };

    try {
      const res = await fetch("/api/client-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Client transaction saved successfully!");
        setTimeout(() => {
          handleReset();
          router.push("/viewclient-transaction");
        }, 1000);
      } else {
        const result = await res.json();
        console.error("API Error:", result);
        setError(result.message || "Failed to save transaction. Please check your inputs.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Conditional Rendering
  if (userRole === null) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="fw-semibold mt-2">Checking authorization...</p>
      </div>
    );
  }

  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger" className="fw-semibold">
          <FaExclamationTriangle className="me-2" />
          You do not have permission to access this page. Redirecting...
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Header />

      <Container className="mt-3 px-3 px-sm-4 px-md-5 py-4 bg-light rounded-4 shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
        <h4 className="text-center mb-4 fs-3 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1 me-2" /> Add Client Transaction
        </h4>
        <hr className="mb-4" />

        {loadingClients && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Client List...</div>
          </div>
        )}

        {!loadingClients && clients.length === 0 && (
          <Alert variant="info" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No client accounts found. Please add a client first to create a transaction.
            <Button variant="info" className="ms-2 btn-sm" onClick={() => router.push('/add-client-account')}>
              Add Client Now
            </Button>
          </Alert>
        )}

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')} className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess('')} className="text-center fw-semibold">
            {success}
          </Alert>
        )}

        {!loadingClients && clients.length > 0 && (
          <Form onSubmit={handleSubmit}>
            {/* Client Information Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-warning text-dark fw-bold fs-5 d-flex align-items-center">
                <FaUserTie className="me-2" /> Client Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Client Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        list="client-options"
                        name="clientName"
                        value={form.clientName}
                        onChange={handleFormChange}
                        placeholder="Select or type Client Name"
                        required
                        className="p-2"
                      />
                      {form.clientName.length >= 2 && (
                        <datalist id="client-options">
                          {getUniqueClientNames()
                            .filter(name => name.toLowerCase().includes(form.clientName.toLowerCase()))
                            .slice(0, 10)
                            .map((clientName, index) => (
                              <option key={`client-${index}`} value={clientName} />
                            ))}
                        </datalist>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        <TbCreditCard className="me-1" /> Query License
                        <span className="text-danger ms-1">*</span>
                      </Form.Label>
                      <Form.Control
                        list="query-license-options"
                        name="query_license"
                        value={form.query_license}
                        onChange={handleFormChange}
                        placeholder="Select or type Query License"
                        required
                        className="p-2"
                      />
                      {form.query_license.length >= 2 && (
                        <datalist id="query-license-options">
                          {getUniqueQueryLicenses()
                            .filter(license =>
                              license.toLowerCase().includes(form.query_license.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((license, index) => (
                              <option key={`license-${index}`} value={license} />
                            ))}
                        </datalist>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        <FaMapMarkerAlt className="me-1" /> NearBy Village
                        <span className="text-danger ms-1">*</span>
                      </Form.Label>
                      <Form.Control
                        list="near-village-options"
                        name="near_village"
                        value={form.near_village}
                        onChange={handleFormChange}
                        placeholder="Select or type Village"
                        required
                        className="p-2"
                      />
                      {form.near_village.length >= 2 && (
                        <datalist id="near-village-options">
                          {getUniqueNearVillages()
                            .filter(village =>
                              village.toLowerCase().includes(form.near_village.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((village, index) => (
                              <option key={`village-${index}`} value={village} />
                            ))}
                        </datalist>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Our Working Stages Section - Updated with Work Status */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-primary text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" /> Our Working Stages
                </div>
                <Button
                  variant="light"
                  onClick={addStage}
                  className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
                >
                  <TbPlus className="me-1" size={25} /> Add Stage
                </Button>
              </Card.Header>
              <Card.Body>
                {workingStages.map((stage, index) => (
                  <div key={`our-stage-${index}`} className="mb-4 p-3 border rounded bg-light">
                    <Row className="mb-3 align-items-center g-2">
                      <Col xs={12} md={5}>
                        <Form.Label className="fw-bold small">Work Description</Form.Label>
                        <Form.Control
                          placeholder="e.g., Land Survey, Documentation"
                          value={stage.workingStage}
                          onChange={(e) => updateStage(index, 'workingStage', e.target.value)}
                          className="p-2"
                        />
                      </Col>
                      <Col xs={8} md={4}>
                        <Form.Label className="fw-bold small">Amount (₹)</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="₹ Amount"
                          value={stage.workingDescription}
                          onChange={(e) => updateStage(index, 'workingDescription', e.target.value)}
                          className="p-2"
                        />
                      </Col>
                      <Col xs={4} md={3}>
                        <Form.Label className="fw-bold small">Work Status</Form.Label>
                        <div className="d-flex align-items-center">
                          <Badge 
                            bg="warning" 
                            className="me-2 p-2 d-flex align-items-center"
                            style={{ fontSize: '0.85rem' }}
                          >
                            <FaClock className="me-1" />
                            {stage.workstatus.charAt(0).toUpperCase() + stage.workstatus.slice(1)}
                          </Badge>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={12} className="d-flex justify-content-end">
                        <Button
                          variant="danger"
                          onClick={() => removeStage(index)}
                          disabled={workingStages.length === 1}
                          className="fw-bold d-flex align-items-center justify-content-center"
                          size="sm"
                        >
                          <TbTrashFilled className="me-1" /> Remove Stage
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
              </Card.Body>
            </Card>

            {/* Client's Working Stages Section - Updated field names */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-success text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" /> Client's Stages
                </div>
                <Button
                  variant="light"
                  onClick={addStageClient}
                  className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
                >
                  <TbPlus className="me-1" size={25} /> Add Stage
                </Button>
              </Card.Header>
              <Card.Body>
                {workingStagesClient.map((stage, index) => (
                  <Row key={`client-stage-${index}`} className="mb-3 align-items-center g-2">
                    <Col xs={12} md={6}>
                      <Form.Control
                        placeholder="Client Payment Description (e.g., Advance, Installment)"
                        value={stage.workingStageclient}
                        onChange={(e) => updateStageClient(index, 'workingStageclient', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={8} md={4}>
                      <Form.Control
                        type="number"
                        placeholder="₹ Client Paid Amount"
                        value={stage.workingDescriptionclient}
                        onChange={(e) => updateStageClient(index, 'workingDescriptionclient', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={4} md={2} className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => removeStageClient(index)}
                        disabled={workingStagesClient.length === 1}
                        className="w-100 fw-bold d-flex align-items-center justify-content-center"
                      >
                        <TbTrashFilled className="d-none d-md-inline me-1" /> Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>

            {/* Transaction Summary Section */}
            <Card className="mb-4 border-0 shadow-sm bg-light">
              <Card.Header className="bg-dark text-white fw-bold fs-5 d-flex align-items-center">
                <FaCoins className="me-2" /> Transaction Summary
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Total Amount Our Side (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                      </Form.Label>
                      <Form.Control
                        value={getTotalAmount().toFixed(2)}
                        readOnly
                        className="bg-white fw-bold p-2 text-danger"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Total Client Paid Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                      </Form.Label>
                      <Form.Control
                        value={getTotalAmountClient().toFixed(2)}
                        readOnly
                        className="bg-white fw-bold p-2 text-success"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold fs-5">
                    Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                  </Form.Label>
                  <Form.Control
                    value={getRemainingAmount().toFixed(2)}
                    readOnly
                    className="bg-white fw-bold p-2 text-primary"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Optional Description Field */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold fs-5">
                <FaPencilAlt className="me-1" /> Description (Optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Add any additional notes or details about this transaction..."
                className="p-2"
              />
            </Form.Group>

            {/* Submit & Reset Buttons */}
            <div className="text-center mt-5">
              <Button
                type="submit"
                variant="success"
                className="fw-bold px-4 py-2 me-3 rounded-pill d-inline-flex align-items-center justify-content-center"
                disabled={submitting || loadingClients || clients.length === 0}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2 fs-5" /> Save Transaction
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 fw-bold rounded-pill d-inline-flex align-items-center justify-content-center"
                onClick={handleReset}
                disabled={submitting}
              >
                <FaUndo className="me-2 fs-5" /> Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default AddClientTransaction;