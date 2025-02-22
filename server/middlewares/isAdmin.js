
import jwt from 'jsonwebtoken';


export const isAdmin = async (req, res, next) =>  {
    try {
        const token = req.cookies?.plateAheadToken;
        console.log("___________________________________________________", token)

        if (!token) {
            console.log("++++++++++++++++++++++++++++++++++++++++++")
            return res.status(401).json({ msg: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(decoded.data.premission !== 'admin'){
            return res.status(401).json({ msg: 'You are not admin' });

        }
        
        next();
    } catch (error) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
}