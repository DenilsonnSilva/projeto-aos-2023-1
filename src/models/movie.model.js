import { DataTypes } from "sequelize";
import sequelize from "../services/database";

const Movie = sequelize.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Título não pode ser vazio." },
      },
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Gênero não pode ser vazio." },
      },
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Sinopse não pode ser vazia." },
      },
    },
    posterPath: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: { msg: "Insira uma URL válida." },
      },
    },
  },
  { underscored: true }
);

export default Movie;
