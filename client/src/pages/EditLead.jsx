import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditLead = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("New");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/leads/${id}`);
        const lead = response.data;
        setName(lead.name);
        setEmail(lead.email);
        setPhone(lead.phone);
        setStatus(lead.status);
      } catch (err) {
        setError("Error fetching lead");
      }
    };

    fetchLead();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedLead = { name, email, phone, status };
      await axios.put(`https://vercel.com/umarkhitabs-projects/crm-system-server/leads/${id}`, updatedLead);
      navigate("/");
    } catch (err) {
      setError("Error updating lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Lead</h1>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="add_input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="add_input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="add_input"
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} required>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Closed">Closed</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Lead"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default EditLead;
