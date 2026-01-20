const jwt = require("jsonwebtoken")

const genererJWT = (res, utilisateur) => {
  const token = jwt.sign(
    { IdUtilisateur: utilisateur._id, type: utilisateur.type },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );

  const cookieName =
    utilisateur.type === "administrateur"
      ? "token_admin"
      : "token_employe";

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
module.exports= genererJWT