import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const ADMIN_EMAIL = "admin@example.com";

  const loginWithEmail = async (e, isAdmin = false) => {
    e.preventDefault();
    const loginEmail = isAdmin ? ADMIN_EMAIL : email;
    const loginPassword = isAdmin ? "admin123" : password;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;

      localStorage.setItem("user", JSON.stringify({
        email: user.email,
        uid: user.uid,
        isAdmin: isAdmin
      }));

      alert(isAdmin ? "Admin Login Successful!" : "Login Successful!");
      navigate("/"); // Redirect to home
    } catch (error) {
      alert("Login Failed: " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-zinc-800 via-black to-zinc-900 px-4 sm:px-6 lg:px-8">
      <NavLink to="/">
        <h1 className="text-base sm:text-lg text-white absolute top-4 left-4 cursor-pointer">
          ⬅ Go Back
        </h1>
      </NavLink>

      <div className="bg-zinc-800 w-full max-w-md p-6 sm:p-8 rounded-xl shadow-xl text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Welcome Back 👋</h1>

        <form onSubmit={(e) => loginWithEmail(e)} className="flex flex-col gap-4">
          <input
            className="p-3 rounded-lg text-white bg-zinc-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="p-3 rounded-lg text-white bg-zinc-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            className="bg-green-600 hover:bg-green-700 transition duration-300 text-white p-3 rounded-lg font-semibold"
            type="submit"
          >
            Login
          </button>
         <NavLink to="/admin"><button
            className="bg-green-600 w-96 hover:bg-green-700 transition duration-300 text-white p-3 rounded-lg font-semibold"
            type="submit"
          >
            Login as Admin
          </button></NavLink>
        </form>

        <p className="text-sm mt-4 text-center text-gray-400">
          Don't have an account?{" "}
          <span className="text-green-400 cursor-pointer hover:underline">Sign up</span>
        </p>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p className="mb-1">Guest Login Credentials</p>
          <p>Email: <span className="text-green-300">guest@gmail.com</span></p>
          <p>Password: <span className="text-green-300">123456</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
