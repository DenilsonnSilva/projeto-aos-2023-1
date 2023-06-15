import { DataTypes } from "sequelize";
import sequelize from "../services/database";

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Endereço de email não pode ser vazio.",
        },
        isEmail: {
          msg: "Insira um endereço de email válido.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Senha não pode ser vazia." },
      },
    },
  },
  { underscored: true }
);

export default User;
