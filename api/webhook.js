import { URL } from "url";

export default function handler(req, res) {
  if (req.method === "GET") {
    const VERIFY_TOKEN = "tu_token_secreto"; // cámbialo por el tuyo

    const url = new URL(req.url, `http://${req.headers.host}`);
    const mode = url.searchParams.get("hub.mode");
    const token = url.searchParams.get("hub.verify_token");
    const challenge = url.searchParams.get("hub.challenge");

    if (mode && token && mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  }

  return res.status(200).json({ ok: true, method: req.method });
}
