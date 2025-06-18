// pages/view-client-transaction.jsx
// "use client"; // Required in Next.js for client-side features like useEffect, useRoute
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
// import { useRouter } from "next/navigation";
// import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
// import Header from "../components/Header";
// import { PencilSquare } from "react-bootstrap-icons";

// const ViewClientTransaction = () => {
//   const router = useRouter();

//   const [transactions, setTransactions] = useState([]);
//   const [filteredTransactions, setFilteredTransactions] = useState([]);

//   const [searchName, setSearchName] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   // ⬇️ Load transactions from localStorage on first load
//   useEffect(() => {
//     const allTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     setTransactions(allTransactions);
//     setFilteredTransactions(allTransactions);
//   }, []);

//   // 🔍 Search filter
//   const handleSearch = (e) => {
//     const name = e.target.value.toLowerCase();
//     setSearchName(name);
//     applyFilters(name, startDate, endDate);
//   };

//   // 📅 Filter handlers
//   const handleStartDate = (e) => {
//     const value = e.target.value;
//     setStartDate(value);
//     applyFilters(searchName, value, endDate);
//   };

//   const handleEndDate = (e) => {
//     const value = e.target.value;
//     setEndDate(value);
//     applyFilters(searchName, startDate, value);
//   };

//   // 🧠 Filter function for name + date range
//   const applyFilters = (name, start, end) => {
//     const filtered = transactions.filter((txn) => {
//       const matchesName = txn.client.toLowerCase().includes(name);

//       const [datePart] = txn.transactioncreated.split(" ");
//       const [day, month, year] = datePart.split("/");
//       const txnDateObj = new Date(`${year}-${month}-${day}`);

//       const startDateObj = start ? new Date(start) : null;
//       const endDateObj = end ? new Date(end) : null;

//       const matchesStart = startDateObj ? txnDateObj >= startDateObj : true;
//       const matchesEnd = endDateObj ? txnDateObj <= endDateObj : true;

//       return matchesName && matchesStart && matchesEnd;
//     });

//     setFilteredTransactions(filtered);
//   };

//   // 👁️ View modal
//   const handleView = (txn) => {
//     setSelectedTransaction(txn);
//     setShowModal(true);
//   };

//   // ✏️ Navigate to edit transaction page
//   const handleEdit = (id) => {
//     router.push(`/editclient-transaction/${id}`);
//   };

//   return (
//     <>
//       <Header />

//       <Container className="mt-4">
//         <h4 className="text-center mb-4">
//           <FaClipboard /> View Client All Transactions
//         </h4>

//         {/* Search & Filter */}
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

//         {/* 📊 Table of Transactions */}
//         <Table
//           striped
//           bordered
//           hover
//           responsive
//           className="text-center align-middle fs-6 fw-medium"
//         >
//           <thead className="table-dark">
//             <tr>
//               <th>Client Name</th>
//               <th>Date & Time</th>
//               <th><FaRupeeSign /> Total</th>
//               <th><FaRupeeSign /> Credit</th>
//               <th><FaRupeeSign /> Remaining</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredTransactions.length > 0 ? (
//               filteredTransactions.map((txn, index) => (
//                 <tr key={index}>
//                   <td>{txn.client}</td>
//                   <td>{txn.transactioncreated}</td>
//                   <td><FaRupeeSign /> {txn.totalAmount}</td>
//                   <td><FaRupeeSign /> {txn.totalCredits}</td>
//                   <td><FaRupeeSign /> {txn.remainingAmount}</td>
//                   <td>
//                     <Button
//                       variant="info"
//                       size="sm"
//                       className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
//                       onClick={() => handleView(txn)}
//                     >
//                       <EyeFill />
//                     </Button>
//                     <Button
//                       variant="warning"
//                       size="sm"
//                       onClick={() => handleEdit(index)}
//                     >
//                       <PencilSquare />
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No Client Transactions found</td>
//               </tr>
//             )}
//           </tbody>
//         </Table>

//         {/* 📦 Transaction Details Modal */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Transaction Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedTransaction && (
//               <>
//                 <p><strong>Date & Time:</strong> {selectedTransaction.transactioncreated}</p>
//                 <p><strong>Client:</strong> {selectedTransaction.client}</p>
//                 <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount}</p>
//                 <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount}</p>
//                 <p><strong>Total Credits:</strong> <FaRupeeSign /> {selectedTransaction.totalCredits}</p>
//                 <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount}</p>
//                 <p><strong>Description:</strong> {selectedTransaction.description}</p>
//                 <hr />
//                 <h6><FaWrench /> Working Stages:</h6>
//                 <ul>
//                   {selectedTransaction.workingStages.map((stage, idx) => (
//                     <li key={idx}>
//                       {stage.work}: <FaRupeeSign /> {stage.amount}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </Modal.Body>
//         </Modal>
//       </Container>
//     </>
//   );
// };
// export default ViewClientTransaction;

// pages/view-client-transaction.jsx
"use client"; // Required in Next.js for client-side features like useEffect, useRouter
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
import { PencilSquare } from "react-bootstrap-icons"; // Specific icon for edit
import Header from "../components/Header"; // Reusing the Header component

// A helper function to format dates to DD/MM/YYYY (Indian timezone)
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: "Asia/Kolkata" };
  // Ensure dateString is a valid date before converting
  try {
    return new Date(dateString).toLocaleDateString('en-GB', options);
  } catch (e) {
    console.error("Invalid date string for formatDate:", dateString, e);
    return "Invalid Date";
  }
};

// A helper function to format time to HH:MM:SS AM/PM (Indian timezone)
const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata" };
  // Ensure dateString is a valid date before converting
  try {
    return new Date(dateString).toLocaleTimeString('en-US', options);
  } catch (e) {
    console.error("Invalid date string for formatTime:", dateString, e);
    return "Invalid Time";
  }
};

const ViewClientTransaction = () => {
  const router = useRouter(); // Initialize Next.js router for navigation

  // State to store the user's role for access control
  const [userRole, setUserRole] = useState(null);

  // State to store all fetched transactions (the master list)
  const [transactions, setTransactions] = useState([]);

  // State for filtered transactions displayed in the table
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // States for filter inputs
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // States for viewing details in the modal
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Loading state to enhance UX and control spinner display
  const [isLoading, setIsLoading] = useState(true);
  // Error state for API call failures
  const [error, setError] = useState("");

  // 🚀 ACCESS CONTROL: Check user role immediately on component mount
  useEffect(() => {
    if (typeof window !== "undefined") { // Ensure this code runs only in the browser environment
      const userData = localStorage.getItem("user");
      let role = null;
      if (userData) {
        try {
          const parsedUser = JSON.parse(userData);
          role = parsedUser.role;
          setUserRole(role); // Set the role to state
        } catch (parseError) {
          console.error("Error parsing user data from localStorage in ViewClientTransaction:", parseError);
          // If parsing fails, default to an unauthorized state
        }
      }

      // If the user's role is not 'admin' or 'manager', redirect them.
      // This is a client-side gate; server-side validation is also paramount.
      if (role !== 'admin' && role !== 'manager') {
        console.log(`Unauthorized access attempt to ViewClientTransaction by user with role: ${role || 'undefined'}. Redirecting...`);
        setError("You do not have permission to access this page. Redirecting...");
        // Use a slight delay for user to see the message before redirect
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1500); // Redirect after 1.5 seconds
      } else {
        // If authorized, proceed to fetch data
        setIsLoading(false); // End initial loading for role check
      }
    }
  }, [router]); // Re-run if router object changes (rare)

  // 🚀 PERFORMANCE / DATA FETCHING: Fetch data from Payload CMS when the component mounts
  // This useEffect will run only if the userRole is determined to be 'admin' or 'manager'
  useEffect(() => {
    // Only fetch transactions if the user is authorized (admin or manager)
    if (userRole === 'admin' || userRole === 'manager') {
      const fetchTransactions = async () => {
        setIsLoading(true); // Start loading before fetching data
        setError(""); // Clear previous errors
        try {
          // Make a GET request to your client-transaction API endpoint
          const res = await fetch("/api/client-transaction");
          if (!res.ok) { // Check if response was successful
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          const txnData = data.docs || []; // Payload CMS typically returns data in a 'docs' array

          // Save in state
          setTransactions(txnData); // Store all fetched transactions as the master list
          setFilteredTransactions(txnData); // Initially, display all transactions
        } catch (error) {
          console.error("Error fetching transactions:", error);
          setError("Failed to load client transactions. Please try again.");
        } finally {
          setIsLoading(false); // End loading after fetch attempt
        }
      };

      fetchTransactions();
    } else if (userRole !== null) { // If userRole is determined but not authorized
      setIsLoading(false); // Stop loading as no data will be fetched
    }
  }, [userRole]); // Dependency on userRole ensures fetch happens after role is set

  // 🔍 Handle search by client name
  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase();
    setSearchName(name); // Update the search name state
    applyFilters(name, startDate, endDate); // Re-apply all filters
  };

  // 📅 Handle start date filtering
  const handleStartDate = (e) => {
    const value = e.target.value;
    setStartDate(value); // Update the start date state
    applyFilters(searchName, value, endDate); // Re-apply all filters
  };

  // 📅 Handle end date filtering
  const handleEndDate = (e) => {
    const value = e.target.value;
    setEndDate(value); // Update the end date state
    applyFilters(searchName, startDate, value); // Re-apply all filters
  };

  // 🧠 Core filtering logic: applies search and date filters to the master 'transactions' list
  const applyFilters = (name, start, end) => {
    const filtered = transactions.filter((txn) => {
      // Safely access clientName property, falling back to empty string
      const clientName = txn.clientName?.clientName?.toLowerCase() || "";

      // Check if client name matches search term
      const matchesName = clientName.includes(name);

      // Convert transaction creation date to a Date object for comparison
      const txnDate = new Date(txn.clientCreatedAt);

      // Convert start and end date strings to Date objects
      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;

      // Adjust end date to include the entire day (up to 23:59:59.999)
      if (endDateObj) {
        endDateObj.setHours(23, 59, 59, 999);
      }

      // Check if transaction date is on or after the start date
      const matchesStart = startDateObj ? txnDate >= startDateObj : true;
      // Check if transaction date is on or before the end date
      const matchesEnd = endDateObj ? txnDate <= endDateObj : true;

      // A transaction matches if all filter conditions are met
      return matchesName && matchesStart && matchesEnd;
    });

    setFilteredTransactions(filtered); // Update the state with the filtered results
  };

  // 👁️ Show full transaction details in modal
  const handleView = (txn) => {
    setSelectedTransaction(txn); // Set the transaction data to be displayed
    setShowModal(true); // Open the modal
  };

  // ✏️ Navigate to edit page using dynamic transaction ID
  const handleEdit = (id) => {
    console.log("Editing transaction with ID:", id);
    router.push(`/editclient-transaction/${id}`); // Redirect to the edit page with the specific ID
  };

  // 🚀 PERFORMANCE: Show loading spinner while initial data or user role is being determined
  if (isLoading || userRole === null) {
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
            <FaClipboard className="me-2" />
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

      <Container className="mt-4 mb-5">
        <h4 className="text-center mb-4">
          <FaClipboard /> View All Client Transactions {/* Icon for visual appeal */}
        </h4>

        {/* 🔍 Search and Filters Section */}
        <Form className="mb-4">
          <Row className="gy-3 gx-3 align-items-end">
            <Col xs={12} md={4}>
              <Form.Label htmlFor="searchClientName">Client Name</Form.Label>
              <InputGroup>
                <Form.Control
                  id="searchClientName"
                  type="text"
                  placeholder="Search by client name..."
                  value={searchName}
                  onChange={handleSearch}
                />
                <InputGroup.Text><FaSearch /></InputGroup.Text> {/* Search icon */}
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label htmlFor="startDate">Start Date</Form.Label>
              <Form.Control
                id="startDate"
                type="date"
                value={startDate}
                onChange={handleStartDate}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label htmlFor="endDate">End Date</Form.Label>
              <Form.Control
                id="endDate"
                type="date"
                value={endDate}
                onChange={handleEndDate}
              />
            </Col>
          </Row>
        </Form>

        {/* ⏳ Conditional Rendering for Loading, Error, or Table */}
        {error ? (
          // Display error message if API call failed
          <Alert variant="danger" className="text-center">{error}</Alert>
        ) : (
          // 📊 Transactions Table
          <div className="table-responsive">
            <Table className="table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Client Name</th>
                  <th>Date of Creation</th>
                  <th>Time of Creation</th>
                  <th><FaRupeeSign /> Total Amount</th>
                  <th><FaRupeeSign /> Total Credit</th>
                  <th><FaRupeeSign /> Remaining Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length > 0 ? (
                  // Map through filteredTransactions to display each client transaction row
                  filteredTransactions.map((txn, index) => {
                    // Format dates and times for display
                    const date = formatDate(txn.clientCreatedAt);
                    const time = formatTime(txn.clientCreatedAt);
                    return (
                      <tr key={txn.id}>
                        <td>{index + 1}</td>
                        <td>{txn.clientName?.clientName || "N/A"}</td> {/* Safely access client name */}
                        <td>{date}</td>
                        <td>{time}</td>
                        <td><FaRupeeSign /> {txn.totalAmount?.toFixed(2) || '0.00'}</td> {/* Display 2 decimal places or default */}
                        <td><FaRupeeSign /> {txn.tokenAmount?.toFixed(2) || '0.00'}</td>
                        <td><FaRupeeSign /> {txn.remainingAmount?.toFixed(2) || '0.00'}</td>
                        <td>
                          <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                            {/* View button to open modal with full details */}
                            <Button variant="info" onClick={() => handleView(txn)}>
                              <EyeFill className="fs-5 fw-bold" />
                            </Button>
                            {/* Edit button to navigate to the edit transaction page */}
                            <Button variant="warning" onClick={() => handleEdit(txn.id)}>
                              <PencilSquare className="fs-5 fw-bold" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  // Message displayed when no transactions match the search/filters or no transactions exist
                  <tr>
                    <td colSpan="8" className="text-secondary fw-bold fs-5">No client transactions found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}

        {/* 🧾 Transaction Detail Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTransaction && ( // Only render if a transaction is selected
              <>
                <p><strong>Last Updated:</strong> {formatDate(selectedTransaction.clientUpdatedAt)} {formatTime(selectedTransaction.clientUpdatedAt)}</p>
                <p><strong>Client Name:</strong> {selectedTransaction.clientName?.clientName || "N/A"}</p>
                <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount?.toFixed(2) || '0.00'}</p>
                <p><strong>Token Amount (Credit):</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount?.toFixed(2) || '0.00'}</p>
                <p><strong>Total Credit (Cumulative):</strong> <FaRupeeSign /> {selectedTransaction.totalCredit?.toFixed(2) || '0.00'}</p>
                <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount?.toFixed(2) || '0.00'}</p>
                <p><strong>Description:</strong> {selectedTransaction.description || "N/A"}</p>

                {/* 🛠️ Working Stages (if available) */}
                {selectedTransaction.workingStage && selectedTransaction.workingStage.length > 0 && (
                  <>
                    <hr />
                    <h6><FaWrench /> Working Stages</h6>
                    <ul>
                      {selectedTransaction.workingStage.map((stage, idx) => (
                        <li key={idx}>
                          <strong>{stage.workingStage || "N/A"}</strong>: {stage.workingDescription || "N/A"}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ViewClientTransaction;
