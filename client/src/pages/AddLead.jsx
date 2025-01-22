import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("New");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newLead = { name, email, phone, status };
      await axios.post("https://vercel.com/umarkhitabs-projects/crm-system-server/leads", newLead);
      navigate("/");
    } catch (err) {
      setError("Error creating lead");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Lead</h1>
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
        <button type="submit">
          {loading ? "Saving..." : "Save Lead"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default AddLead;