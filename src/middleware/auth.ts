import jwt from 'jsonwebtoken';

const generateToken = (data : any) => {
    if(process.env.SECRET)
    return jwt.sign(
        data, 
        process.env.SECRET, 
        {
            expiresIn : 60
        }
    );
}

const verifyToken = (token : string) => {
    if(process.env.SECRET)
    return jwt.verify(token, process.env.SECRET);
}

const decodeToken = (token : string) => {
    return jwt.decode(token)
}

export default { generateToken, verifyToken, decodeToken };