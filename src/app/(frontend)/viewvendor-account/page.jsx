'use client'; // Important for client-side logic like localStorage

import React, { useEffect, useState } from 'react';
import {Container,Table,Button,Modal,Card,Row,Col,Form,Badge,InputGroup,} from 'react-bootstrap';
import { FaEye, FaTrash, FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';

const ViewVendorAccount = () => {
  const [vendorAccounts, setVendorAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredVendorAccounts, setFilteredVendorAccounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendorAccount, setSelectedVendorAccount] = useState(null);

  // Load from localStorage on component mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('vendorAccounts') || '[]');
    setVendorAccounts(stored);
    setFilteredVendorAccounts(stored);
  }, []);

  // Search handler
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const results = vendorAccounts.filter((acc) =>
      acc.name.toLowerCase().includes(term)
    );
    setFilteredVendorAccounts(results);
  };

  // Delete vendor
  const deleteVendorAccount = (indexToDelete) => {
    const updated = vendorAccounts.filter((_, i) => i !== indexToDelete);
    setVendorAccounts(updated);
    setFilteredVendorAccounts(updated);
    localStorage.setItem('vendorAccounts', JSON.stringify(updated));
  };

  // Toggle status (Active/Inactive)
  const toggleStatus = (index) => {
    const updated = [...vendorAccounts];
    updated[index].status = !updated[index].status;
    setVendorAccounts(updated);
    setFilteredVendorAccounts(updated);
    localStorage.setItem('vendorAccounts', JSON.stringify(updated));
  };

  // View account in modal
  const handleView = (account) => {
    setSelectedVendorAccount(account);
    setShowModal(true);
  };

  return (
    <>
      <Header />
      <Container className="mt-4 text-capitalize">
        {/* 🔍 Title and Search */}
        <Row className="mb-4 justify-content-between align-items-center px-2">
          <Col xs={12} md={6} className="mb-3 mb-md-0 text-center text-md-start">
            <h4 className="fw-bold">
              <FontAwesomeIcon icon={faClipboard} /> View All Vendor's Account
            </h4>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search Vendor's By Name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* 📋 Vendor Table */}
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center align-middle table-striped border-dark"
        >
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
            {filteredVendorAccounts.length > 0 ? (
              filteredVendorAccounts.map((account, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{account.name}</td>
                  <td>{account.mobile}</td>
                  <td>{account.queryLicense}</td>
                  <td>{account.miningLicense}</td>
                  <td>
                    <Button
                      size="sm"
                      variant={account.status ? 'success' : 'danger'}
                      onClick={() => toggleStatus(index)}
                    >
                      {account.status ? 'Active' : 'Inactive'}
                    </Button>
                  </td>
                  <td>
                    <div className="d-flex flex-wrap gap-2 justify-content-center align-items-center">
                      <Button
                        size="sm"
                        variant="info"
                        onClick={() => handleView(account)}
                      >
                        <FaEye />
                      </Button>
                      <Button
                        size="sm"
                        variant="warning"
                        onClick={() => deleteVendorAccount(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted fs-5">
                  No Vendor accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 👁️ View Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Vendor Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedVendorAccount && (
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <strong>Name:</strong> {selectedVendorAccount.name}
                    </Col>
                    <Col xs={12} md={6}>
                      <strong>Mobile:</strong> {selectedVendorAccount.mobile}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <strong>Query License:</strong> {selectedVendorAccount.queryLicense}
                    </Col>
                    <Col xs={12} md={6}>
                      <strong>Mining License:</strong> {selectedVendorAccount.miningLicense}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12} md={6}>
                      <strong>Village:</strong> {selectedVendorAccount.village}
                    </Col>
                    <Col xs={12} md={6}>
                      <strong>Tehsil:</strong> {selectedVendorAccount.tehsil}
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col xs={12} md={4}>
                      <strong>District:</strong> {selectedVendorAccount.district}
                    </Col>
                    <Col xs={12} md={4}>
                      <strong>State:</strong> {selectedVendorAccount.state}
                    </Col>
                    <Col xs={12} md={4}>
                      <strong>Country:</strong> {selectedVendorAccount.country}
                    </Col>
                  </Row>
                  <Row className="border-top pt-3">
                    <Col>
                      <strong>Status:</strong>
                      <Badge
                        bg={selectedVendorAccount.status ? 'success' : 'danger'}
                        className="ms-2 px-3 py-2 fs-6"
                      >
                        {selectedVendorAccount.status ? 'Active' : 'Inactive'}
                      </Badge>
                    </Col>
                  </Row>
                  <Row className="border-top pt-3 mt-2">
                    <Col>
                      <strong>Created At:</strong> {selectedVendorAccount.createdAt}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ViewVendorAccount;
