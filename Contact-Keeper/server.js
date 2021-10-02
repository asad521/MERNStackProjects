const express = require('express');
const app = express();
const connectDB =require('./config/db');
const path =require('path');
// Connect Database
connectDB();
//init Middleware
app.use(express.json({extended:false}))

app.get('/',(req, res) =>  
// res.json({msg:'Welcome to the Contactkeeper API'})); 

// Define Routes
app.use('/api/users/',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));

///Serve static assets in proudction 
if (process.env.NODE_ENV  === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(_dirname,'client','build','index.html')));
    
}

const PORT=process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server start on port ${PORT}`))

