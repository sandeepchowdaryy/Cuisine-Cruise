import Rescard, { withPromotedLabel } from "./Rescard";
import { Suspense, lazy, useContext, useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import { Link } from "react-router-dom";
import Shimmer from "./Shimmer";
import TopRestaurantChains from "./TopRestaurantChains";
///import Footer from "./Footer";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";
import WhatsOnMind from "./WhatsOnMind";

const Footer = lazy(() => import("./Footer"));
const Body = () => {
  const { setuserInfo, name } = useContext(userContext);
  const data = useSelector((store) => store.sidebar.resList);

  // local state variable - super powerfull variable
  const [listofrestaurants, setlistofrestaurants] = useState([]);
  const [Filteredrestaurant, setFilterdrestaurant] = useState([]);
  const [foodItemsHeader, setFoodItemsHeader] = useState([]);
  const [foodItemImages, setFoodItemImages] = useState([]);
  const [topRestaurantHeader, setTopRestaurantHeader] = useState("");
  const [topRestaurantChains, setTopRestaurantChains] = useState([]);

  const [Searchtext, setSearchtext] = useState("");
  const [topratedrestaurant, settopratedrestaurant] = useState(false);
  const [above300, setabove300] = useState(false);
  const [below300, setbelow300] = useState(false);
  const [fastDelivery, setfastDelivery] = useState(false);

  useEffect(() => {
    //getRestaurants();

    if (data) {
      setlistofrestaurants(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setFilterdrestaurant(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
      setFoodItemsHeader(data?.data?.cards[0]?.card?.card?.header || []);
      setFoodItemImages(
        data?.data?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info ||
          []
      );
      setTopRestaurantHeader(data?.data?.cards[1]?.card?.card?.header || "");
      setTopRestaurantChains(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || []
      );
    }
  }, [data]);

  // async function getRestaurants() {
  //   try {
  //     const data = await fetch(
  //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.5061743&lng=80.6480153&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //     );

  //     const json = await data.json();

  //     async function checkJsonData(jsonData) {
  //       for (let i = 0; i < jsonData?.data?.cards.length; i++) {
  //         // initialize checkData for Swiggy Restaurant data
  //         let checkData =
  //           json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
  //             ?.restaurants;

  //         // if checkData is not undefined then return it
  //         if (checkData !== undefined) {
  //           return checkData;
  //         }
  //       }
  //     }

  //     const resData = await checkJsonData(json);
  //     console.log(resData);
  //     setlistofrestaurants(resData);
  //     setFilterdrestaurant(resData);
  //   } catch (err) {
  //     console.log("error");
  //   }
  // }
  console.log(listofrestaurants);
  const status = useOnlineStatus();
  if (status === false)
    return <h1>No internet,Please Check Your Connection</h1>;

  return listofrestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body mt-32 flex flex-col gap-4 font-sans">
      <WhatsOnMind
        foodItemsHeader={foodItemsHeader}
        foodItemImages={foodItemImages}
      />

      <TopRestaurantChains
        topRestaurantHeader={topRestaurantHeader}
        topRestaurantChains={topRestaurantChains}
      />

      <h1 className="ml-40 font-bold text-2xl ">
        {" "}
        {data?.data?.cards[2]?.card?.card?.title || ""}{" "}
      </h1>
      <div className="mt-6 filter flex justify-center items-center gap-5 mb-3">
        <div className="flex gap-5 w-4/12">
          <input
            type="text"
            className="p-3 w-full rounded-lg bg-slate-200 "
            placeholder="Search Restaurants"
            value={Searchtext}
            onChange={(e) => {
              setSearchtext(e.target.value);
              const filteredrestaurant = listofrestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(Searchtext.toLowerCase())
              );
              Searchtext.length === 0
                ? setFilterdrestaurant(listofrestaurants)
                : setFilterdrestaurant(filteredrestaurant);
            }}
          />
          <button
            className="Search-btn  bg-black rounded-xl p-2 w-20 text-white hover:shadow-xl"
            onClick={() => {
              //console.log(Searchtext);
              const filteredrestaurant = listofrestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(Searchtext.toLowerCase())
              );
              setFilterdrestaurant(filteredrestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn bg-black p-3  rounded-xl text-white w-56 font-serif hover:shadow-xl active:bg-orange-600 "
          onClick={() => {
            settopratedrestaurant(!topratedrestaurant);
            const filteredlist = listofrestaurants.filter(
              (res) => res.info.avgRating > 4
            );
            topratedrestaurant
              ? setFilterdrestaurant(listofrestaurants)
              : setFilterdrestaurant(filteredlist);
          }}
        >
          Top Rated Restaurant
        </button>
        <button
          className="filter-btn bg-black p-3  rounded-xl text-white w-50 hover:shadow-2xl active:bg-orange-600 "
          onClick={() => {
            setabove300(!above300);
            const filteredlist = listofrestaurants.filter(
              (res) => res.info.costForTwo.match(/\d+/g) > 300
            );
            above300
              ? setFilterdrestaurant(listofrestaurants)
              : setFilterdrestaurant(filteredlist);
          }}
        >
          Above Rs 300
        </button>
        <button
          className="filter-btn bg-black p-3  rounded-xl text-white w-50 hover:shadow-2xl  active:bg-orange-500 "
          onClick={() => {
            setbelow300(!below300);
            const filteredlist = listofrestaurants.filter(
              (res) => res.info.costForTwo.match(/\d+/g) < 300
            );
            below300
              ? setFilterdrestaurant(listofrestaurants)
              : setFilterdrestaurant(filteredlist);
          }}
        >
          Below Rs 300
        </button>
        <button
          className="filter-btn bg-black p-3  rounded-xl text-white w-50 hover:shadow-2xl active:bg-orange-500 "
          onClick={() => {
            setfastDelivery(!fastDelivery);
            const filteredlist = listofrestaurants.filter(
              (res) => res.info.sla.deliveryTime < 30
            );
            fastDelivery
              ? setFilterdrestaurant(listofrestaurants)
              : setFilterdrestaurant(filteredlist);
          }}
        >
          Fast Delevery
        </button>
      </div>
      <div className="flex flex-wrap  justify-center items-center  gap-10 mt-8 ">
        {Filteredrestaurant?.map((restaurant) => (
          <Link
            key={restaurant?.info?.id}
            to={"/restaurant/" + restaurant?.info?.id}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Rescard {...restaurant?.info} />
          </Link>
        ))}
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
};
export default Body;
