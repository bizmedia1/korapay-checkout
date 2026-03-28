export default async function handler(req, res) {

res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
return res.status(200).end();
}

const secret = process.env.KORAPAY_SECRET;

const reference = "ref_" + Date.now();

try {

const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${secret}`
},
body: JSON.stringify({
reference: reference,
amount: 14500,
currency: "NGN",
redirect_url: "https://successpage.uwu.ai",
customer: {
name: "Celeste Customer",
email: "payment@celeste.com"
}
})
});

const data = await response.json();

res.status(200).json(data);

} catch (error) {

res.status(500).json({
error: "Payment creation failed",
details: error.message
});

}

}
