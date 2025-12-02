const {mailjs, mailVerifier, Reinitialisation, MotdepasseReinitialiser} = require('./mail');
require('dotenv').config()
const nodemailer = require("nodemailer")
const mailVerification = async (email,verificationJeton)=>{
try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // ← CORRIGÉ ICI
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, // Utilise un "Mot de passe d'application" Google
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Normalement ce serait l'email du destinataire
            subject: "Vérification de l'email",
            text: `Message reçu de: ${email} `,
            html: mailjs(email,verificationJeton), // ← CORRIGÉ ICI
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

const emailValide = async (email)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // ← CORRIGÉ ICI
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, // Utilise un "Mot de passe d'application" Google
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Normalement ce serait l'email du destinataire
            subject: "Email vérifié",
            text: `Message reçu de: ${email} `,
            html: mailVerifier(email), // ← CORRIGÉ ICI
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

const oublierMotdepasse = async (email,lienReinitialisation)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // ← CORRIGÉ ICI
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, // Utilise un "Mot de passe d'application" Google
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Normalement ce serait l'email du destinataire
            subject: "Email vérifié",
            text: `Message reçu de: ${email} `,
            html: Reinitialisation(email,lienReinitialisation   ), // ← CORRIGÉ ICI
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

const motdepasseChanger = async (email)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", // ← CORRIGÉ ICI
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD, // Utilise un "Mot de passe d'application" Google
            },
        });

        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Normalement ce serait l'email du destinataire
            subject: "Email vérifié",
            text: `Message reçu de: ${email} `,
            html: MotdepasseReinitialiser(email   ), // ← CORRIGÉ ICI
        });
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}

module.exports = {mailVerification,emailValide,oublierMotdepasse,motdepasseChanger}