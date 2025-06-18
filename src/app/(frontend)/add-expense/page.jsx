//Add Expense Page
// 'use client'; // Needed for client-side features like localStorage
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, Form, Button, Row, Col, InputGroup, Alert, } from 'react-bootstrap';
// import Header from '../components/Header';
// import { FaRupeeSign, FaTrash } from 'react-icons/fa';

// const AddExpense = () => {
//     const router = useRouter();
//     // Form state
//     const [name, setName] = useState('');
//     const [initialBalance, setInitialBalance] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [expenseItems, setExpenseItems] = useState([]);
//     const [validated, setValidated] = useState(false);
//     const [showAlert, setShowAlert] = useState(false);

//     // Add expense item
//     const handleAddItem = () => {
//         if (description) {
//             setExpenseItems([
//                 ...expenseItems,
//                 { description, amount: parseFloat(amount) || 0 },
//             ]);
//             setDescription('');
//             setAmount('');
//         }
//     };

//     // Remove item
//     const handleRemoveItem = (i) => {
//         setExpenseItems(expenseItems.filter((_, idx) => idx !== i));
//     };

//     // Totals
//     const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
//     const remainingAmount = initialBalance
//         ? parseFloat(initialBalance) - totalExpense
//         : 0;

//     // Get current time
//     const getCurrentDateTime = () => {
//         const now = new Date();
//         return {
//             date: now.toLocaleDateString('en-GB'),
//             time: now.toLocaleTimeString('en-IN'),
//         };
//     };

//     // Handle Save
//     const handleSave = (e) => {
//         e.preventDefault();
//         setValidated(true);

//         if (!name || !initialBalance) {
//             setShowAlert(true);
//             setTimeout(() => handleReset(), 2000);
//             return;
//         }

//         const { date, time } = getCurrentDateTime();
//         const newExpense = {
//             name,
//             initialBalance: parseFloat(initialBalance),
//             expenseItems,
//             totalExpense,
//             remainingAmount,
//             date,
//             time,
//         };

//         const existing = JSON.parse(localStorage.getItem('expenses') || '[]');
//         existing.push(newExpense);
//         localStorage.setItem('expenses', JSON.stringify(existing));

//         setTimeout(() => {
//             setName('');
//             setInitialBalance('');
//             setExpenseItems([]);
//             setValidated(false);
//             setShowAlert(false);
//             router.push('/view-expense');
//         }, 2000);
//     };

//     // Reset
//     const handleReset = () => {
//         setName('');
//         setInitialBalance('');
//         setDescription('');
//         setAmount('');
//         setExpenseItems([]);
//         setValidated(false);
//         setShowAlert(false);
//     };

//     return (
//         <>
//             <Header />

//             <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingBottom: '60px', }} className="d-flex flex-column justify-content-start">
//                 <Container className="mt-5">
//                     <h3 className="text-center mb-4 text-capitalize">Add New Expense</h3>

//                     {showAlert && (
//                         <Alert variant="danger" onClose={() => handleReset()} dismissible>
//                             Please fill all required fields (*)
//                         </Alert>
//                     )}

//                     <Form noValidate validated={validated} onSubmit={handleSave}>
//                         {/* Name */}
//                         <Form.Group controlId="formName" className="mb-3">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Name of Expense <span className="text-danger">*</span>
//                             </Form.Label>
//                             <Form.Control type="text" placeholder="Enter name" value={name} required
//                                 isInvalid={validated && !name} onChange={(e) => setName(e.target.value)} />
//                             <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
//                                 Name of Expense is required
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         {/* Initial Balance */}
//                         <Form.Group controlId="formInitialBalance" className="mb-4">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Initial Balance Amount <span className="text-danger">*</span>
//                             </Form.Label>
//                             <InputGroup>
//                                 <InputGroup.Text>
//                                     <FaRupeeSign />
//                                 </InputGroup.Text>
//                                 <Form.Control type="number" placeholder="Enter balance" value={initialBalance} required isInvalid={validated && !initialBalance}
//                                     onChange={(e) => setInitialBalance(e.target.value)}
//                                 />
//                                 <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
//                                     Initial Balance Amount is required
//                                 </Form.Control.Feedback>
//                             </InputGroup>
//                         </Form.Group>

//                         {/* Add Expense Items */}
//                         <h5 className="mb-3">Add Expense Items (optional)</h5>
//                         <Row className="g-2 mb-3">
//                             <Col xs={12} sm={5}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </Col>
//                             <Col xs={12} sm={4}>
//                                 <InputGroup>
//                                     <InputGroup.Text>
//                                         <FaRupeeSign />
//                                     </InputGroup.Text>
//                                     <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
//                                 </InputGroup>
//                             </Col>
//                             <Col xs={12} sm={3}>
//                                 <Button
//                                     variant="success"
//                                     className="w-75 rounded-4 fs-6 fw-bold"
//                                     onClick={handleAddItem}
//                                 >
//                                     Add Expense Item
//                                 </Button>
//                             </Col>
//                         </Row>

//                         {/* List of Items */}
//                         {expenseItems.map((it, i) => (
//                             <Row className="align-items-center mb-2" key={i}>
//                                 <Col xs={12} sm={5}>{it.description}</Col>
//                                 <Col xs={12} sm={4}>
//                                     <FaRupeeSign /> {it.amount.toFixed(2)}
//                                 </Col>
//                                 <Col xs={12} sm={3}>
//                                     <Button variant="danger" size="sm" className="w-75 rounded-4 fs-5 fw-bold" onClick={() => handleRemoveItem(i)}>
//                                         <FaTrash />
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         ))}

//                         <hr />

//                         {/* Totals */}
//                         <p className="fs-5 fw-bold">
//                             Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}
//                         </p>
//                         <p className="fs-5 fw-bold text-secondary">
//                             Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}
//                         </p>

//                         {/* Form Buttons */}
//                         <Row className="mt-4 g-3 justify-content-center">
//                             <Col xs={12} sm={5}>
//                                 <Button type="button" variant="warning" className="w-50 rounded-4 fs-5 fw-bold" onClick={handleReset}>Reset Expense</Button>
//                             </Col>
//                             <Col xs={12} sm={5}>
//                                 <Button type="submit" variant="primary" className="w-50 rounded-4 fs-5 fw-bold">Save Expense</Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Container>
//             </div>
//         </>
//     );
// };

// export default AddExpense;

// 'use client'; // This enables client-side interactivity like useState in Next.js
// // Importing React and required hooks
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// // Importing Bootstrap UI components
// import { Container, Form, Button, Row, Col, InputGroup, Alert } from 'react-bootstrap';
// // Importing icons
// import { FaRupeeSign, FaTrash } from 'react-icons/fa';
// import { TbTransactionRupee } from 'react-icons/tb';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
// // Importing the shared Header component
// import Header from '../components/Header';

// const AddExpense = () => {
//     const router = useRouter(); // For redirecting to another page

//     // State variables to hold form values
//     const [name, setName] = useState('');
//     const [initialBalance, setInitialBalance] = useState('');
//     const [description, setDescription] = useState('');
//     const [amount, setAmount] = useState('');
//     const [expenseItems, setExpenseItems] = useState([]);

//     // State for form validation and alerts
//     const [validated, setValidated] = useState(false);
//     const [showAlert, setShowAlert] = useState(false);
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     // State to disable form while submitting
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Add an item to the expenseItems array
//     const handleAddItem = () => {
//         if (description.trim()) {
//             setExpenseItems([
//                 ...expenseItems,
//                 {
//                     description,
//                     amount: parseFloat(amount) || 0, // Convert amount to number
//                 }
//             ]);
//             setDescription('');
//             setAmount('');
//         }
//     };

//     // Remove an item from the list by index
//     const handleRemoveItem = (index) => {
//         setExpenseItems(expenseItems.filter((_, i) => i !== index));
//     };

//     // Calculate total and remaining amounts
//     const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);
//     const remainingAmount = initialBalance ? parseFloat(initialBalance) - totalExpense : 0;

//     // Get current ISO date string
//     const getCurrentDate = () => new Date().toISOString();

//     // Save form data to backend
//     const handleSave = async (e) => {
//         e.preventDefault(); // Prevent default form behavior
//         setValidated(true); // Enable validation
//         setIsSubmitting(true); // Disable form

//         // Basic validation: required fields
//         if (!name || !initialBalance) {
//             setShowAlert(true);
//             setIsSubmitting(false); // Re-enable form
//             setTimeout(() =>handleReset(), 3000);
//             return;
//         }

//         // Data to send to backend
//         const ExpenseData = {
//             nameOfExpense: name,
//             initialBalanceAmount: parseFloat(initialBalance),
//             addExpenseItems: expenseItems,
//             expenseCreatedAt: getCurrentDate(),
//             expenseUpdatedAt: getCurrentDate(),
//         };

//         try {
//             const response = await fetch('/api/expense', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(ExpenseData),
//             });

//             // Check for backend errors
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || 'Failed to save expense');
//             }

//             // Show success message
//             setSuccessMessage('Expense saved successfully!');

//             // After 3 seconds: reset form, re-enable fields, redirect
//             setTimeout(() => {
//                 handleReset();
//                 setIsSubmitting(false);
//                 router.push('/view-expense'); // Redirect to view page
//             }, 3000);

//         } catch (error) {
//             setErrorMessage(error.message);
//             setIsSubmitting(false); // Re-enable form if error occurs
//             setTimeout(() => setErrorMessage(''), 3000);
//         }
//     };

//     // Reset all form fields
//     const handleReset = () => {
//         setName('');
//         setInitialBalance('');
//         setDescription('');
//         setAmount('');
//         setExpenseItems([]);
//         setValidated(false);
//         setShowAlert(false);
//         setErrorMessage('');
//         setSuccessMessage('');
//     };

//     return (
//         <>
//             <Header />

//             {/* Main page container with padding and light background */}
//             <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
//                 <Container className="py-5">

//                     {/* Page Title */}
//                     <h3 className="text-center mb-4 text-capitalize fw-bold fs-4 text-danger">
//                         <TbTransactionRupee className="fs-2 mb-1" /> Add New Expense
//                     </h3>

//                     {/* Required field validation alert */}
//                     {showAlert && (
//                         <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
//                             Please fill all required fields (*)
//                         </Alert>
//                     )}

//                     {/* API error alert */}
//                     {errorMessage && (
//                         <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>
//                             {errorMessage}
//                         </Alert>
//                     )}

//                     {/* Success message after form submission */}
//                     {successMessage && (
//                         <Alert variant="success">
//                             {successMessage}
//                         </Alert>
//                     )}

//                     {/* Expense Form */}
//                     <Form noValidate validated={validated} onSubmit={handleSave}>
//                         {/* Name of Expense */}
//                         <Form.Group controlId="formName" className="mb-3">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Name of Expense <span className="text-danger">*</span>
//                             </Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter name"
//                                 value={name}
//                                 required
//                                 disabled={isSubmitting}
//                                 isInvalid={validated && !name}
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                             <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
//                                 Name is required
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         {/* Initial Balance */}
//                         <Form.Group controlId="formInitialBalance" className="mb-4">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Initial Balance Amount <span className="text-danger">*</span>
//                             </Form.Label>
//                             <InputGroup>
//                                 <InputGroup.Text>
//                                     <FaRupeeSign />
//                                 </InputGroup.Text>
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="Enter amount"
//                                     value={initialBalance}
//                                     required
//                                     disabled={isSubmitting}
//                                     isInvalid={validated && !initialBalance}
//                                     onChange={(e) => setInitialBalance(e.target.value)}
//                                 />
//                                 <Form.Control.Feedback type="invalid" className="fs-5 fw-bold">
//                                     Balance is required
//                                 </Form.Control.Feedback>
//                             </InputGroup>
//                         </Form.Group>

//                         {/* Expense Items Section */}
//                         <h5 className="mb-3 fs-5 fw-bold text-capitalize">
//                             <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
//                             Add Expense Items (Optional)
//                         </h5>

//                         <Row className="g-2 mb-3">
//                             <Col xs={12} sm={5}>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Description"
//                                     value={description}
//                                     disabled={isSubmitting}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </Col>
//                             <Col xs={12} sm={4}>
//                                 <InputGroup>
//                                     <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//                                     <Form.Control
//                                         type="number"
//                                         placeholder="Amount"
//                                         value={amount}
//                                         disabled={isSubmitting}
//                                         onChange={(e) => setAmount(e.target.value)}
//                                     />
//                                 </InputGroup>
//                             </Col>
//                             <Col xs={12} sm={3}>
//                                 <Button
//                                     variant="success"
//                                     className="w-100 rounded-4 fw-bold"
//                                     onClick={handleAddItem}
//                                     disabled={isSubmitting}
//                                 >
//                                     Add Expense Item
//                                 </Button>
//                             </Col>
//                         </Row>

//                         {/* List of Added Items */}
//                         {expenseItems.map((item, index) => (
//                             <Row key={index} className="align-items-center mb-2">
//                                 <Col xs={12} sm={5} className="text-center fw-bold">{item.description}</Col>
//                                 <Col xs={12} sm={4} className="text-center fw-bold">
//                                     <FaRupeeSign /> {item.amount.toFixed(2)}
//                                 </Col>
//                                 <Col xs={12} sm={3} className="text-center">
//                                     <Button
//                                         variant="danger"
//                                         size="sm"
//                                         className="w-75 rounded-4"
//                                         onClick={() => handleRemoveItem(index)}
//                                         disabled={isSubmitting}
//                                     >
//                                         <FaTrash /> Remove
//                                     </Button>
//                                 </Col>
//                             </Row>
//                         ))}

//                         {/* Totals */}
//                         <hr />
//                         <p className="fs-5 fw-bold">
//                             Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}
//                         </p>
//                         <p className="fs-5 fw-bold text-secondary">
//                             Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}
//                         </p>

//                         {/* Reset and Submit Buttons */}
//                         <Row className="mt-4 g-3 justify-content-center">
//                             <Col xs={12} sm={5} className="text-center">
//                                 <Button
//                                     type="button"
//                                     variant="warning"
//                                     className="w-50 rounded-4 fs-5 fw-bold"
//                                     onClick={handleReset}
//                                     disabled={isSubmitting}
//                                 >
//                                     Reset
//                                 </Button>
//                             </Col>
//                             <Col xs={12} sm={5} className="text-center">
//                                 <Button
//                                     type="submit"
//                                     variant="primary"
//                                     className="w-50 rounded-4 fs-5 fw-bold"
//                                     disabled={isSubmitting}
//                                 >
//                                     <FontAwesomeIcon icon={faSave} className="me-2" />
//                                     {isSubmitting ? 'Saving...' : 'Save Expense'}
//                                 </Button>
//                             </Col>
//                         </Row>
//                     </Form>
//                 </Container>
//             </div>
//         </>
//     );
// };

// export default AddExpense;

// Add Expense page
'use client'; // This enables client-side interactivity like useState and useEffect in Next.js

// Importing React and required hooks
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js

// Importing Bootstrap UI components
import { Container, Form, Button, Row, Col, InputGroup, Alert, Spinner } from 'react-bootstrap';

// Importing icons
import { FaRupeeSign, FaTrash } from 'react-icons/fa';
import { TbTransactionRupee } from 'react-icons/tb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// Importing the shared Header component
import Header from '../components/Header';

const AddExpense = () => {
    const router = useRouter(); // Initialize the router for programmatic navigation

    // State to hold the current user's role for authorization
    const [userRole, setUserRole] = useState(null);
    // State for loading status while determining user role or fetching data
    const [loading, setLoading] = useState(true);

    // State variables to hold form input values
    const [name, setName] = useState(''); // Name of the expense
    const [initialBalance, setInitialBalance] = useState(''); // Initial amount allocated for this expense
    const [description, setDescription] = useState(''); // Description for an individual expense item
    const [amount, setAmount] = useState(''); // Amount for an individual expense item
    const [expenseItems, setExpenseItems] = useState([]); // Array to store multiple expense items (description + amount)

    // State for form validation and display of messages
    const [validated, setValidated] = useState(false); // Controls Bootstrap's form validation feedback
    const [showAlert, setShowAlert] = useState(false); // Controls visibility of alert for required fields
    const [errorMessage, setErrorMessage] = useState(''); // Stores error messages from API calls
    const [successMessage, setSuccessMessage] = useState(''); // Stores success messages from API calls

    // State to disable form elements during submission to prevent multiple clicks
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Authorization Check on Component Mount ---
    useEffect(() => {
        // Ensure this code runs only in the browser (client-side)
        if (typeof window !== 'undefined') {
            try {
                const userData = localStorage.getItem('user'); // Get user data from localStorage
                if (userData) {
                    const parsedUser = JSON.parse(userData); // Parse the user data
                    setUserRole(parsedUser.role); // Set the user's role
                    // IMPORTANT: Only 'admin' users can access this page
                    if (parsedUser.role !== 'admin') {
                        setTimeout(() => {
                          localStorage.clear()
                          window.location.href = '/api/logout'
                        }, 1500); // Redirect to logout if not an admin
                    } else {
                        setLoading(false); // Stop loading if user is admin
                    }
                } else {
                    setTimeout(() => {
                      localStorage.clear()
                      window.location.href = '/api/logout'
                    }, 1500); // Redirect to logout if no user data found (not logged in)
                }
            } catch (e) {
                console.error("Failed to parse user data from localStorage:", e);
                setTimeout(() => {
                  localStorage.clear()
                  window.location.href = '/api/logout'
                }, 1500); // Redirect to logout on error (e.g., corrupted localStorage data)
            }
        }
    }, [router]); // Dependency array: re-run if router object changes (rarely)

    // --- Helper Functions ---

    // Function to add an item (description and amount) to the expenseItems list
    const handleAddItem = () => {
        // Only add if description is not empty or just whitespace
        if (description.trim()) {
            setExpenseItems([
                ...expenseItems, // Keep existing items
                {
                    description: description.trim(), // Add new item, trim whitespace
                    amount: parseFloat(amount) || 0, // Convert amount to a number, default to 0 if invalid
                }
            ]);
            // Clear input fields after adding
            setDescription('');
            setAmount('');
        }
    };

    // Function to remove an expense item by its index from the list
    const handleRemoveItem = (indexToRemove) => {
        setExpenseItems(expenseItems.filter((_, i) => i !== indexToRemove));
    };

    // Calculate the total amount spent on expense items
    const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);

    // Calculate the remaining balance
    // If initialBalance is not set, remainingAmount is 0
    const remainingAmount = initialBalance ? parseFloat(initialBalance) - totalExpense : 0;

    // Helper function to get the current date and time in ISO format
    const getCurrentDate = () => new Date().toISOString();

    // --- Form Submission Handler ---
    const handleSave = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)
        setValidated(true); // Enable Bootstrap's form validation visuals
        setIsSubmitting(true); // Disable the form to prevent double submissions

        // Perform basic client-side validation for required fields
        if (!name || !initialBalance) {
            setErrorMessage('Please fill all required fields (*).'); // Set an error message
            setShowAlert(true); // Show the alert
            setIsSubmitting(false); // Re-enable the form as submission failed
            // Hide the alert after 3 seconds
            setTimeout(() => {
                setShowAlert(false);
                setErrorMessage('');
            }, 3000);
            return; // Stop the function if validation fails
        }

        // Prepare the data payload to send to the backend API
        const expenseData = {
            nameOfExpense: name,
            initialBalanceAmount: parseFloat(initialBalance), // Ensure it's a number
            addExpenseItems: expenseItems, // Array of sub-expense items
            expenseCreatedAt: getCurrentDate(), // Timestamp for creation
            expenseUpdatedAt: getCurrentDate(), // Timestamp for last update
        };

        try {
            // Send the expense data to your backend API
            const response = await fetch('/api/expense', {
                method: 'POST', // Use POST method to create a new resource
                headers: { 'Content-Type': 'application/json' }, // Tell the server we're sending JSON
                body: JSON.stringify(expenseData), // Convert JavaScript object to JSON string
            });

            // Check if the API response indicates success (status code 2xx)
            if (!response.ok) {
                const errorData = await response.json(); // Parse error details from the response
                throw new Error(errorData.message || 'Failed to save expense. Please try again.');
            }

            // If successful, set a success message
            setSuccessMessage('Expense saved successfully!');

            // After a delay, reset the form and redirect to the view page
            setTimeout(() => {
                handleReset(); // Clear all form fields
                setIsSubmitting(false); // Re-enable the form
                router.push('/view-expense'); // Navigate to the page where all expenses are listed
            }, 3000);

        } catch (error) {
            // Catch any errors during the fetch operation or from the backend response
            console.error("Error saving expense:", error);
            setErrorMessage(error.message); // Display the error message to the user
            setIsSubmitting(false); // Re-enable the form after an error
            // Hide the error message after 3 seconds
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    // --- Form Reset Handler ---
    // Resets all form fields and validation states
    const handleReset = () => {
        setName('');
        setInitialBalance('');
        setDescription('');
        setAmount('');
        setExpenseItems([]);
        setValidated(false); // Reset validation visuals
        setShowAlert(false); // Hide required field alert
        setErrorMessage(''); // Clear API error message
        setSuccessMessage(''); // Clear success message
        setIsSubmitting(false); // Ensure form is enabled
    };

    // --- Conditional Rendering for Authorization and Loading ---
    // Show a loading spinner while user role is being determined
    if (loading || userRole === null) {
        return (
            <>
                <Header />
                <Container fluid className="py-5 text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="mt-2">Verifying your access...</p>
                </Container>
            </>
        );
    }

    // If user is not an admin, they would have been redirected by the useEffect.
    // This return is a fallback, though ideally, it shouldn't be reached by unauthorized users.
    if (userRole !== 'admin') {
        return (
            <>
                <Header />
                <Container fluid className="py-5 text-center">
                    <Alert variant="danger">
                        You do not have permission to access this page. Redirecting...
                    </Alert>
                </Container>
            </>
        );
    }

    // --- Main Component Render (for authorized 'admin' users) ---
    return (
        <>
            <Header /> {/* Renders the navigation header */}

            {/* Main page container with padding and light background */}
            <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <Container className="py-5">

                    {/* Page Title */}
                    <h3 className="text-center mb-4 text-capitalize fw-bold fs-4 text-danger">
                        <TbTransactionRupee className="fs-2 mb-1" /> Add New Expense
                    </h3>

                    {/* Alerts for validation and API responses */}
                    {showAlert && ( // Show alert if showAlert is true (for required fields)
                        <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
                            {errorMessage} {/* Display the validation error message */}
                        </Alert>
                    )}

                    {errorMessage && ( // Show alert if errorMessage is set (for API errors)
                        <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>
                            {errorMessage} {/* Display the API error message */}
                        </Alert>
                    )}

                    {successMessage && ( // Show alert if successMessage is set
                        <Alert variant="success">
                            {successMessage} {/* Display the success message */}
                        </Alert>
                    )}

                    {/* Expense Form */}
                    <Form noValidate validated={validated} onSubmit={handleSave}>
                        {/* Name of Expense Input */}
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label className="fs-5 fw-bold">
                                Name of Expense <span className="text-danger">*</span> {/* Asterisk indicates required */}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name of the expense (e.g., Office Supplies, Marketing Campaign)"
                                value={name}
                                required // HTML5 required attribute
                                disabled={isSubmitting} // Disable during submission
                                isInvalid={validated && !name} // Bootstrap validation feedback
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className="fs-6 fw-bold">
                                Expense name is required.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* Initial Balance Amount Input */}
                        <Form.Group controlId="formInitialBalance" className="mb-4">
                            <Form.Label className="fs-5 fw-bold">
                                Initial Balance Amount <span className="text-danger">*</span>
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text><FaRupeeSign /></InputGroup.Text> {/* Rupee icon */}
                                <Form.Control
                                    type="number" // Input type for numbers
                                    placeholder="Enter the initial budget for this expense"
                                    value={initialBalance}
                                    required
                                    disabled={isSubmitting}
                                    isInvalid={validated && !initialBalance}
                                    onChange={(e) => setInitialBalance(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid" className="fs-6 fw-bold">
                                    Initial balance is required.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        {/* Section to Add Individual Expense Items */}
                        <h5 className="mb-3 fs-5 fw-bold text-capitalize">
                            <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
                            Add Expense Items (Optional)
                        </h5>

                        <Row className="g-2 mb-3 align-items-end">
                            <Col xs={12} sm={5}>
                                <Form.Label className="visually-hidden">Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter item description (e.g., Printer paper, Ad campaign fee)"
                                    value={description}
                                    disabled={isSubmitting}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Col>
                            <Col xs={12} sm={4}>
                                <Form.Label className="visually-hidden">Amount</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount for this item"
                                        value={amount}
                                        disabled={isSubmitting}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </InputGroup>
                            </Col>
                            <Col xs={12} sm={3}>
                                <Button
                                    variant="success"
                                    className="w-100 rounded-4 fw-bold"
                                    onClick={handleAddItem}
                                    disabled={isSubmitting || !description.trim() || !amount} // Disable if no description/amount
                                >
                                    Add Expense Item
                                </Button>
                            </Col>
                        </Row>

                        {/* List of Added Expense Items */}
                        {expenseItems.length > 0 && ( // Only render if there are items
                            <div className="mb-3">
                                <h6 className="fs-5 fw-bold text-muted">Items Added:</h6>
                                {expenseItems.map((item, index) => (
                                    <Row key={index} className="align-items-center mb-2 border-bottom pb-2">
                                        <Col xs={12} sm={5} className="text-center text-sm-start fw-bold text-capitalize">
                                            {item.description}
                                        </Col>
                                        <Col xs={12} sm={4} className="text-center fw-bold">
                                            <FaRupeeSign /> {item.amount.toFixed(2)}
                                        </Col>
                                        <Col xs={12} sm={3} className="text-center">
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                className="w-75 rounded-4"
                                                onClick={() => handleRemoveItem(index)}
                                                disabled={isSubmitting}
                                            >
                                                <FaTrash className="me-1" /> Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                            </div>
                        )}


                        {/* Display Totals (Total Expense and Remaining Amount) */}
                        <hr className="my-4" /> {/* Horizontal line separator */}
                        <p className="fs-5 fw-bold">
                            Total Expense: <FaRupeeSign /> {totalExpense.toFixed(2)}
                        </p>
                        <p className="fs-5 fw-bold text-secondary">
                            Remaining Amount: <FaRupeeSign /> {remainingAmount.toFixed(2)}
                        </p>

                        {/* Reset and Submit Buttons */}
                        <Row className="mt-4 g-3 justify-content-center">
                            <Col xs={12} sm={5} className="text-center">
                                <Button
                                    type="button" // Important: type="button" to prevent accidental form submission
                                    variant="warning"
                                    className="w-50 rounded-4 fs-5 fw-bold"
                                    onClick={handleReset}
                                    disabled={isSubmitting}
                                >
                                    Reset
                                </Button>
                            </Col>
                            <Col xs={12} sm={5} className="text-center">
                                <Button
                                    type="submit" // This button will submit the form
                                    variant="primary"
                                    className="w-50 rounded-4 fs-5 fw-bold"
                                    disabled={isSubmitting} // Disable when submitting
                                >
                                    <FontAwesomeIcon icon={faSave} className="me-2" />
                                    {isSubmitting ? 'Saving...' : 'Save Expense'} {/* Change text during submission */}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        </>
    );
};

export default AddExpense;

