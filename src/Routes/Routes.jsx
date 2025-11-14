import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Pages/HomeLayout";
import Challenges from "../Pages/Challenges";
import ChallengeDetails from "../Pages/ChallengeDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import AddChallenge from "../Pages/AddChallenge";
import MyActivities from "../Pages/MyActivities";
import JoinChallenge from "../Pages/JoinChallenge";
import ActivityDetail from "../Pages/ActivityDetails";
import Error from "../components/Error/Error";

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
      },
      {
        path: '/my-activities',
        element: <MyActivities />
      },
      {
        path: '/challenges/join/:id',
        element: <JoinChallenge />
      },
      {
        path: '/my-activities/:id',
        element: <ActivityDetail />
      }
    ]
  },
  {
    path: '*',
    Component: Error
  }
]);


export default router;