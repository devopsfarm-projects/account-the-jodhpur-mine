'use client'; // Required for Next.js components that access browser-only features like localStorage or useRouter

// React core imports
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Used to navigate between pages

// Bootstrap components for layout and UI
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert
} from "react-bootstrap";

// Icons for better visuals
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FaSave, FaExclamationTriangle } from "react-icons/fa";
import { TbPlus, TbTransactionRupee } from "react-icons/tb";

// Reusable Header component
import Header from "../components/Header";

// Main Component Function
const AddVendorTransaction = () => {
  const router = useRouter(); // Hook to navigate programmatically

  // Store all ACTIVE vendor names (status: true) for the dropdown
  const [activeVendors, setActiveVendors] = useState([]);

  // Store form input values
  const [form, setForm] = useState({
    vendorName: "",
    totalAmount: "",
    tokenAmount: "",
    description: ""
  });

  // Working stages array: multiple rows for work + amount
  const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);

  // Display errors if vendor invalid or data missing
  const [error, setError] = useState("");

  // Fetch only active vendors when component loads
  useEffect(() => {
    const vendorData = JSON.parse(localStorage.getItem("vendorAccounts") || "[]");
    const filtered = vendorData.filter(v => v.status === true).map(v => v.name);
    setActiveVendors(filtered);
  }, []);

  // Update form field values (like vendorName, totalAmount)
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Update a particular stage's field (work or amount)
  const handleStageChange = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  // Add a new empty work stage
  const handleAddStage = () => {
    setWorkingStages([...workingStages, { work: "", amount: "" }]);
  };

  // Remove a specific work stage
  const handleRemoveStage = (index) => {
    const updated = workingStages.filter((_, i) => i !== index);
    setWorkingStages(updated);
  };

  // Calculate Total Credit = token amount + stage amounts
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const stageTotal = workingStages.reduce((sum, stage) => sum + (parseFloat(stage.amount) || 0), 0);
    return token + stageTotal;
  };

  // Remaining = totalAmount - totalCredit
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // Generate readable date + time
  const getDateTime = () => {
    const now = new Date();
    return `${now.toLocaleDateString("en-GB")} ${now.toLocaleTimeString("en-IN")}`;
  };

  // Reset form and stage values
  const handleReset = () => {
    setForm({
      vendorName: "",
      totalAmount: "",
      tokenAmount: "",
      description: ""
    });
    setWorkingStages([{ work: "", amount: "" }]);
    setError("");
  };

  // Final form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate selected vendor
    if (!activeVendors.includes(form.vendorName)) {
      setError(`Invalid vendor name: ${form.vendorName}`);
      setTimeout(() => handleReset(), 3000);
      return;
    }

    // Prepare data to save
    const newTransaction = {
      ...form,
      totalAmount: parseFloat(form.totalAmount) || 0,
      tokenAmount: parseFloat(form.tokenAmount) || 0,
      totalCredits: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      workingStages,
      createdAt: getDateTime()
    };

    // Save to localStorage
    const previous = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
    previous.push(newTransaction);
    localStorage.setItem("VendorTransactions", JSON.stringify(previous));

    // Navigate to view page
    router.push("/viewvendor-transaction");
  };

  return (
    <>
      {/* Header with navigation */}
      <Header />

      {/* Form Container - Responsive design with Bootstrap */}
      <Container className="my-3 p-3 p-sm-4 bg-light rounded-4 shadow w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 text-danger fw-bold">
          <TbTransactionRupee className="fs-2 mb-1" /> Add Vendor Transaction
        </h4>

        {/* Error Message if no vendors or invalid vendor selected */}
        {activeVendors.length === 0 ? (
          <Alert variant="danger" className="text-center">
            <FaExclamationTriangle className="me-2" />
            No active vendors found. Please add a Vendor Account first.
          </Alert>
        ) : error && (
          <Alert variant="danger" className="text-center">
            <FaExclamationTriangle className="me-2" />
            {error}
          </Alert>
        )}

        {/* Main Form Start */}
        <Form onSubmit={handleSubmit}>
          {/* Vendor Name Field with filtered active vendors */}
          <Form.Group className="mb-3">
            <Form.Label><strong>Vendor Name</strong> <span className="text-danger">*</span></Form.Label>
            <Form.Control
              list="vendorList"
              name="vendorName"
              value={form.vendorName}
              onChange={(e) => {
                handleFormChange(e);
                setError(""); // Clear error if user types again
              }}
              placeholder="Start typing vendor name..."
              required
              disabled={activeVendors.length === 0}
            />
            <datalist id="vendorList">
              {activeVendors.map((name, idx) => (
                <option key={idx} value={name} />
              ))}
            </datalist>
          </Form.Group>

          {/* Amount Inputs: Total and Token */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Total Amount</strong> <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleFormChange}
                  required
                  disabled={activeVendors.length === 0}
                  placeholder="Enter total amount"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Token Amount</strong> <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="number"
                  name="tokenAmount"
                  value={form.tokenAmount}
                  onChange={handleFormChange}
                  required
                  disabled={activeVendors.length === 0}
                  placeholder="Enter token amount"
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Working Stages Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold text-dark">
              <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
              Working Stages
            </h5>
            <Button variant="warning" onClick={handleAddStage} disabled={activeVendors.length === 0}>
              <TbPlus className="me-1" /> Add Stage
            </Button>
          </div>

          {/* Loop through each work stage */}
          {workingStages.map((stage, idx) => (
            <Row key={idx} className="mb-2">
              <Col xs={12} md={5} className="pb-3 pb-lg-0">
                <Form.Control
                  placeholder="Work Description"
                  value={stage.work}
                  onChange={(e) => handleStageChange(idx, "work", e.target.value)}
                />
              </Col>
              <Col xs={12} md={4} className="pb-3 pb-lg-0">
                <Form.Control
                  type="number"
                  placeholder="₹ Amount"
                  value={stage.amount}
                  onChange={(e) => handleStageChange(idx, "amount", e.target.value)}
                />
              </Col>
              <Col xs={12} md={3} className="pb-3 pb-lg-0">
                <Button
                  variant="danger"
                  onClick={() => handleRemoveStage(idx)}
                  disabled={workingStages.length === 1}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Totals & Remaining */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Total Credits</strong></Form.Label>
                <Form.Control value={getTotalCredit()} readOnly className="bg-white" />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label><strong>Remaining Amount</strong></Form.Label>
                <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
              </Form.Group>
            </Col>
          </Row>

          {/* Optional Notes */}
          <Form.Group className="mb-3">
            <Form.Label><strong>Description (Optional)</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Extra notes or remarks..."
            />
          </Form.Group>

          {/* Submit and Reset */}
          <div className="text-center d-flex justify-content-center gap-3 flex-wrap mt-4">
            <Button type="submit" variant="success" disabled={activeVendors.length === 0}>
              <FaSave className="me-2" />
              Save Transaction
            </Button>
            <Button type="button" variant="secondary" onClick={handleReset}>
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddVendorTransaction;
