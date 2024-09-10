import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import {ApolloProvider} from "@apollo/client";
import { BrowserRouter } from "react-router-dom";


import App from "./App.jsx";
import Game from "./pages/Game.jsx";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Market from "./pages/Market.jsx";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import SplashPage from "./pages/SplashPage.jsx";


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
        path: "/market/buy",
        element: <Market />,
      },
      {
        path: "/market/sell",
        element: <Market />,
      },
      {
        path: "/market/trade",
        element: <Market />,
      },
      {
        path: "/games",
        element: <Game />,
      },
      {
        path: "/games/:title",
        element: <Game />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
