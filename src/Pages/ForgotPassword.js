import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthContext from "../Store/auth-context";
import classes from "./ForgotPassword.module.css";
import axios from "axios";

const ForgotPassword = () => {
    const authCtx = useContext(AuthContext);

    const sendingLinkHandler = () => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ', {
            email: authCtx.email,
            requestType: "PASSWORD_RESET"
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        })
    }

    return(
        <section className={classes.login}>
            <NavLink to="/forgotpassword"></NavLink>
            <h1>Login</h1>
            <div className={classes.control}>
                <label htmlFor="email">Enter the email with which you have registered</label>
                <input id="email" type="email" />
            </div>
            <div className={classes.actions}>
                <button onClick={sendingLinkHandler}>Send Link</button>
            </div>
            <div>
                <Link to="/login">Already a user? Login</Link>
            </div>
        </section>

    )
};

export default ForgotPassword;