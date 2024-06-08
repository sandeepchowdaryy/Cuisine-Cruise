import { useRouteError } from "react-router-dom";


const Error  = () => {
   const err = useRouteError();
   console.log(err);
   return ( <div>
       <h1>404 Error</h1>
       <h1>Page Not Found!</h1>
       <h2>{err?.error?.message}</h2>
   </div>)
}

export default Error ;