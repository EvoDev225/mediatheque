const mailjs = (email, verificationJeton) => {
const verifyURL = `https://votre-site.com/verify?token=${verificationJeton}&email=${email}`;

return `
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Email de vérification</title>
</head>

<body style="margin:0; padding:0; background:#f4f4f7; font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 0;">
    <tr>
        <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:white; border-radius:12px; box-shadow:0 4px 20px rgba(0,0,0,0.1); padding:20px;">
<!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:10px;">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="60" alt="Logo" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="font-size:24px; font-weight:700; color:#333; padding-bottom:10px;">
              Vérification de votre email
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td align="center" style="font-size:15px; color:#555; line-height:1.5; padding:0 20px 25px;">
              Merci de vous être inscrit !<br />
              Pour activer votre compte, veuillez vérifier votre adresse email.
            </td>
          </tr>

          <!-- Email Display -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <div style="background:#f0f0f5; padding:12px 18px; border-radius:8px; font-size:14px; color:#444; font-weight:600;">
                ${email}
              </div>
            </td>
          </tr>

          <!-- Button -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="${verifyURL}" 
                 style="display:inline-block; background:#4f46e5; color:white; text-decoration:none; 
                 padding:14px 28px; border-radius:6px; font-size:16px; font-weight:600;">
                Vérifier mon email
              </a>
            </td>
          </tr>

          <!-- Code Section -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <div style="font-size:14px; color:#777; margin-bottom:6px;">Code de vérification :</div>
              <div style="background:#eeeeee; padding:10px 15px; border-radius:6px; font-family:monospace; font-size:15px; color:#333;">
                ${verificationJeton}
              </div>
            </td>
          </tr>

          <!-- Link fallback -->
          <tr>
            <td align="center" style="padding:25px 20px; font-size:13px; color:#777; line-height:1.4;">
              Si le bouton ne fonctionne pas, cliquez ici :<br />
              <a href="${verifyURL}" style="color:#4f46e5;">${verifyURL}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="font-size:12px; color:#999; padding-top:10px;">
              Si vous n'avez pas demandé cet email, ignorez-le.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

const mailVerifier = (email) => {
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Vérifié</title>
</head>

<body style="margin:0; padding:0; background:#f3f4f6; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:white; padding:30px; border-radius:12px; box-shadow:0 4px 25px rgba(0,0,0,0.08);">

          <!-- Icon -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <img src="https://img.icons8.com/color/96/000000/checked--v1.png" width="80" height="80" alt="Success" />
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td align="center" style="font-size:26px; font-weight:700; color:#1f2937; padding-bottom:10px;">
              Email vérifié avec succès !
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td align="center" style="font-size:15px; color:#4b5563; line-height:1.6; padding:0 20px 25px;">
              Félicitations 🎉 <br />
              Votre adresse email a été vérifiée. Vous pouvez maintenant accéder à toutes les fonctionnalités de votre compte.
            </td>
          </tr>

          <!-- Email Display -->
          <tr>
            <td align="center" style="padding-bottom:25px;">
              <div style="background:#eef2ff; border-left:4px solid #4f46e5; padding:14px 18px; border-radius:6px; font-size:15px; font-weight:600; color:#4338ca;">
                ${email}
              </div>
            </td>
          </tr>

          <!-- Optional Button -->
          <tr>
            <td align="center" style="padding-bottom:30px;">
              <a href="https://votre-site.com/dashboard"
                 style="display:inline-block; background:#4f46e5; color:white; text-decoration:none;
                 padding:14px 32px; font-size:17px; border-radius:8px; font-weight:600;">
                Accéder à mon compte
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="font-size:13px; color:#9ca3af; padding-top:10px;">
              Merci d'avoir rejoint notre communauté ❤️
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};

const Reinitialisation = (email, lien) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background:#f5f5f5;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">

                <h2 style="color: #333; text-align: center;">Réinitialisation de votre mot de passe</h2>

                <p style="font-size: 16px; color: #555;">
                    Bonjour <strong>${email}</strong>,
                </p>

                <p style="font-size: 16px; color: #555;">
                    Nous avons reçu une demande pour réinitialiser votre mot de passe.  
                    Si vous êtes à l’origine de cette demande, cliquez sur le bouton ci-dessous :
                </p>

                <div style="text-align: center; margin: 30px 0;">
                    <a href="${lien}" 
                       style="background: #007bff; color: white; padding: 12px 18px; 
                              text-decoration: none; border-radius: 6px; font-size: 16px;">
                        Réinitialiser mon mot de passe
                    </a>
                </div>

                <p style="font-size: 15px; color: #666;">
                    Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :
                </p>

                <p style="word-wrap: break-word; color: #007bff;">${lien}</p>

                <br>

                <p style="font-size: 14px; color: #999;">
                    Si vous n'avez pas demandé cette réinitialisation, vous pouvez ignorer cet email.
                </p>

                <p style="font-size: 14px; color: #666;">
                    Cordialement,<br>
                    <strong>L’équipe de sécurité</strong>
                </p>
            </div>
        </div>
    `;
};

const MotdepasseReinitialiser = (email) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; background:#f5f5f5;">
            <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px;">

                <h2 style="color: #333; text-align: center;">Votre mot de passe a été réinitialisé</h2>

                <p style="font-size: 16px; color: #555;">
                    Bonjour <strong>${email}</strong>,
                </p>

                <p style="font-size: 16px; color: #555;">
                    Nous vous confirmons que votre mot de passe a été réinitialisé avec succès.
                </p>

                <p style="font-size: 16px; color: #555;">
                    Si vous êtes bien à l'origine de cette action, vous pouvez dès maintenant 
                    vous connecter avec votre nouveau mot de passe.
                </p>

                <p style="font-size: 16px; color: #d9534f;">
                    ⚠️ Si vous n'êtes PAS à l'origine de cette modification, veuillez changer votre mot de passe immédiatement
                    et contacter notre support.
                </p>

                <br>

                <p style="font-size: 14px; color: #666;">
                    Cordialement,<br>
                    <strong>L’équipe de sécurité</strong>
                </p>
            </div>
        </div>
    `;
};
const TemplateDemandeLivre = (email) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 30px;">
                
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 40px; color: #4a6fa5; margin-bottom: 10px;">📚</div>
                    <h1 style="color: #333; margin: 0;">Demande de livre confirmée</h1>
                </div>
                
                <p style="font-size: 16px; color: #555; line-height: 1.6;">
                    Nous avons bien reçu votre demande de livre envoyée depuis l'adresse 
                    <strong style="color: #4a6fa5;">${email}</strong>.
                </p>
                
                <div style="background: #f8f9fa; border-radius: 6px; padding: 20px; margin: 25px 0; border-left: 4px solid #4a6fa5;">
                    <p style="margin: 0; color: #4a6fa5; font-weight: bold; font-size: 18px;">
                        ✔️ Demande prise en compte
                    </p>
                    <p style="margin: 10px 0 0; color: #666;">
                        Notre équipe examinera votre demande et vous répondra dans les plus brefs délais.
                    </p>
                </div>
                
                <p style="font-size: 15px; color: #666;">
                    Merci pour votre confiance et votre intérêt pour notre bibliothèque.
                </p>
                
                <p style="font-size: 14px; color: #888; margin-top: 40px;">
                    Bien cordialement,<br>
                    <strong>Service des demandes - Bibliothèque</strong>
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <p style="font-size: 12px; color: #999; text-align: center;">
                    Ceci est un message automatique. Pour toute question, contactez-nous à contact@bibliotheque.fr
                </p>
            </div>
        </div>
    `;
};




module.exports = {mailjs,mailVerifier,Reinitialisation,MotdepasseReinitialiser,TemplateDemandeLivre}
