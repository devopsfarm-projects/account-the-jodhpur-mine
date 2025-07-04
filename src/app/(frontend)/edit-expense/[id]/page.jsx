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

//EditExpense page;
// 'use client'; // Required in Next.js for client-side hooks like useState and useEffect
// import React, { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { Container, Form, Row, Col, InputGroup, Button, Spinner, Alert } from "react-bootstrap";
// import { FaRupeeSign, FaTrash } from "react-icons/fa";
// import Header from "../../components/Header";
// // Helper function to format date/time for display
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   return new Date(dateString).toLocaleDateString('en-IN', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric'
//   });
// };
// const formatTime = (dateString) => {
//   if (!dateString) return "N/A";
//   return new Date(dateString).toLocaleTimeString('en-IN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata',
//   });
// };
// const EditExpense = () => {
//   const router = useRouter();
//   const params = useParams();
//   const id = params.id;

//   // State variables
//   const [expense, setExpense] = useState(null);
//   const [initialBalance, setInitialBalance] = useState("");
//   const [expenseItems, setExpenseItems] = useState([]);
//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState(null); // For displaying errors to the user
//   const [userRole, setUserRole] = useState(null); // To store the user's role

//   // 1. Client-side Role-Based Access Control
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const userData = localStorage.getItem("user");
//       if (!userData) {
//         // No user data found, redirect to login
//         router.push("/api/logout"); // Assuming '/login' is your login page
//         return; // Stop further execution
//       }
//       try {
//         const parsedUser = JSON.parse(userData);
//         const role = parsedUser.role;
//         setUserRole(role);

//         // Only "admin" can access this page
//         if (role !== "admin") {
//           //alert("You do not have permission to access this page.");
//           setTimeout(() => {
//             localStorage.clear()
//             window.location.href = '/api/logout'
//           }, 1500); // Redirect to dashboard or a denied access page
//         } else {
//           // If admin, proceed to fetch data
//           fetchExpense();
//         }
//       } catch (e) {
//         console.error("Failed to parse user data or check role:", e);
//         setTimeout(() => {
//           localStorage.clear()
//           window.location.href = '/api/logout'
//         }, 1500); // Redirect if localStorage data is corrupt
//       }
//     }
//   }, [router, id]); // Depend on router and id

//   // Load expense data from Payload backend
//   const fetchExpense = async () => {
//     setLoading(true);
//     setError(null); // Clear previous errors
//     try {
//       const res = await fetch(`/api/expense/${id}`);
//       if (!res.ok) {
//         // Handle non-2xx responses (e.g., 404 if expense not found, 403 if server-side auth fails)
//         if (res.status === 404) {
//           throw new Error("Expense not found.");
//         } else if (res.status === 403) {
//           throw new Error("You are not authorized to view this expense.");
//         }
//         throw new Error(`Failed to load expense: ${res.statusText}`);
//       }
//       const data = await res.json();
//       setExpense(data);
//       setInitialBalance(data.initialBalanceAmount !== undefined ? data.initialBalanceAmount : "");
//       setExpenseItems(data.addExpenseItems || []);
//     } catch (err) {
//       console.error("Failed to load expense:", err);
//       setError(err.message || "Failed to load expense data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add a new item to the list
//   const addItem = () => {
//     if (description.trim() && amount.trim() !== '') { // Ensure amount is also not empty
//       const parsedAmount = parseFloat(amount);
//       if (isNaN(parsedAmount)) {
//         alert("Please enter a valid number for the amount.");
//         return;
//       }
//       setExpenseItems([...expenseItems, {
//         description: description.trim(),
//         amount: parsedAmount,
//       }]);
//       setDescription('');
//       setAmount('');
//     } else {
//       alert("Please enter both a description and an amount for the item.");
//     }
//   };

//   // Remove an item by its index
//   const removeItem = (index) => {
//     const updatedItems = [...expenseItems];
//     updatedItems.splice(index, 1);
//     setExpenseItems(updatedItems);
//   };

//   // Calculate total and remaining amounts
//   const totalExpense = expenseItems.reduce((sum, item) => sum + (item.amount || 0), 0);
//   // Ensure initialBalance is treated as a number for calculation
//   const remainingAmount = (parseFloat(initialBalance) || 0) - totalExpense;

//   // Save the updated data to Payload CMS
//   const saveChanges = async () => {
//     setSaving(true);
//     setError(null);

//     // Basic validation
//     if (isNaN(parseFloat(initialBalance)) || parseFloat(initialBalance) < 0) {
//       setError("Initial Balance must be a non-negative number.");
//       setSaving(false);
//       return;
//     }
//     if (expenseItems.some(item => isNaN(item.amount) || item.amount < 0)) {
//         setError("All expense item amounts must be non-negative numbers.");
//         setSaving(false);
//         return;
//     }


//     const updatedExpense = {
//       ...expense, // Keep existing fields
//       initialBalanceAmount: parseFloat(initialBalance),
//       addExpenseItems: expenseItems,
//       expenseUpdatedAt: new Date().toISOString(), // Update timestamp
//     };

//     try {
//       const res = await fetch(`/api/expense/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           // Potentially add authorization header if your API requires it
//           // "Authorization": `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify(updatedExpense),
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || "Failed to save changes.");
//       }

//       alert("Expense updated successfully!");
//       router.push("/view-expense"); // Navigate back on success
//     } catch (error) {
//       console.error("Error saving:", error);
//       setError(error.message || "Failed to save. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Show spinner while loading data, but only if an admin role is expected
//   if (loading && userRole === "admin") {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" variant="primary" />
//         <p>Loading expense data...</p>
//       </div>
//     );
//   }

//   // Display error if data couldn't be loaded or user is unauthorized
//   if (error) {
//     return (
//       <>
//         <Header />
//         <Container className="mt-5">
//           <Alert variant="danger">
//             <h4>Error:</h4>
//             <p>{error}</p>
//             <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
//           </Alert>
//         </Container>
//       </>
//     );
//   }

//   // If userRole is determined and not admin, the useEffect above will redirect.
//   // This ensures the content below only renders for admins.
//   if (userRole !== "admin") {
//     return null; // Or a simple "Access Denied" message
//   }

//   return (
//     <>
//       <Header />
//       <Container className="mt-4">
//         <h3 className="text-center mb-4">Edit Expense Details</h3> {/* Clarified title */}
//         <Form>
//           {/* Read-only Expense Information */}
//           <Row className="mb-3 border p-3 rounded bg-light">
//             <Col md={12} className="mb-2">
//               <h5 className="mb-2">Expense Overview:</h5>
//             </Col>
//             <Col md={4}>
//               <Form.Label className="fw-bold">Name of Expense:</Form.Label>
//               <Form.Control type="text" value={expense?.nameOfExpense || 'N/A'} readOnly className="text-capitalize" />
//             </Col>
//             <Col md={4}>
//               <Form.Label className="fw-bold">Created Date:</Form.Label>
//               <Form.Control type="text" value={formatDate(expense?.expenseCreatedAt)} readOnly />
//             </Col>
//             <Col md={4}>
//               <Form.Label className="fw-bold">Created Time:</Form.Label>
//               <Form.Control type="text" value={formatTime(expense?.expenseCreatedAt)} readOnly />
//             </Col>
//             <Col md={12} className="mt-2">
//                 <Form.Label className="fw-bold">Last Updated:</Form.Label>
//                 <Form.Control type="text" value={expense?.expenseUpdatedAt ? `${formatDate(expense.expenseUpdatedAt)} at ${formatTime(expense.expenseUpdatedAt)}` : 'Never'} readOnly />
//             </Col>
//           </Row>

//           {/* Editable Initial Balance */}
//           <Form.Group className="mb-4 mt-4 p-3 border rounded">
//             <Form.Label className="fw-bold fs-5">Current Initial Balance Amount:</Form.Label>
//             <InputGroup>
//               <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//               <Form.Control
//                 type="number"
//                 value={initialBalance}
//                 onChange={(e) => setInitialBalance(e.target.value)}
//                 min="0"
//                 step="0.01" // Allow decimal values for currency
//                 placeholder="Enter initial balance"
//               />
//             </InputGroup>
//             <Form.Text className="text-muted">
//                 This is the total amount available for expenses before individual items are accounted for.
//             </Form.Text>
//           </Form.Group>

//           {/* Add New Expense Item */}
//           <div className="mb-4 p-3 border rounded bg-light">
//             <h5 className="mb-3">Add New Expense Item:</h5>
//             <Row className="mb-3 gx-2 align-items-end">
//               <Col sm={5}>
//                 <Form.Label>Description:</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="e.g., Office Supplies, Travel"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                 />
//               </Col>
//               <Col sm={4}>
//                 <Form.Label>Amount:</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//                   <Form.Control
//                     type="number"
//                     placeholder="e.g., 500.00"
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                     min="0"
//                     step="0.01"
//                   />
//                 </InputGroup>
//               </Col>
//               <Col sm={3}>
//                 <Button onClick={addItem} className="w-100 mt-md-auto mt-2" disabled={!description.trim() || !amount.trim()}>
//                   Add Item
//                 </Button>
//               </Col>
//             </Row>
//           </div>


//           {/* List Existing Expense Items */}
//           <div className="mb-4 p-3 border rounded">
//             <h5 className="mb-3">Existing Expense Items:</h5>
//             {expenseItems.length === 0 ? (
//               <Alert variant="info">No expense items added yet. Use the section above to add some.</Alert>
//             ) : (
//               expenseItems.map((item, index) => (
//                 <Row key={index} className="mb-2 align-items-center py-2 border-bottom">
//                   <Col sm={6}>{item.description}</Col>
//                   <Col sm={3} className="text-end text-sm-start"><FaRupeeSign /> {parseFloat(item.amount || 0).toFixed(2)}</Col>
//                   <Col sm={3} className="text-end">
//                     <Button variant="outline-danger" size="sm" onClick={() => removeItem(index)} title="Remove this item">
//                       <FaTrash /> Remove
//                     </Button>
//                   </Col>
//                 </Row>
//               ))
//             )}
//           </div>


//           <hr />
//           {/* Summary */}
//           <div className="mb-4 p-3 border rounded bg-light">
//             <p className="text-danger fw-bold fs-5">Total Spent: <FaRupeeSign /> {totalExpense.toFixed(2)}</p>
//             <p className={`fw-bold fs-5 ${remainingAmount >= 0 ? 'text-success' : 'text-danger'}`}>
//                 Remaining Balance: <FaRupeeSign /> {remainingAmount.toFixed(2)}
//             </p>
//             {remainingAmount < 0 && (
//                 <Alert variant="warning" className="mt-2">
//                     Warning: Your total expenses exceed the initial balance!
//                 </Alert>
//             )}
//           </div>


//           {/* Error Message Display */}
//           {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

//           {/* Save/Cancel buttons */}
//           <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 mb-5">
//             <Button variant="secondary" onClick={() => router.push("/view-expense")}>Cancel Changes</Button>
//             <Button variant="primary" onClick={saveChanges} disabled={saving}>
//               {saving ? (
//                 <>
//                   <Spinner animation="border" size="sm" className="me-2" />
//                   Saving...
//                 </>
//               ) : (
//                 "Save Changes"
//               )}
//             </Button>
//           </div>
//         </Form>
//       </Container>
//     </>
//   );
// };
// export default EditExpense;


'use client';
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container, Form, Row, Col, InputGroup, Button, Spinner, Alert } from "react-bootstrap";
import { FaPlus, FaTrash, FaRupeeSign } from "react-icons/fa";
import { TbTransactionRupee } from 'react-icons/tb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faSave as faSaveIcon } from '@fortawesome/free-solid-svg-icons';
import Header from "../../components/Header";

// Helper function to format date/time for display
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
const formatTime = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  });
};

const EditExpense = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  // State variables
  const [expense, setExpense] = useState(null);
  const [initialBalance, setInitialBalance] = useState("");
  const [expenseItems, setExpenseItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null); // For displaying errors to the user
  const [userRole, setUserRole] = useState(null); // To store the user's role

  // 1. Client-side Role-Based Access Control
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user");
      if (!userData) {
        // No user data found, redirect to login
        router.push("/api/logout"); // Assuming '/login' is your login page
        return; // Stop further execution
      }
      try {
        const parsedUser = JSON.parse(userData);
        const role = parsedUser.role;
        setUserRole(role);

        // Only "admin" can access this page
        if (role !== "admin") {
          //alert("You do not have permission to access this page.");
          setTimeout(() => {
            localStorage.clear()
            window.location.href = '/api/logout'
          }, 1500); // Redirect to dashboard or a denied access page
        } else {
          // If admin, proceed to fetch data
          fetchExpense();
        }
      } catch (e) {
        console.error("Failed to parse user data or check role:", e);
        setTimeout(() => {
          localStorage.clear()
          window.location.href = '/api/logout'
        }, 1500); // Redirect if localStorage data is corrupt
      }
    }
  }, [router, id]); // Depend on router and id

  // Load expense data from Payload backend
  const fetchExpense = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const res = await fetch(`/api/expense/${id}`);
      if (!res.ok) {
        // Handle non-2xx responses (e.g., 404 if expense not found, 403 if server-side auth fails)
        if (res.status === 404) {
          throw new Error("Expense not found.");
        } else if (res.status === 403) {
          throw new Error("You are not authorized to view this expense.");
        }
        throw new Error(`Failed to load expense: ${res.statusText}`);
      }
      const data = await res.json();
      setExpense(data);
      setInitialBalance(data.initialBalanceAmount !== undefined ? data.initialBalanceAmount : "");
      // Ensure expense items are an array, even if empty or null from backend
      setExpenseItems(data.addExpenseItems && Array.isArray(data.addExpenseItems) ? data.addExpenseItems : []);
    } catch (err) {
      console.error("Failed to load expense:", err);
      setError(err.message || "Failed to load expense data.");
    } finally {
      setLoading(false);
    }
  };

  // Update expense item fields (description or amount)
  const updateExpenseItem = (index, field, value) => {
    const updated = [...expenseItems];
    updated[index][field] = value;
    setExpenseItems(updated);
  };

  // Add a new expense item row
  const addExpenseItem = () => {
    setExpenseItems([...expenseItems, { description: '', amount: '' }]);
  };

  // Remove an expense item by its index
  const removeExpenseItem = (index) => {
    // Prevent removing the last item if you always want at least one
    if (expenseItems.length > 1) {
      setExpenseItems(expenseItems.filter((_, i) => i !== index));
    } else {
      // Optionally, clear the last item's values instead of removing
      setExpenseItems([{ description: '', amount: '' }]);
    }
  };

  // Calculate total and remaining amounts
  const totalExpense = expenseItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  // Ensure initialBalance is treated as a number for calculation
  const remainingAmount = (parseFloat(initialBalance) || 0) - totalExpense;

  // Save the updated data to Payload CMS
  const saveChanges = async () => {
    setSaving(true);
    setError(null);

    // Basic validation
    if (isNaN(parseFloat(initialBalance)) || parseFloat(initialBalance) < 0) {
      setError("Initial Balance must be a non-negative number.");
      setSaving(false);
      return;
    }
    // Validate each expense item's amount and description
    const hasInvalidExpenseItem = expenseItems.some(item =>
      !item.description.trim() || isNaN(parseFloat(item.amount)) || parseFloat(item.amount) < 0
    );

    if (hasInvalidExpenseItem) {
      setError("All expense items must have a description and a non-negative number for the amount.");
      setSaving(false);
      return;
    }

    const updatedExpense = {
      ...expense, // Keep existing fields
      initialBalanceAmount: parseFloat(initialBalance),
      addExpenseItems: expenseItems.map(item => ({
        description: item.description.trim(),
        amount: parseFloat(item.amount),
      })),
      expenseUpdatedAt: new Date().toISOString(), // Update timestamp
    };

    try {
      const res = await fetch(`/api/expense/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Potentially add authorization header if your API requires it
          // "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedExpense),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save changes.");
      }

      //alert("Expense updated successfully!");
      router.push("/view-expense"); // Navigate back on success
    } catch (error) {
      console.error("Error saving:", error);
      setError(error.message || "Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Show spinner while loading data, but only if an admin role is expected
  if (loading && userRole === "admin") {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading expense data...</p>
      </div>
    );
  }

  // Display error if data couldn't be loaded or user is unauthorized
  if (error) {
    return (
      <>
        <Header />
        <Container className="mt-5">
          <Alert variant="danger">
            <h4>Error:</h4>
            <p>{error}</p>
            <Button onClick={() => router.push("/dashboard")}>Go to Dashboard</Button>
          </Alert>
        </Container>
      </>
    );
  }

  // If userRole is determined and not admin, the useEffect above will redirect.
  // This ensures the content below only renders for admins.
  if (userRole !== "admin") {
    return null; // Or a simple "Access Denied" message
  }

  return (
    <>
      <Header />
      <Container className="mt-4 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Edit Expense Details
        </h4>

        {error && <Alert variant="danger" className="text-center fw-semibold">{error}</Alert>}

        <Form>
          {/* Read-only Expense Information */}
          <Row className="mb-3 border p-3 rounded bg-white">
            <Col md={12} className="mb-2">
              <h5 className="mb-2">Expense Overview:</h5>
            </Col>
            <Col md={4}>
              <Form.Label className="fw-bold">Name of Expense:</Form.Label>
              <Form.Control type="text" value={expense?.nameOfExpense || 'N/A'} readOnly className="text-capitalize bg-light" />
            </Col>
            <Col md={4}>
              <Form.Label className="fw-bold">Created Date:</Form.Label>
              <Form.Control type="text" value={formatDate(expense?.expenseCreatedAt)} readOnly className="bg-light" />
            </Col>
            <Col md={4}>
              <Form.Label className="fw-bold">Created Time:</Form.Label>
              <Form.Control type="text" value={formatTime(expense?.expenseCreatedAt)} readOnly className="bg-light" />
            </Col>
            <Col md={12} className="mt-2">
              <Form.Label className="fw-bold">Last Updated:</Form.Label>
              <Form.Control type="text" value={expense?.expenseUpdatedAt ? `${formatDate(expense.expenseUpdatedAt)} at ${formatTime(expense.expenseUpdatedAt)}` : 'Never'} readOnly className="bg-light" />
            </Col>
          </Row>

          {/* Editable Initial Balance */}
          <Form.Group className="mb-4 mt-4 p-3 border rounded bg-white">
            <Form.Label className="fw-bold fs-5">Current Initial Balance Amount:</Form.Label>
            <InputGroup>
              <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
              <Form.Control
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(e.target.value)}
                min="0"
                step="0.01" // Allow decimal values for currency
                placeholder="Enter initial balance"
              />
            </InputGroup>
            <Form.Text className="text-muted">
              This is the total amount available for expenses before individual items are accounted for.
            </Form.Text>
          </Form.Group>

          {/* Expense Items Section - Structured like Working Stages */}
          <div className="d-flex justify-content-between align-items-center my-4">
            <h5 className="fw-bold text-dark fs-5">
              <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
              Expense Items
            </h5>
            <Button
              variant="warning"
              onClick={addExpenseItem}
              className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1"
            >
              <FaPlus className="me-1 fw-bold fs-6" size={30}/> Add Items
            </Button>
          </div>

          {expenseItems.map((item, index) => (
            <Row key={index} className="my-2 align-items-center">
              <Col sm={5} className="pb-3 pb-md-0">
                <Form.Control
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateExpenseItem(index, 'description', e.target.value)}
                />
              </Col>
              <Col sm={4} className="pb-3 pb-md-0">
                <InputGroup>
                  <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="₹ Amount"
                    value={item.amount}
                    onChange={(e) => updateExpenseItem(index, 'amount', e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </InputGroup>
              </Col>
              <Col sm={3} className="pb-3 pb-md-0">
                <Button
                  variant="danger"
                  onClick={() => removeExpenseItem(index)}
                  disabled={expenseItems.length === 1}
                  className="w-75 fw-bold text-white"
                >
                  <FaTrash className="me-1" /> Remove
                </Button>
              </Col>
            </Row>
          ))}

          {/* Financial Summary */}
          <Row className="my-4 border-top pt-3">
            <Col sm={6} className="pb-3 pb-md-0">
              <Form.Label className="fw-bold fs-5">Total Spent (<FaRupeeSign />)</Form.Label>
              <Form.Control
                value={totalExpense.toFixed(2)}
                readOnly
                className={`bg-white fw-bold ${totalExpense < 0 ? 'text-dark' : 'text-danger'}`}
              />
            </Col>
            <Col sm={6} className="pb-3 pb-md-0">
              <Form.Label className="fw-bold fs-5">Remaining Balance (<FaRupeeSign />)</Form.Label>
              <Form.Control
                value={remainingAmount.toFixed(2)}
                readOnly
                className={`bg-white fw-bold ${remainingAmount < 0 ? 'text-danger' : 'text-success'}`}
              />
            </Col>
          </Row>

          {remainingAmount < 0 && (
            <Alert variant="warning" className="mt-2 text-center fw-semibold">
              Warning: Your total expenses exceed the initial balance!
            </Alert>
          )}

          {/* Save/Cancel buttons */}
          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center mt-4 mb-5">
            <Button variant="secondary" onClick={() => router.push("/view-expense")}>Cancel Changes</Button>
            <Button variant="primary" onClick={saveChanges} disabled={saving}>
              {saving ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSaveIcon} className="me-1 fs-5" /> Save Changes
                </>
              )}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default EditExpense;