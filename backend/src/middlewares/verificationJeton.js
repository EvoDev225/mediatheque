const jwt = require("jsonwebtoken")

const verificationJeton = async(req,res,next)=>{
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({message:"Non authorisé !"})
    }
    try {
        const decoded = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.IdUtilisateur = decoded.IdUtilisateur
        next()
    } catch (error) {
        console.log("une erreur esst survenue",error.mesage)
        return res.status(401).json({status:"echec",message:'non authorisé'})
    }
}

module.exports =verificationJeton