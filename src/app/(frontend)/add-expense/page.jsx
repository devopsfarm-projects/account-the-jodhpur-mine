'use client'; // Needed for client-side features like localStorage

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Row, Col, InputGroup, Alert, } from 'react-bootstrap';
import Header from '../components/Header';
import { FaRupeeSign, FaTrash } from 'react-icons/fa';

const AddExpense = () => {
    const router = useRouter();

    // Form state
    const [name, setName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [expenseItems, setExpenseItems] = useState([]);
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    // Add expense item
    const handleAddItem = () => {
        if (description) {
            setExpenseItems([
                ...expenseItems,
                { description, amount: parseFloat(amount) || 0 },
            ]);
            setDescription('');
            setAmount('');
        }
    };

    // Remove item
    const handleRemoveItem = (i) => {
        setExpenseItems(expenseItems.filter((_, idx) => idx !== i));
    };

    // Totals
    const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
    const remainingAmount = initialBalance
        ? parseFloat(initialBalance) - totalExpense
        : 0;

    // Get current time
    const getCurrentDateTime = () => {
        const now = new Date();
        return {
            date: now.toLocaleDateString('en-GB'),
            time: now.toLocaleTimeString('en-IN'),
        };
    };

    // Handle Save
    const handleSave = (e) => {
        e.preventDefault();
        setValidated(true);

        if (!name || !initialBalance) {
            setShowAlert(true);
            setTimeout(() => handleReset(), 2000);
            return;
        }

        const { date, time } = getCurrentDateTime();
        const newExpense = {
            name,
            initialBalance: parseFloat(initialBalance),
            expenseItems,
            totalExpense,
            remainingAmount,
            date,
            time,
        };

        const existing = JSON.parse(localStorage.getItem('expenses') || '[]');
        existing.push(newExpense);
        localStorage.setItem('expenses', JSON.stringify(existing));

        setTimeout(() => {
            setName('');
            setInitialBalance('');
            setExpenseItems([]);
            setValidated(false);
            setShowAlert(false);
            router.push('/view-expense');
        }, 2000);
    };

    // Reset
    const handleReset = () => {
        setName('');
        setInitialBalance('');
        setDescription('');
        setAmount('');
        setExpenseItems([]);
        setValidated(false);
        setShowAlert(false);
    };

    return (
        <>
            <Header />

            <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: '60px', }} className="d-flex flex-column justify-content-start">
                <Container className="mt-5">
                    <h3 className="text-center mb-4 text-capitalize">Add New Expense</h3>

                    {showAlert && (
                        <Alert variant="danger" onClose={() => handleReset()} dismissible>
                            Please fill all required fields (*)
                        </Alert>
                    )}

                    <Form noValidate validated={validated} onSubmit={handleSave}>
                        {/* Name */}
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label className="fs-5 fw-bold">
                                Name of Expense <span className="text-danger">*</span>
                            </Form.Label>
                            <Form.Control type="text" placeholder="Enter name" value={name} required
                                isInvalid={validated && !name} onChange={(e) => setName(e.target.value)} />
                            <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
                                Name of Expense is required
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Initial Balance */}
                        <Form.Group controlId="formInitialBalance" className="mb-4">
                            <Form.Label className="fs-5 fw-bold">
                                Initial Balance Amount <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FaRupeeSign />
                                </InputGroup.Text>
                                <Form.Control type="number" placeholder="Enter balance" value={initialBalance} required isInvalid={validated && !initialBalance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
                                    Initial Balance Amount is required
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* Add Expense Items */}
                        <h5 className="mb-3">Add Expense Items (optional)</h5>
                        <Row className="g-2 mb-3">
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
                                    <InputGroup.Text>
                                        <FaRupeeSign />
                                    </InputGroup.Text>
                                    <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                </InputGroup>
                            </Col>
                            <Col xs={12} sm={3}>
                                <Button
                                    variant="success"
                                    className="w-75 rounded-4 fs-6 fw-bold"
                                    onClick={handleAddItem}
                                >
                                    Add Expense Item
                                </Button>
                            </Col>
                        </Row>

                        {/* List of Items */}
                        {expenseItems.map((it, i) => (
                            <Row className="align-items-center mb-2" key={i}>
                                <Col xs={12} sm={5}>{it.description}</Col>
                                <Col xs={12} sm={4}>
                                    <FaRupeeSign /> {it.amount.toFixed(2)}
                                </Col>
                                <Col xs={12} sm={3}>
                                    <Button variant="danger" size="sm" className="w-75 rounded-4 fs-5 fw-bold" onClick={() => handleRemoveItem(i)}>
                                        <FaTrash />
                                    </Button>
                                </Col>
                            </Row>
                        ))}

                        <hr />

                        {/* Totals */}
                        <p className="fs-5 fw-bold">
                            Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}
                        </p>
                        <p className="fs-5 fw-bold text-secondary">
                            Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}
                        </p>

                        {/* Form Buttons */}
                        <Row className="mt-4 g-3 justify-content-center">
                            <Col xs={12} sm={5}>
                                <Button type="button" variant="warning" className="w-50 rounded-4 fs-5 fw-bold" onClick={handleReset}>Reset Expense</Button>
                            </Col>
                            <Col xs={12} sm={5}>
                                <Button type="submit" variant="primary" className="w-50 rounded-4 fs-5 fw-bold">Save Expense</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default AddExpense;
