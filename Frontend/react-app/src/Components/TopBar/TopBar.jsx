import React, { useEffect,useState } from 'react';
import './TopBar.css'; // Assuming you have a CSS file for styling
import Logo from '../Logo/Logo';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useNavigate } from 'react-router-dom';
const TopBar = ({ username="User" }) => {
    
  const [userName, setUserName] = useState(username);
  const [activePage, setActivePage] = useState('home');
  const navigate = useNavigate()
  const navigatePage = (page) => {
      setActivePage(page);
      navigate(`/${page}`);
      // Navigate to the specified page using your navigation logic
  };
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
  return (
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
        </div>
    </div>
  );
};

export default TopBar;
