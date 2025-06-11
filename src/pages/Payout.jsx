import React from 'react';
import { usePayout } from '../context/PayoutContext';
import { NavLink } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Import all as XLSX
import { saveAs } from 'file-saver'; // For saving the file

const Payout = () => {
  const { payoutItems, removeFromPayout } = usePayout();
  const total = payoutItems.reduce((sum, item) => sum + item.price, 0);

  const generateExcel = () => {
    // Prepare the data for the Excel sheet
    const headers = ['#', 'Title', 'Author', 'Price'];
    const data = payoutItems.map((item, index) => ({
      '#': index + 1,
      'Title': item.title || 'N/A',
      'Author': item.author || 'Unknown',
      'Price': `₹${item.price}`,
    }));

    // Add the total row
    data.push({
      '#': '', // Empty for alignment
      'Title': '', // Empty for alignment
      'Author': 'Total:',
      'Price': `₹${total}`,
    });

    // Create a worksheet from the JSON data
    // json_to_sheet automatically infers headers if useKeysAsHeaders is true (default)
    const ws = XLSX.utils.json_to_sheet(data);

    // If you want to explicitly add headers and then data:
    // const ws_data = [headers, ...payoutItems.map((item, index) => [
    //   index + 1,
    //   item.title || 'N/A',
    //   item.author || 'Unknown',
    //   `₹${item.price}`,
    // ]), ['', '', 'Total:', `₹${total}`]];
    // const ws = XLSX.utils.aoa_to_sheet(ws_data); // Array of arrays to sheet

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Payout Summary'); // Sheet name

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create a Blob and save the file
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'payout_summary.xlsx');
  };

  return (
    <div className="p-10 text-white">
      <NavLink to="/">
        <h1 className="text-xl text-black cursor-pointer">Go Back</h1>
      </NavLink>

      <h1 className="text-2xl text-center text-black font-bold mb-6">🧾 Payout Summary</h1>

      {payoutItems.length === 0 ? (
        <p>No items selected for payout.</p>
      ) : (
        <div className="space-y-4">
          {payoutItems.map((item, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-400 italic">
                By {item.author || 'Unknown'}
              </p>
              <p className="text-md font-medium text-green-400">₹{item.price}</p>
              <button
                onClick={() => removeFromPayout(index)}
                className="bg-red-600 hover:bg-red-700 mt-2 px-4 py-1 rounded text-white text-sm"
              >
                Delete
              </button>
            </div>
          ))}

          <div className="mt-6 text-xl font-bold text-yellow-400">Total: ₹{total}</div>

          <button
            onClick={generateExcel} // Changed to generateExcel
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white text-sm"
          >
            Download Excel Summary
          </button>
        </div>
      )}
    </div>
  );
};

export default Payout;