const bcrypt = require("bcrypt")
const crypto = require("crypto")
const genererJeton = require("../utils/generationJeton")
const Utilisateur = require("../model/schemaUtilisateur")
const genererJWT = require("../utils/generationJWT")
const {mailVerification,emailValide, oublierMotdepasse, motdepasseChanger} = require("../mail/mailVerification")
const inscription = async  (req,res)=>{
    const {nom,prenom,email,motdepasse,numero,niveau} = req.body
    if(!nom || !prenom || !email || !motdepasse || !numero || !niveau){
        return res.status(400).json({message:"Tous les champs sont requis !"})
    }
    try {
        const existant = await Utilisateur.findOne({email})
        if(existant){
            return res.status(400).json({message:"L'utilisateur existe déjà !"})
        }
        const motdepasseHashe = await bcrypt.hash(motdepasse,10)
        const verificationJeton = genererJeton()
        const utilisateur = await Utilisateur.create({
            nom,prenom,email,motdepasse:motdepasseHashe,numero,niveau,
            verificationJeton : verificationJeton,
            dateVerificationJeton:Date.now() + 24*60*60*1000
        })
        genererJWT(res,utilisateur._id)
        await mailVerification(utilisateur.email,verificationJeton)
        return res.status(201).json({stats:"valide",message:"Nouvel utilisateur crée !",donnee:{...utilisateur._doc,motdepasse:undefined}})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue sur le serveur !",erreur:error.message})
    }
}

const emailVerifier= async (req,res)=>{
    const {code} = req.body
    try {
        const utilisateur = await Utilisateur.findOne({
            verificationJeton:code,
            dateVerificationJeton:{$gt:Date.now()}
        })
        if(!utilisateur){
            return res.status(400).json({message:"Le jeton est invalide ou a expiré !"})
        }
        utilisateur.estVerifier = true,
        utilisateur.verificationJeton = undefined,
        utilisateur.dateVerificationJeton = undefined
        await utilisateur.save()
        await emailValide(utilisateur.email)
        return res.status(200).json({status:"valide",message:"Email vérifié !",donnee:{...utilisateur._doc,motdepasse:undefined}})
    } catch (error) {
        return res.status(500).json({message:"Une erreur est survenue sur le serveur !",erreur:error.message})
    }
}

const connexion = async (req,res)=>{
    const {email,motdepasse} = req.body
    try {
        if(!email || !motdepasse){
            return res.status(400).json({message:"Tous les champs sont requis !"})
        }
        const utilisateur = await Utilisateur.findOne({email})
        if(!utilisateur){
            return res.status(400).json({message:"L'email est incorrecte !"})
        }
        const verifierMotdepasse = await bcrypt.compare(motdepasse,utilisateur.motdepasse)
        if(!verifierMotdepasse){
            return res.status(400).json({message:"L'e mot de passe est incorrecte !"})
        }
        const estVerifier = utilisateur.estVerifier
        if(!estVerifier){
            return res.status(400).json({message:"Vous n'êts pas authentifié !"})
        }
        genererJWT(res,utilisateur._id)
        return res.status(200).json({ status: "valide", message: "Vous êtes connecté !" });
    } catch (error) {
        console.log("Une erreur est survenue lors de la connexion de l'utilisateur :", error.message);
        return res.status(500).json({ message: "Erreur serveur",error:error.message });
    }
}
const deconnexion = async(req,res)=>{
try {
    res.clearCookie("token")
    return res.status(200).json({status:"valide",message:"Vous êtes deconnecté !"})
} catch (error) {
    return res.status(500).json({message:"Erreur serveur",erreur:error.message})
}
}

const motdepasseOublier = async (req,res)=>{
    const {email} = req.body
    try {
        if(!email ){
            return res.status(400).json({message:"Tous les champs sont requis !"})
        }
        const utilisateur = await Utilisateur.findOne({email})
        if(!utilisateur){
            return res.status(400).json({message:"L'email est incorrecte !"})
        }
        const reinitialisationMotdepasse = await crypto.randomBytes(32).toString("hex")
        const dateReinitialisationMotdepasse = Date.now() + 1 * 24 *60 *60*1000
        utilisateur.reinitialisationMotdepasse = reinitialisationMotdepasse
        utilisateur.dateReinitialisationMotdepasse = dateReinitialisationMotdepasse
        await utilisateur.save()
        await oublierMotdepasse(utilisateur.email,`${process.env.CLEINT_URI}/motdepasseReinitialiser/${reinitialisationMotdepasse}`)
        return res.status(200).json({status:"valide",message:"L'email de récupération a été envoyé !"})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur !",erreur:error.message})
    }
}
const  reinitialiserMotdepasse = async (req,res)=>{
    const {token} = req.params
    const {motdepasse}= req.body
    try {
        const utilisateur = await Utilisateur.findOne({
            reinitialisationMotdepasse:token,
            dateReinitialisationMotdepasse:{$gt:Date.now()}
        })
        if(!utilisateur){
            return res.status(400).json({message:"le jeton est invalide où a expiré !"})
        }
        const motdepasseHashe = await bcrypt.hash(motdepasse,10)
        utilisateur.motdepasse = motdepasseHashe
        utilisateur.reinitialisationMotdepasse = undefined
        utilisateur.dateReinitialisationMotdepasse = undefined
        await utilisateur.save()
        await motdepasseChanger(utilisateur.email)
        return res.status(200).json({status:"valide",message:"Le mot de passe a bien été changé !"})
    } catch (error) {
        console.log("Une erreur est survenu lors de la mise à jour du mot de passe :", error.message);
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const verifierAuthentification =async (req,res)=>{
    try {
        const utilisateur = await Utilisateur.findById(req.IdUtilisateur)
        if(!utilisateur){
            return res.status(400).json({message:"Utilisateur introuvable !"})
        }
        return res.status(200).json({status:"valide",message:"Authentification réussie !",donnee:{...utilisateur._doc,motdepasse:undefined}})
    } catch (error) {
        console.log("Une erreur est survenu  :", error.message);
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

module.exports = {inscription, emailVerifier,connexion,deconnexion,motdepasseOublier,reinitialiserMotdepasse,verifierAuthentification}