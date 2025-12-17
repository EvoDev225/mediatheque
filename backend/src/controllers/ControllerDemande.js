const { EnvoyerDemande } = require("../mail/mailVerification")
const Demande = require("../model/schemaDemande")



// 1. Afficher toutes les demandes
const AfficherDemandes = async (req, res) => {
    try {
        const demandes = await Demande.find().sort({ createdAt: -1 })
        if(demandes.length===0){
            return res.status(404).json({message:"Aucune demande trouvé !"})
        }
        return res.status(200).json({
            status: "valide",
            message: "Demandes récupérées avec succès !",
            donnee: demandes,
            count: demandes.length
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "invalide",
            message: "Une erreur est survenue lors de la récupération des demandes !"
        })
    }
}



// 3. Créer une nouvelle demande
const CreerDemande = async (req, res) => {
    try {
        const { nom, email, titre, message } = req.body
        
        // Validation des champs requis
        if (!nom || !email || !titre || !message) {
            return res.status(400).json({
                status: "invalide",
                message: "Tous les champs sont obligatoires !"
            })
        }
        
        
        // Création de la demande
        const nouvelleDemande = new Demande({
            nom,
            email,
            titre,
            message
        })
        
        const demandeSauvegardee = await nouvelleDemande.save()
        EnvoyerDemande(email)
        return res.status(201).json({
            status: "valide",
            message: "Demande envoyéé avec succès !",
            donnee: demandeSauvegardee
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "invalide",
            message: "Une erreur est survenue lors de la création de la demande !"
        })
    }
}



// 5. Supprimer une demande
const SupprimerDemande = async (req, res) => {
    try {
        const { id } = req.params
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: "invalide",
                message: "ID de demande invalide !"
            })
        }
        
        const demandeSupprimee = await Demande.findByIdAndDelete(id)
        
        if (!demandeSupprimee) {
            return res.status(404).json({
                status: "invalide",
                message: "Demande non trouvée !"
            })
        }
        
        return res.status(200).json({
            status: "valide",
            message: "Demande supprimée avec succès !",
            donnee: demandeSupprimee
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: "invalide",
            message: "Une erreur est survenue lors de la suppression de la demande !"
        })
    }
}

module.exports = {AfficherDemandes,CreerDemande,SupprimerDemande}