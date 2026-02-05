import { Navigate } from "react-router-dom";
import App from "./src/App";
import BusinessStatistics from "./src/components/Context/BusinessStatistics/BusinessStatistics";
import ConsumerPriceIndex from "./src/components/Context/ConsumerPriceIndex/ConsumerPriceIndex";

const routes = [
  {
    path: "/",
    element: <Navigate to="/ge" replace />,
  },

  {
    path: "/:language",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="business-statistics" replace />,
      },
      {
        path: "business-statistics",
        element: <BusinessStatistics />,
      },
      {
        path: "consumer-price-index",
        element: <ConsumerPriceIndex />,
      },
    ],
  },
];

export default routes;
