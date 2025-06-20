import { Navigate } from "react-router-dom";
import App from "./src/App";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ge" replace />,
  },

  {
    path: "/:language",
    element: <App />,
  },
];

export default routes;
