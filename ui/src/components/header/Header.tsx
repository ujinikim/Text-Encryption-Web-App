import React, { useState } from "react";
import "../styles/Header.css";
import { GitHubProvider } from "../../config/authMethods";
import { Button, Modal, Form } from "react-bootstrap";
import socialMediaAuth from "../../auth/auth";

import firebase from "../../config/firebase-config";
import LockIcon from "@mui/icons-material/Lock";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { GitHub } from "@mui/icons-material";

const Header = () => {
  //handle login page useState
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //handle help page
  const [showHelp, setShowHelp] = useState(false);
  const handleCloseHelp = () => setShowHelp(false);
  const handleShowHelp = () => setShowHelp(true);

  //handle aboutus page
  const [showAbout, setShowAbout] = useState(false);
  const handleCloseAbout = () => setShowAbout(false);
  const handleShowAbout = () => setShowAbout(true);

  //handle contact page
  const [showContact, setShowContact] = useState(false);
  const handleCloseContact = () => setShowContact(false);
  const handleShowContact = () => setShowContact(true);

  //handle user info page
  const [showUserInfo, setshowUserInfo] = useState(false);
  const handleCloseUserInfo = () => setshowUserInfo(false);
  const handleShowUserInfo = () => setshowUserInfo(true);

  //handle login button pressed
  const [statusLoggedIn, setStatusLoggedIn] = useState(false);
  const handleStatusLoggedIn = () => setStatusLoggedIn(true);
  const handleStatusLoggedOut = () => setStatusLoggedIn(false);

  //handle email address of user
  // const [userInfo, setUserInfo] = useState<{
  //   email: null | string;
  //   UID: null | number;
  // }>({ email: null, UID: null });

  //sign in the user
  const handleLoginOnClick = async (provider: any) => {
    const res = await socialMediaAuth(provider);
  };

  //handle logout
  // will need to error check if signout fails
  function handleLogout() {
    firebase.auth().signOut();
  }

  //auth state changes then
  const authState = firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      handleStatusLoggedIn();
    } else {
      //not signed in.
      handleStatusLoggedOut();
    }
  });

  //whether to show sign in or sign out
  const signInOut = () => {
    if (statusLoggedIn === false) {
      return (
        <>
        <Button
        className="NavBar_button"
        variant="secondary"
        onClick={handleShow}
      >
        <AlternateEmailIcon></AlternateEmailIcon> Email Sign In
      </Button>
        <Button
          className="NavBar_button"
          variant="secondary"
          onClick={() => handleLoginOnClick(GitHubProvider)}
        >
          {/* Add link to github login page */}
          <GitHub></GitHub> Sign In
        </Button>
        </>
      );
    } else {
      return (
        <Button
          className="NavBar_button"
          variant="secondary"
          onClick={handleLogout}
        >
          {/* Add link to github login page */}
          <>Sign Out</>
        </Button>
      );
    }
  };

  // sign in state
  const [attempt, setAttempt] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleStatusLoggedIn();
        setLoading(false);
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        handleStatusLoggedOut();
        setLoading(false);

        console.log({ errorCode, errorMessage });
      });
    setAttempt(true);
  };

  //whether to show user info or default user info
  const userInfoShow = () => {
    if (statusLoggedIn === false) {
      return <p>Please Sign-In before viewing your information</p>;
    } else {
      const user = firebase.auth().currentUser;
      const email = user?.email;
      const UID = user?.uid;
      console.log(email);
      console.log(UID);
      const tempUserInfo = {
        email: email,
        UID: UID,
      };

      return (
        <>
          <p>Email Address: {tempUserInfo.email}</p>
          <p>
            User UID: {tempUserInfo.UID} ** WILL BE REMOVED: JUST FOR TESTING **
          </p>
        </>
      );
    }
  };

  return (
    <div className="NavBar">
      <div className="NavBar_logo">
        <LockIcon />
        <span>File Share</span>
      </div>

      <div className="NavBar_icons">
        <span>
          <Button
            className="NavBar_button"
            variant="clear"
            onClick={handleShowHelp}
          >
            <HelpOutlineIcon />
          </Button>
          <Button
            className="NavBar_button"
            variant="clear"
            onClick={handleShowAbout}
          >
            <InfoIcon></InfoIcon>
          </Button>
          <Button
            className="NavBar_button"
            variant="clear"
            onClick={handleShowContact}
          >
            <ContactMailIcon></ContactMailIcon>
          </Button>
          <Button
            className="NavBar_button"
            variant="clear"
            onClick={handleShowUserInfo}
          >
            <PersonIcon />
          </Button>
          {signInOut()}
        </span>
      </div>

      {/* modal for help page */}
      <Modal size="lg" show={showHelp} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title>Help</Modal.Title>
        </Modal.Header>
        <Modal.Body>File Share is a webiste where you can upload text file and download encrpyted version of the file. Later, you can decrpyted your file using the key used to encrypt the file, and original text will be saved</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHelp}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for contact page */}
      <Modal size="lg" show={showContact} onHide={handleCloseContact}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>UTD CS4389</Modal.Body>
        <Modal.Body>Nicholas Vitale: nfv180000@utdallas.edu</Modal.Body>
        <Modal.Body>Bisma Ahmed: bismakhan5214@gmail.com</Modal.Body>
        <Modal.Body>Abdullah Akbar: abdullahakbar@outlook.com</Modal.Body>
        <Modal.Body>Harsha Chamrajnagar Srikara: harshasrikara@gmail.com</Modal.Body>
        <Modal.Body>Anirudh Emmadi: kanna6501@gmail.com</Modal.Body>
        <Modal.Body>Eojin Kim: eooojean@gmail.com</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContact}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for about us page */}
      <Modal size="lg" show={showAbout} onHide={handleCloseAbout}>
        <Modal.Header closeButton>
          <Modal.Title>About Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>CS 4389 - Security Course Students</Modal.Body>
        <Modal.Body>UTD CS4389</Modal.Body>
        <Modal.Body>Nicholas Vitale</Modal.Body>
        <Modal.Body>Bisma Ahmed</Modal.Body>
        <Modal.Body>Abdullah Akbar</Modal.Body>
        <Modal.Body>Harsha Chamrajnagar Srikara</Modal.Body>
        <Modal.Body>Anirudh Emmadi</Modal.Body>
        <Modal.Body>Eojin Kim</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAbout}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for user info page */}
      <Modal size="sm" show={showUserInfo} onHide={handleCloseUserInfo}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{userInfoShow()}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserInfo}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for login page */}
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Sign-In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="email"
                placeholder="Username"
                onChange={(event: any) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(event: any) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit}>
              Sign In
            </Button>
            <div>
              {loading
                ? "loading"
                : attempt
                ? statusLoggedIn
                  ? "Success"
                  : "Unauthorized"
                : ""}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Header;
