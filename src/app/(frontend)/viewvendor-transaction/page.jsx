// 'use client';
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Container, Table, Button, Modal, Form, Row, Col, InputGroup } from "react-bootstrap";
// import { EyeFill, PencilSquare } from "react-bootstrap-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIndianRupeeSign, faClipboard, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
// import { FaSearch } from "react-icons/fa";
// import Header from "../components/Header";  // Adjust path if needed

// const ViewVendorTransaction = () => {
//     const router = useRouter();

//     const [vendorTxns, setVendorTxns] = useState([]);
//     const [filteredTxns, setFilteredTxns] = useState([]);

//     const [searchName, setSearchName] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");

//     const [selectedTxn, setSelectedTxn] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     // Load data from localStorage on first render
//     useEffect(() => {
//         const data = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
//         setVendorTxns(data);
//         setFilteredTxns(data);
//     }, []);

//     // Apply filters for name and date
//     function applyFilters(name, start, end) {
//         const filtered = vendorTxns.filter(txn => {
//             const matchesName = txn.vendorName.toLowerCase().includes(name.toLowerCase());
//             const [datePart] = txn.createdAt.split(" ");
//             const [dd, mm, yyyy] = datePart.split("/");
//             const txnDate = new Date(`${yyyy}-${mm}-${dd}`);

//             const startObj = start ? new Date(start) : null;
//             const endObj = end ? new Date(end) : null;

//             const afterStart = startObj ? txnDate >= startObj : true;
//             const beforeEnd = endObj ? txnDate <= endObj : true;

//             return matchesName && afterStart && beforeEnd;
//         });
//         setFilteredTxns(filtered);
//     }

//     const handleSearch = (e) => {
//         setSearchName(e.target.value);
//         applyFilters(e.target.value, startDate, endDate);
//     };

//     const handleStartDate = (e) => {
//         setStartDate(e.target.value);
//         applyFilters(searchName, e.target.value, endDate);
//     };

//     const handleEndDate = (e) => {
//         setEndDate(e.target.value);
//         applyFilters(searchName, startDate, e.target.value);
//     };

//     const handleView = (txn) => {
//         setSelectedTxn(txn);
//         setShowModal(true);
//     };

//     const handleEdit = (id) => {
//         router.push(`/editvendor-transaction/${id}`);
//     };

//     return (
//         <>
//             <Header />

//             <Container className="mt-4 mb-5">
//                 <h4 className="text-center mb-4">
//                     <FontAwesomeIcon icon={faClipboard} /> View Vendor All Transactions
//                 </h4>

//                 {/* Search & Filter */}
//                 <Form className="mb-4">
//                     <Row className="gy-3 gx-3 align-items-end">
//                         <Col xs={12} md={4}>
//                             <InputGroup>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search by vendor name..."
//                                     value={searchName}
//                                     onChange={handleSearch}
//                                 />
//                                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                             </InputGroup>
//                         </Col>
//                         <Col xs={12} md={4}>
//                             <Form.Label>Start Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={startDate}
//                                 onChange={handleStartDate}
//                             />
//                         </Col>
//                         <Col xs={12} md={4}>
//                             <Form.Label>End Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={endDate}
//                                 onChange={handleEndDate}
//                             />
//                         </Col>
//                     </Row>
//                 </Form>

//                 {/* Transactions Table */}
//                 <div className="table-responsive">
//                     <Table
//                         striped
//                         bordered
//                         hover
//                         className="text-center align-middle fs-6 fw-medium"
//                     >
//                         <thead className="table-dark">
//                             <tr>
//                                 <th>Vendor Name</th>
//                                 <th>Date & Time</th>
//                                 <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Total</th>
//                                 <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Credits</th>
//                                 <th><FontAwesomeIcon icon={faIndianRupeeSign} /> Remaining</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredTxns.length > 0 ? filteredTxns.map((txn, idx) => (
//                                 <tr key={idx}>
//                                     <td>{txn.vendorName}</td>
//                                     <td>{txn.createdAt}</td>
//                                     <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.totalAmount}</td>
//                                     <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.totalCredits}</td>
//                                     <td><FontAwesomeIcon icon={faIndianRupeeSign} /> {txn.remainingAmount}</td>
//                                     <td>
//                                         <Button variant="info" size="sm" className="me-0 me-md-2 mb-2 mb-md-0 justify-content-center align-items-center "
//                                             onClick={() => handleView(txn)}>
//                                             <EyeFill />
//                                         </Button>
//                                         <Button variant="warning" size="sm" onClick={() => handleEdit(idx)}>
//                                             <PencilSquare />
//                                         </Button>
//                                     </td>
//                                 </tr>
//                             )) : (
//                                 <tr>
//                                     <td colSpan="6">No Vendor Transactions found</td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </Table>
//                 </div>

//                 {/* Details Modal */}
//                 <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Transaction Details</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedTxn && (
//                             <>
//                                 <p><strong>Date & Time:</strong> {selectedTxn.createdAt}</p>
//                                 <p><strong>Vendor:</strong> {selectedTxn.vendorName}</p>
//                                 <p><strong>Total Amount:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.totalAmount}</p>
//                                 <p><strong>Token:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.tokenAmount}</p>
//                                 <p><strong>Credits:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.totalCredits}</p>
//                                 <p><strong>Remaining:</strong> <FontAwesomeIcon icon={faIndianRupeeSign} /> {selectedTxn.remainingAmount}</p>
//                                 <p><strong>Description:</strong> {selectedTxn.description}</p>
//                                 <hr />
//                                 <h6>
//                                     <FontAwesomeIcon icon={faScrewdriverWrench} /> Work Items:
//                                 </h6>
//                                 <ul>
//                                     {selectedTxn.workingStages.map((s, i) => (
//                                         <li key={i}>
//                                             {s.work}: <FontAwesomeIcon icon={faIndianRupeeSign} /> {s.amount}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </>
//                         )}
//                     </Modal.Body>
//                 </Modal>
//             </Container>
//         </>
//     );
// }
// export default ViewVendorTransaction;

//page viewvendor-transaction.jsx
// "use client"; // Enables client-side features like useEffect and useRouter in Next.js
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Spinner } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
// import { PencilSquare } from "react-bootstrap-icons";
// import Header from "../components/Header";
// // Function to format a date string as DD/MM/YYYY (Indian format)
// const formatDate = (dateString) => {
//     const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
//     return new Date(dateString).toLocaleDateString('en-GB', options);
// };
// // Function to format a date string to HH:MM:SS AM/PM (Indian format)
// const formatTime = (dateString) => {
//     const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
//     return new Date(dateString).toLocaleTimeString('en-US', options);
// };
// const ViewVendorTransaction = () => {
//     const router = useRouter(); // Used for programmatic navigation

//     // All vendor transactions fetched from backend
//     const [transactions, setTransactions] = useState([]);

//     // Filtered results shown on screen
//     const [filteredTransactions, setFilteredTransactions] = useState([]);

//     // For search and date filter
//     const [searchName, setSearchName] = useState("");
//     const [startDate, setStartDate] = useState("");
//     const [endDate, setEndDate] = useState("");

//     // Modal management
//     const [selectedTransaction, setSelectedTransaction] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     // Loading spinner state
//     const [isLoading, setIsLoading] = useState(true);

//     // Fetch vendor transactions from Payload CMS API on component load
//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const res = await fetch("/api/vendor-transaction");
//                 const data = await res.json();
//                 const vendorData = data.docs || [];

//                 // Save to state
//                 setTransactions(vendorData);
//                 setFilteredTransactions(vendorData);
//                 setIsLoading(false);
//             } catch (error) {
//                 console.error("Error fetching vendor transactions:", error);
//                 setIsLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     // Filter by vendor name (on typing)
//     const handleSearch = (e) => {
//         const name = e.target.value.toLowerCase();
//         setSearchName(name);
//         applyFilters(name, startDate, endDate);
//     };

//     // Filter by start date
//     const handleStartDate = (e) => {
//         const value = e.target.value;
//         setStartDate(value);
//         applyFilters(searchName, value, endDate);
//     };

//     // Filter by end date
//     const handleEndDate = (e) => {
//         const value = e.target.value;
//         setEndDate(value);
//         applyFilters(searchName, startDate, value);
//     };

//     // Common filter logic for name and date range
//     const applyFilters = (name, start, end) => {
//         const filtered = transactions.filter((txn) => {
//             const vendorName = txn.vendorName?.vendorName?.toLowerCase() || "";

//             const matchesName = vendorName.includes(name);

//             const txnDate = new Date(txn.vendorCreatedAt);
//             //console.log(`the value of txnDate is ${txnDate}`);
//             const startDateObj = start ? new Date(start) : null;
//             //console.log(`the value of startDateObj is ${startDateObj}`);
//             const endDateObj = end ? new Date(end) : null;
//             //console.log(`the value of endDateObj is ${endDateObj}`);
//             if (endDateObj) {
//                 endDateObj.setHours(23, 59, 59, 999); // This covers the full end date
//             }
//             const matchesStart = startDateObj ? txnDate >= startDateObj : true;
//             const matchesEnd = endDateObj ? txnDate <= endDateObj : true;

//             return matchesName && matchesStart && matchesEnd;
//         });

//         setFilteredTransactions(filtered);
//     };

//     // View full details in modal
//     const handleView = (txn) => {
//         setSelectedTransaction(txn);
//         setShowModal(true);
//     };

//     // Navigate to edit vendor transaction page
//     const handleEdit = (id) => {
//         router.push(`/editvendor-transaction/${id}`);
//     };

//     return (
//         <>
//             <Header />

//             <Container className="mt-4 mb-5">
//                 <h4 className="text-center mb-4">
//                     <FaClipboard /> View Vendor All Transactions
//                 </h4>

//                 {/* 🔍 Search and Filter Form */}
//                 <Form className="mb-4">
//                     <Row className="gy-3 gx-3 align-items-end">
//                         <Col xs={12} md={4}>
//                             <InputGroup>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Search by vendor name..."
//                                     value={searchName}
//                                     onChange={handleSearch}
//                                 />
//                                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//                             </InputGroup>
//                         </Col>
//                         <Col xs={12} md={4}>
//                             <Form.Label>Start Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={startDate}
//                                 onChange={handleStartDate}
//                             />
//                         </Col>
//                         <Col xs={12} md={4}>
//                             <Form.Label>End Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={endDate}
//                                 onChange={handleEndDate}
//                             />
//                         </Col>
//                     </Row>
//                 </Form>

//                 {/* ⏳ Spinner while loading */}
//                 {isLoading ? (
//                     <div className="text-center mt-5">
//                         <Spinner animation="border" variant="primary" />
//                         <p>Loading all the vendor transactions...</p>
//                     </div>
//                 ) : (
//                     // 📊 Table showing all filtered vendor transactions
//                     <div className="table-responsive">
//                         <Table className="table-bordered table-hover text-center align-middle">
//                             <thead className="table-dark">
//                                 <tr>
//                                     <th>S.No</th>
//                                     <th>Vendor Name</th>
//                                     <th>Date of creation</th>
//                                     <th>Time of creation</th>
//                                     <th><FaRupeeSign /> Total Amount</th>
//                                     <th><FaRupeeSign /> Total Credit</th>
//                                     <th><FaRupeeSign /> Remaining Amount</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {filteredTransactions.length > 0 ? (
//                                     filteredTransactions.map((txn, index) => {
//                                         const date = formatDate(txn.vendorCreatedAt);
//                                         const time = formatTime(txn.vendorCreatedAt);
//                                         return (
//                                             <tr key={txn.id}>
//                                                 <td>{index + 1}</td>
//                                                 <td>{txn.vendorName?.vendorName || "N/A"}</td>
//                                                 <td>{date}</td>
//                                                 <td>{time}</td>
//                                                 <td><FaRupeeSign /> {txn.totalAmount?.toFixed(2)}</td>
//                                                 <td><FaRupeeSign /> {txn.totalCredit?.toFixed(2)}</td>
//                                                 <td><FaRupeeSign /> {txn.remainingAmount?.toFixed(2)}</td>
//                                                 <td>
//                                                     <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
//                                                         <Button variant="info" onClick={() => handleView(txn)}>
//                                                             <EyeFill className="fs-5 fw-bold" />
//                                                         </Button>
//                                                         <Button variant="warning" onClick={() => handleEdit(txn.id)}>
//                                                             <PencilSquare className="fs-5 fw-bold" />
//                                                         </Button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         );
//                                     })
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="8" className="text-secondary fw-bold fs-5">No vendor transactions found</td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </Table>
//                     </div>
//                 )}

//                 {/* 🧾 Modal to view transaction details */}
//                 <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Transaction Details</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {selectedTransaction && (
//                             <>
//                                 <p><strong>Last Updated:</strong> {formatDate(selectedTransaction.vendorUpdatedAt)} {formatTime(selectedTransaction.vendorUpdatedAt)}</p>
//                                 <p><strong>Vendor Name:</strong> {selectedTransaction.vendorName?.vendorName}</p>
//                                 <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount}</p>
//                                 <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount}</p>
//                                 <p><strong>Total Credit:</strong> <FaRupeeSign /> {selectedTransaction.totalCredit}</p>
//                                 <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount}</p>
//                                 <p><strong>Description:</strong> {selectedTransaction.description}</p>

//                                 {/* 🛠️ Show working stages if any */}
//                                 <hr />
//                                 <h6><FaWrench /> Working Stages</h6>
//                                 <ul>
//                                     {selectedTransaction.workingStage?.map((stage, idx) => (
//                                         <li key={idx}>
//                                             <strong>{stage.workingStage}</strong>: {stage.workingDescription}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </>
//                         )}
//                     </Modal.Body>
//                 </Modal>
//             </Container>
//         </>
//     );
// };
// export default ViewVendorTransaction;

// //page View Vendor Transaction.jsx
// "use client"; // Enables client-side features like useEffect and useRouter in Next.js
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
// import { PencilSquare } from "react-bootstrap-icons";
// import Header from "../components/Header";

// // Function to format a date string as DD/MM/YYYY (Indian format)
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
//   return new Date(dateString).toLocaleDateString('en-GB', options);
// };

// // Function to format a date string to HH:MM:SS AM/PM (Indian format)
// const formatTime = (dateString) => {
//   if (!dateString) return "N/A";
//   const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
//   return new Date(dateString).toLocaleTimeString('en-US', options);
// };

// const ViewVendorTransaction = () => {
//   const router = useRouter(); // Used for programmatic navigation

//   // All vendor transactions fetched from backend
//   const [transactions, setTransactions] = useState([]);

//   // Filtered results shown on screen
//   const [filteredTransactions, setFilteredTransactions] = useState([]);

//   // For search and date filter
//   const [searchName, setSearchName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   // Modal management
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // Loading spinner state
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null); // State for error messages
//   const [userRole, setUserRole] = useState(null); // State to store user role

//   // Check user role on component mount and redirect if unauthorized
//   useEffect(() => {
//     let Userdata;
//     if (typeof window !== "undefined") {
//       Userdata = localStorage.getItem("user");
//     }

//     if (Userdata) {
//       const parsedUser = JSON.parse(Userdata);
//       const role = parsedUser.role;
//       setUserRole(role);

//       if (role !== "admin" && role !== "manager") {
//         setTimeout(() => {
//             localStorage.clear()
//             window.location.href = '/api/logout' // Redirect to login
//         }, 1000);
//       }
//     } else {
//      // If authorized, proceed to fetch data
//      setIsLoading(false); // End initial loading for role check
//     }
//   }, [router]);

//   // Common filter logic for name and date range
//   const applyFilters = (name, start, end) => {
//     const filtered = transactions.filter((txn) => {
//       const vendorName = txn.vendorName?.vendorName?.toLowerCase() || "";
//       const matchesName = vendorName.includes(name.toLowerCase());

//       const txnDate = new Date(txn.vendorCreatedAt);
//       const startDateObj = start ? new Date(start) : null;
//       const endDateObj = end ? new Date(end) : null;

//       if (endDateObj) {
//         endDateObj.setHours(23, 59, 59, 999); // This covers the full end date
//       }

//       const matchesStart = startDateObj ? txnDate >= startDateObj : true;
//       const matchesEnd = endDateObj ? txnDate <= endDateObj : true;

//       return matchesName && matchesStart && matchesEnd;
//     });

//     setFilteredTransactions(filtered);
//   };

//   // Fetch vendor transactions from Payload CMS API on component load
//   useEffect(() => {
//     if (userRole === "admin" || userRole === "manager") { // Only fetch if authorized
//       const fetchTransactions = async () => {
//         try {
//           const res = await fetch("/api/vendor-transaction");
//           if (!res.ok) {
//             // Handle HTTP errors
//             const errorData = await res.json();
//             throw new Error(errorData.message || "Failed to fetch vendor transactions");
//           }
//           const data = await res.json();
//           const vendorData = data.docs || [];

//           // Sort transactions by vendorCreatedAt in descending order (latest first)
//           //const sortedVendorData = vendorData.sort((a, b) => new Date(b.vendorCreatedAt) - new Date(a.vendorCreatedAt));

//           setTransactions(vendorData);
//           setFilteredTransactions(vendorData); // Initialize filtered with all data
//         } catch (error) {
//           console.error("Error fetching vendor transactions:", error);
//           setError("Failed to load transactions. Please try again later."); // Set user-friendly error
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchTransactions();
//     } else if (userRole === "guest") {
//       setIsLoading(false); // Stop loading if guest and not redirecting immediately
//         localStorage.clear()
//         window.location.href = '/api/logout' // Redirect to login
//     }
//   }, [userRole, router]); // Re-run when userRole changes

//   // Apply filters whenever searchName, startDate, or endDate changes
//   useEffect(() => {
//     applyFilters(searchName, startDate, endDate);
//   }, [searchName, startDate, endDate]);

//   // Filter by vendor name (on typing)
//   const handleSearch = (e) => {
//     setSearchName(e.target.value);
//   };

//   // Filter by start date
//   const handleStartDate = (e) => {
//     setStartDate(e.target.value);
//   };

//   // Filter by end date
//   const handleEndDate = (e) => {
//     setEndDate(e.target.value);
//   };

//   // View full details in modal
//   const handleView = (txn) => {
//     setSelectedTransaction(txn);
//     setShowModal(true);
//   };

//   // Navigate to edit vendor transaction page
//   const handleEdit = (id) => {
//     router.push(`/editvendor-transaction/${id}`);
//   };
//   // 🚀 PERFORMANCE: Show loading spinner while initial data or user role is being determined
//   if (isLoading || userRole === null) {
//     return (
//       <div className="d-flex justify-content-center align-items-center vh-100">
//         <Spinner animation="border" variant="primary" />
//         <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
//       </div>
//     );
//   }
//   if (userRole !== "admin" && userRole !== "manager") {
//     return (
//       <>
//         <Container className="text-center mt-5">
//           <Alert variant="danger">
//             You do not have permission to view this page. Redirecting...
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   return (
//     <>
//       <Header />

//       <Container className="mt-4 mb-5">
//         <h4 className="text-center mb-4">
//           <FaClipboard /> View Vendor All Transactions
//         </h4>

//         {error && <Alert variant="danger">{error}</Alert>}

//         {/* 🔍 Search and Filter Form */}
//         <Form className="mb-4">
//           <Row className="gy-3 gx-3 align-items-end">
//             <Col xs={12} md={4}>
//               <InputGroup>
//                 <Form.Control
//                   type="text"
//                   placeholder="Search by vendor name..."
//                   value={searchName}
//                   onChange={handleSearch}
//                 />
//                 <InputGroup.Text><FaSearch /></InputGroup.Text>
//               </InputGroup>
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={startDate}
//                 onChange={handleStartDate}
//               />
//             </Col>
//             <Col xs={12} md={4}>
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={endDate}
//                 onChange={handleEndDate}
//               />
//             </Col>
//           </Row>
//         </Form>

//         {/* ⏳ Spinner while loading */}
//         {isLoading ? (
//           <div className="text-center mt-5">
//             <Spinner animation="border" variant="primary" />
//             <p>Loading all the vendor transactions...</p>
//           </div>
//         ) : (
//           // 📊 Table showing all filtered vendor transactions
//           <div className="table-responsive">
//             <Table className="table-bordered table-hover text-center align-middle">
//               <thead className="table-dark">
//                 <tr>
//                   <th>S.No</th>
//                   <th>Vendor Name</th>
//                   <th>Date of Creation</th>
//                   <th>Time of Creation</th>
//                   <th><FaRupeeSign /> Total Amount</th>
//                   <th><FaRupeeSign /> Total Credit</th>
//                   <th><FaRupeeSign /> Remaining Amount</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.length > 0 ? (
//                   filteredTransactions.map((txn, index) => {
//                     const date = formatDate(txn.vendorCreatedAt);
//                     const time = formatTime(txn.vendorCreatedAt);
//                     return (
//                       <tr key={txn.id}>
//                         <td>{index + 1}</td>
//                         <td>{txn.vendorName?.vendorName || "N/A"}</td>
//                         <td>{date}</td>
//                         <td>{time}</td>
//                         <td><FaRupeeSign /> {txn.totalAmount?.toFixed(2)}</td>
//                         <td><FaRupeeSign /> {txn.totalCredit?.toFixed(2)}</td>
//                         <td><FaRupeeSign /> {txn.remainingAmount?.toFixed(2)}</td>
//                         <td>
//                           <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
//                             <Button variant="info" onClick={() => handleView(txn)}>
//                               <EyeFill className="fs-5 fw-bold" />
//                             </Button>
//                             <Button variant="warning" onClick={() => handleEdit(txn.id)}>
//                               <PencilSquare className="fs-5 fw-bold" />
//                             </Button>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-secondary fw-bold fs-5">No vendor transactions found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         )}

//         {/* 🧾 Modal to view transaction details */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Transaction Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedTransaction && (
//               <>
//                 <p><strong>Last Updated:</strong> {formatDate(selectedTransaction.vendorUpdatedAt)} {formatTime(selectedTransaction.vendorUpdatedAt)}</p>
//                 <p><strong>Vendor Name:</strong> {selectedTransaction.vendorName?.vendorName}</p>
//                 <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount?.toFixed(2)}</p>
//                 <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount?.toFixed(2)}</p>
//                 <p><strong>Total Credit:</strong> <FaRupeeSign /> {selectedTransaction.totalCredit?.toFixed(2)}</p>
//                 <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount?.toFixed(2)}</p>
//                 <p><strong>Description:</strong> {selectedTransaction.description || "N/A"}</p>

//                 {/* 🛠️ Show working stages if any */}
//                 <hr />
//                 <h6><FaWrench /> Working Stages</h6>
//                 {selectedTransaction.workingStage && selectedTransaction.workingStage.length > 0 ? (
//                   <ul>
//                     {selectedTransaction.workingStage.map((stage, idx) => (
//                       <li key={idx}>
//                         <strong>{stage.workingStage || "N/A"}</strong>: {stage.workingDescription || "N/A"}
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No working stages available.</p>
//                 )}
//               </>
//             )}
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// };
// export default ViewVendorTransaction;

// Improved ViewVendorTransaction with working PDF download and mobile-friendly modal

"use client";

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench, FaDownload } from "react-icons/fa";
import { PencilSquare } from "react-bootstrap-icons";
import Header from "../components/Header";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit", month: "2-digit", year: "numeric",
    timeZone: "Asia/Kolkata"
  });
};

const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: true, timeZone: "Asia/Kolkata"
  });
};

const ViewVendorTransaction = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsed = JSON.parse(data);
      const role = parsed.role;
      setUserRole(role);
      if (role !== "admin" && role !== "manager") {
        setTimeout(() => {
          localStorage.clear();
          window.location.href = "/api/logout";
        }, 1000);
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setTimeout(() => {
        localStorage.clear();
        window.location.href = "/api/logout";
      }, 1000);
    }
  }, [router]);

  useEffect(() => {
    if (userRole === "admin" || userRole === "manager") {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch("/api/vendor-transaction");
          if (!res.ok) throw new Error("Failed to fetch vendor transactions");
          const data = await res.json();
          setTransactions(data.docs || []);
        } catch (e) {
          setError("Failed to load transactions.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [userRole]);

  useEffect(() => {
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    if (end) end.setHours(23, 59, 59, 999);
    const filtered = transactions.filter(txn => {
      const nameMatch = txn.vendorName?.vendorName?.toLowerCase().includes(searchName.toLowerCase());
      const txnDate = new Date(txn.vendorCreatedAt);
      const startMatch = start ? txnDate >= start : true;
      const endMatch = end ? txnDate <= end : true;
      return nameMatch && startMatch && endMatch;
    });
    setFilteredTransactions(filtered.sort((a, b) => new Date(b.vendorCreatedAt) - new Date(a.vendorCreatedAt)));
  }, [searchName, startDate, endDate, transactions]);

  const handleDownloadPdf = () => {
    if (!selectedTransaction) return;

    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("Jodhpur Mines - Transaction Details", 14, 20);

    doc.setFontSize(12);
    let y = 30;

    const addWrappedText = (label, value) => {
      const text = `${label}: ${value}`;
      const lines = doc.splitTextToSize(text, 180); // Word wrap text to fit page width
      doc.text(lines, 14, y);
      y += lines.length * 7; // Move y for next line, considering wrapping
    };

    // Add each field
    addWrappedText("Last Updated", `${formatDate(selectedTransaction.vendorUpdatedAt)} ${formatTime(selectedTransaction.vendorUpdatedAt)}`);
    addWrappedText("Vendor Name", selectedTransaction.vendorName?.vendorName || "N/A");
    addWrappedText("Total Amount", `\u20B9 ${selectedTransaction.totalAmount?.toFixed(2) || "0.00"}`);
    addWrappedText("Token Amount", `\u20B9 ${selectedTransaction.tokenAmount?.toFixed(2) || "0.00"}`);
    addWrappedText("Received Amount", `\u20B9 ${selectedTransaction.totalCredit?.toFixed(2) || "0.00"}`);
    addWrappedText("Remaining Amount", `\u20B9 ${selectedTransaction.remainingAmount?.toFixed(2) || "0.00"}`);
    addWrappedText("Description", selectedTransaction.description || "N/A");

    // Add table of working stages
    y += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 102, 204);
    doc.text("Working Stages", 14, y);
    y += 6;

    autoTable(doc, {
      startY: y,
      head: [["Work Stage Description", `\u20B9 Work Stage Amount`]],
      body: selectedTransaction.workingStage?.length
        ? selectedTransaction.workingStage.map(stage => [
          stage.workingStage || "N/A",
          stage.workingDescription || "N/A",
        ])
        : [["N/A", "No working stages available."]],
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak', // Wrap text in cells
      },
      headStyles: {
        fillColor: [0, 123, 255], // Bootstrap blue
        textColor: 255,
        fontStyle: 'bold',
      },
      bodyStyles: {
        fillColor: [248, 249, 250],
        textColor: 51,
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255],
      },
      margin: { left: 14, right: 14 },
    });

    // Save the PDF
    doc.save(`Transaction_${selectedTransaction.id || Date.now()}.pdf`);
  };

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h4 className="text-center mb-4"><FaClipboard /> View Vendor Transactions</h4>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form className="mb-3 bg-light p-3 rounded shadow-sm">
          <Row className="gy-2 gx-3 align-items-end">
            <Col xs={12} md={4}>
              <Form.Label>Vendor Name</Form.Label>
              <InputGroup>
                <Form.Control value={searchName} onChange={e => setSearchName(e.target.value)}
                  placeholder="Search name..." />
                <InputGroup.Text><FaSearch /></InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </Col>
          </Row>
        </Form>
        {isLoading ?
          <div className="text-center mt-5">
            <Spinner animation="border" /><p>Loading transactions...</p>
          </div> :
          <div className="table-responsive">
            <Table className="table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Vendor Name</th>
                  <th>Date & Time</th>
                  <th><FaRupeeSign />Total Amount</th>
                  <th><FaRupeeSign />Received Amount</th>
                  <th><FaRupeeSign />Remaining Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length ? filteredTransactions.map((txn, idx) => (
                  <tr key={txn.id}>
                    <td>{idx + 1}</td>
                    <td>{txn.vendorName?.vendorName || "N/A"}</td>
                    <td>{formatDate(txn.vendorCreatedAt)} <br /><small>{formatTime(txn.vendorCreatedAt)}</small></td>
                    <td><FaRupeeSign /> {txn.totalAmount?.toFixed(2)}</td>
                    <td><FaRupeeSign /> {txn.totalCredit?.toFixed(2)}</td>
                    <td><FaRupeeSign /> {txn.remainingAmount?.toFixed(2)}</td>
                    <td>
                      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                        <Button variant="info" onClick={() => { setSelectedTransaction(txn); setShowModal(true); }}><EyeFill className="fs-5 fw-bold" /></Button>
                        <Button variant="warning" onClick={() => router.push(`/editvendor-transaction/${txn.id}`)}><PencilSquare className="fs-5 fw-bold" /></Button>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan="7">No matching transactions found.</td></tr>}
              </tbody>
            </Table>
          </div>}

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered scrollable>
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                <span>Transaction Details</span>
                <Button variant="outline-primary" onClick={handleDownloadPdf} ><FaDownload className="fs-5 fw-bold" /> PDF</Button>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTransaction && <>
              <Row className="mb-2">
                <Col xs={12}><p><strong>Vendor Name:</strong> {selectedTransaction.vendorName?.vendorName}</p></Col>
              </Row>
              <Row>
                <Col xs={6}><p><strong>Last Updated At:</strong> {formatDate(selectedTransaction.vendorUpdatedAt)} {formatTime(selectedTransaction.vendorUpdatedAt)}</p></Col>
                <Col xs={6}><p><strong>Created At:</strong> {formatDate(selectedTransaction.vendorCreatedAt)} {formatTime(selectedTransaction.vendorCreatedAt)}</p></Col>
              </Row>
              <hr />
              <Row>
                <Col xs={6}><p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount?.toFixed(2)}</p></Col>
                <Col xs={6}><p><strong>Total Credit:</strong> <FaRupeeSign /> {selectedTransaction.totalCredit?.toFixed(2)}</p></Col>
              </Row>
              <Row>
                <Col xs={6}><p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount?.toFixed(2)}</p></Col>
                <Col xs={6}><p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount?.toFixed(2)}</p></Col>
              </Row>
              <Row className="my-3">
                <Col><p><strong>Description:</strong> {selectedTransaction.description || "N/A"}</p></Col>
              </Row>
              <h6 className="mt-3"><FaWrench /> Working Stages</h6>
              {selectedTransaction.workingStage?.length ? (
                <Table size="sm" bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Stage</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransaction.workingStage.map((s, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{s.workingStage}</td>
                        <td>{s.workingDescription}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : <td colSpan="3">No working stages available.</td>}
            </>}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ViewVendorTransaction;
