import { useEffect } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { useStateContext } from "../context/ContextProvider";
import { userProfileData } from "../data/dummy";
import avatar from "../data/avatar.jpg";
import { Button } from ".";
import { useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth"
 import Avatar from 'react-avatar';


function UserProfile() {
  const { currentColor } = useStateContext()
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();
  const navigate = useNavigate();
  const {username, status} = useAuth()


  // useEffect(() => {
  //   console.log('Logout success state:', isSuccess);
  //   if (isSuccess === true) {
  //     console.log('Navigating to login page');
  //     navigate("/login");
  //   }
  // }, [isSuccess, navigate]);
  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
       navigate("/login");
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };
  if (isLoading) { <p>Logging out...</p> }
  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className='flex justify-between items-center'>
        <div className='flex gap-3'>
          <p className='font-semibold text-lg dark:text-gray-200'>User Profile</p>
        </div>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
         <Avatar name={username} className="w-24 h-24 rounded-full"/>
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {username} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400"> {status} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 font-semibold"> {username}@shop.com </p>
        </div>
      </div>
      <div>
        {userProfileData?.map((item, index) => (
          <div key={index} className="flex hover:bg-light-gray  gap-5 border-b-1 border-color p-4  cursor-pointer  dark:hover:bg-[#42464D]">
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }} className="text-xl rounded-lg p-3 hover:bg-light-gray">
              {item.icon}
            </button>
            <div>
              <p className='font-semibold dark:text-gray-200'>{item.message}</p>
              <p className='text-gray-500 dark:text-gray-400 text-sm'>{item.desc}</p>

            </div>
          </div>
        ))}
        <div className='mt-5' onClick={handleLogout}>
          <Button
            color="white"
            bgColor={currentColor}
            text="Logout"
            borderRadius="10px"
            width="full"
          />
        </div>
      </div>
    </div>
  )
}

export default UserProfile