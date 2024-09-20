const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "user already exists" });
    user = new User({ username, email, password });
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const payload = { user: { id: user.id } };
    jwt.sign(payload, jwtSecret, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("server error");
  }
};
exports.login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user =await User.findOne({email});
        if(!user)return res.status(400).json({msg:'Invalid credentials'});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({msg:'invalid credentials'});
        }
        const payload={user:{id:user.id}};
        jwt.sign(payload,jwtSecret,{expiresIn:'1h'},(err,token)=>{
            if(err)throw err;
            res.json({token})
        })
    } catch (error) {
        console.log(err.message);
        res.status(500).send('server error')
    }
}