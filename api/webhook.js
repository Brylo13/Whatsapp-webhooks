export default async function handler(req, res) {
  console.log("Método:", req.method);
  console.log("Headers:", req.headers);

  if (req.method === "GET") {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verificado correctamente ✅");
      return res.status(200).send(challenge);
    } else {
      console.error("Error de verificación ❌");
      return res.sendStatus(403);
    }
  }

  if (req.method === "POST") {
    try {
      // 🔥 parsear body manualmente
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      console.log("Body recibido:", body);

      // ejemplo de respuesta básica
      return res.status(200).send("EVENT_RECEIVED");
    } catch (error) {
      console.error("Error al procesar POST:", error);
      return res.status(500).send("Error en el servidor");
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
