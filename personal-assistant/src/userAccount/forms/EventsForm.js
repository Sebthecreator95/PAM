import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../authentication/UserContext";
import PamApi from "../../api/api";
import Alert from "./Alert";


function EventsForm({createEvent}){

    const { currentUser } = useContext(UserContext);
    const history = useHistory();
    const [formData, setFormData] = useState({
        name: "",
        time: "",
        date: "",
        icon: "",
    });

    const [formErrors, setFormErrors] = useState([]);


    async function handleSubmit(evt) {
        evt.preventDefault();
        try{
        let userId= currentUser.userId;
        let result = await PamApi.addEvent(userId, formData);
        console.log(result)
        createEvent(formData);
        formData.name="";
        formData.time="";
        formData.date="";
        formData.icon="";
        setFormData(formData);
        history.push(`/`);
        history.push(`/${currentUser.username}`);
        }
        catch(err){
          setFormErrors(err)
        }
      }
    
      /** Update form data field */
      function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(formData => ({ ...formData, [name]: value }));
      }

    return(
    <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
          required
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>Time</label>
            <input
            name="time"
            type="time"
            className="form-control"
            value={formData.time}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Date</label>
            <input
            required
            name="date"
            type="date"
            min="2000-01-01" 
            max="2050-12-31"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
            <label>Icon</label>
            <input
            name="icon"
            className="form-control"
            value={formData.icon}
            onChange={handleChange}
            />
        </div>
        {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }
        <button
        className="btn btn-primary float-right"
        onSubmit={handleSubmit}
        >
            Submit
        </button>
  </form>
    );
}

export default EventsForm;