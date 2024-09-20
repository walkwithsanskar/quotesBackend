const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
const corsOptions = {
  origin: ["http://localhost:3000","https://quotesfrontend.onrender.com","*"], // Allow localhost:3000 and all other origins

};

// Apply CORS middleware
app.use(cors(corsOptions));
const auth=require("./routes/auth")
const quoteRoutes=require('./routes/quoteRoutes')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

app.use(express.json({ extended: false }));
app.use('/api/auth',auth);
app.use('/api/quotes',quoteRoutes);

app.get("/",(req,res)=>{
  res.send("hello");
})

const PORT=process.env.PORT||5002;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
