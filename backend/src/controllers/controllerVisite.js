const Visite = require("../model/schemaVisite")
const Utilisateur = require('../model/schemaUtilisateur')
const Espace = require("../model/schemaEspace")
const creation = async (req, res) => {
    const { type, date, heure, nomUtilisateur, nomEspace } = req.body;
    
    if (!type || !date || !heure || !nomUtilisateur || !nomEspace) {
        return res.status(400).json({ message: "Tous les champs sont requis !" });
    }

    try {
        // ========== VALIDATION DU FORMAT DE DATE jj/mm/aaaa ==========
        // Regex pour valider le format jj/mm/aaaa
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        
        if (!dateRegex.test(date)) {
            return res.status(400).json({ 
                message: "Format de date invalide. Utilisez le format jj/mm/aaaa" 
            });
        }

        // Vérification que la date est valide (ex: pas 31/02/2023)
        const parts = date.split('/');
        const jour = parseInt(parts[0], 10);
        const mois = parseInt(parts[1], 10) - 1; // Mois 0-indexé en JS
        const annee = parseInt(parts[2], 10);
        
        const dateObj = new Date(annee, mois, jour);
        
        if (dateObj.getDate() !== jour || 
            dateObj.getMonth() !== mois || 
            dateObj.getFullYear() !== annee) {
            return res.status(400).json({ 
                message: "Date invalide. Vérifiez le jour, mois et année." 
            });
        }

        // Optionnel : Vérifier que la date n'est pas dans le futur
        const aujourdhui = new Date();
        aujourdhui.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparaison
        if (dateObj > aujourdhui) {
            return res.status(400).json({ 
                message: "La date ne peut pas être dans le futur" 
            });
        }
        // ========== FIN DE LA VALIDATION ==========

        // Vérification de l'existence de l'utilisateur
        const utilisateur = await Utilisateur.findOne({ nom: nomUtilisateur });
        if (!utilisateur) {
            return res.status(404).json({ message: "Cet utilisateur n'existe pas !" });
        }

        // Vérification de l'existence de l'espace
        const espace = await Espace.findOne({ libelle: nomEspace });
        if (!espace) {
            return res.status(404).json({ message: "Cet espace n'existe pas !" });
        }

        // Création de la visite - la date est déjà au format jj/mm/aaaa
        const visite = await Visite.create({ 
            type, 
            date, // Format jj/mm/aaaa
            heure, 
            nomUtilisateur, 
            nomEspace 
        });

        return res.status(201).json({ 
            status: "valide", 
            message: "Visite enregistrée !", 
            donnee: visite 
        });

    } catch (error) {
        console.error("Erreur création visite:", error);
        
        // Gestion spécifique des erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: "Erreur de validation des données", 
                erreurs: messages 
            });
        }
        
        return res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

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
const afficherVisiteParId = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Vérifier si l'ID est fourni
        if (!id) {
            return res.status(400).json({ message: "L'ID de la visite est requis" });
        }

        // Vérifier si l'ID est valide (format MongoDB ObjectId)

        // Rechercher la visite par ID
        const visite = await Visite.findById(id);

        // Vérifier si la visite existe
        if (!visite) {
            return res.status(404).json({ message: "Visite non trouvée" });
        }

        // Retourner la visite trouvée
        return res.status(200).json({ 
            status: "valide", 
            message: "Visite récupérée avec succès", 
            donnee: visite 
        });

    } catch (error) {
        console.error("Erreur lors de la récupération de la visite:", error);
        return res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

const dateAfficherVisite = async (req, res) => {
    const { date } = req.body;
    
    if (!date) {
        return res.status(400).json({ 
            message: "La date est requise pour la recherche" 
        });
    }
    
    try {
        // Valider que la date est au format jj/mm/aaaa
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        
        if (!dateRegex.test(date)) {
            return res.status(400).json({ 
                message: "Format de date invalide. Utilisez le format jj/mm/aaaa" 
            });
        }

        // Recherche exacte par date (string jj/mm/aaaa)
        const visite = await Visite.find({ date: date });
        
        if (visite.length === 0) {
            return res.status(404).json({ 
                message: `Aucune visite trouvée pour le ${date}` 
            });
        }
        
        return res.status(200).json({ 
            status: "valide", 
            message: `Visites du ${date} récupérées !`, 
            donnee: visite 
        });
        
    } catch (error) {
        return res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

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
module.exports = {creation,afficherVisite,dateAfficherVisite,supprimerVisite,majVisite,afficherVisiteParId}