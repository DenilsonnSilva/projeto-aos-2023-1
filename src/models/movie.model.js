import { DataTypes } from "sequelize";
import sequelize from "../services/database";

const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Title can not be empty." },
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Genre can not be empty." },
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Synopsis can not be empty." },
      },
    },
    posterPath: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: { msg: "Enter a valid URL." },
      },
    },
  },
  { underscored: true }
);

export default Movie;
