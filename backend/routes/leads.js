const express = require("express");
const Lead = require("../models/Lead");

const router = express.Router();

// Create a new lead
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    const lead = new Lead({ name, email, phone, status });
    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all leads
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a specific lead by ID
router.get("/:id", async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a lead by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, status },
      { new: true, runValidators: true }
    );
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a lead by ID
router.delete("/:id", async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
