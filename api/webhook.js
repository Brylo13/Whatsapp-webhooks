export default function handler(req, res) {
  if (req.method === "GET") {
    const verifyToken = "TU_TOKEN_AQUI";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
      if (mode === "subscribe" && token === verifyToken) {
        res.statusCode = 200;
        res.end(challenge);
      } else {
        res.statusCode = 403;
        res.end("Forbidden");
      }
    }
  } else if (req.method === "POST") {
    console.log("Body recibido:", req.body);

    res.statusCode = 200;
    res.end("EVENT_RECEIVED");
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
}
