"use client";
import { useState } from "react";

export default function Score() {
  const [formData, setFormData] = useState({
    product_name: "",
    materials: "",
    transport: "",
    packaging: "",
    gwp: "",
    cost: "",
    circularity: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    const data = {
      product_name: formData.product_name,
      materials: formData.materials.split(",").map((m) => m.trim()),
      transport: formData.transport,
      packaging: formData.packaging,
      gwp: parseFloat(formData.gwp),
      cost: parseFloat(formData.cost),
      circularity: parseFloat(formData.circularity),
    };

    try {
      const response = await fetch("https://sustainability-backend-1-ce7o.onrender.com/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await response.json();
      if (response.ok) setResult(res);
      else setError(res.error || "Something went wrong");
    } catch (err) {
      setError(`Request failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 rounded-3xl shadow-2xl p-8  space-y-6">
      <h1 className="text-3xl font-extrabold text-center text-indigo-400">
        Sustainability Score Calculator
      </h1>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {[
          { label: "Product Name", id: "product_name", type: "text" },
          { label: "Materials (comma-separated)", id: "materials", type: "text" },
          { label: "Transport", id: "transport", type: "text" },
          { label: "Packaging", id: "packaging", type: "text" },
          { label: "GWP (0-100)", id: "gwp", type: "number", min: 0, max: 100 },
          { label: "Cost (USD 0-1000)", id: "cost", type: "number", min: 0, max: 1000 },
          { label: "Circularity (0-100)", id: "circularity", type: "number", min: 0, max: 100 },
        ].map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className="mb-1 text-gray-300 font-medium">{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              value={formData[field.id]}
              onChange={handleChange}
              required
              min={field.min}
              max={field.max}
              placeholder={field.label}
              className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 mt-3 rounded-xl text-white font-bold text-lg transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r bg-indigo-500   shadow-lg"
          }`}
        >
          {loading ? "Calculating..." : "Calculate Score"}
        </button>
      </form>

      {error && <p className="text-red-400 font-semibold mt-4 text-center">{error}</p>}

      {result && (
        <div className="mt-6 p-6 bg-gray-800 rounded-2xl shadow-inner space-y-3 border border-gray-700">
          <h3 className="text-xl font-bold text-indigo-400">{result.product_name}</h3>
          <p>
            <span className="font-semibold">Sustainability Score:</span> {result.sustainability_score} ({result.rating})
          </p>
          <p>
            <span className="font-semibold">Issues:</span> {result.issues.join(", ")}
          </p>
          <div>
            <span className="font-semibold">Suggestions:</span>
            <ul className="list-disc list-inside ml-4 mt-1">
              {result.suggestions.map((s, index) => (
                <li key={index}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
