import React, { useContext, useRef, useState } from "react";
// import AuthContext from "../../Store/auth-context";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../reduxStore/AuthReducer";

const Login = () => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const switchLoginModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    if (!isLogin) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;

      if (email === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields");
      } else if (confirmPassword !== password) {
        alert("Passwords don't match");
      } else {
        try {
          const res = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ`,
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              header: {
                "Content-Type": "application/json",
              },
            }
          );
          if (res.ok) {
            setIsLoading(false);
            alert("Sign up Successful");
          } else {
            const data = await res.json();
            console.log(data.error.message);
            alert(data.error.message);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      }
    } else {
      try {
        const res = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ`,
          {
            method: "POST",
            body: JSON.stringify({
              email: emailRef.current.value,
              password: passwordRef.current.value,
              returnSecureToken: true,
            }),
            header: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.ok) {
          setIsLoading(false);
          alert("User authenticated successfully");

          const data = await res.json();
          console.log("auth token: ", data.idToken);

          dispatch(
            authAction.updateAuthInfo({
              token: data.idToken,
              email: emailRef.current.value,
            })
          );
        } else {
          const data = await res.json();
          alert(data.error.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
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
              <input id="confirm-password" type="password" ref={confirmPasswordRef} />
            </div>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? "Login" : "Create Account"}</button>
            )}
            {!isLoading && (
              <Link to="/forgotpassword">
                {isLogin ? "Forgot Password ?" : ""}
              </Link>
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

// const enteredEmail = emailRef.current.value;
// const enteredPassword = passwordRef.current.value;

// setIsLoading(true);
// let url;
//     if (isLogin) {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
//     } else {
//       url =
//         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";
//     }

//      axios
//         .post(url, {
//             idToken: authCtx.token,
//             email: enteredEmail,
//             password: enteredPassword,
//             returnSecureToken: true,
//         }).then((res) => {
//             console.log(res.data);
//             setIsLoading(false);
//             authCtx.login(res.data.idToken, res.data.email);
//             localStorage.setItem("token", res.data.idToken);
//             localStorage.setItem("email", res.data.email);

//             let mail = res.data.email.replace('@', '').replace('.','');

//             axios.post(`https://expense-tracker-b43a5-default-rtdb.firebaseio.com/userData/${mail}.json`,{
//                 idToken: authCtx.token,
//                 email: enteredEmail,
//                 password: enteredPassword
//             }).then((response) => {
//                 console.log(response.data);
//             })

//         }).catch((err) => {
//             console.log(err.message);
//         })
