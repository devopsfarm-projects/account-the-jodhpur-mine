"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Header from "../../components/Header";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const EditClientTransaction = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [form, setForm] = useState({
    client: "",
    totalAmount: "",
    tokenAmount: "",
    description: "",
  });
  const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);
  const [transactionCreated, setTransactionCreated] = useState("");

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    const txn = transactions[parseInt(id)];

    if (txn) {
      setForm({
        client: txn.client,
        totalAmount: txn.totalAmount,
        tokenAmount: txn.tokenAmount,
        description: txn.description,
      });
      setWorkingStages(txn.workingStages);
      setTransactionCreated(txn.transactioncreated);
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateStage = (i, field, value) => {
    const updated = [...workingStages];
    updated[i][field] = value;
    setWorkingStages(updated);
  };

  const addStage = () => {
    setWorkingStages([...workingStages, { work: "", amount: "" }]);
  };

  const removeStage = (i) => {
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, idx) => idx !== i));
    }
  };

  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const stages = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return token + stages;
  };

  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updated = {
      ...form,
      totalAmount: parseFloat(form.totalAmount) || 0,
      tokenAmount: parseFloat(form.tokenAmount) || 0,
      totalCredits: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      workingStages,
      transactioncreated: transactionCreated,
    };

    const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    transactions[parseInt(id)] = updated;
    localStorage.setItem("transactions", JSON.stringify(transactions));
    router.push("/viewclient-transaction");
  };

  return (
    <>
      <Header />
      <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow" style={{ maxWidth: "700px" }}>
        <h4 className="text-center mb-4">Edit Client Transaction</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Client</Form.Label>
            <Form.Control value={form.client} readOnly />
          </Form.Group>

          <Row className="g-3">
            <Col sm={6}>
              <Form.Label>Total Amount <RiMoneyRupeeCircleFill /></Form.Label>
              <Form.Control
                type="number"
                name="totalAmount"
                value={form.totalAmount}
                onChange={handleFormChange}
                required
              />
            </Col>
            <Col sm={6}>
              <Form.Label>Token Amount <RiMoneyRupeeCircleFill /></Form.Label>
              <Form.Control
                type="number"
                name="tokenAmount"
                value={form.tokenAmount}
                onChange={handleFormChange}
                required
              />
            </Col>
          </Row>

          <hr />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-bold">Working Stages</h5>
            <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
          </div>

          {workingStages.map((stage, i) => (
            <Row key={i} className="g-2 mb-2 align-items-center">
              <Col sm={5}>
                <Form.Control
                  placeholder="Work"
                  value={stage.work}
                  onChange={(e) => updateStage(i, "work", e.target.value)}
                />
              </Col>
              <Col sm={4}>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  value={stage.amount}
                  onChange={(e) => updateStage(i, "amount", e.target.value)}
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="danger"
                  onClick={() => removeStage(i)}
                  disabled={workingStages.length === 1}
                  className="w-100"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <Row className="g-3 mt-3">
            <Col sm={6}>
              <Form.Label>Total Credits</Form.Label>
              <Form.Control value={getTotalCredit()} readOnly />
            </Col>
            <Col sm={6}>
              <Form.Label>Remaining Amount</Form.Label>
              <Form.Control value={getRemainingAmount()} readOnly />
            </Col>
          </Row>

          <Form.Group className="mt-3 mb-4">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="description"
              value={form.description}
              onChange={handleFormChange}
              placeholder="Optional notes"
            />
          </Form.Group>

          <div className="d-flex flex-column flex-md-row gap-3">
            <Button type="submit" className="flex-fill" variant="primary">
              Save Changes
            </Button>
            <Button variant="secondary" className="flex-fill" onClick={() => router.push("/viewclient-transaction")}>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditClientTransaction;
