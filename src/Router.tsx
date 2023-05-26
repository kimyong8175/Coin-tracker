import { createBrowserRouter } from "react-router-dom";
import Coin from "components/Coin";
import Coins from "components/Coins";
import Root from "./Root";
import Chart from "components/Chart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Coins />,
      },
      {
        path: ":coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
        ],
      },
    ],
  },
]);

export default router;
