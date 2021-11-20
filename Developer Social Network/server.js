const express= require('express');
const  connectDB = require('./config/db');
const { check, validationResult} = require ('express-validator/check');


//Connect Database
connectDB();


const app = express();
//create an end point
// Init Middleware
app.use(express.json({extended:false})); //to parse the sendet by user

app.get('/',(req,res)=>{
    res.send('API Running');
});


//Define Routes

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});