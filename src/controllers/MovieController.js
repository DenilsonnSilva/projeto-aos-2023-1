import Movie from "../models/movie.model";
import FavoritedMovie from "../models/favoritedMovie.model";
import Comment from "../models/comment.model";

const listMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};

const getMovie = async (req, res) => {
  try {
    const userId = req.userId;
    const { movieId } = req.params;

    const movie = await Movie.findByPk(movieId);

    if (movie) {
      const favoritedMovie = await FavoritedMovie.findOne({
        where: {
          user_id: userId,
          movie_id: movieId,
        },
      });

      const movieComments = await Comment.findAll({
        where: {
          user_id: userId,
          movie_id: movieId,
        },
      });

      return res.status(200).json({
        movie,
        movieComments,
        isFavorited: !!favoritedMovie,
      });
    } else {
      return res.status(404).json({ message: "Filme não encontrado." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, genre, synopsis, posterPath } = req.body;

    const newMovie = await Movie.create({
      title,
      genre,
      synopsis,
      posterPath,
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const editMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, genre, synopsis, posterPath } = req.body;

    const movie = await Movie.findByPk(movieId);

    if (movie) {
      await movie.update({ title, genre, synopsis, posterPath });

      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: "Filme não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findByPk(movieId);

    if (movie) {
      await movie.destroy();

      return res.status(200).json({ message: "Filme deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Filme não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { listMovies, getMovie, addMovie, editMovie, deleteMovie };
