import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

export const register=async(req,res)=>{
    const {name,email,password,phone}=req.body;
    try{

    if (!name || !email || !password ||!phone)
      return res.status(400).json({ message: 'All fields are required.' });

    let userExists=await User.findOne({email});
    if (userExists) {
        console.error("User already exists with email:", email); // Log duplicate user error
        return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
      
    const user = new User({
        name,
        email,
        password: hashedPassword,
        phone,
    });

    const savedUser = await user.save();
    console.log("User registered successfully:", savedUser);
    
    res.json({
        _id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone,
        token: generateToken(savedUser._id),
    });

    }catch(error){
        console.error("Error during registrtion:",error.message);
        res.status(500).json({message: "Server error"});
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone, 
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };