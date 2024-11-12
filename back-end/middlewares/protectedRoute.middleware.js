import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectedRoute = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({error: "No token, authorization denied"});
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        if(!decodedData) {
            return res.status(403).json({error: "Token is invalid"});
        }

        console.log(decodedData);

        const user = await User.findById(decodedData.userId).select("-password");

        if (!user) {
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;

        next();

    } catch (err) {
        console.log('Error in protectedRoute middleware: ', err.message)
        res.status(500).json({error: "Server error"});
    }
}

export default protectedRoute;