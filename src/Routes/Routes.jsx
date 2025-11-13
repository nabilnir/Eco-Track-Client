import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children : [
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