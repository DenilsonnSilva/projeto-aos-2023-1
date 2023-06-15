import Movie from "../models/movie.model";
import User from "../models/user.model";
import Comment from "../models/comment.model";

const createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { movieId } = req.params;
    const userId = req.userId;

    const movie = await Movie.findByPk(movieId);
    const user = await User.findByPk(userId);

    if (movie && user) {
      const newComment = await Comment.create({
        content,
        movieId,
        userId,
      });

      return res.status(201).json(newComment);
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

const editComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.update({ content });

      return res.status(200).json({ comment });
    } else {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if (comment) {
      await comment.destroy();

      return res
        .status(200)
        .json({ message: "Comentário deletado com sucesso." });
    } else {
      return res.status(404).json({ message: "Comentário não encontrado." });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export { createComment, editComment, deleteComment };
