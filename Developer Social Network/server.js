const express= require('express');
const  connectDB = require('./config/db');

//Connect Database
connectDB();


const app = express();
//create an end point
app.get('/',(req,res)=>{
    res.send('API Running');
});

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});