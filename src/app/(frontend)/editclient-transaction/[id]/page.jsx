//Edit Client Transaction page
// "use client";//required for localStorage and router
// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import Header from "../../components/Header";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// const EditClientTransaction = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;
//   console.log(`the id of the transaction is`, id);
//   const [form, setForm] = useState({
//     client: "",
//     totalAmount: "",
//     tokenAmount: "",
//     description: "",
//   });
//   const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);
//   const [transactionCreated, setTransactionCreated] = useState("");

//   useEffect(() => {
//     const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     const txn = transactions[parseInt(id)];

//     if (txn) {
//       setForm({
//         client: txn.client,
//         totalAmount: txn.totalAmount,
//         tokenAmount: txn.tokenAmount,
//         description: txn.description,
//       });
//       setWorkingStages(txn.workingStages);
//       setTransactionCreated(txn.transactioncreated);
//     }
//   }, []);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateStage = (i, field, value) => {
//     const updated = [...workingStages];
//     updated[i][field] = value;
//     setWorkingStages(updated);
//   };

//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: "", amount: "" }]);
//   };

//   const removeStage = (i) => {
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, idx) => idx !== i));
//     }
//   };

//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const stages = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return token + stages;
//   };

//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updated = {
//       ...form,
//       totalAmount: parseFloat(form.totalAmount) || 0,
//       tokenAmount: parseFloat(form.tokenAmount) || 0,
//       totalCredits: getTotalCredit(),
//       remainingAmount: getRemainingAmount(),
//       workingStages,
//       transactioncreated: transactionCreated,
//     };

//     const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     transactions[parseInt(id)] = updated;
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//     router.push("/viewclient-transaction");
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto" >
//         <h4 className="text-center mb-4">Edit Client Transaction</h4>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Client</Form.Label>
//             <Form.Control value={form.client} readOnly />
//           </Form.Group>

//           <Row className="g-3">
//             <Col sm={6}>
//               <Form.Label>Total Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalAmount"
//                 value={form.totalAmount}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Token Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="tokenAmount"
//                 value={form.tokenAmount}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Col>
//           </Row>

//           <hr />
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="fw-bold">Working Stages</h5>
//             <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
//           </div>

//           {workingStages.map((stage, i) => (
//             <Row key={i} className="g-2 mb-2 align-items-center">
//               <Col sm={5}>
//                 <Form.Control
//                   placeholder="Work"
//                   value={stage.work}
//                   onChange={(e) => updateStage(i, "work", e.target.value)}
//                 />
//               </Col>
//               <Col sm={4}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Amount"
//                   value={stage.amount}
//                   onChange={(e) => updateStage(i, "amount", e.target.value)}
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeStage(i)}
//                   disabled={workingStages.length === 1}
//                   className="w-100"
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           <Row className="g-3 mt-3">
//             <Col sm={6}>
//               <Form.Label>Total Credits</Form.Label>
//               <Form.Control value={getTotalCredit()} readOnly />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Remaining Amount</Form.Label>
//               <Form.Control value={getRemainingAmount()} readOnly />
//             </Col>
//           </Row>

//           <Form.Group className="mt-3 mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               name="description"
//               value={form.description}
//               onChange={handleFormChange}
//               placeholder="Optional notes"
//             />
//           </Form.Group>

//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
//             <Button type="submit" className="px-4 fw-bold rounded-3" variant="primary">
//               Save Changes
//             </Button>
//             <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={() => router.push("/viewclient-transaction")}>
//               Go Back
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditClientTransaction;

// Edit Client Transaction page
// "use client"; // Enables client-side features like useEffect and useRouter
// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap"; // Added Alert for error messages
// import Header from "../../components/Header";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri"; // Icon for Rupee sign
// import { FaExclamationTriangle } from 'react-icons/fa'; // Icon for warnings

// const EditClientTransaction = () => {
//   const router = useRouter(); // Hook to programmatically navigate between routes
//   const params = useParams(); // Hook to access URL parameters
//   const transactionId = params.id; // Get the transaction ID from the URL (e.g., /edit-transaction/123)

//   // State to store the user's role for access control
//   const [userRole, setUserRole] = useState(null); // Will be 'admin', 'manager', or 'guest'

//   // Main form state, initialized with empty strings
//   const [form, setForm] = useState({
//     clientName: "", // This will display the client's name (read-only)
//     totalAmount: "",
//     tokenAmount: "",
//     description: "",
//   });

//   // State for dynamic working stages, initialized with one empty stage
//   const [workingStages, setWorkingStages] = useState([
//     { workingStage: "", workingDescription: "" },
//   ]);

//   // State to store the original creation date of the transaction
//   const [clientCreatedAt, setClientCreatedAt] = useState("");

//   // State to hold the client's actual ID (from the database) for the PATCH request.
//   // This is crucial for maintaining the relationship in Payload CMS.
//   const [clientId, setClientId] = useState("");

//   // UI loading states
//   const [loading, setLoading] = useState(true); // True when fetching existing transaction data
//   const [submitting, setSubmitting] = useState(false); // True when submitting updated data
//   const [error, setError] = useState(''); // State to display any error messages

//   // 🚀 ACCESS CONTROL: Check user role immediately on component mount
//   useEffect(() => {
//     if (typeof window !== "undefined") { // Ensure code runs only in the browser
//       const userData = localStorage.getItem("user");
//       let role = null;
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           role = parsedUser.role;
//           setUserRole(role); // Set the role to state
//         } catch (parseError) {
//           console.error("Error parsing user data from localStorage in EditClientTransaction:", parseError);
//           // If parsing fails, default to an unauthorized state
//         }
//       }

//       // If the user's role is not 'admin' or 'manager', redirect them.
//       // This is a client-side gate; server-side validation is also paramount.
//       if (role !== 'admin' && role !== 'manager') {
//         console.warn(`Unauthorized access attempt to EditClientTransaction by user with role: ${role || 'undefined'}. Redirecting...`);
//         // Use a slight delay for user to see the message before redirect
//         setTimeout(() => {
//           localStorage.clear()
//           window.location.href = '/api/logout'
//         }, 1500); // Redirect after 1.5 seconds
//       }
//     }
//   }, [router]); // Re-run if router object changes (rare)

//   // 🚀 PERFORMANCE / DATA FETCHING: Fetch existing transaction when the page loads
//   useEffect(() => {
//     // Only proceed to fetch data if transactionId exists and userRole is determined to be authorized
//     if (transactionId && (userRole === 'admin' || userRole === 'manager')) {
//       const fetchTransaction = async () => {
//         try {
//           const res = await fetch(`/api/client-transaction/${transactionId}`);
//           const data = await res.json();

//           if (res.ok) {
//             // Populate form fields with fetched data
//             setForm({
//               clientName: data.clientName?.clientName || "", // Use clientName from the populated client object
//               totalAmount: data.totalAmount || "",
//               tokenAmount: data.tokenAmount || "",
//               description: data.description || "",
//             });

//             // Set the actual client ID for the PATCH request
//             setClientId(data.clientName?.id || data.clientName?._id || ""); // Use .id or ._id based on Payload structure

//             // Set working stages; if none exist, initialize with one empty stage
//             setWorkingStages(data.workingStage?.length > 0 ? data.workingStage : [
//               { workingStage: "", workingDescription: "" },
//             ]);

//             setClientCreatedAt(data.clientCreatedAt); // Store creation date
//           } else {
//             // Handle API errors during fetch
//             setError(data.message || "Error loading transaction data.");
//             console.error("Failed to fetch transaction:", data);
//           }
//         } catch (err) {
//           // Handle network or unexpected errors during fetch
//           console.error("Fetch error:", err);
//           setError("Failed to load transaction. Please check your network connection.");
//         } finally {
//           setLoading(false); // End loading state regardless of success or failure
//         }
//       };

//       fetchTransaction();
//     } else if (userRole && userRole !== 'admin' && userRole !== 'manager') {
//       // If user is not authorized, stop loading and prevent fetch
//       setLoading(false);
//     }
//   }, [transactionId, userRole]); // Depend on transactionId and userRole to re-fetch if they change

//   // Handle changes in main form input fields
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     setError(''); // Clear error when user starts typing
//   };

//   // Handle changes within a specific working stage input
//   const updateStage = (index, field, value) => {
//     const updated = [...workingStages];
//     updated[index] = { ...updated[index], [field]: value }; // Correctly update the specific field
//     setWorkingStages(updated);
//   };

//   // Add a new empty working stage row
//   const addStage = () => {
//     setWorkingStages([...workingStages, { workingStage: "", workingDescription: "" }]);
//   };

//   // Remove a working stage row by its index
//   const removeStage = (index) => {
//     // Ensure at least one stage remains
//     if (workingStages.length > 1) {
//       const updated = workingStages.filter((_, i) => i !== index);
//       setWorkingStages(updated);
//     }
//   };

//   // Calculate the total credited amount from token and all working stages
//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0; // Convert to number, default to 0
//     const stagesTotal = workingStages.reduce(
//       (sum, s) => sum + (parseFloat(s.workingDescription) || 0), // Sum amounts from working stages
//       0
//     );
//     return token + stagesTotal;
//   };

//   // Calculate the remaining amount (Total Amount - Total Credits)
//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   // Handle form submission to update the client transaction
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default browser form submission
//     setSubmitting(true); // Activate submitting state (show spinner)
//     setError(''); // Clear any previous errors

//     // Basic client-side validation
//     if (!form.totalAmount || !form.tokenAmount) {
//         setError('Total Amount and Token Amount are required.');
//         setSubmitting(false);
//         return;
//     }

//     // Construct the payload for the PATCH request to the backend
//     const payload = {
//       clientName: clientId, // Send only the client ID, as the name is read-only
//       totalAmount: parseFloat(form.totalAmount),
//       tokenAmount: parseFloat(form.tokenAmount),
//       totalCredit: getTotalCredit(), // Calculated value
//       remainingAmount: getRemainingAmount(), // Calculated value
//       description: form.description,
//       workingStage: workingStages, // Array of working stages
//       clientUpdatedAt: new Date().toISOString(), // Update timestamp
//     };

//     try {
//       // Send PATCH request to update the specific transaction by ID
//       const res = await fetch(`/api/client-transaction/${transactionId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         router.push("/viewclient-transaction"); // Redirect to view page on success
//       } else {
//         const errData = await res.json();
//         // Display specific error message from the backend if available
//         setError(errData.message || "Failed to update transaction. Please try again.");
//         console.error("API error:", errData);
//       }
//     } catch (err) {
//       // Catch network errors or other unexpected issues
//       console.error("Submission failed:", err);
//       setError("An unexpected error occurred. Please check your network connection.");
//     } finally {
//       setSubmitting(false); // Deactivate submitting state
//     }
//   };

//   // 🚀 PERFORMANCE: Show loading spinner while initial data or user role is being determined
//   if (loading || userRole === null) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
//       </div>
//     );
//   }

//   // Display unauthorized message if user role is not admin or manager
//   if (userRole !== 'admin' && userRole !== 'manager') {
//     return (
//       <>
//         <Container className="mt-5 text-center">
//           <Alert variant="danger" className="fw-semibold">
//             <FaExclamationTriangle className="me-2" />
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
//       <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-md-75 mx-auto">
//         <h4 className="text-center mb-4">Edit Client Transaction</h4>

//         {/* Display error message if any */}
//         {error && (
//           <Alert variant="danger" className="text-center fw-semibold">
//             <FaExclamationTriangle className="me-2" /> {error}
//           </Alert>
//         )}

//         <Form onSubmit={handleSubmit}>
//           {/* Read-only Client Name - Displayed from fetched data */}
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Client Name</Form.Label>
//             {/* The clientName is fetched and displayed but cannot be edited */}
//             <Form.Control value={form.clientName} readOnly />
//           </Form.Group>

//           {/* Amount Inputs: Total Amount and Token Amount */}
//           <Row className="g-3">
//             <Col sm={6}>
//               <Form.Label>Total Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalAmount"
//                 value={form.totalAmount}
//                 onChange={handleFormChange}
//                 required // This field is mandatory
//                 min="0" // Prevent negative values
//               />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Token Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="tokenAmount"
//                 value={form.tokenAmount}
//                 onChange={handleFormChange}
//                 required // This field is mandatory
//                 min="0" // Prevent negative values
//               />
//             </Col>
//           </Row>

//           <hr /> {/* Visual separator */}

//           {/* Working Stages Section: Allows dynamic addition/removal of stages */}
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="fw-bold">Working Stages</h5>
//             <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
//           </div>

//           {/* Map through workingStages array to render individual stage input rows */}
//           {workingStages.map((stage, index) => (
//             <Row key={index} className="g-2 mb-2 align-items-center">
//               <Col sm={6}>
//                 <Form.Control
//                   placeholder="Work Description (e.g., Design, Development, Testing)"
//                   value={stage.workingStage}
//                   onChange={(e) => updateStage(index, "workingStage", e.target.value)}
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Amount"
//                   value={stage.workingDescription} // This holds the amount for the stage
//                   onChange={(e) => updateStage(index, "workingDescription", e.target.value)}
//                   min="0" // Prevent negative values
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeStage(index)}
//                   className="w-100"
//                   disabled={workingStages.length === 1} // Disable if only one stage remains
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           {/* Calculated Totals: Read-only fields */}
//           <Row className="g-3 mt-3">
//             <Col sm={6}>
//               <Form.Label>Total Credits</Form.Label>
//               <Form.Control
//                 value={getTotalCredit().toFixed(2)} // Display with 2 decimal places
//                 readOnly // This value is calculated
//               />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Remaining Amount</Form.Label>
//               <Form.Control
//                 value={getRemainingAmount().toFixed(2)} // Display with 2 decimal places
//                 readOnly // This value is calculated
//               />
//             </Col>
//           </Row>

//           {/* Description Textarea (Optional) */}
//           <Form.Group className="mt-3 mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               name="description"
//               value={form.description}
//               onChange={handleFormChange}
//               placeholder="Add any optional notes or remarks about this transaction"
//             />
//           </Form.Group>

//           {/* Action Buttons: Save Changes and Go Back */}
//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
//             <Button
//               type="submit"
//               className="px-4 fw-bold rounded-3"
//               variant="primary"
//               disabled={submitting} // Disable button when submission is in progress
//             >
//               {submitting ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </Button>
//             <Button
//               variant="secondary"
//               className="px-4 fw-bold rounded-3"
//               onClick={() => router.push("/viewclient-transaction")} // Redirects to the view page
//             >
//               Go Back
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditClientTransaction;


"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { TbTransactionRupee, TbPlus } from "react-icons/tb";
import { FaSave, FaExclamationTriangle } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faScrewdriverWrench, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const EditClientTransaction = () => {
  const router = useRouter();
  const params = useParams();
  const transactionId = params.id; // Get the transaction ID from the URL

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // For initial data fetch and role check
  const [submitting, setSubmitting] = useState(false); // For form submission

  // Main form state, initialized with empty strings
  const [form, setForm] = useState({
    clientName: "", // Display name
    query_license: "", // Display value
    near_village: "", // Display value
    description: "",
    paymentstatus: "", // Display value
    totalAmount: "", // This will correspond to our working stages total
    totalAmountclient: "", // This will correspond to client working stages total
  });

  // State to store actual IDs for relationship fields (for PATCH payload)
  const [clientId, setClientId] = useState("");
  const [queryLicenseId, setQueryLicenseId] = useState("");
  const [nearVillageId, setNearVillageId] = useState("");

  // Working stages for our side
  const [workingStages, setWorkingStages] = useState([{ workingStage: "", workingDescription: "" }]);
  // Working stages for the client side
  const [workingStagesClient, setWorkingStagesClient] = useState([{ workingStageclient: "", workingDescriptionclient: "" }]);

  // State for read-only creation date
  const [clientCreatedAt, setClientCreatedAt] = useState("");
  const [clientUpdatedAt, setClientUpdatedAt] = useState(""); // Add this line

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 1. Client-Side Access Control
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role);
        } catch (parseError) {
          console.error("Error parsing user data from localStorage in EditClientTransaction:", parseError);
        }
      }

      if (role !== 'admin' && role !== 'manager') {
        console.warn(`Unauthorized access attempt to EditClientTransaction by user with role: ${role || 'undefined'}. Redirecting...`);
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/api/logout';
        }, 1500);
      }
    }
  }, [router]);

  // 2. Fetch existing transaction data
  useEffect(() => {
    // Only proceed to fetch data if transactionId exists and userRole is determined to be authorized
    if (transactionId && (userRole === 'admin' || userRole === 'manager')) {
      const fetchTransaction = async () => {
        try {
          const res = await fetch(`/api/client-transaction/${transactionId}`);
          const data = await res.json();

          if (res.ok) {
            // Populate form fields with fetched data
            setForm({
              clientName: data.clientName?.clientName || "",
              query_license: data.query_license?.query_license || "",
              near_village: data.near_village?.near_village || "",
              description: data.description || "",
              paymentstatus: data.paymentstatus || "pending",
              totalAmount: data.totalAmount?.toFixed(2) || "", // Our working stages total
              totalAmountclient: data.totalAmountclient?.toFixed(2) || "", // Client working stages total
            });

            // Set actual IDs for PATCH request
            setClientId(data.clientName?.id || data.clientName?._id || "");
            setQueryLicenseId(data.query_license?.id || data.query_license?._id || "");
            setNearVillageId(data.near_village?.id || data.near_village?._id || "");

            // Set working stages; if none exist, initialize with one empty stage
            setWorkingStages(data.workingStage?.length > 0 ?
              data.workingStage.map(s => ({ workingStage: s.workingStage || '', workingDescription: s.workingDescription?.toString() || '' })) :
              [{ workingStage: "", workingDescription: "" }]
            );

            setWorkingStagesClient(data.workingStageclient?.length > 0 ?
              data.workingStageclient.map(s => ({ workingStageclient: s.workingStageclient || '', workingDescriptionclient: s.workingDescriptionclient?.toString() || '' })) :
              [{ workingStageclient: "", workingDescriptionclient: "" }]
            );

            setClientCreatedAt(data.clientCreatedAt); // Store creation date
            setClientUpdatedAt(data.clientUpdatedAt); // Set updated date or current time if not available
          } else {
            setError(data.message || "Error loading transaction data.");
            console.error("Failed to fetch transaction:", data);
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("Failed to load transaction. Please check your network connection.");
        } finally {
          setLoading(false); // End loading state regardless of success or failure
        }
      };

      fetchTransaction();
    } else if (userRole && userRole !== 'admin' && userRole !== 'manager') {
      setLoading(false); // If unauthorized, stop loading
    }
  }, [transactionId, userRole]);

  // Handle changes in main form input fields (only for editable fields)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear error when user starts typing
    setSuccess("");
  };

  // Handle changes within a specific working stage input (Our Side)
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index] = { ...updated[index], [field]: value };
    setWorkingStages(updated);
  };

  // Add a new empty working stage row (Our Side)
  const addStage = () => {
    setWorkingStages([...workingStages, { workingStage: "", workingDescription: "" }]);
  };

  // Remove a working stage row (Our Side) by its index
  const removeStage = (index) => {
    if (workingStages.length > 1) {
      const updated = workingStages.filter((_, i) => i !== index);
      setWorkingStages(updated);
    }
  };

  // Handle changes within a specific working stage input (Client Side)
  const updateStageClient = (index, field, value) => {
    const updated = [...workingStagesClient];
    updated[index] = { ...updated[index], [field]: value };
    setWorkingStagesClient(updated);
  };

  // Add a new empty working stage row (Client Side)
  const addStageClient = () => {
    setWorkingStagesClient([...workingStagesClient, { workingStageclient: "", workingDescriptionclient: "" }]);
  };

  // Remove a working stage row (Client Side) by its index
  const removeStageClient = (index) => {
    if (workingStagesClient.length > 1) {
      const updated = workingStagesClient.filter((_, i) => i !== index);
      setWorkingStagesClient(updated);
    }
  };

  // Calculate totalAmount (from our working stages)
  const getTotalAmount = () => {
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.workingDescription) || 0), 0);
    return workTotal;
  };

  // Calculate totalAmountclient (from client's working stages)
  const getTotalAmountClient = () => {
    const workTotalClient = workingStagesClient.reduce((sum, s) => sum + (parseFloat(s.workingDescriptionclient) || 0), 0);
    return workTotalClient;
  };

  // Calculate the remaining amount (Our Total Amount - Client Total Amount)
  const getRemainingAmount = () => {
    return getTotalAmount() - getTotalAmountClient();
  };


  // Handle form submission to update the client transaction
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    // Construct the payload for the PATCH request to the backend
    const payload = {
      // These are read-only and their IDs should not change, but we pass them to ensure relationship integrity if required by backend
      clientName: clientId,
      query_license: queryLicenseId,
      near_village: nearVillageId,
      paymentstatus: form.paymentstatus, // This is also read-only in the UI, but part of the collection config
      clientCreatedAt: clientCreatedAt, // Read-only, send existing value
      clientUpdatedAt: new Date().toISOString(), // Add this line

      totalAmount: getTotalAmount(), // This is editable from the UI
      totalAmountclient: getTotalAmountClient(), // This is editable from the UI
      remainingAmount: getRemainingAmount(), // Calculated

      workingStage: workingStages.map((s) => ({
        workingStage: s.workingStage,
        workingDescription: parseFloat(s.workingDescription),
      })),
      workingStageclient: workingStagesClient.map((s) => ({
        workingStageclient: s.workingStageclient,
        workingDescriptionclient: parseFloat(s.workingDescriptionclient),
      })),
      description: form.description,
    };

    try {
      const res = await fetch(`/api/client-transaction/${transactionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess("Client transaction updated successfully!");
        setTimeout(() => {
          setSuccess("");
          router.push("/viewclient-transaction"); // Redirect to view page on success
        }, 1000);
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to update transaction. Please try again.");
        console.error("API error:", errData);
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setError("An unexpected error occurred. Please check your network connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading spinner while initial data or user role is being determined
  if (loading || userRole === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
      </div>
    );
  }

  // Display unauthorized message if user role is not admin or manager
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

  return (
    <>
      <Header />
      <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Edit Client Transaction
        </h4>

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

        <Form onSubmit={handleSubmit}>
          {/* Read-only Client Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">Client Name</Form.Label>
            <Form.Control value={form.clientName} readOnly className="bg-light" />
          </Form.Group>

          {/* Read-only Query License and Near Village */}
          <Row className="my-4">
            <Col sm={6} className="pb-3 pb-md-0">
              <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">Query License</Form.Label>
              <Form.Control value={form.query_license} readOnly className="bg-light" />
            </Col>
            <Col sm={6}>
              <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">Nearby Village</Form.Label>
              <Form.Control value={form.near_village} readOnly className="bg-light" />
            </Col>
          </Row>

          <hr className="my-2" />

          {/* Client Created At and Payment Status */}
          <Row className="my-4">
            <Col sm={4} className="pb-3 pb-md-0">
              {/* Client Created At (Read-only) */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">Transaction Created At</Form.Label>
                <Form.Control value={clientCreatedAt ? `${formatDate(clientCreatedAt)} at ${formatTime(clientCreatedAt)}` : 'Never'} readOnly className="bg-light" />
              </Form.Group>
            </Col>
            <Col sm={4}>
            {/*Client Updated At (Read-only)  */}
            <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">Transaction Updated At</Form.Label>
            <Form.Control value={clientUpdatedAt ? `${formatDate(clientUpdatedAt)} at ${formatTime(clientUpdatedAt)}` : 'Never'} readOnly className="bg-light" />
          </Form.Group>
            </Col>
            <Col sm={4}>
            <Form.Label className="fw-bold fs-5 text-center text-wrap text-capitalize">transaction Payment Status</Form.Label>
            <div className={`p-2 rounded text-center fw-bold text-uppercase ${form.paymentstatus === 'paid' ? 'bg-success text-white' : form.paymentstatus === 'pending' ? 'bg-warning text-dark' : 'bg-danger text-white'}`}>
              {form.paymentstatus || 'N/A'}
            </div>
          </Col>
        </Row>


        <hr className="my-2" />

        {/* Section for Dynamic Working Stages (Our Side) */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <h5 className="fw-bold text-dark fs-5">
            <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
            Our Working Stages
          </h5>
          <Button variant="primary" onClick={addStage} className="w-25 fs-6 fw-bold text-white text-capitalize text-center justify-content-center align-items-center d-flex gap-1">
            <TbPlus className="me-1 fw-bold fs-5" size={35} /> Add Stage
          </Button>
        </div>

        {workingStages.map((stage, index) => (
          <Row key={`our-stage-${index}`} className="my-2 align-items-center">
            <Col sm={5} className="pb-3 pb-md-0">
              <Form.Control
                placeholder="Work Description"
                value={stage.workingStage}
                onChange={(e) => updateStage(index, 'workingStage', e.target.value)}
              />
            </Col>
            <Col sm={4} className="pb-3 pb-md-0">
              <Form.Control
                type="number"
                placeholder="₹ Amount"
                value={stage.workingDescription}
                onChange={(e) => updateStage(index, 'workingDescription', e.target.value)}
              />
            </Col>
            <Col sm={3} className="pb-3 pb-md-0">
              <Button variant="danger" onClick={() => removeStage(index)} disabled={workingStages.length === 1} className="w-75 fw-bold text-white">
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        <hr className="my-2" />

        {/* Section for Dynamic Working Stages (Client Side) */}
        <div className="d-flex justify-content-between align-items-center my-4">
          <h5 className="fw-bold text-dark fs-5">
            <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" />
            Client Working Stages
          </h5>
          <Button variant="primary" onClick={addStageClient} className="w-25 fs-6 fw-bold text-white text-capitalize text-center justify-content-center align-items-center d-flex gap-1">
            <TbPlus className="me-1 fw-bold fs-5" size={35} /> Add Stage
          </Button>
        </div>

        {workingStagesClient.map((stage, index) => (
          <Row key={`client-stage-${index}`} className="my-2 align-items-center">
            <Col sm={5} className="pb-3 pb-md-0">
              <Form.Control
                placeholder="Client Work Description"
                value={stage.workingStageclient}
                onChange={(e) => updateStageClient(index, 'workingStageclient', e.target.value)}
              />
            </Col>
            <Col sm={4} className="pb-3 pb-md-0">
              <Form.Control
                type="number"
                placeholder="₹ Amount"
                value={stage.workingDescriptionclient}
                onChange={(e) => updateStageClient(index, 'workingDescriptionclient', e.target.value)}
              />
            </Col>
            <Col sm={3} className="pb-3 pb-md-0">
              <Button variant="danger" onClick={() => removeStageClient(index)} disabled={workingStagesClient.length === 1} className="w-75 fw-bold text-white">
                Remove
              </Button>
            </Col>
          </Row>
        ))}

        {/* Calculated Totals: Read-only fields */}
        <Row className="my-4">
          <Col sm={6} className="pb-3 pb-md-0">
            <Form.Label className="fw-bold fs-5">Total Credits (Our Side) (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
            <Form.Control value={getTotalAmount().toFixed(2)} readOnly className="bg-white" />
          </Col>
          <Col sm={6} className="pb-3 pb-md-0">
            <Form.Label className="fw-bold fs-5">Total Debits (Client Side) (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
            <Form.Control value={getTotalAmountClient().toFixed(2)} readOnly className="bg-white" />
          </Col>
        </Row>

        <Row className="my-4">
          <Col sm={12} className="pb-3 pb-md-0">
            <Form.Label className="fw-bold fs-5">Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
            <Form.Control value={getRemainingAmount().toFixed(2)} readOnly className="bg-white" />
          </Col>
        </Row>

        {/* Description Textarea */}
        <Form.Group className="my-4">
          <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Add any optional notes or remarks about this transaction"
          />
        </Form.Group>

        {/* Action Buttons: Save Changes and Go Back */}
        <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
          <Button
            type="submit"
            className="px-4 fw-bold rounded-3"
            variant="success"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Saving changes...
              </>
            ) : (
              <>
                <FaSave className="me-2 fs-5" /> Save Changes
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="px-4 fw-bold rounded-3"
            onClick={() => router.push("/viewclient-transaction")}
          >
            Go Back
          </Button>
        </div>
      </Form>
    </Container >
    </>
  );
};

export default EditClientTransaction;