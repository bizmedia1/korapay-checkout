export default async function handler(req, res) {

const secret = process.env.KORAPAY_SECRET;

const response = await fetch("https://api.korapay.com/merchant/api/v1/charges/initialize", {
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${secret}`
},
body: JSON.stringify({
amount: 14500,
currency: "NGN",
redirect_url: "https://celestesuccesspage.uwu.ai",
customer: {
name: "Customer",
email: "kbigbizz@gmail.com"
}
})
});

const data = await response.json();

res.status(200).json(data);

} 
