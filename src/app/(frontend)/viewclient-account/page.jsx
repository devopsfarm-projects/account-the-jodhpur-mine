// pages/view-client-account.jsx
"use client";
import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Modal,
  Card,
  Row,
  Col,
  Form,
  Badge,
  InputGroup,
} from "react-bootstrap";

import { FaEye, FaTrash, FaSearch, FaClipboard } from "react-icons/fa";

// Header can be imported if you have a layout
import Header from "../components/Header"; // adjust path if needed

const ViewClientAccount = () => {
  const [accounts, setAccounts] = useState([]); // All accounts
  const [filteredAccounts, setFilteredAccounts] = useState([]); // Filtered list for search
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [showModal, setShowModal] = useState(false); // Modal open state
  const [selectedAccount, setSelectedAccount] = useState(null); // Account to show in modal

  // Load data from localStorage when component mounts (only in browser)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = JSON.parse(localStorage.getItem("accounts") || "[]");
      setAccounts(stored);
      setFilteredAccounts(stored);
    }
  }, []);

  // Handle search filter
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = accounts.filter((acc) =>
      acc.name.toLowerCase().includes(value) ||
      acc.mobile.includes(value) ||
      acc.queryLicense.toLowerCase().includes(value) ||
      acc.miningLicense.toLowerCase().includes(value)
    );
    setFilteredAccounts(filtered);
  };

  // Toggle status active/inactive
  const toggleStatus = (index) => {
    const selected = filteredAccounts[index];
    const updatedStatus = !selected.status;

    // Update main accounts list
    const updatedAccounts = accounts.map((acc) =>
      acc.createdAt === selected.createdAt ? { ...acc, status: updatedStatus } : acc
    );

    // Save to localStorage and update state
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setAccounts(updatedAccounts);

    // Update filtered list
    const updatedFiltered = filteredAccounts.map((acc, i) =>
      i === index ? { ...acc, status: updatedStatus } : acc
    );
    setFilteredAccounts(updatedFiltered);
  };

  // Delete account by matching createdAt
  const deleteAccount = (index) => {
    const toDelete = filteredAccounts[index];
    const updated = accounts.filter(
      (acc) => acc.createdAt !== toDelete.createdAt
    );

    localStorage.setItem("accounts", JSON.stringify(updated));
    setAccounts(updated);
    setFilteredAccounts(filteredAccounts.filter((_, i) => i !== index));
  };

  // Open modal with selected account
  const handleView = (acc) => {
    setSelectedAccount(acc);
    setShowModal(true);
  };

  return (
    <>
      <Header />

      {/* Title and Search */}
      <Container fluid className="py-3">
        <Row className="text-center align-items-center mb-3">
          <Col xs={12} md={6}>
            <h4 className="fw-bold">
              <FaClipboard /> View All Client's Account
            </h4>
          </Col>
          <Col xs={12} md={6} className="mt-2 mt-md-0">
            <InputGroup className="mx-auto" style={{ maxWidth: "400px" }}>
              <InputGroup.Text>
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by Name, Mobile, License"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Responsive Table */}
        <div className="table-responsive">
          <Table className="table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Query License</th>
                <th>Mining License</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{acc.name}</td>
                    <td>{acc.mobile}</td>
                    <td>{acc.queryLicense}</td>
                    <td>{acc.miningLicense}</td>
                    <td>
                      <Button
                        variant={acc.status ? "success" : "danger"}
                        size="sm"
                        onClick={() => toggleStatus(index)}
                      >
                        {acc.status ? "Active" : "Inactive"}
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
                        onClick={() => handleView(acc)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => deleteAccount(index)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-secondary fw-bold fs-5">
                    No Client Accounts Found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Modal View */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Account Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAccount && (
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Row className="mb-2">
                  <Col md={6}><strong>Name:</strong> {selectedAccount.name}</Col>
                  <Col md={6}><strong>Mobile:</strong> {selectedAccount.mobile}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Query License:</strong> {selectedAccount.queryLicense}</Col>
                  <Col md={6}><strong>Mining License:</strong> {selectedAccount.miningLicense}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Village:</strong> {selectedAccount.village}</Col>
                  <Col md={6}><strong>Tehsil:</strong> {selectedAccount.tehsil}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>District:</strong> {selectedAccount.district}</Col>
                  <Col md={6}><strong>State:</strong> {selectedAccount.state}</Col>
                </Row>
                <Row className="mb-2">
                  <Col md={6}><strong>Country:</strong> {selectedAccount.country}</Col>
                  <Col md={6}>
                    <strong>Status:</strong>{" "}
                    <Badge bg={selectedAccount.status ? "success" : "danger"}>
                      {selectedAccount.status ? "Active" : "Inactive"}
                    </Badge>
                  </Col>
                </Row>
                <Row className="mb-2">
                  <Col><strong>Created At:</strong> {selectedAccount.createdAt}</Col>
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
