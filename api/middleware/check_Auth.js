const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    if (decoded.role !== "user"){
        return res.send({message: "You're not a user"})
    }
    next();
} catch (error) {
    return res.status(400).json({
        message: "Auth failed"
    })}
    
    
}