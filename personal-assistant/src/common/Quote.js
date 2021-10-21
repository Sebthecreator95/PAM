import React,{useEffect, useState} from "react";
import { Container, Navbar } from "react-bootstrap";
import quoteRequest from "../api/QuoteApi";
import "./Quote.css"


function Quote(){
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        async function getQuote() {
          try{
            let quote = await quoteRequest();
            setQuote(quote)
          }
          catch(err){
            console.error("App loadUserInfo: problem loading", err);
          }
        }
        getQuote();
      },[]);

    if (quote){
        return <Container>
             <Navbar className="Navigation navbar quote" sticky="bottom" >
                 <center>
                     <h6>{quote.title}</h6>
                     "{quote.quote}"
                     <div>
                     <small>-{quote.author}</small>
                     </div>
                 </center>
             </Navbar>
        </Container>
    }
    return(<>
    </>);
}

export default Quote;