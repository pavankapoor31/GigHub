import React, { useEffect, useState } from 'react';
import { TextField, Checkbox, Button, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Select,FormLabel,
FormHelperText, } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';
import { BASE_URL } from '../../global_config';
import { toast } from 'react-toastify';
import { useSelector,useDispatch } from 'react-redux'
import { setFreelancerData, setFreelancerId, setIsSeller } from '../../redux/actions/gighub.actions';
import { useNavigate } from 'react-router-dom';
const FreelancerForm = ({onClose}) => {
  const [formData, setFormData] = useState({
    location: '',
    bio: '',
    about:'',
    profilePicture: null,
    budget: '',
    experience: '',
    skills: [],
    portfolio:'',
    linkedin:''
  });
  const [base64Image, setBase64Image] = useState('');
  const [skillsList, setSkillsList] = useState(['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java']);
  const [formErrors, setFormErrors] = useState({
    location: false,
    bio: false,
    about: false,
    profilePicture: false,
    budget: false,
    experience: false,
    skills: false,
    portfolio:false,
    linkedIn:false
  });
const navigate = useNavigate();
const dispatch = useDispatch();
  useEffect(
    ()=>{
      axios.get(
        `${BASE_URL}/api/skillsets?filter={"fields":"skill"}`
      ).then(
        (res)=>{
         let tempSkills =  res.data.map((item)=>item.skill);
         tempSkills = Array.from(new Set(tempSkills))
         setSkillsList(tempSkills)
        }
      )
    },[]
  )
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,'freelancerData')
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: value.trim() === '',
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
    const { location, bio, profilePicture, budget, experience, skills,about, linkedin, portfolio} = formData;
    if (location.trim() === '' || bio.trim() === '' || about.trim() === '' || budget.trim() === '' || experience.trim() === '' || skills.length === 0) {
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
      about,
      skills: skills,
      portfolio:{
        "portfolio":portfolio,
        "linkedin":linkedin
      }
    };
    
    let client_id = localStorage.getItem('profile.id');
    if(!client_id){
      toast.error("Error while parsing client information");
    }
    client_id = JSON.parse(client_id)
    axios.get(`${BASE_URL}/api/clients?filter={"where":{"id":"${client_id}"}}`).then(
      (res)=>{
        if(res.data.length>0){
          freelancerData["client_id"] = client_id
          freelancerData["username"] = res.data[0].username
          freelancerData["name"] = res.data[0].name
          freelancerData["email"] = res.data[0].email
          axios.post(`${BASE_URL}/api/freelancers`, freelancerData).then(
            (res)=>{
              if(res.status===200){
                console.log(res.data);
                dispatch(setIsSeller(true));
                dispatch(setFreelancerId(res.data.id))
                localStorage.setItem('freelancerId',JSON.stringify(res.data.id));
                dispatch(setFreelancerData(freelancerData))
                navigate('/profile')
              }
            },[]
          )
          onClose()
        }
      }
    ).finally(
      ()=>{
        onClose();
      }
    )
   
    console.log(freelancerData,'freelancerData'); // You can replace this with your actual function to submit the data
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
          rows={1}
          fullWidth
          value={formData.bio}
          onChange={handleInputChange}
          error={formErrors.bio}
          helperText={formErrors.bio ? 'BIO is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="about"
          label="ABOUT ME"
          variant="outlined"
          multiline
          rows={3}
          fullWidth
          value={formData.about}
          onChange={handleInputChange}
          error={formErrors.about}
          helperText={formErrors.about ? 'BIO is required' : ''}
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
      <Grid container spacing={2} style={{marginLeft:'0.15rem', marginTop:'0.2rem'}}>
      <Grid item xs={8}>
        <TextField
          name="budget"
          label="Budget/hr"
          variant="outlined"
          fullWidth
          type="number" 
          inputProps={{ min: 1 }} 
          value={formData.budget}
          onChange={handleInputChange}
          error={formErrors.budget}
          helperText={formErrors.budget ? 'Budget/hr is required' : ''}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          name="experience"
          label="Experience"
          variant="outlined"
          fullWidth
          type="number" 
          inputProps={{ min: 0 }} 
          value={formData.experience}
          onChange={handleInputChange}
          error={formErrors.experience}
          helperText={formErrors.experience ? 'Experience is required' : ''}
        />
      </Grid>
    </Grid>


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
            error={formErrors.skills}
            helperText={formErrors.skills && 'Select at least one skill'}
          />
        )}
      />
      </Grid>
      
      <Grid item xs={12}> 
      <TextField
        name="linkedin"
        label="LinkedIn Profile"
        variant="outlined"
        fullWidth
        value={formData.linkedin}
        onChange={handleInputChange}
        placeholder="https://www.linkedin.com/in/yourprofile"
        margin="normal"
      />
      <TextField
        name="portfolio"
        label="Portfolio URL"
        variant="outlined"
        fullWidth
        value={formData.portfolio}
        onChange={handleInputChange}
        placeholder="https://www.yourportfolio.com"
        margin="normal"
      />
      </Grid>
      <Grid item xs={12} className='d-flex gap-2'>
        <Button variant="contained" className='bg-danger' onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default FreelancerForm;
