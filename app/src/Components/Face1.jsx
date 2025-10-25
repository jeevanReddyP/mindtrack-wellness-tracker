import React from 'react';
import { useNavigate } from "react-router-dom";
import { App_Logo } from '../assets/material';
import Lottie from 'lottie-react'; 
import animationDataString from "../assets/Morphing (1).json?raw";
import Aboutus from './Aboutus';

const Face1 = () => {
  const navigate = useNavigate();

  const gotologin = () => {
    navigate("/login"); // redirects to /about route
  };
const gotosignup = () => {
    navigate("/signup"); // redirects to /about route
  };


   const animationData = JSON.parse(animationDataString);


 return (
  <>
 <div className="min-h-screen flex bg-emerald-50 relative">

    {/* Logo at top-left */}
    <div className="absolute top-0 left-12 mt-4">
      <img src={App_Logo} alt="App Logo" className="w-24 h-auto" />
    </div>

    {/* Left: Animation */}
    <div className="w-1/2 flex justify-center items-center bg-emerald-50">
      <Lottie 
        animationData={animationData} 
        loop={true}                  
        autoplay={true}               
        className="w-96 h-96" 
      />
    </div>

    {/* Right: Login / Signup */}
    <div className="w-1/2 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col items-center text-center">
        <p className="text-lg mb-6">
          Track Less, Live More. Your well-being journey, perfectly on schedule
        </p>

        <div className="flex flex-col gap-4 w-full">
          <button 
            className="w-full py-3 text-white font-semibold rounded-lg bg-[#00baa5] hover:bg-[#00a592] transition"
            onClick={gotologin}
          >
            Get Started
          </button>

          <button 
            className="w-full py-3 text-white font-semibold rounded-lg bg-[#00baa5] hover:bg-[#00a592] transition"
            onClick={gotosignup}
          >
            I Already Have An Account
          </button>
        </div>
      </div>
    </div>
{/* why Should you choose us? */}
<div></div>
  
 
</div>
<div>
  <Aboutus/>
</div>
  </>
);


}

export default Face1