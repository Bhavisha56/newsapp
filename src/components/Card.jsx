import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePayout } from '../context/PayoutContext';

const Card = ({ searchAuthor, searchDate }) => {
  const [news, setNews] = useState([]);
  const { addToPayout } = usePayout();

  const getNews = async () => {
    try {
      const response = await axios.get('/api/newapi');
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const generateRandomPrice = () => Math.floor(Math.random() * 150 + 50);

  const filteredNews = news.filter((item) => {
    const matchesAuthor = item.author?.toLowerCase().includes(searchAuthor.toLowerCase());
    const matchesDate = searchDate
      ? new Date(item.publishedAt).toISOString().slice(0, 10) === searchDate
      : true;
    return matchesAuthor && matchesDate;
  });

  return (
    <>
      {filteredNews.map((item, index) => {
        const price = generateRandomPrice();
        return (
          <div
            key={index}
            className="bg-white max-w-sm rounded-2xl shadow-lg overflow-hidden flex flex-col m-4"
          >
            <div className="relative w-full h-48">
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-t-2xl"
                src={item.urlToImage || 'https://via.placeholder.com/300x200'}
                alt={item.title || 'News Image'}
              />
            </div>

            <div className="flex-grow p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{item.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">
                {item.description || 'No description available.'}
              </p>
              <p className="mt-2 text-sm text-gray-500 italic">
                By {item.author || 'Unknown Author'}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div
              className="bg-red-500 cursor-pointer w-full py-3 rounded-br-2xl rounded-bl-2xl text-center text-white font-semibold text-lg"
              onClick={() => addToPayout({ ...item, price })}
            >
              <h1>Checkout at ₹{price}</h1>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Card;
