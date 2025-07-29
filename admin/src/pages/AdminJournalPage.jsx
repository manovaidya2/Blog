import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminJournalPage = () => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [journals, setJournals] = useState([]);

  const fetchJournals = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/journals/getJournals");
      setJournals(res.data);
    } catch (error) {
      console.error("Failed to fetch journals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/journals/addJournal", {
        name,
        summaryAboutTitle: summary,
      });
      setName("");
      setSummary("");
      fetchJournals();
    } catch (error) {
      console.error("Failed to add journal:", error);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Journal</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          value={name}
          placeholder="Enter journal name"
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          value={summary}
          placeholder="Enter summary or about title"
          onChange={(e) => setSummary(e.target.value)}
          className="border p-2 rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-fit"
        >
          Add Journal
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Existing Journals</h3>
      <ul className="space-y-4">
        {journals.map((j) => (
          <li key={j._id} className="border p-3 rounded shadow-sm">
            <h4 className="font-bold text-lg">{j.name}</h4>
            <p className="text-sm text-gray-600">{j.summaryAboutTitle}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminJournalPage;
