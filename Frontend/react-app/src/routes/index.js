import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from '../Components/Login/Login'
import Signup from '../Components/Signup/Signup'
import React from "react";
import LancerProfile from "../Components/Profile/LancerProfile";
import FreelancerFormModal from "../Components/FreelancerForm/FreelanceFormWrapper";
import TopBar from "../Components/TopBar/TopBar";
import Gig from "../Components/Gig/Gig";
import Home from "../pages/Home/Home";
import Messages from "../Components/Messages/Messages";

function RouteManager() {
  return (
    <div className="bg-main">
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
              <Route path={"/profile"} element={<LancerProfile />} />
              <Route path={"/home"} element={<Home />} />
              <Route
                path={"/profile/messages/:messagerId"}
                element={
                    < Messages/>
                }
              />
            </Routes>
        </Router>
    </div>
  );
}
export default RouteManager;
