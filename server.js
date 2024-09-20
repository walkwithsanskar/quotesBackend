const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(cors());

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
  res.send("hello pink pussy");
})

const PORT=process.env.PORT||5002;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
