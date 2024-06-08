import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Default_restaurant, NAV_LOGO } from "../utils/constant";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";
import { IoHelpCircleSharp } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";
import { MdLocationOn } from "react-icons/md";
import { toggleSideBar } from "../utils/sideBarSlice";
import { useEffect, useRef } from "react";
import { addResList } from "../utils/sideBarSlice";
import { PiCaretCircleDoubleRightThin } from "react-icons/pi";


const Header = () => {
  // const [btnReact, setbtnReact] = useState("Login");
  // console.log("Header render");
  //const loggeduser = useContext(userContext);

  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  const isMenuOpen = useSelector((store) => store.sidebar.isMenuOpen);
  const cityDetails = useSelector((store) => store.sidebar.cityDetails);
  

  const dispatch = useDispatch();
  const locationRef = useRef(null);

  // adding default Restaurant list to body
  const fetchResList = async () => {
    try{
    const response = await fetch(Default_restaurant);
    const json = await response.json();
    console.log(json);

    dispatch(addResList(json));
    }catch(e){
      console.log(e)
    }
  };

  useEffect(() => {
    fetchResList();
  }, []);

  const handleLocationClick = (e) => {
    dispatch(toggleSideBar(true));
  };

  const handleClickOutside = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      dispatch(toggleSideBar(false));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div className="flex justify-between items-center shadow-lg p-0 m-0 fixed z-10 top-0 w-full bg-white overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="w-20 ml-16 mr-2">
          <Link to="/">
            <img src={NAV_LOGO} />
          </Link>
        </div>
        <Link to="/">
          <span className="font-resfont text-[24px] font-[1000]">
            CuisineCruise
          </span>
        </Link>
        <div className="text-lg mt-1 flex lg:ml-5 cursor-pointer">
          <span>
            <MdLocationOn className="mt-1 mr-1 text-orange-500 text-xl" />
          </span>
          <div
            className="flex items-center font-semibold  gap-2"
            onClick={handleLocationClick}
            ref={locationRef}
          >
            <span className="underline-offset text-sm font-bold lg:text-lg font-Poppins border-b-2 border-black text-gray-800 hover:text-orange-500 transition-all ">
              {cityDetails.length === 0 ? "Vijayawada" : cityDetails.cityName}
            </span>
            <span className="text-gray-600 text-sm">
              {cityDetails.length === 0 ? "NTR, India" : cityDetails.state}
            </span>
            <span>
              {" "}
              {isMenuOpen ? (
                <FaAngleUp className="text-orange-500" />
              ) : (
                <FaAngleDown className="text-orange-500" />
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="nav-items">
        <ul className="flex justify-center items-center gap-10 p-7 font-Navitems  font-semibold ">
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <div className="flex justify-center items-center gap-1  text-slate-500  hover:text-orange-600">
                <FaHome />
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/about"
            >
              <div className="flex justify-center items-center gap-1  text-slate-500  hover:text-orange-600">
                <IoIosInformationCircle />
                About
              </div>
            </Link>
          </li>
          <li>
           
              <div className="flex justify-center items-center gap-1  text-slate-500  hover:text-orange-600">
                <IoHelpCircleSharp />
                Help
              </div>
            
          </li>
          <li>
            <Link style={{ textDecoration: "none", color: "black" }} to="#">
              <div className="flex justify-center items-center gap-1  text-slate-500  hover:text-orange-600">
                <BiSolidOffer />
                Offers
              </div>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <div className="flex justify-center items-center gap-1  text-slate-500  hover:text-orange-600">
                <FaShoppingCart />
                Cart[{cartItems.length}]
              </div>
            </Link>
          </li>
          {/* <button
            className="border border-solid border-black w-20 h-14 bg-black text-white  rounded-lg "
            onClick={() => {
              btnReact === "Login"
                ? setbtnReact("Logout")
                : setbtnReact("Login");
            }}
          >
            {btnReact}
          </button>
          <li>{loggeduser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
