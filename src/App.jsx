import HomeScreen from "./pages/HomeScreen";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import RootLayout from "./components/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginScreen from "./pages/LoginScreen.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn, logOut } from "./store/slices/userSlice.js";
import { PlanContextProvider } from "./store/PlanContext.jsx";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const authStateSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          logIn({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logOut());
      }
    });

    return () => {
      authStateSubscribe();
    };
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomeScreen />,
        },
        {
          path: "profile",
          element: <PlanContextProvider><Profile /></PlanContextProvider>,
        },
      ],
    },
    {
      path: "login",
      element: <LoginScreen />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
