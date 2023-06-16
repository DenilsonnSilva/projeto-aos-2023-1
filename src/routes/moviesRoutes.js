import { Router } from "express";

import {
  addMovie,
  deleteMovie,
  editMovie,
  getMovie,
  listMovies,
} from "../controllers/MovieController";

import {
  favoriteMovie,
  unfavoriteMovie,
} from "../controllers/FavoritedMovieController";

import {
  createComment,
  deleteComment,
  editComment,
} from "../controllers/CommentController";

import UserAuthentication from "../middlewares/UserAuthentication";

const router = Router();

router.get("/movies", UserAuthentication, listMovies);
router.get("/movies/:movieId", UserAuthentication, getMovie);
router.post("/movies", UserAuthentication, addMovie);
router.put("/movies/:movieId", UserAuthentication, editMovie);
router.delete("/movies/:movieId", UserAuthentication, deleteMovie);
router.post("/movies/:movieId/favorite", UserAuthentication, favoriteMovie);
router.delete(
  "/movies/:movieId/unfavorite",
  UserAuthentication,
  unfavoriteMovie
);
router.post("/movies/:movieId/comment", UserAuthentication, createComment);
router.put(
  "/movies/:movieId/comment/:commentId",
  UserAuthentication,
  editComment
);
router.delete(
  "/movies/:movieId/comment/:commentId",
  UserAuthentication,
  deleteComment
);

export default router;
