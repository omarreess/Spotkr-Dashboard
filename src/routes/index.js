import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ThirdPartyTable from "../modules/thirdParty/pages/thirdParty";
import CouponsTable from "../modules/coupons/pages/coupons";
import CouponsForm from "../modules/coupons/pages/couponsForm";
import ActivitiesTable from "../modules/activities/pages/activities";
import ActivitiesShow from "../modules/activities/pages/show";
import OrdersTable from "../modules/orders/pages/orders";
import LeaderBoardTable from "../modules/leaderboard/pages/leaderBoard";
import OrderShow from "../modules/orders/pages/show";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: ""||"thirdParty",
        element: <ThirdPartyTable />,
      },
      {
        path: "thirdParty/:thirdId/activities",
        element: <ActivitiesTable />,
      },
      {
        path: "thirdParty/:thirdId/activities/show/:id",
        element: <ActivitiesShow/>,
      },
      {
        path: "coupons",
        element: <CouponsTable />,
      },
      {
        path: "coupons/add",
        element: <CouponsForm />,
      },
      {
        path: "orders",
        element: <OrdersTable />,
      },
      {
        path: "orders/:id",
        element: <OrderShow />,
      },
      {
        path: "leader-board",
        element: <LeaderBoardTable />,
      },
      // hasPermission("all-product") && {
      //   path: "products",
      //   element: <ProductsTable />,
      // },
    ]}

]);
