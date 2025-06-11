import React, { useEffect, useState } from 'react';
import { usePayout } from '../context/PayoutContext';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const AdminPage = () => {
  const [articles, setArticles] = useState([]);
  const { payoutItems } = usePayout();

  const getArticles = async () => {
    try {
      const res = await axios.get('/api/newapi');
      const data = res.data.articles.map((item, index) => ({
        ...item,
        id: index,
        price: Math.floor(Math.random() * 150 + 50),
      }));
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleEdit = (id, field, value) => {
    setArticles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const COLORS = ['#00C49F', '#FF8042'];

  const pieData = [
    { name: 'Articles', value: articles.length },
    { name: 'Payouts', value: payoutItems.length },
  ];

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Overview + Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-zinc-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Overview</h2>
          <p>Total Articles: {articles.length}</p>
          <p>Total Payout Items: {payoutItems.length}</p>
        </div>

        <div className="bg-zinc-800 p-6 rounded-xl shadow h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Editable Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-zinc-800 rounded-xl overflow-hidden">
          <thead className="bg-zinc-700">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Author</th>
              <th className="p-2">Price (₹)</th>
              <th className="p-2">Published</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((item) => (
              <tr key={item.id} className="border-b border-zinc-600">
                <td className="p-2">
                  <input
                    value={item.title}
                    onChange={(e) => handleEdit(item.id, 'title', e.target.value)}
                    className="bg-transparent w-full border-b border-white text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    value={item.author || ''}
                    onChange={(e) => handleEdit(item.id, 'author', e.target.value)}
                    className="bg-transparent w-full border-b border-white text-white"
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleEdit(item.id, 'price', +e.target.value)}
                    className="bg-transparent w-full border-b border-white text-white"
                  />
                </td>
                <td className="p-2 text-sm text-gray-400">
                  {new Date(item.publishedAt).toLocaleDateString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
