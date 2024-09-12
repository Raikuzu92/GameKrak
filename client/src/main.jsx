import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";




import App from "./App.jsx";
import Game from "./pages/Game.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Market from "./pages/Market.jsx";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import SplashPage from "./pages/SplashPage.jsx";
// import Checkout from "./pages/Checkout.jsx";
import Search from "./pages/Search.jsx";
import ListingForm from './pages/ListingForm.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SplashPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
      {
        path: "/profile/me",
        element: <Profile />,
      },
      {
        path: "/market",
        element: <Market />,
      },
      {
        path: "/market/new",
        element: <ListingForm />,
      },
      // {
      //   path: "/market/cart",
      //   element: <Cart />,
      // },
      // {
      //   path: "/market/checkout",
      //   element: <Checkout />,
      // },
      {
        path: "/games",
        element: <Game />,
      },
      {
        path: "/games/search",
        element: <Search />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
