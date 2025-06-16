//Edit Client Transaction page
// "use client";//required for localStorage and router
// import React, { useEffect, useState } from "react";
// import { useRouter, useParams } from "next/navigation";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import Header from "../../components/Header";
// import { RiMoneyRupeeCircleFill } from "react-icons/ri";

// const EditClientTransaction = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;
//   console.log(`the id of the transaction is`, id);
//   const [form, setForm] = useState({
//     client: "",
//     totalAmount: "",
//     tokenAmount: "",
//     description: "",
//   });
//   const [workingStages, setWorkingStages] = useState([{ work: "", amount: "" }]);
//   const [transactionCreated, setTransactionCreated] = useState("");

//   useEffect(() => {
//     const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     const txn = transactions[parseInt(id)];

//     if (txn) {
//       setForm({
//         client: txn.client,
//         totalAmount: txn.totalAmount,
//         tokenAmount: txn.tokenAmount,
//         description: txn.description,
//       });
//       setWorkingStages(txn.workingStages);
//       setTransactionCreated(txn.transactioncreated);
//     }
//   }, []);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const updateStage = (i, field, value) => {
//     const updated = [...workingStages];
//     updated[i][field] = value;
//     setWorkingStages(updated);
//   };

//   const addStage = () => {
//     setWorkingStages([...workingStages, { work: "", amount: "" }]);
//   };

//   const removeStage = (i) => {
//     if (workingStages.length > 1) {
//       setWorkingStages(workingStages.filter((_, idx) => idx !== i));
//     }
//   };

//   const getTotalCredit = () => {
//     const token = parseFloat(form.tokenAmount) || 0;
//     const stages = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//     return token + stages;
//   };

//   const getRemainingAmount = () => {
//     const total = parseFloat(form.totalAmount) || 0;
//     return total - getTotalCredit();
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const updated = {
//       ...form,
//       totalAmount: parseFloat(form.totalAmount) || 0,
//       tokenAmount: parseFloat(form.tokenAmount) || 0,
//       totalCredits: getTotalCredit(),
//       remainingAmount: getRemainingAmount(),
//       workingStages,
//       transactioncreated: transactionCreated,
//     };

//     const transactions = JSON.parse(localStorage.getItem("transactions") || "[]");
//     transactions[parseInt(id)] = updated;
//     localStorage.setItem("transactions", JSON.stringify(transactions));
//     router.push("/viewclient-transaction");
//   };

//   return (
//     <>
//       <Header />
//       <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-sm-100 w-md-75 w-lg-75 w-xl-75 w-xxl-50 mx-auto" >
//         <h4 className="text-center mb-4">Edit Client Transaction</h4>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label className="fw-bold">Client</Form.Label>
//             <Form.Control value={form.client} readOnly />
//           </Form.Group>

//           <Row className="g-3">
//             <Col sm={6}>
//               <Form.Label>Total Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="totalAmount"
//                 value={form.totalAmount}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Token Amount <RiMoneyRupeeCircleFill /></Form.Label>
//               <Form.Control
//                 type="number"
//                 name="tokenAmount"
//                 value={form.tokenAmount}
//                 onChange={handleFormChange}
//                 required
//               />
//             </Col>
//           </Row>

//           <hr />
//           <div className="d-flex justify-content-between align-items-center mb-2">
//             <h5 className="fw-bold">Working Stages</h5>
//             <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
//           </div>

//           {workingStages.map((stage, i) => (
//             <Row key={i} className="g-2 mb-2 align-items-center">
//               <Col sm={5}>
//                 <Form.Control
//                   placeholder="Work"
//                   value={stage.work}
//                   onChange={(e) => updateStage(i, "work", e.target.value)}
//                 />
//               </Col>
//               <Col sm={4}>
//                 <Form.Control
//                   type="number"
//                   placeholder="Amount"
//                   value={stage.amount}
//                   onChange={(e) => updateStage(i, "amount", e.target.value)}
//                 />
//               </Col>
//               <Col sm={3}>
//                 <Button
//                   variant="danger"
//                   onClick={() => removeStage(i)}
//                   disabled={workingStages.length === 1}
//                   className="w-100"
//                 >
//                   Remove
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           <Row className="g-3 mt-3">
//             <Col sm={6}>
//               <Form.Label>Total Credits</Form.Label>
//               <Form.Control value={getTotalCredit()} readOnly />
//             </Col>
//             <Col sm={6}>
//               <Form.Label>Remaining Amount</Form.Label>
//               <Form.Control value={getRemainingAmount()} readOnly />
//             </Col>
//           </Row>

//           <Form.Group className="mt-3 mb-4">
//             <Form.Label>Description</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={2}
//               name="description"
//               value={form.description}
//               onChange={handleFormChange}
//               placeholder="Optional notes"
//             />
//           </Form.Group>

//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
//             <Button type="submit" className="px-4 fw-bold rounded-3" variant="primary">
//               Save Changes
//             </Button>
//             <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={() => router.push("/viewclient-transaction")}>
//               Go Back
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditClientTransaction;
"use client"; // Enables client-side features like useEffect and useRouter

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import Header from "../../components/Header";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

const EditClientTransaction = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id; // Get transaction ID from URL

  // Main form state
  const [form, setForm] = useState({
    clientName: "", // Only used for display
    totalAmount: "",
    tokenAmount: "",
    description: "",
  });

  // Working stages (array of objects)
  const [workingStages, setWorkingStages] = useState([
    { workingStage: "", workingDescription: "" },
  ]);

  // Show created date
  const [clientCreatedAt, setClientCreatedAt] = useState("");

  // Keep track of clientName ID to PATCH properly
  const [clientId, setClientId] = useState("");

  // UI state
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch existing transaction when page loads
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/client-transaction/${id}`);
        const data = await res.json();

        if (res.ok) {
          // ✅ Display client name
          setForm({
            clientName: data.clientName?.clientName || "",
            totalAmount: data.totalAmount || "",
            tokenAmount: data.tokenAmount || "",
            description: data.description || "",
          });

          // ✅ Set relationship ID
          setClientId(data.clientName?.id || "");

          // ✅ Set working stages if available
          setWorkingStages(data.workingStage?.length > 0 ? data.workingStage : [
            { workingStage: "", workingDescription: "" },
          ]);

          setClientCreatedAt(data.clientCreatedAt);
        } else {
          alert("Error loading transaction data.");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load transaction.");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  // ✅ Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle working stage changes
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  const addStage = () => {
    setWorkingStages([...workingStages, { workingStage: "", workingDescription: "" }]);
  };

  const removeStage = (index) => {
    if (workingStages.length > 1) {
      const updated = workingStages.filter((_, i) => i !== index);
      setWorkingStages(updated);
    }
  };

  // ✅ Calculate credit and remaining
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const stages = workingStages.reduce(
      (sum, s) => sum + (parseFloat(s.workingDescription) || 0),
      0
    );
    return token + stages;
  };

  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // ✅ Submit updated transaction to Payload
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = {
      clientName: clientId, // ✅ Send only the client ID (Payload handles relationships)
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      description: form.description,
      workingStage: workingStages,
      clientUpdatedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`/api/client-transaction/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/viewclient-transaction");
      } else {
        const err = await res.json();
        alert(`Error: ${err.message}`);
      }
    } catch (err) {
      console.error("Submission failed", err);
      alert("Could not update transaction.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Show loading spinner while data is loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
        <p className="fw-semibold my-2 ms-2">Loading Please Wait...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4 p-3 p-md-4 bg-light rounded shadow w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4">Edit Client Transaction</h4>

        <Form onSubmit={handleSubmit}>
          {/* Read-only Client Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Client Name</Form.Label>
            <Form.Control value={form.clientName} readOnly />
          </Form.Group>

          {/* Amount Inputs */}
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

          {/* Working Stages */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-bold">Working Stages</h5>
            <Button onClick={addStage} variant="success" size="sm">+ Add Stage</Button>
          </div>

          {workingStages.map((stage, index) => (
            <Row key={index} className="g-2 mb-2 align-items-center">
              <Col sm={6}>
                <Form.Control
                  placeholder="Work"
                  value={stage.workingStage}
                  onChange={(e) => updateStage(index, "workingStage", e.target.value)}
                />
              </Col>
              <Col sm={3}>
                <Form.Control
                  type="number"
                  placeholder="Amount"
                  value={stage.workingDescription}
                  onChange={(e) => updateStage(index, "workingDescription", e.target.value)}
                />
              </Col>
              <Col sm={3}>
                <Button
                  variant="danger"
                  onClick={() => removeStage(index)}
                  className="w-100"
                  disabled={workingStages.length === 1}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Totals */}
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

          {/* Description */}
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

          {/* Buttons */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 flex-wrap align-items-center">
            <Button type="submit" className="px-4 fw-bold rounded-3" variant="primary" disabled={submitting}>
              {submitting ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="secondary" className="px-4 fw-bold rounded-3" onClick={() => router.push("/viewclient-transaction")}>
              Go Back
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditClientTransaction;
