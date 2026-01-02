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
    try {
        const movies = await Movie.find({});
        res.status(200).json(movies);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getMovie = async (req, res) => {
try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        res.status(200).json(movie);

    }catch (error) {
        res.status(500).json({message: error.message});
    }    
};

const createMovie = async(req,res) =>{
    try {
        const movie = await Movie.create(req.body);
        res.status(200).json(movie);
    }catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateMovie = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedMovie = await Movie.findByIdAndUpdate(id,req.body);

        if(!updatedMovie)
        {
            return res.status(404).json({message:"Movie not found!"});
        }
        const updateMovie = await Movie.findById(id);
        res.status(200).json(updatedMovie);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

const deleteMovie = async (req, res) => {
    try{
            const { id } = req.params;
            const Movie = await Movie.findByIdAndDelete(id);

            if(!movie)
            {
                return res.status(404).json({message:"movie not found!"});
            }
            res.status(200).json({nessage:"movie Deleted Successfully!"});
        }catch (error){
            res.status(500).json({message:error.message});
        }
    };
module.exports = {
    getMovies, 
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie
};