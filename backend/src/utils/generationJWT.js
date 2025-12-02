const jwt = require("jsonwebtoken")

const genererJWT = async (res,IdUtilisateur)=>{
    const token = jwt.sign({IdUtilisateur},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })
    return token
}
module.exports= genererJWT