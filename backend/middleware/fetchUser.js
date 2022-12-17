const jwt = require('jsonwebtoken');
const JWT_SECRET = "1t415fsf5137c8@ch2#$";
const fetchUser = (req, res, next) => {
    //* Get user from jwt token and add id to req obj
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: "Please try again" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error})
    }
};
module.exports = fetchUser;