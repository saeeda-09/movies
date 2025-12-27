const                    
   mongoose = require('mongoose');

const MovieSchema = mongoose.Schema(
    {
       name: {
        type: String,
        required: true 
    },
   
    description: { 
        type: String
    },
    category: {
        type: String
    },
    
    image: {
        type: String,
        default: ""
    }

    },
    {
        timestamps: true
    }
);


const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
