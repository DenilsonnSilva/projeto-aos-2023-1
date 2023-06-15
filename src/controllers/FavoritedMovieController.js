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
          message: "Filme favoritado com sucesso.",
          newFavoritedMovie,
        });
      } else {
        return res.status(400).json({ message: "Filme já está favoritado." });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Filme ou usuário não encontrados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
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
          .json({ message: "Filme desfavoritado com sucesso." });
      } else {
        return res.status(400).json({ message: "Filme não está favoritado." });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Filme ou usuário não encontrados." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { favoriteMovie, unfavoriteMovie };
