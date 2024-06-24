var jwt = require('jsonwebtoken');

export const ExtractTokenData = async (Token: string) => {
    
    try {
        var decoded = jwt.verify(Token, process.env.SECRET_KEY);
        return decoded;
    }
    catch(error:any) {
        throw new Error(error);
    }
}