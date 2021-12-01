const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function (req,res,next) {
    // Get token from headers 
    console.log("2343")
    const token = req.header('x-auth-token');
    console.log(token+'this is token')
    // check  if no token 
    if(!token) {

        return res.status(401).json({ msg:"No token, authoerization denied"})
    }
    // verify the toeken if any
    console.log("later")

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch(err) {
        res.status(401).json({msg :"Token is not valid"})
    }
 

}