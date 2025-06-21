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
"use client"; // Enables client-side features like localStorage and router

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  InputGroup,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { useRouter } from "next/navigation";
import {
  FaEye,
  FaSearch,
  FaRupeeSign,
  FaClipboard,
  FaWrench,
} from "react-icons/fa";
import { PencilSquare } from "react-bootstrap-icons";
import Header from "../components/Header";

// Helper function to format date as DD/MM/YYYY
const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

// Helper function to format time as HH:MM:SS AM/PM
const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

const ViewClientTransaction = () => {
  const router = useRouter();

  // States for authentication, data, filters, modals, and UI
  const [userRole, setUserRole] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // ✅ Error message displayed using Alert

  // ✅ Validate user role using localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const user = JSON.parse(userData);
        setUserRole(user.role);
        if (user.role !== "admin" && user.role !== "manager") {
          throw new Error("Unauthorized");
        }
      } catch {
        localStorage.clear();
        setError("Unauthorized access. Redirecting...");
        setTimeout(() => (window.location.href = "/api/logout"), 1500);
        return;
      }
    } else {
      setError("Session expired. Redirecting...");
      localStorage.clear();
      setTimeout(() => (window.location.href = "/api/logout"), 1500);
    }
    setIsLoading(false);
  }, []);

  // ✅ Fetch client transactions if authorized
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/client-transaction");
        const data = await res.json();
        setTransactions(data.docs || []);
        setFilteredTransactions(data.docs || []);
      } catch {
        setError("Error fetching client transactions. Please try again.");
      }
      setIsLoading(false);
    };

    if (userRole === "admin" || userRole === "manager") fetchData();
  }, [userRole]);

  // ✅ Simplified filter logic
  const applyFilters = (name, start, end) => {
    const nameLower = name.toLowerCase();
    const startDateObj = start ? new Date(start) : null;
    const endDateObj = end ? new Date(end) : null;
    if (endDateObj) endDateObj.setHours(23, 59, 59, 999);
    const filtered = transactions.filter((txn) => {
      const clientName = txn.clientName?.clientName?.toLowerCase() || "";
      const txnDate = new Date(txn.clientCreatedAt);

      return (
        clientName.includes(nameLower) &&
        (!startDateObj || txnDate >= startDateObj) &&
        (!endDateObj || txnDate <= endDateObj)
      );
    });

    setFilteredTransactions(filtered);
  };

  // ✅ Toggle payment status (pending ↔ paid)
  const togglePaymentStatus = async (id) => {
    const updated = transactions.map((txn) => {
      if (txn.id === id) {
        const newStatus = txn.paymentstatus === "pending" ? "paid" : "pending";
        fetch(`/api/client-transaction/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentstatus: newStatus }),
        });
        return { ...txn, paymentstatus: newStatus };
      }
      return txn;
    });

    setTransactions(updated);
    setFilteredTransactions(updated);
  };

  // ✅ Show spinner while loading
  if (isLoading || userRole === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" />
        <span className="ms-2">Loading Please Wait...</span>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h4 className="text-center mb-4">
          <FaClipboard /> View All Client Transactions
        </h4>

        {/* ✅ Show error using Alert */}
        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            {error}
          </Alert>
        )}

        {/* 🔍 Search & Date Filter */}
        <Form className="mb-4">
          <Row className="gy-3">
            <Col xs={12} md={4}>
              <Form.Label>Client Name</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={searchName}
                  onChange={(e) => {
                    setSearchName(e.target.value);
                    applyFilters(e.target.value, startDate, endDate);
                  }}
                  placeholder="Search by client name..."
                />
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  applyFilters(searchName, e.target.value, endDate);
                }}
              />
            </Col>
            <Col xs={6} md={4}>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  applyFilters(searchName, startDate, e.target.value);
                }}
              />
            </Col>
          </Row>
        </Form>

        {/* 📋 Responsive Table */}
        <div className="table-responsive">
          <Table className="table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Client</th>
                <th>Date</th>
                <th>Total</th>
                <th>Received</th>
                <th>Remaining</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, index) => (
                <tr key={txn.id}>
                  <td>{index + 1}</td>
                  <td>{txn.clientName?.clientName || "N/A"}</td>
                  <td>
                    {formatDate(txn.clientCreatedAt)}
                    <br />
                    <small>{formatTime(txn.clientCreatedAt)}</small>
                  </td>
                  <td>
                    <FaRupeeSign /> {txn.totalAmount?.toFixed(2)}
                  </td>
                  <td>
                    <FaRupeeSign /> {txn.totalAmountclient?.toFixed(2)}
                  </td>
                  <td>
                    <FaRupeeSign /> {txn.remainingAmount?.toFixed(2)}
                  </td>
                  <td>
                    <Button
                      variant={txn.paymentstatus === "pending" ? "danger" : "success"}
                      onClick={() => togglePaymentStatus(txn.id)}
                      className="rounded-pill text-capitalize fw-bold fs-6"
                    >
                      {txn.paymentstatus}
                    </Button>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                      <Button
                        variant="info"
                        onClick={() => {
                          setSelectedTransaction(txn);
                          setShowModal(true);
                        }}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => router.push(`/editclient-transaction/${txn.id}`)}
                      >
                        <PencilSquare />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={8} className="fw-semibold text-secondary">
                    No client transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* 📑 Modal for Full Details (Responsive: xs → xxl) */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          size="xl"
          centered
          scrollable
        >
          <Modal.Header closeButton>
            <Modal.Title>Client Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTransaction && (
              <div>
                <Row>
                  <Col xs={12} sm={6}>
                    <p><strong>Client Name:</strong> {selectedTransaction.clientName?.clientName}</p>
                    <p><strong>Query License:</strong> {selectedTransaction.query_license?.query_license}</p>
                    <p><strong>Near Village:</strong> {selectedTransaction.near_village?.near_village}</p>
                  </Col>
                  <Col xs={12} sm={6}>
                    <p><strong>Created At:</strong> {formatDate(selectedTransaction.clientCreatedAt)} {formatTime(selectedTransaction.clientCreatedAt)}</p>
                    <p><strong>Updated At:</strong> {formatDate(selectedTransaction.clientUpdatedAt)} {formatTime(selectedTransaction.clientUpdatedAt)}</p>
                  </Col>
                </Row>

                <Row className="mt-2">
                  <Col xs={12} sm={4}>
                    <p><strong>Total:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount?.toFixed(2)}</p>
                  </Col>
                  <Col xs={12} sm={4}>
                    <p><strong>Received:</strong> <FaRupeeSign /> {selectedTransaction.totalAmountclient?.toFixed(2)}</p>
                  </Col>
                  <Col xs={12} sm={4}>
                    <p><strong>Remaining:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount?.toFixed(2)}</p>
                  </Col>
                </Row>

                <p><strong>Status:</strong> <Badge bg={selectedTransaction.paymentstatus === "pending" ? "danger" : "success"}>{selectedTransaction.paymentstatus}</Badge></p>
                <p><strong>Description:</strong> {selectedTransaction.description || "N/A"}</p>

                <hr />
                <h6><FaWrench /> Working Stages</h6>
                <div className="table-responsive">
                  <Table bordered responsive className="table-hover text-center align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>S.No</th>
                        <th>Admin Stage</th>
                        <th>Admin Desc</th>
                        <th>Client Stage</th>
                        <th>Client Desc</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: Math.max(
                        selectedTransaction.workingStage?.length || 0,
                        selectedTransaction.workingStageclient?.length || 0
                      ) }).map((_, i) => (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{selectedTransaction.workingStage?.[i]?.workingStage || "N/A"}</td>
                          <td>{selectedTransaction.workingStage?.[i]?.workingDescription || "N/A"}</td>
                          <td>{selectedTransaction.workingStageclient?.[i]?.workingStageclient || "N/A"}</td>
                          <td>{selectedTransaction.workingStageclient?.[i]?.workingDescriptionclient || "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ViewClientTransaction;

