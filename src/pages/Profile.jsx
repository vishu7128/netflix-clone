import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import "./Profile.css";
import { useDispatch } from "react-redux";
import { logOut, selectUser } from "../store/slices/userSlice";
import constants from "../assets/netflixCloneConstants.json";
import { useNavigate } from "react-router-dom";
import { PlanContext } from "../store/PlanContext";
import { useContext } from "react";
import useLoadingScreen from "../store/customHooks/useLoadingScreen";
import LoadingScreen from "./LoadingScreen";
import { useEffect } from "react";

function Profile() {
  const { loading, showLoading, hideLoading } = useLoadingScreen();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const PlanCtx = useContext(PlanContext);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  async function handleSignOut() {
    try {
      showLoading();
      await signOut(auth);
      dispatch(logOut());
      setTimeout(() => {
        hideLoading();
        navigate("/");
      }, 300);
    } catch (error) {
      hideLoading();
      alert(error.message);
    }
  }

  function handleSubscribe(key) {
    showLoading();
    setTimeout(() => {
      if (PlanCtx.selected === key) {
        PlanCtx.removePlan(); // Remove plan if already selected
      } else {
        PlanCtx.setPlan(key); // Set new plan if not selected
      }
      hideLoading();
    }, 500);
  }

  if (loading) return <LoadingScreen />;

  return (
    user && (
      <div className="profileScreen">
        <div className="profile-screen-body">
          <h1>Edit Profile</h1>
          <div className="profile-info">
            <img
              src={constants.navbar.avatar}
              alt=""
              className="profile-avatar"
            />
            <div className="profile-details">
              <h2>{user?.email}</h2>
              <div className="profile-plans">
                <h3>Plans (Current Plan: Standard)</h3>
                <div className="profile-plan">
                  <div className="plan-info">
                    <h5>Premium</h5>
                    <h6>4K</h6>
                  </div>
                  <button
                    className={`plan-subscribe-btn ${
                      PlanCtx.selected === "premium" ? "selected" : ""
                    }`}
                    onClick={() => handleSubscribe("premium")}
                  >
                    {PlanCtx.selected === "premium" ? "Cancel" : "Subscribe"}
                  </button>
                </div>
                <div className="profile-plan">
                  <div className="plan-info">
                    <h5>Basic</h5>
                    <h6>720p</h6>
                  </div>
                  <button
                    className={`plan-subscribe-btn ${
                      PlanCtx.selected === "basic" ? "selected" : ""
                    }`}
                    onClick={() => handleSubscribe("basic")}
                  >
                    {PlanCtx.selected === "basic" ? "Cancel" : "Subscribe"}
                  </button>
                </div>
                <div className="profile-plan">
                  <div className="plan-info">
                    <h5>Standard</h5>
                    <h6>1080p</h6>
                  </div>
                  <button
                    className={`plan-subscribe-btn ${
                      PlanCtx.selected === "standard" ? "selected" : ""
                    }`}
                    onClick={() => handleSubscribe("standard")}
                  >
                    {PlanCtx.selected === "standard" ? "Cancel" : "Subscribe"}
                  </button>
                </div>
                <button
                  onClick={handleSignOut}
                  className="profile-sign-out-btn"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Profile;
