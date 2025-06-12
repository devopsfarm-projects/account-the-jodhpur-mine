'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import { FaPlus, FaSave } from "react-icons/fa";
import Header from "../../components/Header";

const EditVendorTransaction = () => {
  const router = useRouter();
  const { id } = useParams();

  const [form, setForm] = useState({
    vendorName: "",
    totalAmount: "",
    tokenAmount: "",
    description: "",
    createdAt: "",
  });

  const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);

  // Load existing transaction data from localStorage
  useEffect(() => {
    const allTxns = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
    const selected = allTxns[id];

    if (selected) {
      setForm({
        vendorName: selected.vendorName,
        totalAmount: selected.totalAmount,
        tokenAmount: selected.tokenAmount,
        description: selected.description || "",
        createdAt: selected.createdAt,
      });
      setWorkingStages(selected.workingStages || []);
    }
  }, [id]);

  // Update form fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Update one work stage field
  const updateStage = (idx, field, value) => {
    const newStages = [...workingStages];
    newStages[idx][field] = value;
    setWorkingStages(newStages);
  };

  // Add new stage
  const addStage = () => {
    setWorkingStages([...workingStages, { work: "", amount: "" }]);
  };

  // Remove one stage
  const removeStage = (idx) => {
    const filtered = workingStages.filter((_, i) => i !== idx);
    setWorkingStages(filtered);
  };

  // Calculate total credits
  const getTotalCredits = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const workTotal = workingStages.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    return token + workTotal;
  };

  // Remaining = Total - Credits
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredits();
  };

  // Save changes to localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...form,
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredits: getTotalCredits(),
      remainingAmount: getRemainingAmount(),
      workingStages,
    };

    const allTxns = JSON.parse(localStorage.getItem("VendorTransactions") || "[]");
    allTxns[id] = { ...allTxns[id], ...updated };
    localStorage.setItem("VendorTransactions", JSON.stringify(allTxns));

    router.push("/viewvendor-transaction");
  };

  return (
    <>
      <Header />
      <Container className="mt-4 mb-5 p-3 p-md-4 rounded-4 shadow bg-light w-100 w-md-75 mx-auto">
        <h4 className="text-center text-primary fw-bold mb-4">
          Edit Vendor Transaction
        </h4>

        <Form onSubmit={handleSubmit}>
          {/* Vendor Name (Read-Only) */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-6">Vendor Name</Form.Label>
            <Form.Control value={form.vendorName} readOnly />
          </Form.Group>

          {/* Total and Token Amount */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-6">
                  Total Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
                </Form.Label>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  value={form.totalAmount}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-6">
                  Token Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
                </Form.Label>
                <Form.Control
                  type="number"
                  name="tokenAmount"
                  value={form.tokenAmount}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Work Stages Section */}
          <hr />
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h5 className="fw-bold fs-6 mb-2">
              <FontAwesomeIcon icon={faScrewdriverWrench} /> Work Stages
            </h5>
            <Button variant="warning" onClick={addStage} className="fw-bold mb-2">
              <FaPlus className="me-1" /> Add Stage
            </Button>
          </div>

          {workingStages.map((stage, idx) => (
            <Row key={idx} className="mb-2">
              <Col xs={12} md={5} className="mb-2 mb-md-0">
                <Form.Control
                  placeholder="Work Description"
                  value={stage.work}
                  onChange={(e) => updateStage(idx, "work", e.target.value)}
                />
              </Col>
              <Col xs={12} md={4} className="mb-2 mb-md-0">
                <Form.Control
                  type="number"
                  placeholder="₹ Amount"
                  value={stage.amount}
                  onChange={(e) => updateStage(idx, "amount", e.target.value)}
                />
              </Col>
              <Col xs={12} md={3}>
                <Button
                  variant="danger"
                  onClick={() => removeStage(idx)}
                  disabled={workingStages.length === 1}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Credits & Remaining */}
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-6">
                  Total Credits <FontAwesomeIcon icon={faIndianRupeeSign} />
                </Form.Label>
                <Form.Control value={getTotalCredits()} readOnly className="bg-white" />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold fs-6">
                  Remaining Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
                </Form.Label>
                <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
              </Form.Group>
            </Col>
          </Row>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-6">Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Enter any notes or remarks"
            />
          </Form.Group>

          {/* Created At (Read-Only) */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold fs-6">Created At</Form.Label>
            <Form.Control value={form.createdAt} readOnly />
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center">
            <Button type="submit" variant="primary" className="fs-5 fw-bold px-4 py-2">
              <FaSave className="me-2 mb-1" /> Save Changes
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditVendorTransaction;
