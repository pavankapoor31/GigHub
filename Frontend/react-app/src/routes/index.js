import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from '../Components/Login/Login'
import Signup from '../Components/Signup/Signup'
import React from "react";
function RouteManager() {
  return (
    <div className="bg-main">
        <Router>
          {/* <Sidebar /> */}
            <Routes>
              <Route path={"/login"} element={<Login />} />
              <Route path={"/signup"} element={<Signup />} />
            </Routes>
        </Router>
    </div>
  );
}
export default RouteManager;
