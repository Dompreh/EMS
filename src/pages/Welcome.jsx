import React from "react";
import { useStateContext } from "../context/ContextProvider";
import { Button } from "../components";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth"

function Welcome() {
  const { username, isAdmin, isManager } = useAuth()
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-UK", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const { currentColor } = useStateContext();
  return (
    <div className="mt-20 lg:mt-12  lg:px-12 px-14 dark:text-gray-200 dark:bg-secondary-dark">
      <p className="text-base pb-">{today}</p>
      <section className="flex flex-col gap-4 justify-center items-center h-[60vh] ">
        <h1 className="text-5xl font-bold">Welcome {username ? username : "boss"}⭐!</h1>

        <div className="gap-4 flex">
          <Link to="/tasks">
            <Button
              color="white"
              bgColor={currentColor}
              text="View Tasks"
              borderRadius="10px"
              size="md"
            />
          </Link>
          {(isManager || isAdmin) && <Link to="/tasks/new">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add New Tasks"
              borderRadius="10px"
              size="md"
            />
          </Link>}

        </div>
      </section>
    </div>
  );
}

export default Welcome;
