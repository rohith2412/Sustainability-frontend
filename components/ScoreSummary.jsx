"use client";
import { useEffect, useState } from "react";

export default function ScoreSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("https://sustainability-backend-1-ce7o.onrender.com/score-summary");
        const data = await res.json();

        if (res.ok) setSummary(data);
        else setError(data.error || "Failed to load summary");
      } catch (err) {
        setError(`Request failed: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p className="text-center mt-4">Loading summary...</p>;
  if (error) return <p className="text-red-400 text-center mt-4">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 rounded-2xl shadow-lg text-white">
      <h2 className="text-2xl font-bold text-indigo-400 mb-4 text-center">Score Summary</h2>

      {summary ? (
        <div className="space-y-3">
          <p>
            <strong>Total Products:</strong> {summary.total_products}
          </p>
          <p>
            <strong>Average Score:</strong> {summary.average_score}
          </p>

          {summary.top_issues && summary.top_issues.length > 0 && (
            <div>
              <strong>Top Issues:</strong>
              <ul className="list-disc list-inside ml-4">
                {summary.top_issues.map((item, index) => (
                  <li key={index}>
                    {item.issue} ({item.count})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No summary data available.</p>
      )}
    </div>
  );
}
