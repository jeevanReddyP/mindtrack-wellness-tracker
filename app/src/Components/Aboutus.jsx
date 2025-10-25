import React from 'react'
import { image1 } from '../assets/material'
import Whyus from './Whyus'

const Aboutus = () => {
  return (
    <>
     <div className="flex justify-center bg-white py-16"> {/* Removed h-screen to allow content to dictate height, set white background and vertical padding */}
  <div className="flex w-full max-w-7xl px-4"> {/* Max width for content, no explicit shadow/border on this main container */}
    
    {/* Left Column: Text Content */}
    <div className="w-1/2 pr-12 flex flex-col justify-center bg-emerald-50"> {/* Added right padding for spacing from image, flex-col to stack text */}
      
      {/* Main Question */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
Struggling to build consistent habits that actually last?      </h1>

      {/* List of Questions/Challenges */}
      <ul className="space-y-3 text-lg text-gray-700 mb-8">
        <li>❌ Not getting a Chance to get a 1:1 Class Environment to become healthier?</li>
        <li>❌ Do not know how to get World-Class  guidance at Home?</li>
        <li>❌ Want a Personalized Mentor to build good habits?</li>
      </ul>

      {/* Underline (recreated a similar visual cue) */}
      <div className="w-24 h-1 bg-emerald-500 mb-8"></div> {/* A simple underline effect */}

      {/* Call to Action/Intro */}
      <p className="text-xl font-semibold text-gray-800 mb-4">
If your answer is Yes to any of these questions — you’ve finally landed in the Right Place!
Get your Personalized Habit-Building Program, designed to fit your lifestyle and goals, all within a LIVE 1:1 guidance environment.      </p>

      {/* Detailed Program Description */}
      <p className="text-base text-gray-600">
In this 1:1 Habit-Building Mentorship Program, our Expert Coaches will not only help you build strong, consistent habits, but also guide you in time management, self-discipline, and mindset growth — empowering you to become the best version of yourself.</p>
      
    </div>

    {/* Right Column: Image */}
    <div className="w-1/2 flex items-center justify-center bg-emerald-50">
      <img
        src={image1} // Assuming image1 is still the correct source
        alt="Woman learning Spoken English"
        className="max-w-full h-auto rounded-lg shadow-lg" // Added subtle styling to the image
      />
    </div>
    
  </div>
</div>
<div>
  <Whyus/>
</div>
    </>
  )
}

export default Aboutus
