import React, {useContext, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import UserContext from "../authentication/UserContext";
import useUpdateState from "../hooks/useUpdateState";
import CalendarSection from "./CalendarSection";
import DailiesSection from "./DailiesSection";
import EventsForm from "./forms/EventsForm";
import PamApi from "../api/api";
import "./UserAccount.css"


function UserAccount(){

const [events, updateEvents] = useUpdateState([]);
const { currentUser } = useContext(UserContext);
    useEffect(() => {
        async function getEvents() {
            try{
                let events = await PamApi.getEvents(currentUser.userId);
                updateEvents(events);
            } 
            catch(err){
            console.error("App loadUserInfo: problem loading", err);
          }
        }
        getEvents();
      },[]);

    return(
    <Container className="container">
        <Row className="user-account">
            <Col className="dailies-section" md={3}>
                <DailiesSection/>
            </Col>
            <Col className="calendar-section" md={6}>
                <CalendarSection />
            </Col>
            <Col className="right-side" md={3}>
                <h1 className="events-title"> Create Event</h1>
                <EventsForm className="event-form" createEvent={updateEvents}/>
            </Col>
        </Row>
    </Container>
);
}







export default UserAccount;