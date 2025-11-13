import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children : [
      {
        
      }
    ]
  },
]);


export default router;