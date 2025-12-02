const bcrypt = require("bcrypt")
const crypto = require("crypto")
const genererJeton = require("../utils/generationJeton")
const Utilisateur = require("../model/schemaUtilisateur")
const genererJWT = require("../utils/generationJWT")
const Service = require("../model/schemaService")
const {mailVerification,emailValide, oublierMotdepasse, motdepasseChanger} = require("../mail/mailVerification")
const inscription = async  (req,res)=>{
    const {nom,prenom,email,motdepasse,contact,niveau,service} = req.body
    if(!nom || !prenom || !email || !motdepasse || !contact || !niveau ||!service ){
        return res.status(400).json({message:"Tous les champs sont requis !"})
    }
    try {
        const existant = await Utilisateur.findOne({email})
        if(existant){
            return res.status(400).json({message:"L'utilisateur existe déjà !"})
        }
        const services  = await Service.findOne({libelle:service})
        if(!services){
            return res.status(404).json({message:"Ce service n'existe pas !"})
        }
        const motdepasseHashe = await bcrypt.hash(motdepasse,10)
        const verificationJeton = genererJeton()
        const utilisateur = await Utilisateur.create({
            nom,prenom,email,motdepasse:motdepasseHashe,contact,niveau,service,
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
            return res.status(400).json({message:"Le mot de passe est incorrecte !"})
        }
        const estVerifier = utilisateur.estVerifier
        if(!estVerifier){
            return res.status(400).json({message:"Vous n'êts pas authentifié !"})
        }
        genererJWT(res,utilisateur._id)
        return res.status(200).json({status: "valide", message: "Vous êtes connecté !",donnee:utilisateur });
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
        await oublierMotdepasse(utilisateur.email,`${process.env.CLEINT_URI}/verificationOTP/${reinitialisationMotdepasse}`)
        return res.status(200).json({status:"valide",message:"L'email de récupération a été envoyé !",donnee:utilisateur})
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


const afficherToutUtilisateur = async (req,res)=>{
    try {
        const utilisateur = await Utilisateur.find({ type: { $ne: "administrateur" } })
        if(utilisateur.length===0){
            return res.status(400).json({message:"Aucun utilisateurs trouvés !"})
        }
        return res.status(200).json({status:"valide",message:"Tous les utilisateurs sont affichés !",donnee:utilisateur})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const majUtilisateurAdministrateur = async (req, res) => {
    const { id } = req.params
    const { nom, prenom, email, motdepasse, contact, type, niveau, service } = req.body
    
    // Récupérer l'utilisateur connecté
    const utilisateurConnecte = req.utilisateur
    
    if (!id) {
        return res.status(400).json({ message: "ID requis !" })
    }
    
    // ✅ Vérifier que l'utilisateur connecté est bien un administrateur
    if (!utilisateurConnecte || utilisateurConnecte.type !== 'administrateur') {
        return res.status(403).json({ 
            message: "Accès refusé. Seul un administrateur peut effectuer cette action." 
        })
    }
    
    if (!nom || !prenom || !email || !contact || !type || !niveau || !service) {
        return res.status(400).json({ message: "Tous les champs sont requis !" })
    }
    
    try {
        const services = await Service.findOne({ libelle: service })
        if (!services) {
            return res.status(400).json({ message: "Ce service n'existe pas !" })
        }
        
        const existe = await Utilisateur.findById(id)
        if (!existe) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé !" })
        }
        
        // ✅ Validation du type
        if (type && !['administrateur', 'employe'].includes(type)) {
            return res.status(400).json({ 
                message: "Type invalide. Valeurs acceptées : 'administrateur' ou 'employe'" 
            })
        }
        
        // ✅ Validation du niveau d'autorisation
        if (niveau && (niveau < 1 || niveau > 5)) {
            return res.status(400).json({ 
                message: "Niveau d'autorisation invalide. Doit être entre 1 et 5" 
            })
        }
        const emailExiste = await Utilisateur.findOne({ email, _id: { $ne: id } });
        if (emailExiste) {
            return res.status(400).json({ message: "Cet email est déjà utilisé par un autre utilisateur" });
        }
        
        // ✅ Données modifiables par l'administrateur (TOUT, y compris type et niveau)
        const donnees = { nom, prenom, email, contact,type,niveau, service }
        
        if (type) donnees.type = type
        if (niveau) donnees.niveau = niveau
        
        if (motdepasse && motdepasse.trim() !== "") {
            donnees.motdepasse = await bcrypt.hash(motdepasse, 10)
        }
        
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, donnees, { new: true })
        
        if (!utilisateur) {
            return res.status(400).json({ message: "Les données n'ont pas été mises à jour !" })
        }
        
        return res.status(200).json({
            status: "valide",
            message: "Les informations ont été mises à jour",
            donnee: { ...utilisateur._doc, motdepasse: undefined }
        })
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur !", 
            erreur: error.message 
        })
    }
}

const majUtilisateurEmploye = async (req, res) => {
    const { id } = req.params
    const { nom, prenom, email, motdepasse, contact,service } = req.body
    
    // Récupérer l'utilisateur connecté depuis le middleware d'authentification
    const utilisateurConnecte = req.utilisateur // À adapter selon votre middleware
    
    if (!id) {
        return res.status(400).json({ message: "ID requis !" })
    }
    
    // ✅ Vérifier que l'employé modifie bien ses propres informations
    if (utilisateurConnecte._id.toString() !== id) {
        return res.status(403).json({ 
            message: "Vous ne pouvez modifier que vos propres informations !" 
        })
    }
    
    if (!nom || !prenom || !email || !contact || !service ) {
        return res.status(400).json({ message: "Tous les champs sont requis !" })
    }
    
    try {
        const services = await Service.findOne({ libelle: service })
        if (!services) {
            return res.status(400).json({ message: "Ce service n'existe pas !" })
        }
        
        const existe = await Utilisateur.findById(id)
        if (!existe) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé !" })
        }
        
        // ✅ Données modifiables par l'employé (SANS type et niveau)
        const donnees = { nom, prenom, email, contact,service }
        
        if (motdepasse && motdepasse.trim() !== "") {
            donnees.motdepasse = await bcrypt.hash(motdepasse, 10)
        }
        
        const utilisateur = await Utilisateur.findByIdAndUpdate(id, donnees, { new: true })
        
        if (!utilisateur) {
            return res.status(400).json({ message: "Les données n'ont pas été mises à jour !" })
        }
        
        return res.status(200).json({
            status: "valide",
            message: "Vos informations ont été mises à jour",
            donnee: { ...utilisateur._doc, motdepasse: undefined }
        })
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur !", 
            erreur: error.message 
        })
    }
}

const desactiverUtilisateur = async (req, res) => {
    const { id } = req.params
    const utilisateurConnecte = req.utilisateur
    
    if (!id) {
        return res.status(400).json({ message: "ID requis !" })
    }
    
    if (!utilisateurConnecte || utilisateurConnecte.type !== 'administrateur') {
        return res.status(403).json({ 
            message: "Accès refusé. Seul un administrateur peut désactiver un utilisateur." 
        })
    }
    
    try {
        const utilisateur = await Utilisateur.findById(id)
        
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur introuvable !" })
        }
        
        if (utilisateur._id.toString() === utilisateurConnecte._id.toString()) {
            return res.status(400).json({ 
                message: "Vous ne pouvez pas désactiver votre propre compte !" 
            })
        }
        
        // ✅ Désactiver au lieu de supprimer
        utilisateur.actif = false
        await utilisateur.save()
        
        return res.status(200).json({
            status: "valide",
            message: "L'utilisateur a bien été désactivé !",
            donnee: { ...utilisateur._doc, motdepasse: undefined }
        })
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        })
    }
}

const reactiverUtilisateur = async (req, res) => {
    const { id } = req.params
    const utilisateurConnecte = req.utilisateur
    
    if (!utilisateurConnecte || utilisateurConnecte.type !== 'administrateur') {
        return res.status(403).json({ 
            message: "Accès refusé. Seul un administrateur peut réactiver un utilisateur." 
        })
    }
    
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(
            id,
            { actif: true },
            { new: true }
        )
        
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur introuvable !" })
        }
        
        return res.status(200).json({
            status: "valide",
            message: "L'utilisateur a bien été réactivé !",
            donnee: { ...utilisateur._doc, motdepasse: undefined }
        })
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        })
    }
}

const changerAutorisationEmploye = async (req,res)=>{
        const {id}=req.params
        const utilisateurConnecte = req.utilisateur
        const {niveau} = req.body
        if(!niveau){
            return res.status(400).json({message:"Veuillez renseigner le champ !"})
        }
        if (!id) {
        return res.status(400).json({ message: "ID requis !" })
    }
    if (!utilisateurConnecte || utilisateurConnecte.type !== 'administrateur') {
        return res.status(403).json({ 
            message: "Accès refusé. Seul un administrateur peut changer le niveau de sécurité !." 
        })
    }
    try {
        const utilisateur = await Utilisateur.findById(id)
        if(!utilisateur){
            return res.status(404).json({message:"Cet utlisateur est introuvable"})
        }
        await Utilisateur.findByIdAndUpdate(id,{niveau},{new:true})
        return res.status(200).json({status:"valide",message:"Le niveau de sécurité a été mis à jour !",donnee:{...utilisateur._doc,motdepasse:undefined}})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
    

}


module.exports = {
    inscription, 
    emailVerifier,
    connexion,
    deconnexion,
    motdepasseOublier,
    reinitialiserMotdepasse,
    verifierAuthentification,
    afficherToutUtilisateur,
    majUtilisateurAdministrateur,
    majUtilisateurEmploye,
    desactiverUtilisateur,
    reactiverUtilisateur,
    changerAutorisationEmploye
}