import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../Store/auth-context";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    // const loginObj = {
    //   enteredEmail,
    //   enteredPassword,
    // };
    // if (
    //   enteredEmail.length < 4 ||
    //   enteredPassword.length < 3
    // //   enteredConfirmPassword.length < 3
    // ) {
    //   let errorMessage = "Invalid Credentials";
    //   alert(errorMessage);
    // }
    // //  else if (enteredPassword !== enteredConfirmPassword) {
    // //   let errorMessage = "Password does not match !";
    // //   alert(errorMessage);
    // // }
    // else {
    //   setIsLoading(true);
    //   const response = await axios.post(
    //     "https://expense-tracker-b43a5-default-rtdb.firebaseio.com/.json",
    //     loginObj
    //   );

    //   console.log(response.data);
    //   console.log("User is Signed Up Successfully !");
    // }
    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
    }

     axios
        .post(url, {
            idToken: authCtx.token,
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
        }).then((res) => {
            console.log(res.data);
            setIsLoading(false);
            authCtx.login(res.data.idToken, res.data.email);
            localStorage.setItem("token", res.data.idToken);
            localStorage.setItem("email", res.data.email);
            
            let mail = res.data.email.replace('@', '').replace('.','');

            axios.post(`https://expense-tracker-b43a5-default-rtdb.firebaseio.com/userData/${mail}.json`,{
                idToken: authCtx.token,
                email: enteredEmail,
                password: enteredPassword
            }).then((response) => {
                console.log(response.data);
            })
            
        }).catch((err) => {
            console.log(err.message);
        })
  };
  return (
    <>
      <section className={classes.login}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input id="email" type="email" ref={emailRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input id="password" type="password" ref={passwordRef} />
          </div>
          {!isLogin && (
            <div className={classes.control}>
              <label htmlFor="confirm-password">Confirm Password</label>
              <input id="confirm-password" type="password" />
            </div>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>)}
              {!isLoading && (
                <Link to="/forgotpassword">{isLogin ? "Forgot Password ?" : ""}</Link>
              )}
            
            {isLoading && <p>Sending Request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchLoginModeHandler}
            >
              {isLogin ? "Create New Account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Login;