import jwt from 'jsonwebtoken'

const authMiddleware = async (req, res, next) => {

    try{
        const authHeader = req.headers.authorization

        if(!authHeader){
            return res.status(401).json({
                message: 'No token provided',
            })
        }

        // remove Bearer 
            const token = authHeader.split(' ')[1]

            // verify token
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            )

            // attach user data
            req.user = decoded

            next()
            
    }catch(error){
        res.status(401).json({
            message: 'Invalid token',
        })
    }
}

export default authMiddleware