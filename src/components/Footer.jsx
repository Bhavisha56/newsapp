import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-4 mt-10">
      <div className="text-center text-sm space-y-1">
        <p>Powered by NewsLive – Your Daily Dose of Headlines 🚀</p>
        <p>© {new Date().getFullYear()}All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
