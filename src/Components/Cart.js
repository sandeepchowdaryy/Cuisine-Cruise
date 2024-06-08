import { Link } from "react-router-dom";
import { clearCart, removeItems } from "../utils/cartSlice";
import { RES_IMG } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import Bill from "./Bill";

const Cart = () => {
  const dispatch = useDispatch();
  const clearitems = () => {
    dispatch(clearCart());
  };
  const removeItem = (item) => {
    dispatch(removeItems(item));
  };

  const cartitems = useSelector((store) => store.cart.items);

  return cartitems.length === 0 ? (
    <div className="mt-10 flex flex-col justify-center items-center">
    <img className="w-5/12  " src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvyomBBKa9jA9ecfi5Qe_Wg1Nsd_Qe_1SHfg&s" /> 
    <Link to={"/"}><button className=" bg-orange-500 text-white p-3 rounded-xl font-bold">Explore Restaurants</button></Link>
        
    </div>
  ) : (
    <div className="flex w-10/12 m-auto mt-24 text-center">
      <div className="mr-16 w-[60%]"> 
      <div className="flex justify-between items-center gap-4 p-6">
        <div className="text-3xl p-2 font-bold">
          Cart Items ({cartitems.length})
        </div>
        <button
          className="text-xl  p-3 font-semibold bg-black text-white rounded-xl"
          onClick={clearitems}
        >
          ClearCart
        </button>
      </div>

      <ul className="flex-col bg-slate-100 rounded-lg text-start">
        {cartitems.map((item) => (
          <li
            key={item.card.info.id}
            className="p-5 flex justify-between  mb-10 border-b-2"
          >
            <div className="max-w-[70%]">
              <h3 className="font-bold text-xl">{item.card.info.name}</h3>
              <h3 className="font-bold text-lg">
                ₹
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}{" "}
              </h3>
              <h3 className="text-lg">
                {item.card.info.ratings.aggregatedRating.rating} -{" "}
                {item.card.info.ratings.aggregatedRating.ratingCount}
              </h3>
              <h3 className="p-1   text-sm">{item.card.info.description}</h3>
            </div>
            <div className=" w-[200px] p-4">
              <img
                className="rounded-xl"
                src={RES_IMG + item.card.info.imageId}
              />
              <div className="absolute">
                <button
                  className="p-2  px-5 rounded-lg mx-8 my-[-10px] bg-black text-white  m-auto font-bold hover:bg-gray-800"
                  onClick={() => removeItem(item)}
                >
                  remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      </div>
      <Bill/>
    </div>
  );
};

export default Cart;
