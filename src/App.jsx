import {
  Home,
  ErrorPage,
  Explore,
  SearchResult,
  Details,
  PageLayout,
} from "./pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: ":mediaType/:id",
        element: <Details />,
      },

      {
        path: "search/:query",
        element: <SearchResult />,
      },

      {
        path: "explore/:mediaType",
        element: <Explore />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
