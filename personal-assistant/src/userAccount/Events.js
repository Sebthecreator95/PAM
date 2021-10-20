import React,{useEffect, useState, useContext} from "react";
import PamApi from "../api/api";
import UserContext from "../authentication/UserContext";
import DeleteEvent from "./DeleteEvent";
import speak from "../common/speak";
import "./Events.css";


function Events({dateStringFormat}){

  let months ={
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  }
  
  function getMonth(dateStringFormat){
    let month = dateStringFormat.slice(0,3);
    return months[month];
  }


  const { currentUser } = useContext(UserContext);
  const [dateEvents, setDateEvents] = useState([]);

  useEffect(() => {
    async function getEventsByDate() {
        try{
          const month = getMonth(dateStringFormat);
          const day = dateStringFormat.slice(4,6);
          const year = dateStringFormat.slice(7,11);
          let userId = currentUser.userId;
          let dateEvents = await PamApi.getDateEvents(userId, month, day, year);
          setDateEvents(dateEvents);
          speak(`${dateEvents.length} events on ${dateStringFormat}`)
        } 
        catch(err){
        console.error("App loadUserInfo: problem loading", err);
      }
    }
    getEventsByDate();
  },[dateStringFormat]);

  if(dateEvents.length ===0){
    return(
      <p>
      No events on {dateStringFormat}
      </p>
    )
  }

  return(
    <div className ="events"> 
      { dateEvents.map(event => (
      <div className="event" key={event.id}>
        <div className="event-img">
          <img src={event.icon ? event.icon : "https://images.unsplash.com/photo-1633526543814-9718c8922b7a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXBwb2ludG1lbnQlMjBpY29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"} alt="icon"/>
        </div>
        <h1>{event.name}</h1><small>{event.date}</small>
        <h4>{event.time}</h4>
        <DeleteEvent id={event.id}/>
      </div>
      )
      )}
    </div>
    )
}
export default Events;