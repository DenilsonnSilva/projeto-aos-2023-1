import Movie from "../models/movie.model";
import User from "../models/user.model";
import FavoritedMovie from "../models/favoritedMovie.model";

const favoriteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.userId;

    const movie = await Movie.findByPk(movieId);
    const user = await User.findByPk(userId);

    if (movie && user) {
      const favoritedMovie = await FavoritedMovie.findOne({
        where: {
          movie_id: movieId,
          user_id: userId,
        },
      });

      if (!favoritedMovie) {
        const newFavoritedMovie = await FavoritedMovie.create({
          movieId,
          userId,
        });

        return res.status(201).json({
          message: "Movie favorited with success!",
          newFavoritedMovie,
        });
      } else {
        return res.status(400).json({ message: "Movie is already favorited!" });
      }
    } else {
      return res.status(404).json({ message: "Movie or user was not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

const unfavoriteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.userId;

    const movie = await Movie.findByPk(movieId);
    const user = await User.findByPk(userId);

    if (movie && user) {
      const favoritedMovie = await FavoritedMovie.findOne({
        where: {
          movie_id: movieId,
          user_id: userId,
        },
      });

      if (favoritedMovie) {
        await favoritedMovie.destroy();

        return res
          .status(200)
          .json({ message: "Movie unfavorited with success!" });
      } else {
        return res.status(400).json({ message: "Movie is not favorited!" });
      }
    } else {
      return res.status(404).json({ message: "Movie or user was not found!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export { favoriteMovie, unfavoriteMovie };
