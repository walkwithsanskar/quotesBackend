const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();





// Apply CORS middleware with appropriate origins
app.use(cors({
  origin:"*"
}));


app.use(express.json());

const auth=require("./routes/auth")
const quoteRoutes=require('./routes/quoteRoutes')

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
