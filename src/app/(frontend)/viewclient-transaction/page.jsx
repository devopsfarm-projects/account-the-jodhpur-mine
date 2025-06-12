// pages/view-client-transaction.jsx
"use client";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Modal, Form, InputGroup } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { FaEye as EyeFill, FaClipboard, FaRupeeSign, FaSearch, FaWrench } from "react-icons/fa";
import Header from "../components/Header";
import { PencilSquare } from "react-bootstrap-icons";

const ViewClientTransaction = () => {
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ⬇️ Load transactions from localStorage on first load
  useEffect(() => {
    const allTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(allTransactions);
    setFilteredTransactions(allTransactions);
  }, []);

  // 🔍 Search filter
  const handleSearch = (e) => {
    const name = e.target.value.toLowerCase();
    setSearchName(name);
    applyFilters(name, startDate, endDate);
  };

  // 📅 Filter handlers
  const handleStartDate = (e) => {
    const value = e.target.value;
    setStartDate(value);
    applyFilters(searchName, value, endDate);
  };

  const handleEndDate = (e) => {
    const value = e.target.value;
    setEndDate(value);
    applyFilters(searchName, startDate, value);
  };

  // 🧠 Filter function for name + date range
  const applyFilters = (name, start, end) => {
    const filtered = transactions.filter((txn) => {
      const matchesName = txn.client.toLowerCase().includes(name);

      const [datePart] = txn.transactioncreated.split(" ");
      const [day, month, year] = datePart.split("/");
      const txnDateObj = new Date(`${year}-${month}-${day}`);

      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;

      const matchesStart = startDateObj ? txnDateObj >= startDateObj : true;
      const matchesEnd = endDateObj ? txnDateObj <= endDateObj : true;

      return matchesName && matchesStart && matchesEnd;
    });

    setFilteredTransactions(filtered);
  };

  // 👁️ View modal
  const handleView = (txn) => {
    setSelectedTransaction(txn);
    setShowModal(true);
  };

  // ✏️ Navigate to edit transaction page
  const handleEdit = (id) => {
    router.push(`/editclient-transaction/${id}`);
  };

  return (
    <>
      <Header />

      <Container className="mt-4">
        <h4 className="text-center mb-4">
          <FaClipboard /> View Client All Transactions
        </h4>

        {/* Search & Filter */}
        <Form className="mb-4">
          <Row className="gy-3 gx-3 align-items-end">
            <Col xs={12} md={4}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search by vendor name..."
                  value={searchName}
                  onChange={handleSearch}
                />
                <InputGroup.Text><FaSearch /></InputGroup.Text>
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={handleStartDate}
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={handleEndDate}
              />
            </Col>
          </Row>
        </Form>

        {/* 📊 Table of Transactions */}
        <Table
          striped
          bordered
          hover
          responsive
          className="text-center align-middle fs-6 fw-medium"
        >
          <thead className="table-dark">
            <tr>
              <th>Client Name</th>
              <th>Date & Time</th>
              <th><FaRupeeSign /> Total</th>
              <th><FaRupeeSign /> Credit</th>
              <th><FaRupeeSign /> Remaining</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.client}</td>
                  <td>{txn.transactioncreated}</td>
                  <td><FaRupeeSign /> {txn.totalAmount}</td>
                  <td><FaRupeeSign /> {txn.totalCredits}</td>
                  <td><FaRupeeSign /> {txn.remainingAmount}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      className="me-0 me-md-2 mb-1 mb-md-0 justify-content-center align-items-center"
                      onClick={() => handleView(txn)}
                    >
                      <EyeFill />
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(index)}
                    >
                      <PencilSquare />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No Client Transactions found</td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* 📦 Transaction Details Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedTransaction && (
              <>
                <p><strong>Date & Time:</strong> {selectedTransaction.transactioncreated}</p>
                <p><strong>Client:</strong> {selectedTransaction.client}</p>
                <p><strong>Total Amount:</strong> <FaRupeeSign /> {selectedTransaction.totalAmount}</p>
                <p><strong>Token Amount:</strong> <FaRupeeSign /> {selectedTransaction.tokenAmount}</p>
                <p><strong>Total Credits:</strong> <FaRupeeSign /> {selectedTransaction.totalCredits}</p>
                <p><strong>Remaining Amount:</strong> <FaRupeeSign /> {selectedTransaction.remainingAmount}</p>
                <p><strong>Description:</strong> {selectedTransaction.description}</p>
                <hr />
                <h6><FaWrench /> Working Stages:</h6>
                <ul>
                  {selectedTransaction.workingStages.map((stage, idx) => (
                    <li key={idx}>
                      {stage.work}: <FaRupeeSign /> {stage.amount}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default ViewClientTransaction;
