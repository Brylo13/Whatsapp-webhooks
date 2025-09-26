export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "tu_token_secreto"; // pon aquí tu token
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  return res.status(200).json({ ok: true, method: req.method });
}
