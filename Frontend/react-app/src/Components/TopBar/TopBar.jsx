import React, { useEffect,useState } from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import Logo from '../Logo/Logo';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../global_config';
import { setIsSeller } from '../../redux/actions/gighub.actions';
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios';
import FreelancerFormModal from '../FreelancerForm/FreelanceFormWrapper';

const TopBar = ({ username="User" }) => {
    
  const [userName, setUserName] = useState(username);
  const [activePage, setActivePage] = useState('home');
  const [becomeSellerPopUp, setBecomeSellerPopUp] = useState(false);
  const navigate = useNavigate()
  const navigatePage = (page) => {
      setActivePage(page);
      navigate(`/${page}`);
      // Navigate to the specified page using your navigation logic
  };
  const dispatch = useDispatch();
  const isSeller = useSelector((state)=>state.gighubReducer.isSeller)
  const checkIfFreelancer = async()=>{
    try{
        let pId = localStorage.getItem('profile.id');
        pId = JSON.parse(pId);
        let userIsFreelancer=false
        debugger;
        await axios.get(
            `${BASE_URL}/api/freelancers?filter={"where":{"client_id":"${pId}"}}`
        ).then(
            (res)=>{
                if(res.data.length>0){
                    userIsFreelancer = true;}
                else {
                    console.log('hellofalse')
                }
            }
        )
        return userIsFreelancer
    }
    catch (err) {
        console.log(err,"error")
    }

  }
  useEffect(
    ()=>{
        let isSellerTrue = checkIfFreelancer();
        if(isSellerTrue===true)
        dispatch(setIsSeller(true))
        else  dispatch(setIsSeller(false))
    },[]
  )
  const handleClickOnBecomeFreelancer = ()=>{
      let isFreelancerAlready = checkIfFreelancer();
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
            <span className={`inbox-icon`} onClick={() => {}}>
                <MailOutlineIcon /> Inbox
            </span>
            <span className={`home-icon ${activePage === 'home' ? 'active' : ''}`} onClick={() => navigatePage('home')}>
                <HomeOutlinedIcon/> Home
            </span>
            <span className={`bookmarks-icon ${activePage === 'bookmarks' ? 'active' : ''}`} onClick={() => navigatePage('bookmarks')}>
                <BookmarkBorderIcon/> Bookmarks
            </span>
            {!isSeller && <span className={`bookmarks-icon border-1 px-2 py-1 border-primary`}  onClick={() => handleClickOnBecomeFreelancer()}>
               Become a freelancer
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
