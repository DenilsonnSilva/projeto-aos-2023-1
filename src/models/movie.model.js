import { DataTypes } from "sequelize";
import sequelize from "../services/database";

const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    posterPath: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
  },
  { underscored: true }
);

export default Movie;
