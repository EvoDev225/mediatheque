const Service = require("../model/schemaService")

const creationService = async (req,res)=>{
        const {libelle} = req.body
        try {
            if(!libelle){
                return res.status(400).json({message:"Tous les champs sont requis !"})
        }
        const existe = await Service.findOne({libelle})
        if(existe){
            return res.status(400).json({message:"Ce service existe déja !"})
        }
        const service = await Service.create({libelle})
        await service.save()
        return res.status(201).json({status:"valide",message:"Le service est enregistré !"})
        } catch (error) {
            return res.status(500).json({message:"Erreur serveur",erreur:error.message})
        }    
}

const afficherService=async(req,res)=>{
    try {
        const toutService = await Service.find()
        if(toutService.length===0){
            return res.status(400).json({message:"Aucun service n'a été trouvé !"})
        }
        return res.status(200).json({status:"valide",message:"Tous les services sont récupérés !",donnee:toutService})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}

const majService = async (req,res)=>{
    const {id} = req.params
    const {libelle} = req.body
    if(!id){
        return res.status(400).json({message:"Service introuvable !"})
    }
    try {
        const service = await Service.findByIdAndUpdate({libelle})
        await service.save()
        return res.status(201).json({status:"valide",message:"Les données du service ont bien été mise à jour !",donnee:service})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}
const supprimerService = async (req,res)=>{
    const {id} = req.params
    if(!id){
        return res.status(400).json({message:"Service introuvable !"})
    }
    try {
        const service = await Service.findByIdAndDelete({id})
        return res.status(200).json({status:"valide",message:"Le  service ont bien été supprimé !",donnee:service})
    } catch (error) {
        return res.status(500).json({message:"Erreur serveur",erreur:error.message})
    }
}


module.exports = {creationService,afficherService,majService,supprimerService}
