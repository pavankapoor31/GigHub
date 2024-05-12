import React, { useContext, useEffect,useState } from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import Logo from '../Logo/Logo';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import LastChats from '../Last Chats/LastChats';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { Button } from '@mui/material';

import { BASE_URL } from '../../global_config';
import { setIsSeller,setRole } from '../../redux/actions/gighub.actions';
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios';
import FreelancerFormModal from '../FreelancerForm/FreelanceFormWrapper';
import { AuthContext } from '../../server/AuthContext';

const TopBar = ({ username="User" }) => {
    
  const [userName, setUserName] = useState(username);
  const [activePage, setActivePage] = useState('home');
  const [becomeSellerPopUp, setBecomeSellerPopUp] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let profileId = localStorage.getItem('profile.id');
    profileId = JSON.parse(profileId);
    if(!currentUser && !profileId){
      navigate(`/login`);
    }
  },[currentUser])

  const navigatePage = (page) => {
      setActivePage(page);
      navigate(`/${page}`);
      // Navigate to the specified page using your navigation logic
  };
  const dispatch = useDispatch();
  const isSeller = useSelector((state)=>state.gighubReducer.isSeller)
  const role = useSelector((state)=>state.gighubReducer.role)
  const checkIfFreelancer = async()=>{
    try{
        let email = localStorage.getItem('profile.email');
        email = JSON.parse(email);
        let userIsFreelancer=false
        await axios.get(
            `${BASE_URL}/api/freelancers?filter={"where":{"email":"${email}"}}`
        ).then(
            (res)=>{
                if(res.data.length>0){
                    userIsFreelancer = true;
                return true
            }
                else {
                    console.log('hellofalse')
                }
            }
        )
        console.log(userIsFreelancer,'userIsFreelancer')
        return userIsFreelancer
    }
    catch (err) {
        console.log(err,"error")
    }

  }
  async function checkSellerStatus() {
    try {
      const isSellerTrue = await checkIfFreelancer();
      console.log(isSellerTrue, 'isSellerTrue');
      dispatch(setIsSeller(isSellerTrue));
    } catch (error) {
      console.error('Error checking seller status:', error);
      dispatch(setIsSeller(false)); // Assuming false as a default value in case of an error
    }
  }
  useEffect(
    ()=>{
          // Call the function wherever needed
          checkSellerStatus();
    },[]
  )
  const handleClickOnBecomeFreelancer = async ()=>{
      let isFreelancerAlready = await checkIfFreelancer();
      if(isFreelancerAlready===true){
         dispatch(setIsSeller(true))
      }
      else setBecomeSellerPopUp(true)
   
  }
  useEffect(
    ()=>{
        try{

            let LSuserName = localStorage.getItem("displayName");
            LSuserName = JSON.parse(LSuserName);
            LSuserName =  LSuserName.split(' ')[0]
            setUserName(LSuserName)
        }
        catch (err){
            console.log(err,'Topbar displayname')
        }

    },[]
  )
  useEffect(
    ()=>{
        console.log(isSeller,'isSeller')
    },[isSeller]
  )
  const handleSwitchRole = ()=>{
    if(role==="buyer")
    dispatch(setRole("seller"))
    else dispatch(setRole("buyer"))
  }
  return (
    <>
    <div className="topbar">
      <div className="logo"><Logo classes='px-1 py-1'/></div>
      <div className="search-box topbar-search">
        <input type="text" className='border-1 border-black px-1 py-1 border-radius-25' placeholder="Search..." style={{"flex":1}} />
        <SearchIcon style={{"margin-left": "-1.8rem", "background":"black", "color":"white", height:'2rem', width:'1.8rem'}}
            className='border-radius-r-25'
            />
     </div>
     <div className="icons">
            <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                        <div>
                            <Button className={`inbox-icon`} {...bindTrigger(popupState)}>
                                <Typography style={{ textTransform: 'none', color: 'black', display:'flex', alignItems: 'center' }} >
                                    <MailOutlineIcon />
                                    Inbox
                                </Typography>
                            </Button>
                            <Popover
                                {...bindPopover(popupState)}
                                anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                                }}
                                transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                                }}
                            >
                                <div className='new-msg-container'><LastChats /></div> 
                            </Popover>
                        </div>
                    )}
            </PopupState>
            <span className={`home-icon ${activePage === 'home' ? 'active' : ''}`} onClick={() => navigatePage('home')}>
                <HomeOutlinedIcon/> Home
            </span>
            <span className={`bookmarks-icon ${activePage === 'bookmarks' ? 'active' : ''}`} onClick={() => navigatePage('bookmarks')}>
                <BookmarkBorderIcon/> Bookmarks
            </span>
            {!isSeller && <span className={`bookmarks-icon border-1 px-2 py-1 border-primary`}  onClick={() => handleClickOnBecomeFreelancer()}>
               Become a freelancer
            </span>}
                {isSeller && <span className={`bookmarks-icon border-1 px-2 py-1 border-primary`}  onClick={() => handleSwitchRole()}>
               Switch to {role==="buyer"?"seller":"buyer"}
            </span>}
            <div className="welcome-user">Welcome, {userName}!</div>
        </div>
    </div>
    {
        becomeSellerPopUp && <FreelancerFormModal open={becomeSellerPopUp} onClose={()=>setBecomeSellerPopUp(false)}/>
    }

    </>
  );
};

export default TopBar;
