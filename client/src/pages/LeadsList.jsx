import React, { useState, useEffect } from "react";
import axios from "axios";


const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leads
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get("http://localhost:5000/leads");
        setLeads(response.data);
      } catch (err) {
        setError("Error fetching leads");
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Filter leads based on status
  const filteredLeads = statusFilter === "All" ? leads : leads.filter(lead => lead.status === statusFilter);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/leads/${id}`);
      setLeads(leads.filter(lead => lead._id !== id));
    } catch (err) {
      setError("Error deleting lead");
    }
  };

  return (
    <div>
      <h1>Leads List</h1>
      <div>
        <label>Filter by Status: </label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {filteredLeads.map((lead) => (
          <li key={lead._id}>
            <h2>{lead.name}</h2>
            <p>Email: {lead.email}</p>
            <p>Phone: {lead.phone}</p>
            <p>Status: {lead.status}</p>
            <p>Created At: {new Date(lead.createdAt).toLocaleString()}</p>
            <button onClick={() => handleDelete(lead._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadsList;
