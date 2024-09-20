const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

// CORS Configuration (allow all origins for development, or specify origin)
app.use(cors()); // This MUST come before route definitions

// Parse incoming JSON requests
app.use(express.json({ extended: false }));

// Routes
const auth = require("./routes/auth");
const quoteRoutes = require('./routes/quoteRoutes');

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

// Apply routes after middleware
app.use('/api/auth', auth);
app.use('/api/quotes', quoteRoutes);

app.get("/", (req, res) => {
  res.send("hello");
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
