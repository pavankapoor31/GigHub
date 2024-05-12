import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Grid, Autocomplete } from '@mui/material';
import { BASE_URL } from '../../global_config';
import {toast} from 'react-toastify'

const GigForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: [],
    budget: '',
    coverImage: '',
  });
  const [skillsList, setSkillsList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      alert('File size exceeds the limit of 1MB.');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, coverImage: reader.result });
    };
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(formData, 'formData');
      let freelancerId = localStorage.getItem('freelancer_data');
      freelancerId = JSON.parse(freelancerId);

      if(freelancerId){
        formData["freelancer_id"]=freelancerId.id;
      }
      else{
        toast.error("Something went wrong! Please login as freelancer");
        return;
      }
      axios.post(
        `${BASE_URL}/api/gigs`,formData
      )
      // You can replace this with API call or other logic
    } else {
      alert('Please fill out all required fields and meet the minimum requirements.');
    }
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (formData.title.length < 15) {
      errors.title = 'Title must be at least 15 characters long.';
      valid = false;
    }

    if (formData.description.length < 15) {
      errors.description = 'Description must be at least 15 characters long.';
      valid = false;
    }

    if (formData.skills.length === 0) {
      errors.skills = 'Please select at least one skill.';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/skillsets?filter={"fields":"skill"}`).then((res) => {
      let tempSkills = res.data.map((item) => item.skill);
      tempSkills = Array.from(new Set(tempSkills));
      setSkillsList(tempSkills);
    });
  }, []);

  return (
    <Container maxWidth="sm" className='m-0 p-0 pt-2 pb-2'>
      <Typography variant="h4" align="center" gutterBottom>
        Create Gig
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          margin="normal"
          error={!!formErrors.title}
          helperText={formErrors.title}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
          error={!!formErrors.description}
          helperText={formErrors.description}
        />
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="skills-autocomplete"
            options={skillsList}
            value={formData.skills}
            onChange={(event, newValue) => {
              const selectedSkills = newValue.map((option) => option.trim()); // Trim any whitespace
              setFormData({ ...formData, skills: selectedSkills });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Skills"
                error={!!formErrors.skills}
                helperText={formErrors.skills}
              />
            )}
          />
        </Grid>
        <TextField
          fullWidth
          label="Budget per hour"
          name="budget"
          type="number"
          inputProps={{ min: 1 }}
          value={formData.budget}
          onChange={handleChange}
          margin="normal"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="cover-image-input"
        />
        <label htmlFor="cover-image-input">
          <Button variant="outlined" component="span">
            Upload Cover Image (Max 1MB)
          </Button>
        </label>
        {imageFile && <Typography variant="body1">{imageFile.name}</Typography>}
        <div className='mt-2 d-flex gap-2'>
        <Button type="button" variant="contained" className="bg-danger" onClick={()=>{onClose()}}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
        </div>
      </form>
    </Container>
  );
};

export default GigForm;
