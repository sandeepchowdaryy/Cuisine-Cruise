import { useState } from "react";
import ItemsList from "./itemsList";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { FaArrowAltCircleUp } from "react-icons/fa";


const RestaurantCategory = (props) => {

   const [showitems,setshowitems] = useState(false);

  const keepitems = () =>{
  setshowitems(!showitems);
  }
    return (
      <div className="w-7/12 mx-auto my-14">
        <div className=" bg-gray-50 shadow-xl p-2 rounded-lg " >
          <div className="flex justify-between mb-4 cursor-pointer " onClick={keepitems}>
            <h3 className="font-bold text-xl">{props.data.title} ({props.data.itemCards.length})</h3>
            <h3 className="w-[2rem] h-[1.5rem] mr-4 mt-3 text-2xl">{showitems ? <FaArrowAltCircleDown  /> : <FaArrowAltCircleUp />}</h3>
            </div>
            {showitems && <ItemsList id = {props.data.id} {...props}/>}
            </div>


        {/* <ul className="flex-col">
          {props.data.itemCards?.map((item) => (
            <li key={item.card.info.id} className="flex justify-between border-b-4">
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
                  className="w-[200px] h-[200px]"
                  src={RES_IMG + item.card.info.imageId}
                />
              </div>
            </li>
          ))}
        </ul> */}

      </div>
    );
}

export default RestaurantCategory;