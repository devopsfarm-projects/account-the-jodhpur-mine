//pages/editvendor-transaction/[id]/page.jsx
// 'use client';
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Container, Form, Row, Col, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIndianRupeeSign, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
// import { FaPlus, FaSave } from "react-icons/fa";
// import Header from "../../components/Header";

// const EditVendorTransaction = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;
//   console.log(`the id of the vendor transaction is`, id);
//   const [form, setForm] = useState({
//     vendorName: "",
//     totalAmount: "",
//     tokenAmount: "",
//     description: "",
//     createdAt: "",
//   });

//   const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);

//   // Load existing transaction data from localStorage
//   useEffect(() => {
//     const allTxns = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
//     const selected = allTxns[id];

//     if (selected) {
//       setForm({
//         vendorName: selected.vendorName,
//         totalAmount: selected.totalAmount,
//         tokenAmount: selected.tokenAmount,
//         description: selected.description || "",
//         createdAt: selected.createdAt,
//       });
//       setWorkingStages(selected.workingStages || []);
//     }
//   }, [id]);

//   // Update form fields
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Update one work stage field
//   const updateStage = (idx, field, value) => {
//     const newStages = [...workingStages];
//     newStages[idx][field] = value;
//     setWorkingStages(newStages);
//   };

//   // Add new stage
//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: "", amount: "" }]);
//   };

//   // Remove one stage
//   const removeStage = (idx) => {
//     const filtered = workingStages.filter((_, i) => i !== idx);
//     setWorkingStages(filtered);
//   };

//   // Calculate total credits
//   const getTotalCredits = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const workTotal = workingStages.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
//     return token + workTotal;
//   };

//   // Remaining = Total - Credits
//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredits();
//   };

//   // Save changes to localStorage
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updated = {
//       ...form,
//       totalAmount: parseFloat(form.totalAmount),
//       tokenAmount: parseFloat(form.tokenAmount),
//       totalCredits: getTotalCredits(),
//       remainingAmount: getRemainingAmount(),
//       workingStages,
//     };

//     const allTxns = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
//     allTxns[id] = { ...allTxns[id], ...updated };
//     localStorage.setItem("VendorTransactions", JSON.stringify(allTxns));

//     router.push("/viewvendor-transaction");
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 mb-5 p-3 p-md-4 rounded-4 shadow bg-light w-100 w-md-75 mx-auto">
//         <h4 className="text-center text-primary fw-bold mb-4">
//           Edit Vendor Transaction
//         </h4>

//         <Form onSubmit={handleSubmit}>
//           {/* Vendor Name (Read-Only) */}
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold fs-6">Vendor Name</Form.Label>
//             <Form.Control value={form.vendorName} readOnly />
//           </Form.Group>

//           {/* Total and Token Amount */}
//           <Row>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-6">
//                   Total Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
//                 </Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="totalAmount"
//                   value={form.totalAmount}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-6">
//                   Token Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
//                 </Form.Label>
//                 <Form.Control
//                   type="number"
//                   name="tokenAmount"
//                   value={form.tokenAmount}
//                   onChange={handleFormChange}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Work Stages Section */}
//           <hr />
//           <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
//             <h5 className="fw-bold fs-6 mb-2">
//               <FontAwesomeIcon icon={faScrewdriverWrench} /> Work Stages
//             </h5>
//             <Button variant="warning" onClick={addStage} className="fw-bold mb-2">
//               <FaPlus className="me-1" /> Add Stage
//             </Button>
//           </div>

//           {workingStages.map((stage, idx) => (
//             <Row key={idx} className="mb-2">
//               <Col xs={12} md={5} className="mb-2 mb-md-0">
//                 <Form.Control
//                   placeholder="Work Description"
//                   value={stage.work}
//                   onChange={(e) => updateStage(idx, "work", e.target.value)}
//                 />
//               </Col>
//               <Col xs={12} md={4} className="mb-2 mb-md-0">
//                 <Form.Control
//                   type="number"
//                   placeholder="₹ Amount"
//                   value={stage.amount}
//                   onChange={(e) => updateStage(idx, "amount", e.target.value)}
//                 />
//               </Col>
//               <Col xs={12} md={3}>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeStage(idx)}
//                   disabled={workingStages.length === 1}
//                   className="w-100"
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           {/* Credits & Remaining */}
//           <Row className="mt-3">
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-6">
//                   Total Credits <FontAwesomeIcon icon={faIndianRupeeSign} />
//                 </Form.Label>
//                 <Form.Control value={getTotalCredits()} readOnly className="bg-white" />
//               </Form.Group>
//             </Col>
//             <Col xs={12} md={6}>
//               <Form.Group className="mb-3">
//                 <Form.Label className="fw-bold fs-6">
//                   Remaining Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
//                 </Form.Label>
//                 <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Description */}
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold fs-6">Description (optional)</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               name="description"
//               value={form.description}
//               onChange={handleFormChange}
//               placeholder="Enter any notes or remarks"
//             />
//           </Form.Group>

//           {/* Created At (Read-Only) */}
//           <Form.Group className="mb-4">
//             <Form.Label className="fw-bold fs-6">Created At</Form.Label>
//             <Form.Control value={form.createdAt} readOnly />
//           </Form.Group>

//           {/* Submit Button */}
//           <div className="text-center">
//             <Button type="submit" variant="primary" className="fs-5 fw-bold px-4 py-2">
//               <FaSave className="me-2 mb-1" /> Save Changes
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditVendorTransaction;

//page editvendor-transaction/[id]/page.jsx
// "use client"; // Enables client-side features like useEffect and useRouter
// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
// import Header from "../../components/Header";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// const EditVendorTransaction = () => {
//   const router = useRouter(); // Used to navigate between pages
//   const params = useParams(); // Get route params
//   const id = params.id; // This is the vendor transaction ID

//   // ✅ Main form state (to store vendor transaction fields)
//   const [form, setForm] = useState({
//     vendorName: "", // Only for display
//     totalAmount: "",
//     tokenAmount: "",
//     description: "",
//   });

//   // ✅ Working stages: dynamic array of objects
//   const [workingStages, setWorkingStages] = useState([
//     { workingStage: "", workingDescription: "" },
//   ]);

//   // ✅ Store created date
//   const [vendorCreatedAt, setVendorCreatedAt] = useState("");

//   // ✅ Store vendor ID (used for PATCH submission)
//   const [vendorId, setVendorId] = useState("");

//   // ✅ UI state for loading and submission
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   // ✅ Fetch the vendor transaction on initial page load
//   useEffect(() => {
//     const fetchTransaction = async () => {
//       try {
//         const res = await fetch(`/api/vendor-transaction/${id}`);
//         const data = await res.json();

//         if (res.ok) {
//           // Fill form data from API response
//           setForm({
//             vendorName: data.vendorName?.vendorName || "",
//             totalAmount: data.totalAmount || "",
//             tokenAmount: data.tokenAmount || "",
//             description: data.description || "",
//           });

//           // Save vendor ID
//           setVendorId(data.vendorName?.id || "");

//           // Set working stages if available
//           setWorkingStages(data.workingStage?.length > 0 ? data.workingStage : [
//             { workingStage: "", workingDescription: "" },
//           ]);

//           // Save createdAt date
//           setVendorCreatedAt(data.vendorCreatedAt || "");
//         } else {
//           alert("Error loading vendor transaction.");
//         }
//       } catch (err) {
//         console.error("Fetch error:", err);
//         alert("Failed to load transaction.");
//       } finally {
//         setLoading(false); // Hide loader
//       }
//     };

//     fetchTransaction();
//   }, [id]);

//   // ✅ Update form input fields
//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Update working stage values
//   const updateStage = (index, field, value) => {
//     const updated = [...workingStages];
//     updated[index][field] = value;
//     setWorkingStages(updated);
//   };

//   // ✅ Add new stage input
//   const addStage = () => {
//     setWorkingStages([...workingStages, { workingStage: "", workingDescription: "" }]);
//   };

//   // ✅ Remove a stage row
//   const removeStage = (index) => {
//     if (workingStages.length > 1) {
//       const updated = workingStages.filter((_, i) => i !== index);
//       setWorkingStages(updated);
//     }
//   };

//   // ✅ Calculate total credit = token + working stage amounts
//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const stageTotal = workingStages.reduce(
//       (sum, s) => sum + (parseFloat(s.workingDescription) || 0),
//       0
//     );
//     return token + stageTotal;
//   };

//   // ✅ Calculate remaining amount = total - credit
//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   // ✅ Submit updated vendor transaction to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form reload
//     setSubmitting(true);

//     const payload = {
//       vendorName: vendorId, // Relationship: only send vendor ID
//       totalAmount: parseFloat(form.totalAmount),
//       tokenAmount: parseFloat(form.tokenAmount),
//       totalCredit: getTotalCredit(),
//       remainingAmount: getRemainingAmount(),
//       description: form.description,
//       workingStage: workingStages,
//       vendorUpdatedAt: new Date().toISOString(),
//     };

//     try {
//       const res = await fetch(`/api/vendor-transaction/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         router.push("/viewvendor-transaction");
//       } else {
//         const err = await res.json();
//         alert(`Error: ${err.message}`);
//       }
//     } catch (err) {
//       console.error("Submission failed", err);
//       alert("Could not update transaction.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // ✅ Show loading spinner while data loads
//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-md-75 mx-auto">
//         <h4 className="text-center mb-4">Edit Vendor Transaction</h4>

//         <Form onSubmit={handleSubmit}>
//           {/* Vendor Name - Read Only */}
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Vendor Name</Form.Label>
//             <Form.Control value={form.vendorName} readOnly />
//           </Form.Group>

//           {/* Amounts */}
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

//           {/* Working Stages */}
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="fw-bold">Working Stages</h5>
//             <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
//           </div>

//           {workingStages.map((stage, index) => (
//             <Row key={index} className="g-2 mb-2 align-items-center">
//               <Col sm={6}>
//                 <Form.Control
//                   placeholder="Work"
//                   value={stage.workingStage}
//                   onChange={(e) => updateStage(index, "workingStage", e.target.value)}
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Amount"
//                   value={stage.workingDescription}
//                   onChange={(e) => updateStage(index, "workingDescription", e.target.value)}
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeStage(index)}
//                   className="w-100"
//                   disabled={workingStages.length === 1}
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           {/* Totals */}
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

//           {/* Optional Description */}
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

//           {/* Form Buttons */}
//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
//             <Button type="submit" className="px-4 fw-bold rounded-3" variant="primary" disabled={submitting}>
//               {submitting ? "Saving..." : "Save Changes"}
//             </Button>
//             <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={() => router.push("/viewvendor-transaction")}>
//               Go Back
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditVendorTransaction;

//page editvendor-transaction/[id]/page.jsx
"use client"; // Enables client-side features like useEffect and useRouter

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap"; // Added Alert for error messages
import Header from "../../components/Header";
import { RiMoneyRupeeCircleFill } from "react-icons/ri"; // Icon for Rupee sign
import { FaExclamationTriangle } from 'react-icons/fa'; // Icon for warnings

const EditVendorTransaction = () => {
  const router = useRouter(); // Used to navigate between pages
  const params = useParams(); // Get route params
  const transactionId = params.id; // This is the vendor transaction ID from the URL

  // State to store the user's role for access control
  const [userRole, setUserRole] = useState(null); // Will be 'admin', 'manager', or 'guest'

  // ✅ Main form state (to store vendor transaction fields)
  const [form, setForm] = useState({
    vendorName: "", // Only for display (read-only)
    totalAmount: "",
    tokenAmount: "",
    description: "",
  });

  // ✅ Working stages: dynamic array of objects for payments/milestones
  const [workingStages, setWorkingStages] = useState([
    { workingStage: "", workingDescription: "" }, // Initial empty stage
  ]);

  // ✅ Store created date of the transaction
  const [vendorCreatedAt, setVendorCreatedAt] = useState("");

  // ✅ Store vendor ID (used for PATCH submission to link transaction to vendor)
  const [vendorId, setVendorId] = useState("");

  // ✅ UI state for loading and submission feedback
  const [loading, setLoading] = useState(true); // True when fetching existing transaction data
  const [submitting, setSubmitting] = useState(false); // True when sending update request
  const [error, setError] = useState(''); // State to display any error messages

  // 🚀 ACCESS CONTROL: Check user role immediately on component mount
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure this code runs only in the browser
      const userData = localStorage.getItem("user");
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role); // Set the role to state
        } catch (parseError) {
          console.error("Error parsing user data from localStorage in EditVendorTransaction:", parseError);
          // If parsing fails, default to an unauthorized state
        }
      }

      // If the user's role is not 'admin' or 'manager', redirect them.
      // This is a client-side gate; server-side validation is also paramount.
      if (role !== 'admin' && role !== 'manager') {
        console.warn(`Unauthorized access attempt to EditVendorTransaction by user with role: ${role || 'undefined'}. Redirecting...`);
        // Use a slight delay for user to see the message before redirect
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1000); // Redirect after 1.5 seconds
      }
    }
  }, [router]); // Re-run if router object changes (rare)

  // 🚀 PERFORMANCE / DATA FETCHING: Fetch the vendor transaction on initial page load
  useEffect(() => {
    // Only proceed to fetch data if transactionId exists and userRole is determined to be authorized
    if (transactionId && (userRole === 'admin' || userRole === 'manager')) {
      const fetchTransaction = async () => {
        try {
          const res = await fetch(`/api/vendor-transaction/${transactionId}`);
          const data = await res.json();

          if (res.ok) {
            // Fill form data from API response
            setForm({
              vendorName: data.vendorName?.vendorName || "", // Use vendorName from the populated vendor object
              totalAmount: data.totalAmount || "",
              tokenAmount: data.tokenAmount || "",
              description: data.description || "",
            });

            // Save vendor ID ( Payload CMS typically uses 'id' or '_id' for relationships)
            setVendorId(data.vendorName?.id || data.vendorName?._id || "");

            // Set working stages; if none exist, initialize with one empty stage
            setWorkingStages(data.workingStage?.length > 0 ? data.workingStage : [
              { workingStage: "", workingDescription: "" },
            ]);

            // Save createdAt date
            setVendorCreatedAt(data.vendorCreatedAt || "");
          } else {
            // Handle API errors during fetch
            setError(data.message || "Error loading vendor transaction.");
            console.error("Failed to fetch transaction:", data);
          }
        } catch (err) {
          // Handle network or unexpected errors during fetch
          console.error("Fetch error:", err);
          setError("Failed to load transaction. Please check your network connection.");
        } finally {
          setLoading(false); // Hide loader regardless of success or failure
        }
      };

      fetchTransaction();
    } else if (userRole && userRole !== 'admin' && userRole !== 'manager') {
      // If user is not authorized, stop loading and prevent fetch
      setLoading(false);
    }
  }, [transactionId, userRole]); // Depend on transactionId and userRole to re-fetch if they change

  // ✅ Update main form input fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  // ✅ Update specific values within a working stage
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index] = { ...updated[index], [field]: value }; // Correctly update the specific field
    setWorkingStages(updated);
  };

  // ✅ Add a new empty working stage input row
  const addStage = () => {
    setWorkingStages([...workingStages, { workingStage: "", workingDescription: "" }]);
  };

  // ✅ Remove a working stage row by its index
  const removeStage = (index) => {
    // Ensure at least one stage remains
    if (workingStages.length > 1) {
      const updated = workingStages.filter((_, i) => i !== index);
      setWorkingStages(updated);
    }
  };

  // ✅ Calculate total credit = token amount + sum of all working stage amounts
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0; // Convert to number, default to 0 if invalid
    const stageTotal = workingStages.reduce(
      (sum, s) => sum + (parseFloat(s.workingDescription) || 0), // Sum amounts from working stages
      0
    );
    return token + stageTotal;
  };

  // ✅ Calculate remaining amount = total amount - total credit
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // ✅ Submit updated vendor transaction to backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)
    setSubmitting(true); // Activate submitting state (show spinner)
    setError(''); // Clear any previous errors

    // Basic client-side validation
    if (!form.totalAmount || !form.tokenAmount) {
        setError('Total Amount and Token Amount are required.');
        setSubmitting(false);
        return;
    }

    // Construct the payload for the PATCH request to the backend API
    const payload = {
      vendorName: vendorId, // Send only the vendor ID (Payload handles relationships)
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(), // Calculated value
      remainingAmount: getRemainingAmount(), // Calculated value
      description: form.description,
      workingStage: workingStages, // Array of working stages
      vendorUpdatedAt: new Date().toISOString(), // Update timestamp
    };

    try {
      // Send PATCH request to update the specific transaction by ID
      const res = await fetch(`/api/vendor-transaction/${transactionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/viewvendor-transaction"); // Redirect to view page on success
      } else {
        const errData = await res.json();
        // Display specific error message from the backend if available
        setError(errData.message || "Failed to update transaction. Please try again.");
        console.error("API error:", errData);
      }
    } catch (err) {
      // Catch network errors or other unexpected issues
      console.error("Submission failed:", err);
      setError("An unexpected error occurred. Please check your network connection.");
    } finally {
      setSubmitting(false); // Deactivate submitting state
    }
  };

  // 🚀 PERFORMANCE: Show loading spinner while initial data or user role is being determined
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

  // Main component render for authorized users
  return (
    <>
      <Header /> {/* Renders the consistent navigation header */}
      <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4">Edit Vendor Transaction</h4>

        {/* Display error message if any */}
        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Vendor Name - Read Only field for display */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Vendor Name</Form.Label>
            {/* The vendorName is fetched and displayed but cannot be edited */}
            <Form.Control value={form.vendorName} readOnly />
          </Form.Group>

          {/* Amount Inputs: Total Amount and Token Amount */}
          <Row className="g-3">
            <Col sm={6}>
              <Form.Label>Total Amount <RiMoneyRupeeCircleFill /></Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={form.totalAmount}
                onChange={handleFormChange}
                required // This field is mandatory
                min="0" // Prevent negative values
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Token Amount <RiMoneyRupeeCircleFill /></Form.Label>
              <Form.Control
                type="number"
                name="tokenAmount"
                value={form.tokenAmount}
                onChange={handleFormChange}
                required // This field is mandatory
                min="0" // Prevent negative values
              />
            </Col>
          </Row>

          <hr /> {/* Visual separator */}

          {/* Working Stages Section: Allows dynamic addition/removal of stages */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-bold">Working Stages</h5>
            <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
          </div>

          {/* Map through workingStages array to render individual stage input rows */}
          {workingStages.map((stage, index) => (
            <Row key={index} className="g-2 mb-2 align-items-center">
              <Col sm={6}>
                <Form.Control
                  placeholder="Work Description (e.g., Phase 1 Completion, Material Purchase)"
                  value={stage.workingStage}
                  onChange={(e) => updateStage(index, "workingStage", e.target.value)}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  value={stage.workingDescription} // This holds the amount for the stage
                  onChange={(e) => updateStage(index, "workingDescription", e.target.value)}
                  min="0" // Prevent negative values
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="danger"
                  onClick={() => removeStage(index)}
                  className="w-100"
                  disabled={workingStages.length === 1} // Disable if only one stage remains
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Calculated Totals: Read-only fields */}
          <Row className="g-3 mt-3">
            <Col sm={6}>
              <Form.Label>Total Credits</Form.Label>
              <Form.Control
                value={getTotalCredit().toFixed(2)} // Display with 2 decimal places
                readOnly // This value is calculated
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Remaining Amount</Form.Label>
              <Form.Control
                value={getRemainingAmount().toFixed(2)} // Display with 2 decimal places
                readOnly // This value is calculated
              />
            </Col>
          </Row>

          {/* Optional Description Textarea */}
          <Form.Group className="mt-3 mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Add any optional notes or remarks about this transaction"
            />
          </Form.Group>

          {/* Form Buttons: Save Changes and Go Back */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
            <Button
              type="submit"
              className="px-4 fw-bold rounded-3"
              variant="primary"
              disabled={submitting} // Disable button when submission is in progress
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              variant="secondary"
              className="px-4 fw-bold rounded-3"
              onClick={() => router.push("/viewvendor-transaction")} // Redirects to the view page
            >
              Go Back
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditVendorTransaction;
