const express = require('express');
const mongoose = require('mongoose');
const Profile = require('./models/Profile'); // import model first
const app = express();
const cors = require('cors');

app.use(cors());

// Middleware
app.use(express.json());


// === POST: Create profile ===
app.post("/api/profile", async (req, res) => {
  const { name, email, location, preferences } = req.body;


  if (!name || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }


  try {
    const profile = new Profile({ name, email, location, preferences });
    await profile.save();


    console.log("Received profile:", req.body);
    console.log("Profile saved in MongoDB:", profile);


    res.status(201).json({ message: "Profile saved", profile });
  } catch (error) {
    console.error("Error saving profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// === PUT: Update profile ===
app.put("/api/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, location, preferences } = req.body;


  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      id,
      { name, email, location, preferences },
      { new: true, runValidators: true }
    );


    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }


    console.log("Profile updated:", updatedProfile);
    res.json({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// === Test route ===
app.get('/', (req, res) => {
  res.send("API is running");
});


// === Connect to MongoDB ===
mongoose.connect("mongodb+srv://seaobrien147_db_user:LnyJPCpJj8oJIEPe@cluster0.xtlznnu.mongodb.net/?appName=Cluster0")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));