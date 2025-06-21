// pages/add-client-transaction.jsx
// 'use client'; // Enables client-side features like localStorage and router
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation'; // For navigating between pages
// import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'; // UI components from React-Bootstrap
// import Header from '../components/Header'; // Reusable header
// import { TbTransactionRupee, TbPlus } from 'react-icons/tb';
// import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

// const ClientTransaction = () => {
//     const router = useRouter(); // Used to redirect after saving

//     // ⬇️ List of active clients loaded from localStorage
//     const [clients, setClients] = useState([]);

//     // ⬇️ Main form state: keeps track of all form input values
//     const [form, setForm] = useState({
//         client: '',
//         totalAmount: '',
//         tokenAmount: '',
//         description: '',
//     });

//     // ⬇️ Working stages array - can have multiple entries
//     const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

//     // ⬇️ Error message display state
//     const [error, setError] = useState('');

//     // ⬇️ Load clients from localStorage when the page loads
//     useEffect(() => {
//         const storedClientAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
//         const ClientsNames = storedClientAccounts.map((clientaccounts) => clientaccounts.name); // Keep only the name
//         setClients(ClientsNames);
//     }, []);

//     // ⬇️ Called when user types in any input field
//     const handleFormChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//         setError(''); // Clear error while typing
//     };

//     // ⬇️ Update working stage data (either work or amount)
//     const updateStage = (index, field, value) => {
//         const updated = [...workingStages];
//         updated[index][field] = value;
//         setWorkingStages(updated);
//     };

//     // ⬇️ Add a new empty working stage
//     const addStage = () => {
//         setWorkingStages([...workingStages, { work: '', amount: '' }]);
//     };

//     // ⬇️ Remove a stage by index, only if more than one remains
//     const removeStage = (index) => {
//         if (workingStages.length > 1) {
//             setWorkingStages(workingStages.filter((_, i) => i !== index));
//         }
//     };

//     // ⬇️ Calculate total credits = token amount + sum of all stage amounts
//     const getTotalCredit = () => {
//         const token = parseFloat(form.tokenAmount) || 0;
//         const stagesSum = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
//         return token + stagesSum;
//     };

//     // ⬇️ Remaining amount = total - credits
//     const getRemainingAmount = () => {
//         const total = parseFloat(form.totalAmount) || 0;
//         return total - getTotalCredit();
//     };

//     // ⬇️ Get formatted date and time string
//     const getDateTime = () => {
//         const now = new Date();
//         return `${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString('en-IN')}`;
//     };

//     // ⬇️ Reset the form to default empty state
//     const handleReset = () => {
//         setForm({
//             client: '',
//             totalAmount: '',
//             tokenAmount: '',
//             description: '',
//         });
//         setWorkingStages([{ work: '', amount: '' }]);
//         setError('');
//     };

//     // ⬇️ Submit handler to validate and save data to localStorage
//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validate that entered client is in the active client list
//         if (!clients.includes(form.client)) {
//             setError(`Invalid client name: "${form.client}". Please select Acitive Client Name from the list.`);
//             setTimeout(() => handleReset(), 3000); // Reset after showing error
//             return;
//         }

//         // Create new transaction object
//         const newTransaction = {
//             ...form,
//             totalAmount: parseFloat(form.totalAmount) || 0,
//             tokenAmount: parseFloat(form.tokenAmount) || 0,
//             totalCredits: getTotalCredit(),
//             remainingAmount: getRemainingAmount(),
//             transactioncreated: getDateTime(),
//             workingStages,
//         };

//         // Save transaction to localStorage
//         const prev = JSON.parse(localStorage.getItem('transactions') || '[]');
//         prev.push(newTransaction);
//         localStorage.setItem('transactions', JSON.stringify(prev));
//         router.push('/dashboard');
//     };

//     return (
//         <>
//             <Header />
//             {/* Main Container */}
//             <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
//                 {/* Page Heading */}
//                 <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
//                     <TbTransactionRupee className="fs-1 mb-1" /> Add Client Transaction
//                 </h4>

//                 {/* Show alert if no active clients found */}
//                 {!clients.length && (
//                     <Alert variant="danger" className="text-center fw-semibold">
//                         <FaExclamationTriangle className="me-2" />
//                         No active client accounts found. Please add one first.
//                     </Alert>
//                 )}

//                 {/* Show error if invalid client is selected */}
//                 {error && (
//                     <Alert variant="danger" className="text-center fw-semibold">
//                         <FaExclamationTriangle className="me-2" /> {error}
//                     </Alert>
//                 )}

//                 {/* Transaction Form Starts */}
//                 <Form onSubmit={handleSubmit}>
//                     {/* Client Name Input */}
//                     <Form.Group className="mb-3">
//                         <Form.Label className="fw-bold">
//                             Client Name <span className="text-danger">*</span>
//                         </Form.Label>
//                         <Form.Control
//                             list="clients"
//                             name="client"
//                             value={form.client}
//                             onChange={handleFormChange}
//                             placeholder="Select or type client"
//                             disabled={!clients.length}
//                             required
//                         />
//                         <datalist id="clients">
//                             {clients.map((name, idx) => (
//                                 <option key={idx} value={name} />
//                             ))}
//                         </datalist>
//                     </Form.Group>

//                     {/* Amount Section */}
//                     <Row className="mb-3">
//                         <Col sm={6}>
//                             <Form.Label className="fw-bold">
//                                 Total Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
//                                 <span className="text-danger ms-1">*</span>
//                             </Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="totalAmount"
//                                 value={form.totalAmount}
//                                 onChange={handleFormChange}
//                                 required
//                             />
//                         </Col>

//                         <Col sm={6}>
//                             <Form.Label className="fw-bold">
//                                 Token Amount <FontAwesomeIcon icon={faIndianRupeeSign} />
//                                 <span className="text-danger ms-1">*</span>
//                             </Form.Label>
//                             <Form.Control
//                                 type="number"
//                                 name="tokenAmount"
//                                 value={form.tokenAmount}
//                                 onChange={handleFormChange}
//                                 required
//                             />
//                         </Col>
//                     </Row>

//                     {/* Working Stages Header + Add Button */}
//                     <hr />
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                         <h5 className="fw-bold text-dark">
//                             <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
//                             Working Stages
//                         </h5>
//                         <Button variant="warning" onClick={addStage}>
//                             <TbPlus className="me-1" /> Add Stage
//                         </Button>
//                     </div>

//                     {/* Render each working stage input group */}
//                     {workingStages.map((stage, index) => (
//                         <Row key={index} className="mb-2">
//                             <Col sm={5} className="pb-3 pb-md-0">
//                                 <Form.Control
//                                     placeholder="Work Description"
//                                     value={stage.work}
//                                     onChange={(e) => updateStage(index, 'work', e.target.value)}
//                                 />
//                             </Col>
//                             <Col sm={4} className="pb-3 pb-md-0">
//                                 <Form.Control
//                                     type="number"
//                                     placeholder="₹ Amount"
//                                     value={stage.amount}
//                                     onChange={(e) => updateStage(index, 'amount', e.target.value)}
//                                 />
//                             </Col>
//                             <Col sm={3} className="pb-3 pb-md-0">
//                                 <Button
//                                     variant="danger"
//                                     onClick={() => removeStage(index)}
//                                     disabled={workingStages.length === 1}
//                                     className="w-100"
//                                 >
//                                     Remove
//                                 </Button>
//                             </Col>
//                         </Row>
//                     ))}

//                     {/* Total Credit & Remaining Amount */}
//                     <Row className="mt-3">
//                         <Col sm={6}>
//                             <Form.Label className="fw-bold">Total Credits <FontAwesomeIcon icon={faIndianRupeeSign} /></Form.Label>
//                             <Form.Control value={getTotalCredit()} readOnly className="bg-white" />
//                         </Col>
//                         <Col sm={6}>
//                             <Form.Label className="fw-bold">Remaining Amount <FontAwesomeIcon icon={faIndianRupeeSign} /></Form.Label>
//                             <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
//                         </Col>
//                     </Row>

//                     {/* Optional Description */}
//                     <Form.Group className="mt-3 mb-4">
//                         <Form.Label className="fw-bold">Description (Optional)</Form.Label>
//                         <Form.Control
//                             as="textarea"
//                             rows={2}
//                             name="description"
//                             value={form.description}
//                             onChange={handleFormChange}
//                         />
//                     </Form.Group>

//                     {/* Save & Reset Buttons */}
//                     <div className="text-center">
//                         <Button type="submit" variant="success" className="fw-bold px-4 py-2 me-2">
//                             <FaSave className="me-1 fs-5" /> Save Transaction
//                         </Button>
//                         <Button variant="secondary" className="px-4 py-2 fw-bold mt-2 mt-md-0" onClick={handleReset}>
//                             Reset Form
//                         </Button>
//                     </div>
//                 </Form>
//             </Container>
//         </>
//     );
// };
// export default ClientTransaction;

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import { TbTransactionRupee, TbPlus, TbCreditCard, TbTrashFilled } from 'react-icons/tb';
import { FaSave, FaExclamationTriangle, FaUserTie, FaMapMarkerAlt, FaCoins, FaPencilAlt, FaUndo } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';

const AddClientTransaction = () => {
  // State variables
  const [userRole, setUserRole] = useState('admin'); // Mock user role for demo
  const [clients, setClients] = useState([
    { _id: '1', clientName: 'John Doe', query_license: 'LIC001', near_village: 'Village A' },
    { _id: '2', clientName: 'Jane Smith', query_license: 'LIC002', near_village: 'Village B' },
    { _id: '3', clientName: 'Bob Johnson', query_license: 'LIC003', near_village: 'Village C' }
  ]); // Mock clients data
  const [loadingClients, setLoadingClients] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [form, setForm] = useState({
    clientName: '',
    query_license: '',
    near_village: '',
    description: '',
    paymentstatus: 'pending',
  });

  // State for Client's Working Stages only
  const [workingStagesClient, setWorkingStagesClient] = useState([{ work: '', amount: '' }]);

  // Error and success states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock useEffect for authorization (simplified for demo)
  useEffect(() => {
    // Simulate checking user role
    setUserRole('admin');
  }, []);

  // Mock useEffect for fetching clients (simplified for demo)
  useEffect(() => {
    if (userRole === 'admin' || userRole === 'manager') {
      setLoadingClients(false);
    }
  }, [userRole]);

  // Event Handlers
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  // Updates a specific 'Client's Working Stage' field
  const updateStageClient = (index, field, value) => {
    const updated = [...workingStagesClient];
    updated[index][field] = value;
    setWorkingStagesClient(updated);
  };

  // Adds a new empty row for 'Client's Working Stages'
  const addStageClient = () => {
    setWorkingStagesClient([...workingStagesClient, { work: '', amount: '' }]);
  };

  // Removes a specific row from 'Client's Working Stages'
  const removeStageClient = (index) => {
    if (workingStagesClient.length > 1) {
      setWorkingStagesClient(workingStagesClient.filter((_, i) => i !== index));
    }
  };

  // Calculation Functions
  const getTotalAmountClient = () => {
    const workTotalClient = workingStagesClient.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return workTotalClient;
  };

  // Since we removed "Our Working Stages", the remaining amount is just the negative of client total
  const getRemainingAmount = () => {
    return -getTotalAmountClient(); // Negative because client paid without our charges
  };

  // Resets the entire form
  const handleReset = () => {
    setForm({
      clientName: '',
      query_license: '',
      near_village: '',
      description: '',
      paymentstatus: 'pending',
    });
    setWorkingStagesClient([{ work: '', amount: '' }]);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic field presence check
    if (!form.clientName || !form.query_license || !form.near_village) {
      setError("Please fill in all required fields: Client Name, Query License, and Near Village.");
      return;
    }

    // Try to find the client that matches all 3 fields
    const matchedClient = clients.find((client) =>
      (client.clientName === form.clientName || client._id === form.clientName) &&
      (client.query_license === form.query_license || client._id === form.query_license) &&
      (client.near_village === form.near_village || client._id === form.near_village)
    );

    // If no exact match is found, show error
    if (!matchedClient) {
      const clientMatch = clients.some((client) => client.clientName === form.clientName || client._id === form.clientName);
      const licenseMatch = clients.some((client) => client.query_license === form.query_license || client._id === form.query_license);
      const villageMatch = clients.some((client) => client.near_village === form.near_village || client._id === form.near_village);

      if (licenseMatch && villageMatch && !clientMatch) {
        setError("Client Name is incorrect for the selected Query License and Near Village.");
      } else if (clientMatch && licenseMatch && !villageMatch) {
        setError("Near Village is incorrect for the selected Client Name and Query License.");
      } else if (clientMatch && villageMatch && !licenseMatch) {
        setError("Query License is incorrect for the selected Client Name and Near Village.");
      } else if (clientMatch && !licenseMatch && !villageMatch) {
        setError("Both Query License and Near Village are incorrect for the selected Client Name.");
      } else if (!clientMatch && licenseMatch && !villageMatch) {
        setError("Client Name and Near Village are incorrect for the selected Query License.");
      } else if (!clientMatch && !licenseMatch && villageMatch) {
        setError("Client Name and Query License are incorrect for the selected Near Village.");
      } else {
        setError("The provided Client Name, Query License, and Near Village do not match any known client.");
      }
      setTimeout(() => handleReset(), 5000);
      return;
    }

    // Prepare payload
    setSubmitting(true);

    const payload = {
      clientName: matchedClient.clientName,
      query_license: matchedClient.query_license,
      near_village: matchedClient.near_village,
      totalAmount: 0, // No "Our Working Stages", so total is 0
      totalAmountclient: getTotalAmountClient(),
      remainingAmount: getRemainingAmount(),
      workingStage: [], // Empty array since we removed "Our Working Stages"
      workingStageclient: workingStagesClient.map((s) => ({
        workingStageclient: s.work,
        workingDescriptionclient: s.amount,
      })),
      description: form.description,
      clientCreatedAt: new Date().toISOString(),
      clientUpdatedAt: new Date().toISOString(),
      paymentstatus: "pending",
    };

    // Mock API call
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccess("Client transaction saved successfully!");
      setTimeout(() => {
        handleReset();
        // In real app: router.push("/viewclient-transaction");
        console.log("Would redirect to view client transactions");
      }, 1000);
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // Conditional rendering
  if (userRole === null) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="fw-semibold mt-2">Checking authorization...</p>
      </div>
    );
  }

  if (userRole !== 'admin' && userRole !== 'manager') {
    return (
      <Container className="mt-5 text-center">
        <Alert variant="danger" className="fw-semibold">
          <FaExclamationTriangle className="me-2" />
          You do not have permission to access this page. Redirecting...
        </Alert>
      </Container>
    );
  }

  return (
    <>
      {/* Main container for the form */}
      <Container className="mt-3 px-3 px-sm-4 px-md-5 py-4 bg-light rounded-4 shadow-sm mx-auto" style={{ maxWidth: '900px' }}>
        {/* Page Title */}
        <h4 className="text-center mb-4 fs-3 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1 me-2" /> Add Client Transaction
        </h4>
        <hr className="mb-4" />

        {/* Loading Clients Spinner */}
        {loadingClients && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Client List...</div>
          </div>
        )}

        {/* No Clients Found Alert */}
        {!loadingClients && clients.length === 0 && (
          <Alert variant="info" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No client accounts found. Please add a client first to create a transaction.
          </Alert>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError('')} className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {/* Success Alert */}
        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess('')} className="text-center fw-semibold">
            {success}
          </Alert>
        )}

        {/* Form */}
        {!loadingClients && clients.length > 0 && (
          <Form onSubmit={handleSubmit}>
            {/* Client Information Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-warning text-dark fw-bold fs-5 d-flex align-items-center">
                <FaUserTie className="me-2" /> Client Details
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Client Name <span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        list="client-options"
                        name="clientName"
                        value={form.clientName}
                        onChange={handleFormChange}
                        placeholder="Select or type Client Name"
                        required
                        className="p-2"
                      />
                      <datalist id="client-options">
                        {clients.map((client) => (
                          <option key={client._id} value={client.clientName} />
                        ))}
                      </datalist>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        <TbCreditCard className="me-1" /> Query License
                        <span className="text-danger ms-1">*</span>
                      </Form.Label>
                      <Form.Control
                        list="query-license-options"
                        name="query_license"
                        value={form.query_license}
                        onChange={handleFormChange}
                        placeholder="Select or type Query License"
                        required
                        className="p-2"
                      />
                      <datalist id="query-license-options">
                        {clients.filter((client) => client.query_license).map((client) => (
                          <option key={client._id} value={client.query_license} />
                        ))}
                      </datalist>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        <FaMapMarkerAlt className="me-1" /> Village
                        <span className="text-danger ms-1">*</span>
                      </Form.Label>
                      <Form.Control
                        list="near-village-options"
                        name="near_village"
                        value={form.near_village}
                        onChange={handleFormChange}
                        placeholder="Select or type Village"
                        required
                        className="p-2"
                      />
                      <datalist id="near-village-options">
                        {clients.filter((client) => client.near_village).map((client) => (
                          <option key={client._id} value={client.near_village} />
                        ))}
                      </datalist>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Client's Working Stages Section */}
            <Card className="mb-4 border-0 shadow-sm">
              <Card.Header className="bg-success text-white fw-bold fs-5 d-flex align-items-center justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faMoneyCheckDollar} className="me-2" /> Client's Stages
                </div>
                <Button
                  variant="light"
                  onClick={addStageClient}
                  className="fw-bold text-dark d-flex align-items-center px-3 py-1 rounded-pill"
                >
                  <TbPlus className="me-1" size={25} /> Add Stage
                </Button>
              </Card.Header>
              <Card.Body>
                {workingStagesClient.map((stage, index) => (
                  <Row key={`client-stage-${index}`} className="mb-3 align-items-center g-2">
                    <Col xs={12} md={6}>
                      <Form.Control
                        placeholder="Client Payment Description (e.g., Advance, Installment)"
                        value={stage.work}
                        onChange={(e) => updateStageClient(index, 'work', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={8} md={4}>
                      <Form.Control
                        type="number"
                        placeholder="₹ Client Paid Amount"
                        value={stage.amount}
                        onChange={(e) => updateStageClient(index, 'amount', e.target.value)}
                        className="p-2"
                      />
                    </Col>
                    <Col xs={4} md={2} className="d-flex justify-content-end">
                      <Button
                        variant="danger"
                        onClick={() => removeStageClient(index)}
                        disabled={workingStagesClient.length === 1}
                        className="w-100 fw-bold d-flex align-items-center justify-content-center"
                      >
                        <TbTrashFilled className="d-none d-md-inline me-1" /> Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
              </Card.Body>
            </Card>

            {/* Transaction Summary Section */}
            <Card className="mb-4 border-0 shadow-sm bg-light">
              <Card.Header className="bg-dark text-white fw-bold fs-5 d-flex align-items-center">
                <FaCoins className="me-2" /> Transaction Summary
              </Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Total Amount (Client Paid) <FontAwesomeIcon icon={faIndianRupeeSign} />
                      </Form.Label>
                      <Form.Control
                        value={getTotalAmountClient().toFixed(2)}
                        readOnly
                        className="bg-white fw-bold p-2 text-success"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold fs-5">
                        Balance <FontAwesomeIcon icon={faIndianRupeeSign} />
                      </Form.Label>
                      <Form.Control
                        value={getRemainingAmount().toFixed(2)}
                        readOnly
                        className="bg-white fw-bold p-2 text-primary"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Optional Description Field */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold fs-5">
                <FaPencilAlt className="me-1" /> Description (Optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Add any additional notes or details about this transaction..."
                className="p-2"
              />
            </Form.Group>

            {/* Submit & Reset Buttons */}
            <div className="text-center mt-5">
              <Button
                type="submit"
                variant="success"
                className="fw-bold px-4 py-2 me-3 rounded-pill d-inline-flex align-items-center justify-content-center"
                disabled={submitting || loadingClients || clients.length === 0}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="me-2 fs-5" /> Save Transaction
                  </>
                )}
              </Button>
              <Button
                variant="secondary"
                className="px-4 py-2 fw-bold rounded-pill d-inline-flex align-items-center justify-content-center"
                onClick={handleReset}
                disabled={submitting}
              >
                <FaUndo className="me-2 fs-5" /> Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default AddClientTransaction;