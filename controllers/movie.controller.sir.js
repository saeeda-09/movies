const
    Movie = require('../models/movie.model');
const { z } = require('zod');

const productSchema = z.object({
    name: z.string().min(1, "Movie name is required"),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional()
});

const getMovies = async (req, res) => {
    const {
        search,
        genres,
        minRating,
        maxRating,
        yearFrom,
        yearTo,
        sort = "latest",
        page = 1,
        limit = 5
    } = req.query;

    const query = {};

    if (search) {
        query.title = { $regex: search, $options: "i" };
    }

    if (genres) {
        query.genre = { $in: genres.split(",") };
    }

    if (minRating || maxRating) {
        query.rating = {};
        if (minRating) query.rating.$gte = Number(minRating);
        if (maxRating) query.rating.$lte = Number(maxRating);
    }

    if (yearFrom || yearTo) {
        query.releaseYear = {};
        if (yearFrom) query.releaseYear.$gte = Number(yearFrom);
        if (yearTo) query.releaseYear.$lte = Number(yearTo);
    }

    let sortOption = {};
    if (sort === "rating_high") sortOption = { rating: -1 };
    else if (sort === "rating_low") sortOption = { rating: 1 };
    else if (sort === "title_asc") sortOption = { title: 1 };
    else if (sort === "title_desc") sortOption = { title: -1 };
    else sortOption = { createdAt: -1 };

    const skip = (page - 1) * limit;

    const movies = await Movie.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));

    const total = await Movie.countDocuments(query);

    res.json({
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        movies
    });
};

const getMovie = async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
};

const createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id, req.body);

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found!" });
        }
        const updateMovie = await Movie.findById(id);
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const Movie = await Movie.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ message: "movie not found!" });
        }
        res.status(200).json({ nessage: "movie Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};