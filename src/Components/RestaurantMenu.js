import useRestaurantMenu from "../utils/useRestaurantMenu";
import { RES_IMG } from "../utils/constant";
import RestaurantCategory from "./RestaurnatCategory";
import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";

export const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    avgRatingString,
    cloudinaryImageId,
  } = resInfo?.data?.cards[2]?.card?.card?.info || {};

  const { itemCards, title } =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card || {};

  console.log(
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
  );

  const category =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

    console.log(category)

  return (
    <div className="res-menu mt-20">
      <div className="flex justify-center items-center bg-black gap-2">
        <div className="header-right">
          <img
            className="w-[250px] h-[200px] p-3 rounded-3xl object-fill"
            src={RES_IMG + cloudinaryImageId}
          />
        </div>
        <div className="flex-col">
          <h1 className="text-3xl text-gray-200 mb-2">{name}</h1>
          <h3 className="text-sm text-gray-400 mb-4">{cuisines?.join(",")}</h3>
          <div className="text-white flex gap-4 font-bold ">
            <h3 className="border-r-2 pr-5">{avgRatingString}</h3>
            <h3 className="border-r-2 pr-5">{totalRatingsString}</h3>
            <h3>{costForTwoMessage}</h3>
          </div>
        </div>
      </div>

      {/* <div className="menu-body">
        <ul>
          <h3>{title}</h3>
          {itemCards?.map((item) => (
            <li key={item.card.info.id} className="menu-list">
              <div className="res-items">
                <h3>{item.card.info.name}</h3>
                <h3>
                  ₹
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}{" "}
                </h3>
              </div>
              <div className="img-container">
                <img
                  className="item-img"
                  src={RES_IMG + item.card.info.imageId}
                />
              </div>
            </li>
          ))}
        </ul>
      </div> */}

      {category.map((category, index) => (
        <RestaurantCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
