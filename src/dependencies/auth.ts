import jwt from 'jsonwebtoken';

class Auth {
    private static instance : Auth;
    constructor() {
        if(!Auth.instance) {
            Auth.instance = this;
        } else return Auth.instance;
    }
    
    generateToken = (data : any) => {
        if(process.env.JWT_SECRET)
        return jwt.sign(
            data, 
            process.env.JWT_SECRET, 
            {
                expiresIn : 60
            }
        );
    }

    verifyToken = (token : string) => {
        if(process.env.SECRET)
        return jwt.verify(token, process.env.SECRET);
    }

    decodeToken = (token : string) => {
        return jwt.decode(token)
    }
}

export default Auth;