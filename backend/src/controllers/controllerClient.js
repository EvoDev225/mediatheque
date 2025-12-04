const Client = require("../model/schemaClient"); // Ajustez le chemin selon votre structure
const Visite = require("../model/schemaVisite"); // Ajustez le chemin selon votre structure

// Créer un nouveau client
const creerClient = async (req, res) => {
    try {
        const { nom, prenom, email, contact, visite } = req.body;

        // Vérifier si tous les champs requis sont présents
        if (!nom || !prenom || !email || !contact || !visite) {
            return res.status(400).json({ 
                message: "Tous les champs sont obligatoires" 
            });
        }


        // Vérifier si l'email existe déjà
        const clientExiste = await Client.findOne({ email });
        if (clientExiste) {
            return res.status(409).json({ 
                message: "Un client avec cet email existe déjà" 
            });
        }

        // Créer le nouveau client
        const nouveauClient = new Client({
            nom,
            prenom,
            email,
            contact,
            visite
        });

        await nouveauClient.save();

        res.status(201).json({
            status:'valide',
            message: "Client créé avec succès",
            donnee: nouveauClient
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

// Récupérer tous les clients
const obtenirTousLesClients = async (req, res) => {
    try {
        const clients = await Client.find().sort({ createdAt: -1 });
        if(clients.length===0){
            return res.status(404).json({message:"Aucun client trouvé !"})
        }
        res.status(200).json({
            status:"valide",
            message: "Clients récupérés avec succès",
            donnee:clients
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

// Récupérer un client par son ID
const obtenirClientParId = async (req, res) => {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message:"Client introuvable !"})
        }
    try {
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ 
                message: "Client non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Client récupéré avec succès",
            donnee:client
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur serveur", 
            erreur: error.message 
        });
    }
};

// Mettre à jour un client
const modifierClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nom, prenom, email, contact, visite } = req.body;
        if(!id){
            return res.status(400).json({message:"ID introuvable !"})
        }
        // Vérifier si le client existe
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).json({ 
                message: "Client non trouvé" 
            });
        }

        // Si la visite est modifiée, vérifier qu'elle existe
        if (visite && visite !== client.visite) {
            const visiteExiste = await Visite.findOne({ libelle: visite });
            if (!visiteExiste) {
                return res.status(404).json({ 
                    message: "La visite spécifiée n'existe pas" 
                });
            }
        }

        // Si l'email est modifié, vérifier qu'il n'est pas déjà utilisé
        if (email && email !== client.email) {
            const emailExiste = await Client.findOne({ email });
            if (emailExiste) {
                return res.status(409).json({ 
                    message: "Cet email est déjà utilisé par un autre client" 
                });
            }
        }

        // Mettre à jour le client
        const clientModifie = await Client.findByIdAndUpdate(
            id,
            { nom, prenom, email, contact, visite },
            { new: true }
        );

        res.status(200).json({
            status:"valide",
            message: "Client modifié avec succès",
            donnee: clientModifie
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la modification du client", 
            erreur: error.message 
        });
    }
};

// Supprimer un client
const supprimerClient = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            return res.status(400).json({message:"Client introuvable !"})
        }
        const client = await Client.findByIdAndDelete(id);

        if (!client) {
            return res.status(404).json({ 
                message: "Client non trouvé" 
            });
        }

        res.status(200).json({
            status:"valide",
            message: "Client supprimé avec succès"
        });

    } catch (error) {
        res.status(500).json({ 
            message: "Erreur lors de la suppression du client", 
            erreur: error.message 
        });
    }
};

module.exports = {
    creerClient,
    obtenirTousLesClients,
    obtenirClientParId,
    modifierClient,
    supprimerClient
};