import React from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
// import AuthContext from "../Store/auth-context";
import classes from "./Welcome.module.css";
import ExpenseForm from "../components/Expenses/ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../reduxStore/AuthReducer";

const Welcome = () => {
    // const authCtx = useContext(AuthContext);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);
    const token = useSelector((state) => state.auth.token);
    // const fullName = useSelector((state) => state.auth.fullName);
    // const profilePhoto = useSelector((state) => state.auth.profilePhoto);
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const logoutHandler = () => {
        // authCtx.logout();
        dispatch(authAction.updateAuthInfo({token: "", email:""}));
        localStorage.removeItem("exp_token");
        localStorage.removeItem("exp_email");
        localStorage.removeItem("email_token");
        localStorage.removeItem("expense_token");
        

    }

    const verifyEmailHandler = () => {
        fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',
            {
                method: 'POST',
                body: JSON.stringify({
                    // idToken: authCtx.token,
                    idToken: token,
                    requestType: "VERIFY_EMAIL",
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                if(res.ok){
                    return res.json();
                }else{
                        return res.json().then((data) => {
                        let errorMessage = 'verfication failed'
                        throw new Error(errorMessage);
                    })
                }
            }).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err.message);
            })
    }

  return (
    <React.Fragment>
      <NavLink to="/welcome" />
        <section className={classes.welcome}>
            <Row>
         <Col> <h1>Welcome To Expense Tracker !</h1></Col>
         <Col><h4>Your Profile is incomplete.
            <Link to="/profile" style={{textDecoration: "none"}}>Complete Now</Link></h4></Col>
          </Row>
        </section>
        <ExpenseForm />
      {isLoggedIn && <button className={classes.button1} onClick={logoutHandler}>Logout</button>}
      <div>
      <button className={classes.button2} onClick={verifyEmailHandler}>Verify Email</button>
      </div>
    </React.Fragment>
  );
};
export default Welcome;
