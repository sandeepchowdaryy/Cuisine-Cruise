import { RES_IMG } from "../utils/constant";

const Rescard = ({
  name,
  avgRating,
  costForTwo,
  cuisines,
  cloudinaryImageId,
  totalRatingsString,
  sla,
}) => {


  return (
    <div className="flex flex-col gap-1  w-[275px] h-[350px]rounded-xl origin-center  ease-linear delay-150 transform-1s hover:scale-95 transition-all">
      <img
        className="w-[350px] h-[200px] object-fill rounded-xl"
        src={RES_IMG + cloudinaryImageId}
      />
      <div className="max-h-[1.5rem] overflow-hidden text-lg font-bold">
        {name}
      </div>
      <div className="flex gap-2  font-semibold">
        <h4 className="res-rating bg-green-600 rounded-lg px-1 ">⭐{avgRating}</h4>
        <h4 className="res-cost2">• ( {totalRatingsString} )</h4>
        <h4 className="res-cost2">{costForTwo}</h4>
      </div>
      <div className="max-h-[1.5rem] overflow-hidden">
        <h3>🍴{cuisines?.join(", ")}</h3>
      </div>
      <div className="res-time font-bold">⏳{sla?.slaString}</div>
    </div>
  );
};

export const withPromotedLabel = (Rescard) => {
  return (props) => {
    return (
      <div>
        
        <Rescard {...props} />
      </div>
    );
  };
};

export default Rescard;
