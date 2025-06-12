'use client'; // required for localStorage and router

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {Container,Table,Form,InputGroup,Button,Modal,Row,Col,} from 'react-bootstrap';
import Header from "../components/Header"
import { FaRupeeSign, FaEye, FaEdit, FaSearch } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const ViewExpense = () => {
  const router = useRouter();

  // All expenses from localStorage
  const [expenses, setExpenses] = useState([]);

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // For modal view
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('expenses') || '[]');
    setExpenses(stored);
    setFilteredExpenses(stored);
  }, []);

  // Filter by name whenever search term changes
  useEffect(() => {
    const result = expenses.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExpenses(result);
  }, [searchTerm, expenses]);

  // Handle modal open
  const handleView = (expense) => {
    setSelectedExpense(expense);
    setShowModal(true);
  };

  // Navigate to edit page
  const handleEdit = (id) => {
    console.log(`the edit id is ${id}`);
    router.push(`/edit-expense/${id}`);
  };

  return (
    <>
      <Header />

      <Container fluid className="py-4 px-3">
        {/* Page Title and Search Bar */}
        <Row className="align-items-center mb-4">
          <Col xs={12} md={6} className="text-center text-md-start mb-2 mb-md-0">
            <h4 className="fw-bold text-capitalize">
              <FontAwesomeIcon icon={faClipboard} className="me-2" />
              View All The Expenses
            </h4>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup>
              <InputGroup.Text><FaSearch /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by expense name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        {/* Responsive Table */}
        <div className="table-responsive">
          <Table striped bordered hover responsive className="text-center align-middle fs-6 border-dark">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Date</th>
                <th>Initial (<FaRupeeSign />)</th>
                <th>Total (<FaRupeeSign />)</th>
                <th>Remaining (<FaRupeeSign />)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{expense.name}</td>
                    <td>{expense.date}</td>
                    <td><FaRupeeSign /> {expense.initialBalance.toFixed(2)}</td>
                    <td><FaRupeeSign /> {expense.totalExpense.toFixed(2)}</td>
                    <td><FaRupeeSign /> {expense.remainingAmount.toFixed(2)}</td>
                    <td>
                      <div className="d-flex flex-column flex-md-row justify-content-center gap-2">
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleView(expense)}
                        >
                          <FaEye />
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEdit(index)}
                        >
                          <FaEdit />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-secondary fw-semibold">
                    No expenses found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>

      {/* Modal to View Full Expense */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Expense Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedExpense && (
            <>
              <Row className="mb-2">
                <Col xs={12} md={6}><strong>Name:</strong> {selectedExpense.name}</Col>
                <Col xs={12} md={6}><strong>Date:</strong> {selectedExpense.date}</Col>
              </Row>
              <Row className="mb-2">
                <Col xs={12} md={6}><strong>Time:</strong> {selectedExpense.time}</Col>
                <Col xs={12} md={6}>
                  <strong>Initial Balance:</strong> <FaRupeeSign /> {selectedExpense.initialBalance.toFixed(2)}
                </Col>
              </Row>
              <Row className="mb-2">
                <Col xs={12} md={6}>
                  <strong>Total Expense:</strong> <FaRupeeSign /> {selectedExpense.totalExpense.toFixed(2)}
                </Col>
                <Col xs={12} md={6}>
                  <strong>Remaining:</strong> <FaRupeeSign /> {selectedExpense.remainingAmount.toFixed(2)}
                </Col>
              </Row>

              {selectedExpense.expenseItems.length > 0 && (
                <div className="pt-3 border-top border-2 mt-3">
                  <h6 className="text-primary">Expense Items:</h6>
                  <ul className="ps-3">
                    {selectedExpense.expenseItems.map((item, idx) => (
                      <li key={idx} className="fw-semibold text-capitalize">
                        {item.description} - <FaRupeeSign /> {item.amount.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewExpense;
