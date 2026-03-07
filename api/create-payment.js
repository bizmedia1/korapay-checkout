export default async function handler(req, res) {

const secret = process.env.KORAPAY_SECRET;

/* generate unique reference */
const reference = "ref_" + Date.now();

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
redirect_url: "https://yoursite.com/success",
customer: {
name: "Customer",
email: "customer@email.com"
}
})
});

const data = await response.json();

res.status(200).json(data);

}
