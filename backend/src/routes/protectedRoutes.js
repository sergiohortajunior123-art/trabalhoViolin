import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export async function authMiddleware(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ error: "Não autorizado." });
  }

  req.user = session.user;
  next();
}