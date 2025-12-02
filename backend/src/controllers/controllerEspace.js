const Espace = require("../model/schemaEspace"); // Ajustez le chemin selon votre structure

// Créer un nouveau espace
const creerEspace = async (req, res) => {
    try {
        const { libelle } = req.body;

        // Vérifier si le libellé est présent
        if (!libelle) {
            return res.status(400).json({ 
                message: "Le libellé est obligatoire" 
            });
        }

        // Vérifier si l'espace existe déjà
        const espaceExiste = await Espace.findOne({ libelle });
        if (espaceExiste) {
            return res.status(409).json({ 
                message: "Un espace avec ce libellé existe déjà" 
            });
        }

        // Créer le nouvel espace
        const nouvelEspace = new Espace({ libelle });
        await nouvelEspace.save();

        res.status(201).json({
            status:'valide',
            message: "Espace créé avec succès",
            donnee: nouvelEspace
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la création de l'espace", 
            erreur: error.message 
        });
    }
};

// Récupérer tous les espaces
const obtenirTousLesEspaces = async (req, res) => {
    try {
        const espaces = await Espace.find().sort({ createdAt: -1 });
        if(espaces.length===0){
            return res.status(404).json({message:"Espaces introubles !"})
        }
        res.status(200).json({
            status:"valide",
            message: "Espaces récupérés avec succès",
            donnee: espaces
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération des espaces", 
            erreur: error.message 
        });
    }
};

// Récupérer un espace par son ID
const obtenirEspaceParId = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({message:"ID introuvable !"})
        }
        const espace = await Espace.findById(id);

        if (!espace) {
            return res.status(404).json({ 
                message: "Espace non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Espace récupéré avec succès",
            donnee:espace
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération de l'espace", 
            erreur: error.message 
        });
    }
};

// Mettre à jour un espace
const modifierEspace = async (req, res) => {
    const { id } = req.params;
    const { libelle } = req.body;
    try {
        
        if(!id){
            return res.status(404).json({message:"ID introuvable !"})
        }
        // Vérifier si l'espace existe
        const espace = await Espace.findById(id);
        if (!espace) {
            return res.status(404).json({ 
                message: "Espace non trouvé" 
            });
        }

        // Vérifier si le libellé est fourni
        if (!libelle) {
            return res.status(400).json({ 
                message: "Le libellé est obligatoire" 
            });
        }

        // Si le libellé est modifié, vérifier qu'il n'existe pas déjà
        if (libelle !== espace.libelle) {
            const libelleExiste = await Espace.findOne({ libelle });
            if (libelleExiste) {
                return res.status(409).json({ 
                    message: "Un espace avec ce libellé existe déjà" 
                });
            }
        }

        // Mettre à jour l'espace
        const espaceModifie = await Espace.findByIdAndUpdate(
            id,
            { libelle },
            { new: true }
        );

        res.status(200).json({
            status:'valide',
            message: "Espace modifié avec succès",
            donnee: espaceModifie
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la modification de l'espace", 
            erreur: error.message 
        });
    }
};

// Supprimer un espace
const supprimerEspace = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({message:"ID introuvable !"})
        }
        const espace = await Espace.findByIdAndDelete(id);

        if (!espace) {
            return res.status(404).json({ 
                message: "Espace non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Espace supprimé avec succès",
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la suppression de l'espace", 
            errreur: error.message 
        });
    }
};

module.exports = {
    creerEspace,
    obtenirTousLesEspaces,
    obtenirEspaceParId,
    modifierEspace,
    supprimerEspace
};