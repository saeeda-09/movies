const express = require('express')
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.route.js');
const mongoose = require('mongoose');
const Movie = require('./models/movie.model.js');
const movieRoute = require("./routes/movie.route.js");
const User = require('./models/user.model.js');
const userRoute = require('./routes/user.route.js');
const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));


//routes
app.use('/api/auth', authRoutes);
app.use('/api/movies',movieRoute);
app.use('/api/users', userRoute);


app.get('/',(req,res) => {
    res.send("hello from node api");
}); 


require('dotenv').config(); 

const CONNECTION_URI = process.env.MONGO_URI; 

mongoose.connect(CONNECTION_URI) 
.then(() => {
    console.log("connected to database!");
    app.listen(3000,() => {
    console.log("server is running on port 3000");
    });
})
.catch(() => { 
    console.log("connection failed!");
});