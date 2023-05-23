import Movie from "../models/movie.model";

const listMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();

    res.status(200).json(movies);
  } catch (error) {
    console.error("Error while trying to list movies: ", error);
    res.status(500).json({ message: "Error while trying to list movies!" });
  }
};

const addMovie = async (req, res) => {
  try {
    const { title, gender, synopsis, posterPath } = req.body;

    const newMovie = await Movie.create({
      title,
      gender,
      synopsis,
      posterPath,
    });

    return res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error while trying to add movie", error);
    return res
      .status(500)
      .json({ message: "Error while trying to add movie!" });
  }
};

const editMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { title, gender, synopsis, posterPath } = req.body;

    const movie = await Movie.findByPk(movieId);

    if (movie) {
      await movie.update({ title, gender, synopsis, posterPath });

      return res.status(200).json(movie);
    } else {
      return res.status(404).json({ message: "Movie was not found!" });
    }
  } catch (error) {
    console.error("Error while trying to edit movie", error);
    return res
      .status(500)
      .json({ message: "Error while trying to edit movie!" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const movie = await Movie.findByPk(movieId);

    if (movie) {
      await movie.destroy();

      return res.status(200).json({ message: "Movie deleted with success!" });
    } else {
      return res.status(404).json({ message: "Movie was not found!" });
    }
  } catch (error) {
    console.error("Error while trying to delete movie", error);
    return res
      .status(500)
      .json({ message: "Error while trying to delete movie!" });
  }
};

export { listMovies, addMovie, editMovie, deleteMovie };