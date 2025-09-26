export default async function handler(req, res) {
  try {
    console.log("Método:", req.method);
    console.log("Headers:", req.headers);

    // En Vercel, a veces el body se parsea en req.body automáticamente
    console.log("Body:", req.body);

    return res.status(200).json({ ok: true, method: req.method });
  } catch (error) {
    console.error("Error en handler:", error);
    return res.status(500).json({ error: "Crash en webhook" });
  }
}
