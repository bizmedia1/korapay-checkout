export default async function handler(req, res) {

  const { reference } = req.query;
  const secret = process.env.KORAPAY_SECRET;

  if(!reference){
    return res.status(400).json({ error: "No reference provided" });
  }

  try{

    const response = await fetch(`https://api.korapay.com/merchant/api/v1/charges/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret}`
      }
    });

    const data = await response.json();

    if(data?.data?.status === "success"){
      return res.status(200).json({ status: "success", data });
    }else{
      return res.status(200).json({ status: "failed", data });
    }

  }catch(error){

    return res.status(500).json({
      error: "Verification failed",
      details: error.message
    });

  }

}
