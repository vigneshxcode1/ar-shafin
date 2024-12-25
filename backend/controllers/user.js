import Admin  from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const adminregister = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      const admin = new Admin({ username, password: hashedPassword });
      await admin.save();

      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      res.status(400).json({ error: "Registration failed" });
    }
  };

  export const adminlogin = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ id: admin._id }, "vicky123456hackpandra");
  
      // Include the adminId in the response
      res.status(200).json({
        message: "Login successful",
        token,
        adminId: admin._id, // Pass admin ID to the frontend
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Server error, please try again later." });
    }
  };
  

export const admin= async (req, res) => {
    const admins = await Admin.find({}, "-password");
    res.status(200).json(admins);
  };
  