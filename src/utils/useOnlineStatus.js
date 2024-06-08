import { useEffect, useState } from "react";

const useOnlineStatus = () =>{
    const [useOnlineStatus,setOnlineStatus] = useState(true);

    useEffect(()=>{

          window.addEventListener("online",()=>{
            setOnlineStatus(true)
          });
          window.addEventListener("offline",()=>{
            setOnlineStatus(false)
          });
    },[]);

    return useOnlineStatus;
}

export default useOnlineStatus;