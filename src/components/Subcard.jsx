import React from 'react';

const Subcard = ({ searchAuthor, setSearchAuthor, searchDate, setSearchDate }) => {
  return (
    <div className="bg-zinc-700 w-full mb-10 px-4 py-4 flex flex-col sm:flex-row items-center justify-center gap-4">
      <h1 className="text-white font-semibold text-lg sm:text-xl">Search Filter:</h1>

      <input
        className="bg-white text-black text-center rounded-xl px-4 py-2 w-full sm:w-auto"
        type="search"
        placeholder="Search By Author..."
        value={searchAuthor}
        onChange={(e) => setSearchAuthor(e.target.value)}
      />

      <input
        className="bg-white text-black text-center rounded-xl px-4 py-2 w-full sm:w-auto"
        type="date"
        value={searchDate}
        onChange={(e) => setSearchDate(e.target.value)}
      />
    </div>
  );
};

export default Subcard;
