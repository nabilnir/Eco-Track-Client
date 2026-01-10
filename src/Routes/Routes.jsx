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
import Blogs from "../Pages/Blogs";
import BlogDetails from "../Pages/BlogDetails";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardOverview from "../Pages/Dashboard/DashboardOverview";
import Profile from "../Pages/Dashboard/Profile";
import Activities from "../Pages/Dashboard/Activities";
import ChallengesDashboard from "../Pages/Dashboard/Challenges";
import UserManagement from "../Pages/Dashboard/UserManagement";
import BlogManagement from "../Pages/Dashboard/BlogManagement";


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
        path: '/blogs',
        Component: Blogs
      },
      {
        path: '/blog/:id',
        Component: BlogDetails,
        errorElement: <Error />
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
          }
        ]
      },

      // Dashboard Routes
      {
        path: '/dashboard',
        element: <ProtectedRoutes />,
        children: [
          {
            path: '',
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <DashboardOverview />
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
              // Admin Routes
              {
                path: 'users',
                element: <ProtectedRoutes allowedRoles={['admin']}><UserManagement /></ProtectedRoutes>
              },
              {
                path: 'blogs',
                element: <ProtectedRoutes allowedRoles={['admin']}><BlogManagement /></ProtectedRoutes>
              },
              // User Blogs (User Only)
              {
                path: 'my-blogs',
                element: <ProtectedRoutes allowedRoles={['user']} />,
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { default: UserBlogManagement } = await import("../Pages/Dashboard/UserBlogManagement");
                      return { Component: UserBlogManagement };
                    }
                  }
                ]
              },
              // Analytics (Admin Only)
              {
                path: 'analytics',
                element: <ProtectedRoutes allowedRoles={['admin']} />,
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { default: Analytics } = await import("../Pages/Dashboard/Analytics");
                      return { Component: Analytics };
                    }
                  }
                ]
              },
              // Settings (Admin Only)
              {
                path: 'settings',
                element: <ProtectedRoutes allowedRoles={['admin']} />,
                children: [
                  {
                    index: true,
                    async lazy() {
                      const { default: Settings } = await import("../Pages/Dashboard/Settings");
                      return { Component: Settings };
                    }
                  }
                ]
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