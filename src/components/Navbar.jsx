import React, { useState } from 'react';
import search from "../assets/image1.png";
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Optional icon library

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-900 text-white w-full shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold bg-lime-500 px-3 py-1 rounded-br-3xl rounded-tl-3xl">
          NewsLive
        </NavLink>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center bg-white rounded-xl w-64 px-3 py-1">
          <input className="text-black w-full outline-none" placeholder="Search Latest News..." type="search" />
          <img className="w-6 h-6 ml-2" src={search} alt="search" />
        </div>

        {/* Toggle Button (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg items-center">
          <NavLink to="/" className="hover:text-blue-400">Home</NavLink>
          <NavLink to="/news" className="hover:text-blue-400">News</NavLink>
          <NavLink to="/article" className="hover:text-blue-400">Article</NavLink>
          <NavLink to="/blog" className="hover:text-blue-400">Blog</NavLink>
          <NavLink to="/payout" className="hover:text-blue-400">Payout</NavLink>
          {user ? (
            <>
              <span className="text-sm text-gray-400">Hi, {user.email}</span>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="hover:text-blue-400">Login</NavLink>
          )}
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3 text-lg bg-zinc-800 border-t border-zinc-700">
          <div className="flex items-center bg-white rounded-xl px-3 py-2">
            <input className="text-black w-full outline-none" placeholder="Search..." type="search" />
            <img className="w-6 h-6 ml-2" src={search} alt="search" />
          </div>
          <NavLink to="/" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/news" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>News</NavLink>
          <NavLink to="/article" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Article</NavLink>
          <NavLink to="/blog" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/payout" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Payout</NavLink>
          {user ? (
            <>
              <span className="text-sm text-gray-400">Hi, {user.email}</span>
              <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className="hover:text-blue-400" onClick={() => setMenuOpen(false)}>Login</NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
