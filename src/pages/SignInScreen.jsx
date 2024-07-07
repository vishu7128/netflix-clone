import "./SignInScreen.css";
// import db from "../firebase";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLoadingScreen from "../store/customHooks/useLoadingScreen";
import LoadingScreen from "./LoadingScreen";

// eslint-disable-next-line react/prop-types
function SignInScreen({ signUpEmail }) {
  const [isSigningUp, setSigningUp] = useState(signUpEmail ? true : false);
  const { loading, showLoading, hideLoading } = useLoadingScreen();

  const navigate = useNavigate();
  const emailRef = useRef();
  const passRef = useRef();

  async function handleSignUp(event) {
    event.preventDefault();
    let email = emailRef.current.value;
    let password = passRef.current.value;

    try {
      showLoading()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed up
      const user = userCredential.user;
      console.log(user);
      setTimeout(() => {
        hideLoading();
        navigate("/");
      }, 300);
    } catch (error) {
      hideLoading()
      alert(error.message);
    }
  }

  async function handleSignIn(event) {
    event.preventDefault();
    let email = emailRef.current.value;
    let password = passRef.current.value;

    try {
      showLoading()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Signed In
      const user = userCredential.user;
      console.log(user);
      setTimeout(() => {
        hideLoading();
        navigate("/");
      }, 300);
    } catch (error) {
      // console.log(error.code);
      hideLoading()
      alert(error.message);
    }
  }

  if (loading) return <LoadingScreen></LoadingScreen>
  
  return (
    <div className="signInScreen">
      <form onSubmit={!isSigningUp ? handleSignIn : handleSignUp}>
        <h1>{isSigningUp ? "Sign Up" : "Sign In"}</h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          defaultValue={signUpEmail && isSigningUp ? signUpEmail : ""}
        />
        <input ref={passRef} type="password" placeholder="Password" />
        <button
          type="submit"
          onClick={isSigningUp ? handleSignUp : handleSignIn}
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </button>
        {!isSigningUp ? (
          <h4>
            <span className="signInScreen-gray">New to Netflix? </span>
            <span
              onClick={() => setSigningUp(true)}
              className="signInScreen-signup-link"
            >
              Sign Up now.
            </span>
          </h4>
        ):<h4>
            <span
              onClick={() => setSigningUp(false)}
              className="signInScreen-signup-link"
            >
              {`<- Back to login`}
            </span>
          </h4>}
      </form>
    </div>
  );
}

export default SignInScreen;
