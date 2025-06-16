//pages edit-expense/[id]
// 'use client';
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Container, Form, Row, Col, InputGroup, Button } from "react-bootstrap";
// import { FaRupeeSign, FaTrash } from "react-icons/fa";
// import Header from "../../components/Header";

// const EditExpense = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;
//   console.log(`Expense ID: ${id}`);
//   const [expense, setExpense] = useState(null);
//   const [initialBalance, setInitialBalance] = useState('');
//   const [expenseItems, setExpenseItems] = useState([]);
//   const [description, setDescription] = useState('');
//   const [amount, setAmount] = useState('');

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
//     if (stored[id]) {
//       const data = stored[id];
//       setExpense(data);
//       setInitialBalance(data.initialBalance);
//       setExpenseItems(data.expenseItems || []);
//     }
//   }, [id]);

//   const addItem = () => {
//     if (description.trim()) {
//       setExpenseItems([...expenseItems, { description: description.trim(), amount: parseFloat(amount) || 0 }]);
//       setDescription('');
//       setAmount('');
//     }
//   };

//   const removeItem = (idx) => {
//     const updated = [...expenseItems];
//     updated.splice(idx, 1);
//     setExpenseItems(updated);
//   };

//   const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
//   const remainingAmount = parseFloat(initialBalance || 0) - totalExpense;

//   const saveChanges = () => {
//     const updated = {
//       ...expense,
//       initialBalance: parseFloat(initialBalance),
//       expenseItems,
//       totalExpense,
//       remainingAmount,
//     };
//     const stored = JSON.parse(localStorage.getItem("expenses") || "[]");
//     stored[id] = updated;
//     localStorage.setItem("expenses", JSON.stringify(stored));
//     router.push("/view-expense");
//   };

//   if (!expense) return <p className="text-center mt-5">Loading expense data...</p>;

//   return (
//     <>
//       <Header />
//       <Container className="mt-4">
//         <h3 className="text-center mb-4">Edit Expense</h3>
//         <Form>
//           <Row className="mb-3">
//             <Col md={4}>
//               <Form.Label>Name</Form.Label>
//               <Form.Control type="text" value={expense.name} readOnly className="text-capitalize" />
//             </Col>
//             <Col md={4}>
//               <Form.Label>Date</Form.Label>
//               <Form.Control type="text" value={expense.date} readOnly />
//             </Col>
//             <Col md={4}>
//               <Form.Label>Time</Form.Label>
//               <Form.Control type="text" value={expense.time} readOnly />
//             </Col>
//           </Row>

//           <Form.Group className="mb-4">
//             <Form.Label>Initial Balance</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//               <Form.Control
//                 type="number"
//                 value={initialBalance}
//                 onChange={(e) => setInitialBalance(e.target.value)}
//                 min="0"
//               />
//             </InputGroup>
//           </Form.Group>

//           {/* Add Items */}
//           <h5 className="mb-3">Expense Items</h5>
//           <Row className="mb-3 gx-2">
//             <Col sm={5}>
//               <Form.Control
//                 type="text"
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </Col>
//             <Col sm={4}>
//               <InputGroup>
//                 <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//                 <Form.Control
//                   type="number"
//                   placeholder="Amount"
//                   value={amount}
//                   onChange={(e) => setAmount(e.target.value)}
//                   min="0"
//                 />
//               </InputGroup>
//             </Col>
//             <Col sm={3}>
//               <Button onClick={addItem} className="w-100" disabled={!description.trim()}>
//                 Add Item
//               </Button>
//             </Col>
//           </Row>

//           {/* List Items */}
//           {expenseItems.length > 0 && expenseItems.map((item, idx) => (
//             <Row key={idx} className="mb-2 align-items-center">
//               <Col sm={5}>{item.description}</Col>
//               <Col sm={4}><FaRupeeSign /> {item.amount.toFixed(2)}</Col>
//               <Col sm={3}>
//                 <Button variant="danger" size="sm" onClick={() => removeItem(idx)}>
//                   <FaTrash />
//                 </Button>
//               </Col>
//             </Row>
//           ))}

//           <hr />
//           <p className="text-danger fw-bold">Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}</p>
//           <p className="text-success fw-bold">Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}</p>

//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
//             <Button variant="secondary" onClick={() => router.push("/view-expense")}>Cancel Changes</Button>
//             <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditExpense;
'use client'; // Required in Next.js for client-side hooks like useState and useEffect

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Row, Col, InputGroup, Button, Spinner } from "react-bootstrap";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import Header from "../../components/Header";

// Helper function to format date/time
const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN');
const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-IN');

const EditExpense = () => {
  const router = useRouter();
  const params = useParams(); // Get ID from URL like /edit-expense/:id
  const id = params.id;
  console.log(`Expense ID: ${id}`);
  // State variables
  const [expense, setExpense] = useState(null); // Entire expense object
  const [initialBalance, setInitialBalance] = useState(""); // Editable balance
  const [expenseItems, setExpenseItems] = useState([]); // Editable items array
  const [description, setDescription] = useState(""); // New item description
  const [amount, setAmount] = useState(""); // New item amount
  const [loading, setLoading] = useState(true); // To show spinner
  const [saving, setSaving] = useState(false); // While saving changes

  // Load expense data from Payload backend
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await fetch(`/api/expense/${id}`);
        const data = await res.json();

        setExpense(data); // Full object
        setInitialBalance(data.initialBalanceAmount);
        setExpenseItems(data.addExpenseItems || []);
      } catch (err) {
        console.error("Failed to load expense:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpense();
  }, [id]);

  // Add a new item to the list
  const addItem = () => {
    if (description.trim()) {
      setExpenseItems([...expenseItems, {
        description: description.trim(),
        amount: parseFloat(amount) || 0,
      }]);
      setDescription('');
      setAmount('');
    }
  };

  // Remove an item by its index
  const removeItem = (index) => {
    const updatedItems = [...expenseItems];
    updatedItems.splice(index, 1);
    setExpenseItems(updatedItems);
  };

  // Calculate total and remaining amounts
  const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingAmount = parseFloat(initialBalance || 0) - totalExpense;

  // Save the updated data to Payload CMS
  const saveChanges = async () => {
    setSaving(true);

    const updatedExpense = {
      ...expense,
      initialBalanceAmount: parseFloat(initialBalance),
      addExpenseItems: expenseItems,
      expenseUpdatedAt: new Date().toISOString(), // auto update updatedAt
    };

    try {
      const res = await fetch(`/api/expense/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!res.ok) {
        throw new Error("Failed to save changes");
      }

      router.push("/view-expense"); // Navigate back on success
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Show spinner while loading data
  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading expense data...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h3 className="text-center mb-4">Edit Expense</h3>
        <Form>
          {/* Show name, date, time (read-only) */}
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={expense.nameOfExpense} readOnly className="text-capitalize" />
            </Col>
            <Col md={4}>
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" value={formatDate(expense.expenseCreatedAt)} readOnly />
            </Col>
            <Col md={4}>
              <Form.Label>Time</Form.Label>
              <Form.Control type="text" value={formatTime(expense.expenseCreatedAt)} readOnly />
            </Col>
          </Row>

          {/* Edit balance */}
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

          {/* Add new expense item */}
          <h5 className="mb-3">Expense Items</h5>
          <Row className="mb-3 gx-2">
            <Col sm={5}>
              <Form.Control
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Col>
            <Col sm={4}>
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
            <Col sm={3}>
              <Button onClick={addItem} className="w-100" disabled={!description.trim()}>
                Add Item
              </Button>
            </Col>
          </Row>

          {/* List all added items */}
          {expenseItems.length > 0 && expenseItems.map((item, index) => (
            <Row key={index} className="mb-2 align-items-center">
              <Col sm={5}>{item.description}</Col>
              <Col sm={4}><FaRupeeSign /> {item.amount.toFixed(2)}</Col>
              <Col sm={3}>
                <Button variant="danger" size="sm" onClick={() => removeItem(index)}>
                  <FaTrash />
                </Button>
              </Col>
            </Row>
          ))}

          <hr />
          <p className="text-danger fw-bold">Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}</p>
          <p className="text-success fw-bold">Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}</p>

          {/* Save/Cancel buttons */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4">
            <Button variant="secondary" onClick={() => router.push("/view-expense")}>Cancel Changes</Button>
            <Button variant="primary" onClick={saveChanges} disabled={saving}>
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditExpense;
