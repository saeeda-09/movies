const express = require("express");
const Movie = require("../models/movie.model.js")
const router = express.Router();
const {getMovies, getMovie, createMovie, updateMovie,deleteMovie} = require('../controllers/movie.controller.js');
const { get } = require("mongoose");
const { protect, admin } = require("../middleware/auth.middleware.js");


router.get('/',getMovies);
router.get("/:id",getMovie);
router.post('/',protect, admin, createMovie);
router.put('/:id',protect, admin, updateMovie);
router.delete('/:id',protect, admin, deleteMovie);




module.exports = router;