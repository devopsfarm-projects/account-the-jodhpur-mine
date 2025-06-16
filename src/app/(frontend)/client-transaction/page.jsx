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

'use client'; // Needed to use hooks like useRouter in Next.js (client-side code)
// ✅ Import required dependencies
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import Header from '../components/Header';
// ✅ Import icons
import { TbTransactionRupee, TbPlus } from 'react-icons/tb';
import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

const ClientTransaction = () => {
  const router = useRouter(); // For redirection after saving

  // ✅ Store all client objects from backend (with _id and name)
  const [clients, setClients] = useState([]);
  const [loadingClients, setLoadingClients] = useState(true); // Show spinner during loading
  const [submitting, setSubmitting] = useState(false); // Show spinner during save

  // ✅ Main form values
  const [form, setForm] = useState({
    clientName: '', // This will be client _id (not the label)
    totalAmount: '',
    tokenAmount: '',
    description: '',
  });

  // ✅ UI helper: track work stages
  const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

  // ✅ Error display
  const [error, setError] = useState('');

  // ✅ Fetch all client accounts from Payload CMS
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch('/api/client-accounts');
        const data = await res.json();
        setClients(data?.docs || []);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setClients([]);
      } finally {
        setLoadingClients(false); // Hide loading spinner
      }
    };

    fetchClients();
  }, []);

  // ✅ Update form values
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  // ✅ Update stage (by index)
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  const addStage = () => {
    setWorkingStages([...workingStages, { work: '', amount: '' }]);
  };

  const removeStage = (index) => {
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  // ✅ Total credits = token + stage amounts
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return token + workTotal;
  };

  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  const handleReset = () => {
    setForm({
      clientName: '',
      totalAmount: '',
      tokenAmount: '',
      description: '',
    });
    setWorkingStages([{ work: '', amount: '' }]);
    setError('');
  };

  // ✅ Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Find the client ID from the label
    const selectedClient = clients.find(
      (client) => client.clientName === form.clientName || client._id === form.clientName
    );

    // ✅ If no valid match, show error
    if (!selectedClient) {
      setError(`Invalid client selected: "${form.clientName}"`);
      setTimeout(() => handleReset(), 3000);
      return;
    }

    const payload = {
      clientName: selectedClient.id || selectedClient._id, // ✅ Must send ID for relationship
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      workingStage: workingStages.map((s) => ({
        workingStage: s.work,
        workingDescription: s.amount,
      })),
      description: form.description,
      clientCreatedAt: new Date().toISOString(),
      clientUpdatedAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true); // Show spinner while saving
      const res = await fetch('/api/client-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/dashboard'); // Success
      } else {
        const result = await res.json();
        console.error(result);
        setError('Save failed. Try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-3 px-3 px-sm-4 py-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Add Client Transaction
        </h4>

        {/* ✅ Loading spinner */}
        {loadingClients && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Please Wait...</div>
          </div>
        )}

        {/* ✅ Alert if no clients */}
        {!loadingClients && clients.length === 0 && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No client accounts found. Please add one first.
          </Alert>
        )}

        {/* ✅ Show error if any */}
        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {/* ✅ Form Section */}
        {!loadingClients && clients.length > 0 && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
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
              />
              <datalist id="client-options">
                {clients.map((client) => (
                  <option key={client._id} value={client.clientName} />
                ))}
              </datalist>
            </Form.Group>

            {/* ✅ Amount Fields */}
            <Row className="my-4">
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">
                Total Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                <span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control type="number" name="totalAmount" placeholder="₹ Total Amount" value={form.totalAmount} onChange={handleFormChange} required />
              </Col>
              <Col sm={6}>
                <Form.Label className="fw-bold fs-5">
                Token Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)
                <span className="text-danger ms-1">*</span>
                </Form.Label>
                <Form.Control type="number" name="tokenAmount" placeholder="₹ Advance/Token Amount" value={form.tokenAmount} onChange={handleFormChange} required />
              </Col>
            </Row>

            <div className="d-flex justify-content-between align-items-center my-4">
              <h5 className="fw-bold text-dark fs-5">
                <FontAwesomeIcon icon={faScrewdriverWrench} className="me-2" />
                Working Stages
              </h5>
              <Button variant="warning" onClick={addStage} className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1"><TbPlus className="me-1 fw-bold fs-5" size={25}/> Add Stage</Button>
            </div>

            {workingStages.map((stage, index) => (
              <Row key={index} className="my-2">
                <Col sm={5} className="pb-3 pb-md-0">
                  <Form.Control placeholder="Work Description" value={stage.work} onChange={(e) => updateStage(index, 'work', e.target.value)} />
                </Col>
                <Col sm={4} className="pb-3 pb-md-0">
                  <Form.Control type="number" placeholder="₹ Amount" value={stage.amount} onChange={(e) => updateStage(index, 'amount', e.target.value)} />
                </Col>
                <Col sm={3} className="pb-3 pb-md-0">
                  <Button variant="danger" onClick={() => removeStage(index)} disabled={workingStages.length === 1} className="w-75 fw-bold text-white">Remove</Button>
                </Col>
              </Row>
            ))}

            {/* ✅ Credit Summary */}
            <Row className="my-4">
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Total Credits (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control value={getTotalCredit()} readOnly className="bg-white" />
              </Col>
              <Col sm={6} className="pb-3 pb-md-0">
                <Form.Label className="fw-bold fs-5">Remaining Amount (<FontAwesomeIcon icon={faIndianRupeeSign} />)</Form.Label>
                <Form.Control value={getRemainingAmount()} readOnly className="bg-white" />
              </Col>
            </Row>
            {/* ✅ Optional Description */}
            <Form.Group className="my-4">
              <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={handleFormChange} />
            </Form.Group>

            {/* ✅ Submit & Reset Buttons */}
            <div className="text-center">
              <Button type="submit" variant="success" className="fw-bold px-4 py-2 me-2" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving Transaction...
                  </>
                ) : (
                  <>
                    <FaSave className="me-1 fs-5" /> Save Transaction
                  </>
                )}
              </Button>
              <Button variant="secondary" className="px-4 py-2 fw-bold" onClick={handleReset}>
                Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default ClientTransaction;