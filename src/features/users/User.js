import React, { memo } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { useStateContext } from "../../context/ContextProvider";

function User({ userId }) {
  const { user } = useGetUsersQuery("usersList", {
      selectFromResult:({data}) => ({
          user:data?.entities[userId]
      }),
  })
  const { currentColor } = useStateContext();
 
  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/users/${userId}`);

    const userRoleString = user?.role.toString().replaceAll(",", ", ");

    const cellStatus = user?.active ? "" : "bg-[rgb(178,34,34)] text-white";

    return (
      <tr key={userId} className=" datatable  table__row user">
        <td
          className={`text-left border-[1px]  border-solid p-[0.5em] ${cellStatus} `}
        >
          {user.username}
        </td>
        <td
          className={`text-left border-[1px]  border-solid p-[0.5em] ${cellStatus} `}
        >
          {" "}
          {userRoleString}
        </td>
        <td
          className={`text-left border-[1px]   border-solid p-[0.5em] grid place-content-center ${cellStatus}`}
        >
          <button className=" p-[0.25em] text-[1.5rem]" onClick={handleEdit}>
            <FaRegEdit />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
const memoizedUser = memo(User)

export default User;
