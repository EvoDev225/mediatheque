const Visite = require("../model/schemaVisite")
const Utilisateur = require('../model/schemaUtilisateur')
const Espace = require("../model/schemaEspace")
const creation = async (req,res)=>{
    const {type,date,heure,nomUtilisateur,espace} = req.body
    if(!type || !date || !heure || !nomUtilisateur|| !espace){
        return res.status(400).json({message:"Tous les champs sont requis !"})
    }
    try {
        const utilisateur = await Utilisateur.findOne({nom:nomUtilisateur})
    if(!utilisateur){
        return res.status(404).json({message:"Cet utilisateur n'existe pas !"})
    }
    const espace = await Espace.findOne({libelle:espace})
    if(!espace){
        return res.status(404).json({message:"Cet espace n'existe pas !"})
    }
    const visite = await Visite.create({type,date,heure,nomUtilisateur,espace})
    return res.status(201).json({status:"valide",message:"Visite enregistré !",donnee:visite})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const afficherVisite = async (req,res)=>{
    try {
        const touteVisite = await Visite.find()
        if(touteVisite.length===0){
            return res.status(404).json({message:"Aucune visite !"})
        }
        return res.status(200).json({status:"valide",message:"Visite récupérées !",donnee:touteVisite})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const dateAfficherVisite = async (req,res)=>{
    const {date} = req.body
    if(!date){
        return res.status(404).json({message:"Aucune visite ne figure a cette date !"})
    }
    try {
        const visite = await Visite.find({date:date})
        if(visite.length===0){
            return res.status(404).json({message:"Aucune visite ne figure a cette date !"})
        }
        return res.status(200).json({status:"valide",message:`Les visites faites à la date du ${date} sont récupérées !`,donnee:visite})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const majVisite = async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(404).json({message:"Visite inexistante !"})
    }
    const {type,date,heure,nomUtilisateur} = req.body
    if(!type || !date || !heure || !nomUtilisateur){
        return res.status(400).json({message:"Tous les champs sont requis !"})
    }
    try {
        const utilisateur = await Utilisateur.findOne({nom:nomUtilisateur})
        if(!utilisateur){
            return res.status(404).json({message:"Cet utilisateur n'existe pas !"})
        }
    const visite =  await Visite.findByIdAndUpdate(id,{type,date,heure,nomUtilisateur},{new:true})
    return res.status(200).json({status:"valide",message:"Les données de la visite on été mise à jour",donnee:visite})
        
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const supprimerVisite=async(req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(404).json({message:"Visite inexistante !"})
    }
    try {
        const visite = await Visite.findById(id)
    if(!visite){
        return res.status(404).json({message:"Visite inexistante !"})
    }
    await Visite.findByIdAndDelete(id)
    return res.status(200).json({status:"valide",message:"Visite supprimé avec succès !"})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}
module.exports = {creation,afficherVisite,dateAfficherVisite,supprimerVisite,majVisite}