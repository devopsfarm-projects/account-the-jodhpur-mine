'use client'; // Required for Next.js client-side features like useRouter
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Bootstrap components for layout and form UI
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';

// FontAwesome and React Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FaSave, FaExclamationTriangle } from 'react-icons/fa';
import { TbPlus, TbTransactionRupee } from 'react-icons/tb';
// Reusable site-wide header
import Header from '../components/Header';

const AddVendorTransaction = () => {
  const router = useRouter(); // To navigate between pages programmatically

  // Store all active vendor objects from backend (with _id and name)
  const [vendors, setVendors] = useState([]);
  const [loadingVendors, setLoadingVendors] = useState(true); // To show spinner during loading
  const [submitting, setSubmitting] = useState(false); // To show spinner during save

  // Main form values
  const [form, setForm] = useState({
    vendorName: '', // This will store the vendor's name for the input, but we'll submit the ID
    totalAmount: '',
    tokenAmount: '',
    description: '',
  });

  // UI helper: track work stages
  const [workingStages, setWorkingStages] = useState([{ work: '', amount: '' }]);

  // Error display
  const [error, setError] = useState('');

  // Fetch all vendor accounts from the backend API
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch('/api/vendor'); // Fetch all vendors
        const data = await res.json();
        // Assuming the API returns active vendors or all vendors that can be used.
        // If not, you might need to filter them here.
        setVendors(data?.docs || []);
      } catch (err) {
        console.error('Error in fetching vendors:', err);
        setError('Failed to fetch vendors. Please try again.');
        setVendors([]);
      } finally {
        setLoadingVendors(false); // Hide loading spinner
      }
    };

    fetchVendors();
  }, []);

  // Update form values
  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  // Update a specific working stage by its index
  const updateStage = (index, field, value) => {
    const updated = [...workingStages];
    updated[index][field] = value;
    setWorkingStages(updated);
  };

  // Add a new empty working stage
  const addStage = () => {
    setWorkingStages([...workingStages, { work: '', amount: '' }]);
  };

  // Remove a working stage by its index
  const removeStage = (index) => {
    if (workingStages.length > 1) {
      setWorkingStages(workingStages.filter((_, i) => i !== index));
    }
  };

  // Calculate total credits = token amount + all stage amounts
  const getTotalCredit = () => {
    const token = parseFloat(form.tokenAmount) || 0;
    const workTotal = workingStages.reduce((sum, s) => sum + (parseFloat(s.amount) || 0), 0);
    return token + workTotal;
  };

  // Calculate the remaining amount
  const getRemainingAmount = () => {
    const total = parseFloat(form.totalAmount) || 0;
    return total - getTotalCredit();
  };

  // Reset all form fields to their initial state
  const handleReset = () => {
    setForm({
      vendorName: '',
      totalAmount: '',
      tokenAmount: '',
      description: '',
    });
    setWorkingStages([{ work: '', amount: '' }]);
    setError('');
  };

  // Handle the final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find the selected vendor object to get its ID
    const selectedVendor = vendors.find(
      (vendor) => vendor.vendorName === form.vendorName || vendor._id === form.vendorName
    );

    // If no valid vendor is found, show an error
    if (!selectedVendor) {
      setError(`Invalid vendor selected: "${form.vendorName}"`);
      return;
    }

    // Prepare the payload for the backend API
    const payload = {
      vendorName: selectedVendor.id || selectedVendor._id, // Send the ID for the relationship
      totalAmount: parseFloat(form.totalAmount),
      tokenAmount: parseFloat(form.tokenAmount),
      totalCredit: getTotalCredit(),
      remainingAmount: getRemainingAmount(),
      workingStage: workingStages.map((s) => ({
        workingStage: s.work,
        workingDescription: s.amount,
      })),
      description: form.description,
      vendorCreatedAt: new Date().toISOString(),
      vendorUpdatedAt: new Date().toISOString(),
    };

    try {
      setSubmitting(true); // Show spinner while saving

      // Submit POST request to the backend
      const res = await fetch('/api/vendor-transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/viewvendor-transaction'); // Redirect on success
      } else {
        const result = await res.json();
        console.error(result);
        setError('Save failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    } finally {
      setSubmitting(false); // Hide spinner
    }
  };

  return (
    <>
      <Header />
      <Container className="my-3 p-3 p-sm-4 bg-light rounded-4 shadow-sm w-100 w-md-75 mx-auto">
        <h4 className="text-center mb-4 fs-4 fw-bold text-danger">
          <TbTransactionRupee className="fs-1 mb-1" /> Add Vendor Transaction
        </h4>

        {/* Loading spinner while fetching vendors */}
        {loadingVendors && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <div className="fw-semibold mt-2">Loading Please Wait...</div>
          </div>
        )}

        {/* Alert if no vendors are found */}
        {!loadingVendors && vendors.length === 0 && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" />
            No active vendors found. Please add a Vendor Account first.
          </Alert>
        )}

        {/* Show error if any */}
        {error && (
          <Alert variant="danger" className="text-center fw-semibold">
            <FaExclamationTriangle className="me-2" /> {error}
          </Alert>
        )}

        {/* Form Section - rendered only when not loading and vendors are available */}
        {!loadingVendors && vendors.length > 0 && (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">
                Vendor Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                list="vendor-options"
                name="vendorName"
                value={form.vendorName}
                onChange={handleFormChange}
                placeholder="Select or type Vendor Name"
                required
              />
              <datalist id="vendor-options">
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor.vendorName} />
                ))}
              </datalist>
            </Form.Group>

            {/* Amount Fields */}
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
              <Button variant="warning" onClick={addStage} className="w-25 fs-6 fw-bold text-capitalize text-center justify-content-center align-items-center d-flex gap-1">
                <TbPlus className="me-1 fw-bold fs-5" size={25} /> Add Stage
              </Button>
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
                  <Button variant="danger" onClick={() => removeStage(index)} disabled={workingStages.length === 1} className="w-75 fw-bold text-white">
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}

            {/* Credit Summary */}
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

            {/* Optional Description */}
            <Form.Group className="my-4">
              <Form.Label className="fw-bold fs-5">Description (Optional)</Form.Label>
              <Form.Control as="textarea" rows={2} name="description" value={form.description} onChange={handleFormChange} placeholder="Extra notes or remarks..." />
            </Form.Group>

            {/* Submit & Reset Buttons */}
            <div className="text-center d-flex justify-content-center gap-3 flex-wrap mt-4">
              <Button type="submit" variant="success" disabled={submitting} className="fw-bold px-4 py-2">
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
              <Button type="button" variant="secondary" className="px-4 py-2 fw-bold" onClick={handleReset}>
                Reset Form
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
};

export default AddVendorTransaction;