import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Pages/HomeLayout";
import Challenges from "../Pages/Challenges";
import ChallengeDetails from "../Pages/ChallengeDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import AddChallenge from "../Pages/AddChallenge";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children : [
      {
           path : '/',
           Component : HomeLayout
      },
      {
        path : '/login',
        Component : Login
      },
      {
        path: '/register',
        Component : Register
      },
      {
        path: '/challenges',
        Component : Challenges
      },
      {
        path: '/challenges/:id',
        Component: ChallengeDetails
      },

      {
        path: 'challenges/add',
        element : <AddChallenge />
      }
    ]
  },
]);


export default router;