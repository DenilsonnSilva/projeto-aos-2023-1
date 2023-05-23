import { Router } from "express";

import {
  addMovie,
  deleteMovie,
  editMovie,
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

router.post("/movie", UserAuthentication, addMovie);

router.put("/movie/:movieId", UserAuthentication, editMovie);

router.delete("/movie/:movieId", UserAuthentication, deleteMovie);

router.post("/movies/:movieId/favorite", UserAuthentication, favoriteMovie);

router.post("/movies/:movieId/unfavorite", UserAuthentication, unfavoriteMovie);

router.post("/movies/:moveId/comment", UserAuthentication, createComment);

router.put(
  "/movies/:moveId/comment/:commentId",
  UserAuthentication,
  editComment
);

router.delete(
  "/movies/:moveId/comment/:commentId",
  UserAuthentication,
  deleteComment
);

export default router;
