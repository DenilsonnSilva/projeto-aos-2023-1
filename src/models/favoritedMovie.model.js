import sequelize from "../services/database";

import User from "./user.model";
import Movie from "./movie.model";

const FavoritedMovie = sequelize.define(
  "FavoritedMovie",
  {},
  { underscored: true }
);

User.belongsToMany(Movie, {
  through: FavoritedMovie,
  as: "Movie",
  foreignKey: "userId",
});
Movie.belongsToMany(User, {
  through: FavoritedMovie,
  as: "User",
  foreignKey: "movieId",
});

export default FavoritedMovie;
