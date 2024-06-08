import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./Components/Header";
//import Body from "./Components/Body";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import Error from "./Components/Error";
//import About from "./Components/About";
import RestaurantMenu from "./Components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import userContext from "./utils/userContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
//import Cart from "./Components/Cart";
import sideBar from "./Components/sidebar";

const Body = lazy(()=>import("./Components/Body"))
const About = lazy(() => import("./Components/About"));
const Cart  = lazy(()=>import("./Components/Cart"));

const AppLayout = () => {
  const [userInfo, setuserInfo] = useState("");

  useEffect(() => {
    const data = {
      name: "sandeep",
    };
    setuserInfo(data.name);
  }, []);

  return (
     <Provider store={appStore}>
      <userContext.Provider value={userInfo}>
        <div className="app">
          <Header />
          <sideBar/>
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element:
        <Suspense>
          <Body />
        </Suspense>
        ,
        errorElement: <Error />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/contact",
        element: <Contact />,
        errorElement: <Error />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element:
        <Suspense>
          <Cart />
        </Suspense> 
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
