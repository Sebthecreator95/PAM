import React, { useState, useContext } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import UserContext from "../authentication/UserContext";
import Alert from "../common/Alert";
import "./signupForm.css";

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to /companies route
 *
 * Routes -> SignupForm -> Alert
 * Routed as /signup
 */

function SignupForm({ signup }) {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
      "SignupForm",
      "signup=", typeof signup,
      "formData=", formData,
      "formErrors=", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if successful, redirect to /companies.
   */

  async function handleSubmit(evt) {
    evt.preventDefault();
    let result = await signup(formData);
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
    return <Redirect to={currentUser.username}/>;
  }

  return (
      <div className="SignupForm">
        <div className="large-empty-container">
        <div className="form-container" >
        <div className="imgcontainer">
          <img src="https://www.kindpng.com/picc/m/66-663423_virtual-assistant-png-transparent-png.png" alt="" />
          </div>
          <h2 className="mb-3">Sign Up</h2>
          <small> Already have an account? <Link to ="/login">Login</Link></small>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username  </label>
                  <input
                      name="username"
                      className="form-control"
                      value={formData.username}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Password  </label>
                  <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={formData.password}
                      onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>First name</label>
                  <input
                      name="firstName"
                      className="form-control"
                      value={formData.firstName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last name </label>
                  <input
                      name="lastName"
                      className="form-control"
                      value={formData.lastName}
                      onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email     </label>
                  <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                  />
                </div>

                {formErrors.length
                    ? <Alert type="danger" messages={formErrors} />
                    : null
                }

                <button
                    type="submit"
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

export default SignupForm;