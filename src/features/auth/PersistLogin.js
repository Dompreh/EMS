import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link } from "react-router-dom";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import usePersist from "../../hooks/usePersist";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    //react 18 strict mode mounts,unmounts and remounts

      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          //const response =
          await refresh();
          //const {accessToken} = refresh.data
          setTrueSuccess(true);
        } catch (error) {
          console.error(error);
        }
      };
      if (!token && persist) {
       return verifyRefreshToken();
      }

        //eslint-disable-next-line
  }, []);

  let content =<Outlet/>;
  if (!persist) {
    // persist:no
    console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist:yes, token:no
    console.log("loading");
    content = <PulseLoader color={"#000"} />;
  } else if (isError) {
    //persist:yes, token:no
    console.log("error");
    content = (
      <p className="bg-white text-[#F00] p-[0.25em] mb-[0.5em] inline-block">
        {`${error?.data?.message} - `}
        <Link to="/login">Please login again</Link>
      </p>
    );
  } else if (isSuccess && trueSuccess) {
    //persist:yes, token:yes
    console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist:yes, token:yes
    console.log("token and uninit");
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
