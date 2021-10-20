import React, { useState, useContext } from "react";
import { useHistory , Link, Redirect} from "react-router-dom";
import UserContext from "../authentication/UserContext";

import Alert from "../common/Alert";
import "./LoginForm.css"
/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to /companies route
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "LoginForm",
      "login=", typeof login,
      "formData=", formData,
      "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push(`/${formData.username}`);
    } else {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }
  if (currentUser) {
    return <Redirect to="/{curentUser.username}" />;
  }

  return (
      <div className="LoginForm">
        <div className="large-empty-container">
        <div className="container form-container">
        <div className="imgcontainer">
          <img src="https://www.kindpng.com/picc/m/66-663423_virtual-assistant-png-transparent-png.png" alt="" />
          </div>

          <h3 className="mb-3">Log In</h3>
          <small>
            Don't have an Account? <Link to="/signup">SignUp</Link>
          </small>

          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                      autoComplete="username"
                      required
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null}

                <button
                    className="btn btn-primary float-right"
                    onSubmit={handleSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
  );
}

export default LoginForm;
