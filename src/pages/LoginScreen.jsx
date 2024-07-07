import "./LoginScreen.css";
import constants from "../assets/netflixCloneConstants.json";
import { useState, useEffect } from "react";
import SignInScreen from "./SignInScreen";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/slices/userSlice";

function LoginScreen() {
  const [signningIn, setsignningIn] = useState(false);
  const [signUpEmail, setSignUpEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const navigate = useNavigate();

  const user = useSelector(selectUser)
  useEffect(() => {
  if (user) navigate("/");
  
  }, [user,navigate])

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  // Validate email function with debounce
  const validateEmail = debounce((email) => {
    setIsEmailValid(email.includes("@") && email.includes("."));
  }, 300); // Adjust debounce delay as needed (e.g., 300ms)


  function handleSubmit(event) {
    event.preventDefault();
    setsignningIn(true);
  }

  useEffect(() => {
    validateEmail(signUpEmail);
  }, [signUpEmail, validateEmail]);


  return (
    <div className="loginScreen">
      <div className="loginScreen-background">
        <img
          className="loginScreen-logo"
          src={constants.navbar.logoUrl}
          alt=""
        />
        <button onClick={()=>setsignningIn(true)} className="loginScreen-button">
          Sign In
        </button>
        <div className="loginScreen-Gradient"></div>
        {signningIn ? (
          <SignInScreen signUpEmail={signUpEmail} />
        ) : (
          <div className="loginScreen-body">
            <h1>Unlimited films, TV programmes and more</h1>
            <h2>Watch anywhere. Cancel at any time</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>
            <div className="loginScreen-input">
              <form action="" onSubmit={handleSubmit}>
                <input
                  value={signUpEmail}
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`loginScreen-getStarted ${
                    !isEmailValid ? "disabled" : ""
                  }`}
                >
                  Get Started
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
