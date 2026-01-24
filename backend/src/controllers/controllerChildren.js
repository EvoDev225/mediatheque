const Child = require ("../model/schemaChildren")
const getAllChildren = async (req,res)=>{
    try {
        const child = await Child.find().sort({createdAt: -1})
        if(child.length===0){
            return res.status(404).json({message:"Aucune donnée existante !"})
        }
        return res.status(200).json({status:"valide",message:"Donnée récupérée avec succès !",donnee:child})
    } catch (error) {
        console.log("erreur",error)
        return res.status(500).json({message:"Une erreur est survenue !",error:error})
    }
}
const newChildren = async (req,res)=>{
    try {
        const {nom,prenom,date,numeroParent,classe}= req.body
        if(!nom || !prenom || !date || ! numeroParent || !classe){
            return res.status(400).json({message:"Veuillez renseigner le(s) champ(s) manquant(s) !"})
        }
        const oneChild = await Child.findOne({nom},{prenom})
        if(oneChild){
            return res.status(409).json({message:"Cet enfant est déjà enregistré ! "})
        }
        const child = new Child({
            nom,
            prenom,
            date,
            numeroParent,
            classe
        }) 
        await child.save()
        return res.status(201).json({status:"valide",message:"Donnée enregistrée avec succès !",donnee:child})

    } catch (error) {
        console.log("erreur",error)
        return res.status(500).json({message:"Une erreur est survenue !",error:error})
    }
}

const deleteChildren = async (req,res)=>{
    try {
    const {id} =req.params
        if(!id){
            return res.status(400).json({message:"Identifiant introuvable !"})
        }
        const child = await Child.findByIdAndDelete(id)
        if(!child){
            return res.statsu(400).json({message:"Enfant non trouvé !"})
        }
        return res.status(200).json({status:"valide",message:"Les données ont été supprimé avec succès !"})
    } catch (error) {
        console.log("erreur",error)
        return res.status(500).json({message:"Une erreur est survenue !",error:error})
    }
}

const editChildren = async (req,res)=>{
    const {id} = req.params
    try {
        if(!id){
            return res.status(400).json({message:"Identifiant introuvable"})
        }
        const {nom,prenom,date,numeroParent,classe}= req.body
        const child = await Child.findByIdAndUpdate(id,
            {nom,prenom,date,numeroParent,classe},{new:true}
        )
        res.status(200).json({
            status:"valide",
            message: "Les données ont été modifié avec succès !",
            donnee: child
        });
    } catch (error) {
        console.log("erreur",error)
        return res.status(500).json({message:"Une erreur est survenue !",error:error})
    }
}



module.exports = {getAllChildren,newChildren,deleteChildren,editChildren}