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
          msg: "Email address can not be empty.",
        },
        isEmail: {
          msg: "Enter a valid email address.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password can not be empty." },
      },
    },
  },
  { underscored: true }
);

export default User;
