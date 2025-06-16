'use client'; // Required for using useState, useEffect, and useRouter in Next.js

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Row, Col, InputGroup, Button, Spinner } from "react-bootstrap";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import Header from "../../components/Header"; // Your custom Header component

const EditExpense = () => {
  const router = useRouter(); // Used to programmatically navigate
  const { id } = useParams(); // Get the expense ID from the URL

  // Form states
  const [loading, setLoading] = useState(true);
  const [expense, setExpense] = useState(null);
  const [initialBalance, setInitialBalance] = useState('');
  const [expenseItems, setExpenseItems] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch expense data from Payload backend on component load
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`/api/expenses/${id}`);
        const data = await res.json();

        setExpense(data);
        setInitialBalance(data.initialBalance.toString());
        setExpenseItems(data.expenseItems || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load expense", err);
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  // Add a new item to the expenseItems list
  const addItem = () => {
    if (description.trim()) {
      const newItem = {
        description: description.trim(),
        amount: parseFloat(amount) || 0,
      };
      setExpenseItems([...expenseItems, newItem]); // Add to existing items
      setDescription('');
      setAmount('');
    }
  };

  // Remove an item from the expenseItems list by index
  const removeItem = (indexToRemove) => {
    const updatedItems = expenseItems.filter((_, index) => index !== indexToRemove);
    setExpenseItems(updatedItems);
  };

  // Calculate total and remaining amounts
  const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingAmount = parseFloat(initialBalance || 0) - totalExpense;

  // Save the updated expense to the backend
  const saveChanges = async () => {
    const payload = {
      id: expense.id,
      initialBalance: parseFloat(initialBalance),
      expenseItems: expenseItems,
      expenseUpdatedAt: new Date().toISOString()
    };

    try {
      const res = await fetch(`/api/expense/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/view-expense"); // Redirect after save
      } else {
        alert("Failed to save changes.");
      }
    } catch (error) {
      console.error("Update error", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading expense data...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5">
        <h3 className="text-center mb-4">Edit Expense</h3>
        <Form>
          {/* Name, Date, Time - read-only */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={expense.nameOfExpense}
                readOnly
                className="text-capitalize"
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Created Date</Form.Label>
              <Form.Control
                type="text"
                value={new Date(expense.expenseCreatedAt).toLocaleDateString()}
                readOnly
              />
            </Col>
            <Col xs={12} md={4}>
              <Form.Label>Updated Time</Form.Label>
              <Form.Control
                type="text"
                value={new Date(expense.expenseUpdatedAt).toLocaleTimeString()}
                readOnly
              />
            </Col>
          </Row>

          {/* Initial Balance */}
          <Form.Group className="mb-4">
            <Form.Label>Initial Balance</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
              <Form.Control
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                min="0"
              />
            </InputGroup>
          </Form.Group>

          {/* Add Expense Items */}
          <h5 className="mb-3">Expense Items</h5>
          <Row className="mb-3 gx-2">
            <Col xs={12} sm={5}>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col xs={12} sm={4}>
              <InputGroup>
                <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                />
              </InputGroup>
            </Col>
            <Col xs={12} sm={3}>
              <Button
                onClick={addItem}
                className="w-100"
                disabled={!description.trim()}
              >
                Add Item
              </Button>
            </Col>
          </Row>

          {/* List Expense Items */}
          {expenseItems.map((item, idx) => (
            <Row key={idx} className="mb-2 align-items-center">
              <Col xs={12} sm={5}>{item.description}</Col>
              <Col xs={12} sm={4}><FaRupeeSign /> {item.amount.toFixed(2)}</Col>
              <Col xs={12} sm={3}>
                <Button variant="danger" size="sm" onClick={() => removeItem(idx)}>
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}

          <hr />
          {/* Summary */}
          <p className="text-danger fw-bold">Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}</p>
          <p className="text-success fw-bold">Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}</p>

          {/* Buttons */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
            <Button variant="secondary" onClick={() => router.push("/view-expense")}>
              Cancel Changes
            </Button>
            <Button variant="success" onClick={saveChanges}>
              Save Changes
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditExpense;
