import React, {useContext} from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../authentication/UserContext";
import PamApi from "../api/api";

function DeleteEvent({id}){
    const { currentUser } = useContext(UserContext);
    const history = useHistory();
    async function handleSubmit(evt) {
        try{
        evt.preventDefault();
        await PamApi.deleteEvent(id);
        history.push(`/`);
        history.push(`/${currentUser.username}`);
        }catch(err){
            console.error(err)
        }
      }


    return(
    <form className="inline inline-form" onSubmit={handleSubmit}>
        <button
        className="btn btn-danger float-right"
        onSubmit={handleSubmit}
        >DELETE
        </button>
  </form>
    );

}
export default DeleteEvent