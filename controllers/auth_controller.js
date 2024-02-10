import user from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import joi from "joi";
const secret = process.env.SECRET;
const auth_controller = {
  register: async (req, res,next) => {
    const userEmailExist = await user.findOne({ email: req.body.email });
    if (userEmailExist) {
      res.status(400).send("Email Already Exists");
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
      const newUser = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        role: req.body.role,
      });
      if (await newUser.save()) {
        console.log("New User Registered");
        res.json(newUser);
      }
    } catch (err) {
      console.log(
        "Error Message",
        err.message,
        "\nCheck Response sent from Server"
      );
      res.status(400).json(err);
    }
  },

  login: async (req, res,next) => {
    const user_exist = await user.findOne({ email: req.body.email });
    if (!user_exist) return res.status(400).send("Incorrect Email ID");
    const validPassword = await bcrypt.compare(
      req.body.password,
      user_exist.password
    );
    if (!validPassword) {
      return res.status(400).send("Incorrect Password");
    } else {
      let payload = {
        id: user_exist._id,
        role: user_exist.role,
      };
      console.log(payload)
      const token = jwt.sign(payload, secret, {
        expiresIn: "40m",
      });

      res.status(201).json({ token });
    }
    next();
  },
profile:(req, res)=>{
    res.json(req.user);
}
};
export default auth_controller;
