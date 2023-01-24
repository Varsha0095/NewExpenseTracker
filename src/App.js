// import React, { useContext } from "react";
import { Routes, Navigate } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Welcome from "./Pages/Welcome";
// import AuthContext from "./Store/auth-context";
import Profile from "./Pages/Profile";
import ForgotPassword from "./Pages/ForgotPassword";
import "./App.css";
import { authAction } from "./reduxStore/AuthReducer";
import { expenseAction } from "./reduxStore/ExpenseReducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Fragment, useEffect } from "react";

const App = () => {
  // let usermail = localStorage.getItem('exp_email');
  // let mail = usermail.replace('@','').replace('.','');
  const theme = useSelector((state) => state.theme.theme);
  const url = `https://expense-tracker-b43a5-default-rtdb.firebaseio.com`;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedin);

  const token = localStorage.getItem("exp_token");
  const email = localStorage.getItem("exp_email");

  useEffect(() => {
    if (token) {
      dispatch(authAction.updateAuthInfo({ token, email }));
    }
  }, [token, email, dispatch]);

  const getProfileUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ`;
  useEffect(() => {
    async function fetchProfile() {
      if (token) {
        try {
          const res = await axios.post(getProfileUrl, { idToken: token });
          if (res) {
            const fullName = res.data.users[0].displayName;
            const profilePhoto = res.data.users[0].photoUrl;
            dispatch(
              authAction.updateProfile({
                name: fullName,
                profileUrl: profilePhoto,
              })
            );
          } else {
            console.log(res);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchProfile();
  }, [token,dispatch,getProfileUrl]);

  useEffect(() => {
    const getData = async() => {
      const res = await axios.get(`${url}/expense.json`);

      if (res.status === 200) {
        const data = res.data;
        let exp_list = [];
        let exp_total_amt = 0;
        for (const key in data) {
          const expObj = {
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            category: data[key].category,
          };
          exp_list.push(expObj);
        }
        exp_list.forEach((expense) => (exp_total_amt += +expense.amount));
        console.log(exp_total_amt);
        dispatch(
          expenseAction.getExpenses({
            expList: exp_list,
            totalAmt: exp_total_amt,
          })
        );
      } else {
        console.log("cannot fetch data from database due to technical error");
      }
    }
    getData();
  }, [url,dispatch]);
  // const authCtx = useContext(AuthContext);
  // let themeClass;
  if(theme === "dark") document.body.className = "dark-theme";
  else document.body.className = "light-theme";
  return (
    <div className="App">
      <Routes>
        {isLoggedIn && (
          <Fragment>
            <Route
              path="/"
              // element={<Welcome />} 
              element={<Navigate to="/welcome" replace={true} />}
            />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/profile" element={<Profile />} />
          </Fragment>
        )}
        {!isLoggedIn && <Route path="/" element={<Login />} />}
        {!isLoggedIn && (
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        )}
        {!isLoggedIn && (
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        )}
        {isLoggedIn && <Route path="/" element={<Login />} />}
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
};
export default App;

// <React.Fragment>
//   <Switch>
//   {!authCtx.isLoggedIn && <Route path="/" exact>
//     <Login />
//   </Route>}
//   {authCtx.isLoggedIn && <Route path="/" exact>
//   <Welcome />
//   </Route>}
//   {!authCtx.isLoggedIn && <Route path="/login">
//     <Login />
//   </Route>}
//   {authCtx.isLoggedIn && <Route path="/login">
//     <Welcome />
//     </Route>}
//  <Route path="/profile">
//     {authCtx.isLoggedIn && <Profile />}
//     {!authCtx.isLoggedIn && <Redirect to="/login" />}
//     </Route>
//     <Route path="/forgotpassword">
//       <ForgotPassword />
//     </Route>
// </Switch>
// </React.Fragment>
