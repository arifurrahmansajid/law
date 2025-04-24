import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import PageLoader from "../page/PageLoader/PageLoader";
import Root from "../page/Root/Root";
import ErrorPage from "../page/ErrorPage/ErrorPage";
import Home from "../page/Home/Home";
import LawyerDetails from "../page/LawyerDetails/LawyerDetails";
import Blogs from "../page/Blog/Blogs";
import BookingPage from "../page/Bookings/Bookings";

export const router = createBrowserRouter([
  {
    // Wrap all child routes within the PageLoader component.
    element: <PageLoader />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Root />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "booking",
            element: <BookingPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "LawyerDetails/:id",
            element: <LawyerDetails />,
            errorElement: <ErrorPage />,
          },
          {
            path: "blogs",
            element: <Blogs />,
            errorElement: <ErrorPage />,
          }
        ],
      }
    ],
  },
]);

// In your main file (e.g., App.jsx), use the router like below:
const App = () => <RouterProvider router={router} />;
export default App;