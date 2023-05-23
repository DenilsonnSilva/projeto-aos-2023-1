import { DataTypes } from "sequelize";
import sequelize from "../services/database";

import User from "./user.model";
import Movie from "./movie.model";

const Comment = sequelize.define(
  "Comment",
  {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { underscored: true }
);

Comment.belongsTo(User);
User.hasMany(Comment, { foreignKey: "userId" });

Comment.belongsTo(Movie);
Movie.hasMany(Comment, { foreignKey: "movieId" });

export default Comment;
