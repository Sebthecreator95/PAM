import React,{useEffect, useContext} from "react";
import { Container, Row, Col } from 'reactstrap';
import UserContext from "../authentication/UserContext";
import PamApi from "../api/api";
import DailiesForm from "./forms/DailiesForm";
import Dailies from "./Dailies";
import useUpdateState from "../hooks/useUpdateState";
import "./DailiesSection.css";

function DailiesSection(){
  const [dailies, updateDailies] = useUpdateState([]);
  const { currentUser } = useContext(UserContext);
  useEffect(() => {
    async function getDailies() {
      try{
        let userId =currentUser.userId
        let dailies = await PamApi.getDailies(userId);
        updateDailies(dailies);
      }
      catch(err){
        console.error("App loadUserInfo: problem loading", err);
      }
    }
    getDailies();
  });
    return(
    <Container className="dailies-section" fluid="md" >

       <Row >
        <Col>
          <h4 className="dailies-title">DAILIES</h4>
        </Col>
      </Row>
      <DailiesForm className="dailies-form" addDaily={updateDailies}/>
      <Dailies dailies={dailies}/> 
      
    </Container>
    );
}

export default DailiesSection;