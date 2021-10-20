import axios from "axios";

async function quoteRequest(){
    try {
    let res = await axios("http://quotes.rest/qod.json");
    console.log(res.data.contents.quotes[0])
    return res.data.contents.quotes[0]
  } catch (err) {
    console.error("API Error:", err);
    let message = err;
    throw Array.isArray(message) ? message : [message];
  }
}
export default quoteRequest;