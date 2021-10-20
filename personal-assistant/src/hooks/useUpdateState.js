import { useState } from "react";



//custom hook
// adds object to array of objects
//mainly used to update database
function useUpdate(initialVal) {

    const [values, updateValues] = useState(initialVal);
 

    function update(newValue) {
        updateValues(values => ([...values, newValue]));
    };

    return [values, update];
}

export default useUpdate;