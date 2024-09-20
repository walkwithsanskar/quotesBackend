const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Quote = require("../models/Quote");

const {
  addQuote,
  getQuotes,
  getQuote,
  updateQuote,
  deleteQuote,
} = require("../controllers/quotes");


router.post('/',auth,addQuote);

router.get("/", auth, async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Logout route
router.post('/logout', (req, res) => {
  try {
    // Simply respond with a success message for logout
    res.json({ msg: 'Logout successful' });
  } catch (err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id',auth,getQuote);
router.put('/:id',auth,updateQuote);
router.delete('/:id',auth,deleteQuote);

module.exports=router;