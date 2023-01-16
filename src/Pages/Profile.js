import { useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Profile.module.css";
import AuthContext from "../Store/auth-context";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../reduxStore/AuthReducer";

const Profile = () => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const fullName = useSelector((state) => state.auth.fullName);
  const profilePhoto = useSelector((state) => state.auth.profilePhoto);
  const token = useSelector((state) => state.auth.token);

  const fullNameRef = useRef();
  const profileUrlRef = useRef();
      
      const updateProfileUrl = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";

  const profileUpdateHandler = (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const profileUrl = profileUrlRef.current.value;

    axios
    .post(updateProfileUrl, {
          // idToken: authCtx.token,
          idToken: token,
          displayName: fullName,
          photoUrl: profileUrl,
          returnSecureToken: true,
        })
      .then((res) => {
        console.log(res.data);
        alert("Profile Updated");
        dispatch(
          authAction.updateProfile({name: fullName, profileUrl: profileUrl})
        )
      })
      .catch((error) => {
        alert(error.message);
      });
  };

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',{
    idToken: token
  })
  .then((res) => {
     console.log(res);
     const user = res.data.users[0]
     fullNameRef.current.value = user.displayName;
     profileUrlRef.current.value = user.photoUrl;
  })

  return (
    <>
      <section className={classes.profile}>
        <NavLink to="/profile"></NavLink>
        <Row>
          <Col>
            <h4>Winners never Quit. Quitters never Win!</h4>
          </Col>
          <Col>
            <h6>
              Your Profile is 64% completed. A complete profile has higher
              chances of landing a job.
            </h6>
          </Col>
        </Row>
      </section>
      <form className={classes.form}>
        <Row>
          <Col>
            <h2>Contact Details</h2>
          </Col>
          <Col>
            <button>Cancel</button>
          </Col>
        </Row>
        <Row>
          <Col className={classes.control}>
            <label htmlFor="name">Full Name:</label>
            <input id="name" type="text" ref={fullNameRef} />
          </Col>
          <Col className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input id="photo" type="text" ref={profileUrlRef} />
          </Col>
        </Row>
        <Row>
          <Col className={classes.control}>
            <button onClick={profileUpdateHandler}>Update</button>
          </Col>
        </Row>
      </form>
    </>
  );
};

export default Profile;

// fetch(
//     'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',
//     {
//         method: "POST",
//         body: JSON.stringify({
//             idToken: authCtx.token,
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then((response) => {
//         if(response.ok){
//             return response.json();
//         }else{
//             return response.json().then((data) => {
//                 let errorMessage = 'fetching failed!'
//                 throw new Error(errorMessage);
//             })
//         }
//     }).then((data) => {
//         console.log(data);
//     }).catch((err) => {
//         alert(err.message);
//     })
