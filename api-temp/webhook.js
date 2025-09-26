// api/webhook.js
export default function handler(req, res) {
  if (req.method === "GET") {
    // Verificación de Meta (Facebook)
    const verify_token = "mi_token_secreto"; // cámbialo por el que uses en Meta
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === verify_token) {
      console.log("Webhook verificado!");
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    console.log("Webhook recibido:", req.body);
    res.sendStatus(200);
  }
}
