import { useEffect, useState } from "react";
import { Item_IMG } from "./constant";

const useRestaurantMenu = (resId) =>{

  const [resInfo,setresInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(Item_IMG + resId);
    const json = await data.json();
    console.log(json);
    setresInfo(json);
  };

    return resInfo;
}

export default useRestaurantMenu;