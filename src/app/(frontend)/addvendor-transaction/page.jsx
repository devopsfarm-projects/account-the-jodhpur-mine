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

// // Add Vendor Transaction Page
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
// // Main functional component for adding vendor transactions
// const AddVendorTransaction = () => {
//   // Initialize the Next.js router for navigation
//   const router = useRouter();

//   // State variables to manage component data and UI states:

//   // Stores the role of the logged-in user (e.g., 'admin', 'manager')
//   const [userRole, setUserRole] = useState(null);
//   // Stores the list of available vendors fetched from the API
//   const [vendors, setVendors] = useState([]);
//   // Indicates if vendor data is currently being loaded
//   const [loadingVendors, setLoadingVendors] = useState(true);
//   // Indicates if the form is currently being submitted
//   const [submitting, setSubmitting] = useState(false);

//   // Form state to hold the values of input fields.
//   // 'paymentstatus' is set to 'pending' by default.
//   const [form, setForm] = useState({
//     vendorName: '',
//     query_license: '',
//     near_village: '',
//     description: '',
//     paymentstatus: 'pending',
//   });

//   // State for dynamically added 'Our Working Stages' (work done by our side)
//   // Each stage has a 'work' description and an 'amount'.
//   const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

//   // State for dynamically added 'Vendor's Working Stages' (payments/work done by the vendor)
//   const [workingStagesVendor, setWorkingStagesVendor] = useState([{ work: '', amount: '' }]);

//   // State to store any error messages to display to the user
//   const [error, setError] = useState('');
//   // State to store any success messages to display to the user
//   const [success, setSuccess] = useState('');

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

//   // --- useEffect Hook: Fetch All Vendor Accounts ---
//   // This runs when the userRole state is set, to fetch the list of vendors.
//   useEffect(() => {
//     const fetchVendors = async () => {
//       // Only fetch if the user has 'admin' or 'manager' role
//       if (userRole === 'admin' || userRole === 'manager') {
//         setLoadingVendors(true); // Set loading state to true
//         try {
//           // Make an API call to fetch vendor accounts
//           const res = await fetch('/api/vendor'); // Changed API endpoint
//           if (res.ok) {
//             const data = await res.json(); // Parse the JSON response
//             setVendors(data?.docs || []); // Set vendors, defaulting to an empty array if no docs
//             console.log(data.docs); // Log fetched vendor data for debugging
//           } else {
//             // Handle HTTP errors (e.g., 404, 500)
//             console.error('Failed to fetch vendors:', res.status, res.statusText);
//             setError('Failed to load vendor data. Please try again.');
//             setVendors([]); // Clear vendors on error
//           }
//         } catch (err) {
//           // Handle network or unexpected errors
//           console.error('Error fetching vendors:', err);
//           setError('Network error while fetching vendors.');
//           setVendors([]); // Clear vendors on error
//         } finally {
//           setLoadingVendors(false); // Always set loading to false after fetch attempt
//         }
//       }
//     };

//     if (userRole) {
//       fetchVendors(); // Call the fetch function if userRole is determined
//     }
//   }, [userRole]); // Dependency array: run when userRole changes

//   // --- Event Handlers ---

//   // Handles changes for the main form fields (vendorName, query_license, near_village, description)
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

//   // Updates a specific 'Vendor's Working Stage' field (work or amount)
//   const updateStageVendor = (index, field, value) => {
//     const updated = [...workingStagesVendor]; // Create a mutable copy
//     updated[index][field] = value; // Update the specific field
//     setWorkingStagesVendor(updated); // Update the state
//   };

//   // Adds a new empty row for 'Our Working Stages'
//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: '', amount: '' }]); // Add a new empty object
//   };

//   // Adds a new empty row for 'Vendor's Working Stages'
//   const addStageVendor = () => {
//     setWorkingStagesVendor([...workingStagesVendor, { work: '', amount: '' }]); // Add a new empty object
//   };

//   // Removes a specific row from 'Our Working Stages'
//   const removeStage = (index) => {
//     // Prevent removing the last remaining stage
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, i) => i !== index)); // Filter out the stage at the given index
//     }
//   };

//   // Removes a specific row from 'Vendor's Working Stages'
//   const removeStageVendor = (index) => {
//     // Prevent removing the last remaining stage
//     if (workingStagesVendor.length > 1) {
//       setWorkingStagesVendor(workingStagesVendor.filter((_, i) => i !== index)); // Filter out the stage at the given index
//     }
//   };

//   // --- Calculation Functions ---

//   // Calculates the total amount from 'Our Working Stages'
//   const getTotalAmount = () => {
//     const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return workTotal;
//   };

//   // Calculates the total amount from 'Vendor's Working Stages'
//   const getTotalAmountVendor = () => {
//     const workTotalVendor = workingStagesVendor.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return workTotalVendor;
//   };

//   // Calculates the remaining amount (Our Total - Vendor Total)
//   const getRemainingAmount = () => {
//     return getTotalAmount() - getTotalAmountVendor();
//   };

//   // Resets the entire form to its initial empty state
//   const handleReset = () => {
//     setForm({
//       vendorName: '',
//       query_license: '',
//       near_village: '',
//       description: '',
//       paymentstatus: 'pending',
//     });
//     setWorkingStages([{ work: '', amount: '' }]); // Reset our stages
//     setWorkingStagesVendor([{ work: '', amount: '' }]); // Reset vendor stages
//     setError(''); // Clear errors
//     setSuccess(''); // Clear success messages
//   };

//   // --- Form Submission Handler ---

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent page reload on form submit
//     setError("");        // Clear any previous errors
//     setSuccess("");       // Clear any previous success messages

//     // Step 1: Basic field presence check
//     if (!form.vendorName || !form.query_license || !form.near_village) {
//       setError("Please fill in all required fields: Vendor Name, Query License, and Near Village.");
//       return;
//     }

//     // Step 2: Try to find the vendor that matches all 3 fields
//     const matchedVendor = vendors.find((vendor) =>
//       (vendor.vendorName === form.vendorName || vendor.id === form.vendorName) &&
//       (vendor.query_license === form.query_license || vendor.id === form.query_license) &&
//       (vendor.near_village === form.near_village || vendor.id === form.near_village)
//     );

//     // Step 3: If no exact match is found, check individual mismatches and show custom errors
//     if (!matchedVendor) {
//       // Check for each valid match individually
//       const vendorMatch = vendors.some((vendor) => vendor.vendorName === form.vendorName || vendor.id === form.vendorName);
//       const licenseMatch = vendors.some((vendor) => vendor.query_license === form.query_license || vendor.id === form.query_license);
//       const villageMatch = vendors.some((vendor) => vendor.near_village === form.near_village || vendor.id === form.near_village);

//       // Provide specific error messages based on mismatches
//       if (licenseMatch && villageMatch && !vendorMatch) {
//         setError("Vendor Name is incorrect for the selected Query License and Near Village.");
//       } else if (vendorMatch && licenseMatch && !villageMatch) {
//         setError("Near Village is incorrect for the selected Vendor Name and Query License.");
//       } else if (vendorMatch && villageMatch && !licenseMatch) {
//         setError("Query License is incorrect for the selected Vendor Name and Near Village.");
//       } else if (vendorMatch && !licenseMatch && !villageMatch) {
//         setError("Both Query License and Near Village are incorrect for the selected Vendor Name.");
//       } else if (!vendorMatch && licenseMatch && !villageMatch) {
//         setError("Vendor Name and Near Village are incorrect for the selected Query License.");
//       } else if (!vendorMatch && !licenseMatch && villageMatch) {
//         setError("Vendor Name and Query License are incorrect for the selected Near Village.");
//       } else {
//         setError("The provided Vendor Name, Query License, and Near Village do not match any known vendor.");
//       }
//       // Reset the form after showing error
//       setTimeout(() => handleReset(), 5000);
//       return;
//     }

//     // Step 4: Prepare payload using the matched vendor
//     setSubmitting(true); // Show loading indicator

//     const payload = {
//       vendorName: matchedVendor.id, // Use the ID of the matched vendor
//       query_license: matchedVendor.id, // Use the ID of the matched vendor
//       near_village: matchedVendor.id, // Use the ID of the matched vendor
//       totalAmount: getTotalAmount(),
//       totalAmountvendor: getTotalAmountVendor(), // Renamed for clarity
//       remainingAmount: getRemainingAmount(),
//       workingStage: workingStages.map((s) => ({
//         workingStage: s.work,
//         workingDescription: s.amount,
//       })),
//       workingStagevendor: workingStagesVendor.map((s) => ({ // Renamed for clarity
//         workingStagevendor: s.work,
//         workingDescriptionvendor: s.amount,
//       })),
//       description: form.description,
//       vendorCreatedAt: new Date().toISOString(), // Renamed to align with collection
//       vendorUpdatedAt: new Date().toISOString(), // Renamed to align with collection
//       paymentstatus: "pending",
//     };

//     // Step 5: Submit data to API
//     try {
//       const res = await fetch("/api/vendor-transaction", { // Changed API endpoint
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         setSuccess("Vendor transaction saved successfully!");
//         setTimeout(() => {
//           handleReset();
//           router.push("/viewvendor-transaction"); // Assuming a view page for vendors
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
//           <TbTransactionRupee className="fs-1 mb-1 me-2" /> Add Vendor Transaction
//         </h4>
//         <hr className="mb-4" />

//         {/* Loading Vendors Spinner */}
//         {loadingVendors && (
//           <div className="text-center my-4">
//             <Spinner animation="border" variant="primary" />
//             <div className="fw-semibold mt-2">Loading Vendor List...</div>
//           </div>
//         )}

//         {/* No Vendors Found Alert */}
//         {!loadingVendors && vendors.length === 0 && (
//           <Alert variant="info" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" />
//             No vendor accounts found. Please add a vendor first to create a transaction.
//             <Button variant="info" className="ms-2 btn-sm" onClick={() => router.push('/add-vendor-account')}> {/* Changed button link */}
//               Add Vendor Now
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

//         {/* Render the form only if vendors are loaded and available */}
//         {!loadingVendors && vendors.length > 0 && (
//           <Form onSubmit={handleSubmit}>
//             {/* Vendor Information Section */}
//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Header className="bg-warning text-dark fw-bold fs-5 d-flex align-items-center">
//                 <FaUserTie className="me-2" /> Vendor Details
//               </Card.Header>
//               <Card.Body>
//                 <Row>
//                   <Col md={12} className="mb-3">
//                     <Form.Group>
//                       <Form.Label className="fw-bold fs-5">
//                         Vendor Name <span className="text-danger">*</span>
//                       </Form.Label>
//                       <Form.Control
//                         list="vendor-options" // Connects to the datalist for suggestions
//                         name="vendorName"
//                         value={form.vendorName}
//                         onChange={handleFormChange}
//                         placeholder="Select or type Vendor Name"
//                         required
//                         className="p-2" // Add padding for better look
//                       />
//                       {/* Datalist provides autocomplete suggestions for vendor names */}
//                       <datalist id="vendor-options">
//                         {vendors.filter((vendor) => vendor.vendorName).map((vendor) => (
//                           <option key={vendor.id} value={vendor.vendorName} />
//                         ))}
//                       </datalist>
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
//                       <datalist id="query-license-options">
//                         {vendors.filter((vendor) => vendor.query_license).map((vendor) => (
//                           <option key={vendor.id} value={vendor.query_license} />
//                         ))}
//                       </datalist>
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
//                       <datalist id="near-village-options">
//                         {vendors.filter((vendor) => vendor.near_village).map((vendor) => (
//                           <option key={vendor.id} value={vendor.near_village} />
//                         ))}
//                       </datalist>
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

//             {/* Vendor's Working Stages Section */}
//             <Card className="mb-4 border-0 shadow-sm">
//               <Card.Header className="bg-success text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
//                 <div>
//                   <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" /> Vendor's Stages
//                 </div>
//                 <Button
//                   variant="light"
//                   onClick={addStageVendor}
//                   className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
//                 >
//                   <TbPlus className="me-1" size={25} /> Add Stage
//                 </Button>
//               </Card.Header>
//               <Card.Body>
//                 {workingStagesVendor.map((stage, index) => (
//                   <Row key={`vendor-stage-${index}`} className="mb-3 align-items-center g-2">
//                     <Col xs={12} md={6}>
//                       <Form.Control
//                         placeholder="Vendor Payment Description (e.g., Advance, Installment)"
//                         value={stage.work}
//                         onChange={(e) => updateStageVendor(index, 'work', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={8} md={4}>
//                       <Form.Control
//                         type="number"
//                         placeholder="₹ Vendor Paid Amount"
//                         value={stage.amount}
//                         onChange={(e) => updateStageVendor(index, 'amount', e.target.value)}
//                         className="p-2"
//                       />
//                     </Col>
//                     <Col xs={4} md={2} className="d-flex justify-content-end">
//                       <Button
//                         variant="danger"
//                         onClick={() => removeStageVendor(index)}
//                         disabled={workingStagesVendor.length === 1}
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
//                         Total Vendor Paid Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
//                       </Form.Label>
//                       <Form.Control
//                         value={getTotalAmountVendor().toFixed(2)}
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
//                     className="bg-white fw-bold p-2 text-primary" // Highlight remaining amount in primary color
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
//                 disabled={submitting || loadingVendors || vendors.length === 0}
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
// export default AddVendorTransaction;

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

// Main functional component for adding vendor transactions
const AddVendorTransaction = () => {
  // Initialize the Next.js router for navigation
  const router = useRouter();

  // State variables to manage component data and UI states
  const [userRole, setUserRole] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form state aligned with VendorTransactions collection
  const [form, setForm] = useState({
    vendorName: '',
    query_license: '',
    near_village: '',
    description: '',
    paymentstatus: 'pending',
  });

  // Working stages aligned with collection schema for 'our' side (company's work/expenses related to vendor)
  const [workingStages, setWorkingStages] = useState([{
    workingStage: '',
    workingDescription: '',
    workstatus: 'incomplete'
  }]);

  // Vendor's working stages aligned with collection schema (vendor's charges/payments)
  const [workingStagesVendor, setWorkingStagesVendor] = useState([{
    workingStagevendor: '',
    workingDescriptionvendor: '',
    stageDate: ''
  }]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper Functions for Unique Options
  const getUniqueVendorNames = () => {
    const names = vendors.filter((vendor) => vendor.vendorName && vendor.vendorName.trim() !== '')
      .map((vendor) => vendor.vendorName);
    return [...new Set(names)];
  };

  const getUniqueQueryLicenses = () => {
    const licenses = vendors.filter((vendor) => vendor.query_license && vendor.query_license.trim() !== '')
      .map((vendor) => vendor.query_license);
    return [...new Set(licenses)];
  };

  const getUniqueNearVillages = () => {
    const villages = vendors.filter((vendor) => vendor.near_village && vendor.near_village.trim() !== '')
      .map((vendor) => vendor.near_village);
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

  // useEffect Hook: Fetch All Vendor Accounts
  useEffect(() => {
    const fetchVendors = async () => {
      if (userRole === 'admin' || userRole === 'manager') {
        setLoadingVendors(true);
        try {
          const res = await fetch('/api/vendor?limit=100000'); // Assuming a similar API endpoint for vendors
          if (res.ok) {
            const data = await res.json();
            setVendors(data?.docs || []);
            console.log(data.docs);
          } else {
            console.error('Failed to fetch vendors:', res.status, res.statusText);
            setError('Failed to load vendor data. Please try again.');
            setVendors([]);
          }
        } catch (err) {
          console.error('Error fetching vendors:', err);
          setError('Network error while fetching vendors.');
          setVendors([]);
        } finally {
          setLoadingVendors(false);
        }
      }
    };

    if (userRole) {
      fetchVendors();
    }
  }, [userRole]);

  // Event Handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Updated to match collection schema field names for our side
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  // Updated to match collection schema field names for vendor side
  const updateStageVendor = (index, field, value) => {
    const updated = [...workingStagesVendor];
    updated[index][field] = value;
    setWorkingStagesVendor(updated);
  };

  const addStage = () => {
    setWorkingStages([...workingStages, {
      workingStage: '',
      workingDescription: '',
      workstatus: 'incomplete'
    }]);
  };

  const addStageVendor = () => {
    setWorkingStagesVendor([
      ...workingStagesVendor,
      { workingStagevendor: '', workingDescriptionvendor: '', stageDate: '' }
    ]);
  };

  const removeStage = (index) => {
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  const removeStageVendor = (index) => {
    if (workingStagesVendor.length > 1) {
      setWorkingStagesVendor(workingStagesVendor.filter((_, i) => i !== index));
    }
  };

  // Calculation Functions - Updated to use correct field names
  const getTotalAmount = () => {
    // This is "totalAmount" in VendorTransactions.ts, representing 'our' cost
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.workingDescription) || 0), 0);
    return workTotal;
  };

  const getTotalAmountVendor = () => {
    // This is "totalAmountvendor" in VendorTransactions.ts, representing what vendor charges us
    const workTotalVendor = workingStagesVendor.reduce((sum, s) => sum + (parseFloat(s.workingDescriptionvendor) || 0), 0);
    return workTotalVendor;
  };

  const getRemainingAmount = () => {
    // Remaining amount might be (our total cost) - (vendor's total charges)
    // Or it could be (vendor's charges) - (our payments to vendor), depending on business logic.
    // Assuming it's the difference between what we spend and what the vendor charges us.
    return getTotalAmount() - getTotalAmountVendor();
  };

  const handleReset = () => {
    setForm({
      vendorName: '',
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
    setWorkingStagesVendor([{ workingStagevendor: '', workingDescriptionvendor: '', stageDate: '' }]);
    setError('');
    setSuccess('');
  };

  // Form Submission Handler - Updated payload structure for VendorTransactions
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.vendorName || !form.query_license || !form.near_village) {
      setError("Please fill in all required fields: Vendor Name, Query License, and Near Village.");
      return;
    }

    const matchedVendor = vendors.find((vendor) =>
      (vendor.vendorName === form.vendorName || vendor.id === form.vendorName) &&
      (vendor.query_license === form.query_license || vendor.id === form.query_license) &&
      (vendor.near_village === form.near_village || vendor.id === form.near_village)
    );

    if (!matchedVendor) {
      const vendorMatch = vendors.some((vendor) => vendor.vendorName === form.vendorName || vendor.id === form.vendorName);
      const licenseMatch = vendors.some((vendor) => vendor.query_license === form.query_license || vendor.id === form.query_license);
      const villageMatch = vendors.some((vendor) => vendor.near_village === form.near_village || vendor.id === form.near_village);

      if (licenseMatch && villageMatch && !vendorMatch) {
        setError("Vendor Name is incorrect for the selected Query License and Near Village.");
      } else if (vendorMatch && licenseMatch && !villageMatch) {
        setError("Near Village is incorrect for the selected Vendor Name and Query License.");
      } else if (vendorMatch && villageMatch && !licenseMatch) {
        setError("Query License is incorrect for the selected Vendor Name and Near Village.");
      } else if (vendorMatch && !licenseMatch && !villageMatch) {
        setError("Both Query License and Near Village are incorrect for the selected Vendor Name.");
      } else if (!vendorMatch && licenseMatch && !villageMatch) {
        setError("Vendor Name and Near Village are incorrect for the selected Query License.");
      } else if (!vendorMatch && !licenseMatch && villageMatch) {
        setError("Vendor Name and Query License are incorrect for the selected Near Village.");
      } else {
        setError("The provided Vendor Name, Query License, and Near Village do not match any known vendor.");
      }
      setTimeout(() => handleReset(), 3000);
      return;
    }

    setSubmitting(true);

    // Updated payload to match VendorTransactions collection schema
    const payload = {
      vendorName: matchedVendor.id, // Relationship field, stores ID
      query_license: matchedVendor.id, // Relationship field, stores ID
      near_village: matchedVendor.id, // Relationship field, stores ID
      totalAmount: getTotalAmount(), // Our side's total amount
      totalAmountvendor: getTotalAmountVendor(), // Vendor's side total amount
      remainingAmount: getRemainingAmount(),
      workingStage: workingStages.map((s) => ({
        workingStage: s.workingStage,
        workingDescription: s.workingDescription,
        workstatus: s.workstatus
      })),
      workingStagevendor: workingStagesVendor.map((s) => ({
        workingStagevendor: s.workingStagevendor,
        workingDescriptionvendor: s.workingDescriptionvendor,
        stageDate: s.stageDate,
      })),
      description: form.description,
      vendorCreatedAt: new Date().toISOString(), // Renamed for clarity
      vendorUpdatedAt: new Date().toISOString(), // Renamed for clarity
      paymentstatus: "pending", // Default value
    };

    try {
      // Assuming a new API endpoint for vendor transactions
      const res = await fetch("/api/vendor-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Vendor transaction saved successfully!");
        setTimeout(() => {
          handleReset();
          router.push("/viewvendor-transaction"); // Redirect to vendor transactions view
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
          <TbTransactionRupee className="fs-1 mb-1 me-2" /> Add Vendor Transaction
        </h4>
        <hr className="mb-4" />

        {loadingVendors && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Vendor List...</div>
          </div>
        )}

        {!loadingVendors && vendors.length === 0 && (
          <Alert variant="info" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No vendor accounts found. Please add a vendor first to create a transaction.
            <Button variant="info" className="ms-2 btn-sm" onClick={() => router.push('/add-vendor-account')}>
              Add Vendor Now
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

        {!loadingVendors && vendors.length > 0 && (
          <Form onSubmit={handleSubmit}>
            {/* Vendor Information Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-warning text-dark fw-bold fs-5 d-flex align-items-center">
                <FaUserTie className="me-2" /> Vendor Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Vendor Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        list="vendor-options"
                        name="vendorName"
                        value={form.vendorName}
                        onChange={handleFormChange}
                        placeholder="Select or type Vendor Name"
                        required
                        className="p-2"
                      />
                      {form.vendorName.length >= 2 && (
                        <datalist id="vendor-options">
                          {getUniqueVendorNames()
                            .filter(name => name.toLowerCase().includes(form.vendorName.toLowerCase()))
                            .slice(0, 10)
                            .map((vendorName, index) => (
                              <option key={`vendor-${index}`} value={vendorName} />
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
                  <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" /> Our Working Stages (Our Costs)
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

            {/* Vendor's Working Stages Section - Updated field names */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-success text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" /> Vendor's Stages (Vendor Charges)
                </div>
                <Button
                  variant="light"
                  onClick={addStageVendor}
                  className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
                >
                  <TbPlus className="me-1" size={25} /> Add Stage
                </Button>
              </Card.Header>
              <Card.Body>
                {workingStagesVendor.map((stage, index) => (
                  <Row key={`vendor-stage-${index}`} className="mb-3 align-items-center g-2">
                    <Col xs={12} md={4}>
                      <Form.Control
                        placeholder="Vendor Service Description (e.g., Material Supply, Labor)"
                        value={stage.workingStagevendor}
                        onChange={(e) => updateStageVendor(index, 'workingStagevendor', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={8} md={3}>
                      <Form.Control
                        type="number"
                        placeholder="₹ Vendor Charged Amount"
                        value={stage.workingDescriptionvendor}
                        onChange={(e) => updateStageVendor(index, 'workingDescriptionvendor', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={8} md={3}>
                      <Form.Control
                        type="date"
                        placeholder="Stage Date"
                        value={stage.stageDate}
                        onChange={(e) => updateStageVendor(index, 'stageDate', e.target.value)}
                        className="p-2"
                        required
                      />
                    </Col>
                    <Col xs={4} md={2} className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => removeStageVendor(index)}
                        disabled={workingStagesVendor.length === 1}
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
                        Total Vendor Charged Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                      </Form.Label>
                      <Form.Control
                        value={getTotalAmountVendor().toFixed(2)}
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
                disabled={submitting || loadingVendors || vendors.length === 0}
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

export default AddVendorTransaction;