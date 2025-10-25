import React, { useState } from 'react';

const Signup = () => {
  // useState hooks for inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Async signup function
  const signup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Signup successful!");
        // Optionally redirect to login page
        window.location.href = "/login";
      } else {
        alert(data.message || "Signup failed!");
      }

    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong during signup!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-emerald-700 text-center mb-6">
          Create an Account
        </h2>
        
        <form onSubmit={signup} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00baa5]"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00baa5]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00baa5]"
          />

          <button
            type="submit"
            className="w-full text-white py-2 rounded-lg transition duration-300 font-semibold"
            style={{ backgroundColor: '#00baa5' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#00a592')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#00baa5')}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#00baa5] hover:underline font-medium">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
