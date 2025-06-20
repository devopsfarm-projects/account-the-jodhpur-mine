// Add Expense page
// 'use client'; // This enables client-side interactivity like useState and useEffect in Next.js

// // Importing React and required hooks
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // Hook for navigation in Next.js

// // Importing Bootstrap UI components
// import { Container, Form, Button, Row, Col, InputGroup, Alert, Spinner } from 'react-bootstrap';

// // Importing icons
// import { FaRupeeSign, FaTrash } from 'react-icons/fa';
// import { TbTransactionRupee } from 'react-icons/tb';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// // Importing the shared Header component
// import Header from '../components/Header';

// const AddExpense = () => {
//     const router = useRouter(); // Initialize the router for programmatic navigation

//     // State to hold the current user's role for authorization
//     const [userRole, setUserRole] = useState(null);
//     // State for loading status while determining user role or fetching data
//     const [loading, setLoading] = useState(true);

//     // State variables to hold form input values
//     const [name, setName] = useState(''); // Name of the expense
//     const [initialBalance, setInitialBalance] = useState(''); // Initial amount allocated for this expense
//     const [description, setDescription] = useState(''); // Description for an individual expense item
//     const [amount, setAmount] = useState(''); // Amount for an individual expense item
//     const [expenseItems, setExpenseItems] = useState([]); // Array to store multiple expense items (description + amount)

//     // State for form validation and display of messages
//     const [validated, setValidated] = useState(false); // Controls Bootstrap's form validation feedback
//     const [showAlert, setShowAlert] = useState(false); // Controls visibility of alert for required fields
//     const [errorMessage, setErrorMessage] = useState(''); // Stores error messages from API calls
//     const [successMessage, setSuccessMessage] = useState(''); // Stores success messages from API calls

//     // State to disable form elements during submission to prevent multiple clicks
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // --- Authorization Check on Component Mount ---
//     useEffect(() => {
//         // Ensure this code runs only in the browser (client-side)
//         if (typeof window !== 'undefined') {
//             try {
//                 const userData = localStorage.getItem('user'); // Get user data from localStorage
//                 if (userData) {
//                     const parsedUser = JSON.parse(userData); // Parse the user data
//                     setUserRole(parsedUser.role); // Set the user's role
//                     // IMPORTANT: Only 'admin' users can access this page
//                     if (parsedUser.role !== 'admin') {
//                         setTimeout(() => {
//                           localStorage.clear()
//                           window.location.href = '/api/logout'
//                         }, 1500); // Redirect to logout if not an admin
//                     } else {
//                         setLoading(false); // Stop loading if user is admin
//                     }
//                 } else {
//                     setTimeout(() => {
//                       localStorage.clear()
//                       window.location.href = '/api/logout'
//                     }, 1500); // Redirect to logout if no user data found (not logged in)
//                 }
//             } catch (e) {
//                 console.error("Failed to parse user data from localStorage:", e);
//                 setTimeout(() => {
//                   localStorage.clear()
//                   window.location.href = '/api/logout'
//                 }, 1500); // Redirect to logout on error (e.g., corrupted localStorage data)
//             }
//         }
//     }, [router]); // Dependency array: re-run if router object changes (rarely)

//     // --- Helper Functions ---

//     // Function to add an item (description and amount) to the expenseItems list
//     const handleAddItem = () => {
//         // Only add if description is not empty or just whitespace
//         if (description.trim()) {
//             setExpenseItems([
//                 ...expenseItems, // Keep existing items
//                 {
//                     description: description.trim(), // Add new item, trim whitespace
//                     amount: parseFloat(amount) || 0, // Convert amount to a number, default to 0 if invalid
//                 }
//             ]);
//             // Clear input fields after adding
//             setDescription('');
//             setAmount('');
//         }
//     };

//     // Function to remove an expense item by its index from the list
//     const handleRemoveItem = (indexToRemove) => {
//         setExpenseItems(expenseItems.filter((_, i) => i !== indexToRemove));
//     };

//     // Calculate the total amount spent on expense items
//     const totalExpense = expenseItems.reduce((sum, item) => sum + item.amount, 0);

//     // Calculate the remaining balance
//     // If initialBalance is not set, remainingAmount is 0
//     const remainingAmount = initialBalance ? parseFloat(initialBalance) - totalExpense : 0;

//     // Helper function to get the current date and time in ISO format
//     const getCurrentDate = () => new Date().toISOString();

//     // --- Form Submission Handler ---
//     const handleSave = async (e) => {
//         e.preventDefault(); // Prevent the default form submission behavior (page reload)
//         setValidated(true); // Enable Bootstrap's form validation visuals
//         setIsSubmitting(true); // Disable the form to prevent double submissions

//         // Perform basic client-side validation for required fields
//         if (!name || !initialBalance) {
//             setErrorMessage('Please fill all required fields (*).'); // Set an error message
//             setShowAlert(true); // Show the alert
//             setIsSubmitting(false); // Re-enable the form as submission failed
//             // Hide the alert after 3 seconds
//             setTimeout(() => {
//                 setShowAlert(false);
//                 setErrorMessage('');
//             }, 3000);
//             return; // Stop the function if validation fails
//         }

//         // Prepare the data payload to send to the backend API
//         const expenseData = {
//             nameOfExpense: name,
//             initialBalanceAmount: parseFloat(initialBalance), // Ensure it's a number
//             addExpenseItems: expenseItems, // Array of sub-expense items
//             expenseCreatedAt: getCurrentDate(), // Timestamp for creation
//             expenseUpdatedAt: getCurrentDate(), // Timestamp for last update
//         };

//         try {
//             // Send the expense data to your backend API
//             const response = await fetch('/api/expense', {
//                 method: 'POST', // Use POST method to create a new resource
//                 headers: { 'Content-Type': 'application/json' }, // Tell the server we're sending JSON
//                 body: JSON.stringify(expenseData), // Convert JavaScript object to JSON string
//             });

//             // Check if the API response indicates success (status code 2xx)
//             if (!response.ok) {
//                 const errorData = await response.json(); // Parse error details from the response
//                 throw new Error(errorData.message || 'Failed to save expense. Please try again.');
//             }

//             // If successful, set a success message
//             setSuccessMessage('Expense saved successfully!');

//             // After a delay, reset the form and redirect to the view page
//             setTimeout(() => {
//                 handleReset(); // Clear all form fields
//                 setIsSubmitting(false); // Re-enable the form
//                 router.push('/view-expense'); // Navigate to the page where all expenses are listed
//             }, 3000);

//         } catch (error) {
//             // Catch any errors during the fetch operation or from the backend response
//             console.error("Error saving expense:", error);
//             setErrorMessage(error.message); // Display the error message to the user
//             setIsSubmitting(false); // Re-enable the form after an error
//             // Hide the error message after 3 seconds
//             setTimeout(() => setErrorMessage(''), 3000);
//         }
//     };

//     // --- Form Reset Handler ---
//     // Resets all form fields and validation states
//     const handleReset = () => {
//         setName('');
//         setInitialBalance('');
//         setDescription('');
//         setAmount('');
//         setExpenseItems([]);
//         setValidated(false); // Reset validation visuals
//         setShowAlert(false); // Hide required field alert
//         setErrorMessage(''); // Clear API error message
//         setSuccessMessage(''); // Clear success message
//         setIsSubmitting(false); // Ensure form is enabled
//     };

//     // --- Conditional Rendering for Authorization and Loading ---
//     // Show a loading spinner while user role is being determined
//     if (loading || userRole === null) {
//         return (
//             <>
//                 <Header />
//                 <Container fluid className="py-5 text-center">
//                     <Spinner animation="border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </Spinner>
//                     <p className="mt-2">Verifying your access...</p>
//                 </Container>
//             </>
//         );
//     }

//     // If user is not an admin, they would have been redirected by the useEffect.
//     // This return is a fallback, though ideally, it shouldn't be reached by unauthorized users.
//     if (userRole !== 'admin') {
//         return (
//             <>
//                 <Header />
//                 <Container fluid className="py-5 text-center">
//                     <Alert variant="danger">
//                         You do not have permission to access this page. Redirecting...
//                     </Alert>
//                 </Container>
//             </>
//         );
//     }

//     // --- Main Component Render (for authorized 'admin' users) ---
//     return (
//         <>
//             <Header /> {/* Renders the navigation header */}

//             {/* Main page container with padding and light background */}
//             <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
//                 <Container className="py-5">

//                     {/* Page Title */}
//                     <h3 className="text-center mb-4 text-capitalize fw-bold fs-4 text-danger">
//                         <TbTransactionRupee className="fs-2 mb-1" /> Add New Expense
//                     </h3>

//                     {/* Alerts for validation and API responses */}
//                     {showAlert && ( // Show alert if showAlert is true (for required fields)
//                         <Alert variant="danger" dismissible onClose={() => setShowAlert(false)}>
//                             {errorMessage} {/* Display the validation error message */}
//                         </Alert>
//                     )}

//                     {errorMessage && ( // Show alert if errorMessage is set (for API errors)
//                         <Alert variant="danger" dismissible onClose={() => setErrorMessage('')}>
//                             {errorMessage} {/* Display the API error message */}
//                         </Alert>
//                     )}

//                     {successMessage && ( // Show alert if successMessage is set
//                         <Alert variant="success">
//                             {successMessage} {/* Display the success message */}
//                         </Alert>
//                     )}

//                     {/* Expense Form */}
//                     <Form noValidate validated={validated} onSubmit={handleSave}>
//                         {/* Name of Expense Input */}
//                         <Form.Group controlId="formName" className="mb-3">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Name of Expense <span className="text-danger">*</span> {/* Asterisk indicates required */}
//                             </Form.Label>
//                             <Form.Control
//                                 type="text"
//                                 placeholder="Enter name of the expense (e.g., Office Supplies, Marketing Campaign)"
//                                 value={name}
//                                 required // HTML5 required attribute
//                                 disabled={isSubmitting} // Disable during submission
//                                 isInvalid={validated && !name} // Bootstrap validation feedback
//                                 onChange={(e) => setName(e.target.value)}
//                             />
//                             <Form.Control.Feedback type="invalid" className="fs-6 fw-bold">
//                                 Expense name is required.
//                             </Form.Control.Feedback>
//                         </Form.Group>

//                         {/* Initial Balance Amount Input */}
//                         <Form.Group controlId="formInitialBalance" className="mb-4">
//                             <Form.Label className="fs-5 fw-bold">
//                                 Initial Balance Amount <span className="text-danger">*</span>
//                             </Form.Label>
//                             <InputGroup>
//                                 <InputGroup.Text><FaRupeeSign /></InputGroup.Text> {/* Rupee icon */}
//                                 <Form.Control
//                                     type="number" // Input type for numbers
//                                     placeholder="Enter the initial budget for this expense"
//                                     value={initialBalance}
//                                     required
//                                     disabled={isSubmitting}
//                                     isInvalid={validated && !initialBalance}
//                                     onChange={(e) => setInitialBalance(e.target.value)}
//                                 />
//                                 <Form.Control.Feedback type="invalid" className="fs-6 fw-bold">
//                                     Initial balance is required.
//                                 </Form.Control.Feedback>
//                             </InputGroup>
//                         </Form.Group>

//                         {/* Section to Add Individual Expense Items */}
//                         <h5 className="mb-3 fs-5 fw-bold text-capitalize">
//                             <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
//                             Add Expense Items (Optional)
//                         </h5>

//                         <Row className="g-2 mb-3 align-items-end">
//                             <Col xs={12} sm={5}>
//                                 <Form.Label className="visually-hidden">Description</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     placeholder="Enter item description (e.g., Printer paper, Ad campaign fee)"
//                                     value={description}
//                                     disabled={isSubmitting}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                 />
//                             </Col>
//                             <Col xs={12} sm={4}>
//                                 <Form.Label className="visually-hidden">Amount</Form.Label>
//                                 <InputGroup>
//                                     <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
//                                     <Form.Control
//                                         type="number"
//                                         placeholder="Enter amount for this item"
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
//                                     disabled={isSubmitting || !description.trim() || !amount} // Disable if no description/amount
//                                 >
//                                     Add Expense Item
//                                 </Button>
//                             </Col>
//                         </Row>

//                         {/* List of Added Expense Items */}
//                         {expenseItems.length > 0 && ( // Only render if there are items
//                             <div className="mb-3">
//                                 <h6 className="fs-5 fw-bold text-muted">Items Added:</h6>
//                                 {expenseItems.map((item, index) => (
//                                     <Row key={index} className="align-items-center mb-2 border-bottom pb-2">
//                                         <Col xs={12} sm={5} className="text-center text-sm-start fw-bold text-capitalize">
//                                             {item.description}
//                                         </Col>
//                                         <Col xs={12} sm={4} className="text-center fw-bold">
//                                             <FaRupeeSign /> {item.amount.toFixed(2)}
//                                         </Col>
//                                         <Col xs={12} sm={3} className="text-center">
//                                             <Button
//                                                 variant="danger"
//                                                 size="sm"
//                                                 className="w-75 rounded-4"
//                                                 onClick={() => handleRemoveItem(index)}
//                                                 disabled={isSubmitting}
//                                             >
//                                                 <FaTrash className="me-1" /> Remove
//                                             </Button>
//                                         </Col>
//                                     </Row>
//                                 ))}
//                             </div>
//                         )}


//                         {/* Display Totals (Total Expense and Remaining Amount) */}
//                         <hr className="my-4" /> {/* Horizontal line separator */}
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
//                                     type="button" // Important: type="button" to prevent accidental form submission
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
//                                     type="submit" // This button will submit the form
//                                     variant="primary"
//                                     className="w-50 rounded-4 fs-5 fw-bold"
//                                     disabled={isSubmitting} // Disable when submitting
//                                 >
//                                     <FontAwesomeIcon icon={faSave} className="me-2" />
//                                     {isSubmitting ? 'Saving...' : 'Save Expense'} {/* Change text during submission */}
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

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Row, Col, Alert, Spinner, InputGroup } from 'react-bootstrap';
import Header from '../components/Header';
import { TbTransactionRupee } from 'react-icons/tb';
import { FaPlus, FaExclamationTriangle, FaTrash, FaRupeeSign } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faScrewdriverWrench, faSave as faSaveIcon } from '@fortawesome/free-solid-svg-icons';

const AddExpense = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '',
    initialBalance: '',

  });

  const [expenseItems, setExpenseItems] = useState([{ description: '', amount: '' }]);

  // Authorization check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUserRole(parsedUser.role);
          if (parsedUser.role !== 'admin') {
            setTimeout(() => {
              localStorage.clear();
              window.location.href = '/api/logout';
            }, 1500);
          } else {
            setLoading(false);
          }
        } else {
          setTimeout(() => {
            localStorage.clear();
            window.location.href = '/api/logout';
          }, 1500);
        }
      } catch (e) {
        console.error("Failed to parse user data:", e);
        setTimeout(() => {
          localStorage.clear();
          window.location.href = '/api/logout';
        }, 1500);
      }
    }
  }, [router]);

  // Update expense item fields
  const updateExpenseItem = (index, field, value) => {
    const updated = [...expenseItems];
    updated[index][field] = value;
    setExpenseItems(updated);
  };

  // Add new expense item
  const addExpenseItem = () => {
    setExpenseItems([...expenseItems, { description: '', amount: '' }]);
  };

  // Remove expense item
  const removeExpenseItem = (index) => {
    if (expenseItems.length > 1) {
      setExpenseItems(expenseItems.filter((_, i) => i !== index));
    }
  };

  // Calculate totals
  const totalExpense = expenseItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const remainingAmount = parseFloat(form.initialBalance || 0) - totalExpense;

  // Reset form
  const handleReset = () => {
    setForm({
      name: '',
      initialBalance: '',
    });
    setExpenseItems([{ description: '', amount: '' }]);
    setError('');
    setSuccess('');
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!form.name || !form.initialBalance) {
      setError('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        nameOfExpense: form.name,
        initialBalanceAmount: parseFloat(form.initialBalance),
        addExpenseItems: expenseItems.map(item => ({
          description: item.description,
          amount: parseFloat(item.amount) || 0,
        })),
        expenseCreatedAt: new Date().toISOString(),
        expenseUpdatedAt: new Date().toISOString(),
      };

      const res = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to save expense');
      }

      setSuccess('Expense saved successfully!');
      setTimeout(() => {
        handleReset();
        router.push('/view-expense');
      }, 2000);
    } catch (err) {
      console.error("Error saving expense:", err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (loading || userRole === null) {
    return (
      <>
        <Header />
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 fw-semibold">Verifying access...</p>
        </Container>
      </>
    );
  }

  // Unauthorized access
  if (userRole !== 'admin') {
    return (
      <>
        <Container className="py-5 text-center">
          <Alert variant="danger" className="fw-semibold">
            <FaExclamationTriangle className="me-2" />
            You don't have permission to access this page
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header />
      <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Add New Expense
        </h4>

        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="text-center fw-semibold">
            {success}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Expense Name */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5">
              Expense Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              placeholder="Enter expense name"
              required
            />
          </Form.Group>

          {/* Initial Balance */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold fs-5">
              Initial Balance <span className="text-danger">*</span>
            </Form.Label>
            <InputGroup>
              <InputGroup.Text><FaRupeeSign /></InputGroup.Text>
              <Form.Control
                type="number"
                name="initialBalance"
                value={form.initialBalance}
                onChange={(e) => setForm({...form, initialBalance: e.target.value})}
                placeholder="Enter initial balance"
                required
                min="0"
              />
            </InputGroup>
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
              className="w-25 fs-5 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1"
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
              <Form.Label className="fw-bold fs-5">Total Expense (<FaRupeeSign />)</Form.Label>
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
                className={`bg-white fw-bold ${remainingAmount < 0 ? 'text-dark' : 'text-success'}`}
              />
            </Col>
          </Row>

          {/* Action Buttons */}
          <div className="text-center">
            <Button 
              type="submit" 
              variant="success" 
              className="fw-bold px-4 py-2 me-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Saving Expense...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSaveIcon} className="me-1 fs-5" /> Save Expense
                </>
              )}
            </Button>
            <Button 
              variant="secondary" 
              className="px-4 py-2 fw-bold" 
              onClick={handleReset}
              disabled={isSubmitting}
            >
              Reset Form
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddExpense;
