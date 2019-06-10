exports.verifyJWT = function(req, res, next){
    
    var token = req.headers['Authentication'];
    
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token.split(" ")[1], process.env.SECRET, function(err, decoded) {
        
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
        // if the flow works fine, pass the request to the next level
        req.userId = decoded.id;
        next();

    });

}