import { useContext, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "./Profile.module.css";
import AuthContext from "../Store/auth-context";
import axios from "axios";

const Profile = () => {
  const authCtx = useContext(AuthContext);

  const fullnameInputRef = useRef();
  const photoInputRef = useRef();
      
      const updateProfileUrl = "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ";

  const profileUpdateHandler = (event) => {
    event.preventDefault();

    const enteredFullname = fullnameInputRef.current.value;
    const enteredPhotoUrl = photoInputRef.current.value;

    axios
    .post(updateProfileUrl, {
          idToken: authCtx.token,
          displayName: enteredFullname,
          photoUrl: enteredPhotoUrl,
          returnSecureToken: true,
        })
      .then((res) => {
        console.log(res.data);
        alert("Profile Updated");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDSVbdJioXJIrQNGGXzqqS2drVffVyOMmQ',{
    idToken: authCtx.token
  })
  .then((res) => {
     console.log(res);
     const user = res.data.users[0]
     fullnameInputRef.current.value = user.displayName;
     photoInputRef.current.value = user.photoUrl;
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
            <input id="name" type="text" ref={fullnameInputRef} />
          </Col>
          <Col className={classes.control}>
            <label htmlFor="photo">Profile Photo URL</label>
            <input id="photo" type="text" ref={photoInputRef} />
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
