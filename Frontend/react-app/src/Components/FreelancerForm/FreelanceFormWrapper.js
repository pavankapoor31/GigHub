import React from 'react';
import FreelancerForm from './FreelancerForm';

const FreelancerFormWrapper = () => {
  const handleSubmitForm = (formData) => {
    // Your logic to handle the form data submission
    console.log(formData); // For demonstration purposes
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Freelancer Profile</h1>
      <FreelancerForm onSubmit={handleSubmitForm} />
    </div>
  );
};

export default FreelancerFormWrapper;
