import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader"
import { useStateContext } from "../../context/ContextProvider";
const EditUser = () => {
  const { currentColor } = useStateContext();
  const { id } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });


  if (!user) { content = (
    <div className="m-2 md:m-5 p-2 md:p-5 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
      <PulseLoader color={"#000"} />
    </div>
  )};

  const content = <EditUserForm user={user} />;

  return content;
}

export default EditUser