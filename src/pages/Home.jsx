import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import Subcard from '../components/Subcard';
import Footer from '../components/Footer';

const Home = () => {
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchDate, setSearchDate] = useState('');

  return (
    <div className="bg-black w-full min-h-screen text-white">
      <Navbar />
      <Subcard
        searchAuthor={searchAuthor}
        setSearchAuthor={setSearchAuthor}
        searchDate={searchDate}
        setSearchDate={setSearchDate}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-10">
        <Card searchAuthor={searchAuthor} searchDate={searchDate} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
