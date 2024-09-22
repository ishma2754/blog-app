import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    // If the route requires authentication and the user is not authenticated
    //(authentication && !authStatus
    if (authentication && authStatus !== authentication) {
      navigate("/login");
      // If the route does not require authentication but the user is authenticated
      //!authentication && authStatus
    } else if (!authentication && authStatus !== authentication) {
      navigate("/"); //redirection
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

/*
If the route is public (doesn’t require authentication) but the user is authenticated, the code will navigate the user away from the current route. Typically, this would redirect them to the home page (or another route specified in the navigate call).
*/
