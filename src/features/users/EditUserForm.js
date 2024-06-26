import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { FaRegSave, FaTrash,FaHouseUser } from "react-icons/fa";
import { ROLES } from "../../config/roles";
import BounceLoader from "react-spinners/BounceLoader";
import { useStateContext } from "../../context/ContextProvider";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const USER_REGEX = /^(?! )[A-z ]{4,20}(?<! )$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditUserForm = ({ user }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteUserMutation();
  const { currentColor } = useStateContext();

  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    //console.log(isSuccess);
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRole([]);
      navigate("/employees");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions, //HTML collection
      (option) => option.value
    );
    setRole(values);
  };

  const onActiveChanged = () => setActive((prev) => !prev);

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const onSaveUserClicked = async (e) => {
    if (password) {
      await updateUser({ id: user.id, username, password, role, active });
    } else {
      await updateUser({ id: user.id, username, role, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id });
  };

  let canSave;
  if (password) {
    canSave =
      [role.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [role.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError
    ? "bg-white text-[#F00] p-[0.25em] mb-[0.5em] inline-block"
    : "offscreen";
  const validUserClass =
    username && !validUsername
      ? "border border-[#F00] border-solid outline-[1px_solid_#F00] "
      : "border-solid border-1 border-black ";
  const validPwdClass =
    password && !validPassword
      ? "border border-[#F00] border-solid outline-[1px_solid_#F00]"
      : "border-solid border-1 border-black ";

  const validRolesClass = !Boolean(role.length)
    ? "border border-[#F00] border-solid outline-[1px_solid_#F00]"
    : "border-solid border-1 border-black ";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  const content = (
    <>
      <p className={errClass}>{errContent}</p>
      <form
        className="flex [flex-flow:column_nowrap] gap-[0.75em] max-w-[800px] relative"
        onSubmit={(e) => e.preventDefault()}
      >
        {isLoading && (
          <div
            className={`absolute inset-0 flex items-center justify-center  z-10 m-2 max-w-[800px] md:m-10 p-2 md:p-10 rounded-3xl dark:text-${currentColor} dark:bg-secondary-dark-bg`}
          >
            <BounceLoader color={currentColor} />
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="font-bold">Edit User Form</h2>
          <div className="position-static flex gap-[0.5em]">
          <TooltipComponent content="Go Back" position="Top">
              <button
                className="text-[2rem]"
                title="Delete"
                onClick={() => navigate("/employees")}
              >
                <FaHouseUser className="text-[2rem] hover:text-[2.2rem]  cursor-pointer" />
              </button>
            </TooltipComponent>
            {canSave && (
              <TooltipComponent content="Save" position="Top">
                <button
                  className="text-[2rem]"
                  title="Save"
                  onClick={onSaveUserClicked}
                  disabled={!canSave}
                >
                  <FaRegSave className="text-[2rem] hover:text-[2.2rem] cursor-pointer" />
                </button>
              </TooltipComponent>
            )}
            <TooltipComponent content="Delete" position="Top">
              <button
                className="text-[2rem]"
                title="Delete"
                onClick={onDeleteUserClicked}
              >
                <FaTrash className="text-[2rem] hover:text-[2.2rem]  cursor-pointer" />
              </button>
            </TooltipComponent>
          </div>
        </div>
        <label htmlFor="username" className="form__label font-semibold">
          Username : <span className="whitespace-nowrap">[4-20 letters]</span>
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className={`p-[0.5em]  rounded-[15px] ${validUserClass}`}
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />
        <label htmlFor="password" className="form__label font-semibold">
          Password :{" "}
          <span className="whitespace-nowrap">
            [empty = no change] [4-12 chars incl. !@#$%]
          </span>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className={`p-[0.5em]  rounded-[15px] ${validPwdClass}`}
          autoComplete="off"
          value={password}
          onChange={onPasswordChanged}
        />
        <label
          htmlFor="user-active"
          className="form__label font-semibold  flex items-center gap-[0.5em] w-fit"
        >
          ACTIVE:
        </label>
        <input
          className="w-[24px] h-[24px]"
          id="user-active"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        />
        <TooltipComponent
          content="Multiple selection available"
          style={{
            fontFamily: "Open Sans, sans-serif",
            boxSizing: "none",
            fontSize: "16px",
            fontWeight: "600",
          }}
          position="Top"
        >
          <label className="form__label font-semibold" htmlFor="roles">
            ASSIGNED ROLES:
          </label>
        </TooltipComponent>
        <select
          name="roles"
          id="roles"
          className={`w-full p-[0.5em] rounded-md ${validRolesClass}`}
          multiple={true}
          size="3"
          value={role}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );
  return content;
};

export default EditUserForm;
