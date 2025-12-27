const express = require("express");
const Movie = require("../models/movie.model.js")
const router = express.Router();
const {getMovies, getMovie, createMovie, updateMovie,deleteMovie} = require('../controllers/movie.controller.js');
const { get } = require("mongoose");


router.get('/',getMovies);
router.get("/:id",getMovie);
router.post('/',createMovie);
router.put('/:id',updateMovie);
router.delete('/:id',deleteMovie);




module.exports = router;