//pages/view-client-account.jsx
// "use client";
// import { useEffect, useState } from "react";
// import { Table, Button, Container, Modal, Card, Row, Col, Form, Badge, InputGroup } from "react-bootstrap";
// import { FaEye, FaTrash, FaSearch, FaClipboard } from "react-icons/fa";
// import Header from "../components/Header"; // adjust path if needed

// const ViewClientAccount = () => {
//   const [accounts, setAccounts] = useState([]); // All accounts
//   const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered list for search
//   const [searchTerm, setSearchTerm] = useState(""); // Search input
//   const [showModal, setShowModal] = useState(false); // Modal open state
//   const [selectedAccount, setSelectedAccount] = useState(null); // Account to show in modal

//   // Load data from localStorage when component mounts (only in browser)
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const stored = JSON.parse(localStorage.getItem("accounts") || "[]");
//       setAccounts(stored);
//       setFilteredAccounts(stored);
//     }
//   }, []);

//   // Handle search filter
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);

//     const filtered = accounts.filter((acc) =>
//       acc.name.toLowerCase().includes(value) ||
//       acc.mobile.includes(value) ||
//       acc.queryLicense.toLowerCase().includes(value) ||
//       acc.miningLicense.toLowerCase().includes(value)
//     );
//     setFilteredAccounts(filtered);
//   };

//   // Toggle status active/inactive
//   const toggleStatus = (index) => {
//     const selected = filteredAccounts[index];
//     const updatedStatus = !selected.status;

//     // Update main accounts list
//     const updatedAccounts = accounts.map((acc) =>
//       acc.createdAt === selected.createdAt ? { ...acc, status: updatedStatus } : acc
//     );

//     // Save to localStorage and update state
//     localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
//     setAccounts(updatedAccounts);

//     // Update filtered list
//     const updatedFiltered = filteredAccounts.map((acc, i) =>
//       i === index ? { ...acc, status: updatedStatus } : acc
//     );
//     setFilteredAccounts(updatedFiltered);
//   };

//   // Delete account by matching createdAt
//   const deleteAccount = (index) => {
//     const toDelete = filteredAccounts[index];
//     const updated = accounts.filter(
//       (acc) => acc.createdAt !== toDelete.createdAt
//     );

//     localStorage.setItem("accounts", JSON.stringify(updated));
//     setAccounts(updated);
//     setFilteredAccounts(filteredAccounts.filter((_, i) => i !== index));
//   };

//   // Open modal with selected account
//   const handleView = (acc) => {
//     setSelectedAccount(acc);
//     setShowModal(true);
//   };

//   return (
//     <>
//       <Header />

//       {/* Title and Search */}
//       <Container fluid className="py-3">
//         <Row className="text-center align-items-center mb-3">
//           <Col xs={12} md={6}>
//             <h4 className="fw-bold">
//               <FaClipboard /> View All Client's Account
//             </h4>
//           </Col>
//           <Col xs={12} md={6} className="mt-2 mt-md-0">
//             <InputGroup className="mx-auto" style={{ maxWidth: "400px" }}>
//               <InputGroup.Text>
//                 <FaSearch />
//               </InputGroup.Text>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by Name, Mobile, License"
//                 value={searchTerm}
//                 onChange={handleSearch}
//               />
//             </InputGroup>
//           </Col>
//         </Row>

//         {/* Responsive Table */}
//         <div className="table-responsive">
//           <Table className="table-bordered table-hover text-center align-middle">
//             <thead className="table-dark">
//               <tr>
//                 <th>S.No</th>
//                 <th>Name</th>
//                 <th>Mobile</th>
//                 <th>Query License</th>
//                 <th>Mining License</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredAccounts.length > 0 ? (
//                 filteredAccounts.map((acc, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{acc.name}</td>
//                     <td>{acc.mobile}</td>
//                     <td>{acc.queryLicense}</td>
//                     <td>{acc.miningLicense}</td>
//                     <td>
//                       <Button
//                         variant={acc.status ? "success" : "danger"}
//                         size="sm"
//                         onClick={() => toggleStatus(index)}
//                       >
//                         {acc.status ? "Active" : "Inactive"}
//                       </Button>
//                     </td>
//                     <td>
//                       <Button
//                         variant="info"
//                         size="sm"
//                         className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
//                         onClick={() => handleView(acc)}
//                       >
//                         <FaEye />
//                       </Button>
//                       <Button
//                         variant="warning"
//                         size="sm"
//                         onClick={() => deleteAccount(index)}
//                       >
//                         <FaTrash />
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="text-secondary fw-bold fs-5">
//                     No Client Accounts Found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </Container>

//       {/* Modal View */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Account Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedAccount && (
//             <Card className="shadow-sm border-0">
//               <Card.Body>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Name:</strong> {selectedAccount.name}</Col>
//                   <Col md={6}><strong>Mobile:</strong> {selectedAccount.mobile}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Query License:</strong> {selectedAccount.queryLicense}</Col>
//                   <Col md={6}><strong>Mining License:</strong> {selectedAccount.miningLicense}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Village:</strong> {selectedAccount.village}</Col>
//                   <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>District:</strong> {selectedAccount.district}</Col>
//                   <Col md={6}><strong>State:</strong> {selectedAccount.state}</Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col md={6}><strong>Country:</strong> {selectedAccount.country}</Col>
//                   <Col md={6}>
//                     <strong>Status:</strong>{" "}
//                     <Badge bg={selectedAccount.status ? "success" : "danger"}>
//                       {selectedAccount.status ? "Active" : "Inactive"}
//                     </Badge>
//                   </Col>
//                 </Row>
//                 <Row className="mb-2">
//                   <Col><strong>Created At:</strong> {selectedAccount.createdAt}</Col>
//                 </Row>
//               </Card.Body>
//             </Card>
//           )}
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
// export default ViewClientAccount;

"use client"; // Enables client-side interactivity in Next.js

import React, { useEffect, useState } from "react";
import { Table, Button, Container, Modal, Card, Row, Col, Form, InputGroup, Spinner, Alert } from "react-bootstrap";
import { FaEye, FaTrash, FaSearch, FaClipboard } from "react-icons/fa";
import Header from "../components/Header"; // Reuse your Header component
import axios from "axios"; // We'll use axios for API calls

// Helper function to format date to DD/MM/YYYY
const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric',timeZone: "Asia/Kolkata", };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options); // British format = DD/MM/YYYY
};

// Helper function to format time to HH:MM:SS AM/PM
const formatTime = (dateString) => {
  const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: "Asia/Kolkata", };
  const time = new Date(dateString);
  return time.toLocaleTimeString("en-US", options); // US format = HH:MM:SS AM/PM
};

const ViewClientAccount = () => {
  const [accounts, setAccounts] = useState([]); // All client accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // For search filtering
  const [searchTerm, setSearchTerm] = useState(""); // User's search input
  const [loading, setLoading] = useState(true); // Loading spinner control
  const [error, setError] = useState(""); // Display error messages if API fails
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [selectedAccount, setSelectedAccount] = useState(null); // Data to show in modal

  // Fetch data from Payload CMS when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get("/api/client-accounts");
        const data = response.data.docs; // Payload CMS returns { docs: [...] }
        setAccounts(data);
        setFilteredAccounts(data);
      } catch (err) {
        setError("Failed to load client accounts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Handle user search input and filter accounts
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = accounts.filter((acc) =>
      acc.clientName?.toLowerCase().includes(value) ||
      acc.clientMobile?.includes(value) ||
      acc.query_license?.toLowerCase().includes(value) ||
      acc.mining_license?.toLowerCase().includes(value)
    );

    setFilteredAccounts(filtered);
  };

  // Handle delete operation by calling DELETE API
  const deleteAccount = async (id) => {
    if (window.confirm("Are you sure you want to delete this client account?")) {
      try {
        await axios.delete(`/api/client-accounts/${id}`);
        const updated = accounts.filter((acc) => acc.id !== id);
        setAccounts(updated);
        setFilteredAccounts(updated);
      } catch (err) {
        alert("Error deleting client account.");
      }
    }
  };

  // Open modal and set selected client account
  const handleView = (acc) => {
    setSelectedAccount(acc);
    setShowModal(true);
  };

  return (
    <>
      <Header />

      <Container fluid className="py-3">
        <Row className="text-center align-items-center mb-3">
          <Col xs={12} md={6}>
            <h4 className="fw-bold">
              <FaClipboard className="me-2" />
              View All Client's Accounts
            </h4>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <InputGroup className="mx-auto" style={{ maxWidth: "400px" }}>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by Name, Mobile, License"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Show loading spinner */}
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading client accounts...</p>
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">{error}</Alert>
        ) : (
          <div className="table-responsive">
            <Table className="table-bordered table-hover text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Query License</th>
                  <th>Mining License</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((acc, index) => (
                    <tr key={acc.id}>
                      <td>{index + 1}</td>
                      <td>{acc.clientName}</td>
                      <td>{acc.clientMobile}</td>
                      <td>{acc.query_license||"-"}</td>
                      <td>{acc.mining_license||"-"}</td>
                      <td>{formatDate(acc.clientCreatedAt)}</td>
                      <td>{formatTime(acc.clientCreatedAt)}</td>
                      <td>
                      <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
                        <Button variant="info" onClick={() => handleView(acc)}>
                          <FaEye className="fs-5 fw-bold"/>
                        </Button>
                        <Button variant="danger" onClick={() => deleteAccount(acc.id)}>
                          <FaTrash className="fs-5 fw-bold"/>
                        </Button>
                      </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-secondary fw-bold fs-5">
                      No Client Accounts Found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </Container>

      {/* Modal to view client details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Client Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccount && (
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6}><strong>Name:</strong> {selectedAccount.clientName}</Col>
                  <Col md={6}><strong>Mobile:</strong> {selectedAccount.clientMobile}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Query License:</strong> {selectedAccount.query_license||"-"}</Col>
                  <Col md={6}><strong>Mining License:</strong> {selectedAccount.mining_license||"-"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Village:</strong> {selectedAccount.near_village||"-"}</Col>
                  <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil||"-"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>District:</strong> {selectedAccount.district||"-"}</Col>
                  <Col md={6}><strong>State:</strong> {selectedAccount.state||"-"}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Country:</strong> {selectedAccount.country||"-"}</Col>
                  <Col md={6}><strong>Date:</strong> {formatDate(selectedAccount.clientCreatedAt)}</Col>
                </Row>
                <Row>
                  <Col><strong>Time:</strong> {formatTime(selectedAccount.clientCreatedAt)}</Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewClientAccount;

