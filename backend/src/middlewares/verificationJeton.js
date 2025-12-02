// middlewares/verificationJeton.js
const jwt = require("jsonwebtoken");
const Utilisateur = require("../model/schemaUtilisateur");

const verificationJeton = async (req, res, next) => {
  try {
    // 1) req.cookies doit exister (cookie-parser)
    if (!req.cookies) {
      return res.status(401).json({ message: "Cookies non présents. Assurez-vous que cookie-parser est utilisé." });
    }

    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Non autorisé : token manquant." });
    }

    // 2) decode le token (version synchrone)
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3) assigner l'ID (selon ce que tu as signé)
    req.IdUtilisateur = decoded.IdUtilisateur || decoded.userID || decoded.id;

    // 4) récupérer l'objet utilisateur et le stocker pour verifierAdmin etc.
    const utilisateur = await Utilisateur.findById(req.IdUtilisateur);
    if (!utilisateur) {
      return res.status(401).json({ message: "Utilisateur introuvable." });
    }

    req.utilisateur = utilisateur;
    next();
  } catch (error) {
    console.error("Erreur verificationJeton :", error.message || error);
    return res.status(401).json({ status: "echec", message: "Token invalide ou expiré" });
  }
};

const verifierAdmin = (req, res, next) => {
  // verifierAdmin attend maintenant req.utilisateur (objet)
    
  if (!req.utilisateur || req.utilisateur.type !== "administrateur") {
    return res.status(403).json({ message: "Accès refusé. Administrateur requis." });
  }
  
  next();
};

module.exports = { verificationJeton, verifierAdmin };
