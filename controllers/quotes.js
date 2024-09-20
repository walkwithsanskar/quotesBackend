const Quote = require("../models/Quote");
const { findByIdAndUpdate } = require("../models/User");

exports.addQuote = async (req, res) => {
  const { text, author } = req.body;
  try {
    const newQuote = new Quote({
      text,
      author,
      userId: req.user.id,
    });
    const quote = await newQuote.save();
    res.json(quote);
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find({ userId: req.user.id });
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ msg: "Quote not found" });
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};exports.updateQuote = async (req, res) => {

  const { text, author } = req.body;
  
  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ msg: "Quote not found" });
    
    quote = await Quote.findByIdAndUpdate(
      req.params.id, // Corrected from res.params.id to req.params.id
      { $set: { text, author } },
      { new: true }
    );
    res.json(quote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
exports.deleteQuote = async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ msg: "Quote not found" });

    // Check if the quote belongs to the logged-in user
    if (quote.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "cant delete others quotes bro" });
    }

    await Quote.findByIdAndDelete(req.params.id);
    res.json({ msg: "Quote removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
