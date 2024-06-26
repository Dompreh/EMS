import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
// import useTitle from '../../hooks/UseTitle'
import User from "./User";
import { useGetUsersQuery } from "./usersApiSlice";
import { useStateContext } from "../../context/ContextProvider";
import { Button } from "../../components";
import { Link } from "react-router-dom";


function UsersList() {
  const { currentColor } = useStateContext();
 
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <div className="m-2 md:m-5 p-2 md:p-5 bg-white rounded-3xl dark:text-white dark:bg-secondary-dark-bg">
        <PulseLoader color={"#000"} />
      </div>
    );

  if (isError) {
    content = (
      <p className={"inline-block bg-white text-[rgb(178,34,34)]"}>
        {error?.data?.message}
      </p>
    );
  }
  if (isSuccess) {
    const { ids } = users;
    const tableContent =
      ids?.length && (ids.map((userId) => <User key={userId} userId={userId} />));

    content = (
      <>
        <div className="flex justify-end mb-4">
          <Link to="/users/new">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add New Employee"
              borderRadius="10px"
              size="md"
            />
          </Link>
        </div>
        <table className="w-full grid text-[1rem]  grid-cols-[1fr_2fr_1fr] border-[1px] border-solid rounded-lg">
          <thead className="datatable  sticky top-[0] z-1">
            <tr className="datatable ">
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px] border-solid  p-[0.5em]`}
              >
                Name
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]   border-solid p-[0.5em] user__roles`}
              >
                Roles
              </th>
              <th
                style={{
                  backgroundColor: `${currentColor}`,
                }}
                scope="col"
                className={`text-left text-white border-[1px]  border-solid p-[0.5em] user__edit`}
              >
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="datatable ">{tableContent}</tbody>
        </table>
      </>
    );
  }
  return content;
}

export default UsersList;
