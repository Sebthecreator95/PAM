import React, { useState} from "react";
import { Container, Row, Col } from 'reactstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./CalendarSection.css";
import Events from "./Events";
//<Events dateStringFormat={dateStringFormat}/>




function CalendarSection(){
  const [date, setDate] = useState(new Date());
  const dateStringFormat = date.toString().slice(4,15)

    return(
    <Container fluid="md">
      <Row>
        <Col>
        <h3 className="date" >{dateStringFormat}</h3>
        </Col>
      </Row>
      <Calendar
      onChange={setDate}
      value={date} />
      <Events dateStringFormat={dateStringFormat}/>
      
      
    </Container>
    );
}
export default CalendarSection;