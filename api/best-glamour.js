export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {

    // 🔥 FORCE VALID DATA (no Carrd issues)
    const email = "test@gmail.com";
    const name = "Glamour User";

    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KORAPAY_SECRET_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 14000,
        currency: "NGN",
        reference: "glamour_" + Date.now(),

        customer: {
          email,
          name
        },

        redirect_url: "https://google.com" // change later
      })
    });

    const data = await response.json();

    // 🔥 RETURN FULL RESPONSE (NO GUESS)
    if (data && data.data && data.data.checkout_url) {
      return res.status(200).json({
        checkout_url: data.data.checkout_url
      });
    } else {
      return res.status(400).json({
        error: "No checkout url",
        raw: data
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: "Server crash"
    });
  }
}
