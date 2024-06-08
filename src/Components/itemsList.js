import { RES_IMG } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addItems } from "../utils/cartSlice";

const ItemsList = (props) => {

  const dispatch = useDispatch();

  const addtocart = (item) => {
    dispatch(addItems(item));
  };
  return (
    <ul className="flex-col bg-slate-100 rounded-lg text-start">
      {props?.data?.itemCards?.map((item) => (
        <li
          key={item.card.info.id}
          className="p-5 flex justify-between  mb-10 border-b-2"
        >
          <div className="max-w-[70%]">
            <h3 className="font-bold text-xl">{item.card.info.name}</h3>
            <h3 className="font-bold text-lg">
              ₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}{" "}
            </h3>
            <h3 className="text-lg" >
              {item.card.info.ratings.aggregatedRating.rating} -{" "}
              {item.card.info.ratings.aggregatedRating.ratingCount}
            </h3>
            <h3 className="p-1   text-sm" >
              {item.card.info.description}
            </h3>
          </div>
          <div className=" w-[200px] p-4">
            <img
              className="rounded-xl"
              src={RES_IMG + item.card.info.imageId}
            />
            <div className="absolute">
              <button
                className=" p-2 px-3 rounded-lg mx-12 my-[-10px] bg-black text-white  m-auto font-bold hover:bg-gray-800"
                onClick={()=>addtocart(item)}
              >
                ADD
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ItemsList;
