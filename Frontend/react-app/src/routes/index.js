import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import Login from '../Components/Login/Login'
import Signup from '../Components/Signup/Signup'
import React, { useContext, useEffect } from "react";
import LancerProfile from "../Components/Profile/LancerProfile";
import FreelancerFormModal from "../Components/FreelancerForm/FreelanceFormWrapper";
import TopBar from "../Components/TopBar/TopBar";
import Gig from "../Components/Gig/Gig";
import Home from "../pages/Home/Home";
import Messages from "../Components/Messages/Messages";
import axios from "axios";
import { BASE_URL } from "../global_config";
import { setRole } from "../redux/actions/gighub.actions";
import { useDispatch } from "react-redux";
import ThirdPartyBio from "../Components/Profile/BioCard/ThirdPartyBio";

function RouteManager() {
  const dispatch = useDispatch();
  useEffect(
    ()=>{

     let id =  localStorage.getItem('profile.id');
      if(id){
        id = JSON.parse(id);
        axios.get(`${BASE_URL}/api/clients?filter={"where":{"id":"${id}"}}`).then(
          (res)=>{
            let client_data = res.data[0];
            localStorage.setItem('client_data',JSON.stringify(client_data));
          }
        )
        axios.get(`${BASE_URL}/api/freelancers?filter={"where":{"client_id":"${id}"}}`).then(
          (res)=>{
            let client_data = res.data[0];
            localStorage.setItem('freelancer_data',JSON.stringify(client_data));
          }
        )
      }
      let tempRole = localStorage.getItem('role');
      if(tempRole){
         dispatch(setRole(JSON.parse(tempRole)))
      }

    },[]
  )


  return (
    <div className="bg-main parent-container">
        <Router>
          {/* <Sidebar /> */}
            <Routes>
              <Route path={"/login"} element={ <Login />} />
              <Route path={"/signup"} element={<Signup />} />
              <Route path={"/profile"} element={<>
                <TopBar/>
                <LancerProfile />
              </>} />
              <Route path={"/home"} element={
                <>
                 <TopBar/>
                 <Home/>
                 </>
              } />
              <Route path={"/bookmarks"} element={
                <>
                 <TopBar/>
                 <Home/>
                 </>
              } />
              <Route path={"/home"} element={<Home />} />
              <Route
                path={"/profile/messages/:messagerId"}
                element={
                    < Messages/>
                }
              />
              <Route
                path={"/details/:gigId"}
                element={
                    <ThirdPartyBio/>
                }
              />
            </Routes>
        </Router>
    </div>
  );
}
export default RouteManager;
