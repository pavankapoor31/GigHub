// src/components/Login.js
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
// import app from "../../firebase";
import { auth } from "../../server/firebase";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "axios";
import { BASE_URL } from "../../global_config";
import Logo from "../Logo/Logo";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const navigate = useNavigate();
  const handleSignup = async () => {
    if (fullname.trim().length < 2) {
      window.alert("Please enter full name");
      return;
    }
    if (userName.trim().length <= 3) {
      window.alert("Please enter username more than 3 letters");
      return;
    }
    let name = fullname.trim();
    let userNameExists = false;
    await axios.get(
      `${BASE_URL}/api/clients?filter={"where":{"userName":"${userName}"}}`
    ).then(
      (res)=>{
          if(res.data.length>0){
            userNameExists=true;
            toast.error(`Username ${userName} already exists`)
          }
      }
    )
    if(userNameExists){
      return;
    }
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
        //   userCredential.user.updateProfile({
        //     displayName: name
        //   })
          updateProfile(auth.currentUser, { displayName: name })
          toast.success('Sign up successful.', { toastId: 'success', icon: false });
          const user = userCredential.user;
          localStorage.setItem("profile.id", JSON.stringify(user.uid));
          localStorage.setItem("displayName", JSON.stringify(name));
          localStorage.setItem("profile.email", JSON.stringify(user.email));
          localStorage.setItem(
            "stsTokenManager",
            JSON.stringify(user.stsTokenManager)
          );
          const payload = {
            name:fullname,
            email:user.email,
            password:"NA",
            uid:user.uid,
            username:userName
          }
          axios.post(`${BASE_URL}/api/clients`,payload).then(
            (res)=>{
              localStorage.setItem('profile.id',JSON.stringify(res.data.id))
               localStorage.setItem("profile.username", JSON.stringify(res.data.username));

            }
          ).catch(
            (err)=>{
              console.log(err)
              toast.error(err)
            }
          )
          navigate("/home");
          // ...
        })
        .catch((error) => {
         toast.error('Sign up failed '+error, { toastId: 'failure', icon: true });
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("Sign up Failed");
        });
      // User has been logged in successfully
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <>
    <div className="position-absolute">
    <Logo/>
    </div>
    <div className=" content-wrapper d-flex align-center">
      <div className="Auth-form-container card p-4 ml-4">
        <form className="Auth-form">
          <div className="Auth-form-content mt-2">
            <h3 className="Auth-form-title">Sign Up</h3>
            <div className="form-group mt-3">
              <label>Full name</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter full name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value?.trim())}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 w-100 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSignup}
              >
                Sign up
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
            Already registered?<a href="#" onClick={()=>navigate('/login')}> Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
