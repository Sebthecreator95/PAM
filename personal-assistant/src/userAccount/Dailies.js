import React from "react";
import { Container } from "reactstrap";
import "./Dailies.css";
import DeleteDaily from "./DeleteDaily";

function Dailies({dailies}){
  if(dailies.length ===0){
    return(
      <p>No Dailies Added Yet!</p>
    )
  }
  return(
  <Container className="dailies">
    <ul className="dailies-list">
      {dailies[0].map(daily =>(
      <li className="daily" key={daily.dailyid}>
        <b>{daily.text}</b>
        <DeleteDaily id={daily.dailyid}/>
      </li>
      )
      )
      }
    </ul>
  </Container>
  );
}

export default Dailies;