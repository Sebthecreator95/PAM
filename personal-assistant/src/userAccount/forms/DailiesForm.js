import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import PamApi from "../../api/api";
import UserContext from "../../authentication/UserContext";
import Alert from "./Alert";

function DailiesForm({addDaily}){

    const { currentUser } = useContext(UserContext);
    const history = useHistory();

    const [formData, setFormData] = useState({
        text: "",
    });

    const [formErrors, setFormErrors] = useState([]);


    async function handleSubmit(evt) {
        evt.preventDefault();
        try{
        let userId= currentUser.userId;
        let result = await PamApi.addDaily(userId, formData);
        console.log(result);
        if(result.status){
          setFormErrors(result.data.error)
        }
        addDaily({...formData, userId});
        formData.text="";
        setFormData(formData);
        history.push(`/`);
        history.push(`/${currentUser.username}`)
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
          <textarea
          name="text"
          className="form-control"
          placeholder="add a daily"
          value={formData.text}
          onChange={handleChange}
          required
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

export default DailiesForm;