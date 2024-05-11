import React, { useState } from 'react';
import { TextField, Checkbox, Button, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select,FormLabel,
  FormHelperText, } from '@mui/material';

const FreelancerForm = () => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    profilePicture: null,
    budget: '',
    experience: '',
    skills: [],
  });
  const [base64Image, setBase64Image] = useState('');
  const [formErrors, setFormErrors] = useState({
    location: false,
    bio: false,
    profilePicture: false,
    budget: false,
    experience: false,
    skills: false,
  });
  const skillsList = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java']; // Sample skills list

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === '',
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedSkills = [...formData.skills];
    if (checked) {
      updatedSkills.push(value);
    } else {
      updatedSkills = updatedSkills.filter((skill) => skill !== value);
    }
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
    setFormErrors({
      ...formErrors,
      skills: updatedSkills.length === 0,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 1048576) { // 1MB
        setFormErrors({
          ...formErrors,
          profilePicture: false,
        });
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setBase64Image(reader.result);
          setFormData({
            ...formData,
            profilePicture: file,
          });
        };
      } else {
        setFormErrors({
          ...formErrors,
          profilePicture: true,
        });
      }
    }
  };

  const handleSubmit = () => {
    // Basic validation
    const { location, bio, profilePicture, budget, experience, skills } = formData;
    if (location.trim() === '' || bio.trim() === '' || !profilePicture || budget.trim() === '' || experience.trim() === '' || skills.length === 0) {
      alert('Please fill in all fields.');
      return;
    }

    // Your function to handle the form data
    const freelancerData = {
      location,
      bio,
      profilePicture: base64Image,
      budget,
      experience,
      skills: skills.join(', '),
    };
    console.log(freelancerData); // You can replace this with your actual function to submit the data
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          name="location"
          label="Location"
          variant="outlined"
          fullWidth
          value={formData.location}
          onChange={handleInputChange}
          error={formErrors.location}
          helperText={formErrors.location ? 'Location is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="bio"
          label="BIO"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={formData.bio}
          onChange={handleInputChange}
          error={formErrors.bio}
          helperText={formErrors.bio ? 'BIO is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        {formErrors.profilePicture && <div style={{ color: 'red' }}>Profile picture size should be less than 1MB</div>}
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="budget"
          label="Budget/hr"
          variant="outlined"
          fullWidth
          value={formData.budget}
          onChange={handleInputChange}
          error={formErrors.budget}
          helperText={formErrors.budget ? 'Budget/hr is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="experience"
          label="Experience"
          variant="outlined"
          fullWidth
          value={formData.experience}
          onChange={handleInputChange}
          error={formErrors.experience}
          helperText={formErrors.experience ? 'Experience is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" error={formErrors.skills}>
          <FormLabel component="legend">Skills</FormLabel>
          <FormGroup>
            {skillsList.map((skill, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={formData.skills.includes(skill)} onChange={handleCheckboxChange} value={skill} />}
                label={skill}
              />
            ))}
          </FormGroup>
          {formErrors.skills && <FormHelperText>Select at least one skill</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default FreelancerForm;
