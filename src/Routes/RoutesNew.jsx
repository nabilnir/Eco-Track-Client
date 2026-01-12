import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Challenges from "../Pages/Challenges";
import ChallengeDetails from "../Pages/ChallengeDetails";
import AddChallenge from "../Pages/AddChallenge";
import MyActivities from "../Pages/MyActivities";
import JoinChallenge from "../Pages/JoinChallenge";
import ActivityDetail from "../Pages/ActivityDetails";
import Error from "../components/Error/Error";
import MyProfile from "../Pages/MyProfile";
import Tips from "../Pages/Tips";
import HomeLayout from "../Layout/HomeLayout";
import EventDetails from "../Pages/EventDetails";
import Events from "../Pages/Events";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import Activities from "../Pages/Dashboard/Activities";
import ChallengesDashboard from "../Pages/Dashboard/Challenges";
import UserManagement from "../Pages/Dashboard/UserManagement";
import Analytics from "../Pages/Dashboard/Analytics";
import Settings from "../Pages/Dashboard/Settings";
import JoinedEvents from "../Pages/Dashboard/JoinedEvents";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        Component: HomeLayout
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/challenges',
        Component: Challenges
      },
      {
        path: '/tips',
        Component: Tips
      },
      {
        path: '/events',
        Component: Events
      },
      {
        path: '/challenges/:id',
        Component: ChallengeDetails,
        errorElement: <Error />
      },
      {
        path: '/events/:id',
        element: <EventDetails />,
        errorElement: <Error />
      },
      {
        path: '/error',
        element: <Error />
      },
      // Protected routes group
      {
        element: <ProtectedRoutes />,
        errorElement: <Error />,
        children: [
          {
            path: '/myprofile',
            element: <MyProfile />
          },
          {
            path: 'challenges/add',
            element: <AddChallenge />
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
          },
          // Dashboard routes
          {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardHome />
              },
              {
                path: 'profile',
                element: <Profile />
              },
              {
                path: 'activities',
                element: <Activities />
              },
              {
                path: 'challenges',
                element: <ChallengesDashboard />
              },
              {
                path: 'users',
                element: <UserManagement />
              },
              {
                path: 'analytics',
                element: <Analytics />
              },
              {
                path: 'settings',
                element: <Settings />
              },
              {
                path: 'events',
                element: <JoinedEvents />
              }
            ]
          }
        ]
      },

      {
        path: '*',
        element: <Error />
      }
    ]
  }
]);

export default router;
