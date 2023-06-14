import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      const newUser = await User.create({
        username,
        password: bcrypt.hashSync(password, 10),
      });

      return res.status(201).json(newUser);
    } else {
      return res.status(400).json({
        message: "There is already an user with the same username!",
      });
    }
  } catch (error) {
    console.error("Error while trying to sign up: ", error);
    return res.status(500).json({ message: "Error while trying to sign up!" });
  }
};

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, process.env.MY_SECRET, {
          expiresIn: "1h",
        });

        return res.status(201).json({ message: token });
      } else {
        return res.status(401).json({ message: "Invalid credentials!" });
      }
    } else {
      return res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (error) {
    console.error("Error while trying to log in: ", error);
    return res.status(500).json({ message: "Error while trying to log in!" });
  }
};

export { signUp, logIn };
