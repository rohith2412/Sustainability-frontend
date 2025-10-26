"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("https://sustainability-backend-1-ce7o.onrender.com/history"); 
        const data = await res.json();

        if (res.ok && data.success) setHistory(data.submissions);
        else setError(data.error || "Failed to load history");
      } catch (err) {
        setError(`Request failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading history...</p>;
  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-900 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-indigo-400 text-center">Submission History</h2>

      {history.length === 0 ? (
        <p className="text-center">No submissions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Product Name</th>
                <th className="px-4 py-2 border-b border-gray-700">Score</th>
                <th className="px-4 py-2 border-b border-gray-700">Rating</th>
                <th className="px-4 py-2 border-b border-gray-700">Issues</th>
                <th className="px-4 py-2 border-b border-gray-700">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"}
                >
                  <td className="px-4 py-2">{item.product_name}</td>
                  <td className="px-4 py-2">{item.sustainability_score ?? item.score}</td>
                  <td className="px-4 py-2">{item.rating}</td>
                  <td className="px-4 py-2">{item.issues.join(", ")}</td>
                  <td className="px-4 py-2">{item.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
