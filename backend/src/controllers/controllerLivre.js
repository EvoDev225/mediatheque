const Livre = require("../model/schemaLivre"); // Ajustez le chemin selon votre structure
// Créer un nouveau livre
const creerLivre = async (req, res) => {
    try {
        const { 
            code, 
            img,
            numero, 
            titre, 
            auteur, 
            lieuEdition, 
            dateEdition, 
            origine, 
            quantite, 
            dateEnregistrement, 
            status, 
            categorie,
            type
        } = req.body;

        // Vérifier si tous les champs requis sont présents
        if (!code || !numero || !titre || !auteur || !lieuEdition || !dateEdition || 
            !origine || !quantite || !dateEnregistrement || !status || !categorie || !type) {
            return res.status(400).json({ 
                message: "Tous les champs sont obligatoires" 
            });
        }

        // Vérifier si un livre avec ce code existe déjà
        const livreExiste = await Livre.findOne({ code });
        if (livreExiste) {
            return res.status(409).json({ 
                message: "Un livre avec ce code existe déjà" 
            });
        }

        // Créer le nouveau livre
        const nouveauLivre = new Livre({
            code,
            numero,
            img,
            titre,
            auteur,
            lieuEdition,
            dateEdition,
            origine,
            quantite,
            dateEnregistrement,
            status,
            categorie,
            type
        });

        await nouveauLivre.save();

        res.status(201).json({
            status:"valide",
            message: "Livre créé avec succès",
            donnee: nouveauLivre
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la création du livre", 
            erreur: error.message 
        });
    }
};

// Récupérer tous les livres
const obtenirTousLesLivres = async (req, res) => {
    try {
        const livres = await Livre.find().sort({ createdAt: -1 });
        if(livres.length===0){
            return res.status(400).json({message:"Aucun livre n'a été trouve !"})
        }
        res.status(200).json({
            status:"valide",
            message: "Livres récupérés avec succès",
            donnee:livres
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération des livres", 
            erreur: error.message 
        });
    }
};

// Récupérer un livre par son ID
const obtenirLivreParId = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(404).json({message:"ID introuvale !"})
        }
        const livre = await Livre.findById(id);
        if (!livre) {
            return res.status(404).json({ 
                message: "Livre non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Livre récupéré avec succès",
            donnee:livre
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération du livre", 
            erreur: error.message 
        });
    }
};

// Récupérer un livre par son code
const obtenirLivreParCode = async (req, res) => {
    try {
        const { code } = req.params;
        if(!code){
            return res.status(404).json({message:"Aucun livre ne correspon a ce code"})
        }
        const livre = await Livre.findOne({ code: parseInt(code) });

        if (!livre) {
            return res.status(404).json({ 
                message: "Livre non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Livre récupéré avec succès",
            donnee:livre
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération du livre", 
            erreur: error.message 
        });
    }
};

// Récupérer les livres par catégorie
const obtenirLivresParCategorie = async (req, res) => {
    try {
        const { categorie } = req.params;
        if(!categorie){
            return res.status(404).json({message:"Cette catégorie de livre n'existe pas !"})
        }
        const livres = await Livre.find({ categorie }).sort({ createdAt: -1 });

        res.status(200).json({
            status:'valide',
            message: "Livres récupérés avec succès",
            donnee: livres
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération des livres", 
            erreur: error.message 
        });
    }
};

// Récupérer les livres par status
const obtenirLivresParStatus = async (req, res) => {
    try {
        const { status } = req.params;
        if(!status){
            return res.status(404).json({message:"Ce status n'existe pas !"})
        }
        const livres = await Livre.find({ status }).sort({ createdAt: -1 });
        res.status(200).json({
            status:"valide",
            message: "Livres récupérés avec succès",
            donnee: livres
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la récupération des livres", 
            erreur: error.message 
        });
    }
};

// Rechercher des livres par titre ou auteur
const rechercherLivres = async (req, res) => {
    try {
        const { recherche } = req.query;

        if (!recherche) {
            return res.status(400).json({ 
                message: "Le terme de recherche est obligatoire" 
            });
        }

        const livres = await Livre.find({
            $or: [
                { titre: { $regex: recherche, $options: 'i' } },
                { auteur: { $regex: recherche, $options: 'i' } }
            ]
        }).sort({ createdAt: -1 });

        res.status(200).json({
            status:'valide',
            message: "Recherche effectuée avec succès",
            total: livres
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la recherche des livres", 
            erreur: error.message 
        });
    }
};

// Mettre à jour un livre
const modifierLivre = async (req, res) => {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message:"ID introuvable !"})
        }
    try {
        const { 
            code, 
            numero, 
            titre, 
            auteur, 
            lieuEdition, 
            dateEdition, 
            origine, 
            quantite, 
            dateEnregistrement, 
            status, 
            categorie,
            type
        } = req.body;

        // Vérifier si le livre existe
        const livre = await Livre.findById(id);
        if (!livre) {
            return res.status(404).json({ 
                message: "Livre non trouvé" 
            });
        }

        // Si le code est modifié, vérifier qu'il n'existe pas déjà
        if (code && code !== livre.code){
            const codeExiste = await Livre.findOne({ code });
            if (codeExiste) {
                return res.status(409).json({ 
                    message: "Un livre avec ce code existe déjà" 
                });
            }
        }

        // Mettre à jour le livre
        const livreModifie = await Livre.findByIdAndUpdate(
            id,
            { 
                code, 
                numero, 
                titre, 
                auteur, 
                lieuEdition, 
                dateEdition, 
                origine, 
                quantite, 
                dateEnregistrement, 
                status, 
                categorie,
                type
            },
            { new: true }
        );

        res.status(200).json({
            status:"valide",
            message: "Livre modifié avec succès",
            donnee: livreModifie
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la modification du livre", 
            erreur: error.message 
        });
    }
};

// Supprimer un livre
const supprimerLivre = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message:"ID introuvable !"})
        }
        const livre = await Livre.findByIdAndDelete(id);
        if (!livre) {
            return res.status(404).json({ 
                message: "Livre non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Livre supprimé avec succès",
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la suppression du livre", 
            erreur: error.message 
        });
    }
};

module.exports = {
    creerLivre,
    obtenirTousLesLivres,
    obtenirLivreParId,
    obtenirLivreParCode,
    obtenirLivresParCategorie,
    obtenirLivresParStatus,
    rechercherLivres,
    modifierLivre,
    supprimerLivre
}