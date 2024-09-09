import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { ApolloProvider } from "@apollo/client"; // Import ApolloProvider

import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import SingleMonster from "./pages/SingleMonster";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import SplashPage from "./pages/SplashPage.jsx";

import client from "./apolloClient"; 

// Define your routes
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
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/monsters/:monsterId",
        element: <SingleMonster />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}> {/* ApolloProvider for GraphQL */}
    <RouterProvider router={router} /> {/* RouterProvider for routing */}
  </ApolloProvider>
);
