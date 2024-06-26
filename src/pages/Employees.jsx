import React from "react";
import { Button, Header } from "../components";
import UsersList from "../features/users/UsersList";
import { useStateContext } from "../context/ContextProvider";

function Employees() {
  const { currentColor } = useStateContext();
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl text-black dark:text-white dark:bg-secondary-dark-bg">
      <Header title="Employees" category="Page" />
  
      <UsersList />
    </div>
  );
}

export default Employees;
