import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import HomeLayout from "../Pages/HomeLayout";

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
      }
    ]
  },
]);


export default router;