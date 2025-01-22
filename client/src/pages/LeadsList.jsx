import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button"
import { Box, Card,Heading } from "@chakra-ui/react"
import { Avatar } from "../components/ui/avatar"
import axios from "axios";
import { Link } from "react-router-dom";

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
      <Heading m="5" size={"3xl"}>Leads List</Heading>
        <Box display="flex" alignItems={"center"}>
        <Button  ml="5" mb="3" size="sm" px="4"> <Link to="/add">Add Lead</Link></Button>
         <Box ml={"2"}>
         <div className="select_box_container">
        <label className="select_box">Filter by Status: </label>
        <select className="select_input" onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
         </Box>
        </Box>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <Box as="ul" m="5"> 
        {filteredLeads.map((lead) => (
              <Card.Root   mt="3" width="320px">
              <Card.Body gap="2">
           
                <Card.Title mt="2">{lead.name}</Card.Title>
                <Card.Description as={"li"} key={lead._id}>
            <p>Email: {lead.email}</p>
            <p>Phone: {lead.phone}</p>
            <p>Status: {lead.status}</p>
            <p>Created At: {new Date(lead.createdAt).toLocaleString()}</p>

                </Card.Description>
              </Card.Body>
              <Card.Footer justifyContent="flex-end">
            <Link to={`/edit/${lead._id}`}><Button size="xs" colorPalette="cyan" variant="outline">Edit</Button></Link>
            <Button variant="subtle" size="xs" colorPalette="red" onClick={() => handleDelete(lead._id)}>Delete</Button>
              </Card.Footer>
            </Card.Root>
        
        ))}
      </Box>
    </div>
  );
};

export default LeadsList;
