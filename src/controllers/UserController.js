import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const signUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
      });

      return res.status(201).json("Usuário cadastrado com sucesso.");
    } else {
      return res.status(400).json({
        message: "Já existe um usuário com este email.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, process.env.MY_SECRET, {
          expiresIn: "1h",
        });

        return res.status(200).json({ message: "Logado com sucesso.", token });
      } else {
        return res.status(401).json({ message: "Email ou senha inválidos." });
      }
    } else {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { signUp, logIn };
