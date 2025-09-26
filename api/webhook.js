export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "tu_token_secreto";
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    try {
      console.log("Webhook recibido:", JSON.stringify(req.body, null, 2));
      return res.sendStatus(200);
    } catch (error) {
      console.error("Error procesando webhook:", error);
      return res.sendStatus(500);
    }
  }

  return res.sendStatus(405);
}
