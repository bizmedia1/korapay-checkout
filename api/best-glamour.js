export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
      method: "POST",
      headers: {
        Authorization: "Bearer YOUR_SECRET_KEY",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: 14000,
        currency: "NGN",
        reference: "GLAMOUR_" + Date.now(),
        redirect_url: "https://google.com",
        customer: {
          name: "Glamour User",
          email: "test@gmail.com"
        }
      })
    });

    const data = await response.json();

    if (data.status === true) {
      return res.status(200).json({
        checkout_url: data.data.checkout_url
      });
    } else {
      return res.status(400).json({
        error: data.message || "Payment init failed"
      });
    }

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
