export default function handler(req, res) {
  if (req.method === "GET") {
    // ✅ Verificación de Webhook de Meta
    const VERIFY_TOKEN = "EAAZAItCNMOyQBPhgzGDeZCyoG5Cu2RpOvkRL4nteJM8yW07QshDoHKpXxx5COSM0SGNiQB8QIWq11ozrnBwTaQaSKhTvYmEpkka0ufgq9KeCWZCZCWhFcpRj2Q4HflaXmAZB1Pm4yPb2K28sy5UIk7v9qhrq3QwQE1kRWbLbiAh188iKig4u3BgiZAAvibywZAFtvnZCZBCFVPqOZCM5fI2f42TFgGsKJQkzZAAYyC7yCBy5wZDZD"; // cámbialo al registrarlo en Meta
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
    // ✅ Recepción de mensajes de WhatsApp
    try {
      console.log("📩 Webhook recibido:", JSON.stringify(req.body, null, 2));

      // Aquí podrías procesar el mensaje (ejemplo: texto, imagen, etc.)
      // Por ahora solo confirmamos que lo recibimos.
      return res.sendStatus(200);
    } catch (error) {
      console.error("❌ Error procesando webhook:", error);
      return res.sendStatus(500);
    }
  }

  // Si llega con otro método (PUT, DELETE, etc.)
  return res.sendStatus(405);
}
